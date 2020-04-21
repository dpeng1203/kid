import { $ } from './axios'
import { stringify } from "qs";



 //获取手机验证码code
 export const code = p => $.post('/zqxry/memedt/sendVerifyCode',stringify(p))

 //登陆
 export const login = p =>$.post('/zqxry/memlogin',stringify(p))

 //验证码登录
 export const loginCert = p =>$.post('/zqxry/memloginCert',stringify(p))

 //注册
 export const sign = p =>$.post('/zqxry/memedt/register',p)

 //推荐注册
 export const signQr = p =>$.post('/zqxry/memedt/registerQR',p)

 //忘记密码
 export const resetPw = p =>$.post('/zqxry/memedt/findpwd',stringify(p))

 //视屏列表
 export const videoList = p =>$.post('/qlg/bizqry/service',stringify(p),{showLoading: false})


 //购买视频  /yjfapp/pay?memCode=&clCode=
 export const pay = p =>$.get('/yjfapp/pay',p,{showLoading: false})


