<template>
  <input
    class="input-data"
    type="text"
    v-model="text"
  />
</template>

<script>
export default {
  name: "RecordEditor",
  props: {
    defaultText: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      text: ""
    }
  },
  created() {
    this.text = this.defaultText
  }
}
</script>

<style scoped>
input[type="text"].input-data {
  outline: none;
  background: transparent;
  border: none;
  margin-left: 10px;
  color: red;
  width: 100%;
}
</style>