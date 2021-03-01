<template>
  <nav class="navbar">
    <div class="navbar__content">
      <div class="navbar__left-nav">
        <slot name="left-nav"></slot>
      </div>
      <div class="navbar__right-nav">
        <slot name="right-nav"></slot>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style scoped lang="scss">
$height: 32px;

.navbar {
  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: $black;
    height: $height;
    padding: 1rem 2rem;
  }
}
</style>
