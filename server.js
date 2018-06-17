const express = require('express');
var fs = require('fs');
var path = require('path');
const app = express();
var multipart = require('connect-multiparty');
app.use(express.static(path.join(__dirname, 'client')));
var PythonShell = require('python-shell');

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'client','public','index.html'));
});
app.post('/upload',multipart(), function (req, res) {
  //获得文件名
  // console.log(req.files)
  var filename = req.files.file.originalFilename || path.basename(req.files.file.path);
  
  //复制文件到指定路径
  var targetPath = './uploads/' + filename;

  //复制文件流
  fs.createReadStream(req.files.file.path).pipe(fs.createWriteStream(targetPath));

  //响应ajax请求，告诉它图片传到哪了
  // res.json({ code: 200, data: { url: 'http://' + req.headers.host + '/public/uploads/' + filename } });
  
  // var options = {
  // mode: 'json',
  // pythonOptions: ['-u'], // get print results in real-time
  // scriptPath: './uploads',
  // args: [filename]
  // };
  // PythonShell.run('crack.py', options, function (err, results) {
    // if (err) throw err;
    // console.log('results: %j', results[0]);
    // res.json({ code: 200,data:results[0]});
  // });
    var file = fs.readFileSync('uploads/AIM_Chat.pcap_Flow.json', 'utf8');
    res.json({ code: 200,data:JSON.parse(file)});
});


port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
