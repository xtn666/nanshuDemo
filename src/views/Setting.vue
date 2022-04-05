<template>
  <div class="setting">
    <div class="theme">
      <h3>更换主题</h3>
      <div class="theme-btn">
        <div class="green-theme btn" @click="changeTheme('green')"></div>
        <div class="yellow-theme btn" @click="changeTheme('yellow')"></div>
        <div class="orange-theme btn" @click="changeTheme('orange')"></div>
        <div class="purple-theme btn" @click="changeTheme('purple')"></div>
        <div class="pink-theme btn" @click="changeTheme('pink')"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    changeTheme(theme) {
      this.$parent.changeTheme(theme);
    },
  },
};
</script>

<style scoped>
.setting {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 99%;
  height: 42rem;
  background: var(--theme1);
  border-radius: 10px;
  transition: 0.5s ease-in-out;
}
.theme {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  width: 98%;
  background: #fff;
  margin: 1rem 0;
  padding: 0 0.5rem;
  border-radius: 5px;
}
.theme-btn {
  display: flex;
  justify-content: center;
}
.btn {
  display: flex;
  justify-content: center;
  height: 3rem;
  width: 3rem;
  border-radius: 3rem;
  margin: 0 0.5rem;
  cursor: pointer;
}
.green-theme {
  background: rgb(78, 201, 176);
}
.yellow-theme {
  background: rgb(228, 228, 127);
}
.orange-theme {
  background: rgb(255, 127, 80);
}
.purple-theme {
  background: rgb(148, 0, 211);
}
.pink-theme {
  background: rgb(255, 105, 180);
}
</style>