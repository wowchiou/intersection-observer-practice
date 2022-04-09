<script setup>
import { ref, onMounted } from 'vue';

defineProps({
  imageSRC: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
  },
});

const lazyImage = ref(null);

onMounted(() => {
  const observer = new IntersectionObserver(observerCallback, {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: 0,
  });
  observer.observe(lazyImage.value);
});

function observerCallback([entry], observer) {
  if (!entry || !entry.isIntersecting) return;
  const el = entry.target;
  const src = el.getAttribute('data-src');
  if (src) el.src = src;
  observer.unobserve(el);
}
</script>

<template>
  <img ref="lazyImage" :data-src="imageSRC" :alt="alt" />
</template>

<style lang="scss" scoped>
@import './LazyImageCard.scss';
</style>
