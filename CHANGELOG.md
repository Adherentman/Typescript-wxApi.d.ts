# CHANGELOG
利用业余时间每周一更新，与小程序文档核对API


#### *2018-08-06*
- 修复wx点不出文件Api
- 修复`openDocument`的参数`filePath`为可选

#### *2018-08-05*
- 规范化`onBackgroundAudioPlay`, `onBackgroundAudioPause`, `onBackgroundAudioStop`返回`callback`值
- 修复`BackgroundAudioManager`返回的值，并且它的对象属性列表增加一个`protocol`
- 修复`createInnerAudioContext`返回的值
- 增加版本1.9.0`innerAudioContext`所支持的对象方法
  - offCanplay
  - offPlay
  - offPause
  - offStop
  - offEnded
  - offTimeUpdate
  - offError
  - offWaiting
  - offSeeking
  - offSeeked
- 增加版本2.1.0有的API`getAvailableAudioSources`
- 增加版本2.1.0里有的`createVideoContext`对象方法
  - showStatusBar
  - hideStatusBar
- 增加支持在版本1.9.90里的`createLivePlayerContext`两个方法
  - pause
  - resume
- 增加支持在版本2.1.0里的`createLivePusherContext`的一个方法`toggleTorch`
- 增加在版本2.1.0中添加的`loadFontFaceRes`动态加载字体Api
#### *2018-08-04*
- 增加一基础类型`ReturnCallBack`
- `RecordStart`增加一个`options` `audioSource`.
- 修复录音管理中`getRecorderManager`的所有APIS
  - start: (options: RecordStartOpts) => void;
  - onStart: ReturnCallBack;
  - onPause: ReturnCallBack;
  - onStop: (res: RecordOnStopCallBack) => void;
  - onFrameRecorded: (res: onFrameRecordedRes) => void;
  - onError: (res: RecordOnErrorCallBack) => void;
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
