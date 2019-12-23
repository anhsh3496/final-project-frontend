import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import axios from 'axios'

Vue.use(Vuex);
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8';

axios.defaults.baseURL = 'http://127.0.0.1:8080';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('accessToken') || null,
    tokenType: "Bearer ",
    currentProblem: localStorage.getItem('currentProblem') || null,
    currentProblemSolution: localStorage.getItem("currentProblemSolution") || null,
    userInfo: localStorage.getItem("userInfo") || null
  },
  getters: {
    loggedIn(state) {
      return state.token !== null;
    },
    isRoleMember: state => {
      return state.userInfo.role.includes("MEMBER");
    },
    isRoleAdmin(state) {
      return state.userInfo.role.includes("ADMIN");
    },
    getCurrentProblem(state) {
      return state.currentProblem;
    },
    getCurrentProblemSolution(state) {
      return state.currentProblemSolution;
    },
    getUserInfo(state) {
      return state.userInfo;
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    changeIsLogin(state, data) {
      state.isLogin = data;
    },
    setCurrentProblem(state, data) {
      state.currentProblem = data;
    },
    setCurrentProblemSolution(state, data) {
      state.currentProblemSolution = data;
    },
    setUserInfo(state, data) {
      state.userInfo = data;
    }
  },
  actions: {
    login(context, params) {
      return new Promise((resolve, reject) => {
        axios.post('/user/login', {
          username: params.username,
          password: params.password,
        })
          .then(response => {
            const token = response.data.accessToken

            localStorage.setItem("accessToken", token)
            context.commit("setToken", token);

            let userInfo = response.data.user;

            localStorage.setItem("userInfo", userInfo);
            context.commit("setUserInfo", userInfo);

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    logout(context) {
      if (context.getters.loggedIn) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("currentProblem");

        context.commit("setToken", null);
        context.commit("setUserInfo", null);
        context.commit("setCurrentProblem", null);
      }
    },
    register(context, params) {
      return new Promise((resolve, reject) => {
        axios.post('/user/register', {
          username: params.username,
          email: params.email,
          password: params.password,
        })
          .then(response => {
            const token = response.data.accessToken

            localStorage.setItem("accessToken", token)
            context.commit("setToken", token);

            let userInfo = response.data.user;

            localStorage.setItem("userInfo", userInfo);
            context.commit("setUserInfo", userInfo);

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    resetPassword(context, params) {
      console.log(params);
    },
    updateProfile(context, params) {
      axios.defaults.headers.common['Authorization'] = context.state.tokenType + context.state.token
      return new Promise((resolve, reject) => {
        axios.put('/user/update', {
          email: params.email,
          fullName: params.fullName,
          dateOfBirth: params.dateOfBirth,
          descriptions: params.descriptions,
        })
          .then(response => {
            let userInfo = response.data;

            localStorage.setItem("userInfo", userInfo);
            context.commit("setUserInfo", userInfo);

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    changePassword(context, params) {
      axios.defaults.headers.common['Authorization'] = context.state.tokenType + context.state.token
      return new Promise((resolve, reject) => {
        axios.post('/user/changepassword', {
          oldPassword: params.oldPassword,
          newPassword: params.newPassword
        })
          .then(response => {
            const token = response.data.accessToken;
            localStorage.setItem("accessToken", token)
            context.commit("setToken", token);
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getProblem(context, params) {
      axios.defaults.headers.common['Authorization'] = context.state.tokenType + context.state.token
      return new Promise((resolve, reject) => {
        axios.get('/problem/list/' + params.page + "/" + params.size)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getAllProblem(context, params) {
      axios.defaults.headers.common['Authorization'] = context.state.tokenType + context.state.token
      return new Promise((resolve, reject) => {
        axios.get('/problem/all/' + params.page + "/" + params.size)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getProblemById(context, params) {
      axios.defaults.headers.common['Authorization'] = context.state.tokenType + context.state.token
      return new Promise((resolve, reject) => {
        axios.get('/problem/list/' + params)
          .then(response => {
            localStorage.setItem('currentProblem', params);
            context.commit("setCurrentProblem", params);
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getUserSolutionByUser(context, params) {
      axios.defaults.headers.common['Authorization'] = context.state.tokenType + context.state.token
      return new Promise((resolve, reject) => {
        axios.get('/solution/problem/' + params.page + "/" + params.size)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getUserSolution(context, params) {
      axios.defaults.headers.common['Authorization'] = context.state.tokenType + context.state.token
      return new Promise((resolve, reject) => {
        axios.get('/solution/detail/' + params)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    saveUserSolution(context, params) {
      axios.defaults.headers.common['Authorization'] = context.state.tokenType + context.state.token
      return new Promise((resolve, reject) => {
        axios.post('/solution/save/', {
          languageId: params.languageId,
          problemId: params.problemId,
          sourceCode: params.sourceCode
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    submitUserSolution(context, params) {
      axios.defaults.headers.common['Authorization'] = context.state.tokenType + context.state.token
      return new Promise((resolve, reject) => {
        axios.post('/solution/submit/', {
          languageId: params.languageId,
          problemId: params.problemId,
          sourceCode: params.sourceCode
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getAllCategory(context, params) {
      axios.defaults.headers.common['Authorization'] = context.state.tokenType + context.state.token
      return new Promise((resolve, reject) => {
        axios.get('/category/all/' + params.page + "/" + params.size)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getListUserSolution(context, params) {
      axios.defaults.headers.common['Authorization'] = context.state.tokenType + context.state.token
      return new Promise((resolve, reject) => {
        axios.get('/solution/user/' + params.problem + "/" + params.page + "/" + params.size)
          .then(response => {
            localStorage.setItem('currentProblemSolution', params.problem);
            context.commit("setCurrentProblemSolution", params.problem);
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    createCategory(context, params) {
      axios.defaults.headers.common['Authorization'] = context.state.tokenType + context.state.token
      return new Promise((resolve, reject) => {
        axios.post('/category/create/', params)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    updateCategory(context, params) {
      axios.defaults.headers.common['Authorization'] = context.state.tokenType + context.state.token
      return new Promise((resolve, reject) => {
        axios.put('/category/update/', {
          id: params.id,
          name: params.name
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    createProblem(context, params) {
      axios.defaults.headers.common['Authorization'] = context.state.tokenType + context.state.token
      return new Promise((resolve, reject) => {
        axios.post('/problem/create/', params)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateProblem(context, params) {
      axios.defaults.headers.common['Authorization'] = context.state.tokenType + context.state.token
      return new Promise((resolve, reject) => {
        axios.put('/problem/update/', params)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  },
  plugins: [vuexLocal.plugin]
})

export default store