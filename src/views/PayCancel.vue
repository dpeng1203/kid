<template>
    <div class="pay-fail">
        <div class="pay-cont">
            <div class="img-wrapper">
                <img src="../assets/img/fail.png" alt="">
            </div>
            <div class="money">取消支付</div>
            
        </div>
    </div>
</template>

<script>
export default {
    name: 'payCancel',
    methods: {
        
    }
}
</script>

<style scoped lang="less">
@s: 0.0133rem;
.pay-fail{
    .pay-cont{
        height: calc(100vh);
        padding: 0 20*@s;
        text-align: center;
        background: #fff;
        .img-wrapper{
            padding-top: 304*@s;
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