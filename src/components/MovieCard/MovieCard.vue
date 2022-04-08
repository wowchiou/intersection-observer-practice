<script setup>
import { ref, defineProps } from 'vue';

defineProps({
  movies: {
    type: Array,
    required: true,
  },
});

const imageURL = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2';
</script>

<template>
  <li v-for="movie in movies" :key="movie.id" class="movie-item">
    <div class="movie-poster">
      <img :src="`${imageURL}${movie.poster_path}`" :alt="movie.title" />
    </div>
    <div class="flex justify-start items-start text-2xl">
      <div class="flex-1 w-full">
        <p class="movie-title">{{ movie.title }}</p>
        <p>{{ movie.release_date }}</p>
      </div>
      <div class="movie-vote">
        <span>{{ movie.vote_average }}</span>
      </div>
    </div>
  </li>
</template>

<style lang="scss" scoped>
@import './MovieCard.scss';
</style>
