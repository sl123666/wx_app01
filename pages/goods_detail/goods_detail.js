// pages/goods_detail/goods_detail.js
import {request} from "../../request/index";
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		goods_id: null,
		goods_detail: {}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			goods_id: options.goods_id
		})
		this.getApidata();
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
	getApidata(){
		request({url: '/goods/detail', data:{goods_id: this.data.goods_id}}).then((res)=>{
			console.log(res);
			this.setData({
				goods_detail: res.data.message
			})
		})
	},
	//放大预览
	handlePreview(e){
		let index = e.currentTarget.dataset.index;
		let urls = [];
		this.data.goods_detail.pics.forEach((item)=>{
			urls.push(item.pics_mid);
		})
		wx.previewImage({
		  urls: urls,
		  current: urls[index]
		})
	},
	//加入购物车
	handleGouWuChe(){
		console.log("gouwuche");
		let cartList = wx.getStorageSync('cartList') || {};
		if(cartList[this.data.goods_id]){
			//购物车中商品已存在
			cartList[this.data.goods_id].num+=1;
		}else{
			//商品不存在
			cartList[this.data.goods_id] = {
				num: 1,
				goods_id: this.data.goods_id,
				goods_name: this.data.goods_detail.goods_name,
				goods_big_logo: this.data.goods_detail.goods_big_logo,
				goods_price: this.data.goods_detail.goods_price,
			};
		}
		wx.setStorage({
			data: cartList,
			key: 'cartList',
		});
		wx.showToast({
		  title: '加入成功',
		  mask: true,
		})
	}
})