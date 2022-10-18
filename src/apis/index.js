import httpRequest from '../request/index'

// 登录
export function userlogin(param) {
    return httpRequest({
		url: '/api/login/'+param.username+'/'+param.password,
		method: 'get',
	})
}
//注册
export function userregister(param) {
    return httpRequest({
		url: '/api/login',
		method: 'post',
		data:param,
	})
}
//上传
export function upload(param) {
    return httpRequest({
		url: '/api/upload/'+param.id,
		method: 'post',
		data:param,
	})
}
//下载
export function download(param) {
    return httpRequest({
		url: '/api/download/'+param.id+'/'+param.filePath,
		method: 'get',
		responseType:'blob'
	})
}