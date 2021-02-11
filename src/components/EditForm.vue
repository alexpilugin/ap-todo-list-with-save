<template>
  <ModalScreen :active="active">
    <v-card elevation="2" tile class="pa-5 mx-auto" width="400">
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="text"
            :counter="numCharacters"
            :rules="[rules.blank, rules.minLength, rules.maxLength]"
            label="Edit text"
            required
            clearable
          ></v-text-field>
        </v-form>
        <v-layout>
          <v-flex class="text-right mt-5">
            <span>Status:</span>
            <v-btn text @click.stop="changeStatus()">
              <v-icon v-text="getIcon()" color="primary"></v-icon>
              <span v-if="isDone" class="ma-2">Done</span>
              <span v-if="!isDone" class="ma-2">Active</span>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-divider class="mx-4"></v-divider>

      <v-card-actions>
        <v-btn text @click.stop="deleteItem()" col="12" md="4">
          <v-icon color="red">mdi-close-circle-outline</v-icon>
          <span class="hidden-sm-and-down ma-2">Delete</span>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn text @click.stop="cancel()" col="12" md="4">
          <v-icon color="orange">mdi-undo-variant</v-icon>
          <span class="hidden-sm-and-down ma-2">Cancel</span>
        </v-btn>
        <v-btn text @click.stop="validateAndSave()" col="12" md="4">
          <v-icon color="success">mdi-content-save-outline</v-icon>
          <span class="hidden-sm-and-down ma-2">Save</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </ModalScreen>
</template>

<script>
import { mapActions } from "vuex";
import ModalScreen from "@/components/ModalScreen.vue";

export default {
  name: "EditForm",
  props: {
    record: {
      type: Object,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ModalScreen,
  },
  data: () => ({
    valid: true,
    numCharacters: 40,
    text: "",
    rules: {
      required: (str) => !!str || "Text is required",
      blank: (str) =>
        !str ||
        (str && str.length > 0 && !!str.trim()) ||
        "Value cannot be blank",
      minLength: (str) =>
        !str ||
        (str && str.length >= 5) ||
        `It must be at least ${5} characters`,
      maxLength: (str) =>
        !str ||
        (str && str.length <= 40) ||
        `It may not be greater than ${40} characters.`,
    },
    isDone: false,
  }),
  created() {
    if (this.record) {
      this.text = this.record.text;
      this.isDone = this.record.done;
    }
  },
  methods: {
    ...mapActions(["updateRecord", "deleteRecordById"]),
    cancel() {
      this.$emit("hide");
    },
    deleteItem() {
      this.deleteRecordById(this.record.id);
      this.$emit("hide");
    },
    validateAndSave() {
      if (this.$refs.form.validate()) {
        this.$nextTick(function () {
          if (this.text && this.text.trim() !== "") {
            const rec = this.record;
            rec.text = this.text;
            rec.done = this.isDone;
            this.updateRecord(rec);
            this.$emit("hide");
          }
          this.$refs.form.reset();
          this.valid = true;
        });
      }
    },
    changeStatus() {
      this.isDone = !this.isDone;
    },
    getIcon() {
      return this.isDone
        ? "mdi-checkbox-multiple-marked-circle"
        : "mdi-checkbox-multiple-blank-circle-outline";
    },
  },
};
</script>

<style scoped>
.model-edit {
  max-height: calc(50vh - 40px);
  max-width: calc(50vw - 40px);
}
</style>