//引入发送请求的方法
import {
  request
} from "../../request/index.js";



//Page Object
Page({
  data: {
    swiperList: [], //轮播
    cateList: [], //分类导航
    productshow: [] //楼层产品展示数据

  },
  //options(Object)
  onLoad: function (options) {
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     this.setData({
    //       swiperList: result.data.message
    //     })
    //   }
    // });
    this.getLunboData();
    this.getCateList();
    this.getProductShow();
  },

  // 获取轮播图数据
  getLunboData() {
    request({
      url: "/home/swiperdata"
    }).then(result => {
      this.setData({
        swiperList: result.data.message
      })
    })
  },
  getCateList() {
    request({
      url: "/home/catitems"
    }).then(result => {
      this.setData({
        cateList: result.data.message
      })
    })
  },
  getProductShow() {
    request({
      url: "/home/floordata"
    }).then(result => {
      this.setData({
        productshow: result.data.message
      })
    })
  }



});