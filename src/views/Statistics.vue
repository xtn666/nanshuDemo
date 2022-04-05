<template>
  <div>
    <div
      id="chart"
      :style="{ width: '70rem', height: '45rem', padding: '1rem' }"
    ></div>
    <!-- <button @click="pastSevenDays"></button> -->
  </div>
</template>

<script>
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/line");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

export default {
  name: "Statistics",
  data() {
    return {
      msg: "welcome to Your Vue.js App",
      today: {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate(),
      },
    };
  },
  mounted() {
    this.drawedLine();
    // this.pastSevenDays;
    // this.stampIntoDate;
    this.completeList;
  },
  computed: {
    todoListAll() {
      return this.$store.state.todoListAll;
    },
    //获取前七日的时间戳
    pastSevenDays() {
      let pastTimeStamp = [];
      let todayTimeStamp = new Date(
        this.today.year,
        this.today.month,
        this.today.day
      ).valueOf();
      for (let i = 0; i < 7; i++) {
        pastTimeStamp[i] = todayTimeStamp - (6 - i) * 86400000;
      }
      return pastTimeStamp;
    },
    //获取完成的代办数
    completeList() {
      let complete = [];
      // complete.set("数字", ["1", "2"]);
      for (let i = 0; i < 7; i++) {
        complete[i] = this.$store.state.todoListAll.filter((item) => {
          return (
            this.pastSevenDays[i] == item.timeStamp && item.isComplete == true
          );
        }).length;
      }
      console.log(complete);
      return complete;
    },
    //把时间戳转化为日期
    stampIntoDate() {
      let pastDate = [];
      for (let i = 0; i < 7; i++) {
        pastDate[i] =
          new Date(this.pastSevenDays[i]).getMonth() +
          1 +
          "." +
          new Date(this.pastSevenDays[i]).getDate();
      }
      // console.log(pastDate);
      return pastDate;
    },
  },
  methods: {
    drawedLine() {
      let statChart = echarts.init(document.getElementById("chart"));
      statChart.setOption({
        title: {
          text: "前七天已完成的代办数量统计：",
        },
        tooltip: {
          //提示组件
        },
        xAxis: {
          data: this.stampIntoDate,
        },
        yAxis: {
          data: [0, 2, 4, 6, 8, 10],
        },
        series: [
          {
            name: "时间",
            type: "line",
            data: this.completeList,
          },
        ],
      });
    },
  },
};
</script>

<style>
</style>