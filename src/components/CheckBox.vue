<template>
  <div class="isComplete" @click="$emit('isChecked')">
    <div class="bk"></div>
    <div class="tick"></div>
  </div>
</template>

<script>
export default {
  name: "CheckBox",
  data() {
    return {};
  },
};
</script>

<style>
.isComplete {
  position: relative;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  height: 2rem;
  width: 2rem;
  border-radius: 2rem;
  margin: 0 1rem;
  border: 2px solid #fff;
  background: rgba(0, 0, 0, 0);
  overflow: hidden;
}
.tick {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 0.6rem;
  width: 1.2rem;
  top: 0.45rem;
  left: 0.25rem;
  border: 3px solid #fff;
  border-top: 0;
  border-right: 0;
  transform: rotateZ(-45deg);
  opacity: 0;
  transition: 0.3s ease-in-out;
}
.bk {
  position: absolute;
  height: 100%;
  width: 100%;
  background: var(--theme0);
  transform: scale(0);
  transition: 0.2s ease-in-out;
}
.isComplete.checked > .bk {
  transform: scale(1);
}
.isComplete.checked > .tick {
  opacity: 1;
}
</style>