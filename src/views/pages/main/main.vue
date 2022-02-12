<template>
  <div class="toguro-main">
    <n-config-provider :theme="darkTheme">
      <!-- <h2 class="text-center">{{ $t('your-app') }} [{{ appLoaded }}]</h2> -->
      <platform />
    </n-config-provider>
  </div>
</template>

<script setup lang="ts">
  import platform from '@/views/components/platform/platform.vue';
  import { useLang } from '@/services/lang-service';
  import { usePreferredDark } from '@vueuse/core';
  import { darkTheme, NConfigProvider } from 'naive-ui';
  // const { $t } = useLang();

  // const prefersDark = usePreferredDark();
</script>
