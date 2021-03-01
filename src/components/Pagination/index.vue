<template>
  <div class="pagination">
    <div v-show="showPrev" class="pagination__action">
      <a
        class="pagination__link"
        aria-label="prev"
        tabindex="0"
        @click="prev"
        @keyup.enter="prev"
      >
        &lt;
      </a>
    </div>
    <div v-show="showNext" class="pagination__action">
      <a
        class="pagination__link"
        aria-label="next"
        tabindex="0"
        @click="next"
        @keyup.enter="next"
      >
        &gt;
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "pagination",

  props: {
    page: {
      type: Number
    },
    perPage: {
      type: Number
    },
    total: {
      type: Number
    }
  },

  computed: {
    totalPages() {
      return Math.ceil(this.total / this.perPage);
    },

    isLastPage() {
      return this.totalPages <= this.page + 1;
    },

    showPrev() {
      return this.page > 0 && this.totalPages > 0;
    },

    showNext() {
      return !this.isLastPage;
    }
  },

  methods: {
    prev() {
      this.$emit("prev");
    },

    next() {
      this.$emit("next");
    }
  }
};
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: center;

  &__action {
    margin: 1rem 0.5rem;
  }

  &__link {
    background-color: $gray-900;
    border: 1px solid $gray-900;
    border-radius: 30px;
    color: $gray-200;
    cursor: pointer;
    font-size: 1.5rem;
    padding: 0.25rem 0.85rem;

    &:focus {
      border-radius: 0;
    }
  }
}
</style>
