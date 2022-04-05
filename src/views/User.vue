<template>
  <div class="user">
    <div class="aside-tab">
      <div class="usermsg">
        <div class="profile"></div>
        <p class="username">{{ this.$route.params.username }}</p>
      </div>
      <router-link
        v-for="(router, index) in routers"
        :key="index"
        class="nav"
        :to="router.to"
      >
        <span class="nav-link">{{ router.value }}</span></router-link
      >
    </div>
    <div class="main">
      <div class="header">
        <input class="search" type="text" placeholder="搜索" />
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import Calendar from "./components/Calendar.vue";
export default {
  name: "Main",
  data() {
    return {
      routers: [
        {
          value: "个人信息",
          to: "/user/indivi",
        },
        {
          value: "我的待办",
          to: "/user/todo",
        },
        {
          value: "数据统计",
          to: "/user/statistics",
        },
        {
          value: "设置",
          to: "/user/setting",
        },
        {
          value: "关于",
          to: "/user/about",
        },
      ],
      themeColor: {
        green: [
          "rgb(78, 201, 176)",
          "rgba(78, 201, 176, 0.5)",
          "rgb(34, 139, 34)",
        ],
        yellow: [
          "rgb(228, 228, 127)",
          "rgba(228, 228, 127,0.5)",
          "rgb(255, 215, 0)",
        ],
        orange: [
          "rgb(	255, 127, 80)",
          "rgba(	255, 127, 80,0.5)",
          "rgb(255, 140, 0)",
        ],
        purple: [
          "rgb(148, 0, 211)",
          "rgba(148, 0, 211,0.5)",
          "rgb(102, 51, 153)",
        ],
        pink: [
          "rgb(255, 105, 180)",
          "rgba(255, 105, 180,0.5)",
          "rgb(255, 20, 147)",
        ],
      },
      declaration: document.styleSheets[1].cssRules[0].style,
    };
  },
  mounted() {
    this.changeTheme(this.theme);
  },
  computed: {
    theme() {
      return this.$store.state.theme;
    },
  },
  methods: {
    changeTheme(theme) {
      let color = this.themeColor[theme];
      // console.log(theme);
      for (let i = 0; i < color.length; i++) {
        this.declaration.setProperty("--theme" + i, color[i]);
      }
      this.$store.commit("changetheme", theme);
    },
  },
};
</script>

<style >
:root {
  --theme0: #45c2a5;
  --theme1: rgba(78, 201, 176, 0.5);
  --theme2: rgb(34, 139, 34);
}
.user {
  background: #b5b6b9;
}
.aside-tab {
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 15rem;
  height: 100%;
  overflow: hidden;
  background: var(--theme0);
  transition: 0.5s ease-in-out;
}
.usermsg {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin: 2rem;
  height: 3rem;
  width: 11rem;
}
.profile {
  height: 3rem;
  width: 3rem;
  display: flex;
  justify-content: center;
  background: #b5b6b9;
  margin: 0 1rem 0 0.5rem;
  border-radius: 1.5rem;
}
.username {
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1rem;
  width: 7rem;
  height: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nav {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  justify-content: center;
  height: 2rem;
  width: 11rem;
  margin: 1rem 1.5rem;
  border-radius: 6px;
}
.nav-link {
  height: 3rem;
  width: 9rem;
  border-radius: 6px;
  font-size: 1rem;
  line-height: 3rem;
  color: #fff;
}
.nav-link:hover {
  border: #fff;
  background: rgba(0, 0, 0, 0.5);
}
.main {
  margin-left: 16rem;
  width: calc(100vh-5rem);
}
.header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 4rem;
}
.search {
  z-index: 1;
  width: 15rem;
  height: 2rem;
  padding: 0 1.5rem;
  border: none;
  margin-right: 4rem;
  border-radius: 1rem;
  background: #fff;
}
</style>
