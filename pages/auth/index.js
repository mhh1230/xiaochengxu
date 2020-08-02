//引入发送请求的方法
import {
  request
} from "../../request/index.js";
import {
  login
} from "../../utils/asyncAdress.js";


Page({
  //获取用户信息
  async handleGetUserInfo(e) {
    // console.log(e);获取用户信息
    try {
      const {
        encryptedData,
        rawData,
        iv,
        signature
      } = e.detail;

      // 获取小程序登陆成功后的code
      const {
        code
      } = await login();
      const loginParams = {
        encryptedData,
        rawData,
        iv,
        signature,
        code
      }
      //发送请求 获取用户的token
      const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo";
      // const {
      //   token
      // } = await request({
      //   methods: "post",
      //   url: '/users/wxlogin',
      //   data: loginParams
      // })
      //把token存入到缓存中
      wx.setStorageSync('token', token)
      wx.navigateBack({
        detail: 1
      })
    } catch (error) {
      console.log("不存在token");
    }

  }
})