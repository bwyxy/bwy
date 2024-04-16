import axios from "../utils/request";

// 获取标签
export const getLabel = () => {
    return axios.get('/froum/label')
}
// 获取论坛
export const getFroumList = (data) => {
    return axios.post('/froum/list' , data)
}
// 发表圈子
export const submitFroum = (data:any) => {
    return axios.post('/froum/add' , data)
}