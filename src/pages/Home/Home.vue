<script setup>
import { ref, computed } from 'vue';
import { fetchNowPlayingMovies } from '@/services';
import InfinityScroll from '@/components/InfinityScroll';
import AppLoader from '@/components/AppLoader';
import MovieCard from '@/components/MovieCard';

const movies = ref([]);
const page = ref(0);
const totalPage = ref(null);
const isAllPageShow = computed(() => page.value === totalPage.value);

async function infinityObserverCallback([entry]) {
  if (!entry.isIntersecting) return;
  if (isAllPageShow.value) return;
  try {
    page.value += 1;
    const moviesResult = await fetchNowPlayingMovies(page.value);
    totalPage.value = moviesResult.total_page;
    movies.value = getMovies(moviesResult.results);
  } catch (error) {
    console.log(error);
  }
}

function getMovies(moviesResult) {
  const moviesFormateMap = [
    ...movies.value,
    ...moviesResult.filter((m) => m.poster_path),
  ].reduce((arr, el) => {
    return [...arr, [el.id, el]];
  }, []);
  return [...new Map(moviesFormateMap)].reduce((arr, el) => {
    return [...arr, el[1]];
  }, []);
}
</script>

<template>
  <InfinityScroll
    :observerCallback="infinityObserverCallback"
    :unbindObserver="isAllPageShow"
  >
    <MovieCard :movies="movies" />

    <template #observer>
      <AppLoader />
    </template>
  </InfinityScroll>
</template>

<style lang="scss" scoped>
@import './Home.scss';
</style>
