<template>
  <div class="home">
    <div v-if="!result" class="home__title">
      <h1>Welcome to <span class="home__entity">Empathy Music!</span></h1>
      <h1>
        Find your favorite
        <span class="home__entity">artists</span>,
        <span class="home__entity">albums</span> and
        <span class="home__entity">tracks.</span>
      </h1>
    </div>

    <div v-else class="home__content">
      <!-- ALBUMS -->
      <h2 class="home__list--name home__list--margin-y">Albums</h2>

      <div v-if="album.loading" class="home__spinner">
        <spinner :loading="album.loading" />
      </div>

      <div v-if="album.data.items && !album.loading" class="home__list">
        <item-list :list="album.data.items" />
        <pagination
          :page="album.page"
          :per-page="limit"
          :total="album.data.total"
          @prev="doSearch(query, type.album, limit, album.page - 1)"
          @next="doSearch(query, type.album, limit, album.page + 1)"
        />
      </div>

      <!-- ARTISTS -->
      <h2 class="home__list--name home__list--margin-y">Artists</h2>

      <div v-if="artist.loading" class="home__spinner">
        <spinner :loading="artist.loading" />
      </div>

      <div v-if="artist.data.items && !artist.loading" class="home__list">
        <item-list :list="artist.data.items" />
        <pagination
          :page="artist.page"
          :per-page="limit"
          :total="artist.data.total"
          @prev="doSearch(query, type.artist, limit, artist.page - 1)"
          @next="doSearch(query, type.artist, limit, artist.page + 1)"
        />
      </div>

      <!-- TRACKS -->
      <h2 class="home__list--name home__list--margin-y">Tracks</h2>

      <div v-if="track.loading" class="home__spinner">
        <spinner :loading="track.loading" />
      </div>

      <div v-if="track.data.items && !track.loading" class="home__list">
        <item-list :list="track.data.items" />
        <pagination
          :page="track.page"
          :per-page="limit"
          :total="track.data.total"
          @prev="doSearch(query, type.track, limit, track.page - 1)"
          @next="doSearch(query, type.track, limit, track.page + 1)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { LIMIT, TYPE } from "@/model/search";

// Load the component when "v-if" return truthy value
const ItemList = () => import("@/components/ItemList");
const Pagination = () => import("@/components/Pagination");
const Spinner = () => import("@/components/Spinner");

export default {
  name: "Home",

  components: {
    ItemList,
    Pagination,
    Spinner
  },

  data() {
    return {
      type: TYPE,
      limit: LIMIT
    };
  },

  computed: {
    ...mapGetters({
      query: "search/query",
      result: "search/result",
      album: "search/album",
      artist: "search/artist",
      track: "search/track"
    })
  },

  methods: {
    ...mapActions({
      search: "search/search",
      setItemPage: "search/setItemPage"
    }),

    async doSearch(query, type, limit, page) {
      this.setItemPage({ type, page });

      const offset = page * limit;
      await this.search({ query, type, offset, limit });
    }
  }
};
</script>
<style scoped lang="scss">
.home {
  background-color: $gray-800;

  &__title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: calc(100vh - 64px);
  }

  &__entity {
    color: $mandarine;
  }

  &__list {
    &--name {
      text-align: center;
    }

    &--margin-y {
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
    }
  }
}
</style>
