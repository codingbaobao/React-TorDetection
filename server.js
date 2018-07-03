const express = require('express');
var fs = require('fs');
var path = require('path');
const app = express();
var multipart = require('connect-multiparty');
app.use(express.static(path.join(__dirname, 'client')));
var PythonShell = require('python-shell');

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'client', 'public', 'index.html'));
});
app.post('/upload', multipart(), function (req, res) {
  //獲得文件名
  // console.log(req.files)
  var filename = req.files.file.originalFilename || path.basename(req.files.file.path);
  //復制文件到指定路徑
  var targetPath = 'uploads/' + filename;
  //復制文件流
  fs.createReadStream(req.files.file.path).pipe(fs.createWriteStream(targetPath));
  //響應ajax請求，告訴他圖片傳到哪了
  // res.json({ code: 200, data: { url: 'http://' + req.headers.host + '/public/uploads/' + filename } });
  const promise = new Promise(function (resolve, reject) {
    var options = {
      mode: 'text',
      pythonPath: '/usr/bin/python3.6',
      // pythonOptions: ['-u'], // get print results in real-time
      scriptPath: './CICFlowMeter-4.0/bin/',
      args: ["offtime", "--pcap-path", targetPath, "--json-path", "json/"]
    };
    PythonShell.run('utils.py', options, function (err, results) {
      if (err) {
        // console.log("Python!!!!");
        console.log(err);
        throw err;
        reject(err);
      }
      resolve(results);
      // console.log('results: %j', results[0]);
      // res.json({ code: 200,data:results[0]}); 
    });
  });
  promise.then(() => {
    console.log('Returning!');
    res.json({ code: 200, data: JSON.parse(fs.readFileSync(`json/${filename}_Flow.json`, 'utf8')) });
  });
});

app.get('/realtime/:step', multipart(), function (req, res) {
  const step = req.params.step;
  const promise = new Promise(function (resolve, reject) {
    var options = {
      mode: 'text',
      pythonPath: '/usr/bin/python3.6',
      // pythonOptions: ['-u'], // get print results in real-time
      scriptPath: './CICFlowMeter-4.0/bin/',
      args: ["realtime", "--json-path", "json/", "--json-filename", step]
    };
    PythonShell.run('utils.py', options, function (err, results) {
      if (err) {
        // console.log(err)
        throw err;
        reject(err);
      }
      resolve(results);
    });
  });
  promise.then(() => {
    console.log('Returning!');
    res.json({ code: 200, data: JSON.parse(fs.readFileSync(`json/${step}.pcap_Flow.json`, 'utf8')) });
  });
});

port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));