<template>
  <div class="todo-content">
    <div v-if="todoListAll.length">
      <div class="todo-list" v-for="(item, index) in todoListAll" :key="index">
        <div class="todo-left">
          <check-box
            class="check"
            :class="{ checked: item.isComplete == true }"
            @isChecked="judgeComplete(item)"
          ></check-box>
          <div class="todo-main">
            <div class="todo-text">{{ item.content }}</div>
            <!-- <div class="setTime"></div> -->
          </div>
        </div>
        <div class="icon-right" v-if="item.isComplete == false">
          <button class="edit-btn" @click="editTodo('todo', item)">edit</button>
          <button class="del-btn" @click="removeTodo(item)">del</button>
        </div>
      </div>
    </div>
    <div v-else class="null">
      <p>今天的你还没有创建任何计划哦！</p>
    </div>
  </div>
</template>

<script>
import CheckBox from "./CheckBox";
export default {
  name: "TodoList",
  components: {
    CheckBox,
  },
  computed: {
    //从store中获取数据
    todoListAll() {
      let that = this;
      return this.$store.state.todoListAll.filter((item) => {
        return item.timeStamp == that.selectTimestamp;
      });
    },
    selectTimestamp() {
      return this.$store.state.selectTimestamp;
    },
    oldValue() {
      return this.$store.state.oldValue;
    },
  },

  methods: {
    editTodo(type, list) {
      this.$emit("edit-item", {
        type,
        list,
      });
    },
    removeTodo(list) {
      this.$store.commit("removeItem", {
        type: "todo",
        list,
      });
    },
    updateSelect() {
      this.$store.commit();
    },
    //判断是否完成
    judgeComplete(item) {
      item.isComplete = !item.isComplete;
      this.$store.commit("judgeComplete", item.timeStamp);
    },
  },
};
</script>

<style scoped>
button {
  background: none;
  border: none;
}
.todo-content {
  position: relative;
  margin-top: 1.3rem;
  min-width: 44.5rem;
  height: 32rem;
  overflow: hidden;
}
/* 每个任务 */
.todo-list {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  border: 2px solid #fff;
  border-radius: 10px;
  margin-top: 0.5rem;
}
.todo-left {
  display: flex;
  align-items: center;
}
.todo-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 4rem;
}
.todo-text {
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 600;
  letter-spacing: 0;
}
.icon-right {
  position: absolute;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-shrink: 0;
  margin-left: 22rem;
  width: 24rem;
  height: 4rem;
  opacity: 0;
  transition: 0.4s ease-in-out;
}
.todo-list > .icon-right:hover {
  opacity: 1;
}
.icon-right button {
  align-items: center;
  padding: 0.8rem 2rem;
  border-radius: 2rem;
  font-weight: 700;
  font-size: 1rem;
  color: #fff;
}
.edit-btn {
  background: #4ec9b0;
  margin-right: 0.5rem;
}
.del-btn {
  background: #e7a731;
}
.null {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 31.5rem;
  background: var(--theme1);
  border: 2px solid #fff;
  border-radius: 10px;
}
.null > p {
  font-size: 2rem;
}
</style>