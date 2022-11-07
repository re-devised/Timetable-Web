import Consola from "consola";

export const state = () => {
  return {
    days: []
  };
};

export const actions = {
  fetchDays({ commit, state }) {
    return this.$axios
      .$get(`api/day`)
      .then(days => {
        commit("setDays", days);
      })
      .catch(error => Promise.reject(error));
  },
  createDay({ commit, state }, data) {
    return this.$axios
      .$post("/api/day", data)
      .then(day => {
        commit("pushDay", day)
      })
      .catch(error => Promise.reject(error));
  },
  updateDay({ commit, state }, [dayId, updateData]) {
    return this.$axios
      .$put(`/api/day/${dayId}`, updateData)
      .then(day => {
        commit("replaceDay", day);
      })
      .catch(error => Promise.reject(error));
  },
  deleteDay({ commit, state }, dayId) {
    return this.$axios
      .$delete(`/api/day/${dayId}`)
      .then(day => {
        commit("removeDay", day);
      })
      .catch(error => Promise.reject(error));
  }
};

export const mutations = {
    setDays(state, days){
      state.days = days
    },
    pushDay(state, day){
      state.days.push(day)
    },
    replaceDay(state, day) {
      var openedDayIndex = state.days.findIndex(c => c._id == day._id)
      if (openedDayIndex != -1) Object.assign(state.days[openedDayIndex], day)
    },
    removeDay(state, day) {
      var openedDayIndex = state.days.findIndex(c => c._id == day._id)
      if (openedDayIndex != -1) state.days.splice(openedDayIndex, 1)
    }
};
