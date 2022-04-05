<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import Calendar from "./components/Calendar.vue";
export default {
  name: "App",
};
</script>

<style >
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
a,
a:hover,
a:active,
a:visited {
  text-decoration: none;
}
input {
  background: none;
  outline: none;
}
input:focus {
  border: none;
}
</style>
