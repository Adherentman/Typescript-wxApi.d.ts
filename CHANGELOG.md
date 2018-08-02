# CHANGELOG
利用业余时间每周一更新，与小程序文档核对API

#### *2018-08-02*
### Api Fixes
1. 修复`uploadTask`中的`onProgressUpdate`方法无法`res.`出后面三个`progress `，`totalBytesExpectedToSend`， `totalBytesSent`
```typescript
let a = wx.uploadFile({url: 'dada', filePath: "daada", name: "dada"});
a.onProgressUpdate(res => console.log(res.progress, res.totalBytesExpectedToSend, res.totalBytesSent))
```
2. 修复`downloadTask`中的`onProgressUpdate`方法无法`res.`出后面三个`progress `，`totalBytesExpectedToSend`， `totalBytesSent`
```typescript
let a = wx.downloadTask({url: 'dada'});
a.onProgressUpdate(res => console.log(res.progress, res.totalBytesExpectedToSend, res.totalBytesSent))
```
3. `playVoiceOpts`中的`duration`必填改为可选。