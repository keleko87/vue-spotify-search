<template>
  <div class="search">
    <input
      class="search__input"
      type="search"
      :style="style"
      :placeholder="placeholder"
      tabindex="0"
      aria-label="Search"
      @keyup="onKeyUp"
      @search="onClear"
    />
  </div>
</template>

<script>
export default {
  name: "search",

  props: {
    width: {
      type: String,
      default: "100%"
    },
    placeholder: {
      type: String,
      default: "Search"
    }
  },

  computed: {
    style() {
      return {
        width: this.width
      };
    }
  },

  methods: {
    onKeyUp(e) {
      const { value } = e.target;

      if (value !== "") {
        this.$emit("search", value);
      } else {
        this.clearEv();
      }
    },

    onClear() {
      this.clearEv();
    },

    clearEv() {
      this.$emit("clear");
    }
  }
};
</script>

<style scoped lang="scss">
.search {
  &__input {
    border: 0;
    border-radius: 30px;
    font-size: 1rem;
    margin: 0;
    padding: 0 1rem;
    height: 40px;

    &:focus {
      border-radius: 0;
    }
  }
}
</style>
