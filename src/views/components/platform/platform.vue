<template>
  <div class="platform">
    <div class="platform-layout">
      <div class="problem-block problem-description">
        {{ problem?.question }}
      </div>
      <div class="problem-block coding-area">
        <div class="language-preference">
          <select class="language-select">
            <option>Javascript</option>
            <option>Typescript</option>
          </select>
        </div>
        <div class="coding-area"></div>
      </div>
      <div class="problem-block test-case-area">
        <div class="test-case" v-for="testCase of problem?.testCases">
          <p>Input:</p>
          <p>{{ testCase.input }}</p>
          <p>Output:</p>
          <p>{{ testCase.output }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import appDispatcher, { AppActionTypes } from '@/store/modules/app/actions';
  import gettersOfApp from '@/store/modules/app/getters';
  import { computed, onBeforeMount } from 'vue';

  const problem = computed(gettersOfApp.currentProblem);

  onBeforeMount(() => {
    appDispatcher(AppActionTypes.GET_CODING_PROBLEM);
  });
</script>
