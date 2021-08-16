const fs = require("fs");
const https = require("https");
const express = require("express");
const livereload = require("livereload");
const schedule = require("node-schedule");
const mysql = require("mysql");
const app = express();

const PORT = 4852;
const DEFAULT_DIR = "/maple";
const REQ_DELAY = 10000;

let delayList = {
  apply: [],
  sync: [],
};
let stats = {
  req: {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "방문",
          data: [],
          backgroundColor: "#eee",
          borderColor: "#eee",
          borderWidth: 1,
        },
        {
          label: "등록",
          data: [],
          backgroundColor: "rgb(221, 187, 136)",
          borderColor: "rgb(221, 187, 136)",
          borderWidth: 1,
        },
        {
          label: "갱신",
          data: [],
          backgroundColor: "rgb(60, 172, 196)",
          borderColor: "rgb(60, 172, 196)",
          borderWidth: 1,
        },
      ],
    },
  },
};

String.format = (...args) => {
  return args[0].replace(/{(\d+)}/g, (match, num) => {
    num = Number(num) + 1;
    return typeof args[num] != undefined ? args[num] : match;
  });
};

function Main() {
  livereload
    .createServer({
      exts: ["html", "css", "js"],
    })
    .watch(__dirname);

  app.use(express.json());
  app.use(DEFAULT_DIR, express.static("public"));
  app.use((err, req, res, next) => ResponseStatusPage(res, 500, "Internal Server Error", err));

  if (DEFAULT_DIR != "/")
    app.get("/", (req, res) => {
      res.redirect(301, `http://${req.headers.host}${DEFAULT_DIR}`);
    });
  app.get(DEFAULT_DIR, (req, res) => {
    fs.readFile("public/html/index.html", "utf8", (err, data) => {
      if (err) ResponseStatusPage(res, 500, "Internal Server Error", err);
      else {
        res.send(data);

        // 통계
        const counts = stats.req.data.datasets[0].data;
        counts[counts.length - 1]++;
      }
    });
  });
  app.get(DEFAULT_DIR + "/chart", (req, res) => {
    fs.readFile("public/html/chart.html", "utf8", (err, data) => {
      if (err) ResponseStatusPage(res, 500, "Internal Server Error", err);
      else res.send(data);
    });
  });

  app.post(DEFAULT_DIR + "/apply", (req, res) => {
    const clientIP = req.header("x-forwarded-for");
    if (delayList.apply.indexOf(clientIP) == -1) {
      delayList.apply.push(clientIP);
      setTimeout(() => {
        const idx = delayList.apply.indexOf(clientIP);
        if (idx != -1) delayList.apply.splice(idx, 1);
      }, REQ_DELAY);

      if (req.body.charNames) {
        // 통계
        const counts = stats.req.data.datasets[1].data;
        const count = req.body.charNames.split(",").length;
        counts[counts.length - 1] += count;

        // 로그
        console.log(`[${new Date().toISOString().substr(0, 19)}] ${clientIP} | apply | ${count}`);
        GetCharacterInfo(req, res);
      } else res.json({ error: ["쿼리 오류", "캐릭터 이름이 비어있습니다."] });
    } else
      res.json({
        error: [
          "잠시만요!",
          `원활한 서비스를 위해 [캐릭터 등록]은 ${REQ_DELAY / 1000}초 마다 사용이 가능 합니다.`,
        ],
      });
  });
  app.post(DEFAULT_DIR + "/sync", (req, res) => {
    // [Error Code]
    // 1: 동기화 대기로 인한 실패

    if (req.body.name) {
      if (delayList.sync.indexOf(req.body.name) == -1) {
        delayList.sync.push(req.body.name);
        setTimeout(() => {
          const idx = delayList.sync.indexOf(req.body.name);
          if (idx != -1) delayList.sync.splice(idx, 1);
        }, REQ_DELAY);

        // 통계
        const counts = stats.req.data.datasets[2].data;
        counts[counts.length - 1]++;

        //로그
        console.log(
          `[${new Date().toISOString().substr(0, 19)}] ${req.header("x-forwarded-for")} | sync | ${
            req.body.name
          }`
        );
        GetSyncCharacterInfo(req, res);
      } else {
        res.json({
          error: [
            "잠시만요!",
            `동기화 실패 - ${req.body.name}\n\n원활한 서비스를 위해 [캐릭터 동기화]는 ${
              REQ_DELAY / 1000
            }초 마다 사용이 가능 합니다.`,
            1,
          ],
        });
      }
    } else res.json({ error: ["쿼리 오류", "캐릭터 이름이 비어있습니다."] });
  });
  app.post(DEFAULT_DIR + "/chart", (req, res) => {
    res.json(stats);
  });

  app.use((req, res, next) => ResponseStatusPage(res, 404, "Not Found"));
  app.listen(PORT);

  // 최초 통계 DB 조회
  LoadStatsFromDB();

  // 통계 요청 처리
  schedule.scheduleJob("0 0 0 * * *", () => {
    // 날짜 지정
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    // DB 저장
    const db = mysql.createConnection({
      host: "127.0.0.1",
      user: "maple",
      password: "maplemaple",
      database: "maple",
    });
    const datasets = stats.req.data.datasets;
    const query = `INSERT INTO mut_log VALUES ("${yesterday.toISOString().substr(0, 10)}", ${
      datasets[0].data[datasets[0].data.length - 1]
    }, ${datasets[1].data[datasets[1].data.length - 1]}, ${
      datasets[2].data[datasets[2].data.length - 1]
    });`;

    db.connect();
    db.query(query, (error, results, fields) => {
      if (error) console.error(error);
      else console.log(`[${new Date().toISOString().substr(0, 19)}] mysql | `, query);
    });
    db.end();

    // 오늘자 통계 추가
    for (let name in stats) {
      let labels = stats[name].data.labels;
      labels.shift();
      labels.push(`${today.getMonth() + 1}/${today.getDate()}`);

      stats[name].data.datasets.forEach((set) => {
        set.data.shift();
        set.data.push(0);
      });
    }
  });
}

function LoadStatsFromDB() {
  const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "maple",
    password: "maplemaple",
    database: "maple",
  });
  db.connect();

  const query = "SELECT * FROM maple.mut_log ORDER BY date DESC LIMIT 30;";
  db.query(query, (error, results, fields) => {
    if (error) console.error(error);
    else {
      if (results.length == 0)
        results = [{ date: new Date().toISOString(), visit: 0, apply: 0, sync: 0 }];
      results.reverse().forEach((row) => {
        const date = new Date(row.date);
        stats.req.data.labels.push(`${date.getMonth() + 1}/${date.getDate()}`);
        stats.req.data.datasets[0].data.push(row.visit);
        stats.req.data.datasets[1].data.push(row.apply);
        stats.req.data.datasets[2].data.push(row.sync);
      });
    }
  });

  db.end();
}

function ResponseStatusPage(res, statusCode, content, err) {
  if (statusCode == 400 || statusCode == 500) console.error(err);

  fs.readFile("public/html/status.html", "utf8", (err, data) => {
    if (err) console.error(err);
    else res.status(statusCode).send(String.format(data, statusCode, content));
  });
}
function ParseCharacterInfo(rawData) {
  let infoArr = [];

  let imgAndNameArr = rawData.match(/(<img src=).+(?=" class="profile-)/g);
  if (imgAndNameArr) {
    imgAndNameArr = imgAndNameArr.map((str) => {
      let splited = str.split('" alt="');
      return { imgUrl: splited[0].substr(splited[0].indexOf('"') + 1), name: splited[1] };
    });

    let levelAndJobArr = rawData.match(/(">Lv.).+(?=<\/span>)/g).map((str) => {
      return { level: Number(str.match(/\d+/)[0]), job: str.substr(str.lastIndexOf(" ") + 1) };
    });

    imgAndNameArr.forEach((imgAndName, i) => infoArr.push({ ...imgAndName, ...levelAndJobArr[i] }));
  }
  return infoArr;
}

function GetCharacterInfo(request, response) {
  const processError = (resTitle, resCotent, err) => {
    response.json({
      error: [resTitle, resCotent],
    });
    if (err) console.error(err);
  };

  let postData = JSON.stringify({ input: request.body.charNames });
  let options = {
    hostname: "maple.gg",
    path: "/mycharacters/search",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(postData),
    },
  };

  let req = https.request(options, (res) => {
    if (res.statusCode != 200) {
      processError(
        "서버 오류",
        "메이플 지지에 접속을 실패했습니다.\n" + `상태코드: ${res.statusCode}`
      );
      return;
    }

    let rawData = "";
    let syncArr = [];
    res.on("data", (chunk) => (rawData += chunk));
    res.on("end", () => {
      syncArr = rawData.match(/(.pushSyncCharacter\(\').+(?=\'\);)/g);
      if (syncArr) syncArr = syncArr.map((str) => str.substr(str.indexOf("'") + 1));

      response.json({ sync: syncArr, info: ParseCharacterInfo(rawData) });
    });
  });
  req.write(postData);
  req.on("error", (err) =>
    processError("서버 오류", "메이플 지지 페이지 접속 중 오류가 발생하였습니다.", err)
  );
  req.end();
}
function GetSyncCharacterInfo(request, response) {
  const processError = (resTitle, resCotent, err) => {
    response.json({
      error: [resTitle, resCotent],
    });
    if (err) console.error(err);
  };

  const sync = (request, response) => {
    https
      .get(`https://maple.gg/u/${encodeURI(request.body.name)}/sync`, (res) => {
        if (res.statusCode != 200) {
          processError(
            "서버 오류",
            "메이플 지지에 접속을 실패했습니다.\n" + `상태코드: ${res.statusCode}`
          );
          return;
        }

        let rawData = "";
        res.on("data", (chunk) => (rawData += chunk));
        res.on("end", () => {
          const data = JSON.parse(rawData);
          if (data.error) {
            // Sync error
            processError("동기화 실패", "캐릭터를 찾을 수 없습니다.\n\n" + request.body.name);
          } else if (data.done) {
            // Sync done
            search(request, response);
          } else {
            // Sync retry
            setTimeout(() => sync(request, response), data.interval);
          }
        });
      })
      .on("error", (err) =>
        processError("서버 오류", "메이플 지지 페이지 접속 중 오류가 발생하였습니다.", err)
      );
  };
  const search = (request, response) => {
    https
      .get("https://maple.gg/mycharacters/search/" + request.body.name, (res) => {
        if (res.statusCode != 200) {
          processError(
            "서버 오류",
            "메이플 지지에 접속을 실패했습니다.\n" + `상태코드: ${res.statusCode}`
          );
          return;
        }

        let rawData = "";
        res.on("data", (chunk) => (rawData += chunk));
        res.on("end", () => {
          response.json(ParseCharacterInfo(rawData)[0]);
        });
      })
      .on("error", (err) =>
        processError("서버 오류", "메이플 지지 페이지 접속 중 오류가 발생하였습니다.", err)
      );
  };

  sync(request, response);
}

Main();
