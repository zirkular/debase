import Vue from 'vue';
import Vuex from 'vuex';
import internal from "./modules/internal";
import accounts from "./modules/accounts";
import contracts from "./modules/contracts";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        internal,
        accounts,
        contracts
    }
});