<template>
  <div>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Your Projects</h1>
    </div>

    <div class="row mt-2" v-for="item in getProjects" :key="item.name">
      <div class="col-lg">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              <a href="#" @click="gotoDashboard(item)" class="">{{ item.name }}</a>
            </h5>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-3" v-if="isUserConnected">
      <div class="col-lg">
        <div class="card">
          <div class="card-body">

            <h5 class="card-title">
              <router-link v-if="isUserConnected" to="/add-project" style="text-decoration: none">
                <!-- <li class="nav-item"> -->
                  <a :class="{active:this.$route.name === 'add-project'}" href="/add-project">
                    <span data-feather="file"></span>
                    Add project ...
                  </a>
                <!-- </li> -->
              </router-link>
            </h5>
          </div>
        </div>
      </div>
    </div>

    <div class="alert alert-warning mt-3" v-if="!isUserConnected" role="alert">
      <span v-if="!getChainName">
        Please <a href="#" @click="connect" class="alert-link">connect</a> with MetaMask
        or some other Ethereum wallet.
      </span>
    </div>



  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapGetters("accounts", ["getChainName", "isUserConnected", "getActiveAccount", "getWeb3"]),
    ...mapGetters("contracts", ["getProjects", "getDebaseAbi", "getDebaseAddress", "getDebaseContract"]),
    ...mapMutations("internal", ["setActiveProject"]),

    showChainAlert() {
      switch (this.getChainName) {
        case "Mainnet":
          return false;
        default:
          return true;
      }
    }
  },
  created() {
    this.$store.dispatch("accounts/initWeb3Modal");
    this.$store.dispatch("accounts/ethereumListener");
  },
  methods: {
    ...mapActions("accounts", ["connectWeb3Modal", "disconnectWeb3Modal"]),
    async connect() {
      await this.connectWeb3Modal();
      this.$store.dispatch("contracts/fetchDebaseContract");
      this.$store.dispatch("contracts/fetchProjects");
    },
    async gotoDashboard(_item) {
      console.log(_item);
      this.$store.commit("internal/setActiveProject", _item);
      this.$router.push('dashboard');
    }
  }
}
</script>
