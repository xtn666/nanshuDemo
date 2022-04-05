<template>
  <div class="calendar-box">
    <div class="box" :class="{ isOpen: calendarIsOpen }">
      <div class="body" :class="{ isOpen: calendarIsOpen }">
        <div class="calender-title">
          <div class="left-arrow" @click="handlePreMonth"></div>
          <div class="text">
            {{ year + "年" + (month + 1) + "月" + day + "日" }}
          </div>
          <div class="right-arrow" @click="handleNextMonth"></div>
        </div>
        <div class="calender">
          <div
            class="time"
            v-for="item in calendar"
            :key="item.id"
            @click="selectDay(item)"
          >
            <span class="timeLine" :class="{ selected: highlight == item.id }">
              <!--当highlight==index为真引用这个样式-->
              {{ item.content }}</span
            >
          </div>
        </div>
      </div>
      <div class="week" :class="{ isOpen: calendarIsOpen }">
        <span class="week-title" v-for="week in Week" :key="week.id">{{
          week
        }}</span>
      </div>
      <div
        class="calendar-button"
        @click="switchBox"
        :class="{ isOpen: calendarIsOpen }"
      ></div>
    </div>
  </div>
</template>

<script>
import { time } from "./time";
export default {
  mixins: [time],
  data() {
    return {
      list: [],
      Week: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      highlight: null,
      calendarIsOpen: false,
      declaration: document.styleSheets[1].cssRules[0].style,
    };
  },
  mounted() {
    this.dayInit();
    this.declaration.setProperty("--calendar-1", this.boxDisPlaceMent);
  },

  computed: {
    boxDisPlaceMent() {
      return parseInt(this.highlight / 7);
    },
    selectTime() {
      console.log(
        "选中了" + new Date(this.year, this.month, this.day).valueOf()
      );
      return new Date(this.year, this.month, this.day).valueOf();
    },
  },
  methods: {
    switchBox() {
      this.calendarIsOpen = !this.calendarIsOpen;
    },
    handlePreMonth() {
      if (this.month === 0) {
        this.year = this.year - 1;
        this.month = 11;
      } else {
        this.month = this.month - 1;
      }
      this.day = 1;
      this.highlight = this.targetDay;
      this.$store.commit("updateSelected", this.selectTime);
    },
    handleNextMonth() {
      if (this.month === 11) {
        this.year = this.year + 1;
        this.month = 0;
      } else {
        this.month = this.month + 1;
      }
      this.day = 1;
      this.highlight = this.targetDay;
      this.$store.commit("updateSelected", this.selectTime);
    },
    //选中 的日期
    selectDay(item) {
      this.year = item.year;
      this.month = item.month;
      this.day = item.content;
      this.highlight = this.day + this.targetDay - 1;
      this.$store.commit("updateSelected", this.selectTime);
    },
    dayInit() {
      this.year = new Date().getFullYear();
      this.month = new Date().getMonth();
      this.day = new Date().getDate();
      this.highlight = this.day + this.targetDay - 1;
      const today = {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate(),
      };
      this.$store.commit(
        "updateSelected",
        new Date(today.year, today.month, today.day).valueOf()
      );
    },
  },
};
</script>

<style scoped>
:root {
  --calendar-1: 0;
}

.box {
  position: relative;
  top: 1rem;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 47rem;
  height: 8rem;
  padding-bottom: 1rem;
  border: 2px solid #fff;
  background: #b5b6b9;
  border-radius: 10px;
  transition: 0.6s ease-in-out;
}
.body {
  position: relative;
  top: calc((var(--calendar-1) * 6rem+3rem) * -1);
  width: 47rem;
  height: 38.5rem;
  transition: 0.6s ease-in-out;
}
.calender {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0.5rem;
}

.calender-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left-arrow,
.right-arrow {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1rem;
  width: 1rem;
  border: 0.1rem solid #666;
  /* margin: rem; */
}
.left-arrow {
  margin-left: 4rem;
}
.right-arrow {
  margin-right: 4rem;
}
.week {
  z-index: 3;
  position: absolute;
  height: 2.8rem;
  width: 45rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  background: #b5b6b9;
  transition: 0.6s ease-in-out;
}
.week-title {
  flex-shrink: 0;
  display: flex;
  color: #fff;
  font-size: 1rem;
  margin: 2rem;
}
.time {
  display: inline-flex;
  flex-direction: column;
}
.timeLine {
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: 2rem;
  background: var(--theme0);
  line-height: 4rem;
  margin: 1rem;
}
.selected {
  background: #666;
  color: var(--theme0);
}
.calendar-button {
  position: absolute;
  top: 7rem;
  background: rgba(61, 60, 60, 0.281);
  width: 3.5rem;
  height: 0.6rem;
  border-radius: 0.6rem;
}
.body.isOpen {
  margin-top: 11rem;
}
.box.isOpen {
  z-index: 2;
  min-width: 44.5rem;
  height: 44rem;
  overflow: visible;
}
.week.isOpen {
  top: 5.5rem;
  background: rgb(0, 0, 0, 0);
  z-index: -1;
}
.calendar-button.isOpen {
  top: 0.2rem;
}
</style>