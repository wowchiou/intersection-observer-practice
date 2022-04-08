<script setup>
import { ref, onMounted } from 'vue';
import { fetchNowPlayingMovies } from '@/services';
import MovieCard from '@/components/MovieCard';

const movies = ref([]);
const movieContainer = ref(null);
const movieObserver = ref(null);

let observer;
let page = 1;
let totalPage = null;

onMounted(async () => {
  const moviesResult = await fetchNowPlayingMovies(page);
  totalPage = moviesResult.total_page;
  movies.value = getMovies(moviesResult.results);

  observer = new IntersectionObserver(observerCallback, {
    root: null, // 觀察元素的父級,未給值預設視窗高度 (如有給父級元素必須設定高度)
    rootMargin: '0px 0px 30% 0px',
    threshold: 0,
  });

  observer.observe(movieObserver.value);
});

async function observerCallback([entry]) {
  if (!entry && !entry.isIntersecting) return;
  if (page === totalPage) return;
  page += 1;
  const moviesResult = await fetchNowPlayingMovies(page);
  movies.value = getMovies(moviesResult.results);
}

function getMovies(moviesResult) {
  // 重編排成可使用new Map的格式
  const moviesFormateMap = [
    ...movies.value,
    ...moviesResult.filter((m) => m.poster_path),
  ].reduce((arr, el) => {
    return [...arr, [el.id, el]];
  }, []);
  // 篩選掉重複的資料並轉成物件陣列
  return [...new Map(moviesFormateMap)].reduce((arr, el) => {
    return [...arr, el[1]];
  }, []);
}
</script>

<template>
  <div ref="movieContainer">
    <ul ref="movieWrapper" class="movie-list">
      <MovieCard :movies="movies" />
    </ul>
    <div ref="movieObserver"></div>
  </div>
</template>

<style lang="scss" scoped>
@import './Home.scss';
</style>
