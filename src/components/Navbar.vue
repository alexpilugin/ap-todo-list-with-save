<template>
  <v-app-bar app color="primary" dense flat dark>
    <v-app-bar-title>
        <span>To-Do List</span>
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn v-if="!isCompletedListVisible" text small @click="onClick">
      <span class="hidden-sm-and-down mr-2">Show Completed</span>
      <v-icon>mdi-checkbox-multiple-marked-circle</v-icon>
    </v-btn>
    <v-btn v-else text small @click="onClick">
      <span class="hidden-sm-and-down mr-2">Show Active</span>
      <v-icon>mdi-checkbox-multiple-blank-circle-outline</v-icon>
    </v-btn>
    <LoadButton />
    <SaveButton />
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import LoadButton from "@/components/LoadButton";
import SaveButton from "@/components/SaveButton";

export default {
  name: "Navbar",
  components: {
    LoadButton,
    SaveButton
  },
  computed: {
    ...mapGetters([
      "isCompletedListVisible"
    ]),
  },
  methods: {
    ...mapActions(["showCompleted"]),
    onClick() {
      this.showCompleted()
    }
  }
};
</script>

<style>
</style>