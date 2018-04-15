// Common Types

interface String2AnyMap {
  [key: string]: any;
}

interface String2StringMap {
  [key: string]: string | null;
}

type ZeroParamVoidFunc = () => void;

interface createLiveObj extends WxApiCallback {}

// App Types

interface AppReferrerInfo {
  appId: string;
  extraData: any;
}

interface AppLaunchShowFuncOpts {
  path: string;
  query: String2StringMap;
  scene: number;
  shareTicket: string;
  referrerInfo: AppReferrerInfo;
}

type AppLaunchShowFunc = (options: AppLaunchShowFuncOpts) => void;

interface AppOpts {
  onLaunch?: AppLaunchShowFunc;
  onShow?: AppLaunchShowFunc;
  onHide?: ZeroParamVoidFunc;
  onError?: (msg: string) => void;

  [key: string]: any;
}

interface IApp extends AppOpts {}

// Page Types

interface PageOpts<Data = {}> {
  data?: Data;
  onLoad?: (options: String2StringMap) => void;
  onReady?: ZeroParamVoidFunc;
  onShow?: ZeroParamVoidFunc;
  onHide?: ZeroParamVoidFunc;
  onUnload?: ZeroParamVoidFunc;
  onPullDownRefresh?: ZeroParamVoidFunc;
  onReachBottom?: ZeroParamVoidFunc;
  onShareAppMessage?: ZeroParamVoidFunc;
  onPageScroll?: ZeroParamVoidFunc;
  onTabItemTap?: (item: any) => void;

  [key: string]: any;
}

interface IPage<Data = {}> extends PageOpts<Data> {
  setData: (data: String2AnyMap) => void;
}

// Component Types

interface IComponent {}

interface WxApiCallback<Res = undefined> {
  success?: (res: Res) => void;
  fail?: (err: any) => void;
  complete?: (obj: any) => void;
}

// Network APIs

// 发起请求
type NetworkRequestData = string | object | ArrayBuffer;

interface NetworkRequestRes {
  data: NetworkRequestData;
  statusCode: number;
  header: String2StringMap;
}

interface NetworkRequestOpts extends WxApiCallback<NetworkRequestRes> {
  url: string;
  data?: NetworkRequestData;
  header?: String2StringMap;
  method?:
    | "OPTIONS"
    | "GET"
    | "HEAD"
    | "POST"
    | "PUT"
    | "DELETE"
    | "TRACE"
    | "CONNECT";
  dataType?: string;
  responseType?: "text" | "arraybuffer";
}

interface requestTask {
  abort: ZeroParamVoidFunc;
}

// 上传
interface uploadFileRes {
  data: string;
  statusCode: number;
}

interface uploadFileOpts extends WxApiCallback<uploadFileRes> {
  url: string;
  filePath: string;
  name: string;
  header?: object;
  formData?: object;
}

interface uploadTask {
  onProgressUpdate: (
    progress: number,
    totalBytesSent: number,
    totalBytesExpectedToSend: number
  ) => void;
  abort: ZeroParamVoidFunc;
}

// 下载
interface downloadRes {
  tempFilePath: string;
  statusCode: number;
}

interface downloadFileOpts extends WxApiCallback<downloadRes> {
  url: string;
  header?: object;
}

interface downloadTask {
  onProgressUpdate: (
    progress: number,
    totalBytesWritten: number,
    totalBytesExpectedToWrite: number
  ) => void;
  abort: ZeroParamVoidFunc;
}

// Webscoket connectSocket
interface connectSocketOpts extends WxApiCallback {
  url: string;
  header?: object;
  method?: string;
  protocols?: string[];
}

// sendSocketMessage
interface sendSocketMessageOpts extends WxApiCallback<sendSocketMessageRes> {}

interface sendSocketMessageRes {
  data: string | ArrayBuffer;
}

//onSocketMessage
interface onSocketMessageOpts {
  data: string | ArrayBuffer;
}

//closeSocket
interface closeSocketOpts extends WxApiCallback<closeSocketRes> {}

interface closeSocketRes {
  code?: number;
  reason?: string;
}

interface NetworkAPIs {
  // 发起请求
  request: (options: NetworkRequestOpts) => requestTask;
  // 上传、下载
  uploadFile: (options: uploadFileOpts) => uploadTask;
  downloadFile: (options: downloadFileOpts) => downloadTask;
  // WebSocket
  connectSocket: ZeroParamVoidFunc;
  onSocketOpen: ZeroParamVoidFunc;
  sendSocketMessageRes: (options: sendSocketMessageOpts) => void;
  onSocketMessage: (options: onSocketMessageOpts) => void;
  closeSocket: (options: closeSocketOpts) => void;
  onSocketClose: ZeroParamVoidFunc;
}

//SocketTask APIs

//send
interface sendOpts extends WxApiCallback<sendRes> {}

interface sendRes {
  data?: string | ArrayBuffer;
}

//close
interface closeOpts extends WxApiCallback<closeRes> {}

interface closeRes {
  code?: number;
  reason?: string;
}

//onError
interface onErrorOpts {
  errMsg?: string;
}

//onMessage
interface onMessageOpts {
  data?: string | ArrayBuffer;
}
interface SocketTaskAPIs {
  send: (options?: sendOpts) => void;
  close: (options?: closeOpts) => void;
  onOpen: ZeroParamVoidFunc;
  onClose: ZeroParamVoidFunc;
  onError: (options?: onErrorOpts) => void;
  onMessage: (options?: onMessageOpts) => void;
}

// Media APIs

// picture 图片

interface tempFilesStruct {
  path: string;
  size: number;
}

interface chooseImageRes {
  tempFilePaths: string[];
  tempFiles: tempFilesStruct;
}

interface chooseImageOpts extends WxApiCallback<chooseImageRes> {
  count?: number;
  sizeType?: string[];
  sourceType?: string[];
}

interface previewImageOpts extends WxApiCallback {
  current?: string;
  urls: string[];
}

interface getImageInfoRes {
  width: number;
  height: number;
  path: string;
  orientation:
    | "up"
    | "down"
    | "left"
    | "right"
    | "up-mirrored"
    | "down-mirrored"
    | "left-mirrored"
    | "right-mirrored"; //1.9.90
  type: string; //1.9.90
}

interface getImageInfoOpts extends WxApiCallback<getImageInfoRes> {
  src: string;
}

interface saveImageToPhotosAlbumRes {
  errMsg: string;
}

interface saveImageToPhotosAlbumOpts extends WxApiCallback {
  filePath: string;
}

// Record 录音

interface startRecordRes {
  tempFilePath: string;
}

interface startRecordOpts extends WxApiCallback<startRecordRes> {}

interface RecordStartOpts {
  duration?: number;
  sampleRate?: number;
  numberOfChannels?: "1" | "2";
  encodeBitRate?: number;
  format?: "aac" | "mp3";
  frameSize?: number;
}

interface RecordOnStopRes {
  tempFilePath: string;
}

interface onFrameRecordedRes {
  frameBuffer: ArrayBuffer;
  isLastFrame: boolean;
}

interface RecordOnError {
  errMsg: string;
}

//不确定
interface getRecorderManagerOpts {
  start?: RecordStartOpts;
  pause?: ZeroParamVoidFunc;
  resume?: ZeroParamVoidFunc;
  stop?: ZeroParamVoidFunc;
  onStart?: ZeroParamVoidFunc;
  onPause?: ZeroParamVoidFunc;
  onStop?: RecordOnStopRes;
  onFrameRecorded?: onFrameRecordedRes;
  onError?: RecordOnError;
}

// Voice 音频

interface playVoiceOpts extends WxApiCallback {
  filePath: string;
  duration: number;
}

interface getBackgroundAudioPlayerStateRes {
  duration: number;
  currentPosition: number;
  status: "2" | "1" | "0";
  downloadPercent: number;
  dataUrl: string;
}

interface getBackgroundAudioPlayerStateOpts
  extends WxApiCallback<getBackgroundAudioPlayerStateRes> {}

interface playBackgroundAudioOpts extends WxApiCallback {
  dataUrl: string;
  title?: string;
  coverImgUrl?: string;
}

interface seekBackgroundAudioOpts extends WxApiCallback {
  position: number;
}

interface getBackgroundAudioManagerOpts {
  duration: number;
  currentTime: number;
  paused: boolean;
  src?: string;
  startTime?: number;
  buffered: number;
  title?: string;
  epname?: string;
  singer?: string;
  coverImgUrl?: string;
  webUrl?: string;
  play: ZeroParamVoidFunc;
  pause: ZeroParamVoidFunc;
  stop: ZeroParamVoidFunc;
  seek: (position: number) => void;
  onCanplay: WxApiCallback;
  onPlay: WxApiCallback;
  onPause: WxApiCallback;
  onStop: WxApiCallback;
  onEnded: WxApiCallback;
  onTimeUpdate: WxApiCallback;
  onPrev: WxApiCallback;
  onNext: WxApiCallback;
  onError: WxApiCallback;
  onWaiting: WxApiCallback;
}

interface createInnerAudioContextOpts {
  src?: string;
  startTime?: number;
  autoplay?: boolean;
  loop?: boolean;
  obeyMuteSwitch?: boolean;
  duration: number;
  currentTime: number;
  paused: boolean;
  buffered: number;
  volume: number; //1.9.90
  play: ZeroParamVoidFunc;
  pause: ZeroParamVoidFunc;
  stop: ZeroParamVoidFunc;
  seek: (position: number) => void;
  destroy: ZeroParamVoidFunc;
  onCanplay: WxApiCallback;
  onPlay: WxApiCallback;
  onPause: WxApiCallback;
  onStop: WxApiCallback;
  onEnded: WxApiCallback;
  onTimeUpdate: WxApiCallback;
  onError: WxApiCallback;
  onWaiting: WxApiCallback;
  onSeeking: WxApiCallback;
  onSeeked: WxApiCallback;
}

// Video 视频

interface chooseVideoRes {
  tempFilePath: string;
  duration: number;
  size: string;
  height: number;
  width: number;
}

interface chooseVideoOpts extends WxApiCallback<chooseImageRes> {
  sourceType?: string[];
  compressed?: boolean;
  maxDuration?: number;
}

interface saveVideoToPhotosAlbumRes {
  errMsg: string;
}

interface saveVideoToPhotosAlbumOpts
  extends WxApiCallback<saveImageToPhotosAlbumRes> {
  filePath: string;
}

interface Videodanmu {
  text: string;
  color: string;
}
interface createVideoContextOpts {
  play: ZeroParamVoidFunc;
  pause: ZeroParamVoidFunc;
  seek: (position: number) => void;
  sendDanmu: Videodanmu;
  playbackRate: "0.5" | "0.8" | "1.0" | "1.25" | "1.5";
  requestFullScreen: ZeroParamVoidFunc;
  exitFullScreen: ZeroParamVoidFunc;
}

interface takePhotoObj extends WxApiCallback {
  quality?: "high" | "normal" | "low";
}

interface startRecordObj extends WxApiCallback {
  timeoutCallback: ZeroParamVoidFunc;
}

interface stopRecordObj extends WxApiCallback {}

interface createCameraContextOpts {
  takePhoto: (options: takePhotoObj) => void;
  startRecord: (options: startRecordObj) => void;
  stopRecord: (options: stopRecordObj) => void;
}

interface requestFullScreenObj extends WxApiCallback {
  direction: number;
}

interface exitFullScreen extends WxApiCallback {}

interface createLivePlayerContextOpts {
  play: createLiveObj;
  stop: createLiveObj;
  mute: createLiveObj;
  requestFullScreen: requestFullScreenObj;
  exitFullScreen: createLiveObj;
}

interface createLivePusherContextOpts {
  start: createLiveObj;
  stop: createLiveObj;
  pause: createLiveObj;
  resume: createLiveObj;
  switchCamera: createLiveObj;
  snapshot: createLiveObj;
}

interface MediaAPIs {
  chooseImage: (options: chooseImageOpts) => void;
  previewImage: (options: previewImageOpts) => void;
  getImageInfo: (options: getImageInfoOpts) => void;
  saveImageToPhotosAlbum: (options: saveImageToPhotosAlbumOpts) => void;
  startRecord: (options: startRecordOpts) => void;
  stopRecord: ZeroParamVoidFunc;
  getRecorderManager: getRecorderManagerOpts;
  playVoice: (options: playVoiceOpts) => void; //注意：1.6.0 版本开始，本接口不再维护。建议使用能力更强的 wx.createInnerAudioContext 接口
  pauseVoice: ZeroParamVoidFunc; //注意：1.6.0 版本开始，本接口不再维护。建议使用能力更强的 wx.createInnerAudioContext 接口
  stopVoice: ZeroParamVoidFunc; //注意：1.6.0 版本开始，本接口不再维护。建议使用能力更强的 wx.createInnerAudioContext 接口
  getBackgroundAudioPlayerState: (
    options: getBackgroundAudioPlayerStateOpts
  ) => void; //注意：1.2.0 版本开始，本接口不再维护。建议使用能力更强的 wx.getBackgroundAudioManager 接口
  playBackgroundAudio: (options: playBackgroundAudioOpts) => void; //注意：1.2.0 版本开始，本接口不再维护。建议使用能力更强的 wx.getBackgroundAudioManager 接口
  pauseBackgroundAudio: ZeroParamVoidFunc; //注意：1.2.0 版本开始，本接口不再维护。建议使用能力更强的 wx.getBackgroundAudioManager 接口
  seekBackgroundAudio: (options: seekBackgroundAudioOpts) => void; //注意：1.2.0 版本开始，本接口不再维护。建议使用能力更强的 wx.getBackgroundAudioManager 接口
  stopBackgroundAudio: ZeroParamVoidFunc; //注意：1.2.0 版本开始，本接口不再维护。建议使用能力更强的 wx.getBackgroundAudioManager 接口
  //callback
  onBackgroundAudioPlay: (callback: any) => void; //注意：1.2.0 版本开始，本接口不再维护。建议使用能力更强的 wx.getBackgroundAudioManager 接口
  onBackgroundAudioPause: (callback: any) => void; //注意：1.2.0 版本开始，本接口不再维护。建议使用能力更强的 wx.getBackgroundAudioManager 接口
  onBackgroundAudioStop: (callback: any) => void; //注意：1.2.0 版本开始，本接口不再维护。建议使用能力更强的 wx.getBackgroundAudioManager 接口
  getBackgroundAudioManager: getBackgroundAudioManagerOpts;
  createAudioContext: (audioId: string, that: IComponent) => void; //注意：1.6.0 版本开始，本接口不再维护。建议使用能力更强的 wx.createInnerAudioContext 接口
  createInnerAudioContext: createInnerAudioContextOpts;
  chooseVideo: (options: chooseVideoOpts) => void;
  saveVideoToPhotosAlbum: (options: saveVideoToPhotosAlbumOpts) => void;
  createVideoContext: (
    audioId: string,
    that: IComponent
  ) => createVideoContextOpts;
  createCameraContext: () => createCameraContextOpts;
  createLivePlayerContext: (domid: string) => createLivePlayerContextOpts;
  createLivePusherContext: () => createLivePusherContextOpts;
}

// File APIs

// save
interface saveFileRes {
    savedFilePath: string
}

interface saveFileOpts extends WxApiCallback<saveFileRes> {
    tempFilePath: string;
}

//getFileInfo
interface getFileInfoRes {
    size: number;
    digest: string;
    errMsg: string;
}

interface getFileInfoOpts extends WxApiCallback<getFileInfoRes> {
    filePath: string;
    digestAlgorithm?: string;
}

// getSavedFileList
interface fileListOpts {
    filePath: string;
    createTime: number;
    size: number;
}

interface getSavedFileListRes {
    errMsg: string
    fileList: fileListOpts;
}

interface getSavedFileListOpts extends WxApiCallback<getSavedFileListRes> {}

// getSavedFileInfo
interface getSavedFileInfoRes {
    errMsg: string;
    size: number;
    createTime: number;
}

interface getSavedFileInfoOpts extends WxApiCallback<getSavedFileInfoRes> {
    filePath: String;
}

// removeSavedFile
interface removeSavedFileOpts extends WxApiCallback {
    filePath: string;
}

// openDocument
interface openDocumentOpts extends WxApiCallback {
    filePath: string;
    fileType: string;
}

interface FileAPIs {
    saveFile: (options: saveFileOpts) => void;
    getFileInfo: (options: getFileInfoOpts) => void;
    getSavedFileList: (options: getSavedFileListOpts) => void;
    getSavedFileInfoRes: (options: getSavedFileInfoOpts) => void;
    removeSavedFile: (options: removeSavedFileOpts) => void;
    openDocument: (options: openDocumentOpts) => void;
}


// Location APIs

//获取位置
// getLocation
interface getLocationRes {
    latitude: number;
    longitude: number;
    speed: number;
    accuracy: number;
    altitude: number;
    verticalAccuracy: number;
    horizontalAccuracy: number;
}

interface getLocationOpts extends WxApiCallback<getLocationRes> {
    type?: string;
    altitude?: boolean;
}

//chooseLocation
interface chooseLocationRes {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
}

interface chooseLocationOpts extends WxApiCallback<chooseLocationRes> {}

//查看位置
interface openLocationOpts extends WxApiCallback {
    latitude: number;
    longitude: number;
    scale?: number;
    name?: string;
    address?: string;
}

interface LocationAPIs {
    getLocation: (options: getLocationOpts) => void;
    chooseLocation: (options: chooseLocationOpts) => void;
    openLocation: (options: openLocationOpts) => void;
    createMapContext: any;
}

// Storage APIs

interface SetStorageOpts extends WxApiCallback {
  key: string;
  data: object | string;
}

interface GetStorageRes {
  data: object | string;
}

interface GetStorageOpts extends WxApiCallback<GetStorageRes> {
  key: string;
}

interface GetStorageInfoRes {
  keys: string[];
  currentSize: number;
  limitSize: number;
}

interface GetStorageInfoOpts extends WxApiCallback<GetStorageInfoRes> {}

type RemoveStorageOpts = GetStorageOpts;

interface ClearStorageOpts extends WxApiCallback {}

interface StorageAPIs {
  setStorage: (options: SetStorageOpts) => void;
  setStorageSync: (key: string, data: object | string) => void;
  getStorage: (options: SetStorageOpts) => void;
  getStorageSync: (key: string) => object | string;
  getStorageInfo: (options: GetStorageInfoOpts) => void;
  getStorageInfoSync: () => GetStorageInfoRes;
  removeStorage: (options: RemoveStorageOpts) => void;
  removeStorageSync: (key: string) => object | string;
  clearStorage: (options: ClearStorageOpts) => void;
  clearStorageSync: () => void;
}


//  Device APIs

// 系统信息
// getSystemInfo
interface getSystemInfoRes {
  brand: string;
  model: string;
  pixelRatio: any;
  screenWidth: number;
  screenHeight: number;
  windowWidth: number;
  windowHeight: number;
  statusBarHeight: number;
  language: string;
  version: number;
  system: any;
  platform: string;
  fontSizeSetting: number;
  SDKVersion: any;
}

interface getSystemInfoOpts extends WxApiCallback<getSystemInfoRes> {}

// getSystemInfoSync
interface getSystemInfoSyncRes {
  brand: string;
  model: string;
  pixelRatio: any;
  screenWidth: number;
  screenHeight: number;
  windowWidth: number;
  windowHeight: number;
  statusBarHeight: number;
  language: string;
  version: number;
  system: any;
  platform: string;
  fontSizeSetting: number;
  SDKVersion: any;
}

// 网络状态
// getNetworkType
interface getNetworkTypeRes {
  networkType: string;
}

interface getNetworkTypeOpts extends WxApiCallback<getNetworkTypeRes> {}

// onNetworkStatusChange
interface onNetworkStatusChangeOpts {
  isConnected: boolean;
  networkType: 'wifi' | '2g' | '3g' | '4g' | 'none' | 'unknown'
}

// 屏幕亮度
// setScreenBrightness
interface setScreenBrightnessOpts extends WxApiCallback{
  value: number
}

// getScreenBrightness
interface getScreenBrightnessRes {
  value: number;
}

interface getScreenBrightnessOpts extends WxApiCallback<getScreenBrightnessRes> {}

// setKeepScreenOn
interface setKeepScreenOnRes {
  errMsg: string;
}
interface setKeepScreenOnOpts extends WxApiCallback<setKeepScreenOnRes>{
  keepScreenOn: boolean;
}

// 震动
// vibrateLong
interface vibrateLongOpts extends WxApiCallback {}

// vibrateShort
interface vibrateShortOpts extends WxApiCallback {}

interface DeviceAPIs {
  getSystemInfo: (options: getSystemInfoOpts) => void;
  getSystemInfoSync: () => getSystemInfoSyncRes;
  canIUse: (string: any) => void;
  getNetworkType: (options: getNetworkTypeOpts) => void;
  onNetworkStatusChange: (res: onNetworkStatusChangeOpts) => void;
  setScreenBrightness: (options: setScreenBrightnessOpts) => void;
  getScreenBrightness: (options: getScreenBrightnessOpts) => void;
  setKeepScreenOn: (options: setKeepScreenOnOpts) => void;
  vibrateLong: (options: vibrateLongOpts) => void;
  vibrateShort: (options: vibrateShortOpts) => void;
}

// UI APIs

// Interactive feedback 交互反馈
interface ShowToastOpts extends WxApiCallback {
  title: string;
  icon?: "success" | "loading" | "none";
  image?: string;
  duration?: number;
  mask?: boolean;
}

interface ShowLoadingOpts extends WxApiCallback {
  title: string;
  mask?: boolean;
}

interface ShowModalRes {
  confirm: boolean;
  cancel: boolean;
}

interface ShowModalOpts extends WxApiCallback<ShowModalRes> {
  title: string;
  content: string;
  showCancel?: boolean;
  cancelText?: string;
  cancelColor?: string;
  confirmText?: string;
  confirmColor?: string;
}

interface ShowActionSheetRes {
  tapIndex: number;
}

interface ShowActionSheetOpts extends WxApiCallback<ShowActionSheetRes> {
  itemList: string | any[];
  itemColor?: string;
}

// Navigation bar 设置导航条

interface setTopBarTextOpts extends WxApiCallback {
  text: string;
}

interface setNavigationBarTitleOpts extends WxApiCallback {
  title: string;
}

interface setNavigationBarColorRes {
  errMsg: string;
}

interface animationOpts {
  duration: number;
  timingFunc: "linear" | "easeIn" | "easeOut" | "easeInOut";
}

interface setNavigationBarColorOpts
  extends WxApiCallback<setNavigationBarColorRes> {
  frontColor: string;
  backgroundColor: string;
  animation: animationOpts;
}

// TabBar 设置tabBar

interface setTabBarBadgeOpts extends WxApiCallback {
  index: number;
  text: string;
}

interface removeTabBarBadgeOpts extends WxApiCallback {
  index: number;
}

interface showTabBarRedDotOpts extends WxApiCallback {
  index: number;
}

interface hideTabBarRedDotOpts extends WxApiCallback {
  index: number;
}

interface setTabBarStyleOpts extends WxApiCallback {
  color?: string;
  selectedColor?: string;
  backgroundColor?: string;
  borderStyle?: "black" | "white";
}

interface setTabBarItemOpts extends WxApiCallback {
  index: number;
  text?: string;
  iconPath?: string;
  selectedIconPath?: string;
}

interface showTabBarOpts extends WxApiCallback {
  animation: boolean;
}

interface hideTabBarOpts extends WxApiCallback {
  animation: boolean;
}

// navigate 导航

interface navigateOpts extends WxApiCallback {
  url: string;
}

// animation 动画

interface createAnimationOpts {
  duration?: number;
  timingFunction?:
    | "linear"
    | "ease"
    | "ease-in"
    | "ease-in-out"
    | "ease-out"
    | "step-start"
    | "step-end";
  delay?: number;
  transformOrigin?: string;
}
// todo animation实例

interface startPullDownRefreshRes {
  errMsg: string;
}

interface startPullDownRefreshOpts
  extends WxApiCallback<startPullDownRefreshRes> {}

interface UIAPIs {
  showToast: (options: ShowToastOpts) => void;
  showLoading: (options: ShowLoadingOpts) => void;
  hideToast: ZeroParamVoidFunc;
  hideLoading: ZeroParamVoidFunc;
  showModal: (options: ShowModalOpts) => void;
  showActionSheet: (options: ShowActionSheetOpts) => void;
  setNavigationBarTitle: (options: setNavigationBarTitleOpts) => void;
  showNavigationBarLoading: ZeroParamVoidFunc;
  hideNavigationBarLoading: ZeroParamVoidFunc;
  setNavigationBarColor: (options: setNavigationBarColorOpts) => void;
  setTabBarBadge: (options: setTabBarBadgeOpts) => void; //1.9.0
  removeTabBarBadge: (options: removeTabBarBadgeOpts) => void; //1.9.0
  showTabBarRedDot: (options: showTabBarRedDotOpts) => void; //1.9.0
  hideTabBarRedDot: (options: hideTabBarRedDotOpts) => void; //1.9.0
  setTabBarStyle: (options: setTabBarStyleOpts) => void; //1.9.0
  setTabBarItem: (options: setTabBarItemOpts) => void; //1.9.0
  showTabBar: (options: showTabBarOpts) => void; //1.9.0
  hideTabBar: (options: hideTabBarOpts) => void; //1.9.0
  setTopBarText: (options: setTopBarTextOpts) => void;  
  navigateTo: (options: navigateOpts) => void;
  redirectTo: (options: navigateOpts) => void;
  switchTab: (options: navigateOpts) => void;
  navigateBack: (delta: number) => void;
  reLaunch: (options: navigateOpts) => void;
  createAnimation: (options: createAnimationOpts) => void;
  pageScrollTo: (scrollTop: number, duration: number) => void;
  //todo 绘图
  startPullDownRefresh: (options: startPullDownRefreshOpts) => void;
  stopPullDownRefresh: ZeroParamVoidFunc;
  //todo WXML节点信息API
  //todo WXML节点布局相交状态
}

// Third party APIs
interface ThirdPartyAPIs {}

// Open Interface APIs

interface LoginRes {
  errMsg?: string;
  code?: string;
}

interface LoginOpts extends WxApiCallback<LoginRes> {
  timeout?: number;
}

interface CheckSessionOpts extends WxApiCallback {}

interface AuthorizeRes {
  errMsg: string;
}

interface AuthorizeOpts extends WxApiCallback<AuthorizeRes> {
  scope:
    | "scope.userInfo"
    | "scope.userLocation"
    | "scope.address"
    | "wx.chooseAddress"
    | "scope.invoiceTitle"
    | "wx.chooseInvoiceTitle"
    | "scope.werun"
    | "wx.getWeRunData"
    | "scope.record"
    | "wx.startRecord"
    | "scope.writePhotosAlbum"
    | "wx.saveImageToPhotosAlbum"
    | "wx.saveVideoToPhotosAlbum"
    | "scope.camera";
}

//用户信息
// getUserInfo
interface userInfoOpts {
    nickName: string;
    avatarUrl: string;
    gender: string;
    city: string;
    province: string;
    country: string;
    language: string;
}

interface getUserInfoRes {
    userInfo: userInfoOpts;
    rawData: string;
    signature: string;
    encryptedData: string;
    iv: string;
}
interface getUserInfoOpts extends WxApiCallback<getUserInfoRes> {
    withCredentials: boolean;
    lang?: string;
    timeout?: number;
}

// 微信支付
interface requestPaymentOpts extends WxApiCallback {
    timeStamp: string;
    nonceStr: string;
    package: string;
    signType: string;
    paySign: string;
}

interface OpenInterfaceAPIs {
  login: (options: LoginOpts) => void;
  checkSession: (options: CheckSessionOpts) => void;
  authorize: (optiona: AuthorizeOpts) => void;
  getUserInfo: (options: getUserInfoOpts) => void;
  requestPayment: (options: requestPaymentOpts) => void;
}

// Multithreading APIs

interface MultithreadingAPIs {}

// Debugging APIs

interface DebuggingAPIs {}

// Declares

declare let wx: NetworkAPIs &
  MediaAPIs &
  StorageAPIs &
  LocationAPIs &
  DeviceAPIs &
  UIAPIs &
  ThirdPartyAPIs &
  OpenInterfaceAPIs &
  MultithreadingAPIs &
  DebuggingAPIs;

declare let SocketTask: SocketTaskAPIs;

declare function App(app: AppOpts): void;
declare function Page(page: PageOpts): void;
declare function getApp(): IApp;
declare function getCurrentPages(): IPage[];
