import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'


import { onAuthStateChanged } from "firebase/auth";
import auth from 'src/composables/useAuthFirebase';

export default route(function (/* { store, ssrContext } */) {


  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  })
  Router.beforeEach((to, from, next)=>{

    if ( to.meta.requiresAuth == true ){

      onAuthStateChanged(auth, (user) => {
        if (!user) {
          next({
            path: 'login',
            replace: true
          })
        } else {
          next();
        }
      });
    } else {
      next();
    }
  })

  return Router
})
