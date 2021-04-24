const state = {
  activeProject: null
}

const getters = {
  getActiveProject(state) {
    return state.activeProject;
  }
}

const mutations = {
  setActiveProject(state, activeProject) {
    state.activeProject = activeProject;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
};