<template>
  <div class="navbar-container">
    <navbar>
      <template slot="left-nav">
        <search
          :placeholder="placeholder"
          :width="width"
          @search="search({ query: $event, type, offset, limit, globalSearch })"
          @clear="clearSearchResult"
        />
      </template>
      <template slot="right-nav">
        <h5>Mario Martín</h5>
      </template>
    </navbar>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Navbar from "@/components/Navbar";
import Search from "@/components/Search";
import { LIMIT, OFFSET, TYPE } from "@/model/search";

export default {
  name: "navbarContainer",

  components: {
    Navbar,
    Search
  },

  data() {
    return {
      type: `${TYPE.album},${TYPE.artist},${TYPE.track}`,
      limit: LIMIT,
      offset: OFFSET,
      globalSearch: true,
      width: "325px",
      placeholder: "Search for artists, albums and tracks..."
    };
  },

  methods: {
    ...mapActions({
      search: "search/search",
      clearSearchResult: "search/clearSearchResult"
    })
  }
};
</script>
