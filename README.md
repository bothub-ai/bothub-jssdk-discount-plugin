# 关于 Discount Plugin

对于电商用户来说，用 Checkbox 实现 Messenger 购物车召回是一个常规需求。这时，如果店铺页面的 checkbox 默认不能勾选，如果使用“优惠券插件”能实现更好的效果。使用本插件可提高新商家接购物车召回的效率。

## 样例展示

![](https://user-images.githubusercontent.com/32947262/40961440-35937f12-68d5-11e8-8532-3fb3cb216516.png)

查看示例：https://demo.bothub.ai/sdk/plugins/discount.php

## 配置方式

在网站指定位置加入插件 html 代码已显示插件

```html
<div id="bothub-discount"></div>
```

在 `</body>` 结束标签的上面加入 SDK 初始化代码：

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

## 插件隐藏

通过添加 auto_hide_days 属性，可实现插件勾选后自动隐藏。  
这样的好处是：插件隐藏后用户勾选的状态可以保持，依然可以通过 Bothub SDK 接口默默的给用户发送消息。

```html
<div id="bothub-discount" auto_hide_days="7"></div>
```

## 插件样式修改

可直接通过覆盖 CSS 样式的方式对插件外观进行修改。  
例如，如果我们要修改折扣码字体样式可以通过如下方式实现：

```css
.bothub-discount-box__header-percent {
  color: slateblue;
}
```

<img src="https://ws2.sinaimg.cn/large/006tNc79gy1fziys2p4f6j30lk0dmwfq.jpg" style="width: 400px">

## 构建方式

```bash
npm install    // 安装依赖
npm run dev    // 开发模式
npm run build  // 打包构建
```
