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
//查询用户信息
export function getUser(param) {
    return httpRequest({
		url: '/api/user/'+param.userId,
		method: 'get',
	})
}
//校验二级密码

export function checkUser(param) {
    return httpRequest({
		url: '/api/sePassword/'+param.userId+'/'+param.sePassword,
		method: 'get',
	})
}
//设置二级密码
export function setUserPassword(param) {
    return httpRequest({
		url: '/api/sePassword/'+param.userId,
		method: 'post',
		data:param
	})
}
//修改二级密码
export function putUser(param) {
    return httpRequest({
		url: '/api/sePassword/'+param.userId,
		method: 'put',
		data:param
	})
}
//修改用户昵称
export function Modifynickname(param) {
    return httpRequest({
		url: '/api/name/'+param.userId,
		method: 'put',
		data:param,
	})
}
//修改登录密码

export function checkPassword(param) {
    return httpRequest({
		url: '/api/password/'+param.userId,
		method: 'put',
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
		url: '/api/downloads/'+param.userId+'/'+param.filePath,
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
//查询指定目录下的目录(文件)
export function getfile(param) {
    return httpRequest({
		url: '/api/contents/'+param.userId+'/'+param.belong,
		method: 'get',
	})
}
//放入回收站
export function recycler(param) {
    return httpRequest({
		url: '/api/recycler/'+param.recyclerList[0].userId,
		method: 'post',
		data:param,
	})
}
//查询回收站
export function getrecycler(param) {
    return httpRequest({
		url: '/api/recycler/'+param.userId,
		method: 'get',
	})
}
//还原文件
export function reduction(param) {
    return httpRequest({
		url: '/api/recycler/'+param.userId,
		method: 'put',
		data:param,
	})
}
//文件移动
export function movement(param) {
    return httpRequest({
		url: '/api/movement/'+param.userId,
		method: 'put',
		data:param,
	})
}
//文件校验
export function hash(param) {
    return httpRequest({
		url: '/api/hash/'+param.userId+"/"+param.hash,
		method: 'get',
	})
}
//批量下载
export function Downs(param) {
    return httpRequest({
		url: '/api/downloads/'+param.id,
		method: 'post',
		data:param,
	})
}
//文件彻底删除
export function deletes(param) {
    return httpRequest({
		url: '/api/recycler/'+param.userId,
		method: 'delete',
		data:param,
	})
}
//查询我的隐私列表
export function getMylist(param) {
    return httpRequest({
		url: '/api/collect/'+param.userId,
		method: 'get',
	})
}
//添至我的隐私
export function addMylist(param) {
    return httpRequest({
		url: '/api/collect/'+param.userId,
		method: 'post',
		data:param
	})
}
//还原出我的隐私
export function putMylist(param) {
    return httpRequest({
		url: '/api/collect/'+param.userId,
		method: 'put',
		data:param
	})
}