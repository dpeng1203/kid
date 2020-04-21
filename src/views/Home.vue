<template>
    <div class="pay">
        <div class="pay-cont">
            <!-- <div class="logo">
                <img src="../assets/img/logo.jpg" alt="">
            </div> -->
            <div class="address">
                {{name}}
            </div>
            <div class="box">
                <div class="item" @click="show = true">
                    <span class="name">订单金额（元）</span>
                    <div  class="value plholder" v-if="!sum">请询问店员后输入</div>
                    <div  class="value" v-else>{{sum}}</div>
                    <div  class="like-input" v-if="show"></div>
                </div>
                <div class="item">
                    <span class="name">优惠后金额（元）</span>
                    <span  class="value">{{factSum}}</span>
                </div>
            </div>
            <div class="textrea"> 
                <img src="../assets/img/edit.png" alt="">
                <input type="number" pattern="[0-9]*" placeholder="请填写手机号" v-model="phone" @focus="show = false">
            </div>
            <div class="btn" @click="toPay" >和店员已确认，立即买单</div>
            
        </div>
        <van-number-keyboard
            :show="show"
            theme="custom"
            extra-key="."
            close-button-text="完成"
            :hide-on-click-outside="false"
            @blur="complete"
            @input="onInput"
            @delete="onDelete"
        />
    </div>
</template>

<script>
import { Toast,NumberKeyboard } from 'vant'
import {pay,merInfo} from '../api/api'
export default {
    name: 'pay',
    components: {
        [NumberKeyboard.name]: NumberKeyboard ,
    },
    data() {
        let self = this;
        return{
            sum: '',
            factSum: '',
            id: '4234343243',
            phone: '',
            lng: 0,
            lat: 0,
            show: true,    //数字键盘
            name: ''        //店主名称
        }
    },
    methods: {
        onInput(value) {
            this.sum = this.sum + value
            const reg = /^\d+\.?\d{0,2}$/
            if (!(reg.test(this.sum) || this.sum === '' )) {
                Toast('请输入正确金额,保留两位小数')
                this.sum = this.sum.slice(0,this.sum.length-1)
            }
            this.factSum = this.sum
        },
        onDelete() {
            this.sum = this.sum.slice(0,this.sum.length-1)
            this.factSum = this.sum
        },
        complete() {
            this.show = false
        },
        toPay() {
            this.show = false
            if(this.sum) {
              let data = {
                  sum: this.sum,
                  factSum: this.sum,
                  id: this.id,
                  lat: this.lat,
                  lng: this.lng,
              }
              pay(data).then(res => {
                if(res.resultCode == 1) {
                    window.location.href = res.msg
                    return false
                }
              })
            }else{
                Toast('请输入金额！')
            }
        },
        getMerInfo() {
            let data = {
                id: this.id,
            }
            merInfo(data).then(res => {
                if(res.resultCode == 1) {
                    this.name = res.data
                }
            })
        }
    },
    mounted() {
        this.id = this.$route.query.id
        this.getMerInfo()
    }

}
</script>

<style scoped lang="less">
@s: 0.0133rem;
.pay{
    position: relative;
    padding: 0 20*@s;
    background: #fff;
    .pay-cont{
        .address{
            height: 100*@s;
            line-height: 100*@s;
            text-align: center;
            color: #808080;
        }
        .box{
            border: 1px solid #BFBFBF;
            border-radius:10*@s;
            padding: 0 30*@s;
            .item{
                display: flex;
                align-items: center;
                border-bottom: 1px solid #ccc; 
                font-size: 28*@s;
                line-height: 105*@s;
                position: relative;
                .name{
                    margin-left: 10*@s;
                }
                .value{
                    flex: 1;
                    text-align: right;
                    margin-right: 2*@s;
                }
                .plholder{
                    color: #ccc;
                }
                .like-input{
                    position: absolute;
                    right: 0;
                    top: 36*@s;
                    width: 1px;
                    height: 30*@s;
                    background: #444;
                    animation: flick 1s infinite;
                    -moz-animation: flick 1s infinite;	/* Firefox */
                    -webkit-animation: flick 1s infinite;	/* Safari 和 Chrome */
                    -o-animation: flick 1s infinite;	/* Opera */
                }
            }
            :last-child{
                border-bottom: none;
            }
        }
        .textrea{
            margin-top: 20*@s;
            display: flex;
            align-items: center;
            img{
                width: 24*@s;
                height: 24*@s;
            }
            
            input{
                flex: 1;
                font-size: 24*@s;
                line-height: 31*@s;
                padding: 10*@s;
                margin-left: 10*@s;
                border: none;
            }
            input:focus{
              outline:none;
            }
        }
        .btn{
            display: block;
            width: 660*@s;
            margin: 0 auto;
            margin-top: 200*@s;
            line-height: 88*@s;
            background: #ED0C17;
            border-radius: 12*@s;
            text-align: center;
            font-size: 30*@s;
            color: #fff;
        }
    }
    @keyframes flick {
        0% { opacity: 0; } 
        40% { opacity: 0; } 
        50% { opacity: 1; } 
        100% { opacity: 1; } 
    }
    @-moz-keyframes flick {
        0% { opacity: 0; } 
        40% { opacity: 0; } 
        50% { opacity: 1; } 
        100% { opacity: 1; } 
    }
    @-webkit-keyframes flick {
        0% { opacity: 0; } 
        40% { opacity: 0; } 
        50% { opacity: 1; } 
        100% { opacity: 1; } 
    }
    @-o-keyframes flick {
        0% { opacity: 0; } 
        40% { opacity: 0; } 
        50% { opacity: 1; } 
        100% { opacity: 1; } 
    }
        
}
</style>

