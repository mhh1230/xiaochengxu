//引入发送请求的方法
import {
  request
} from "../../request/index.js";

Page({
  data: { //页面初始数据
    leftMenuList: [],
    rightMenuList: [],
    currentIndex: 0, //激活索引
    scrolltop: 0
  },
  catesList: [0], //数据先存放在这里，在拆分成左右两边的数组数据
  onLoad: function (options) {
    // this.getCates();
    //获取本地存储中的数据
    const catesList = wx.getStorageSync('cateslist');
    if (!catesList) {
      this.getCates();
    } else {
      if (Date.now() - catesList.time > 1000 * 10) {
        this.getCates();
      } else {
        this.catesList = catesList.data;
        let leftMenuList = this.catesList.map(v => v.cat_name);
        let rightMenuList = this.catesList[0].children;
        this.setData({
          leftMenuList,
          rightMenuList
        })

      }
    }
  },
  // 获取分类数据
  async getCates() {
    // request({
    //   url: "/categories"
    // }).then(result => {
    //   // console.log(result);
    //   this.catesList = result.data.message;
    //   wx.setStorageSync("cateslist", {
    //     time: Date.now(),
    //     data: this.catesList
    //   });
    //   //左右菜单数据
    //   let leftMenuList = this.catesList.map(v => v.cat_name);
    //   let rightMenuList = this.catesList[0].children;
    //   this.setData({
    //     leftMenuList,
    //     rightMenuList
    //   })
    // })

    const result = await request({
      url: "/categories"
    });
    this.catesList = result.data.message;
    wx.setStorageSync("cateslist", {
      time: Date.now(),
      data: this.catesList
    });
    let leftMenuList = this.catesList.map(v => v.cat_name);
    let rightMenuList = this.catesList[0].children;
    this.setData({
      leftMenuList,
      rightMenuList
    })


  },
  handleItem(e) {
    // console.log(e);
    const index = e.currentTarget.dataset.index;
    let rightMenuList = this.catesList[index].children;
    this.setData({
      currentIndex: index,
      rightMenuList,
      scrolltop: 0
    })

  }




})