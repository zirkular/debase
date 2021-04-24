<template>
  <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
    <div class="position-sticky pt-3">

      <ul class="nav flex-column">
        <router-link v-if="isUserConnected && getActiveProject" to="/chats" style="text-decoration: none">
          <li class="nav-item">
            <a class="nav-link" :class="{active:this.$route.name === 'chats'}" href="/chats">
              <span data-feather="file"></span>
              Chats
            </a>
          </li>
        </router-link>

        <router-link v-if="isUserConnected && getActiveProject" to="/settings" style="text-decoration: none">
          <li class="nav-item">
            <a class="nav-link" :class="{active:this.$route.name === 'settings'}" href="/settings">
              <span data-feather="file"></span>
              Settings
            </a>
          </li>
        </router-link>

        <router-link v-if="isUserConnected" to="/profile" style="text-decoration: none">
          <li class="nav-item">
            <a class="nav-link" :class="{active:this.$route.name === 'profile'}" href="/profile">
              <span data-feather="file"></span>
              Profile
            </a>
          </li>
        </router-link>
        
        <div class="alert alert-warning m-3" v-if="isUserConnected && showChainAlert" role="alert">
          <span v-if="getChainName">Your currently selected chain is <strong>{{getChainName}}</strong> (a testnet).</span>
        </div>

      </ul>

    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Sidebar",
  computed: {
    ...mapGetters("accounts", ["getChainName", "isUserConnected", "getWeb3Modal"]),
    ...mapGetters("internal", ["getActiveProject"]),

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
  }
}
</script>
