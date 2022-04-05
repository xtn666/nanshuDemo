<template>
  <div class="clockin">
    <div class="box">
      <div class="clock-content" v-if="clockInList.length">
        <div
          class="clock-list"
          v-for="(item, index) in clockInList"
          :key="index"
          :class="{ isAnim: item.flag }"
          @click="removeclock(item)"
        >
          <div class="clock-main">
            <div class="clock-text">{{ item.content }}</div>
            <div class="removepop">点击进行取消打卡哦</div>

            <!-- <div class="setTime"></div> -->
          </div>
        </div>
      </div>
      <div class="clock-null" v-else>
        你今天还没有新建任何打卡任务哦{{ clockInList.length }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Clockin",
  data() {
    return {};
  },
  computed: {
    selectTimestamp() {
      // console.log(this.$store.state.selectTimestamp);
      return this.$store.state.selectTimestamp;
    },
    clockInList() {
      let that = this; //在箭头函数当中 this的指向代表的是调用者的this，并不一定是指向vue实例的！！！
      // console.log(0);
      return this.$store.state.clockInList.filter((item) => {
        return item.timeStamp == that.selectTimestamp;
      });
      // return [{ content: "in" }];
    },
  },
  methods: {
    removeclock(item) {
      item.flag = true;
      let that = this;
      setTimeout(() => {
        that.$store.commit("removeItem", {
          type: "clockin",
          item,
        });
      }, 1100);
    },
  },
};
</script>

<style>
@keyframes anim1 {
  0% {
    opacity: 1;
  }
  75% {
    opacity: 0.6;
    transform: rotateX(360deg);
  }
  100% {
    opacity: 0;
    transform: translateY(50px);
  }
}
.clock-list.isAnim {
  animation: anim1 1.2s ease-in-out;
}
.clock-null {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  color: #666;
  height: 18rem;
  width: 28rem;
  border: 2px solid #e7a731;
  border-radius: 10px;
}

.clock-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 18rem;
}
.clock-list {
  display: flex;
  align-items: center;
  width: 28rem;
  height: 3rem;
  border-radius: 10px;
  border: 2px solid #fff;
  margin-top: 0.5rem;
  overflow: hidden;
}
.clock-main {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transform-style: preserve-3d;
  transition: 0.5s ease-in-out;
  height: 3rem;
  width: 28rem;
  top: 0;
}
.clock-text {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  transform: translateZ(1.5rem);
}
.removepop {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background: var(--theme0);
  text-align: center;
  transform: translateY(1.5rem) rotateX(-90deg);
}
.clock-main:hover {
  transform: rotateX(90deg);
}
</style>