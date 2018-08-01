/// <reference path="./wx.d.ts" />

//在微信小程序的app.ts中这样用
Page({
  data:{},
  a(){
    SocketTask.onError();
    wx.onAccelerometerChange((res) => console.log(res.x))
  },
})
