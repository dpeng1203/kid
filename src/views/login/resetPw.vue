<template>
    <div class="login">
        <img src="../../assets/img/login_logo.png" alt="">
        <div class="box">
            <div class="tab">
                <span>忘记密码</span>
            </div>
            <div class="login-cont">
                <div class="input">
                    <input type="number" pattern="[0-9]*" placeholder="已注册手机号" v-model="phone">
                    <input type="number" pattern="[0-9]*" placeholder="输入验证码" v-model="code">
                    <span v-show="!timeObj.canGet">{{timeObj.waitTime+"s后重新获取"}}</span>
                    <span @click="getCode" v-show="timeObj.canGet" class="code">获取验证码</span>
                    <input type="password" placeholder="输入新密码" v-model="pw">
                    <input type="password" placeholder="重复密码" v-model="newPw">
                </div>
                <div class="btn" @click="changePw">完成</div>
            </div>
        </div>
        
    </div>
</template>

<script>
import { checkPhone,checkPassWord,checkCode,timeCountdown } from '../../utils'
import { Toast } from 'vant'
import {code,resetPw} from '../../api/api'
export default {
    name: 'resetPw',
    data() {
        return{
            phone: '',
            code: '',
            pw: '',
            newPw: '',
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
        getCode() {
            if(checkPhone(this.phone)) {
                let data = {
                    mobile: this.phone,
                    type: 'findpwd'
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
        changePw() {
            if(checkPhone(this.phone) && checkPassWord(this.pw)) {
                if(this.newPw !== this.pw) {
                    Toast('两次输入密码不一致！')
                    return
                }else {
                    let data = {
                        mobile: this.phone,
                        verifyCode: this.code,
                        pwd: this.newPw
                    }
                    resetPw(data).then( res => {
                        if(res.resultCode === 1) {
                            Toast('密码修改成功！')
                            this.$router.push('/')
                        }
                    })
                }
            }
        },
        
    }

}
</script>

<style scoped lang="less">
@s: 0.0133rem;
.login{
    // height: calc(100vh);
    // background: #fff;
    .box{
        width: 578*@s;
        border-radius: 30*@s;
        position: absolute;
        left: 85*@s;
        top: 548*@s;
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
            color: #00b616;
            display: inline-block;
            line-height: 1;
            padding-bottom: 20*@s;
            border-bottom: 1px solid #00b616;
            width: 180*@s;
        }
    }
    
    .login-cont{
        padding: 0 75*@s 80*@s;
        text-align: center;
        .input{
            padding-top: 50*@s;
            position: relative;
            input{
                width: 100%;
                margin-top: 30*@s;
                padding: 12*@s;
                border-bottom: 1px solid #ccc;
                box-sizing: border-box;
                font-size: 32*@s;
            }
            span{
                position: absolute;
                right: 0;
                bottom: 320*@s;
                border: 1px solid #ccc;
                color: #ccc;
                padding: 0 10*@s;
                line-height: 40*@s;
                border-radius: 20*@s;
            }
            .code{
                color: #00b616;
                border: 1px solid #00b616;
            }
        }
        .btn{
            font-size: 24*@s;
            margin-top: 50*@s;
            display: inline-block;
            width: 220*@s;
            line-height: 60*@s;
            border-radius: 47*@s;
            background: #81CF9B;
            color: #fff;
        }
    }
}
</style>