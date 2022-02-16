<template>
  <div class="toguro-main">
    <n-config-provider :theme="darkTheme">
      <!-- <h2 class="text-center">{{ $t('your-app') }} [{{ appLoaded }}]</h2> -->
      <platform />
    </n-config-provider>
  </div>
</template>

<script setup lang="ts">
  import { InjectCssInShadowRootFromString } from '@/helpers/css-injector';
  import platform from '@/views/components/platform/platform.vue';
  import { darkTheme, NConfigProvider } from 'naive-ui';
  import { onMounted } from 'vue';
  import thisCss from './main.scss';

  onMounted(() => {
    InjectCssInShadowRootFromString(thisCss);
  });
</script>
