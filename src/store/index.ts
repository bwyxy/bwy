import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate'
import user from './module/user'


export default createStore({
    state: {
    },
    mutations: {
    },
    actions: {
    },
    getters: {
    },
    modules: {
        user
    },
    plugins: [
        createPersistedstate({
          key: 'USERINFROM',
          paths: ['user']
        })
    ]
})