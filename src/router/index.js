import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

import Home from "@/views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach(function(to, from, next) {
  if (!store.getters["auth/getAccessToken"]) {
    store.dispatch("auth/login");
    next(false);
  }

  next();
});

export default router;
