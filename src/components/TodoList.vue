<template>
  <div class="list">
    <v-list>
      <v-list-item-group color="primary">
        <v-list-item
          v-for="(record, i) in items"
          :key="`litem-${i}`"
          class="mb-1"
        >
          <v-list-item-icon class="mr-4" @click="updateItem(record)">
            <v-icon v-text="record.icon" color="primary"></v-icon>
          </v-list-item-icon>

          <v-divider vertical class="mr-4"></v-divider>

          <v-list-item-content @click="changeEditMode(i)">
            <v-list-item-title @input="saveText($event, record)" >
              {{ record.text }}
            </v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon v-if="editMode && i === editRecordIndex - 1" class="mr-4 danger-delete" @click="editItem(record)">
            <v-icon>mdi-file-document-edit-outline</v-icon>
          </v-list-item-icon>

          <!--
          <v-list-item-icon v-if="editMode && i === editRecordIndex - 1" class="mr-4 danger-delete" @click="deleteItem(record.id)">
            <v-icon>mdi-close-circle-outline</v-icon>
          </v-list-item-icon>
          -->

        </v-list-item>
      </v-list-item-group>
    </v-list>
    <EditForm v-if="showForm" :active="showForm" :record="selectedRecord" @hide="hideForm" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import EditForm from "@/components/EditForm";

export default {
  name: "TodoList",
  components: {
    EditForm
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      editMode: false,
      editRecordIndex: null,
      showForm: false,
      selectedRecord: null
    };
  },
  methods: {
    ...mapActions(["updateRecord", "deleteRecordById"]),
    updateItem(record) {
      const rec = record;
      rec.done = !record.done;
      this.updateRecord(record);
    },
    deleteItem(id) {
      this.deleteRecordById(id);
      this.editMode = false
      this.editRecordIndex = null
      this.showForm = false 
    },
    changeEditMode(index) {        
      (this.editRecordIndex === index + 1) ? this.editMode = !this.editMode : this.editMode = true
      this.editRecordIndex = index + 1;  
      this.showForm = false 
    },
    editItem(record) {
      this.showForm = !this.showForm
      this.selectedRecord = record
    },
    hideForm() {
      this.showForm = false
      this.editMode = false
      this.editRecordIndex = null
    },
    saveText(event, record) {
      const newText = event.target.innerHTML;
      // eslint-disable-next-line
      const {text, ...rest} = record;
      const updated = {text: newText, ...rest}
      console.log("saveText", updated)
    }
  },
};
</script>
<style scoped>
/* https://daneden.github.io/animate.css */
/* @import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1"; */

.list {
  background: #fff;
}
.list ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.danger-delete:hover {
  color: red;
}
</style>
