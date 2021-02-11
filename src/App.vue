<template>
  <v-app>
    <Navbar />
    <v-main>
      <v-container>
        <v-subheader class="display-1 ml-0 pl-0" color="primary--text">
          <span class="mode-switcher" @click.stop="changeMode">
            {{ isCompletedListVisible ? "Completed List" : "Active List" }}
          </span>
          <v-btn
            icon
            medium
            class="mx-4"
            @click="clearList(isCompletedListVisible)"
          >
            <v-icon>mdi-close-circle-multiple-outline</v-icon>
          </v-btn>
        </v-subheader>
        <AddForm v-if="!isCompletedListVisible" />
        <TodoList v-if="isCompletedListVisible" :items="getCompleted" />
        <TodoList v-if="!isCompletedListVisible" :items="getActive" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
/* eslint-disable */ // ignore all warnings in a file

import Navbar from "@/components/Navbar";
import TodoList from "@/components/TodoList";
import AddForm from "@/components/AddForm";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",

  components: {
    Navbar,
    TodoList,
    AddForm,
  },
  computed: {
    ...mapGetters(["getActive", "getCompleted", "isCompletedListVisible"]),
  },
  methods: {
    ...mapActions(["showCompleted", "clearRecords"]),
    changeMode() {
      this.showCompleted();
    },
    clearList(done) {
      this.clearRecords(done);
    },
  },
};
</script>

<style scoped>
.mode-switcher {
  cursor: pointer;
}
</style>