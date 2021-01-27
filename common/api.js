const baseUrl = 'https://api.juleikeji.com'

const request = (url = '', date = {}, type = 'GET') => {
	var token = uni.getStorageSync('token');
	var header = {
		'content-type': 'application/x-www-form-urlencoded',
	}
	if (token) {
		header.Authorization = 'Bearer ' + token
	}
	// console.log(token)
	return new Promise((resolve, reject) => {
		uni.request({
			method: type,
			url: baseUrl + url,
			data: date,
			header: header,
			dataType: 'json',
		}).then((response) => {
			let [error, res] = response;
			resolve(res);
		}).catch(error => {
			let [err, res] = error;
			reject(err)
		})
	});
}
export default request
