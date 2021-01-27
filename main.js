import Vue from 'vue'
import App from './App'
import './static/css/common.css'
import myRequest from './common/api.js'

Vue.prototype.myRequest = myRequest;

Vue.prototype.checkLogin = function() {
	return !!uni.getStorageSync('token')
}

Vue.prototype.interceptLogin = function({
	route
} = {}) {
	this.myRequest("/merchant-staff-account/heart-beat", {
		access_token: uni.getStorageSync('token')
	}, "POST").then(res => {
		// console.log(res)
		if (res.data.status !== 200 || !uni.getStorageSync('token')) {
			uni.showToast({
				icon:"none",
				title: "请重新登陆",
			})
			setTimeout(function() {
				uni.navigateTo({
					url: "/pages/login/xiaocong-login/login/login"
				})
			}, 500);
		} else {
			uni.navigateTo({
				url: route
			})
		}
	})
}


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
