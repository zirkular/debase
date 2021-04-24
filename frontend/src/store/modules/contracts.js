import Calc from "../../contracts/Calc.json";
import Debase from "../../contracts/Debase.json";
import addresses from "../../contracts/addresses.json";

const state = {
  // Calc
  num: 0,
  calcAbi: null,
  calcAddress: null,
  calcContract: null,
  // Debase
  projects: null,
  debaseAbi: null,
  debaseAddress: null,
  debaseContract: null,
};

const getters = {
  // Calc
  getNum(state) {
    return state.num;
  },
  getCalcAbi(state) {
    return state.calcAbi;
  },
  getCalcAddress(state) {
    return state.calcAddress;
  },
  getCalcContract(state) {
    return state.calcContract;
  },
  // Debase
  getProjects(state) {
    return state.projects;
  },
  getDebaseAbi(state) {
    return state.debaseAbi;
  },
  getDebaseAddress(state) {
    return state.debaseAddress;
  },
  getDebaseContract(state) {
    return state.debaseContract;
  }
};

const actions = {
  // Calc
  async fetchCalcContract({ commit, rootState }) {
    let web3 = rootState.accounts.web3;
    let chainIdDec = parseInt(rootState.accounts.chainId);
    let calcAddress = addresses.Calc[chainIdDec];

    let contract = new web3.eth.Contract(Calc.abi, calcAddress);
    commit("setCalcContract", contract);
  },
  async fetchNum({ commit, state }) {
    if (!state.calcContract) {
      this.fetchCalcContract();
    }

    let num = await state.calcContract.methods.getNum().call();

    commit("setNum", num);
  },
  storeCalcAbi({commit}) {
    commit("setCalcAbi", Calc.abi);
  },
  storeCalcAddress({ commit, rootState }) {
    let chainIdDec = parseInt(rootState.accounts.chainId);
    let calcAddress = addresses.Calc[chainIdDec];

    commit("setCalcAddress", calcAddress);
  },
  // Debase
  async fetchDebaseContract({ commit, rootState }) {
    let web3 = rootState.accounts.web3;
    let chainIdDec = parseInt(rootState.accounts.chainId);
    let debaseAddress = addresses.Debase[chainIdDec];

    let contract = new web3.eth.Contract(Debase.abi, debaseAddress);
    commit("setDebaseContract", contract);
  },
  async fetchProjects({ commit, state }) {
    if (!state.debaseContract) {
      this.fetchDebaseContract();
    }

    let projects = await state.debaseContract.methods.getProjects().call();

    commit("setProjects", projects);
  },
  storeDebaseAbi({commit}) {
    commit("setDebaseAbi", Debase.abi);
  },
  storeDebaseAddress({ commit, rootState }) {
    let chainIdDec = parseInt(rootState.accounts.chainId);
    let debaseAddress = addresses.Debase[chainIdDec];

    commit("setDebaseAddress", debaseAddress);
  }
};

const mutations = {
  // Calc
  setNum(state, _num) {
    state.num = _num;
  },
  setCalcAbi(state, _abi) {
    state.calcAbi = _abi;
  },
  setCalcAddress(state, _address) {
    state.calcAddress = _address;
  },
  setCalcContract(state, _contract) {
    state.calcContract = _contract;
  },
  // Debase
  setProjects(state, _projects) {
    state.projects = _projects;
  },
  setDebaseAbi(state, _abi) {
    state.debaseAbi = _abi;
  },
  setDebaseAddress(state, _address) {
    state.debaseAddress = _address;
  },
  setDebaseContract(state, _contract) {
    state.debaseContract = _contract;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
