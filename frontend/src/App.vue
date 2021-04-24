<template>
  <div>

    <div class="bg-light">
      <Navbar />
    </div>

    <div class="container-fluid">

        <!-- <Sidebar /> -->

        <main class="centered-content">

          <keep-alive>
            <router-view />
          </keep-alive>

        </main>
    </div>

  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
// import Sidebar from './components/Sidebar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    // Sidebar
  }
}
</script>
