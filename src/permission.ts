import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import router from './router'
import store from './store'

let documents:any = document

router.beforeEach(async (to:RouteLocationNormalized,from:RouteLocationNormalized,next:NavigationGuardNext) => {
    let userToken:any = store.state || {}
    if(userToken.user.token) {
        documents.title = to.meta.title
        next()
    }else {
        console.log('未登录' , to)
        documents.title = to.meta.title
        if(to.path == '/login') {
            next()
        }else {
            next('/login')
        }
    }
})

export default router