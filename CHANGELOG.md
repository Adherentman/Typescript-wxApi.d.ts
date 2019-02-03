# CHANGELOG

## 2019-02-03

- 增加`getMenuButtonBoundingClientRect`Apis
- 增加`onWindowResize` Apis
- 增加`onKeyboardHeightChange` Apis

## 2019-01-26

- 加定时器Api
- 增加创建动画实例，以及链式调用

## 2019-01-25

- 增加console的Api

## *2018-12-26*

- 增加小程序生命周期的Api
- 增加小程序应用级事件的Api

## *2018-11-05*

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

## *2018-10-16*

- fix the type of the `wx.pageScrollTo` function [#6](https://github.com/Adherentman/Typescript-wxApi.d.ts/pull/6)

## _2018-09-30_

完善和修改以下 API

- 监控 Api
- 调试接口 Api
- 日志 Api

## _2018-09-28_

完善和修改以下 API

- 数据 Apis
- 更新 Apis

## _2018-09-26_

完善和修改以下 API

- 卡卷
- 设置
- 微信运动
- 当前账号信息
- 打开小程序
- 打开 App 获取发票抬头
- 生物认证
- 附近
- 内容安全

## _2018-09-24_

完善和修改以下 API

- 登录
- 授权
- 用户信息
- 微信支付

## _2018-09-22_

完善和修改以下 API

- 下拉刷新
- WXML 节点信息
- WXML 节点布局相交状态
- 自定义组件

## _2018-09-21_

完善和修改以下 API

- 设置窗口背景
- 设置置顶信息
- 导航
- 动画
  - todo 链式调用未解决
- 位置

## _2018-09-20_

完善和修改以下 API

- 交互反馈
- 设置导航条
- 设置 tabBar

## _2018-09-19_

完善和修改以下 API

- 蓝牙
- iBeacon
- 屏幕亮度
- 用户截屏事件
- 震动
- 手机联系人
- NFC
- Wi-Fi

## _2018-09-18_

完善和修改以下 API

- 系统信息
- 内存
- 网络状态
- 加速度计
- 罗盘
- 拨打电话
- 扫码
- 剪贴板

## _2018-09-17_

- 更新位置 API 的`createMapContext`

## _2018-09-14_

- 更新下载 api
- FileSystemManager 的所有 API 更新

## _2018-08-06_

- 修复 wx 点不出文件 Api
- 修复`openDocument`的参数`filePath`为可选

## _2018-08-05_

- 规范化`onBackgroundAudioPlay`, `onBackgroundAudioPause`, `onBackgroundAudioStop`返回`callback`值
- 修复`BackgroundAudioManager`返回的值，并且它的对象属性列表增加一个`protocol`
- 修复`createInnerAudioContext`返回的值
- 增加版本 1.9.0`innerAudioContext`所支持的对象方法
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
- 增加版本 2.1.0 有的 API`getAvailableAudioSources`
- 增加版本 2.1.0 里有的`createVideoContext`对象方法
  - showStatusBar
  - hideStatusBar
- 增加支持在版本 1.9.90 里的`createLivePlayerContext`两个方法
  - pause
  - resume
- 增加支持在版本 2.1.0 里的`createLivePusherContext`的一个方法`toggleTorch`
- 增加在版本 2.1.0 中添加的`loadFontFaceRes`动态加载字体 Api

## _2018-08-04_

- 增加一基础类型`ReturnCallBack`
- `RecordStart`增加一个`options` `audioSource`.
- 修复录音管理中`getRecorderManager`的所有 APIS
  - start: (options: RecordStartOpts) => void;
  - onStart: ReturnCallBack;
  - onPause: ReturnCallBack;
  - onStop: (res: RecordOnStopCallBack) => void;
  - onFrameRecorded: (res: onFrameRecordedRes) => void;
  - onError: (res: RecordOnErrorCallBack) => void;

## _2018-08-03_

- 修复`connectSocket`返回空函数
- 修复`onSocketOpen`返回一个回调函数
- 修复`onSocketError`返回一个回调函数
- 修复`onSocketMessage`返回一个`res.data`的回调函数
- 修复`onSocketClose`返回一个回调函数
- 修复`onOpen`返回一个回调函数
- 修复`onClose`返回一个回调函数
- 修复`onError`返回一个回调函数
- 修复`onMessage`返回一个回调函数

## _2018-08-02_

### Api Fixes

- 修复`uploadTask`中的`onProgressUpdate`方法无法`res.`出后面三个`progress`，`totalBytesExpectedToSend`， `totalBytesSent`

```typescript
let a = wx.uploadFile({ url: "dada", filePath: "daada", name: "dada" });
a.onProgressUpdate(res =>
  console.log(res.progress, res.totalBytesExpectedToSend, res.totalBytesSent)
);
```

- 修复`downloadTask`中的`onProgressUpdate`方法无法`res.`出后面三个`progress`，`totalBytesExpectedToSend`， `totalBytesSent`

```typescript
let a = wx.downloadTask({ url: "dada" });
a.onProgressUpdate(res =>
  console.log(res.progress, res.totalBytesExpectedToSend, res.totalBytesSent)
);
```

- `playVoiceOpts`中的`duration`必填改为可选。
