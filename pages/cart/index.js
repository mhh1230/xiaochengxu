// pages/cart/index.js
/*
获取收货地址
1、绑定点击事件，获取用户的收获地址，wx.chooseAddress
2、获取用户对小程序所授予地址额权限状态 scope
   1、点击确定。authSetting scope.address的scope为true
   2、 点击取消。authSetting scope.address的scope为false
   3、没有调用就是undefined

*/


import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast
} from "../../utils/asyncAdress.js";


Page({
  data: {
    address: {},
    //获取的添加购物车缓存的数据
    cart: [],
    allChecked: false,
    totlePrice: 0,
    totalNum: 0
  },
  onShow() {
    //获取收获地址的数据
    const address = wx.getStorageSync('address');
    // 获取缓存中的购物车的数据
    const cart = wx.getStorageSync('cart') || [];
    //计算全选   every数组方法，会遍历会接收一个回调函数
    //如果每一个回调函数否返回true了，那么他返回的结果就是ture
    //有一个false，就不返回true,但是如果是空数组调用every，返回值就是true
    //所以要判断，不再是  cartdata.every(v => v.checked)
    // const allChecked = cart.length ? cart.every(v => v.checked) : false;
    this.setData({
      address
    })
    this.setDataCart(cart)
  },
  async handleAddress() {
    try {
      //获取权限状态
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      //判断权限的状态
      if (scopeAddress === true || scopeAddress === undefined) {
        //调用获取地址的api
        await chooseAddress();
      } else {
        //如果是false拒绝，就引导用户打开设置授权页面
        await openSetting();
      }
      const address = await chooseAddress();
      //存入到缓存中
      wx.setStorageSync("address", address);


    } catch (error) {
      console.log(error);
    }

  },
  // 商品被选中时候
  handeItemChange(e) {
    //获取被修改的商品id
    const goods_id = e.currentTarget.dataset.id;
    //获取购物车数组
    let {
      cart
    } = this.data;
    //找到被修改的商品对象
    let index = cart.findIndex(v => v.goods_id === goods_id);
    //选择取反
    cart[index].checked = !cart[index].checked;

    this.setDataCart(cart)

  },


  //商品全选功能
  handleItemChecked() {
    //获取data中的全选变量
    let {
      cart,
      allChecked
    } = this.data;
    // 全选取反
    allChecked = !allChecked;
    //修改cart数组中的商品状态
    cart.forEach(v => v.checked = allChecked)
    this.setDataCart(cart)
  },


  //商品数量编辑功能
  async handleItemNumEdit(e) {
    //获取传递过来的参数
    const {
      operation,
      id
    } = e.currentTarget.dataset;
    //获取购物车数组
    let {
      cart
    } = this.data;
    //找到需要修改的商品的索引
    const index = cart.findIndex(v => v.goods_id === id)
    //判断是否要执行删除
    if (cart[index].num === 1 && operation === -1) {
      // wx.showModal({
      //   title: '提示',
      //   content: '您是否要删除？',
      //   success: (res) => {
      //     if (res.confirm) {
      //       cart.splice(index, 1);
      //       this.setDataCart(cart);
      //     } else if (res.cancel) {
      //       console.log('用户点击取消')
      //     }
      //   }
      // })

      const res = await showModal({
        content: '您是否要删除？'
      });
      if (res.confirm) {
        cart.splice(index, 1);
        this.setDataCart(cart);
      }
    } else {
      //进行数据修改
      cart[index].num += operation
      //设置回缓存和data中
      this.setDataCart(cart)
    }




  },

  //结算功能
  async handlepay() {
    //获取收获地址，判断有没有收获地址
    const {
      address,
      totalNum
    } = this.data
    if (!address.userName) {
      await showToast({
        title: "您还没有选择收获地址！"
      })
      return;
    }
    if (totalNum === 0) {
      await showToast({
        title: "您还没有购买商品！"
      })
      return;
    }
    //选择了收获地址，购买了商品，跳转到支付页面
    wx.navigateTo({
      url: '/pages/pay/index'
    })

  },


  setDataCart(cart) {
    //把购物车数据重新设置会data和缓存中
    let allChecked = true;
    //总价格，总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    })
    allChecked = cart.length != 0 ? allChecked : false;
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync("cart", cart);
  },


})



// wx.getSetting({
//   success: (result) => {
//     const scopeAddress = result.authSetting["scope.address"]
//     if (scopeAddress === true || scopeAddress === undefined) {
//       wx.chooseAddress({
//         success: (result1) => {
//           console.log(result1);
//         }
//       });
//     } else {
//       //如果是false拒绝，就引导用户打开设置
//       wx.openSetting({
//         success: (result3) => {
//           console.log(result3);
//         }
//       });
//     }
//   }
// });        
// );