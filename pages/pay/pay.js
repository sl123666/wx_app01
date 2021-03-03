// pages/cart/cart.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		address: {},
		cartList: {},
		all_checked: false,
		allPrices: 0,
		allCheckedNum: 0
	},
	//获取收货地址
	bindHaveAddress(){
		console.log(666666);
		//获取权限状态
		wx.getSetting({
		    success: (result) => {
				console.log(result.authSetting);
				let scopeAddress = result.authSetting["scope.address"];
				if(scopeAddress==true || scopeAddress==undefined){//用户已授权或未操作过 直接获取收货地址
					wx.chooseAddress({
					    success: (res) => {
						  	console.log(res)
							wx.setStorage({
							  data: res,
							  key: 'address',
							})
					    },
					})
				}else{//用户曾经拒绝授权，要先引导用户授权
					wx.wx.openSetting({
					    success: (result) => {//授权成功后获取地址
							wx.chooseAddress({
								success: (res) => {
									console.log(res);
									wx.setStorage({
										data: res,
										key: 'address',
									  })
								},
							  })
					    }
					})
				}
		    },
		    fail: (res) => {},
		    complete: (res) => {},
		})
	},

	//计算选中商品数量&总价格
	calculation(cartList){
		let allPrices = 0,
		allCheckedNum = 0;
		for(let key in cartList){
			if(cartList[key].isChecked){
				allCheckedNum++;
				allPrices+=cartList[key].goods_price*cartList[key].num;
			}
		}
		this.setData({
			allCheckedNum,allPrices
		})
	},
	
	//点击 支付
	handlePay(){
	
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		
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
		let address = wx.getStorageSync('address');
		this.setData({address});
		let cartList = wx.getStorageSync('cartList');
		this.setData({
			cartList: cartList
		});
		this.calculation(cartList);
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

	}
})