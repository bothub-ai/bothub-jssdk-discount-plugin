<template>
  <div class="loading" v-if="loading"></div>
</template>

<script>
export default {
  name: 'Loading',
  props: ['loading']
}
</script>

<style scoped lang="less">
.loading {
  width: 24px;
  height: 24px;
  border: solid 2px transparent;
  border-top-color: #29d;
  border-left-color: #29d;
  border-radius: 36px;
  animation: pace-spinner 1500ms linear infinite;
}
@keyframes pace-spinner {
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
}
</style>
