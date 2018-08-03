# CHANGELOG
利用业余时间每周一更新，与小程序文档核对API

#### *2018-08-03*
- 修复`connectSocket`返回空函数
- 修复`onSocketOpen`返回一个回调函数
- 修复`onSocketError`返回一个回调函数
- 修复`onSocketMessage`返回一个`res.data`的回调函数
- 修复`onSocketClose`返回一个回调函数
- 修复`onOpen`返回一个回调函数
- 修复`onClose`返回一个回调函数
- 修复`onError`返回一个回调函数
- 修复`onMessage`返回一个回调函数
#### *2018-08-02*
### Api Fixes
- 修复`uploadTask`中的`onProgressUpdate`方法无法`res.`出后面三个`progress `，`totalBytesExpectedToSend`， `totalBytesSent`
```typescript
let a = wx.uploadFile({url: 'dada', filePath: "daada", name: "dada"});
a.onProgressUpdate(res => console.log(res.progress, res.totalBytesExpectedToSend, res.totalBytesSent))
```
- 修复`downloadTask`中的`onProgressUpdate`方法无法`res.`出后面三个`progress `，`totalBytesExpectedToSend`， `totalBytesSent`
```typescript
let a = wx.downloadTask({url: 'dada'});
a.onProgressUpdate(res => console.log(res.progress, res.totalBytesExpectedToSend, res.totalBytesSent))
```
- `playVoiceOpts`中的`duration`必填改为可选。
