<template>
  <div>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Add new project</h1>
    </div>

    <div class="row mt-3">
      <div class="col-lg">
        <div class="card">
          <div class="card-body">

            <!-- <h5 class="card-title">ENter</h5> -->

            <form @submit.prevent="onSubmit">
              <div class="mb-3">
                <label for="valField" class="card-title h5">Enter name</label>
                <input id="valField" v-model="newName" type="text" class="form-control" :placeholder="String('Project name')">
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

    // if web3 provider has not been yet loaded, redirect to root 
    if (!this.getWeb3) {
      document.location.href="/";
    } else {
      let component = this;

      // set event listener
      this.getDebaseContract.events.ProjectAdded({
        filter: {_from: this.getActiveAccount }, // only events from this user
      })
      .on("connected", function(subscriptionId) {
        // when the event listener is set
        console.log("ProjectAdded event subscription ID: " + subscriptionId);
      })
      .on('data', function(event){
        // when an event is triggered
        //console.log(event);

        component.$toasted.show('New project added with name set to ' + event.returnValues.value, {
          type: 'success',
          duration: 5000,
          theme: "bubble",
          position: "top-center"
        });

        // refresh the num value
        component.$store.dispatch("contracts/fetchProjects");
      })
      .on('error', function(error, receipt) { 
        // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
        window.console.log(error);
        window.console.log(receipt);

        component.$toasted.show('An error occured.', {
          type: 'error',
          duration: 5000,
          theme: "bubble",
          position: "top-center"
        });
        alert("what");
      });
    }
  },
  data() {
    return {
      newName: null,
      contract: null
    }
  },
  methods: {
    async onSubmit() {
      this.$store.dispatch("contracts/fetchDebaseContract");
      await this.getDebaseContract.methods.addProject(this.newName).send({
        from: this.getActiveAccount
      });
      this.$router.push('/');
    }
  }
}
</script>