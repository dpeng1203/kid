<template>
    <div class="sign">
        <div class="login-cont">
            <div class="input">
                <input type="text" placeholder="宝宝姓名" v-model="name">
                <input type="number" pattern="[0-9]*" placeholder="宝宝年龄" v-model="memAge">
                <input type="number" pattern="[0-9]*" placeholder="手机号" v-model="phone">
                <input type="number" pattern="[0-9]*" placeholder="输入验证码" v-model="code">
                <span v-show="!timeObj.canGet">{{timeObj.waitTime+"s后重新获取"}}</span>
                <span @click="getCode" v-show="timeObj.canGet" class="code">获取验证码</span>
            </div>
            <div class="btn" @click="toSign">立即注册</div>
        </div>
    </div>
</template>

<script>
import { checkUserName,checkPhone,checkPassWord,checkCode,timeCountdown } from '../../utils'
import { Toast } from 'vant'
import {sign,signQr,code} from '../../api/api'
export default {
    name: 'sign',
    props: {
        recCode: [Number,String]
    },
    data() {
        return{
            name: '',
            memAge: null,
            password: '',
            phone: '',
            code: '',
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
                    type: 'register'
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
        toSign() {
            if(checkPhone(this.phone)) {
                if(this.recCode) {
                    let data = {
                        memName: this.name,
                        memMobile: this.phone,
                        verifyCode: this.code,
                        memAge: this.memAge,
                        pMemCode: this.recCode
                    }
                    signQr(data).then( res => {
                        if(res.resultCode === 1) {
                            Toast('注册成功！')
                            // this.$router.push('/')
                            this.$emit('memLogin',1)
                        }
                    })
                }else{
                    let data = {
                        memName: this.name,
                        memMobile: this.phone,
                        verifyCode: this.code,
                        memAge: this.memAge,

                    }
                    sign(data).then( res => {
                        if(res.resultCode === 1) {
                            Toast('注册成功！')
                            // this.$router.push('/')
                            this.$emit('memLogin',1)
                        }
                    })
                }
                
            }
            
        }
    }

}
</script>

<style scoped lang="less">
@s: 0.0133rem;
.sign{
    .login-cont{
        text-align: center;
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