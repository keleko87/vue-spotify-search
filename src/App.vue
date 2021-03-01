<template>
  <div id="app">
    <navbar-container />
    <router-view />
  </div>
</template>

<script>
import store from "@/store";
import router from "@/router";

import NavbarContainer from "@/components/Navbar/NavbarContainer";

export default {
  name: "App",

  components: {
    NavbarContainer
  },

  created() {
    if (store.getters["auth/getAccessToken"]) {
      router.push("/");
    }
  }
};
</script>

<style lang="scss">
@import "./styles/scss/app.scss";
</style>
