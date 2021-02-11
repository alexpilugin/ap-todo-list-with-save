<template>
  <div class="loader mx-2">
    <button class="load-button v-btn v-btn--outlined theme--dark v-size--small">
      <label for="doc-load">Open</label>
    </button>
    <input id="doc-load" ref="file" type="file" class="not-printed" @change.stop="load" />
  </div>
</template>

<script>
import { mapActions } from "vuex";

  export default {
    name: 'LoadButton',
    methods: {
      ...mapActions(["reload"]),
      load(e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        var file = files[0];
        var reader = new FileReader();
        reader.onload = (e) => {
          let textFile = e.target.result;
          try {
            let jsonData = JSON.parse(textFile);
            if(jsonData.meta.manufacturer == "AP-TO-DO-LIST") {
              this.$emit('loaded', jsonData)
              this.reload(jsonData)
            }
            this.$refs.file.value = '';
          } catch (err) {
            console.error(err)
          }
        }

        reader.readAsText(file);
      }
    }
  }
</script>

<style scoped>
.load-button {
  z-index: 10;
  cursor: pointer;
}
input[type="file"] {
  display: none;
}
</style>