<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html, body {
  height: 100%;
  width: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  background: #f5f7f9;
}
.ivu-btn, .ivu-input, .ivu-select-selection {
  box-shadow: none !important;
}
.logo-title .ivu-carousel-dots-inside {
  bottom: 95px !important;
}
.ivu-form .ivu-form-item-label {
  font-weight: 700 !important;
  color: rgba(0,0,0,0.5) !important;
}
</style>
