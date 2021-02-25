export const request = (parms)=>{
		return new Promise((resolve, reject)=>{
			wx.request({
			...parms,
			success:(result)=>{
				resolve(result);
			},
			fail:(err)=>{
				reject(err);
			}
			})
		});
	}
	
