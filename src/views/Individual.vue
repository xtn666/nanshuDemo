<template>
  <div class="individual">
    <div class="indi">
      <div class="indi-title">
        <h2>资料卡</h2>
        <!-- <div class="ex-theme">
          <h4 class="theme-title">切换主题</h4>
          <div class="theme-box">
            <div
              class="theme-content"
              @click="changebg(item)"
              v-for="item in themeList"
              :key="item.id"
            >
              <span class="theme-list">{{ item[0] }}</span>
            </div>
          </div>
        </div> -->
      </div>
      <div class="indi-main">
        <div class="left-main">
          <div class="profile"></div>
          <span class="uname">uname</span>
        </div>
        <div class="right-main">
          <table class="tab">
            <thead>
              <tr>
                姓名
              </tr>
              <tr>
                年龄
              </tr>
              <tr>
                学校
              </tr>
              <tr>
                专业
              </tr>
            </thead>
            <tbody>
              <td>张三</td>
              <td>18</td>
              <td>xxxx学校</td>
              <td>软件工程</td>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Individual",
  data() {
    return {
      themeList: [
        ["luffy", "red"],
        ["zoro", "green"],
        ["nami", "orange"],
        ["usopp", "brown"],
        ["sanji", "yellow"],
        ["chopper", "pink"],
        ["robin", "purple"],
      ],

      declaration: document.styleSheets[1].cssRules[0].style,
    };
  },
  computed: {
    themebg() {
      return this.$store.state.themebg;
    },
  },
  mounted() {
    this.changebg(this.themebg);
  },
  methods: {
    changebg(themebg) {
      console.log(themebg[0]);
      let pic_path = "../assets/" + themebg[0] + ".jpg";
      console.log(pic_path);
      this.declaration.setProperty("--picView", "url(" + pic_path + ")");
      this.$store.commit("changethemebg", themebg);
    },
  },
};
</script>

<style scoped>
button {
  background: 0;
  border: 0;
}
.individual {
  display: flex;
  position: relative;
  width: 81rem;
  height: 47rem;
  background: var(--picView) no-repeat center;
  margin: -4rem 0 0 -1rem;
  background-size: 100% 100%;
  transition: 0.5s ease-in-out;
}
.indi {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: var(--theme1);
  height: 42.5rem;
  width: 75rem;
  top: 4rem;
  left: 3rem;
}
.indi-title {
  display: flex;
  align-items: center;
  height: 4rem;
  margin: 0 1rem;
}
.indi-main {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 38.5rem;
}
.left-main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 2rem;
  width: 30%;
}
.profile {
  display: flex;
  justify-content: center;
  height: 10rem;
  width: 10rem;
  border-radius: 5rem;
  margin-bottom: 1rem;
}
.right-main {
  display: flex;
  justify-content: start;
  align-items: center;
  width: 70%;
}
.tab {
  display: flex;
  justify-content: center;
  align-items: center;
}
tr {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  width: 5rem;
  background: #666;
  margin: 1.7rem;
  font-size: 1rem;
  border-radius: 2rem;
}
tbody {
  display: flex;
  flex-direction: column;
}
td {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.8rem;
  height: 2rem;
  width: 7rem;
  background: #666;
  border-radius: 2rem;
}
</style>