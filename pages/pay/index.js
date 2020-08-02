import {
  request
} from "../../request/index.js";

import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast,
  requestPayment
} from "../../utils/asyncAdress.js";


Page({
  data: {
    address: {},
    //获取的添加购物车缓存的数据
    cart: [],
    totlePrice: 0,
    totalNum: 0
  },
  onShow() {
    //获取收获地址的数据
    const address = wx.getStorageSync('address');
    // 获取缓存中的购物车的数据
    let cart = wx.getStorageSync('cart') || [];
    //过滤购物车的数据
    cart = cart.filter(v => v.checked);

    //总价格，总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      totalPrice += v.num * v.goods_price;
      totalNum += v.num;
    })
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    })

  },
  //点击支付
  async handleOrderPay() {

    const token = wx.getStorageSync("token")
    //判断
    if (!token) {
      wx.navigateTo({
        url: "/pages/auth/index"
      });
      return
    }
    //创建订单
    //准备请求头
    const header = {
      Authorization: token
    };
    const order_price = this.data.totlePrice;
    const consignee_addr = this.data.address.all;
    const cart = this.data.cart;
    let goods = [];
    cart.forEach(v => goods.push({
      goods_id: v.goods_id,
      goods_number: v.num,
      goods_price: v.goods_price
    }))

    const orderParams = {
      order_price,
      consignee_addr,
      goods
    }
    const {
      order_number
    } = await request({
      url: '/my/orders/create',
      header: header,
      methods: 'post',
      data: orderParams
    })

    const show = await showToast({
      title: "支付不了！"
    })
    return
    // 发起预支付接口
    const {
      pay
    } = await request({
      url: '/my/orders/req_undefiendorder',
      methods: "post",
      data: {
        order_number
      }
    })
    //发起支付功能
    // await requestPayment();





  }

})