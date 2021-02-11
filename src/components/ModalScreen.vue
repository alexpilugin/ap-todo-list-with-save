<template>
  <div class="modal" v-if="show">
    <div class="modal-background" />
    <div class="modal-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalScreen",
  props: ["active"],
  data() {
    return {
      show: false
    };
  },
  created() {
    this.show = this.active;
  },
  watch: {
    active(value) {
      this.show = value;
    }
  }
};
</script>

<style scopped>
.modal {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  overflow: hidden;
  position: fixed;
  z-index: 20;
}
.modal-background {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  background-color: rgba(10, 10, 10, 0.75);
}
.modal-content,
.modal-card {
  margin: 0 20px;
  overflow: auto;
  position: relative;
}
.box {
  background-color: white;
  border-radius: 5px;
  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.1);
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  color: #4a4a4a;
  display: block;
  padding: 1.25rem;
}
</style>
