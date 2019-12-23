import Vue from "vue";
import App from "./App";
import VueRouter from 'vue-router'
import routes from './router/routes'
import { store } from "./stores/store"
import Notifications from 'vue-notification'

import PaperDashboard from "./plugins/paperDashboard";

Vue.config.productionTip = false

window.eventBus = new Vue()

Vue.use(PaperDashboard);
Vue.use(VueRouter)
Vue.use(Notifications)

// BootstrapVue
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import "ace-builds/src-noconflict/ace.js";
import "ace-builds/src-noconflict/mode-c_cpp.js";
import "ace-builds/src-noconflict/mode-java.js";
import "ace-builds/src-noconflict/mode-python.js";
import "ace-builds/src-noconflict/theme-textmate.js";
import "ace-builds/src-noconflict/theme-eclipse.js";
import "ace-builds/src-noconflict/theme-monokai.js";
import "ace-builds/src-noconflict/theme-crimson_editor.js";

import "prismjs/prism.js";
import "prismjs/themes/prism.css";

import VueCodeHighlight from 'vue-code-highlight';

Vue.use(VueCodeHighlight)

Vue.use(BootstrapVue);

// router
const router = new VueRouter({
  routes,
  linkActiveClass: "active"
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.loggedIn == true) {
      if (to.matched.some(record => record.meta.isAdmin)) {
        if (store.getters.isRoleAdmin == true) {
          next()
        } else {
          next({ name: 'problem' })
        }
      } else {
        next()
      }
    } else {
      next({ name: 'login' })
    }
  } else {
    if (store.getters.loggedIn == true) {
      next({ name: 'problem' })
    } else {
      next()
    }
  }
})


import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
// Init plugin
Vue.use(Loading)

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router: router,
  store: store,
  render: h => h(App)
});
