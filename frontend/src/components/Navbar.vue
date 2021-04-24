<template>
  <header class="navbar navbar-dark sticky-top centered-content">
    <div class="col-lg">
      <router-link class="project-name" to="/">
        <a :class="{active:this.$route.name === 'home'}" href="/">
          <span data-feather="home"></span>
          <img src="https://fonts.gstatic.com/s/i/materialicons/menu/v11/24px.svg" />
        </a>
      </router-link>

      <router-link class="project-name" v-if="isUserConnected && getActiveProject" to="/dashboard">
        <a :class="{active:this.$route.name === 'dashboard'}" href="/dashboard">
          <span data-feather="dashboard"></span>
          <img src="https://fonts.gstatic.com/s/i/materialicons/space_dashboard/v1/24px.svg" />
        </a>
      </router-link>

      <router-link class="project-name" v-if="isUserConnected && getActiveProject" to="/chats" style="text-decoration: none">
          <a :class="{active:this.$route.name === 'chats'}" href="/chats">
            <span data-feather="file"></span>
            <img src="https://fonts.gstatic.com/s/i/materialicons/mark_as_unread/v8/24px.svg" />
          </a>
      </router-link>

      <router-link class="project-name" v-if="isUserConnected && getActiveProject" to="/settings" style="text-decoration: none">
          <a :class="{active:this.$route.name === 'settings'}" href="/settings">
            <span data-feather="file"></span>
            <img src="https://fonts.gstatic.com/s/i/materialicons/settings/v14/24px.svg" />
          </a>
      </router-link>
    </div>

    <ul class="navbar-nav px-3 web3-connect">
      <li class="nav-item text-nowrap">
        <a class="nav-link" href="#" v-if="!isUserConnected" @click="connectWeb3Modal">
          <img src="https://fonts.gstatic.com/s/i/materialicons/login/v10/24px.svg" />
        </a>
        <a class="nav-link" href="#" v-if="isUserConnected" @click="disconnectWeb3Modal">
          {{getActiveAccount.substring(0, 6)}}...
          <img src="https://fonts.gstatic.com/s/i/materialicons/logout/v10/24px.svg" />
        </a>
      </li>
    </ul>

    

  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Navbar",
  computed: {
    ...mapGetters("accounts", ["getActiveAccount", "isUserConnected", "getWeb3Modal", "getChainName"]),
    ...mapGetters("internal", ["getActiveProject"]),
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
