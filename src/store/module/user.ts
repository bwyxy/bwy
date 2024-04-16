import {userInfrom} from '../../api/user.ts'

export default {
    namespaced: true,
    state() {
        return {
            token : '',
            infrom : {}
        }
    },
    mutations:{
        setToken : (state:any,value:any) => {
            state.token = value
        },
        setUserInfrom : (state:any,value:any) => {
            state.infrom = value
        }
    },
    actions: {
        // 获取用户信息
        async getUserInfrom ({commit}) {
            let infrom:any = await userInfrom()
            if(infrom.code == 200) {
                commit('setUserInfrom' , infrom.data)
            }
        }
    }
}