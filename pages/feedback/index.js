// pages/feedback/index.js
Page({
  data: {
    tabs: [{
        id: 0,
        value: '体验问题',
        isActive: true
      },
      {
        id: 1,
        value: '商品、商家投诉',
        isActive: false
      }
    ],
    //被选中的图片数组
    chooseImgs: []

  },
  handleItem(e) {
    const index = e.detail.index;
    let tabs = this.data.tabs;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  }
  //点击加号 选择图片
  ,
  handleChooseImg() {
    wx.chooseImage({
      count: 9,
      //图片的格式 原图        压缩过后的
      sizeType: ['original', 'compressed'],
      //图片来源    相册     照相机
      sourceType: ['album', 'camera'],
      success: (result) => {
        console.log(result);
        this.setData({
          //要进行原数组和新数组拼接
          // chooseImgs: result.tempFilePaths,
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
        })
      }
    });

  },
  //点击删除图片
  handleRemoveImg(e) {
    console.log(e);
    const {
      index
    } = e.currentTarget.dataset;
    let {
      chooseImgs
    } = this.data;
    chooseImgs.splice(index, 1);
    this.setData({
      chooseImgs
    })
  }

})