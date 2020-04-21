import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    
    {
      path: '/',
      name: 'login',
      component: () => import('./views/login/login.vue'),
      meta: {
        title: '登录'
      }
    },
    // {
    //   path: '/resetPw',
    //   name: 'resetPw',
    //   component: () => import('./views/login/resetPw.vue'),
    //   meta: {
    //     title: '修改密码'
    //   }
    // },
    {
      path: "/videoList",
      name: "videoList",
      component: () => import("./views/video/videoList.vue"),
      meta: {
        title: '视频列表'
      }
    },
    {
      path: "/videoDesc",
      name: "videoDesc",
      component: () => import("./views/video/videoDesc.vue"),
      meta: {
        title: '视频详情'
      }
    },
    // {
    //   path: "/home",
    //   name: "home",
    //   component: () => import("./views/Home.vue"),
    //   meta: {
    //     title: '视频列表'
    //   }
    // },
    
    // {
    //   path: "/payCancel",
    //   name: "payCancel",
    //   component: () => import("./views/PayCancel.vue"),
    // },
    // {
    //   path: "/paySuccess",
    //   name: "paySuccess",
    //   component: () => import("./views/PaySuccess.vue"),
    // },
  ]
});
