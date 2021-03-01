<template>
  <div class="loader" v-if="loading">
    <div class="loader__spinner">
      <img src="@/assets/img/spinner.gif" alt="spinner image" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Spinner",

  props: {
    loading: {
      type: Boolean,
      required: true,
      default: false
    }
  }
};
</script>

<style scoped lang="scss">
.loader {
  &__spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4rem 0;

    @media (min-width: #{$media-xxs}) {
      height: 30rem;
    }

    @media (min-width: #{$media-md}) {
      height: 20rem;
    }

    @media (min-width: #{$media-lg}) {
      height: 10rem;
    }
  }
}
</style>
