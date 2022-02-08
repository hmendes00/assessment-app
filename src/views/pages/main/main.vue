<template>
  <div class="toguro-main">
    {{ prefersDark }}
    <!-- <h2 class="text-center">{{ $t('your-app') }} [{{ appLoaded }}]</h2> -->
    <platform />
  </div>
</template>

<script setup lang="ts">
  import platform from '@/views/components/platform/platform.vue';
  import { useLang } from '@/services/lang-service';
  import { usePreferredDark } from '@vueuse/core';
  const { $t } = useLang();

  const prefersDark = usePreferredDark();
</script>
