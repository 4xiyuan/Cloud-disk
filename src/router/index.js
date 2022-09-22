import Vue from 'vue';
import Router from 'vue-router';
import home from '../components/home.vue'
import login from '../components/login.vue'

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
  ];
  

const router = new Router({
    mode: 'history',
    routes,
  });

export default router;