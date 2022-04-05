<template>
  <div class="about">
    <div class="header">About the demo</div>
    <p class="title">the first of test</p>
    <div class="footer">
      <ul>
        <h4>需要完成</h4>
        <li>数据可视化</li>
        <li>123</li>
        <li>123</li>
        <li>123</li>
      </ul>
      <ul>
        <h4>需要优化</h4>
        <li>对设置了过多的待办的行为进行分页处理</li>
        <li>日历下拉切换日期时，日历主体跑偏</li>
        <li>123</li>
        <li>123</li>
        <li>{{ aboutCount }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      aboutCount: this.$store.state.count,
    };
  },
  mounted() {
    this.add();
  },
  methods: {
    add() {
      this.$store.commit("test", 1);
    },
  },
};
</script>

<style scoped>
li {
  list-style: none;
}
.about {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 45rem;
}
.header {
  font-size: 3rem;
  margin: 5rem 0 1rem 0;
}

.title {
  font-size: 1.75rem;
}
.footer {
  display: flex;
  justify-content: space-around;
  align-content: center;
}
.footer > ul {
  margin: 2rem 3rem;
}
.footer > ul li {
  margin: 1rem 0;
}
</style>