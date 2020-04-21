<template>
    <div class="pay-success">
        <div class="pay-cont">
            <div class="img-wrapper">
                <img src="../assets/img/success.png" alt="">
            </div>
            <div class="money">订单支付成功 </div>
        </div>
    </div>
</template>

<script>
import { setInterval } from 'timers';
export default {
    name: 'paySuccess',
    data() {
        return{
            
        }
    },
    methods: {
        
    },
    mounted() {
        
    }

}
</script>

<style scoped lang="less">
@s: 0.0133rem;
.pay-success{
    .pay-cont{
        height: calc(100vh);
        padding: 0 20*@s;
        text-align: center;
        background: #fff;
        .img-wrapper{
            padding-top: 320*@s;
            img{
                width: 302*@s;
            }
        }
        .money{
           margin-top: 35*@s;
            font-size: 36*@s;
            font-weight: bold;
            color: #333333;
        }
    }
}
</style>