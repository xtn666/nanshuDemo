<template>
  <div>
    <transition name="mask">
      <div class="mask" v-if="isOpenWindow"></div>
    </transition>
    <transition name="todo">
      <div class="todo-window" v-if="isOpenWindow">
        <div class="w-header">
          <div class="title">
            <h2>{{ windowMode.title }}</h2>
            <div class="button-box">
              <button class="cancel-btn" @click="closeWindow">取消</button>
              <button
                class="confirm-btn"
                @click="saveInput(windowMode.settingType)"
              >
                确定
              </button>
            </div>
          </div>
          <textarea
            class="text-body"
            placeholder="写下你的计划叭"
            v-model="input.inputContent"
          >
          </textarea>
        </div>
        <div class="w-footer">
          <div class="set-time">设置定时</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "newtodo",
  data() {
    return {
      isOpenWindow: false,
      isSettingTime: false,
      windowMode: "",
      editMode: false,
    };
  },
  computed: {
    todoListAll() {
      return this.$store.state.todoListAll;
    },
    input() {
      return this.$store.state.input;
    },
    oldValue() {
      return this.$store.state.oldValue;
    },
    selectTimestamp() {
      return this.$store.state.selectTimestamp;
    },
  },
  methods: {
    openWindow(type, action, oldValue) {
      this.isOpenWindow = !this.isOpenWindow;
      this.windowMode = {
        title: type == "todo" ? "新建待办" : "新建打卡",
        settingType: type,
      };
      if (action == "edit") {
        this.editMode = true;
        if (type == "todo") {
          this.$store.commit("editItem", {
            type: "todo",
            oldValue,
          });
        }
      }
    },
    closeWindow() {
      this.isOpenWindow = !this.isOpenWindow;
    },
    //保存数据更新代办事项的时间戳
    saveInput(type) {
      console.log(type);
      if (this.input.inputContent) {
        if (this.inputIsEmpty(type)) {
          let msg = {
            isComplete: false,
            timeStamp: this.selectTimestamp,
            content: this.input.inputContent,
          };

          if (type == "todo") {
            this.saveNewTodo(msg);
            this.$store.commit("addPastDaysTimeStamp");
          } else if (type == "clockin") {
            this.saveNewClock({
              timeStamp: this.selectTimestamp,
              content: this.input.inputContent,
              flag: false,
            });
          }
          this.$store.commit("clearInput");
          this.isOpenWindow = false;
        }
      } else {
        return this.$parent.noContentError();
      }
    },

    //是否有时间输入框是否为空白
    inputIsEmpty(type) {
      let value = false;
      if (type == "todo") {
        value = !this.isSettingTime;
      } else if (type == "clockin") {
        value = true;
      }
      // console.log(value);
      return value;
    },

    //存储数据提交到store
    saveNewTodo(msg) {
      // console.log(msg);
      if (this.isSettingTime) {
        msg.hasSetting = this.isSettingTime;
      }
      if (!this.editMode) {
        this.$store.commit("createItem", {
          msg,
          type: "todo",
        });
      } else {
        this.$store.commit("updateItem", {
          msg,
          type: "todo",
        });

        this.editMode = false;
      }
    },
    saveNewClock(msg) {
      console.log(msg);
      this.$store.commit("createItem", { msg, type: "clockin" });
    },
  },
};
</script>

<style scoped>
/* 动画过渡 */
@keyframes mask-anim {
  0% {
    background: rgba(0, 0, 0, 0);
  }
  100% {
    background: rgba(0, 0, 0, 0.4);
  }
}
@keyframes todo-anim {
  0% {
    opacity: 0;
    top: (50% - 5rem);
  }
  100% {
    opacity: 1;
    top: (50% - 12rem);
  }
}

.todo-enter-active {
  animation: todo-anim 0.4s ease-in;
}
.tood-leave-active {
  animation: todo-anim 0.6s ease-in reverse;
}
/* vue动画 */
.mask-enter-active {
  animation: mask-anim 0.4s ease-in-out;
}
.mask-leave-active {
  animation: mask-anim 0.6s ease-in-out reverse;
}

button {
  background: none;
  border: none;
}
.mask {
  z-index: 99;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 84rem;
  background-color: rgba(0, 0, 0, 0.4);
}
.todo-window {
  z-index: 100;
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: space-between;
  left: calc(50% - 26rem);
  top: calc(50% - 12rem);
  height: 23rem;
  width: 48rem;
  padding: 1rem;
  border-radius: 10px;
  background: var(--theme0);
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 1rem;
}

.text-body {
  display: flex;
  margin: 1rem 1rem;
  width: 100%;
  height: 15rem;
  border: 0;
  outline: none;
  resize: none;
  font-size: 1.5rem;
  background: rgba(0, 0, 0, 0);
  color: rgb(68, 67, 67);
}
.button-box {
  margin-right: 3rem;
}
.cancel-btn {
  color: rgb(68, 67, 67);
  font-weight: 600;
  font-size: 1.3rem;
  margin: 0 1rem;
}
.confirm-btn {
  color: rgb(4, 65, 4);
  font-weight: 600;
  font-size: 1.3rem;
}
.w-footer {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: -1rem 0 0 1rem;
}
.set-time {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>