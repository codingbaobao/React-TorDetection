# React-TorDetection
#### Quick Start
I recommand using *yarn* instead of *npm*  
`npm install -g yarn`  

Next, install the requirements  
`yarn global add nodemon`  
`yarn install`  
`cd client && yarn install`  

Because `python-shell` package will shut-down python when receiving warning, we need to modify it. 
Open `node_modules/python-shell/index.js`, in *line72*: 
```
this.stderr.on('data', function (data) {
    errorData += ''+data;
});
```
change to this: 
```
this.stderr.on('data', function (data) {
    \\errorData += ''+data;  <--- Comment this line
});
```
#### Start server:
We need to run our python program in sudo,  
so open command line and enter command:  
`sudo hostname -I`  
then, start server by enter command in root:  
`yarn server`  
#### Start web page:
Start a new command line, cd to the client and start web page:  
`cd client &&　yarn start`  

Enjoy! 

** Notice ** 
1. If server crashed, please ctrl+c and enter yarn server again.
2. ~~To leave real-time detection, just click react icon or upload a pcap file.~~ 
3. ~~Do not click *即時偵測* more than one time.~~
4. ~~After leave from real-time mode, please wait at least 10 second.~~

#### 分工表
温明浩: 前端網頁&後端server建立、後期debug  
陳柏文: Python程式修飾、程式與server串接、後期debug  
徐彥旻: 報告製作、Python程式修飾  
周晁德: model撰寫&訓練  
黃平瑋: pcap檔案分析與轉換  
蔡昕宇: model撰寫&訓練  
劉記良: 報告製作 