# 关于 Discount Plugin

对于电商用户来说，用 Checkbox 实现 Messenger 购物车召回是一个常规需求。这时，如果店铺页面的 checkbox 默认不能勾选，如果使用“优惠券插件”能实现更好的效果。使用本插件可提高新商家接购物车召回的效率。

## 样例展示

![](https://user-images.githubusercontent.com/32947262/40961440-35937f12-68d5-11e8-8532-3fb3cb216516.png)

查看示例：https://demo.bothub.ai/sdk/plugins/discount.php

## 配置方式

```js
window.BOTHUB = {
  facebook_page_id: "",
  debug: true,
  discount_plugin: {
    "title": "Get 5% off from your order",
    "sub_title": "Reveal discount by subscribing to our Messenger list:",
    "discount_text": "Your discount code:",
    "discount_code": "GET15",
    "coupon_button_text": "Get Your Discount",
    "copy_button_text": "Copy the code",
    "notice": "5%"
  }
};

(function(s,id,l){s.id=id;s.src=l;window[id]||document.body.appendChild(s)})
(document.createElement('script'),'bothub-discount-plugin','https://sdk.bothub.ai/plugins/discount.js');
```

## 事件监控

```
window.addEventListener('message', function(event) {
  switch(event.data) {
    // 用户点击获取优惠码按钮
    case 'bothub_discount_get_coupon':
      console.log('bothub_discount_get_coupon')
      break
    // 用户点击复制优惠码按钮
    case 'bothub_discount_coupon_copied':
      console.log('bothub_discount_coupon_copied')
      break
  }
})
```

## 构建方式

```bash
npm install    // 安装依赖
npm run dev    // 开发模式
npm run build  // 打包构建
```
