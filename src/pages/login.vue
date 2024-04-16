<template>
  <div class="login">
        <div class="login-head" v-show="!LoginFrom.isRegister">
            <img src="../assets/image/head.png" alt="">
            <span>无名氏</span>
        </div>
        <div class="login-content">
            <div class="login-content-loginPanel" v-show="!LoginFrom.isRegister">
                <div class="login-checkout">
                    <div class="login-checkout-text" @click="LoginFrom.isPhone = false">
                        <span :style="{color : !LoginFrom.isPhone?'#00a8ff':'#000'}">账号密码登录</span>
                        <div class="login-checkout-text-line" v-show="!LoginFrom.isPhone"></div>
                    </div>
                    <div class="login-checkout-text" @click="LoginFrom.isPhone = true">
                        <span :style="{color : LoginFrom.isPhone?'#00a8ff':'#000'}">手机短信登录</span>
                        <div class="login-checkout-text-line" v-show="LoginFrom.isPhone"></div>
                    </div>
                </div>
                <div class="login-content-account" v-show="!LoginFrom.isPhone">
                    <input type="text" v-model="LoginFrom.account" placeholder="请输入账号或手机号">
                </div>
                <div class="login-content-account" v-show="LoginFrom.isPhone">
                    <input type="text" v-model="LoginFrom.telphone" placeholder="请输入手机号">
                </div>
                <div class="login-content-password" v-show="!LoginFrom.isPhone">
                    <input type="password" v-model="LoginFrom.password" placeholder="请输入密码">
                </div>
                <div class="login-content-code" v-show="LoginFrom.isPhone">
                    <input type="password" placeholder="验证码">
                    <div class="login-content-code-button" @click="sendPhoneCode('login')">{{ LoginFrom.codeText }}</div>
                </div>
                <div class="login-content-fun" v-show="!LoginFrom.isPhone">
                    <div class="remember-password">
                        <el-checkbox size="small" v-model="LoginFrom.isRememberPassword" label="记住密码" />
                    </div>
                    <div class="register" @click="LoginFrom.isRegister = true">立即注册</div>
                </div>
                <div :style="{marginTop: LoginFrom.isPhone?'calc( 1.667vw * 2 + 28px )':'1.667vw'}" class="login-content-submitLogin" @click="submitLogin">登录</div>
            </div>
            <div class="login-content-registerPanel" v-show="LoginFrom.isRegister">
                <div class="login-checkout-texts">
                    <span>注册</span>
                </div>
                <div class="login-content-account">
                    <input type="text" v-model="registerFrom.telphone" placeholder="手机号">
                </div>
                <div class="login-content-password">
                    <input type="password" v-model="registerFrom.password" placeholder="请输入密码">
                </div>
                <div class="login-content-code">
                    <input type="password" v-model="registerFrom.code" placeholder="验证码">
                    <div class="login-content-code-button" @click="sendPhoneCode('register')">{{ registerFrom.codeText }}</div>
                </div>
                <div class="login-content-text" @click="LoginFrom.isRegister = false">
                    已有账号, 去登录
                </div>
                <div class="login-content-submitRegister" @click="register">注册</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted , ref } from 'vue'
import {useRouter} from 'vue-router'
import { getPublicKeys,userLogin,sendCode,userPhoneLogin,userRegister,postDecrypt } from '../api/user';
import { ElMessage } from 'element-plus'
import JSEncrypt from 'jsencrypt'
import {useStore} from 'vuex'
import {isPhone} from '../utils/verify'
const {commit,dispatch} = useStore()
const router = useRouter()

let publicKey = ref('')
let LoginFrom = ref({
    account : '',
    password : '',
    telphone : '',
    code : '',
    codeTime : 60,
    codeText : '发送验证码',
    isPhone : false,
    isRegister : false,
    isRememberPassword : false
})

let registerFrom = ref({
    telphone : '',
    password : '',
    code : '',
    codeText : '发送验证码',
    codeTime : 60
})
// 登录
const submitLogin : any = () => {
    if(LoginFrom.value.isPhone) {
        phoneLogin()
        return
    }
    let {account,password} = LoginFrom.value
    console.log(password)
    if(!account) return ElMessage.error('请输入账号或手机号');
    if(!password) return ElMessage.error('请输入密码');
    let jsencrypt = new JSEncrypt()
    jsencrypt.setPublicKey(publicKey.value)
    let passwordKey : any = ''
    // 是否记住密码
    if(LoginFrom.value.isRememberPassword) {
        passwordKey = jsencrypt.encrypt(password)
        localStorage.setItem('USERACCOUNT_INFROM' , JSON.stringify({
            account,
            password : passwordKey,
            isRememberPassword : LoginFrom.value.isRememberPassword
        }))
    } else {
        passwordKey = jsencrypt.encrypt(password) 
        localStorage.setItem('USERACCOUNT_INFROM' , JSON.stringify({}))
    }
    userLogin({
        username : account,
        password : passwordKey
    }).then((res:any) => {
        if(res.code == 200) {
            ElMessage.success('登录成功')
            let userInfrom:any = res.data
            localStorage.setItem('USER_TOKEN' , userInfrom.token)
            commit('user/setToken' , userInfrom.token)
            dispatch('user/getUserInfrom')
            let times = setTimeout(() => {
                router.push({
                    path : '/'
                })
                clearTimeout(times)
            },500)
        }else {
            ElMessage.error(res.msg)
        }
    })
}
// 短信登录
const phoneLogin : any = () => {
    let {telphone,code} = LoginFrom.value
    if(!telphone) return ElMessage.error('请输入手机号');
    if(!isPhone(telphone)) return ElMessage.error('请输入正确的手机号');
    if(!code) return ElMessage.error('请输入验证码');
    userPhoneLogin({
        telphone,
        code
    }).then((res:any) => {
        if(res.code == 200) {
            ElMessage.success('登录成功')
            let userInfrom:any = res.data
            localStorage.setItem('USER_TOKEN' , userInfrom.token)
            commit('user/setToken' , userInfrom.token)
            dispatch('user/getUserInfrom')
        }else {
            ElMessage.error(res.msg)
        }
    })
}
// 注册
const register : any = () => {
    let {telphone,password,code} = registerFrom.value
    if(!telphone) return ElMessage.error('请输入手机号');
    if(!isPhone(telphone)) return ElMessage.error('请输入正确的手机号');
    if(!password) return ElMessage.error('请输入密码');
    if(!code) return ElMessage.error('请输入验证码');
    userRegister({
        telphone,
        password,
        code
    }).then((res:any) => {
        if(res.code == 200) {
            ElMessage.success('注册成功')
            registerFrom.value.telphone = ''
            registerFrom.value.password = ''
            registerFrom.value.code = ''
            LoginFrom.value.isRegister = false
        }else {
            ElMessage.error(res.msg)
        }
    })
}

// 发送验证码
const sendPhoneCode : any = (type:String) => {
    let {telphone} = type == 'login' ? LoginFrom.value : registerFrom.value
    if(type == 'login') {
        if(LoginFrom.value.codeTime !== 60) return ElMessage.warning('请稍等');
    }else {
        if(registerFrom.value.codeTime !== 60) return ElMessage.warning('请稍等');
    }
    if(!telphone) return ElMessage.error('请输入手机号');
    if(!isPhone(telphone)) return ElMessage.error('请输入正确的手机号');
    sendCode({
        telphone,
        type
    }).then((res:any) => {
        if(res.code == 200) {
            if(type == 'login') {
                ElMessage.success('发送成功，请注意接收')
                --LoginFrom.value.codeTime
                LoginFrom.value.codeText = LoginFrom.value.codeTime + '后重新发送'
                let times:any = setInterval(() => {
                    if(LoginFrom.value.codeTime <= 0) {
                        LoginFrom.value.codeText = '发送验证码'
                        LoginFrom.value.codeTime = 60
                        clearInterval(times)
                    }else {
                        --LoginFrom.value.codeTime
                        LoginFrom.value.codeText = LoginFrom.value.codeTime + '后重新发送'
                    }
                },1000)
            }else {
                ElMessage.success('发送成功，请注意接收')
                --registerFrom.value.codeTime
                registerFrom.value.codeText = registerFrom.value.codeTime + '后重新发送'
                let times:any = setInterval(() => {
                    if(registerFrom.value.codeTime <= 0) {
                        registerFrom.value.codeText = '发送验证码'
                        registerFrom.value.codeTime = 60
                        clearInterval(times)
                    }else {
                        --registerFrom.value.codeTime
                        registerFrom.value.codeText = registerFrom.value.codeTime + '后重新发送'
                    }
                },1000)
            }
        }
    })
}

// 获取公钥
const getPublicKey : any = () => {
    getPublicKeys().then((res:any) => {
        if(res.code == 200) {
            publicKey.value = res.publicKey
        }
    })
}

onMounted(() => {
    getPublicKey()
    // 获取用户是否记住密码
    let userPassword:any = localStorage.getItem('USERACCOUNT_INFROM')
    if(userPassword && userPassword !== '{}') {
        let datas = JSON.parse(userPassword)
        postDecrypt({
            keys : datas.password
        }).then((res:any) => {
            if(res.code == 200) {
                LoginFrom.value.account = datas.account
                LoginFrom.value.password = res.data,
                LoginFrom.value.isRememberPassword = true
            }
        })
    }
})
</script>

<style lang="scss" scoped>
.login {
    width: 100vw;
    height: 100vh;
    background: url(../assets/image/260.jpeg) no-repeat center center;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &-head {
        width: 3.646vw;
        height: 3.646vw;
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
        span {
            display: inline-block;
            font-size: 0.833vw;
            color: #333;
            font-weight: 550;
            letter-spacing: 1px;
            margin: 0.521vw 0;
        }
    }
    &-content {
        width: 31.25vw;
        min-height: 19.792vw;
        backdrop-filter: blur(16px) saturate(180%);
        -webkit-backdrop-filter: blur(16px) saturate(180%);
        background-color: rgba(255, 255, 255, .1);
        border-radius: 12px;
        border: 2px solid rgba(255, 255, 255, 0.2);
        margin-top: 36px;
        &-loginPanel{
            width: 31.25vw;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        &-account{
            width: 80%;
            height: 3.125vw;
            backdrop-filter: blur(16px) saturate(180%);
            -webkit-backdrop-filter: blur(16px) saturate(180%);
            background-color: rgba(255, 255, 255, .1);
            border-radius: 4px;
            border: 2px solid rgba(255, 255, 255, 0.2);
            margin: 0 auto;
            margin-top: 1.667vw;
            input {
                width: 100%;
                font-size: 0.833vw;
                box-sizing: border-box;
                padding: 0 0.833vw;
            }
        }
        &-password {
            width: 80%;
            height: 3.125vw;
            backdrop-filter: blur(16px) saturate(180%);
            -webkit-backdrop-filter: blur(16px) saturate(180%);
            background-color: rgba(255, 255, 255, .01);
            border-radius: 4px;
            border: 2px solid rgba(255, 255, 255, 0.2);
            margin: 0 auto;
            margin-top: 1.667vw;
            input {
                width: 100%;
                box-sizing: border-box;
                font-size: 0.833vw;
                padding: 0 0.833vw;
            }
        }
        &-code{
            width: 80%;
            height: 3.125vw;
            margin: 0 auto;
            margin-top: 1.667vw;
            display: flex;
            align-items: center;
            input {
                width: 100%;
                font-size: 0.833vw;
                box-sizing: border-box;
                padding: 0 0.833vw;
                backdrop-filter: blur(16px) saturate(180%);
                -webkit-backdrop-filter: blur(16px) saturate(180%);
                background-color: rgba(255, 255, 255, .01);
                border-radius: 4px;
                border: 2px solid rgba(255, 255, 255, 0.2);
            }
            &-button {
                width: 14.583vw;
                height: 100%;
                background: #00a8ff;
                border-radius: 4px;
                margin-left: 1.25vw;
                color: #fff;
                font-size:0.833vw;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
            }
        }
        &-fun {
            width: 80%;
            display: flex;
            align-items: center;
            margin: 0 auto;
            margin-top: 1.667vw;
        }
        &-text {
            width: 80%;
            color: #00a8ff;
            cursor: pointer;
            margin: 0 auto;
            margin-top: 1.667vw;
            text-align: right;
            text-decoration: underline;
        }
        &-submitLogin {
            width: 80%;
            height: 3.125vw;
            font-size: 1.25vw;
            color: #fff;
            background: #00a8ff;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 1.667vw;
            margin-bottom: 2.083vw;
        }
        &-submitRegister{
            width: 80%;
            height: 3.125vw;
            font-size: 1.25vw;
            color: #fff;
            background: #00a8ff;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            letter-spacing: 1px;
            cursor: pointer;
            margin-top: 1.667vw;
            margin-bottom: 2.083vw;
        }
        &-registerPanel {
            width: 31.25vw;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
    }
}

.remember-password{
    height: 100%;
    display: flex;
    align-items: center;
    color: #333;
    margin-right: auto;
    color: #fff;
    &-checkout{
        width: 0.833vw;
        height: 0.833vw;
        border: 1px solid #dadada;
        border-radius: 2px;
        margin-right: 8px;
        background: #00a8ff;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    cursor: pointer;
}

.remember-active {
    color: #00a8ff;
}
.remember-checkout-active {
    background: #00a8ff;
    color: #fff;
}
.rememberIcon{
    color: #fff;
    display: none;
}
.register{
    color: #00a8ff;
    text-decoration: underline;
    cursor: pointer;
}
.login-checkout{
    width: 100%;
    height: 3.125vw;
    display: flex;
    align-items: center;
    &-text {
        font-size: 1.042vw;
        letter-spacing: 1px;
        cursor: pointer;
        font-weight: 530;
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        &-line {
            width: 10%;
            height: 4px;
            background: #00a8ff;
            position: absolute;
            bottom: 0;
            border-radius: 50px;
        }
    }
    &-texts {
        font-size: 1.458vw;
        font-weight: 550;
        letter-spacing: 1px;
        margin-top: 1.667vw;
    }
}
</style>