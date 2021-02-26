import {request} from "../../request/index"

wx-Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    cateList: [],
    floorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.request({
    //   url: 'http://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   method: 'GET',
    //   success: (result) => {
    //     console.log(result.data);
    //     this.setData({
    //       swiperList: result.data.message
    //     })
    //   },
    //   fail: (res) => {},
    //   complete: (res) => {},//成功或失败都会调研
    // })
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  //获取轮播图数据
  getSwiperList(){
    request({url: '/home/swiperdata'}).then((result)=>{
      this.setData({
        swiperList: result.data.message
      })
    })
  },
  //获取导航数据
  getCateList(){
    request({url: '/home/catitems'}).then((result)=>{
      this.setData({
        cateList: result.data.message
      })
    })
  },
  //获取楼层数据
  getFloorList(){
    request({url: '/home/floordata'}).then((result)=>{
      this.setData({
        floorList: result.data.message
      })
    })
  }
})

