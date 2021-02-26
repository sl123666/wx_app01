let requestIndex = 0;//请求次数

export const request = (parms)=>{
	//处理连续请求加载中提示的问题（一个请求完成就会关闭加载中提示，影响后边的请求）
	requestIndex++;

	//正在加载提示
	wx.showLoading({
		title: '加载中',
		mask: true
	});
	return new Promise((resolve, reject)=>{
		let public_url = 'http://api-hmugo-web.itheima.net/api/public/v1'
		wx.request({
			...parms,
			url: public_url + parms.url,
			success:(result)=>{
				resolve(result);
			},
			fail:(err)=>{
				reject(err);
			},
			complete:()=>{
				requestIndex--;
				if(requestIndex == 0){
					//关闭加载中提示
					wx.hideLoading();
				}
				
			}
		})
	});
}
	
