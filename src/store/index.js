import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const SUBMIT_REQUEST = 'SUBMIT_REQUEST'
const SUBMIT_SUCCESS = 'SUBMIT_SUCCESS'
const SUBMIT_FAILURE = 'SUBMIT_FAILURE'

export default new Vuex.Store({
  state: {
    loading: false,
    alertMsg: '',
    alertType: '',
  },
  // MUTATIONS CALLED SYCHORNOUSLY
  mutations: {
    [SUBMIT_REQUEST](state) {
      state.loading = true
    },
    [SUBMIT_SUCCESS](state) {
      state.alertMsg = 'Submission Successful'
      state.alertType = 'success'
      state.loading = false
    },
    [SUBMIT_FAILURE](state) {
      state.alertMsg = 'Submission Failed'
      state.alertType = 'error'
      state.loading = false
    },
  },
  // ACTIONS CALLED ASYCHORNOUSLY
  actions: {
    async submitApplication({ commit }, postData) {
      commit(SUBMIT_REQUEST)
      try {
        const payload = await httpPost('', postData)
        commit(SUBMIT_SUCCESS)
      } catch (e) {
        console.log(e)
        commit(SUBMIT_FAILURE)
      }
    },
  },
  modules: {},
})

const httpPost = async (apiEndpoint, postData) => {
  await axios({
    method: 'POST',
    url: apiEndpoint,
    data: postData,
    config: { headers: { 'Content-Type': 'application/json' } },
  })
}
