import axios from 'axios'
axios.defaults.baseURL = '/api'

type dataT = {
    code : Number,
    msg : any,
    data : any
}


axios.interceptors.request.use(
(config)=>{
    config.headers['token'] = localStorage.getItem('USER_TOKEN') || ''
	// 设置请求头
	return config
},
(err)=>{
	return Promise.reject(err)
});

axios.interceptors.response.use(
	(data)=>{
        // console.log(data)
		return data.data
	},
	(err)=>{
	
		return Promise.reject(err)
	})

export default axios