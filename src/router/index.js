import Vue from 'vue';
import Router from 'vue-router';
import home from '../components/home.vue'
import login from '../components/login.vue'
import photo from '../components/photo.vue'
import video from '../components/video.vue'
import file from '../components/file.vue'
import folder from '../components/folder.vue'
Vue.use(Router);

 
const routes = [
    {
      path: '/',
      redirect: '/login',

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
      
  ];
  

const router = new Router({
    mode: 'history',
    routes,
  });

export default router;