const https = require('https');

let postData = JSON.stringify({
  input: '나이수다,아나바다,그린포트,포크포크,하나하나,하나바다,하니티비',
});
let options = {
  hostname: 'maple.gg',
  path: '/mycharacters/search',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData),
  },
};

let req = https.request(options, (res) => {
  console.log(res.headers);
  if (res.statusCode != 200) {
    return;
  }

  let rawData = '';
  let syncArr = [];
  let infoArr = [];
  res.on('data', (chunk) => (rawData += chunk));
  res.on('end', () => {
    console.log('[raw]', rawData);

    syncArr = rawData.match(/(.pushSyncCharacter\(\').+(?=\'\);)/g);
    if (syncArr) syncArr = syncArr.map((str) => str.substr(str.indexOf("'") + 1));

    let imgAndNameArr = rawData.match(/(<img src=).+(?=" class="profile-)/g);
    if (imgAndNameArr) {
      imgAndNameArr = imgAndNameArr.map((str) => {
        let splited = str.split('" alt="');
        return { imgUrl: splited[0].substr(splited[0].indexOf('"') + 1), name: splited[1] };
      });

      let levelAndJobArr = rawData.match(/(">Lv.).+(?=<\/span>)/g).map((str) => {
        return { level: str.match(/\d+/)[0], job: str.substr(str.lastIndexOf(' ') + 1) };
      });

      imgAndNameArr.forEach((imgAndName, i) => infoArr.push({ ...imgAndName, ...levelAndJobArr[i] }));
    }

    console.log('[sync]', syncArr);
    console.log('[info]', infoArr);
  });
});
req.write(postData);
req.on('error', console.error);
req.end();
