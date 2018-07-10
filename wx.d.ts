// Common Types

interface string2AnyMap {
  [key: string]: any;
}

interface string2stringMap {
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
  query: string2stringMap;
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
  onLoad?: (options: string2stringMap) => void;
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
  setData: (data: string2AnyMap) => void;
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
  header: string2stringMap;
}

interface NetworkRequestOpts extends WxApiCallback<NetworkRequestRes> {
  url: string;
  data?: NetworkRequestData;
  header?: string2stringMap;
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
  onSocketError: ZeroParamVoidFunc;
  sendSocketMessage: (options: sendSocketMessageOpts) => void;
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
  savedFilePath: string;
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
  errMsg: string;
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
  filePath: string;
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
  getStorage: (options: GetStorageOpts) => void;
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
  networkType: "wifi" | "2g" | "3g" | "4g" | "none" | "unknown";
}

//加速度计

interface onAccelerometerChangeOpts {
  x: number;
  y: number;
  z: number;
}

//罗盘
interface onCompassChangeOpts {
  direction: number;
}

// 拨打电话
interface makePhoneCallOpts extends WxApiCallback {
  phoneNumber: string;
}

// 扫码
interface scanCodeRes {
  result: string;
  scanType: string;
  charSet: string;
  path: string;
}

interface scanCodeOpts extends WxApiCallback<scanCodeRes> {
  onlyFromCamera?: boolean;
  scanType?: any[];
}

// 剪贴板
interface setClipboardDataOpts extends WxApiCallback {
  data: string;
}

interface getClipboardDataRes {
  data: string;
}

interface getClipboardDataOpts extends WxApiCallback<getClipboardDataRes> {}

// 蓝牙
interface getBluetoothAdapterStateRes {
  discovering: boolean;
  available: boolean;
  errMsg: string;
}

interface getBluetoothAdapterStateOpts
  extends WxApiCallback<getBluetoothAdapterStateRes> {}

interface onBluetoothAdapterStateChangeCb {
  available: boolean;
  discovering: boolean;
}

interface startBluetoothDevicesDiscoveryRes {
  errMsg: string;
}

interface startBluetoothDevicesDiscoveryOpts
  extends WxApiCallback<startBluetoothDevicesDiscoveryRes> {
  services?: any[];
  allowDuplicatesKey?: boolean;
  interval: number;
}

interface stopBluetoothDevicesDiscoveryRes {
  errMsg: string;
}

interface stopBluetoothDevicesDiscoveryOpts
  extends WxApiCallback<stopBluetoothDevicesDiscoveryRes> {}

interface getBluetoothDevicesRes {
  devices: any[];
  errMsg: string;
}

interface getBluetoothDevicesOpts
  extends WxApiCallback<getBluetoothDevicesRes> {}

interface getConnectedBluetoothDevicesRes {
  devices: any[];
  errMsg: string;
}

interface getConnectedBluetoothDevicesOpts
  extends WxApiCallback<getConnectedBluetoothDevicesRes> {
  services: any[];
}

interface createBLEConnectionRes {
  errMsg: string;
}

interface createBLEConnectionOpts
  extends WxApiCallback<createBLEConnectionRes> {
  deviceId: string;
}

interface closeBLEConnectionRes {
  errMsg: string;
}

interface closeBLEConnectionOpts extends WxApiCallback<closeBLEConnectionRes> {
  deviceId: string;
}

interface getBLEDeviceServicesArray {
  uuid: string;
  isPrimary: boolean;
}
interface getBLEDeviceServicesRes {
  services: getBLEDeviceServicesArray;
  errMsg: string;
}

interface getBLEDeviceServicesOpts
  extends WxApiCallback<getBLEDeviceServicesRes> {
  deviceId: string;
}

interface getBLEDeviceCharacteristicsRes {
  characteristics: any[];
  errMsg: string;
}

interface getBLEDeviceCharacteristicsOpts
  extends WxApiCallback<getBLEDeviceCharacteristicsRes> {
  deviceId: string;
  serviceId: string;
}

interface readBLECharacteristicValueRes {
  errCode: number;
  errMsg: string;
}

interface readBLECharacteristicValueOpts
  extends WxApiCallback<readBLECharacteristicValueRes> {
  deviceId: string;
  serviceId: string;
  characteristicId: string;
}

interface writeBLECharacteristicValueRes {
  errMsg: string;
}

interface writeBLECharacteristicValueOpts
  extends WxApiCallback<writeBLECharacteristicValueRes> {
  deviceId: string;
  serviceId: string;
  characteristicId: string;
  value: ArrayBuffer;
}

interface notifyBLECharacteristicValueChangeRes {
  errMsg: string;
}

interface notifyBLECharacteristicValueChangeOpts
  extends WxApiCallback<notifyBLECharacteristicValueChangeRes> {
  deviceId: string;
  serviceId: string;
  characteristicId: string;
  state: boolean;
}

// iBeacon
interface startBeaconDiscoveryRes {
  errMsg: string;
}

interface startBeaconDiscoveryOpts extends WxApiCallback<startBeaconDiscoveryRes> {
  uuid: any
} 

interface stopBeaconDiscoveryRes {
  errMsg: string
}

interface stopBeaconDiscoveryOpts extends WxApiCallback<stopBeaconDiscoveryRes> {}

interface getBeaconsRes {
  beacons: any;
  errMsg: string;
}

interface getBeaconsOpts extends WxApiCallback<getBeaconsRes> {}

// 屏幕亮度
interface setScreenBrightnessOpts extends WxApiCallback {
  value: number;
}

interface getScreenBrightnessRes {
  value: number;
}

interface getScreenBrightnessOpts
  extends WxApiCallback<getScreenBrightnessRes> {}

interface setKeepScreenOnRes {
  errMsg: string;
}
interface setKeepScreenOnOpts extends WxApiCallback<setKeepScreenOnRes> {
  keepScreenOn: boolean;
}

// 震动
interface vibrateLongOpts extends WxApiCallback {}

interface vibrateShortOpts extends WxApiCallback {}

//手机联系人
interface addPhoneContactOpts extends WxApiCallback {
  photoFilePath: string;
  nickName: string;
  lastName:	string;
  middleName: string;
  firstName: string;
  remark: string;
  mobilePhoneNumber: string;
  weChatNumber: string;
  addressCountry: string;
  addressState: string;
  addressCity: string;
  addressStreet: string;
  addressPostalCode: string;
  organization: string;
  title: string;
  workFaxNumber: string;
  workPhoneNumber: string;
  hostNumber: string;
  email: string;
  url: string;
  workAddressCountry: string;
  workAddressState: string;
  workAddressCity: string;
  workAddressStreet: string;
  workAddressPostalCode: string;
  homeFaxNumber: string;
  homePhoneNumber: string;
  homeAddressCountry: string;
  homeAddressState: string;
  homeAddressCity: string;
  homeAddressStreet: string;
  homeAddressPostalCode: string;
}

// NFC
interface getHCEStateRes {
  errMsg: string;
  errCode: number;
}

interface getHCEStateOpts extends WxApiCallback<getHCEStateRes> {}

interface startHCERes {
  errMsg: string;
  errCode: number;
}

interface startHCEOpts extends WxApiCallback<startHCERes> {
  aid_list: any[];  
}

interface stopHCERes {
  errMsg: string;
  errCode: number;
}

interface stopHCEOpts extends WxApiCallback<stopHCERes> {}

interface sendHCEMessageRes {
  errMsg: string;
  errCode: number;
}
interface sendHCEMessageOpts extends WxApiCallback<sendHCEMessageRes> {
  data: ArrayBuffer;
}

// Wifi
interface startWifiOpts extends WxApiCallback {}

interface stopWifiOpts extends WxApiCallback {}

interface connectWifiOpts extends WxApiCallback {
  SSID: string;
  BSSID: string;
  password?: string;
}

interface getWifiListOpts extends WxApiCallback {}


interface wifiLs {
  SSID: string;
  BSSID: string;
  secure: boolean;
  signalStrength: number;
}

interface onGetWifiListCb {
  wifiList: wifiLs
}

interface setWifiListOpts extends WxApiCallback {
  wifiList: wifiLs
}

interface wifiInfo {
  SSID: string;
  BSSID: string;
  secure: boolean;
  signalStrength: number;
}

interface onWifiConnectedCb {
  wifi: wifiInfo
}

interface DeviceAPIs {
  getSystemInfo: (options: getSystemInfoOpts) => void;
  getSystemInfoSync: () => getSystemInfoSyncRes;
  canIUse: (string: any) => void;
  getNetworkType: (options: getNetworkTypeOpts) => void;
  onNetworkStatusChange: (res: onNetworkStatusChangeOpts) => void;
  onAccelerometerChange: (res) => onAccelerometerChangeOpts;
  startAccelerometer: (options: WxApiCallback) => void;
  stopAccelerometer: (options: WxApiCallback) => void;
  onCompassChange: (cb) => onCompassChangeOpts;
  startCompass: (options: WxApiCallback) => void;
  stopCompass: (options: WxApiCallback) => void;
  makePhoneCall: (options: makePhoneCallOpts) => void;
  scanCode: (options: scanCodeOpts) => void;
  setClipboardData: (options: setClipboardDataOpts) => void;
  getClipboardData: (options: getClipboardDataOpts) => void;
  openBluetoothAdapter: (options: WxApiCallback) => void;
  closeBluetoothAdapter: (options: WxApiCallback) => void;
  getBluetoothAdapterState: (options: getBluetoothAdapterStateOpts) => void;
  onBluetoothAdapterStateChange: (cb) => onBluetoothAdapterStateChangeCb;
  startBluetoothDevicesDiscovery: (
    options: startBluetoothDevicesDiscoveryOpts
  ) => void;
  stopBluetoothDevicesDiscovery: (
    options: stopBluetoothDevicesDiscoveryOpts
  ) => void;
  getBluetoothDevices: (options: getBluetoothDevicesRes) => void;
  getConnectedBluetoothDevices: (
    options: getConnectedBluetoothDevicesOpts
  ) => void;
  onBluetoothDeviceFound: any;
  createBLEConnection: (options: createBLEConnectionOpts) => void;
  closeBLEConnection: (options: closeBLEConnectionOpts) => void;
  getBLEDeviceServices: (options: getBLEDeviceServicesOpts) => void;
  getBLEDeviceCharacteristics: (
    options: getBLEDeviceCharacteristicsOpts
  ) => void;
  readBLECharacteristicValue: (options: readBLECharacteristicValueOpts) => void;
  writeBLECharacteristicValue: (
    options: writeBLECharacteristicValueOpts
  ) => void;
  notifyBLECharacteristicValueChange: (
    options: notifyBLECharacteristicValueChangeOpts
  ) => void;
  onBLEConnectionStateChange: any;
  onBLECharacteristicValueChange: any;
  startBeaconDiscovery: (options: startBeaconDiscoveryOpts) => void;
  stopBeaconDiscovery: (options: stopBeaconDiscoveryOpts) => void;
  getBeacons: (options: getBeaconsOpts) => void;
  onBeaconUpdate: any;
  onBeaconServiceChange: any;
  onUserCaptureScreen: any;
  addPhoneContact: (options: addPhoneContactOpts) => void;
  getHCEState: (options: getHCEStateOpts) => void;
  startHCE: (options: startHCEOpts) => void;
  stopHCE: (options: startHCEOpts) => void;
  onHCEMessage: any;
  sendHCEMessage: (options: sendHCEMessageOpts) => void;
  startWifi: (options: startWifiOpts) => void;
  stopWifi: (options: stopWifiOpts) => void;
  connectWifi: (options: connectWifiOpts) => void;
  getWifiList: (options: getWifiListOpts) => void;
  onGetWifiList: (options: onGetWifiListCb) => void;
  setWifiList: (options: setWifiListOpts) => void;
  onWifiConnected: (cb: onWifiConnectedCb) => void;
  getConnectedWifi: any;
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

  // WXML节点信息
  interface selectorQueryAPIs {
    in: any;
    select: any;
    selectAll: any;
    selectViewport: any;
    exec: any;
  }

  interface nodesRefAPIs {
    boundingClientRect: any;
    scrollOffset: any;
    fields: any;
  }

  interface createIntersectionObserverAPIs {
    relativeTo: any;
    relativeToViewport: any;
    observe: any;
    disconnect: any;
  }
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
  createCanvasContext: any;
  createLinearGradient: any;
  createContext: any; // 不推荐使用
  drawCanvas: any;  // 不推荐使用
  canvasToTempFilePath: any;
  canvasGetImageData: any;
  canvasPutImageData: any;



  startPullDownRefresh: (options: startPullDownRefreshOpts) => void;
  stopPullDownRefresh: ZeroParamVoidFunc;
  createSelectorQuery: ZeroParamVoidFunc;
  createIntersectionObserver: createIntersectionObserverAPIs;
}
interface canvasContextApi {
  setFillStyle: any;
  setStrokeStyle: any;
  setShadow: any;
  createLinearGradient: any;
  createCircularGradient: any;
  addColorStop: any;
  setLineWidth: any;
  setLineCap: any;
  setLineJoin: any;
  setMiterLimit: any;
  rect: any;
  fillRect: any;
  strokeRect: any;
  clearRect: any;
  fill: any;
  stroke: any;
  beginPath: any;
  closePath: any;
  moveTo: any;
  lineTo: any;
  arc: any;
  quadraticCurveTo: any;
  bezierCurveTo: any;
  scale: any;
  rotate: any;
  translate: any;
  fillText: any;
  setFontSize: any;
  setTextBaseline: any;
  setTextAlign: any;
  drawImage: any;
  setGlobalAlpha: any;
  save: any;
  restore: any;
  draw: any;
  getActions: any;  //不推荐使用
  clearActions: any;  //不推荐使用
  measureText: any;
  globalCompositeOperation: any;
  arcTo: any;
  strokeText: any;
  lineDashOffset: any;
  createPattern: any;
  font: any;
  setTransform: any;
}
// Third party APIs
interface getExtConfigRes {
  errMsg: string;
  extConfig: any;
}
interface getExtConfigOpts extends WxApiCallback<getExtConfigRes>{}

interface ThirdPartyAPIs {
  getExtConfig: (options: getExtConfigOpts) => void;
  getExtConfigSync: any;
}

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

interface showShareMenuOpts extends WxApiCallback {
  withShareTicket?: boolean; 
}

interface updateShareMenuOpts extends WxApiCallback {
  withShareTicket?: boolean; 
}

interface getShareInfoOpts extends WxApiCallback {
  shareTicket:	string;
  timeout: number;
}

interface chooseAddressRes {
  errMsg:	string;
  userName:	string;
  postalCode:	string;
  provinceName:	string;
  cityName:	string;
  countyName:	string;
  detailInfo:	string;
  nationalCode:	string;
  telNumber: string;
}
interface chooseAddressOpts extends WxApiCallback<chooseAddressRes>{}

interface openSettingRes {
  authSetting: any;
}

interface openSettingOpts extends WxApiCallback<openSettingRes>{}

interface getSettingRes {
  authSetting: any;
}

interface getSettingOpts extends WxApiCallback<getSettingRes>{}

interface getWeRunDataRes {
  errMsg: string;
  encryptedData: string;
  iv:	string;
}
interface getWeRunDataOpts extends WxApiCallback<getWeRunDataRes>{
  timeout?: number
}

interface navigateToMiniProgramRes {
  errMsg: string
}
interface navigateToMiniProgramOpts extends WxApiCallback<navigateToMiniProgramRes>{
  appId: string;
  path:	string;
  extraData:	any;
  envVersion:	string;
}
interface navigateBackMiniProgramRes {
  errMsg: string;
}
interface navigateBackMiniProgramOpts extends WxApiCallback<navigateBackMiniProgramRes>{
  extraData: any;
}

interface chooseInvoiceTitleRes{
  type:	string;
  title: string;
  taxNumber: string;
  companyAddress:	string;
  telephone: string;
  bankName:	string;
  bankAccount: string;
  errMsg:	string;
}

interface chooseInvoiceTitleOpts extends WxApiCallback<chooseInvoiceTitleRes>{}

interface checkIsSupportSoterAuthenticationRes{
  supportMode: 'fingerPrint' | 'facial' |	'speech'; // 人脸识别（暂未支持）声纹识别（暂未支持）
  errMsg:	string;
}
interface checkIsSupportSoterAuthenticationOpts extends WxApiCallback<checkIsSupportSoterAuthenticationRes>{}

interface OpenInterfaceAPIs {
  login: (options: LoginOpts) => void;
  checkSession: (options: CheckSessionOpts) => void;
  authorize: (optiona: AuthorizeOpts) => void;
  getUserInfo: (options: getUserInfoOpts) => void;
  requestPayment: (options: requestPaymentOpts) => void;
  showShareMenu: (options: showShareMenuOpts) => void;
  hideShareMenu: () => WxApiCallback;
  updateShareMenu: (options: updateShareMenuOpts) => void;
  getShareInfo: (options: getShareInfoOpts) => void;
  chooseAddress: (options: chooseAddressOpts) => void;
  addCard: any;
  openCard: any;
  openSetting: (options: openSettingOpts) => void;
  getSetting: (options: getSettingOpts) => void;
  getWeRunData: (options: getWeRunDataOpts) => void;
  navigateToMiniProgram: (options: navigateToMiniProgramOpts) => void;
  navigateBackMiniProgram: (options: navigateBackMiniProgramOpts) => void;
  chooseInvoiceTitle: (options: chooseInvoiceTitleOpts) => void;
  checkIsSupportSoterAuthentication: (options: checkIsSupportSoterAuthenticationOpts) => void;
  startSoterAuthentication: any;
  checkIsSoterEnrolledInDevice: any;
}

// Data APIs
interface reportAnalyticsOpts {
  eventName: string;
  data: any;
}

interface DataAPIs {
  reportAnalytics: (options: reportAnalyticsOpts) => void;
}

// Update APIs
interface UpdateAPIs {
  getUpdateManager: any;
}

interface updateManagerAPIs {
  onCheckForUpdate: ZeroParamVoidFunc;
  onUpdateReady: ZeroParamVoidFunc;
  onUpdateFailed: ZeroParamVoidFunc;
  applyUpdate: any;
}
// Multithreading APIs
interface MultithreadingAPIs {
  createWorker: (scriptPath: string) => void;
}

interface workerAPIs {
  postMessage: any;
  onMessage: ZeroParamVoidFunc;
  terminate: ZeroParamVoidFunc;
}

// Debugging APIs
interface setEnableDebugRes {
  errMsg: string;
}

interface setEnableDebugOpts extends WxApiCallback<setEnableDebugRes>{
  enableDebug: boolean;
}
interface DebuggingAPIs {
  setEnableDebug: (options: setEnableDebugOpts) => void;
}

// Declares
declare let wx: NetworkAPIs &
  MediaAPIs &
  StorageAPIs &
  LocationAPIs &
  DeviceAPIs &
  UIAPIs &
  ThirdPartyAPIs &
  OpenInterfaceAPIs &
  DataAPIs &
  UpdateAPIs &
  MultithreadingAPIs &
  DebuggingAPIs;

declare let SocketTask: SocketTaskAPIs;
declare let selectorQuery: selectorQueryAPIs;
declare let nodesRef: nodesRefAPIs;
declare let updateManager: updateManagerAPIs;
declare let worker: workerAPIs;
declare let canvasContext: canvasContextApi;

declare function App(app: AppOpts): void;
declare function Page(page: PageOpts): void;
declare function getApp(): IApp;
declare function getCurrentPages(): IPage[];
