import Vue from "vue";
import Vuex from "vuex";
import uuidv4 from "uuid/v4"

let devMode = process.env.NODE_ENV === 'development';

Vue.use(Vuex);

//Event names:
const EVENTS = {
  ADD_RECORD: 'ADD_RECORD',
  DELETE_RECORD_BY_ID: 'DELETE_RECORD_BY_ID',
  UPDATE_RECORD: 'UPDATE_RECORD',
  CHANGE_LIST: 'CHANGE_LIST',
  CLEAR_RECORDS: 'CLEAR_RECORDS',
  LOAD_DATA: 'LOAD_DATA'
}

function sortByTimestamp(a, b) {
  return a.timestamp - b.timestamp;
}

/*
function getIcon(text) {
  const first = text.toLowerCase()[0]
  const isLetter = /^[a-zA-Z]+$/.test(first);
  return isLetter ? `mdi-alpha-${ first }-circle-outline` : "mdi-checkbox-multiple-blank-circle-outline"
}
*/
function getBlankIcon() {
  return "mdi-checkbox-multiple-blank-circle-outline"
}
function getCompletedIcon() {
  return "mdi-checkbox-multiple-marked-circle"
}

export default new Vuex.Store({
  state: {
    todoRecords: [],
    showCompletedList: false,
  },
  getters: {
    getRecords:(state) => state.todoRecords,
    getActive: (state) => {
      const records = state.todoRecords;
      if (records && records.length > 0) {
        return records.filter(rec => rec.done === false)
      } else return []
    },
    getCompleted: (state) => {
      const records = state.todoRecords;
      if (records && records.length > 0) {
        return records.filter(rec => rec.done === true)
      } else return []
    },
    isCompletedListVisible: (state) => state.showCompletedList
  },
  mutations: {
    [EVENTS.ADD_RECORD]: (state, text) => {
      // { text: "My Files", icon: "mdi-alpha-a-circle-outline" },
      state.todoRecords.push({
        id: uuidv4(),
        timestamp: new Date().getTime(),
        text: text,
        icon: getBlankIcon(),
        done: false
      })
      state.todoRecords.sort(sortByTimestamp)
    },
    [EVENTS.DELETE_RECORD_BY_ID]: (state, id) => {
      let records = state.todoRecords;
      const removeIndex = records.map(item => item.id).indexOf(id);
      ~removeIndex && records.splice(removeIndex, 1);
      /*
      ~ 'tilde' - Bitwise NOT operator used right before an indexOf() to do a boolean check  
      */
    },
    [EVENTS.UPDATE_RECORD]: (state, record) => {
      // eslint-disable-next-line
      let records = state.todoRecords;
      const id = record.id
      const rec = record
      rec.icon = record.done ? getCompletedIcon() : getBlankIcon()
      records = [
        ...records.filter(r => r.id !== id),
        rec
      ]
    },
    [EVENTS.CHANGE_LIST]: (state, ) => {
      state.showCompletedList = !state.showCompletedList 
    },
    [EVENTS.LOAD_DATA]: (state, jsonData) => {
      state.todoRecords =  jsonData.records
    },
    [EVENTS.CLEAR_RECORDS]: (state, isDone) => {
      state.todoRecords = state.todoRecords.filter(r => r.done !== isDone)
    }
  },
  actions: {
    addRecord: (context, text) => {
      if (devMode) console.log("Action: addRecord", text);
      context.commit(EVENTS.ADD_RECORD, text)
    },
    deleteRecordById: (context, id) => {
      if (devMode) console.log("Action: deleteRecordById");
      context.commit(EVENTS.DELETE_RECORD_BY_ID, id)
    },
    updateRecord: (context, record) => {
      if (devMode) console.log("Action: updateRecord");
      context.commit(EVENTS.UPDATE_RECORD, record)
    },
    showCompleted: (context) => {
      if (devMode) console.log("Action: showCompleted");
      context.commit(EVENTS.CHANGE_LIST)
    },
    reload: (context, jsonFile) => {
      if (devMode) console.log("Action: reload");
      context.commit(EVENTS.LOAD_DATA, jsonFile)
    },
    clearRecords: (context, done) => {
      if (devMode) console.log("Action: clearRecords", done);
      context.commit(EVENTS.CLEAR_RECORDS, done)
    }
  },
  modules: {}
});