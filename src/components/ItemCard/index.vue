<template>
  <div class="item-card">
    <div class="item-card__image">
      <img v-if="info.images" :src="imageUrl" alt="image" />
      <img v-else-if="trackImageUrl" :src="trackImageUrl" alt="image" />
    </div>
    <div class="item-card__info">
      <h4 class="item-card__name item-card__text--overflow" :title="info.name">
        {{ info.name }}
      </h4>
      <p class="item-card__type item-card__text--overflow">{{ info.type }}</p>
    </div>
  </div>
</template>

<script>
const imageNotAvailabe = require("./../../assets/img/img-not-available.png");

export default {
  name: "item-card",

  props: {
    info: {
      type: Object,
      validator: value => {
        if (value.name && value.type && (value.images || value.album.images)) {
          return true;
        }
      }
    }
  },

  computed: {
    imageUrl() {
      return this.getImageUrl(this.info.images);
    },
    trackImageUrl() {
      return this.info.album.images
        ? this.getImageUrl(this.info.album.images)
        : imageNotAvailabe;
    }
  },

  methods: {
    getImageUrl(images = []) {
      return images.length > 1 && images[1].url
        ? images[1].url
        : images.length > 0 && images[0].url
        ? images[0].url
        : imageNotAvailabe;
    }
  }
};
</script>

<style scoped lang="scss">
$card-min-height: 180px;
$card-max-width: 220px;
$card-padding: 0.5rem;
$image-size: calc(#{$card-min-height} - (#{$card-padding} * 2));

.item-card {
  background-color: $gray-600;
  border: 1px solid $gray-800;
  border-radius: 5px;
  min-height: $card-min-height;

  &__image {
    padding: $card-padding;
    overflow: hidden;
    height: $image-size;

    @media (min-width: #{$media-xl}) {
      min-height: 210px;
    }

    img {
      height: 100%; // auto
      width: 100%;
      vertical-align: middle;
    }
  }

  &__info {
    padding: $card-padding;
  }

  &__name,
  &__type {
    margin: 0 0 0.25rem 0;
  }

  &__text {
    &--overflow {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
