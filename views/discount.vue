<template>
  <div id="bothub-discount">
    <div class="bothub-discount__title">{{ this.widget.title }}</div>
    <h6 class="bothub-discount__subtitle">{{ this.widget.sub_title }}</h6>
    <div class="bothub-discount__box" :class="{shake}">
      <div class="bothub-discount-box__header">
        <template v-if="showCoupon">
          <div class="bothub-discount-box__header-success">SUCCESS</div>
        </template>
        <template v-else>
          <div class="bothub-discount-box__header-percent">{{ this.widget.notice }}</div>
          <div class="bothub-discount-box__header-discount">DISCOUNT</div>
        </template>
      </div>
      <div class="bothub-discount-box__content">
        <loading :loading="loading" style="margin-left: 70px"></loading>
        <div v-if="showCoupon" class="bothub-discount-box__content-discount">
          <div class="bothub-discount-box__content-text">{{ this.widget.discount_text }}</div>
          <div class="bothub-discount-box__content-code">{{ this.widget.discount_code }}</div>
        </div>
        <div v-show="!showCoupon" id="bothub-messenger-checkbox" :auto_hide_days="autoHideDays" prechecked="true" size="small"></div>
      </div>
    </div>
    <button v-if="!showCoupon" class="button" @click.prevent="getCoupon">{{ this.widget.coupon_button_text }}</button>
    <button v-else class="button" type="button" @click="copy">{{ this.widget.copy_button_text }}</button>
  </div>
</template>

<script>
import Loading from './loading.vue'
import { getCookie, copy } from '../src/utils'

export default {
  name: 'DiscountWidget',
  data() {
    return {
      widget: BOTHUB.discount_plugin,
      showCoupon: false,
      shake: false,
      checked: false,
      loading: true
    }
  },
  components: {
    Loading
  },
  computed: {
    autoHideDays() {
      const discountDiv = window['bothub-discount']
      if (discountDiv) {
        const days = +discountDiv.getAttribute('auto_hide_days')
        if (days > 0 && days <= 15) {
          return days
        }
      }
      return false
    }
  },
  methods: {
    getCoupon() {
      if (this.checked) {
        this.showCoupon = true
        window.postMessage('bothub_discount_get_coupon','*')
      } else {
        this.shake = true
        setTimeout(() => this.shake = false, 1000)
      }
    },
    copy() {
      copy(this.widget.discount_code);
      this.widget.copy_button_text = 'Copied!'
      window.postMessage('bothub_discount_coupon_copied', '*')
    },
    loadBothubSdk() {
      const _this = this
      const cb = window.bhAsyncInit
      window.bhAsyncInit = function() {
        cb && cb()
        window.FB.Event.subscribe('messenger_checkbox', function(e) {
          if (e.event === 'checkbox') {
            _this.checked = e.state === 'checked'
          } else if (e.event === 'rendered') {
            _this.loading = false
          }
        })
      };
      (function(s,id,l){s.id=id;s.src=l;window[id]||document.body.appendChild(s)})
      (document.createElement('script'),'bothub-sdk','https://sdk.bothub.ai/bothub.js?t=discount-plugin');
    }
  },
  mounted() {
    this.loadBothubSdk()
  }
}
</script>

<style lang="less">
#bothub-discount {
  clear: both;
  width: 350px;
  padding-top: 30px;
  text-align: center;
  .bothub-discount__title,
  .bothub-discount__subtitle {
    margin: 5px;
    font-size: 20px;
    color: #444;
  }
  .bothub-discount__subtitle {
    font-size: 13px;
    color: #666;
    margin-bottom: 15px;
  }
  .bothub-discount__box {
    display: flex;
    justify-content: center;
    min-height: 73px;
    border-radius: 5px;
    overflow: hidden;
    max-width: 320px;
    margin: 0 auto;
    text-align: left;
    .bothub-discount-box__header {
      width: 110px;
      float: left;
      border: 2px solid #C0CCDA;
      border-right: 2px dotted #C0CCDA;
      border-radius: 5px;
      text-align: center;
      background-color: #EFEFEF;
      user-select: none;
      display: flex;
      flex-direction: column;
      .bothub-discount-box__header-percent {
        color: #FF6969;
        font-size: 25px;
        line-height: 20px;
        margin-top: 14px;
      }
      .bothub-discount-box__header-discount {
        color: #FF6969;
        font-weight: bold;
        margin-top: 3px;
      }
      .bothub-discount-box__header-success {
        color: #33D499;
        font-weight: bold;
        margin: auto;
      }
    }
    .bothub-discount-box__content {
      width: 180px;
      overflow: hidden;
      display: flex;
      align-items: center;
      flex: 1;
      font-family: "Lato", sans-serif;
      padding: 0 15px 0 15px;
      background: #fff;
      border: 2px solid #C0CCDA;
      border-left: none;
      border-radius: 5px;
      text-align: center;
      color: #2DCE8E;
      .bothub-discount-box__content-discount {
        overflow: hidden;
        width: 178px;
      }
      .bothub-discount-box__content-text {
        width: 178px;
        overflow: hidden;
      }
      .bothub-discount-box__content-code {
        font-size: 17px;
        line-height: 20px;
      }
    }
    .bothub-discount__discount-text {
      color: #33d06a;
      display: inline-block;
      font-family: "Lato", sans-serif;
    }
  }
  .button {
    width: 320px;
    font-size: 15px;
    background: #EFEFEF;
    color: #818181;
    border: none;
    padding: 10px 0;
    border-radius: 5px;
    margin: 8px 0 15px;
    cursor: pointer;
    user-select: none;
    outline: none;
    &:hover {
      background: #eef1f5 - #090909;
    }
  }
}

.shake {
  animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>

