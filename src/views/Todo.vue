<template>
  <div class="MyTodo">
    <div class="todo">
      <div class="todo-title">
        <h2>待办事项</h2>
        <div class="button-box">
          <button
            class="back-today"
            @click="backToday"
            v-show="todayTime !== selectedTime"
          >
            回到今天
          </button>
          <button class="new-todo" @click="openWindow('todo', 'create')">
            新建代办
          </button>
        </div>
      </div>
      <Calendar ref="calendar"></Calendar>
      <TodoList @edit-item="editItem"></TodoList>
    </div>
    <div class="overview">
      <div class="view-status">
        <div class="status-title">
          <h2>概览</h2>
        </div>
        <StatusBar></StatusBar>
        <div class="clockin">
          <div class="clockin-title">
            <div class="all-clockin">
              <h2>全部打卡</h2>
            </div>
            <button
              class="new-clockin"
              @click="openWindow('clockin', 'create')"
            >
              新建打卡
            </button>
          </div>
          <Clockin></Clockin>
        </div>

        <div></div>
      </div>
    </div>
    <NewToDo ref="newtodo"></NewToDo>
    <Popup ref="popup"></Popup>
  </div>
</template>

<script>
import Calendar from "../components/Calendar";
import TodoList from "../components/TodoList";
import NewToDo from "../components/newTodo";
import Popup from "../components/Popup";
import StatusBar from "../components/statustBar";
import Clockin from "../components/Clockin";
export default {
  name: "Todo",
  data() {
    return {
      today: {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate(),
      },
    };
  },
  computed: {
    todayTime() {
      return new Date(
        this.today.year,
        this.today.month,
        this.today.day
      ).valueOf(); //生成当日的时间戳
    },
    selectedTime() {
      return this.$store.state.selectTimestamp;
    },
  },
  methods: {
    backToday() {
      console.log("today" + this.todayTime);
      this.$refs.calendar.dayInit();
      this.$refs.calendar.calendarIsOpenv = false;
    },
    openWindow(type, action) {
      this.$refs.newtodo.openWindow(type, action);
    },
    editItem(value) {
      this.$refs.newtodo.openWindow(value.type, "edit", value.list);
    },
    noContentError() {
      return this.$refs.popup.openPopup("内容为空");
    },
    formatError() {
      return this.$refs.popup.openPopup("格式错误");
    },
  },
  components: {
    Calendar,
    TodoList,
    NewToDo,
    Popup,
    StatusBar,
    Clockin,
  },
};
</script>

<style scoped>
button {
  background: none;
  border: none;
}
.MyTodo {
  display: flex;
}
.todo {
  display: flex;
  flex-direction: column;
  width: 47.2rem;
  margin-top: 1rem;
}
.todo-title {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 50rem;
}
.back-today {
  margin-right: 1rem;
  padding: 0.5rem 2rem;
  background-color: #fff;
  border-radius: 2rem;
  color: black;
}
.new-todo {
  padding: 0.5rem 4rem;
  background: #569cd6;
  color: #fff;
  border-radius: 2rem;
  margin-right: 3rem;
}
.overview {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin: 0 1rem;
}
.view-status {
  display: flex;
  flex-direction: column;
  width: 30rem;
}
.status-title {
  display: flex;
  height: 4rem;
}
.clockin {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin: 1rem;
}
.clockin-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.new-clockin {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7rem;
  height: 2rem;
  color: #fff;
  background: #569cd6;
  padding: 0.5rem 1.5rem;
  border-radius: 2rem;
}
.all-clockin {
  display: flex;
  align-items: center;
  margin-right: 13rem;
}
.new-clockin {
  display: flex;
  align-items: center;
}
</style>