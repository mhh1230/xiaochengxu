// pages/login/index.js
Page({

  handleGgetUserInfo(e) {

    const {
      userInfo
    } = e.detail;
    wx.setStorageSync('userinfo', userInfo);
    console.log(userInfo);
    wx.navigateBack({
      delta: 1 // 回退前 delta(默认为1) 页面

    })

    // wx.navigateBack({
    //   delta: 1 // 回退前 delta(默认为1) 页面

    // })
  }

})