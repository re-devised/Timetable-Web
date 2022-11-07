import Consola from "consola";

export const state = () => {
  return {
    subjects: []
  };
};

export const actions = {
  fetchSubjects({ commit, state }) {
    return this.$axios
      .$get(`api/subject`)
      .then(subjects => {
        commit("setSubjects", subjects);
      })
      .catch(error => Promise.reject(error));
  },
  createSubject({ commit, state }, data) {
    return this.$axios
      .$post("/api/subject", data)
      .then(subject => {
        commit("pushSubject", subject);
      })
      .catch(error => Promise.reject(error));
  },
  updateSubject({ commit, state }, [subjectId, updateData]) {
    return this.$axios
      .$put(`/api/subject/${subjectId}`, updateData)
      .then(subject => {
        commit("replaceSubject", subject);
      })
      .catch(error => Promise.reject(error));
  },
  deleteSubject({ commit, state }, subjectId) {
    return this.$axios
      .$delete(`/api/subject/${subjectId}`)
      .then(subject => {
        commit("removeSubject", subject);
      })
      .catch(error => Promise.reject(error));
  }
};

export const mutations = {
  setSubjects(state, subjects) {
    state.subjects = subjects;
  },
  pushSubject(state, subject) {
    state.subjects.push(subject);
  },
  replaceSubject(state, subject) {
    var openedSubjectIndex = state.subjects.findIndex(c => c._id == subject._id);
    if (openedSubjectIndex != -1) Object.assign(state.subjects[openedSubjectIndex], subject)
  },
  removeSubject(state, subject) {
    var openedSubjectIndex = state.subjects.findIndex(c => c._id == subject._id);
    if (openedSubjectIndex != -1) state.subjects.splice(openedSubjectIndex, 1)
  }
};
