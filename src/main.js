import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import VueToast from 'vue-toast-notification';

import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap-vue/dist/bootstrap-vue.css"
import '../node_modules/vue-toast-notification/dist/theme-default.css';



Vue.use(BootstrapVue);
Vue.use(VueToast);
new Vue({
  el: '#app',
  render: h => h(App),


  
})
