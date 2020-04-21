import { Toast } from 'vant'

export const checkPhone = (value) => {
    const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/
    if (reg.test(value)) {
        return true
    }else{
        Toast('请输入正确的手机号')
        return false
    }
}

export const checkUserName = (value) => {
    const reg = /^[\u4E00-\u9FA5A-Za-z0-9_]{1,16}$/
    if (reg.test(value)) {
        return true
    }else{
        Toast('输入的必须是1-16位的任何字符!!!')
        return false
    }
}

export const checkPassWord = (value) => {
    const reg = /^[a-zA-Z0-9_-]{6,20}$/
    if (reg.test(value)) {
        return true
    }else{
        Toast('密码必须由6-20位字母、数字、下划线组成')
        return false
    }
}
//校验短信验证码6位
export const checkCode = (value) => {
    const reg = /^\d{6}$/
    if (reg.test(value)) {
        return true
    }else{
        Toast('请输入验证码：为六位数字')
        return false
    }
}

//校验短信验证码6位
export const checkNumPw = (value) => {
    const reg = /^\d{6}$/
    if (reg.test(value)) {
        return true
    }else{
        Toast('请输入六位数字的密码！')
        return false
    }
}

//短信验证码倒计时
export const timeCountdown = (obj) => { //obj包括timer、waitTime 、canGet 
    const TIME_COUNT = 60; //默认倒计时秒数
    if (!obj.timer) {
        obj.waitTime = TIME_COUNT;
        obj.canGet = false;
        obj.timer = setInterval(() => {
            if (obj.waitTime>0 && obj.waitTime<=TIME_COUNT) {
                obj.waitTime--;
            }else{
                obj.canGet = true;
                clearInterval(obj.timer); //清空定时器
                obj.timer = null;
            }
        }, 1000)
    }
    return {
        timer: obj.timer,
        canGet: obj.canGet,
        waitTime: obj.waitTime
    }
}

//年月日标准格式
export const getDate = (date) => {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    return year + "-" + month + "-" + day;
}
//  获取当前时间时分秒
export const getHms = (date = new Date()) => {
    var year = date.getFullYear().toString();
    var month = (date.getMonth() + 1).toString();
    var day = date.getDate().toString();
    var hour = date.getHours().toString();
    var min = date.getMinutes().toString();
    var sec = date.getSeconds().toString();
    function timeAdd0(str) {
        if(str.length<=1){
            str='0'+str;
        }
        return str
    }
    var nowYear=timeAdd0(year)
    var nowMonth=timeAdd0(month)
    var nowDay=timeAdd0(day)
    var nowHours=timeAdd0(hour)
    var nowMin=timeAdd0(min)
    var nowSeconds=timeAdd0(sec)
    return nowYear + "-" + nowMonth + "-" + nowDay + ' ' + nowHours + ':' + nowMin + ':' + nowSeconds;
}

//获取当月第一天
export const getCurrentMonthFirst = (date) => {
    date.setDate(1);
    return date;
}

//获取当月最后一天
export const getCurrentMonthLast = (date) => {
    var currentMonth=date.getMonth();
    var nextMonth=++currentMonth;
    var nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
    var oneDay=1000*60*60*24;
    return new Date(nextMonthFirstDay-oneDay);
}