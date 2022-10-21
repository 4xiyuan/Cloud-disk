import Vue from 'vue';
import Router from 'vue-router';
import home from '../components/home.vue'
import login from '../components/login.vue'
import photo from '../components/photo.vue'
import video from '../components/video.vue'
import file from '../components/file.vue'
import folder from '../components/folder.vue'
import recycle from '../components/recycle.vue'
Vue.use(Router);

 
const routes = [
    {
      path: '/',
      redirect: '/home',

    },
    {
      path: '/login',
      name: 'login',
      component: login,
      },
      {
        path: '/home',
        name: 'home',
        component: home,
      },
      {
        path: '/photo',
        name: 'photo',
        component: photo,
      },
      {
        path: '/video',
        name: 'video',
        component: video,
      },
      {
        path: '/file',
        name: 'file',
        component: file,
        
      },
      {
        path: '/folder',
        name: 'folder',
        component: folder,
        
      },
      {
        path: '/recycle',
        name: 'recycle',
        component: recycle,
        
      },
      
      
      
  ];
  
  

const router = new Router({
    mode: 'history',
    routes,
  });
  router.beforeEach((to, from, next) => {
    console.log(sessionStorage.getItem('users'))
    if (sessionStorage.getItem('users')=='false'||!sessionStorage.getItem('users')) {
        console.log("未登录")
        if (to.name == "login") {
          console.log("未登录但要去登录页面")
          next();
      } else {
        console.log("未登录强制去登录页面")
        router.push('/login')
      }
    } else{
      console.log("已登录")
      if(to.name == "login"){
        console.log("已登录但要去登录页强制跳转回主页")
        router.push('/home')
      }else{
        console.log("已登录随便去")
        next();
      }
      
    }
    })

export default router;