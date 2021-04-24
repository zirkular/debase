<template>
  <div>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Settings</h1>
    </div>

    <!-- <div class="row">
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Current projects</h5>

            <p class="card-text">
              <strong>Count:</strong> {{ getProjects.length }}
            </p>

            <ul>
              <li v-for="item in getProjects" :key="item.name">
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div> -->

    <div class="row mt-3">
      <div class="col-lg">
        <div class="card">
          <div class="card-body">

            <!-- <h5 class="card-title">ENter</h5> -->

            <form @submit.prevent="onDeleteProject">
              <div class="mb-3">
                <label for="valField" class="card-title h5">Detele project</label>
                <input id="valField" v-model="projectName" type="text" class="form-control" :placeholder="String('Re-type project name to confirm')">
              </div>

              <button type="submit" class="btn btn-outline-primary">Submit</button>
            </form>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Projects",
  computed: {
    ...mapGetters("accounts", ["getActiveAccount", "getWeb3"]),
    ...mapGetters("contracts", ["getProjects", "getDebaseAbi", "getDebaseAddress", "getDebaseContract"])
  },
  created() {
    this.$store.dispatch("contracts/fetchDebaseContract");
    this.$store.dispatch("contracts/fetchProjects");
    this.$store.dispatch("contracts/storeDebaseAbi");
    this.$store.dispatch("contracts/storeDebaseAddress");
  },
  data() {
    return {
      projectName: null,
      contract: null
    }
  },
  methods: {
    async onDeleteProject() {
      
    }
  }
}
</script>