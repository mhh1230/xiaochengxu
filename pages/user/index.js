// pages/user/index.js
Page({


  data: {
    userinfo: {}
  },
  onShow() {
    const userinfo = wx.getStorageSync('userinfo', userinfo);
    this.setData({
      userinfo

    })
  }


})