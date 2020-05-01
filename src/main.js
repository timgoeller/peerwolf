import Vue from 'vue'
import App from './App.vue'

import 'carbon-components/css/carbon-components.css';
import CarbonComponentsVue from '@carbon/vue/src/index';

Vue.config.productionTip = false

Vue.use(CarbonComponentsVue);

new Vue({
  render: h => h(App),
}).$mount('#app')
