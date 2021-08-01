const fs = require("fs");
const https = require("https");
const express = require("express");
const livereload = require("livereload");
const querystring = require("querystring");
const app = express();

const PORT = 4852;
const DEFAULT_DIR = "/maple";
const REQ_DELAY = 10000;

let ipForDealy = {
  login: [],
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
      else res.send(data);
    });
  });
  app.post(DEFAULT_DIR + "/login", (req, res) => {
    const clientIP = req.header("x-forwarded-for");
    if (ipForDealy.login.indexOf(clientIP) == -1) {
      ipForDealy.login.push(clientIP);
      setTimeout(() => {
        const idx = ipForDealy.login.indexOf(clientIP);
        if (idx != -1) ipForDealy.login.splice(idx, 1);
      }, REQ_DELAY);

      if (req.body.id && req.body.password) {
        console.log(
          `[${new Date().toISOString().substr(0, 19)}] ${clientIP} | login | ${req.body.id}`
        );
        GetCharacterByAccount(req, res);
      } else if (req.body.id && req.body.password) {
      } else responese.json({ error: ["쿼리 오류", "계정 정보가 비어있습니다."] });
    } else
      res.json({
        error: [
          "잠시만요!",
          `원활한 서비스를 위해 [계정에서 가져오기]와 [캐릭터 등록]은 ${
            REQ_DELAY / 1000
          }초 마다 사용이 가능 합니다.`,
        ],
      });
  });
  app.post(DEFAULT_DIR + "/apply", (req, res) => {
    const clientIP = req.header("x-forwarded-for");

    if (req.body.charNames) {
      console.log(
        `[${new Date().toISOString().substr(0, 19)}] ${clientIP} | apply | ${
          req.body.charNames.split(",").length
        }`
      );
      GetCharacterInfo(req, res);
    } else res.json({ error: ["쿼리 오류", "캐릭터 이름이 비어있습니다."] });
  });
  app.post(DEFAULT_DIR + "/sync", (req, res) => {
    if (req.body.name) {
      console.log(
        `[${new Date().toISOString().substr(0, 19)}] ${req.header("x-forwarded-for")} | sync | ${
          req.body.name
        }`
      );
      GetSyncCharacterInfo(req, res);
    } else res.json({ error: ["쿼리 오류", "캐릭터 이름이 비어있습니다."] });
  });

  app.use((req, res, next) => ResponseStatusPage(res, 404, "Not Found"));
  app.listen(PORT);
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

function GetCharacterByAccount(request, responese) {
  const processError = (resTitle, resCotent, err) => {
    responese.json({
      error: [resTitle, resCotent],
    });
    if (err) console.error(err);
  };

  https
    .get("https://maplestory.nexon.com/Authentication/Login", (res) => {
      if (res.statusCode != 200) {
        processError(
          "서버 오류",
          "메이플 로그인 페이지 접속에 실패했습니다.\n" + `상태코드: ${res.headers.statusCode}`
        );
        return;
      }

      let rawData = "";
      res.on("data", (chunk) => (rawData += chunk));
      res.on("end", () => {
        let token = rawData.match(/(<input name="__RequestVerificationToken").+(?=" \/>)/);
        token = token[0].substring(token[0].lastIndexOf('"') + 1);

        let cookie = res.headers["set-cookie"].find((str) =>
          str.startsWith("__RequestVerificationToken=")
        );
        if (!cookie) {
          processError("서버 오류", "메이플 로그인 페이지에서 토큰 값을 가져올 수 없습니다.");
          return;
        }
        cookie = cookie.substring(0, cookie.indexOf(" "));

        let postData = querystring.stringify({
          __RequestVerificationToken: token,
          ID: request.body.id,
          Password: request.body.password,
        });
        let options = {
          hostname: "maplestory.nexon.com",
          path: "/Authentication/Login",
          method: "POST",
          headers: {
            Cookie: [cookie],
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": Buffer.byteLength(postData),
          },
        };

        req = https.request(options, (res) => {
          res.on("data", () => {});
          res.on("end", () => {
            cookie = res.headers["set-cookie"].find((str) => str.startsWith("EGC2="));
            if (!cookie || cookie.startsWith("EGC2=;")) {
              processError(
                "로그인 오류",
                "로그인에 실패 하였습니다.\n계정 정보가 틀렸거나 보호모드 입니다."
              );
              return;
            }
            cookie = cookie.substring(0, cookie.indexOf(" "));

            options = {
              hostname: "maplestory.nexon.com",
              path: "/MyMaple/Account/MasterCharacter",
              headers: {
                Cookie: [cookie],
              },
            };

            https
              .get(options, (res) => {
                if (res.statusCode != 200) return;

                rawData = "";
                res.on("data", (chunk) => (rawData += chunk));
                res.on("end", () => {
                  let charArr = rawData
                    .match(/(<dd><img).+(?=<\/dd>)/g)
                    .map((str) => str.substr(str.lastIndexOf(">") + 1));

                  responese.json({ charArr });
                });
              })
              .on("error", (err) =>
                processError(
                  "서버 오류",
                  "메이플 내 캐릭터 페이지 접속 중 오류가 발생하였습니다.",
                  err
                )
              );
          });
        });
        req.write(postData);
        req.on("error", (err) =>
          processError("서버 오류", "메이플 홈페이지 로그인 도중 오류가 발생하였습니다.", err)
        );
        req.end();
      });
    })
    .on("error", (err) =>
      processError("서버 오류", "메이플 로그인 페이지 접속 중 오류가 발생하였습니다.", err)
    );
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
