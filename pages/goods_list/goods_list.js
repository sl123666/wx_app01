// pages/goods_list/goods_list.js
import {request} from "../../request/index"
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		tabsList:[
			{
				id:0,
				name:'综合'
			},
			{
				id:1,
				name:'销量'
			},
			{
				id:2,
				name:'价格'
			}
		],
		goodsList:[]
	},
	allPageNum: null,//总页数
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log(options);
		this.parmsData.cid = options.cid;
		this.getGoodsList();
	},
	tabHandle(e){
		console.log(666, e);
		let index = e.detail.index;
	},
	parmsData:{//请求参数
		cid: null,
		query: '',   //关键字
		pagenum: 1,  //页码
		pagesize: 10   //页码容量

	},
	//获取商品列表
	getGoodsList(){
		request({url: "/goods/search", data: this.parmsData}).then((result)=>{
			this.allPageNum = Math.ceil(result.data.message.total/10);
			this.setData({
				goodsList: [...this.data.goodsList, ...result.data.message.goods]
			})
			//关闭下拉刷新效果
			wx.stopPullDownRefresh();
		})
	},

	//上拉加载事件，默认方法名
	onReachBottom(){
		console.log(this.allPageNum);
		if(this.parmsData.pagenum<this.allPageNum){
			this.parmsData.pagenum+=1;
			this.getGoodsList();
		}else{
			wx.showToast({
			  title: '我是有底线的！',
			  icon: 'none',
			});
		}
	},
	//下拉刷新事件，默认方法名
	onPullDownRefresh(){
		this.setData({
			goodsList: []
		});
		this.parmsData.pagenum = 1;
		this.getGoodsList();
	}
})