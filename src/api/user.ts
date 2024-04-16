import axios from "../utils/request";

// 用户登录
export const userLogin = (data) => {
    return axios.post('/user/login' , data)
}
// 短信登陆
export const userPhoneLogin = (data) => {
    return axios.post('/user/phoneLogin' , data)
}
// 用户注册
export const userRegister = (data) => {
    return axios.post('/user/register' , data)
}
// 发送短信
export const sendCode = (data) => {
    return axios.post('/send/phoneCode' , data)
}
// 获取用户信息
export const userInfrom = () => {
    return axios.get('/user/infrom')
}
// 获取公钥
export const getPublicKeys = () => {
    return axios.get('/user/publicKeys')
}
// 解密
export const postDecrypt = (data) => {
    return axios.post('/fun/decrypt' , data)
} 