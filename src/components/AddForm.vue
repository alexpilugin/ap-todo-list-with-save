<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="text"
      :counter="numCharacters"
      :rules="[rules.blank, rules.minLength, rules.maxLength]"
      label="Add a new record"
      required
      clearable
      @keydown.enter.prevent="validateAddNew"
    ></v-text-field>
  </v-form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AddForm",
  data: () => ({
    valid: true,
    numCharacters: 40,
    text: "",
    rules: {
      required: str => !!str || "Text is required",
      blank: str => !str || str && str.length > 0 && !!str.trim() || 'Value cannot be blank', 
      minLength: str => !str || str && str.length >= 5 || `It must be at least ${5} characters`,
      maxLength: str => !str || str && str.length <= 40 || `It may not be greater than ${40} characters.`,
    }
  }),
  methods: {
    ...mapActions(["addRecord"]),
    validateAddNew() {
      if (this.$refs.form.validate()) {
        this.$nextTick(function () {
          if(this.text && this.text.trim() !== "") {
            this.addRecord(this.text.trim());
          }
          this.$refs.form.reset()
          this.valid = true
        })
      }
    }
  },
};
</script>