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

	//全选按钮
	allCheck(){
		this.data.all_checked = !this.data.all_checked;
		let cartList = this.data.cartList;
		if(this.data.all_checked){
			for(let item in cartList){
				cartList[item].isChecked = true;
			}
		}else{
			for(let item in cartList){
				cartList[item].isChecked = false;
			}
		}
		this.setData({
			cartList: cartList
		})
		wx.setStorage({
			data: cartList,
			key: 'cartList',
		})
		this.calculation(cartList);
	},
	//单独选项按钮
	isCheck(e){
		let key = e.currentTarget.dataset.key,
		cartList = this.data.cartList;
		cartList[key].isChecked = !cartList[key].isChecked;
		this.fix_all_checked(cartList);
		this.setData({
			cartList: cartList
		});
		wx.setStorage({
		  data: cartList,
		  key: 'cartList',
		})
		this.calculation(cartList);
	},

	//购买数量 减
	reduce(e){
		let key = e.currentTarget.dataset.key;
		let cartList = this.data.cartList;
		let _this = this
		if(cartList[key].num == 1){
			wx.showModal({
				content: '确定要删除该商品吗？',
				confirmColor: "#f00",
				success (res) {
				    if (res.confirm) {
						console.log('用户点击确定');
						if(Reflect.has(cartList, key)){
					　　	Reflect.deleteProperty(cartList, key);
						}
						console.log(cartList);
						_this.fixCartList(cartList);
				    }
				}
			})
		}else{
			cartList[key].num--;
			this.fixCartList(cartList);
		}
	},
	//购买数量加
	add(e){
		let key = e.currentTarget.dataset.key;
		let cartList = this.data.cartList;
		cartList[key].num++;
		this.fixCartList(cartList);
	},
	fixCartList(cartList){
		this.setData({
			cartList
		});
		wx.setStorage({
			data: cartList,
			key: 'cartList',
		});
		this.calculation(cartList)
	},
	
	//点击结算  去支付
	handlePay(){
		if(!this.data.address.userName){
			wx.showToast({
				title: '请先获取收货人地址信息！',
				icon: 'none',
				mask: true
			})
			return;
		}
		if(!this.data.allCheckedNum){
			wx.showToast({
				title: '请先选择要支付的商品！',
				icon: 'none',
				mask: true
			})
			return;
		}
		let cartList = this.data.cartList;
		let payList = {};
		for(let key in cartList){
			if(cartList[key].isChecked){
				payList[key] = cartList[key];
			}
		};
		wx.setStorage({
		  data: payList,
		  key: 'payList',
		});
		wx.navigateTo({
		  url: '/pages/pay/pay',
		});
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
		this.fix_all_checked(cartList);
		this.setData({
			cartList: cartList
		});
		this.calculation(cartList);
	},
	fix_all_checked(cartList){
		let all_checked = true;
		for(let item in cartList){
			if(!cartList[item].isChecked){
				all_checked = false;
			}
		}
		this.setData({
			all_checked: all_checked
		});
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