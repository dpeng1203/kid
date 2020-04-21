<template>
    <div class="video">
        <div class="title">KID LINGUAL 视频藏馆</div>
        <div class="desc"> Kid Lingual 启灵谷英语致力于培养21世纪最杰出的世界公民。<br>
            我们为中国孩子准备了大量的北美原滋原味英语学习视频资源，<br>
            让孩子们不出家门就可以轻松掌握最地道的英语表达。
        </div>
        <div class="list">
            <div class="item" v-for="item in list" :key="item.clCode" @click="toPaly(item)">
                <div class="img-wrap">
                    <img :src="item.clImgUrl" alt="">
                </div>
                <img src="../../assets/img/play.png" alt="" class="play">
                <p>{{item.clName}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import {videoList, pay} from '../../api/api'
import { Dialog,List } from 'vant';
export default {
    components: {
        [List.name]: List,
    },
    data() {
        return{
            list: [],
            loading: false,
            finished: false,
            clType: 2,
            parms: {
                pageNum: 0,
                pageSize: 20
            },
            playType: 0,
        }
    },
    methods: {
        getList() {
            // console.log(111222221)git 
            // console.log(2222)
            let parms = {
                opType: 105,
                clCode: 0,
                mobile: localStorage.phone, 
                clType: this.clType
            }
            videoList(parms).then(res => {
                this.list = res.data
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
                            this.$router.push({path: '/videoDesc',query: {clCode: clCode}})
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
                    this.$router.push({path: '/videoDesc',query: {clCode: clCode}})
                }
            })
        },
        toPaly(item) {
            if(localStorage.mToken) {
                this.getPayInfo(item.clCode)
                // this.$router.push({path: '/videoDesc',query: {clCode: item.clCode}})
            }else{
                Dialog.confirm({
                    title: '提示',
                    message: '还未登陆，去登录？'
                }).then(() => {
                    // on confirm
                    this.$router.push('/')
                }).catch(() => {
                    // on cancel

                });
            }
            
        }
    },
    mounted() {
        if(this.$route.query.clType) {
            this.clType = this.$route.query.clType
        }
        // if(this.$route.query.orderid) {
        //     this.$router.push({path: '/videoDesc',query: {clCode: localStorage.playClCode}})
        // }
        this.getList()
    }
}
</script>

<style scoped lang="less">
@s: 0.0133rem;
.video{
    min-height: 100vh;
    // overflow: auto;
    background: url(../../assets/img/video.jpg) no-repeat;
    background-size: 100% ;
    position: relative;
    background-color: #f7db70;
    .title{
        padding: 1.5rem 0 .2rem; 
        font-size: .5rem;
        text-align: center;
        color: #4a3636;
        font-weight: bold;
    }
    .desc{
        padding: 0 .6rem;
        color: #8c6038;
        line-height: .6rem;
        font-size: .3rem;
        text-align: center;
    }
    .list{
        background: url(../../assets/img/bg.jpg) repeat;
        background-size: 100% ;
        padding: 0 .4rem;
        overflow: hidden;
        .item{
            float: left;
            background: #fff;
            padding: 10*@s;
            width: 3.9rem;
            border-radius: .266667rem;
            margin: .226667rem .2rem;
            box-shadow: 0.093333rem 0.093333rem #f7db70;
            position: relative;
            .img-wrap{
                height: 170*@s;
                overflow: hidden;
            }
            p{
                font-size: .346667rem;
                color: #999;
                margin: .133333rem 0;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                padding-left: 10*@s;
            }
            .i-desc{
                font-size: .373333rem;
                color: #333;
            }
            .play{
                position: absolute;
                top: 40%;
                left: 50%;
                width: 92*@s;
                height: 92*@s;
                margin: -46*@s 0 0 -46*@s;
            }
        }
    }
}
</style>