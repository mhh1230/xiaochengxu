// pages/search/index.js


import {
  request
} from "../../request/index.js";


Page({

  data: {
    goods: [],
    inputValue: ''
  },
  timeId: -1,
  handleInput(e) {
    const {
      value
    } = e.detail;
    if (!value.trim()) {
      this.setData({
        goods: [],
        isFocus: false,
        inputValue: ''
      })
      return;
    }
    this.setData({
      isFocus: true
    })
    clearTimeout(this.timeId);
    this.timeId = setTimeout(() => {
      this.qsearch(value);
    }, 1000);
  },
  //点击取消按钮
  handleCancle() {
    this.setData({
      isFocus: false,
      goods: [],
      inputValue: ''
    })
  },
  //发送请求获取搜索建议
  async qsearch(query) {
    const res = await request({
      url: "/goods/qsearch",
      data: {
        query
      }
    });
    console.log(res.data.message);
    this.setData({
      goods: res.data.message
    })
  }

})