/**
 * Copyright (c) xzh <https://github.com/Adherentman>
 * project: https://github.com/Adherentman/Typescript-wxApi.d.ts
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Common Types
interface string2AnyMap {
	[key: string]: any;
}

interface string2stringMap {
	[key: string]: string | null;
}

type ZeroParamVoidFunc = () => void;

interface ReturnCallBack {
	(res: ZeroParamVoidFunc): void;
}

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
	/**
	 * 在 Page 中定义 onPullDownRefresh 处理函数，监听该页面用户下拉刷新事件。
	 */
	onPullDownRefresh?: ZeroParamVoidFunc;
	onReachBottom?: ZeroParamVoidFunc;
	/**
	 * 在 Page 中定义 onShareAppMessage 事件处理函数，自定义该页面的转发内容。
	 */
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

/**
 * Network APIs
 */
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
	method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';
	dataType?: string;
	responseType?: 'text' | 'arraybuffer';
}

interface requestTask {
	/**
	 * 中断请求任务
	 */
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

interface onProgressUpdateRes {
	progress: number;
	totalBytesSent: number;
	totalBytesExpectedToWrite: number;
}

interface onProgressUpdateCallback {
	(res: onProgressUpdateRes): void;
}
interface uploadTask {
	/**
	 * 监听下载进度变化事件
	 */
	onProgressUpdate(res: onProgressUpdateCallback): void;
	/**
	 * 中断上传任务
	 */
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
	filePath: string;
}

interface downloadTask {
	/**
	 * 监听下载进度变化事件
	 */
	onProgressUpdate(res: onProgressUpdateCallback): void;
	/**
	 * 中断下载任务
	 */
	abort: ZeroParamVoidFunc;
}

// Webscoket connectSocket
interface connectSocketOpts extends WxApiCallback {
	url: string;
	header?: object;
	method?: string;
	protocols?: string[];
}

// 监听WebSocket连接打开事件。
interface onSocketOpenRes {
	header?: object;
}
interface onSocketOpenCallBack {
	(res: onSocketOpenRes): void;
}

interface onSocketErrorCallBack {
	(res: any): void;
}
// sendSocketMessage
interface sendSocketMessageOpts extends WxApiCallback<sendSocketMessageRes> {}

interface sendSocketMessageRes {
	data: string | ArrayBuffer;
}

//onSocketMessage
interface onSocketMessageRes {
	data: string | ArrayBuffer;
}
interface onSocketMessageCallback {
	(res: onSocketMessageRes): void;
}

//closeSocket
interface closeSocketOpts extends WxApiCallback<closeSocketRes> {}

interface closeSocketRes {
	code?: number;
	reason?: string;
}

interface onSocketCloseCallBack {
	(res: any): void;
}

interface offLocalServiceDiscoveryStopCallBack {
	(res: any): void;
}

interface offLocalServiceFoundCallBack {
	(res: any): void;
}

interface offLocalServiceLostCallBack {
	(res: any): void;
}

interface offLocalServiceResolveFailCallBack {
	(res: any): void;
}

interface onLocalServiceDiscoveryStopCallBack {
	(res: any): void;
}

interface onLocalServiceFoundCallBackRes {
	serviceType?: string;
	serviceName?: string;
	ip?: string;
	port?: string;
}

interface onLocalServiceFoundCallBack {
	(res: onLocalServiceFoundCallBackRes): void;
}

interface onLocalServiceLostCallBackRes {
	serviceType?: string;
	serviceName?: string;
}

interface onLocalServiceLostCallBack {
	(res: onLocalServiceLostCallBackRes): void;
}

interface onLocalServiceResolveFailCallBackRes {
	serviceType?: string;
	serviceName?: string;
}

interface onLocalServiceResolveFailCallBack {
	(res: onLocalServiceResolveFailCallBackRes): void;
}

interface startLocalServiceDiscoveryOpts extends WxApiCallback {
	serviceType: string;
}

interface stopLocalServiceDiscoveryOpts extends WxApiCallback {}

interface NetworkAPIs {
	/**
	 * 发起请求
	 */
	request: (options: NetworkRequestOpts) => requestTask;
	/**
	 * 上传
	 */
	uploadFile: (options: uploadFileOpts) => uploadTask;
	/**
	 * 下载
	 */
	downloadFile: (options: downloadFileOpts) => downloadTask;
	/**
	 * 取消监听mDNS 服务停止搜索的事件
	 */
	offLocalServiceDiscoveryStop: (callback: offLocalServiceDiscoveryStopCallBack) => void;
	/**
	 * 取消监听mDNS 服务发现的事件
	 */
	offLocalServiceFound: (callback: offLocalServiceFoundCallBack) => void;
	/**
	 * 取消监听mDNS 服务离开的事件
	 */
	offLocalServiceLost: (callback: offLocalServiceLostCallBack) => void;
	/**
	 * 取消监听mDNS 服务解析失败的事件
	 */
	offLocalServiceResolveFail: (callback: offLocalServiceResolveFailCallBack) => void;
	/**
	 * 监听mDNS 服务停止搜索的事件
	 */
	onLocalServiceDiscoveryStop: (callback: onLocalServiceDiscoveryStopCallBack) => void;
	/**
	 * 监听mDNS 服务发现的事件
	 */
	onLocalServiceFound: (callback: onLocalServiceFoundCallBack) => void;
	/**
	 * 监听mDNS 服务离开的事件
	 */
	onLocalServiceLost: (callback: onLocalServiceLostCallBack) => void;
	/**
	 * 监听mDNS 服务解析失败的事件
	 */
	onLocalServiceResolveFail: (callback: onLocalServiceResolveFailCallBack) => void;
	/**
	 * 开始搜索局域网下的 mDNS 服务。搜索的结果会通过 wx.onLocalService* 事件返回。
	 */
	startLocalServiceDiscovery: (options: startLocalServiceDiscoveryOpts) => void;
	/**
	 *
	 */
	stopLocalServiceDiscovery: (options: stopLocalServiceDiscoveryOpts) => void;
	// WebSocket
	connectSocket: (options: connectSocketOpts) => void;
	onSocketOpen: (callback: onSocketOpenCallBack) => void;
	onSocketError: (callback: onSocketErrorCallBack) => void;
	sendSocketMessage: (options: sendSocketMessageOpts) => void;
	onSocketMessage: (options: onSocketMessageCallback) => void;
	closeSocket: (options: closeSocketOpts) => void;
	onSocketClose: (callback: onSocketCloseCallBack) => void;
}

/**
 * SocketTask APIs
 */
//send
interface sendOpts extends WxApiCallback<sendRes> {}

interface sendRes {
	data?: string | ArrayBuffer;
}

interface onOpenRes {
	header: object;
}

interface onOpenCallBack {
	(res: onOpenRes): void;
}
//close
interface closeOpts extends WxApiCallback<closeRes> {}

interface closeRes {
	code?: number;
	reason?: string;
}

// onClose
interface onCloseCallBack {
	(res: any): void;
}

//onError
interface onErrorOpts {
	errMsg?: string;
}

interface onErrorCallBack {
	(res: onErrorOpts): void;
}

//onMessage
interface onMessageOpts {
	data?: string | ArrayBuffer;
}

interface onMessageCallBack {
	(res: onMessageOpts): void;
}
interface SocketTaskAPIs {
	send: (options?: sendOpts) => void;
	close: (options?: closeOpts) => void;
	onOpen: (res: onOpenCallBack) => void;
	onClose: (res: onCloseCallBack) => void;
	onError: (res: onErrorCallBack) => void;
	onMessage: (res: onMessageCallBack) => void;
}

/**
 * Media APIs
 */
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
	/**
	 * 1.9.90
	 */
	orientation:
		| 'up'
		| 'down'
		| 'left'
		| 'right'
		| 'up-mirrored'
		| 'down-mirrored'
		| 'left-mirrored'
		| 'right-mirrored';
	/**
	 * 1.9.90
	 */
	type: string;
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
	/**
	 * numberOfChannels有效值 1/2
	 */
	numberOfChannels?: number;
	encodeBitRate?: number;
	/**
	 * format有效值aac/mp3
	 */
	format?: string;
	frameSize?: number;
	audioSource?: string;
}

interface RecordOnStopRes {
	tempFilePath: string;
}

interface RecordOnStopCallBack {
	(res: RecordOnStopRes): void;
}

interface onFrameRecordedRes {
	frameBuffer: ArrayBuffer;
	isLastFrame: boolean;
}

interface onFrameRecordedCallBack {
	(res: onFrameRecordedRes): void;
}

interface RecordOnErrorRes {
	errMsg: string;
}

interface RecordOnErrorCallBack {
	(res: RecordOnErrorRes): void;
}

interface getRecorderManagerOpts {
	/**
	 * 开始录音
	 */
	start: (options: RecordStartOpts) => void;
	/**
	 * 暂停录音
	 */
	pause: ZeroParamVoidFunc;
	/**
	 * 继续录音
	 */
	resume: ZeroParamVoidFunc;
	/**
	 *  停止录音
	 */
	stop: ZeroParamVoidFunc;
	/**
	 * 监听录音开始事件
	 */
	onStart: ReturnCallBack;
	/**
	 * 监听录音继续事件
	 */
	onResume: ReturnCallBack;
	/**
	 * 监听录音暂停事件
	 */
	onPause: ReturnCallBack;
	/**
	 * 监听录音结束事件
	 */
	onStop: (res: RecordOnStopCallBack) => void;
	/**
	 * 监听已录制完指定帧大小的文件事件。如果设置了 frameSize，则会回调此事件。
	 */
	onFrameRecorded: (res: onFrameRecordedRes) => void;
	/**
	 * 监听录音错误事件
	 */
	onError: (res: RecordOnErrorCallBack) => void;
	/**
	 * 监听录音因为受到系统占用而被中断开始事件。
	 */
	onInterruptionBegin: ReturnCallBack;
	/**
	 * 监听录音中断结束事件。
	 */
	onInterruptionEnd: ReturnCallBack;
}

// Voice 音频
interface playVoiceOpts extends WxApiCallback {
	filePath: string;
	duration?: number;
}

interface getBackgroundAudioPlayerStateRes {
	duration: number;
	currentPosition: number;
	status: '2' | '1' | '0';
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
	src: string;
	startTime: number;
	buffered: number;
	title: string;
	epname: string;
	singer: string;
	coverImgUrl: string;
	webUrl: string;
	/**
	 * 支持版本1.9.94
	 */
	protocol: string;
	/**
	 * 播放音乐
	 */
	play: ZeroParamVoidFunc;
	/**
	 * 暂停音乐
	 */
	pause: ZeroParamVoidFunc;
	/**
	 * 停止音乐
	 */
	stop: ZeroParamVoidFunc;
	/**
	 * 跳转到指定位置
	 * currentTime 跳转的位置，单位 s。精确到小数点后 3 位，即支持 ms 级别精确度
	 */
	seek: (currentTime: number) => void;
	/**
	 * 监听背景音频进入可播放状态事件。但不保证后面可以流畅播放
	 */
	onCanplay: (callback: ReturnCallBack) => void;
	/**
	 * 监听背景音频自然播放结束事件
	 */
	onEnded: (callback: ReturnCallBack) => void;
	/**
	 * 监听背景音频播放错误事件
	 */
	onError: (callback: ReturnCallBack) => void;
	/**
	 * 监听用户在系统音乐播放面板点击下一曲事件（仅iOS）
	 */
	onNext: (callback: ReturnCallBack) => void;
	/**
	 * 监听背景音频暂停事件
	 */
	onPause: (callback: ReturnCallBack) => void;
	/**
	 * 监听背景音频播放事件
	 */
	onPlay: (callback: ReturnCallBack) => void;
	/**
	 * 监听用户在系统音乐播放面板点击上一曲事件（仅iOS）
	 */
	onPrev: (callback: ReturnCallBack) => void;
	/**
	 * 监听背景音频完成跳转操作事件
	 */
	onSeeked: (callback: ReturnCallBack) => void;
	/**
	 * 监听背景音频开始跳转操作事件
	 */
	onSeeking: (callback: ReturnCallBack) => void;
	/**
	 * 监听背景音频停止事件
	 */
	onStop: (callback: ReturnCallBack) => void;
	/**
	 * 监听背景音频播放进度更新事件
	 */
	onTimeUpdate: (callback: ReturnCallBack) => void;
	/**
	 * 监听音频加载中事件。当音频因为数据不足，需要停下来加载时会触发
	 */
	onWaiting: (callback: ReturnCallBack) => void;
}

interface createInnerAudioContextonErrorRes {
	errCode: number;
}
interface createInnerAudioContextonErrorCallBack {
	(callback: createInnerAudioContextonErrorRes);
}
interface createInnerAudioContextOpts {
	src: string;
	startTime: number;
	autoplay: boolean;
	loop: boolean;
	obeyMuteSwitch: boolean;
	duration: number;
	currentTime: number;
	paused: boolean;
	buffered: number;
	/**
	 * 支持版本1.9.90
	 */
	volume: number;
	play: ZeroParamVoidFunc;
	pause: ZeroParamVoidFunc;
	stop: ZeroParamVoidFunc;
	seek: (position: any) => void;
	destroy: ZeroParamVoidFunc;
	onCanplay: (callback: ReturnCallBack) => void;
	onPlay: (callback: ReturnCallBack) => void;
	onPause: (callback: ReturnCallBack) => void;
	onStop: (callback: ReturnCallBack) => void;
	onEnded: (callback: ReturnCallBack) => void;
	onTimeUpdate: (callback: ReturnCallBack) => void;
	onError: (callback: createInnerAudioContextonErrorCallBack) => void;
	onWaiting: (callback: ReturnCallBack) => void;
	onSeeking: (callback: ReturnCallBack) => void;
	onSeeked: (callback: ReturnCallBack) => void;
	/**
	 * 以下方法支持的版本为1.9.0
	 */
	offCanplay: (callback: ReturnCallBack) => void;
	offPlay: (callback: ReturnCallBack) => void;
	offPause: (callback: ReturnCallBack) => void;
	offStop: (callback: ReturnCallBack) => void;
	offEnded: (callback: ReturnCallBack) => void;
	offTimeUpdate: (callback: ReturnCallBack) => void;
	offError: (callback: ReturnCallBack) => void;
	offWaiting: (callback: ReturnCallBack) => void;
	offSeeking: (callback: ReturnCallBack) => void;
	offSeeked: (callback: ReturnCallBack) => void;
}

interface getAvailableAudioSourcesRes {
	audioSources: string[];
}

interface getAvailableAudioSourcesOpts extends WxApiCallback<getAvailableAudioSourcesRes> {}

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

interface saveVideoToPhotosAlbumOpts extends WxApiCallback<saveImageToPhotosAlbumRes> {
	filePath: string;
}

interface Videodanmu {
	text: string;
	color: string;
}

interface createVideoContextOpts {
	play: ZeroParamVoidFunc;
	pause: ZeroParamVoidFunc;
	seek: (position: any) => void;
	sendDanmu: (danmu: Videodanmu) => void;
	playbackRate: (rate: any) => void;
	requestFullScreen: ZeroParamVoidFunc;
	exitFullScreen: ZeroParamVoidFunc;
	/**
	 * 2.1.0仅在iOS全屏下有效
	 */
	showStatusBar: ZeroParamVoidFunc;
	hideStatusBar: ZeroParamVoidFunc;
}

interface takePhotoObj extends WxApiCallback {
	quality?: 'high' | 'normal' | 'low';
}

interface startRecordObj extends WxApiCallback {
	timeoutCallback?: ZeroParamVoidFunc;
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
	play: (options: createLiveObj) => void;
	stop: (options: createLiveObj) => void;
	mute: (options: createLiveObj) => void;
	/**
	 * pause, resume只支持在版本1.9.90
	 */
	pause: (options: createLiveObj) => void;
	resume: (options: createLiveObj) => void;
	requestFullScreen: (options: requestFullScreenObj) => void;
	exitFullScreen: (options: createLiveObj) => void;
}

interface createLivePusherContextOpts {
	start: (options: createLiveObj) => void;
	stop: (options: createLiveObj) => void;
	pause: (options: createLiveObj) => void;
	resume: (options: createLiveObj) => void;
	switchCamera: (options: createLiveObj) => void;
	snapshot: (options: createLiveObj) => void;
	toggleTorch: (options: createLiveObj) => void;
}

interface LoadFontFaceDesc {
	style?: string;
	weight?: string;
	variant?: string;
}
interface loadFontFaceRes {
	status: any;
}

interface loadFontFaceOpts extends WxApiCallback<loadFontFaceRes> {
	family: string;
	source: string;
	desc?: LoadFontFaceDesc;
}

interface compressImageOpts extends WxApiCallback {
	src: string;
	quality?: number;
}

interface chooseMessageFileRes {
	path: string;
	size: number;
	name: string;
	type: 'video' | 'image' | 'file';
	time: number;
}

interface chooseMessageFileOpts extends WxApiCallback<chooseMessageFileRes> {
	count: number;
	type?: 'all' | 'video' | 'image' | 'file';
	extension?: string[];
}

interface MediaAPIs {
	/**
	 * 保存图片到系统相册。
	 */
	saveImageToPhotosAlbum: (options: saveImageToPhotosAlbumOpts) => void;
	/**
	 * 在新页面中全屏预览图片。预览的过程中用户可以进行保存图片、发送给朋友等操作。
	 */
	previewImage: (options: previewImageOpts) => void;
	/**
	 * 获取图片信息。网络图片需先配置download域名才能生效。
	 */
	getImageInfo: (options: getImageInfoOpts) => void;
	/**
	 * 支持版本 >= 2.4.0
	 * 压缩图片接口，可选压缩质量
	 */
	compressImage: (options: compressImageOpts) => void;
	/**
	 * 从客户端会话选择文件。
	 */
	chooseMessageFile: (options: chooseMessageFileOpts) => void;
	/**
	 * 从本地相册选择图片或使用相机拍照。
	 */
	chooseImage: (options: chooseImageOpts) => void;
	startRecord: (options: startRecordOpts) => void;
	stopRecord: ZeroParamVoidFunc;
	getRecorderManager: () => getRecorderManagerOpts;
	/**
	 * 注意：1.6.0 版本开始，本接口不再维护。建议使用能力更强的 wx.createInnerAudioContext 接口
	 */
	playVoice: (options: playVoiceOpts) => void;
	/**
	 * 注意：1.6.0 版本开始，本接口不再维护。建议使用能力更强的 wx.createInnerAudioContext 接口
	 */

	pauseVoice: ZeroParamVoidFunc;
	/**
	 * 注意：1.6.0 版本开始，本接口不再维护。建议使用能力更强的 wx.createInnerAudioContext 接口
	 */
	stopVoice: ZeroParamVoidFunc;
	/**
	 * 注意：1.2.0 版本开始，本接口不再维护。建议使用能力更强的 wx.getBackgroundAudioManager 接口
	 */
	getBackgroundAudioPlayerState: (options: getBackgroundAudioPlayerStateOpts) => void;
	/**
	 * 注意：1.2.0 版本开始，本接口不再维护。建议使用能力更强的 wx.getBackgroundAudioManager 接口
	 */
	playBackgroundAudio: (options: playBackgroundAudioOpts) => void;
	/**
	 * 注意：1.2.0 版本开始，本接口不再维护。建议使用能力更强的 wx.getBackgroundAudioManager 接口
	 */
	pauseBackgroundAudio: ZeroParamVoidFunc;
	/**
	 * 注意：1.2.0 版本开始，本接口不再维护。建议使用能力更强的 wx.getBackgroundAudioManager 接口
	 */
	seekBackgroundAudio: (options: seekBackgroundAudioOpts) => void;
	/**
   * 注意：1.2.0 版本开始，本接口不再维护。建议使用能力更强的 wx.getBackgroundAudioManager 接口
  //callback
   */
	stopBackgroundAudio: ZeroParamVoidFunc;
	/**
	 * 注意：1.2.0 版本开始，本接口不再维护。建议使用能力更强的 wx.getBackgroundAudioManager 接口
	 */
	onBackgroundAudioPlay: (callback: ReturnCallBack) => void;
	/**
	 * 注意：1.2.0 版本开始，本接口不再维护。建议使用能力更强的 wx.getBackgroundAudioManager 接口
	 */
	onBackgroundAudioPause: (callback: ReturnCallBack) => void;
	/**
	 * 注意：1.2.0 版本开始，本接口不再维护。建议使用能力更强的 wx.getBackgroundAudioManager 接口
	 */
	onBackgroundAudioStop: (callback: ReturnCallBack) => void;
	getBackgroundAudioManager: () => getBackgroundAudioManagerOpts;
	/**
	 * 注意：1.6.0 版本开始，本接口不再维护。建议使用能力更强的 wx.createInnerAudioContext 接口
	 */
	createAudioContext: (audioId: string, that?: IComponent) => void;
	createInnerAudioContext: () => createInnerAudioContextOpts;
	/**
	 * 2.1.0开始支持
	 */
	getAvailableAudioSources: (options: getAvailableAudioSourcesOpts) => void;
	chooseVideo: (options: chooseVideoOpts) => void;
	saveVideoToPhotosAlbum: (options: saveVideoToPhotosAlbumOpts) => void;
	createVideoContext: (audioId: string, that?: IComponent) => createVideoContextOpts;
	createCameraContext: () => createCameraContextOpts;
	createLivePlayerContext: (domid: string) => createLivePlayerContextOpts;
	createLivePusherContext: () => createLivePusherContextOpts;
	loadFontFace: (options: loadFontFaceOpts) => void;
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
	fileType?: string;
}

/**
 * 更新于2018年9月14日
 */
interface mkdirOpts extends WxApiCallback {
	dirPath: string;
	recursive: boolean;
}

interface fileListObject {
	filePath: string;
	size: string;
	createTime: string;
}

interface FileSystemManagerGetSavedFileListRes {
	fileList: fileListObject[];
}

interface FileSystemManagerGetSavedFileListOpts
	extends WxApiCallback<FileSystemManagerGetSavedFileListRes> {}

interface FileSystemManagerSaveFileRes {
	savedFilePath: string;
	errMsg: string;
}

interface FileSystemManagerSaveFileOpts extends WxApiCallback<FileSystemManagerSaveFileRes> {
	tempFilePath: string;
	filePath: string;
}

interface FileSystemManagerRemoveSavedFileRes {
	errMsg: string;
}

interface FileSystemManagerRemoveSavedFileOpts
	extends WxApiCallback<FileSystemManagerRemoveSavedFileRes> {
	filePath: string;
}

interface copyFileRes {
	errMsg: string;
}

interface copyFileOpts extends WxApiCallback<copyFileRes> {
	srcPath: string;
	destPath: string;
}

interface FileSystemManagerGetFileInfoRes {
	size: number;
	errMsg: string;
}

interface FileSystemManagerGetFileInfoOpts extends WxApiCallback<FileSystemManagerGetFileInfoRes> {
	filePath: string;
}

interface accessRes {
	errMsg: string;
}

interface accessOpts extends WxApiCallback<accessRes> {
	path: string;
}

interface appendFileRes {
	errMsg: string;
}
interface appendFileOpts extends WxApiCallback<appendFileRes> {
	filePath: string;
	data: string | ArrayBuffer;
	encoding: string;
}

interface readFileRes {
	data: string | ArrayBuffer;
	errMsg: string;
}

interface readFileOpts extends WxApiCallback<readFileRes> {
	filePath: string;
	encoding: string;
}

interface readdirRes {
	files: string[];
	errMsg: string;
}

interface readdirOpts extends WxApiCallback<readdirRes> {
	dirPath: string;
}

interface renameRes {
	errMsg: string;
}

interface renameOpts extends WxApiCallback<renameRes> {
	oldPath: string;
	newPath: string;
}

interface rmdirRes {
	errMsg: string;
}

interface rmdirOpts extends WxApiCallback<rmdirRes> {
	dirPath: string;
	recursive: boolean;
}

interface statRes {
	stat: Stats;
	errMsg: string;
}

interface statOpts extends WxApiCallback<statRes> {
	path: string;
	recursive: boolean;
}

interface unlinkRes {
	errMsg: string;
}

interface unlinkOpts extends WxApiCallback<unlinkRes> {
	filePath: string;
}

interface unzipRes {
	errMsg: string;
}

interface unzipOpts extends WxApiCallback<unzipRes> {
	zipFilePath: string;
	targetPath: string;
}

interface writeFileRes {
	errMsg: string;
}

interface writeFileOpts extends WxApiCallback<writeFileRes> {
	filePath: string;
	data: string | ArrayBuffer;
	encoding: string;
}

interface getFileSystemManagerOpts {
	mkdir: (opts: mkdirOpts) => void;
	getSavedFileList: (opts: FileSystemManagerGetSavedFileListOpts) => void;
	appendFileSync: (filePath: string, data: string | ArrayBuffer, encoding: string) => void;
	saveFile: (opts: FileSystemManagerSaveFileOpts) => void;
	removeSavedFile: (opts: FileSystemManagerRemoveSavedFileOpts) => void;
	saveFileSync: (tempFilePath: string, filePath: string) => number;
	copyFile: (opts: copyFileOpts) => void;
	copyFileSync: (srcPath: string, destPath: string) => void;
	getFileInfo: (opts: FileSystemManagerGetFileInfoOpts) => void;
	access: (opts: accessOpts) => void;
	appendFile: (opts: appendFileOpts) => void;
	accessSync: (path: string) => void;
	mkdirSync: (dirPath: string, recursive: boolean) => void;
	readFile: (opts: readFileOpts) => void;
	readFileSync: (filePath: string, encoding: string) => void;
	readdir: (opts: readdirOpts) => void;
	readdirSync: (dirPath: string) => void;
	rename: (opts: renameOpts) => void;
	renameSync: (oldPath: string, newPath: string) => void;
	rmdir: (opts: rmdirOpts) => void;
	rmdirSync: (dirPath: string, recursive: boolean) => void;
	stat: (opts: statOpts) => Stats;
	statSync: (path: string, recursive: boolean) => void;
	unlink: (opts: unlinkOpts) => void;
	unlinkSync: (filePath: string) => void;
	unzip: (opts: unzipOpts) => void;
	writeFile: (opts: writeFileOpts) => void;
	writeFileSync: (filePath: string, data: string | ArrayBuffer, encoding: string) => void;
}

interface Stats {
	isDirectory: () => boolean;
	isFile: () => boolean;
}

interface FileAPIs {
	saveFile: (options: saveFileOpts) => void;
	getFileInfo: (options: getFileInfoOpts) => void;
	getSavedFileList: (options: getSavedFileListOpts) => void;
	getSavedFileInfoRes: (options: getSavedFileInfoOpts) => void;
	removeSavedFile: (options: removeSavedFileOpts) => void;
	openDocument: (options: openDocumentOpts) => void;
	getFileSystemManager: () => getFileSystemManagerOpts;
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

interface chooseLocationRes {
	name: string;
	address: string;
	latitude: number;
	longitude: number;
}

interface chooseLocationOpts extends WxApiCallback<chooseLocationRes> {}

/**
 * 查看位置
 */
interface openLocationOpts extends WxApiCallback {
	latitude: number;
	longitude: number;
	scale?: number;
	name?: string;
	address?: string;
}

interface translateMarkerOpts {
	markerId: number;
	destination: { latitude: number; longitude: number };
	autoRotate: boolean;
	rotate: number;
	duration: number;
	animationEnd: () => void;
	fail?: (err: any) => void;
}

interface includePointsOpts {
	points: any;
	padding: any;
}

interface createMapContextOpts {
	/**
	 * 获取当前地图中心的经纬度，返回的是 gcj02 坐标系，可以用于 wx.openLocation
	 */
	getCenterLocation: (opts: WxApiCallback) => void;
	/**
	 * 将地图中心移动到当前定位点，需要配合map组件的show-location使用
	 */
	moveToLocation: () => void;
	/**
	 * 	平移marker，带动画
	 */
	translateMarker: (opts: translateMarkerOpts) => void;
	/**
	 * 缩放视野展示所有经纬度
	 */
	includePoints: (object: includePointsOpts) => void;
	/**
	 * 获取当前地图的视野范围
	 */
	getRegion: (opts: WxApiCallback) => void;
	/**
	 * 获取当前地图的缩放级别
	 */
	getScale: (opts: WxApiCallback) => void;
}

/**
 * 位置APIs
 * updateTime: 2018-09-17
 */
interface LocationAPIs {
	/**
	 * 获取当前的地理位置、速度
	 */
	getLocation: (options: getLocationOpts) => void;
	/**
	 * 打开地图选择位置
	 */
	chooseLocation: (options: chooseLocationOpts) => void;
	/**
	 * ​使用微信内置地图查看位置
	 */
	openLocation: (options: openLocationOpts) => void;
	/**
	 * 创建并返回 map 上下文 mapContext 对象
	 */
	createMapContext: (key: string) => createMapContextOpts;
}

/**
 * 数据缓存 Storage APIs
 * updateTime: 2018-09-16
 */
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

/**
 * 本地数据存储的大小限制为 10MB
 */
interface StorageAPIs {
	/**
	 * 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口
	 */
	setStorage: (options: SetStorageOpts) => void;
	/**
	 * 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
	 */
	setStorageSync: (key: string, data: object | string) => void;
	/**
	 * 从本地缓存中异步获取指定 key 对应的内容。
	 */
	getStorage: (options: GetStorageOpts) => void;
	/**
	 * 从本地缓存中同步获取指定 key 对应的内容。
	 */
	getStorageSync: (key: string) => object | string;
	/**
	 * 异步获取当前storage的相关信息
	 */
	getStorageInfo: (options: GetStorageInfoOpts) => void;
	/**
	 * 同步获取当前storage的相关信息
	 */
	getStorageInfoSync: () => GetStorageInfoRes;
	/**
	 * 从本地缓存中异步移除指定 key 。
	 */
	removeStorage: (options: RemoveStorageOpts) => void;
	/**
	 * 从本地缓存中同步移除指定 key 。
	 */
	removeStorageSync: (key: string) => object | string;
	/**
	 * 清理本地数据缓存。
	 */
	clearStorage: () => void;
	/**
	 * 同步清理本地数据缓存
	 */
	clearStorageSync: () => void;
}

//  Device APIs

/**
 * 系统信息
 */

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

/**
 * 网络状态
 */
// getNetworkType
interface getNetworkTypeRes {
	networkType: string;
}

interface getNetworkTypeOpts extends WxApiCallback<getNetworkTypeRes> {}

// onNetworkStatusChange
interface onNetworkStatusChangeCallBack {
	isConnected: boolean;
	networkType: string;
}
interface onNetworkStatusChangeOpts {
	(res: onNetworkStatusChangeCallBack): void;
}

/**
 * 加速度计
 */
interface onAccelerometerChangeOpts {
	x: number;
	y: number;
	z: number;
}

interface onAccelerometerChangeCallback {
	(res: onAccelerometerChangeOpts): void;
}

interface startAccelerometerOpts extends WxApiCallback {
	/**
	 * 基础库2.1.0开始支持。
	 * 监听加速度数据回调函数的执行频率。game约为20ms/次，ui约为60ms/次，normal约为200ms/次
	 */
	interval?: string;
}

//罗盘
interface onCompassChangeOpts {
	direction: number;
}
interface onCompassChangeCallBack {
	(res: onCompassChangeOpts): void;
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

interface getBluetoothAdapterStateOpts extends WxApiCallback<getBluetoothAdapterStateRes> {}

interface onBluetoothAdapterStateChangeCb {
	available: boolean;
	discovering: boolean;
}
interface onBluetoothAdapterStateChangeOpts {
	(res: onBluetoothAdapterStateChangeCb): void;
}

interface startBluetoothDevicesDiscoveryRes {
	errMsg: string;
}

interface startBluetoothDevicesDiscoveryOpts
	extends WxApiCallback<startBluetoothDevicesDiscoveryRes> {
	services?: any[];
	allowDuplicatesKey?: boolean;
	interval?: number;
}

interface stopBluetoothDevicesDiscoveryRes {
	errMsg: string;
}

interface stopBluetoothDevicesDiscoveryOpts
	extends WxApiCallback<stopBluetoothDevicesDiscoveryRes> {}

interface devicesArray {
	[key: string]: any;
	name: string;
	deviceld: string;
	RSSI: number;
	advertisData: ArrayBuffer;
	advertisServiceUUIDs: any[];
	localName: string;
	serviceData: ArrayBuffer;
}

interface getBluetoothDevicesRes {
	devices: devicesArray[];
	errMsg: string;
}

interface getBluetoothDevicesOpts extends WxApiCallback<getBluetoothDevicesRes> {}

interface onBluetoothDeviceFoundOpts {
	devices: devicesArray[];
}

interface onBluetoothDeviceFoundCallBack {
	(res: onBluetoothDeviceFoundOpts): void;
}
interface getConnectedBluetoothDevicesArray {
	name: string;
	deviceld: string;
}

interface getConnectedBluetoothDevicesRes {
	devices: getConnectedBluetoothDevicesArray[];
	errMsg: string;
}

interface getConnectedBluetoothDevicesOpts extends WxApiCallback<getConnectedBluetoothDevicesRes> {
	services: any[];
}

interface createBLEConnectionRes {
	errMsg: string;
}

interface createBLEConnectionOpts extends WxApiCallback<createBLEConnectionRes> {
	deviceId: string;
}

interface closeBLEConnectionRes {
	errMsg: string;
}

interface closeBLEConnectionOpts extends WxApiCallback<closeBLEConnectionRes> {
	deviceId: string;
}

interface BLEDeviceService {
	uuid: string;
	isPrimary: boolean;
}
interface getBLEDeviceServicesRes {
	services: BLEDeviceService[];
	errMsg: string;
}

interface getBLEDeviceServicesOpts extends WxApiCallback<getBLEDeviceServicesRes> {
	deviceId: string;
}

interface getBLEDeviceCharacteristicsRes {
	characteristics: BLEDeviceCharacteristic[];
	errMsg: string;
}

interface BLEDeviceCharacteristic {
	/**
	 * 蓝牙设备特征值的uuid
	 */
	uuid: string;
	/**
	 * 该特征值支持的操作类型
	 */
	properties: BLEDeviceCharasteristicProperties;
}

interface BLEDeviceCharasteristicProperties {
	read: boolean;
	write: boolean;
	notify: boolean;
	indicate: boolean;
}

interface getBLEDeviceCharacteristicsOpts extends WxApiCallback<getBLEDeviceCharacteristicsRes> {
	deviceId: string;
	serviceId: string;
}

interface readBLECharacteristicValueRes {
	errCode: number;
	errMsg: string;
}

interface readBLECharacteristicValueOpts extends WxApiCallback<readBLECharacteristicValueRes> {
	deviceId: string;
	serviceId: string;
	characteristicId: string;
}

interface writeBLECharacteristicValueRes {
	errMsg: string;
}

interface writeBLECharacteristicValueOpts extends WxApiCallback<writeBLECharacteristicValueRes> {
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

interface onBLEConnectionStateChangeOpts {
	deviceId: string;
	connected: boolean;
}

interface onBLEConnectionStateChangeCallback {
	(res: onBLEConnectionStateChangeOpts): void;
}

interface onBLECharacteristicValueChangeOpts {
	deviceId: string;
	serviceId: string;
	characteristicId: string;
	value: ArrayBuffer;
}

interface onBLECharacteristicValueChangeCallback {
	(res: onBLECharacteristicValueChangeOpts): void;
}

// iBeacon
interface startBeaconDiscoveryRes {
	errMsg: string;
}

interface startBeaconDiscoveryOpts extends WxApiCallback<startBeaconDiscoveryRes> {
	uuid: any[];
}

interface stopBeaconDiscoveryRes {
	errMsg: string;
}

interface stopBeaconDiscoveryOpts extends WxApiCallback<stopBeaconDiscoveryRes> {}

interface beaconsObject {
	[key: string]: string | number;
	uuid: string;
	major: string;
	minor: string;
	proximity: number;
	accuracy: number;
	rssi: number;
}

interface getBeaconsRes {
	beacons: beaconsObject[];
	errMsg: string;
}

interface getBeaconsOpts extends WxApiCallback<getBeaconsRes> {}

interface onBeaconUpdateOpts {
	beacons: beaconsObject[];
}

interface onBeaconUpdateCallback {
	(res: onBeaconUpdateOpts): void;
}

interface onBeaconServiceChangeOpts {
	avaliable: boolean;
	discovering: boolean;
}

interface onBeaconServiceChangeCallBack {
	(res: onBeaconServiceChangeOpts): void;
}
// 屏幕亮度
interface setScreenBrightnessOpts extends WxApiCallback {
	value: number;
}

interface getScreenBrightnessRes {
	value: number;
}

interface getScreenBrightnessOpts extends WxApiCallback<getScreenBrightnessRes> {}

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
	lastName: string;
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

interface onHCEMessageOpts {
	messageType: number;
	data: ArrayBuffer;
	reason: number;
}

interface onHCEMessageCallBack {
	(res: onHCEMessageOpts): void;
}

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

interface onGetWifiListOpts {
	wifiList: wifiLs[];
}

interface onGetWifiListCallBack {
	(res: onGetWifiListOpts): void;
}

interface setWifiListArray {
	SSID: string;
	BSSID: string;
	password: string;
}

interface setWifiListOpts extends WxApiCallback {
	wifiList: setWifiListArray[];
}

interface wifiInfo {
	SSID: string;
	BSSID: string;
	secure: boolean;
	signalStrength: number;
}

interface onWifiConnectedOpts {
	wifi: wifiInfo;
}

interface onWifiConnectedCb {
	(res: onWifiConnectedOpts): void;
}

interface onMemoryWarningOpts {
	level: number;
}

interface onMemoryWarningCallBack {
	(res: onMemoryWarningOpts): void;
}

interface getConnectedWifiRes {
	wifi: wifiInfo;
}

interface getConnectedWifiOpts extends WxApiCallback<getConnectedWifiRes> {}

interface DeviceAPIs {
	/**
	 * 获取系统信息
	 */
	getSystemInfo: (options: getSystemInfoOpts) => void;
	/**
	 * 获取系统信息同步接口
	 */
	getSystemInfoSync: () => getSystemInfoSyncRes;
	/**
	 * 判断小程序的API，回调，参数，组件等是否在当前版本可用
	 */
	canIUse: (string: any) => void;
	/**
	 * 监听内存不足的告警事件，Android下有告警等级划分，只有LOW和CRITICAL会回调开发者；iOS无等级划分。
	 */
	onMemoryWarning: (cb: onMemoryWarningCallBack) => void;
	/**
	 * 获取网络类型
	 */
	getNetworkType: (options: getNetworkTypeOpts) => void;
	/**
	 * 监听网络状态变化。
	 */
	onNetworkStatusChange: (cb: onNetworkStatusChangeOpts) => void;
	/**
	 * 监听加速度数据，频率：5次/秒，接口调用后会自动开始监听，可使用 wx.stopAccelerometer 停止监听
	 */
	onAccelerometerChange: (cb: onAccelerometerChangeCallback) => void;
	/**
	 * 开始监听加速度数据。
	 */
	startAccelerometer: (options: startAccelerometerOpts) => void;
	/**
	 * 停止监听加速度数据
	 */
	stopAccelerometer: (options: WxApiCallback) => void;
	/**
	 * 监听罗盘数据，频率：5次/秒，接口调用后会自动开始监听，可使用wx.stopCompass停止监听。
	 */
	onCompassChange: (cb: onCompassChangeCallBack) => void;
	/**
	 * 开始监听罗盘数据。
	 */
	startCompass: (options: WxApiCallback) => void;
	/**
	 * 停止监听罗盘数据。
	 */
	stopCompass: (options: WxApiCallback) => void;
	/**
	 *  拨打电话
	 */
	makePhoneCall: (options: makePhoneCallOpts) => void;
	/**
	 * 调起客户端扫码界面，扫码成功后返回对应的结果
	 */
	scanCode: (options: scanCodeOpts) => void;
	/**
	 * 设置系统剪贴板的内容
	 */
	setClipboardData: (options: setClipboardDataOpts) => void;
	/**
	 * 获取系统剪贴板内容
	 */
	getClipboardData: (options: getClipboardDataOpts) => void;
	/**
	 * 初始化小程序蓝牙模块，生效周期为调用wx.openBluetoothAdapter至调用wx.closeBluetoothAdapter或小程序被销毁为止。
	 */
	openBluetoothAdapter: (options: WxApiCallback) => void;
	/**
	 * 关闭蓝牙模块，使其进入未初始化状态。调用该方法将断开所有已建立的链接并释放系统资源。建议在使用小程序蓝牙流程后调用，与wx.openBluetoothAdapter成对调用。
	 */
	closeBluetoothAdapter: (options: WxApiCallback) => void;
	/**
	 * 获取本机蓝牙适配器状态
	 */
	getBluetoothAdapterState: (options: getBluetoothAdapterStateOpts) => void;
	/**
	 * 监听蓝牙适配器状态变化事件
	 */
	onBluetoothAdapterStateChange: (cb: onBluetoothAdapterStateChangeOpts) => void;
	/**
	 * 开始搜寻附近的蓝牙外围设备
	 */
	startBluetoothDevicesDiscovery: (options: startBluetoothDevicesDiscoveryOpts) => void;
	/**
	 * 停止搜寻附近的蓝牙外围设备。若已经找到需要的蓝牙设备并不需要继续搜索时，建议调用该接口停止蓝牙搜索。
	 */
	stopBluetoothDevicesDiscovery: (options: stopBluetoothDevicesDiscoveryOpts) => void;
	/**
	 * 获取在小程序蓝牙模块生效期间所有已发现的蓝牙设备，包括已经和本机处于连接状态的设备。
	 */
	getBluetoothDevices: (options: getBluetoothDevicesRes) => void;
	/**
	 * 根据 uuid 获取处于已连接状态的设备
	 */
	getConnectedBluetoothDevices: (options: getConnectedBluetoothDevicesOpts) => void;
	/**
	 * 监听寻找到新设备的事件
	 */
	onBluetoothDeviceFound: (cb: onBluetoothDeviceFoundCallBack) => void;
	/**
	 * 连接低功耗蓝牙设备。
	 */
	createBLEConnection: (options: createBLEConnectionOpts) => void;
	/**
	 * 断开与低功耗蓝牙设备的连接
	 */
	closeBLEConnection: (options: closeBLEConnectionOpts) => void;
	/**
	 * 获取蓝牙设备所有 service（服务）
	 */
	getBLEDeviceServices: (options: getBLEDeviceServicesOpts) => void;
	/**
	 * 获取蓝牙设备某个服务中的所有 characteristic（特征值）
	 */
	getBLEDeviceCharacteristics: (options: getBLEDeviceCharacteristicsOpts) => void;
	/**
	 * 读取低功耗蓝牙设备的特征值的二进制数据值。注意：必须设备的特征值支持read才可以成功调用，具体参照 characteristic 的 properties 属性
	 */
	readBLECharacteristicValue: (options: readBLECharacteristicValueOpts) => void;
	/**
	 * 向低功耗蓝牙设备特征值中写入二进制数据。注意：必须设备的特征值支持write才可以成功调用，具体参照 characteristic 的 properties 属性
	 */
	writeBLECharacteristicValue: (options: writeBLECharacteristicValueOpts) => void;
	/**
	 * 启用低功耗蓝牙设备特征值变化时的 notify 功能，订阅特征值。注意：必须设备的特征值支持notify或者indicate才可以成功调用，具体参照 characteristic 的 properties 属性
	 * 另外，必须先启用notify才能监听到设备 characteristicValueChange 事件
	 */
	notifyBLECharacteristicValueChange: (options: notifyBLECharacteristicValueChangeOpts) => void;
	/**
	 * 监听低功耗蓝牙连接状态的改变事件，包括开发者主动连接或断开连接，设备丢失，连接异常断开等等
	 */
	onBLEConnectionStateChange: (callback: onBLEConnectionStateChangeCallback) => void;
	/**
	 * 监听低功耗蓝牙设备的特征值变化。必须先启用notify接口才能接收到设备推送的notification。
	 */
	onBLECharacteristicValueChange: (callback: onBLECharacteristicValueChangeCallback) => void;
	/**
	 * 开始搜索附近的iBeacon设备
	 */
	startBeaconDiscovery: (options: startBeaconDiscoveryOpts) => void;
	/**
	 * 停止搜索附近的iBeacon设备
	 */
	stopBeaconDiscovery: (options: stopBeaconDiscoveryOpts) => void;
	/**
	 * 获取所有已搜索到的iBeacon设备
	 */
	getBeacons: (options: getBeaconsOpts) => void;
	/**
	 * 监听 iBeacon 设备的更新事件
	 */
	onBeaconUpdate: (cb: onBeaconUpdateCallback) => void;
	/**
	 * 监听 iBeacon 服务的状态变化
	 */
	onBeaconServiceChange: (cb: onBeaconServiceChangeCallBack) => void;
	/**
	 * 设置屏幕亮度
	 */
	setScreenBrightness: (options: setScreenBrightnessOpts) => void;
	/**
	 * 获取屏幕亮度。
	 */
	getScreenBrightness: (options: getScreenBrightnessOpts) => void;
	/**
	 * 设置是否保持常亮状态。仅在当前小程序生效，离开小程序后设置失效
	 */
	setKeepScreenOn: (options: setKeepScreenOnOpts) => void;
	/**
	 * 监听用户主动截屏事件，用户使用系统截屏按键截屏时触发此事件
	 */
	onUserCaptureScreen: () => void;
	/**
	 * 使手机发生较长时间的振动（400ms）
	 */
	vibrateLong: (options: vibrateLongOpts) => void;
	/**
	 * 使手机发生较短时间的振动（15ms）
	 */
	vibrateShort: (options: vibrateShortOpts) => void;
	/**
	 * 调用后，用户可以选择将该表单以“新增联系人”或“添加到已有联系人”的方式，写入手机系统通讯录，完成手机通讯录联系人和联系方式的增加。
	 */
	addPhoneContact: (options: addPhoneContactOpts) => void;
	/**
	 * 判断当前设备是否支持 HCE 能力。
	 */
	getHCEState: (options: getHCEStateOpts) => void;
	/**
	 * 初始化 NFC 模块。
	 */
	startHCE: (options: startHCEOpts) => void;
	/**
	 * 关闭 NFC 模块
	 */
	stopHCE: (options: stopHCEOpts) => void;
	/**
	 * 监听 NFC 设备的消息回调，并在回调中处理。返回参数中 messageType 表示消息类型，目前有如下值：
	 * 1：消息为HCE Apdu Command类型，小程序需对此指令进行处理，并调用 sendHCEMessage 接口返回处理指令；
	 * 2：消息为设备离场事件
	 */
	onHCEMessage: (cb: onHCEMessageCallBack) => void;
	/**
	 * 发送 NFC 消息。仅在安卓系统下有效。
	 */
	sendHCEMessage: (options: sendHCEMessageOpts) => void;
	/**
	 * 初始化 Wi-Fi 模块。
	 */
	startWifi: (options: startWifiOpts) => void;
	/**
	 * 关闭 Wi-Fi 模块。
	 */
	stopWifi: (options: stopWifiOpts) => void;
	/**
	 * 连接 Wi-Fi。若已知 Wi-Fi 信息，可以直接利用该接口连接。仅 Android 与 iOS 11 以上版本支持。
	 */
	connectWifi: (options: connectWifiOpts) => void;
	/**
	 * 请求获取 Wi-Fi 列表，在 onGetWifiList 注册的回调中返回 wifiList 数据。iOS 将跳转到系统的 Wi-Fi 界面，Android 不会跳转。 iOS 11.0 及 iOS 11.1 两个版本因系统问题，该方法失效。但在 iOS 11.2 中已修复。
	 */
	getWifiList: (options: getWifiListOpts) => void;
	/**
	 * 监听在获取到 Wi-Fi 列表数据时的事件，在回调中将返回 wifiList。
	 */
	onGetWifiList: (cb: onGetWifiListCallBack) => void;
	/**
	 * OS特有接口 在 onGetWifiList 回调后，利用接口设置 wifiList 中 AP 的相关信息。
	 */
	setWifiList: (options: setWifiListOpts) => void;
	/**
	 * 监听连接上 Wi-Fi 的事件。
	 */
	onWifiConnected: (cb: onWifiConnectedCb) => void;
	/**
	 * 获取已连接中的 Wi-Fi 信息
	 */
	getConnectedWifi: (options: getConnectedWifiOpts) => void;
}

/**
 * UI APIs
 */
// Interactive feedback 交互反馈
type ShowToastIconType = 'success' | 'loading' | 'none';

interface ShowToastOpts extends WxApiCallback {
	title: string;
	icon?: ShowToastIconType;
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
	itemList: string[];
	itemColor?: any;
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
	duration?: number;
	timingFunc?: string;
}

interface setNavigationBarColorOpts extends WxApiCallback<setNavigationBarColorRes> {
	frontColor: string;
	backgroundColor: string;
	animation?: animationOpts;
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
	borderStyle?: string;
}

interface setTabBarItemOpts extends WxApiCallback {
	index: number;
	text?: string;
	iconPath?: string;
	selectedIconPath?: string;
}

interface showTabBarOpts extends WxApiCallback {
	animation?: boolean;
}

interface hideTabBarOpts extends WxApiCallback {
	animation?: boolean;
}

interface setBackgroundColorOpts {
	backgroundColor?: string;
	backgroundColorTop?: string;
	backgroundColorBottom?: string;
}

interface setBackgroundTextStyleOpts {
	textStyle: 'dark' | 'light';
}

// navigate 导航

interface navigateOpts extends WxApiCallback {
	url: string;
}

// animation 动画

interface createAnimationOpts {
	duration?: number;
	timingFunction?: timingFunctionType;
	delay?: number;
	transformOrigin?: string;
}

interface pageScrollToOpts extends WxApiCallback {
	scrollTop: number;
	duration?: number;
}

interface startPullDownRefreshRes {
	errMsg: string;
}

interface startPullDownRefreshOpts extends WxApiCallback<startPullDownRefreshRes> {}

// WXML节点信息

// TODO: NodesRef

interface fieldsTypes {
	id?: boolean;
	dataset?: boolean;
	rect?: boolean;
	size?: boolean;
	scrollOffset?: boolean;
	properties?: string[];
	computedStyle?: string[];
	context?: boolean;
}

interface boundingClientRectRes {
	id: string;
	dataset: object;
	left: number;
	right: number;
	top: number;
	bottom: number;
	width: number;
	height: number;
}

interface NodesRef {
	/**
	 * 获取节点的相关信息。
	 */
	fields: (fields: fieldsTypes) => createSelectorQueryOpts;
	/**
	 * 添加节点的布局位置的查询请求。
	 */
	boundingClientRect: (callback: (res: fieldsTypes) => void) => createSelectorQueryOpts;
	/**
	 * 添加节点的滚动位置查询请求。
	 */
	scrollOffset: (
		callback: (res: { id: string; dataset: object; scrollLeft: number; scrollTop: number }) => void
	) => createSelectorQueryOpts;
	/**
	 * 添加节点的 Context 对象查询请求。
	 */
	context: (callback: (res: { context: object }) => void) => createSelectorQueryOpts;
}

interface createSelectorQueryOpts {
	/**
	 * 将选择器的选取范围更改为自定义组件 component 内。
	 */
	in: (component: any) => void;
	/**
	 * 在当前页面下选择第一个匹配选择器 selector 的节点
	 */
	select: (selector: string) => NodesRef;
	/**
	 * 在当前页面下选择匹配选择器 selector 的所有节点。
	 */
	selectAll: (selector: string) => NodesRef;
	/**
	 * 选择显示区域。
	 */
	selectViewport: () => NodesRef;
	/**
	 * 执行所有的请求。
	 */
	exec: (callback: Function) => NodesRef;
}

interface marginsTypes {
	left?: number;
	right?: number;
	top?: number;
	botton?: number;
}

interface observeCallBackRes {
	intersectionRatio: number;
	intersectionRect: marginsTypes;
	boundingClientRect: marginsTypes;
	relativeRect: marginsTypes;
	time: number;
}

interface createIntersectionObserverAPIs {
	relativeTo: (selector: string, margins: marginsTypes) => void;
	relativeToViewport: (margins: marginsTypes) => void;
	observe: (targetSelector: string, callback: (res: observeCallBackRes) => void) => void;
	disconnect: () => void;
}

type timingFunctionType =
	| 'linear'
	| 'ease'
	| 'ease-in'
	| 'ease-in-out'
	| 'ease-out'
	| 'step-start'
	| 'step-end';

interface stepOpts {
	duration: number;
	timingFunction: timingFunctionType;
	delay: number;
	transformOrigin: string;
}

declare class WxAnimation {
	/**
	 * 同 transform-function matrix3d
	 */
	matrix3d(
		n1: number,
		n2: number,
		n3: number,
		n4: number,
		n5: number,
		n6: number,
		n7: number,
		n8: number,
		n9: number,
		n10: number,
		n11: number,
		n12: number,
		n13: number,
		n14: number,
		n15: number,
		n16: number
	): this;
	/**
	 * 设置透明度
	 */
	opacity(value: number): this;
	/**
	 * 设置 right 值
	 */
	right(value: number | string): this;
	/**
	 * 从原点顺时针旋转一个角度
	 */
	rotate(angle: number): this;
	/**
	 * 从 X 轴顺时针旋转一个角度
	 */
	rotate3d(x: number, y: number, z: number, angle: number): this;
	/**
	 * 从 X 轴顺时针旋转一个角度zaos
	 */
	rotateX(angle: number): this;
	/**
	 * 从 Y 轴顺时针旋转一个角度
	 */
	rotateY(angle: number): this;
	/**
	 * 从 Z 轴顺时针旋转一个角度
	 */
	rotateZ(angle: number): this;
	/**
	 * 缩放
	 */
	scale(sx: number, sy: number): this;
	/**
	 * 3d 缩放
	 */
	scale3d(sx: number, sy: number, sz: number): this;
	/**
	 * 缩放 X 轴
	 */
	scaleX(scale: number): this;
	/**
	 * 缩放 Y 轴
	 */
	scaleY(scale: number): this;
	/**
	 * 缩放 Z 轴
	 */
	scaleZ(scale: number): this;
	/**
	 * 对X、 Y轴进行倾斜
	 */
	skew(ax: number, ay: number): this;
	/**
	 * 对X轴坐标进行倾斜
	 */
	skewX(angle: number): this;
	/**
	 * 对Y轴坐标进行倾斜
	 */
	skewY(angle: number): this;
	/**
	 * 表示一组动画完成。可以在一组动画中调用任意多个动画方法，一组动画中的所有动画会同时开始，一组动画完成后才会进行下一组动画。
	 */
	step(options: stepOpts): this;
	/**
	 * 设置 top 值
	 */
	top(value: number | string): this;
	/**
	 * 平移变换
	 */
	translate(tx: number, ty: number): this;
	/**
	 * 对 xyz 坐标进行平移变换
	 */
	translate3d(tx: number, ty: number, tz: number): this;
	/**
	 * 对 X 轴平移
	 */
	translateX(translation: number): this;
	/**
	 * 对 Y 轴平移
	 */
	translateY(translation: number): this;
	/**
	 * 对 Z 轴平移
	 */
	translateZ(translation: number): this;
	/**
	 * 设置宽度
	 */
	width(value: number | string): this;
	/**
	 * 设置背景色
	 */
	backgroundColor(value: string): this;
	/**
	 * 设置bottom值
	 */
	bottom(value: number | string): this;
	/**
	 * 导出动画队列。
	 * export 方法每次调用后会清掉之前的动画操作。
	 */
	export(): Array<object>;
	/**
	 * 设置高度
	 */
	height(value: number | string): this;
	/**
	 * 设置 left 值
	 */
	left(value: number | string): this;
	/**
	 * 同 transform-function matrix
	 */
	matrix(a: number, b: number, c: number, d: number, tx: number, ty: number): this;
}

interface UIHideAndShowArgs {
	success: () => void;
	fail: () => void;
	complete: () => void;
}

interface getMenuButtonBoundingClientRectRes {
	width: number;
	height: number;
	top: number;
	right: number;
	bottom: number;
	left: number;
}
interface UIAPIs {
	/**
	 * 显示消息提示框
	 */
	showToast: (options: ShowToastOpts) => void;
	/**
	 * 显示 loading 提示框, 需主动调用 wx.hideLoading 才能关闭提示框
	 */
	showLoading: (options: ShowLoadingOpts) => void;
	/**
	 * 隐藏消息提示框
	 */
	hideToast: (args?: UIHideAndShowArgs) => void;
	/**
	 * 隐藏 loading 提示框
	 */
	hideLoading: (args?: UIHideAndShowArgs) => void;
	/**
	 * 显示模态弹窗
	 */
	showModal: (options: ShowModalOpts) => void;
	/**
	 * 显示操作菜单
	 */
	showActionSheet: (options: ShowActionSheetOpts) => void;
	/**
	 * 动态设置当前页面的标题
	 */
	setNavigationBarTitle: (options: setNavigationBarTitleOpts) => void;
	/**
	 * 在当前页面显示导航条加载动画。
	 */
	showNavigationBarLoading: (args: UIHideAndShowArgs) => void;
	/**
	 * 隐藏导航条加载动画。
	 */
	hideNavigationBarLoading: (args: UIHideAndShowArgs) => void;
	/**
	 * 设置导航条的颜色
	 */
	setNavigationBarColor: (options: setNavigationBarColorOpts) => void;
	/**
	 * 为 tabBar 某一项的右上角添加文本
	 */
	setTabBarBadge: (options: setTabBarBadgeOpts) => void; //1.9.0
	/**
	 * 移除 tabBar 某一项右上角的文本
	 */
	removeTabBarBadge: (options: removeTabBarBadgeOpts) => void; //1.9.0
	/**
	 * 显示 tabBar 某一项的右上角的红点
	 */
	showTabBarRedDot: (options: showTabBarRedDotOpts) => void; //1.9.0
	/**
	 * 隐藏 tabBar 某一项的右上角的红点
	 */
	hideTabBarRedDot: (options: hideTabBarRedDotOpts) => void; //1.9.0
	/**
	 * 动态设置 tabBar 的整体样式
	 */
	setTabBarStyle: (options: setTabBarStyleOpts) => void; //1.9.0
	/**
	 * 动态设置 tabBar 某一项的内容
	 */
	setTabBarItem: (options: setTabBarItemOpts) => void; //1.9.0
	/**
	 * 显示 tabBar
	 */
	showTabBar: (options: showTabBarOpts) => void; //1.9.0
	/**
	 * 隐藏 tabBar
	 */
	hideTabBar: (options: hideTabBarOpts) => void; //1.9.0
	/**
	 * 动态设置窗口的背景色
	 */
	setBackgroundColor: (options: setBackgroundColorOpts) => void;
	/**
	 * 动态设置下拉背景字体、loading 图的样式
	 */
	setBackgroundTextStyle: (options: setBackgroundTextStyleOpts) => void;
	/**
	 * 动态设置置顶栏文字内容，只有当前小程序被置顶时能生效，如果当前小程序没有被置顶，也能调用成功，但是不会立即生效，只有在用户将这个小程序置顶后才换上设置的文字内容
	 */
	setTopBarText: (options: setTopBarTextOpts) => void;
	/**
	 * 保留当前页面，跳转到应用内的某个页面，使用wx.navigateBack可以返回到原页面。
	 */
	navigateTo: (options: navigateOpts) => void;
	/**
	 * 关闭当前页面，跳转到应用内的某个页面。
	 */
	redirectTo: (options: navigateOpts) => void;
	/**
	 * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
	 */
	switchTab: (options: navigateOpts) => void;
	/**
	 * 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages() 获取当前的页面栈，决定需要返回几层。
	 */
	navigateBack: (delta: number) => void;
	/**
	 * 关闭所有页面，打开到应用内的某个页面。
	 */
	reLaunch: (options: navigateOpts) => void;
	/**
	 * 链式调用
	 * 创建一个动画实例animation。
	 * 调用实例的方法来描述动画。最后通过动画实例的export方法导出动画数据传递给组件的animation属性。
	 */
	createAnimation: (options: createAnimationOpts) => WxAnimation;
	/**
	 * 将页面滚动到目标位置。
	 */
	pageScrollTo: (options: pageScrollToOpts) => void;
	//TODO: 绘图
	createCanvasContext: any;
	createLinearGradient: any;
	createContext: any; // 不推荐使用
	drawCanvas: any; // 不推荐使用
	canvasToTempFilePath: any;
	canvasGetImageData: any;
	canvasPutImageData: any;
	/**
	 * 开始下拉刷新，调用后触发下拉刷新动画，效果与用户手动下拉刷新一致
	 */
	startPullDownRefresh: (options?: startPullDownRefreshOpts) => void;
	/**
	 * 停止当前页面下拉刷新。
	 */
	stopPullDownRefresh: (options?: WxApiCallback) => void;
	/**
	 * 返回一个SelectorQuery对象实例。可以在这个实例上使用select等方法选择节点，并使用boundingClientRect等方法选择需要查询的信息。
	 */
	createSelectorQuery: () => createSelectorQueryOpts;
	/**
	 * 节点布局交叉状态API可用于监听两个或多个组件节点在布局位置上的相交状态。这一组API常常可以用于推断某些节点是否可以被用户看见、有多大比例可以被用户看见。
	 */
	createIntersectionObserver: (
		this: any,
		options: { thresholds?: number[]; initialRatio?: number; observeAll?: boolean }
	) => createIntersectionObserverAPIs;
	/**
	 * 延迟一部分操作到下一个时间片再执行。
	 */
	nextTick: (c: Function) => void;
	/**
	 * 获取菜单按钮（右上角胶囊按钮）的布局位置信息。坐标信息以屏幕左上角为原点。
	 */
	getMenuButtonBoundingClientRect: () => getMenuButtonBoundingClientRectRes;
	/**
	 * 监听窗口尺寸变化事件
	 */
	onWindowResize: (c: (size: { windowWidth: number; windowHeight: number }) => void) => void;
	/**
	 * 监听键盘高度变化
	 */
	onKeyboardHeightChange: (c: Function) => void;
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
	getActions: any; //不推荐使用
	clearActions: any; //不推荐使用
	measureText: any;
	globalCompositeOperation: any;
	arcTo: any;
	strokeText: any;
	lineDashOffset: any;
	createPattern: any;
	font: any;
	setTransform: any;
}

/**
 * Third party APIs
 */
interface getExtConfigRes {
	errMsg: string;
	extConfig: any;
}
interface getExtConfigOpts extends WxApiCallback<getExtConfigRes> {}

interface ThirdPartyAPIs {
	getExtConfig: (options: getExtConfigOpts) => void;
	getExtConfigSync: (extConfig: any) => void;
}

/**
 *  Open Interface APIs
 */
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
		| 'scope.userInfo'
		| 'scope.userLocation'
		| 'scope.address'
		| 'wx.chooseAddress'
		| 'scope.invoiceTitle'
		| 'wx.chooseInvoiceTitle'
		| 'scope.werun'
		| 'wx.getWeRunData'
		| 'scope.record'
		| 'wx.startRecord'
		| 'scope.writePhotosAlbum'
		| 'wx.saveImageToPhotosAlbum'
		| 'wx.saveVideoToPhotosAlbum'
		| 'scope.camera';
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
	withCredentials?: boolean;
	lang?: string;
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
	/** 是否使用带 shareTicket 的转发详情	*/
	withShareTicket?: boolean;
	/** 是否是动态消息，详见动态消息 */
	isUpdatableMessage?: boolean;
	/** 动态消息的 activityId。通过 updatableMessage.createActivityId 接口获取 */
	activityId?: string;
	/** 动态消息的模板信息 */
	templateInfo?: { parameterList: Array<{ name: string; value: string }> };
}

interface getShareInfoOpts extends WxApiCallback {
	/** shareTicket */
	shareTicket: string;
	/** 超时时间，单位 ms */
	timeout?: number;
}

interface chooseAddressRes {
	errMsg: string;
	userName: string;
	postalCode: string;
	provinceName: string;
	cityName: string;
	countyName: string;
	detailInfo: string;
	nationalCode: string;
	telNumber: string;
}
interface chooseAddressOpts extends WxApiCallback<chooseAddressRes> {}

interface openSettingRes {
	authSetting: any;
}

interface openSettingOpts extends WxApiCallback<openSettingRes> {}

interface getSettingRes {
	authSetting: any;
}

interface getSettingOpts extends WxApiCallback<getSettingRes> {}

interface getWeRunDataRes {
	errMsg: string;
	encryptedData: string;
	iv: string;
}

interface getWeRunDataOpts extends WxApiCallback<getWeRunDataRes> {
	timeout?: number;
}

interface navigateToMiniProgramRes {
	errMsg: string;
}

interface extraDataOpts {
	encrypt_card_id: string;
	outer_str: string;
	biz: string;
}

interface navigateToMiniProgramOpts extends WxApiCallback<navigateToMiniProgramRes> {
	appId: string;
	extraData: extraDataOpts[];
	path: string;
	envVersion: string;
}
interface navigateBackMiniProgramRes {
	errMsg: string;
}
interface navigateBackMiniProgramOpts extends WxApiCallback<navigateBackMiniProgramRes> {
	extraData: any;
}

interface chooseInvoiceTitleRes {
	type: string;
	title: string;
	taxNumber: string;
	companyAddress: string;
	telephone: string;
	bankName: string;
	bankAccount: string;
	errMsg: string;
}

interface chooseInvoiceTitleOpts extends WxApiCallback<chooseInvoiceTitleRes> {}

interface checkIsSupportSoterAuthenticationRes {
	supportMode: string[]; // 人脸识别（暂未支持）声纹识别（暂未支持）
	errMsg: string;
}

interface checkIsSupportSoterAuthenticationOpts
	extends WxApiCallback<checkIsSupportSoterAuthenticationRes> {}

interface startSoterAuthenticationRes {
	errCode: number;
	authMode: string;
	resultJSON: string;
	resultJSONSignature: string;
	errMsg: string;
}

interface startSoterAuthenticationOpts extends WxApiCallback<startSoterAuthenticationRes> {
	requestAuthMode: string[];
	challenge: string;
	authContent: string;
}

interface checkIsSoterEnrolledInDeviceRes {
	inEnrolled: boolean;
	errMsg: string;
}

interface checkIsSoterEnrolledInDeviceOpts extends WxApiCallback<checkIsSoterEnrolledInDeviceRes> {
	checkAuthMode: string;
}

interface cardListOpts {
	cardId: string;
	cardExt: string;
}

interface addCardOpts extends WxApiCallback {
	cardList: cardListOpts[];
}

interface openCardListOpts {
	cardId: string;
	code: string;
}

interface openCardOpts extends WxApiCallback {
	cardList: openCardListOpts[];
}

interface miniProgramObj {
	appId: string;
}

interface pluginObj {
	appid: string;
	version: string;
}

interface getAccountInfoSyncOpts {
	miniProgram: miniProgramObj;
	plugin: pluginObj;
}

interface shareAppMessageOpts {
	/** 转发标题，不传则默认使用当前小游戏的昵称。 */
	title: string;
	/** 转发显示图片的链接，可以是网络图片路径或本地图片文件路径或相对代码包根目录的图片文件路径。显示图片长宽比是 5:4 */
	imageUrl: string;
	/** 查询字符串，从这条转发消息进入后，可通过 wx.getLaunchOptionsSync() 或 wx.onShow() 获取启动参数中的 query。必须是 key1=val1&key2=val2 的格式。 */
	query: string;
	/** 审核通过的图片 ID，详见 使用审核通过的转发图片 */
	imageUrlId: string;
}
interface OpenInterfaceAPIs {
	/**
	 * 调用接口wx.login() 获取临时登录凭证（code）
	 */
	login: (options: LoginOpts) => void;
	/**
	 * 校验用户当前session_key是否有效。
	 */
	checkSession: (options: CheckSessionOpts) => void;
	/**
	 * 提前向用户发起授权请求。调用后会立刻弹窗询问用户是否同意授权小程序使用某项功能或获取用户的某些数据，
	 * 但不会实际调用对应接口。
	 * 如果用户之前已经同意授权，则不会出现弹窗，直接返回成功。
	 */
	authorize: (optiona: AuthorizeOpts) => void;
	/**
	 * 当用户未授权过，调用该接口将直接进入fail回调
	 * 当用户授权过，可以使用该接口获取用户信息
	 */
	getUserInfo: (options: getUserInfoOpts) => void;
	/**
	 * 获取微信用户绑定的手机号，需先调用login接口。
	 */
	getPhoneNumber: (e: any) => void;
	/**
	 * 发起微信支付
	 */
	requestPayment: (options: requestPaymentOpts) => void;
	/**
	 * 显示当前页面的转发按钮
	 */
	showShareMenu: (options: showShareMenuOpts) => void;
	/**
	 * 隐藏转发按钮
	 */
	hideShareMenu: (optinos: WxApiCallback) => void;
	/**
	 * 更新转发属性
	 */
	updateShareMenu: (options: updateShareMenuOpts) => void;
	/**
	 * 取消监听用户点击右上角菜单的「转发」按钮时触发的事件
	 */
	offShareAppMessage: (callback: () => void) => void;
	/**
	 * 主动拉起转发，进入选择通讯录界面
	 */
	shareAppMessage: (options: shareAppMessageOpts) => void;
	/**
	 * 获取转发详细信息
	 */
	getShareInfo: (options: getShareInfoOpts) => void;
	/**
	 * 调起用户编辑收货地址原生界面，并在编辑完成后返回用户选择的地址。
	 */
	chooseAddress: (options: chooseAddressOpts) => void;
	/**
	 * 批量添加卡券。
	 */
	addCard: (options: addCardOpts) => void;
	/**
	 * 查看微信卡包中的卡券。
	 */
	openCard: (options: openCardOpts) => void;
	/**
	 * 调起客户端小程序设置界面，返回用户设置的操作结果。
	 */
	openSetting: (options: openSettingOpts) => void;
	/**
	 * 获取用户的当前设置。
	 */
	getSetting: (options: getSettingOpts) => void;
	/**
	 * 获取用户过去三十天微信运动步数，需要先调用 wx.login 接口。
	 */
	getWeRunData: (options: getWeRunDataOpts) => void;
	/**
	 * 访问当前小程序或插件帐号信息。
	 */
	getAccountInfoSync: (options: getAccountInfoSyncOpts) => void;
	/**
	 * 打开另一个小程序
	 */
	navigateToMiniProgram: (options: navigateToMiniProgramOpts) => void;
	/**
	 * 返回到上一个小程序，只有在当前小程序是被其他小程序打开时可以调用成功
	 */
	navigateBackMiniProgram: (options: navigateBackMiniProgramOpts) => void;
	/**
	 * 选择用户的发票抬头。
	 */
	chooseInvoiceTitle: (options: chooseInvoiceTitleOpts) => void;
	/**
	 * 获取本机支持的 SOTER 生物认证方式
	 */
	checkIsSupportSoterAuthentication: (options: checkIsSupportSoterAuthenticationOpts) => void;
	/**
	 * 开始 SOTER 生物认证
	 */
	startSoterAuthentication: (options: startSoterAuthenticationOpts) => void;
	/**
	 * 获取设备内是否录入如指纹等生物信息的接口
	 */
	checkIsSoterEnrolledInDevice: (options: checkIsSoterEnrolledInDeviceOpts) => void;
}

/**
 * Data APIs
 */
interface reportAnalyticsOpts {
	eventName: string;
	data: any;
}

interface DataAPIs {
	reportAnalytics: (options: reportAnalyticsOpts) => void;
}

/**
 * Update APIs
 */
interface UpdateAPIs {
	/**
	 * 获取全局唯一的版本更新管理器，用于管理小程序更新。
	 */
	getUpdateManager: () => updateManagerAPIs;
}

interface updateManagerAPIs {
	/**
	 * 监听向微信后台请求检查更新结果事件。微信在小程序冷启动时自动检查更新，不需由开发者主动触发。
	 */
	onCheckForUpdate: (callback: (res: { hasUpdate: boolean }) => void) => void;
	/**
	 * 监听小程序有版本更新事件。客户端主动触发下载（无需开发者触发），下载成功后回调
	 */
	onUpdateReady: (callback: Function) => void;
	/**
	 * 监听小程序更新失败事件。小程序有新版本，客户端主动触发下载（无需开发者触发），下载失败（可能是网络原因等）后回调
	 */
	onUpdateFailed: (callback: Function) => void;
	/**
	 * 当小程序新版本下载完成后（即收到 onUpdateReady 回调），强制小程序重启并使用新版本
	 */
	applyUpdate: ZeroParamVoidFunc;
}

/**
 * Multithreading APIs
 */
interface MultithreadingAPIs {
	/**
	 * 创建一个 Worker 线程，并返回 Worker 实例，目前限制最多只能创建一个 Worker，创建下一个 Worker 前请调用 Worker.terminate。
	 */
	createWorker: (scriptPath: string) => workerAPIs;
}

interface workerAPIs {
	postMessage: ({ msg: string }) => void;
	onMessage: any;
	terminate: ZeroParamVoidFunc;
}

interface MonitorAPIs {
	/**
	 * 自定义业务数据监控上报接口。
	 */
	reportMonitor: (name: string, value: number) => void;
}

/**
 * Debugging APIs
 */
interface setEnableDebugRes {
	errMsg: string;
}

interface setEnableDebugOpts extends WxApiCallback<setEnableDebugRes> {
	enableDebug: boolean;
}
interface DebuggingAPIs {
	/**
	 * 设置是否打开调试开关，此开关对正式版也能生效。
	 */
	setEnableDebug: (options: setEnableDebugOpts) => void;
}

interface LogManager {
	log: object | Array<any> | number | string;
	info: object | Array<any> | number | string;
	warn: object | Array<any> | number | string;
	debug: object | Array<any> | number | string;
}

interface LogApis {
	/**
	 * 获取日志管理器 logManager 对象。
	 * @param level 默认值为0
	 */
	getLogManager: ({ level }: { level: number }) => LogManager;
}

interface WxApplicationProps {
	path: string;
	scene: number;
	query: any;
	shareTicket: string;
	referrerInfo: {
		appId: string;
		extraData: object;
	};
}

interface onAppShowCb {
	(res: WxApplicationProps): void;
}
/**
 * wx应用级事件Api
 */
interface WxApplicationLevel {
	getLaunchOptionsSync: () => WxApplicationProps;
	/**
	 * 小程序要打开的页面不存在事件的回调函数
	 */
	offPageNotFound: (cb: Function) => void;
	/**
	 * 小程序要打开的页面不存在事件的回调函数
	 */
	onPageNotFound: (cb: Function) => void;
	/**
	 * 取消监听小程序错误事件。
	 */
	offError: (cb: Function) => void;
	/**
	 * 监听小程序错误事件。
	 */
	onError: (cb: Function) => void;
	/**
	 * 取消监听小程序切前台事件
	 */
	offAppShow: (cb: Function) => void;
	/**
	 * 监听小程序切前台事件。
	 */
	onAppShow: (cb: onAppShowCb) => void;
	/**
	 *   取消监听小程序切后台事件
	 */
	offAppHide: (cb: Function) => void;
	/**
	 * 监听小程序切后台事件。
	 */
	onAppHide: (cb: Function) => void;
	/**
	 * 监听音频因为受到系统占用而被中断开始事件。
	 */
	onAudioInterruptionBegin: (cb: Function) => void;
	/**
	 * 取消监听音频因为受到系统占用而被中断开始事件
	 */
	offAudioInterruptionBegin: (cb: Function) => void;
	/**
	 * 监听音频中断结束事件。
	 */
	onAudioInterruptionEnd: (cb: Function) => void;
	/**
	 * 取消监听音频中断结束事件
	 */
	offAudioInterruptionEnd: (cb: Function) => void;
}

// RewardedVideoAd Api

interface RewardedVideoAd {
	/**
	 * 加载激励视频广告
	 */
	load: ZeroParamVoidFunc;
	/**
	 * 取消监听用户点击 关闭广告 按钮的事件
	 */
	offClose: (cb: ReturnCallBack) => void;
	/**
	 * 取消监听激励视频错误事件
	 */
	offError: (cb: ReturnCallBack) => void;
	/**
	 * 监听用户点击 关闭广告 按钮的事件
	 */
	onClose: (cb: ReturnCallBack) => void;
	/**
	 * 监听激励视频错误事件
	 */
	onError: (obj: { errMsg: string; errCode: number }) => void;
	/**
	 * 监听激励视频广告加载事件
	 */
	onLoad: (cb: ReturnCallBack) => void;
	/**
	 * 显示激励视频广告。激励视频广告将从屏幕下方推入。
	 */
	show: (cb: ReturnCallBack) => void;
}

interface InterstitialAd {
	/**
	 * 取消监听插屏广告关闭事件
	 */
	offClose: (cb: ReturnCallBack) => void;
	/**
	 * 取消监听插屏错误事件
	 */
	offError: (cb: ReturnCallBack) => void;
	/**
	 * 取消监听插屏广告加载事件
	 */
	offLoad: (cb: ReturnCallBack) => void;
	/**
	 * 监听插屏广告关闭事件
	 */
	onClose: (cb: ReturnCallBack) => void;
	/**
	 * 监听插屏错误事件
	 */
	onError: (res: { errMsg: string; errCode: number }) => void;
	/**
	 * 监听插屏广告加载事件
	 */
	onLoad: (cb: ReturnCallBack) => void;
	/**
	 * 显示插屏广告。
	 */
	show: () => Promise<any>;
}

interface createRewardedVideoAdAPIs {
	/**
	 * 创建激励视频广告组件
	 */
	createRewardedVideoAd: (obj: { adUnitId: string }) => RewardedVideoAd;
	/**
	 * 创建插屏广告组件
	 */
	createInterstitialAd: (obj: { adUnitId: string }) => InterstitialAd;
}

/** 基本功能 */

interface basicFunction {
	/**
	 * 小程序环境变量对象
	 * ```typescript
	 * wx.env.NODE_ENV = 'production'
	 * ```
	 * 文件系统中的用户目录路径
	 */
	env: any;
}

// Declares
declare let wx: NetworkAPIs &
	WxApplicationLevel &
	MediaAPIs &
	FileAPIs &
	StorageAPIs &
	LocationAPIs &
	DeviceAPIs &
	UIAPIs &
	ThirdPartyAPIs &
	OpenInterfaceAPIs &
	DataAPIs &
	UpdateAPIs &
	MultithreadingAPIs &
	MonitorAPIs &
	DebuggingAPIs &
	basicFunction &
	LogApis;

declare let SocketTask: SocketTaskAPIs;
// declare let nodesRef: nodesRefAPIs;
// declare let worker: workerAPIs;
declare let canvasContext: canvasContextApi;

/**
 * 取消由 setInterval 设置的定时器。
 */
declare function clearInterval(intervalID: number): void;
/**
 * 取消由 setTimeout 设置的定时器。
 */
declare function clearTimeout(timeoutID: number): void;
/**
 * 设定一个定时器。
 */
declare function setInterval(callback: () => void, delay: number, rest: any): number;
/**
 * 设定一个定时器。
 */
declare function setTimeout(callback: () => void, delay: number, rest: any): number;

declare function App(app: AppOpts): void;
declare function Page(page: PageOpts): void;
declare function getApp(): IApp;
declare function getCurrentPages(): IPage[];

/** 模块化 */

/**
 * 引入模块。返回模块通过 module.exports 或 exports 暴露的接口。
 * @param path 文件路径
 */
declare function require(path: string): any;
/**
 * 当前模块对象
 */
declare const module: { exports: any };
/**
 * module.exports 的引用
 */
declare const exports: any;
