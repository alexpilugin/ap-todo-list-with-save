<template>
  <button
    class="save-btn v-btn v-btn--outlined theme--dark v-size--small mx-2"
    @click.stop="save"
  >
    <span>Save</span>
  </button>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "SaveButton",
  computed: {
  ...mapState(["todoRecords"])
  },
  methods: {
    save() {
      console.log("Save Button clicked");
      const records = this.todoRecords;
      const fileName = `Todo-${this.getRandomString()}.todo`
      const doc = {
        meta: {
          appVersion: "1.0",
          author: "Alex Pilugin",
          manufacturer: "AP-TO-DO-LIST",
          timestamp: new Date().getTime(),
          fileName: fileName
        },
        records: records
      }
      //const jsonFile = "data:application/json;charset=utf8;base64," + window.btoa(JSON.stringify(data));
      const jsonFile = JSON.stringify(doc);
      this.saveDocument(jsonFile, fileName);
    },
    saveDocument(data, filename) {
      var blob = new Blob([data], { type: 'octet/stream' });

      //IE 10+
      if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob, filename);
      }
      else {
        //Everything else
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.href = url;
        a.download = filename;

        setTimeout(() => {
          //setTimeout hack is required for older versions of Safari

          a.click();

          //Cleanup
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }, 1);
      }
    },
    getRandomString: function (len) {
      let l = len || 8;
      var text = "id";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < l; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    },
  },
};
</script>