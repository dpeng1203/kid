<template>
    <div class="login">
        <img src="../../assets/img/login.jpg" alt="" class="img">
        <div class="box">
            <div class="tab">
                <span :class="{active: active == 1}" @click="active = 1">登录</span>
                <span :class="{active: active == 2}" @click="active = 2">注册</span>
            </div>
            <div class="login-cont" v-if="active == 1">
                <div class="input">
                    <!-- <input type="text" placeholder="用户名：4-14字符" v-model="name"> -->
                    <!-- <input type="password" placeholder="密码：6-20字符" v-model="password"> -->
                    <input type="number" pattern="[0-9]*" placeholder="手机号" v-model="phone">
                    <input type="number" pattern="[0-9]*" placeholder="输入验证码" v-model="loginCode">
                    <span v-show="!timeObj.canGet">{{timeObj.waitTime+"s后重新获取"}}</span>
                    <span @click="getCode" v-show="timeObj.canGet" class="code">获取验证码</span>
                </div>
                <!-- <p @click="$router.push('/resetPw')"> <span>忘记密码</span> </p> -->
                <div class="btn" @click="login">立即登陆</div>
                
            </div>
            <div class="login-cont" v-if="active == 2">
                <sign @memLogin='signed' :recCode='recCode'></sign>
            </div>
        </div>
        
    </div>
</template>

<script>
import { checkPhone,checkPassWord,checkCode,timeCountdown } from '../../utils'
import { Toast, Search } from 'vant'
import sign from './sign.vue'
import {loginCert,code} from '../../api/api'
export default {
    name: 'login',
    components: {
        sign
    },
    data() {
        return{
            active: 1,
            phone: '',
            password: '',
            recCode: '',
            loginCode: null,
            timeCountObj: { //倒计时临时对象
                canGet: true,
                timer: null,
                waitTime: 60
            },
        }
    },
    computed: {
        timeObj(){ //最终对象
            if(!this.timeCountObj.canGet){
                return timeCountdown(this.timeCountObj);
            }else{
                return this.timeCountObj;
            }
        }
    },
    methods: {
        login() {
            if(checkPhone(this.phone)) {
                let data = {
                    mobile: this.phone,
                    certNo: this.loginCode,
                }
                loginCert(data).then( res => {
                    if(res.resultCode === 1) {
                        localStorage.mToken = res.data.token
                        localStorage.phone = this.phone
                        localStorage.memId = res.data.member.memCode
                        this.$router.push('/videoList')
                    }
                })
            }
        },
        getCode() {
            if(checkPhone(this.phone)) {
                let data = {
                    mobile: this.phone,
                    type: 'login'
                }
                code(data).then(res => {
                    if(res.resultCode === 1) {
                        Toast('发送成功！')
                        //倒计时开始
                        timeCountdown(this.timeObj);  //参数为最终对象
                    }
                })
            }
        },
        signed() {
            this.active = 1
        },
        
    },
    mounted() {
        // if(localStorage.mToken && this.$route.query.memCode) {
        //     Toast('已注册用户,自动登录!')
        //     this.$router.push('/home')
        // }
        // if(this.$route.query.memCode && !localStorage.mToken) {
        //     this.active = 2
        //     this.recCode = this.$route.query.memCode
        // }
        if(localStorage.mToken) {
            this.$router.push('/videoList')
        }
    }

}
</script>

<style scoped lang="less">
@s: 0.0133rem;
.login{
    position: relative;
    .img{
        width: 100%;
        min-height: 100vh;
    }
    .box{
        border-radius: 30*@s;
        position: absolute;
        left: 40*@s;
        right: 40*@s;
        top: 420*@s;
        background: #fff;
        box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.02);
        margin-bottom: 100*@s;
    }
    .tab{
        font-size: 32*@s;
        font-family: 'STXihei';
        font-weight: bold;
        padding-top: 30*@s;
        text-align: center;
        span{
            color: #C9C9C9;
            display: inline-block;
            line-height: 1;
            padding-bottom: 20*@s;
            border-bottom: 1px solid #C9C9C9;
            width: 150*@s;
        }
        .active{
            color: #f08a5d;
            border-bottom: 1px solid #f08a5d;
        }
    }
    .login-cont{
        padding: 0 75*@s 80*@s;
        text-align: center;
        box-sizing: border-box;
        margin-top: 50*@s;
        .input{
            position: relative;
            input{
                width: 100%;
                margin-top: 20*@s;
                padding: 12*@s;
                border-bottom: 1px solid #E6E6E6;
                box-sizing: border-box;
                font-size: 32*@s;
            }
            span{
                position: absolute;
                right: 0;
                bottom: 15*@s;
                border: 1px solid #ccc;
                color: #ccc;
                padding: 0 10*@s;
                line-height: 40*@s;
                border-radius: 20*@s;
            }
            .code{
                color: #f08a5d;
                border: 1px solid #f08a5d;
            }
        }
        .btn{
            font-size: 24*@s;
            margin-top: 50*@s;
            display: inline-block;
            width: 220*@s;
            line-height: 60*@s;
            border-radius: 47*@s;
            background: #f08a5d;
            color: #fff;
        }
    }
}
</style>