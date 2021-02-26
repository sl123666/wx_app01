// pages/category/category.js
import {request} from "../../request/index"
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		categoryList: [],
		currentIndex: 0,
		scrollTop:0,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let cates = wx.getStorageSync('cates');
		if(!cates){//没有缓存
			this.getCateGoryList();
		}else{//有缓存
			if(Date.now()-cates.time>1000*10){//过期
				this.getCateGoryList();
			}else{
				this.setData({
					categoryList: cates.data
				})
			}
		}
		
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
	getCateGoryList(){
		request({url: '/categories'}).then((result)=>{
			wx.setStorage({
			  data: {
				  time: Date.now(),
				  data: result.data.message
			  },
			  key: 'cates',
			})
			this.setData({
				categoryList: result.data.message
			})
		})
	},
	handleItem(e){
		console.log(e);
		this.setData({
			currentIndex: e.target.dataset.index
		})
		this.setData({
			scrollTop:0
		})
	}
})