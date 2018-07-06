import Vue from 'vue'

// configuration
Vue.config.devtools = (process.env.NODE_ENV === 'development')
Vue.config.productionTip = (process.env.NODE_ENV === 'development')

// components
Vue.component('Discount', require('views/discount.vue').default)

if (BOTHUB && BOTHUB.discount_plugin && window['bothub-discount']) {
  window.app = new Vue({
    el: '#bothub-discount',
    render: (h) => h('discount')
  })
}
