<template>
  <div class="item-list">
    <div v-if="list.length" class="item-list__content">
      <div v-for="item in list" :key="item.id" class="item-list__content--item">
        <item-card :info="item" />
      </div>
    </div>

    <template v-else>
      <div class="item-list__not-found">
        <h3 class="item-list__info--title">No result found</h3>
        <p class="item-list__info--text">
          Please make sure your words are spelled correctly or use less of
          different keywords.
        </p>
      </div>
    </template>
  </div>
</template>

<script>
import ItemCard from "@/components/ItemCard";

export default {
  name: "item-list",

  components: {
    ItemCard
  },

  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped lang="scss">
.item-list {
  &__content {
    display: grid;
    grid-gap: 0.5rem;
    justify-content: center;

    @media (min-width: #{$media-xxs}) {
      grid-template-columns: repeat(auto-fit, 60%);
    }

    @media (min-width: #{$media-xs}) {
      grid-template-columns: repeat(auto-fit, 40%);
    }

    @media (min-width: #{$media-sm}) {
      grid-template-columns: repeat(auto-fit, 33.33%);
    }

    @media (min-width: #{$media-md}) {
      grid-template-columns: repeat(auto-fit, 20%);
    }

    @media (min-width: #{$media-lg}) {
      grid-template-columns: repeat(auto-fit, 11.5%);
    }
  }

  &__not-found {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 200px;
    text-align: center;
    margin: 0 3rem;
    border: 1px solid $gray-800;
    background-color: $gray-600;
  }

  &__info {
    &--title {
      margin-bottom: 0.25rem;
    }
    &--text {
      margin-top: 0;
    }
  }
}
</style>
