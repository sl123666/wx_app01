// components/tabs/tabs.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		tabs:{
			type: Array,
			value: []
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		currentIndex:0
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		handleTap(e){
			this.setData({
				currentIndex: e.target.dataset.index
			});
			//触发父组件的事件，相当于vue的$emit(),父组件用bind+事件名接收
			this.triggerEvent('tabHandle', {index: e.target.dataset.index});
		}
	}
})
