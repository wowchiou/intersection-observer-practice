<script setup>
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
  observerCallback: {
    type: Function,
    required: true,
  },
  unbindObserver: {
    type: Boolean,
    required: true,
  },
  observerOption: {
    type: Object,
  },
});

// const infinityContainer = ref(null);
const infinityObserver = ref(null);
let observer;

watch(
  () => props.unbindObserver,
  (newValue) => {
    if (!newValue) return;
    observer.unobserve(infinityObserver.value);
  }
);

onMounted(() => {
  console.log(import.meta.env);
  const options = props.observerOption && {
    root: null, // 觀察元素的父級,未給值預設視窗高度 (如有給父級元素必須設定高度)
    rootMargin: '0px 0px -1000px 0px',
    threshold: -1,
  };
  observer = new IntersectionObserver(props.observerCallback, options);
  observer.observe(infinityObserver.value);
});
</script>

<template>
  <div ref="infinityContainer">
    <slot />
    <div v-if="!unbindObserver" ref="infinityObserver">
      <slot name="observer" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './InfinityScroll.scss';
</style>
