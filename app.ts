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
    b.onProgressUpdate(res => console.log(res.progress, res.totalBytesExpectedToSend, res.totalBytesSent))
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
    wx.stopVoice()
  }
})
