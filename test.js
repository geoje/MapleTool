const mysql = require("mysql");

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

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "maple",
  password: "maplemaple",
  database: "maple",
});
const datasets = stats.req.data.datasets;
db.connect();

// Insert
// const date = new Date();
// date.setDate(date.getDate() - 29);

// for (let i = 0; i < 30; i++) {
//   const query = `INSERT INTO mut_log VALUES ("${date.toISOString().substr(0, 10)}", ${
//     datasets[0].data[i]
//   }, ${datasets[1].data[i]}, ${datasets[2].data[i]});`;

//   db.query(query, (error, results, fields) => {
//     if (error) console.error(error);
//     else console.log(`[${new Date().toISOString().substr(0, 19)}] mysql | `, query);
//   });
//   date.setDate(date.getDate() + 1);
// }

// Select
const query = "SELECT * FROM maple.mut_log ORDER BY date DESC LIMIT 30;";
db.query(query, (error, results, fields) => {
  if (error) console.error(error);
  else {
    results.reverse().forEach((row) => {
      const date = new Date(row.date);
      stats.req.data.labels.push(`${date.getMonth() + 1}/${date.getDate()}`);
      stats.req.data.datasets[0].data.push(row.visit);
      stats.req.data.datasets[1].data.push(row.apply);
      stats.req.data.datasets[2].data.push(row.sync);
    });

    console.log(JSON.stringify(stats));
  }
});
db.end();
