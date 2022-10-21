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
//下载(文件流)
export function download(param) {
    return httpRequest({
		url: '/api/download/'+param.id+'/'+param.filePath,
		method: 'get',
		responseType:'blob'
	})
}
//下载(url地址)
export function downloads(param) {
    return httpRequest({
		url: '/api/downloads/'+param.id+'/'+param.fileName,
		method: 'get',
	})
}
//取消上传
export function endUpload(param) {
    return httpRequest({
		url: '/api/endUpload/'+param.id,
		method: 'post',
		data:param,
		responseType:'application/octet-stream'
	})
}
//查询用户
export function file(param) {
    return httpRequest({
		url: '/api/file/'+param.id,
		method: 'get',
	})
}
//新建文件夹
export function addfolder(param) {
    return httpRequest({
		url: '/api/folder/'+param.id,
		method: 'post',
		data:param,
	})
}
//修改文件名
export function rename(param) {
    return httpRequest({
		url: '/api/rename/'+param.id,
		method: 'put',
		data:param,
	})
}