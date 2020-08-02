//引入发送请求的方法
import {
  request
} from "../../request/index.js";


// pages/goods_list/index.js
Page({
  data: {
    tabs: [{
        id: 0,
        value: '综合',
        isActive: true
      },
      {
        id: 1,
        value: '销量',
        isActive: false
      }, {
        id: 2,
        value: '价格',
        isActive: false
      }
    ],
    goodsList: []

  },
  //接口要参数
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  //总页数
  totlePage: 1,
  onLoad: function (options) {
    this.QueryParams.cid = options.cid || '';
    this.QueryParams.query = options.query || '';
    this.getGoodsList()
    // console.log(options);
  },
  async getGoodsList() {
    const result = await request({
      url: "/goods/search",
      data: this.QueryParams
    })
    const total = result.data.message.total;
    this.totlePage = Math.ceil(total / this.QueryParams.pagesize);
    // console.log(this.totlePage);
    this.setData({
      // goodsList: result.data.message.goods
      goodsList: [
        ...this.data.goodsList,
        ...result.data.message.goods
      ]
    })
  },
  //从子组件传递过来的点击事件
  handleItem(e) {
    // console.log(e);
    const index = e.detail.index;
    // console.log(index);
    let tabs = this.data.tabs;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  },
  //判断有么有下一页数据
  onReachBottom() {
    if (this.QueryParams.pagenum >= this.totlePage) {
      wx.showToast({
        title: '没有数据了'
      })
    } else {
      this.QueryParams.pagenum++;
      this.getGoodsList()
    }
  },
  //下拉刷新事件
  onPullDownRefresh() {
    //重置数组，否则会有很旧数据
    this.setData({
      goodsList: []
    })
    //刷新肯定页码等于1
    this.QueryParams.pagenum = 1;
    //再次重新发送请求
    this.getGoodsList()
  },
  //刷新成功关闭窗口
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  }

})