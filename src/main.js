import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import vuetify from './plugins/vuetify'
import VueSweetalert2 from 'vue-sweetalert2';

import 'sweetalert2/dist/sweetalert2.min.css';

const options = {
  confirmButtonColor: '#4caf50',
  cancelButtonColor: '#757575',
};

Vue.use(VueSweetalert2, options);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
