/// <reference path="./wx.d.ts" />

//在微信小程序的app.ts中这样用
const options = {
  duration: 10000,
  sampleRate: 44100,
  numberOfChannels: 1,
  encodeBitRate: 192000,
  format: "aac",
  frameSize: 50
}
Page({ 
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  inputValue: '',
  bindInputBlur: function(e) {
    this.inputValue = e.detail.value
  },
  bindSendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.inputValue,
    })
  },
  data:{},
  a(){
    SocketTask.onError(res => res.errMsg);
    wx.onAccelerometerChange((res) => console.log(res.x));
    wx.onBLEConnectionStateChange(function(res){
      res.deviceId
    })
    wx.onBLECharacteristicValueChange((res) => console.log(res.deviceId))
    let a = wx.request({url: "da", dataType: 'dada'})
    a.abort()
    let b = wx.uploadFile({url: 'dada', filePath: "daada", name: "dada"});
    b.onProgressUpdate(res => console.log(res.progress, res.totalBytesSent))
    // wx.onSocketOpen(res => console.log(res.header))
    wx.onSocketMessage(res => console.log(res.data));
    wx.onSocketClose(res => console.log(res))
    const recorderManager = wx.getRecorderManager()
    recorderManager.onStop((res) => console.log(res.tempFilePath))
    recorderManager.onPause(() => console.log('dadadadad'))
    recorderManager.start(options)
    wx.getImageInfo({
      src: 'images/a.jpg',
      success: function (res) {
        console.log(res.orientation)
        console.log(res.height)
      }
    })
    wx.pauseVoice();
    wx.stopVoice();
    wx.getBackgroundAudioPlayerState({
      success: function(res) {
        var status = res.status
        var dataUrl = res.dataUrl
        var currentPosition = res.currentPosition
        var duration = res.duration
        var downloadPercent = res.downloadPercent
      }
    })
    wx.chooseImage({
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        wx.saveFile({
          tempFilePath: tempFilePaths[0],
          success: function(res) {
            var savedFilePath = res.savedFilePath
          }
        })
      }
    })
    wx.loadFontFace({
      family: 'Bitstream Vera Serif Bold',
      source: 'url("https://sungd.github.io/Pacifico.ttf")',
      success: function(res) {
        console.log(res.status) //  loaded
      },
      fail: function(res) {
        console.log(res.status) //  error
      },
      complete: function(res) {
        console.log(res.status);
      }
    });
    wx.onBackgroundAudioPlay((res) => console.log())
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.onError((res) => console.log(res))
    backgroundAudioManager.title = '此时此刻'
    backgroundAudioManager.epname = '此时此刻'
    backgroundAudioManager.singer = '许巍'
    backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
    backgroundAudioManager.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46' // 设置了 src 之后会自动播放
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
    innerAudioContext.onPlay(() => {
        console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
    })
    const FileSystemManager = wx.getFileSystemManager();
    let Stata = FileSystemManager.stat({path: 'sss', recursive: false});
    Stata.isDirectory()
  
  },
  audioPlay: function () {
    this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause()
  },
  audio14: function () {
    this.audioCtx.seek(14)
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  }
} as any)
