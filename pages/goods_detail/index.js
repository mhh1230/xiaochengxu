import {
  request
} from "../../request/index.js";
// pages/goods_detail/index.js
Page({
  data: {
    goodsList: {}
  },
  goodsInfo: {},
  onLoad: function (options) {
    // console.log(options);
    const {
      goods_id
    } = options
    this.getGoodsDetailData(goods_id)
  },
  async getGoodsDetailData(goods_id) {
    const result = await request({
      url: "/goods/detail",
      data: {
        goods_id

      }
    });
    this.goodsInfo = result.data.message;
    this.setData({
      //为了不造成性能消耗浪费，加载太多数据,就筛选一下要用到的数据
      goodsList: {
        goods_name: result.data.message.goods_name,
        goods_price: result.data.message.goods_price,
        goods_introduce: result.data.message.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: result.data.message.pics
      }

    })
  },
  //点击轮播图放大预览
  bindPrevewImage(e) {
    const urls = this.goodsInfo.pics.map(v => v.pics_mid)
    const currenturl = e.currentTarget.dataset.url
    wx.previewImage({
      current: currenturl, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  }, //点击加入购物车
  handleCartAdd() {
    //获取缓存中的购物车数据，数组格式的
    console.log("dd");
    let cart = wx.getStorageSync("cart") || [];
    let index = cart.findIndex(v => v.goods_id === this.goodsInfo.goods_id);
    if (index === -1) {
      //不存在缓存数据，第一次添加数据赋值新属性num，作为购买数量
      this.goodsInfo.num = 1;
      //是否选中此商品的，以便后面计算
      this.goodsInfo.checked = true;
      cart.push(this.goodsInfo);;
    } else {
      //已存在缓存的数据++
      cart[index].num++;
    }
    //把购物车的数据添加到缓存中
    wx.setStorageSync('cart', cart);
    //
    wx.showToast({
      title: '添加成功了',
      icon: 'success',
      mask: true //防止用户手抖，疯狂点击

    });


  }




})