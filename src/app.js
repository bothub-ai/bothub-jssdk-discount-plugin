import Vue from 'vue'
import { getCookie } from './utils'

// configuration
Vue.config.devtools = (process.env.NODE_ENV === 'development')
Vue.config.productionTip = (process.env.NODE_ENV === 'development')

// components
Vue.component('Discount', require('views/discount.vue').default)

const discountDiv = window['bothub-discount']
const hide = discountDiv && discountDiv.getAttribute('auto_hide_days')

const initBothubSdk = function() {
  (function(s,id,l){s.id=id;s.src=l;window[id]||document.body.appendChild(s)})
  (document.createElement('script'),'bothub-sdk','https://sdk.bothub.ai/bothub.js?t=discount-plugin')
}

if (!discountDiv) {
  initBothubSdk()
}

if (BOTHUB && BOTHUB.discount_plugin && discountDiv) {
  if (hide && getCookie('bothub_checkbox_checked')) {
    initBothubSdk()
  } else {
    window.app = new Vue({
      el: '#bothub-discount',
      render: (h) => h('discount')
    })
  }
}
