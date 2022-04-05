<template>
  <transition name="pop">
    <div class="popup" v-if="isShow">
      <p>哒咩呦! {{ info }}</p>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Popup",
  data() {
    return {
      info: "",
      isShow: false,
    };
  },
  methods: {
    openPopup(info) {
      this.isShow = true;
      this.info = info;
      setTimeout(this.closePopup, 1000);
    },
    closePopup() {
      this.isShow = false;
    },
  },
};
</script>

<style>
@keyframes animPop {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes animPopr {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.pop-enter-active {
  animation: animPop 0.5s ease-in-out;
}
.pop-leave-active {
  animation: animPopr 0.5s ease-in-out;
}

.popup {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -2rem;
  left: -42rem;
  height: 2rem;
  width: 25rem;
  color: #000;
  border: 0;
  border-radius: 5px;
  background: #e27083;
}
</style>