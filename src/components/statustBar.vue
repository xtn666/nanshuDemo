<template>
  <div class="statusBar">
    <div class="status">
      <div
        class="ring-echart"
        id="ring-echart"
        style="display: flex; height: 16rem; width: 16rem"
        ref="ringEchart"
      ></div>
    </div>
    <div class="text" v-if="todoListAll.length">
      <p>今天共有{{ todoListAll.length }}项计划</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "statusbar",
  data() {
    return {};
  },
  computed: {
    theme() {
      return this.$store.state.theme;
    },
    selectTimeStamp() {
      return this.$store.state.selectTimestamp;
    },
    todoListAll() {
      let list = [];
      let todolist = this.$store.state.todoListAll;
      let Stamp = this.selectTimeStamp.valueOf();
      for (let i = 0; i < todolist.length; i++) {
        if (todolist[i].timeStamp == Stamp) {
          list.push(todolist[i]);
        }
      }
      return list;
    },
    chartData() {
      let all = this.todoListAll.length;
      console.log(all);
      let complete = this.todoListAll.filter((item) => {
        return item.isComplete == true;
      }).length;
      let obj = {
        all: all,
        complete: complete,
        no: all - complete,
        theme: this.theme,
      };
      return obj;
    },
  },
  watch: {
    chartData: {
      async handler(obj) {
        this.drawRing(obj);
      },
      deep: true,
    },
  },
  mounted() {
    this.drawRing(this.chartData);
  },
  methods: {
    drawRing(obj) {
      let ringChart = this.$echarts.init(this.$refs.ringEchart);
      window.onresize = function () {
        ringChart.resize();
      };
      ringChart.setOption(
        {
          title: {},
          tooltip: {},
          legend: {
            orient: "vertical",
            x: "left",
          },
          series: [
            {
              type: "pie",
              color: [obj.theme, "#666"],
              radius: ["50%", "70%"],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: "center",
                emphasis: {
                  show: true,
                },
              },
              labelLine: {
                show: false,
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: "30",
                  fontWeight: "bold",
                },
              },
              data: [
                {
                  value: obj.complete,
                  name: "已完成事项",
                },
                {
                  value: obj.no,
                  name: "未完成",
                },
              ],
            },
          ],
        },
        true
      );
    },
  },
};
</script>

<style>
.statusBar {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>