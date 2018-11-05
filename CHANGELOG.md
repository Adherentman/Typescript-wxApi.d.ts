# CHANGELOG
利用业余时间每周一更新，与小程序文档核对API

#### *2018-11-05*
- 增加`wx.compressImage`API，压缩图片接口，可选压缩质量
- 增加mDNS相关API
  - offLocalServiceDiscoveryStop
  - offLocalServiceFound
  - offLocalServiceLost
  - offLocalServiceResolveFail
  - onLocalServiceDiscoveryStop
  - onLocalServiceFound
  - onLocalServiceLost
  - onLocalServiceResolveFail
  - startLocalServiceDiscovery
  - stopLocalServiceDiscovery
- 增加图片API的注释
- 增加下载，发起请求，上传API的注释


#### *2018-10-16*
- fix the type of the `wx.pageScrollTo` function [#6](https://github.com/Adherentman/Typescript-wxApi.d.ts/pull/6)

#### *2018-09-30*
完善和修改以下API
- 监控Api
- 调试接口Api
- 日志Api

#### *2018-09-28*
完善和修改以下API
- 数据Apis
- 更新Apis


#### *2018-09-26*
完善和修改以下API
- 卡卷
- 设置
- 微信运动
- 当前账号信息
- 打开小程序
- 打开App获取发票抬头
- 生物认证
- 附近
- 内容安全

#### *2018-09-24*
完善和修改以下API
- 登录
- 授权
- 用户信息
- 微信支付

#### *2018-09-22*
完善和修改以下API
- 下拉刷新
- WXML节点信息
- WXML节点布局相交状态
- 自定义组件

#### *2018-09-21*
完善和修改以下API
- 设置窗口背景
- 设置置顶信息
- 导航
- 动画
  - todo 链式调用未解决
- 位置

#### *2018-09-20*
完善和修改以下API
- 交互反馈
- 设置导航条
- 设置tabBar

#### *2018-09-19*
完善和修改以下API
- 蓝牙
- iBeacon
- 屏幕亮度
- 用户截屏事件
- 震动
- 手机联系人
- NFC
- Wi-Fi

#### *2018-09-18*
完善和修改以下API
- 系统信息
- 内存
- 网络状态
- 加速度计
- 罗盘
- 拨打电话
- 扫码
- 剪贴板

#### *2018-09-17*
- 更新位置API的`createMapContext`

#### *2018-09-14*
- 更新下载api
- FileSystemManager的所有API更新

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
