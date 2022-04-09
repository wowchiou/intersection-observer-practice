<script setup>
import LazyImageCard from '@/components/LazyImageCard';

defineProps({
  movies: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <ul class="flex justify-start items-start flex-wrap m-auto max-w-screen-md">
    <li
      v-for="{ title, id, poster_path, release_date, vote_average } in movies"
      :key="id"
      class="movie-item"
    >
      <div class="movie-poster">
        <LazyImageCard
          :imageSRC="`https://image.tmdb.org/t/p/w300_and_h450_bestv2${poster_path}`"
          :alt="title"
        />
      </div>
      <div class="flex justify-start items-start text-2xl">
        <div class="flex-1 w-full">
          <p class="movie-title">{{ title }}</p>
          <p>{{ release_date }}</p>
        </div>
        <div class="movie-vote">
          <span>{{ vote_average }}</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@import './MovieCard.scss';
</style>
