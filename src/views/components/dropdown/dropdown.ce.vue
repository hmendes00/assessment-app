<template>
  <div class="root dropdown" :class="state">
    <div class="current-value" @click="openDropdown">{{ value || label }}</div>
    <ul class="items">
      <li v-for="(item, i) of options" :key="i">{{ item }}</li>
    </ul>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';

  const props = defineProps({
    label: { default: 'Select', type: String },
    options: []
  });

  const state = ref('');

  const openDropdown = () => {
    state.value = 'active';
  };

  const value = ref<HTMLDivElement>();
</script>
