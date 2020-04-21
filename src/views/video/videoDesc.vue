<template>
    <div class="video-desc">
        <div class="box"  @click="handleClick">
            <div class="wrap">
                <video controls="controls" :poster="info.clImgUrl" :src="info.clUrl"  preload="autoplay" :id="info.clCode" webkit-playsinline="true" playsinline="true" x5-playsinline="true"  >
                </video>
            </div>
            <div class="title">{{info.clName}}</div>
        </div>
        <div class="gray-bar"></div>
        <div class="desc">
            <div class="title">KID LINGUAL 视频藏馆</div>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kid Lingual 启灵谷英语致力于培养21世纪最杰出的世界公民。
                我们为中国孩子准备了大量的北美原滋原味英语学习视频资源，
                让孩子们不出家门就可以轻松掌握最地道的英语表达。
            </p>
            
        </div>
        <div class="btn" @click="$router.push('/videoList')">返回视频列表</div>
    </div>
</template>

<script>
import {videoList,pay} from '../../api/api'
import { Dialog,List, Toast } from 'vant';
export default {
    data() {
        return{
            info: {
                clCode: 0,
                clName: '',
                clUrl: '',
                clImgUrl: '',
                video: null
            }
        }
    },
    methods: {
        getDetail(clCode) {
            let parms = {
                opType: 106,
                mobile: localStorage.phone,
                clCode: clCode
            }
            videoList(parms).then(res => {
                this.info = res.data
            })
        },
        getPayInfo(clCode) {
            let parms = {
                opType: 107,
                mobile: localStorage.phone,
                clCode: clCode,
                // clType: this.clType
            }
            videoList(parms).then(res => {
                //playType: 播放权限0免费可播1已付费可播2无权播放（需要缴费)
                let playType = res.data.playType
                if(playType == 2) {
                    Dialog.confirm({
                        title: '提示',
                        message: `此视频需缴费 ${res.data.price} 元才能播放，确定购买？`
                    }).then(() => {
                        // on confirm
                        localStorage.playClCode = clCode
                        let obj = {
                            memCode: localStorage.memId,
                            mobile: localStorage.phone,
                            clCode: clCode
                        }
                        pay(obj).then(res => {
                            window.location.href = res.msg
                        })
                    }).catch(() => {
                        // on cancel

                    });
                }else if(playType == 1) {
                    if(res.data.endTime) {
                        let date = new Date(res.data.endTime)
                        let time = date.getTime()
                        let nowTime = new Date().getTime()
                        if(time > nowTime) {
                            // this.$router.push({path: '/videoDesc',query: {clCode: clCode}})
                            this.getDetail(clCode)
                        }else{
                            Dialog.confirm({
                                title: '提示',
                                message: `视频已过期，需重新缴费 ${res.data.price} 元才能播放，确定购买？`
                            }).then(() => {
                                // on confirm
                                localStorage.playClCode = clCode
                                let obj = {
                                    memCode: localStorage.memId,
                                    mobile: localStorage.phone,
                                    clCode: clCode
                                }
                                pay(obj).then(res => {
                                    window.location.href = res.msg
                                })
                            }).catch(() => {
                                // on cancel

                            });
                        }
                    }
                }else if(playType == 0) {
                    // this.$router.push({path: '/videoDesc',query: {clCode: clCode}})
                    this.getDetail(clCode)
                }
            })
        },
        handleClick() {
            // console.log(1)
            // console.log(this.$refs.video)
        },
    },
    mounted() {
        if(this.$route.query.orderid) {
            if(localStorage.playClCode) {
                this.getDetail(localStorage.playClCode)
            }else{
                Toast('程序出错，请联系管理员！')
            }
            
        }else if(this.$route.query.clCode) {
            this.getPayInfo(this.$route.query.clCode)
        }
    }
}
</script>

<style scoped lang="less">
@s: 0.0133rem;
.video-desc{
    min-height: 100vh;
    // background-color: rgb(254, 222, 6);
    background: url(../../assets/img/video.jpg) no-repeat;
    background-size: 100% 100%;
    padding: 1rem 20*@s;
    // .top{
    //     z-index: -1;
    // }
    .box{
        border-radius: .266667rem .266667rem 0 0;
        background: #fff;
        padding: 20*@s;
        // margin-top: -160*@s;
        // margin-left: 20*@s;
        // margin-right: 20*@s;
        .wrap{
            width: 100%;
            height: 5rem;
            video{
                width: 100%;
                height: 100%;
            }
            
        }
        .title{
            text-align: center;
            font-size: .453333rem;
            color: #333;
            margin: .6rem 0;
        }
    }
    .gray-bar{
        background: #fff;
        border-bottom: .04rem dashed #ffe241;
        position: relative;
        height: .24rem;
        
    }
    .gray-bar::before{
        content: "";
        display: block;
        height: .213333rem;
        width: .213333rem;
        border-radius: .213333rem;
        background: #f8d348;
        position: absolute;
        top: .126667rem;
        left: -.106667rem;
    }
    .gray-bar::after{
        content: "";
        display: block;
        height: .213333rem;
        width: .213333rem;
        border-radius: .213333rem;
        background: #f8d348;
        position: absolute;
        top: .126667rem;
        right: -.106667rem;
    }
    .desc{
        background: #fff;
        padding: 1.2rem 0 1.4rem;
        border-radius: 0 0 .266667rem .266667rem;
        .title{
            text-align: center;
            font-size: .48rem;
            color: #815b4c;
            margin: 0 0 .8rem;
        }
        p{
            padding: 0 .4rem;
            color: #9f948f;
            font-size: .4rem;
            line-height: .64rem;
        }
        
    }
    .btn{
        
        width: 350*@s;
        background: #fff;
        line-height: 88*@s;
        border-radius: 20*@s;
        text-align: center;
        margin: 0 auto;
        margin-top: 1.5rem;
        font-size: 28*@s;
        color: #815b4c;
    }
}
</style>