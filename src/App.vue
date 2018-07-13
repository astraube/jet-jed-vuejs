<template>
  <div id="app">

    <div class="jumbotron header">
      <div class="col-md-2">
        <img border="0" class="img-responsive center-block" alt="Straube Jedi" src="http://straucorp.com/images/logos/straucorp_logo.svg" width="100">
      </div>
      <div class="col-md-10 text-left">
        <h3>
          JetJedi! <code>with VueJS, Vuex, bootstrap</code>
        </h3>
      </div>
    </div>

    <div class="container">
      <el-menu :default-active="activeIndex"  mode="horizontal" @select="handleSelect">
        <el-menu-item index="/">
          Dashboard
        </el-menu-item>
        <el-menu-item index="/jedis">
          JedisJedis
        </el-menu-item>
      </el-menu>

      <transition>
        <keep-alive>
          <router-view/>
        </keep-alive>
      </transition>


    </div>

  </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            activeIndex: '/',
        };
    },
    created() {
        this.activeIndex = this.$route.path
    },
    methods: {
        handleSelect(key) {
            this.activeIndex = key
            this.$router.replace(key)
        }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
@media (max-width: 980px) {
  figure .echarts {
    width: 100%;
    height: 75vw;
  }
}
figure .echarts {
  width: 100%;
  height: 300px;
}
.echarts {
  width: 600px;
  height: 400px;
}
@media (max-width: 980px) {
  figure {
    margin: 0;
    padding: 0;
    width: 100vw;
    border: none;
    border-radius: 0;
    box-shadow: none;
  }
}
figure {
  display: inline-block;
  margin: 0;
  width: 40vw;
}

.jumbotron {
  z-index: 2;
  position: relative;
}
.container {
  /*padding-right: 0 !important;
  padding-left: 0 !important;*/
  margin-top: -20px;
  margin-bottom: 20px;
  position: relative;
}
.header h3 {
  color: #2d353d !important;
}
.el-menu {
  border-radius: 4px !important;
}
html {
  position: relative;
  overflow-x: hidden;
  min-height: 100%;
  background: #2d353d;
  box-sizing: border-box;
}
body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  background: #2d353d;
  color: #98a6ad;
  overflow-x: hidden !important;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  color: rgba(255, 255, 255, 0.8);
  font-family: 'Source Sans Pro', sans-serif;
  margin: 10px 0;
}
h1 small,
h2 small,
h3 small,
h4 small,
h5 small,
h6 small {
  color: rgba(255, 255, 255, 0.5);
}
h1 {
  line-height: 43px;
}
h2 {
  line-height: 35px;
}
h3 {
  line-height: 30px;
}
h4 {
  line-height: 22px;
}
*,
*:before,
*:after {
  outline: none !important;
  box-sizing: inherit;
}
a:hover {
  outline: 0;
  text-decoration: none;
}
a:active {
  outline: 0;
  text-decoration: none;
}
a:focus {
  outline: 0;
  text-decoration: none;
}
.container {
  width: auto;
}
.container-alt {
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
}
.footer {
  background-color: #323b44;
  color: #98a6ad;
  text-align: center !important;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
  height: 50px;
  position: relative;
}
</style>
