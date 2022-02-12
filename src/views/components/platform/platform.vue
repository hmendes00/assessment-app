<template>
  <div ref="root" class="platform">
    <div class="platform-layout">
      <div class="problem-block problem-description">
        <h2>Problem Description</h2>
        <p class="description">
          {{ problem?.question }}
        </p>
        <div class="test-case-area">
          <h3>{{ $t('test-case-example') }}</h3>
          <div class="test-case" v-for="testCase of problem?.testCases">
            <p>Input:</p>
            <p>{{ testCase.input }}</p>
            <p>Output:</p>
            <p>{{ testCase.output }}</p>
          </div>
        </div>
      </div>
      <div class="problem-block coding-area">
        <div class="language-preference">
          <n-select v-model:value="selectedLanguage" :options="supportedLanguages" />
          <n-button type="success" @click="evaluate">Run</n-button>
        </div>
        <monaco-editor
          class="platform-coding-area"
          :options="editorOptions"
          theme="vs-dark"
          v-model="code"
          :language="selectedLanguage"
        />
      </div>
      <div class="problem-block result-area">
        <h2>Result:</h2>
        <div ref="resultRenderer">Run your code to see the logs here.</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import appDispatcher, { AppActionTypes } from '@/store/modules/app/actions';
  import gettersOfApp from '@/store/modules/app/getters';
  import { computed, onBeforeMount, onMounted, ref, watch } from 'vue';
  //@ts-ignore
  import MonacoEditor from 'vue-monaco-cdn';
  import { InjectCssInShadoRoot } from '@/helpers/css-injector';
  import { NSelect, NButton } from 'naive-ui';
  import { useLang } from '@/services/lang-service';
  // const codingArea = ref(null);

  const { $t } = useLang();
  const root = ref<HTMLDivElement>();
  const resultRenderer = ref<HTMLDivElement>();
  const problem = computed(gettersOfApp.currentProblem);
  const selectedLanguage = ref('javascript');
  const supportedLanguages = [
    { label: 'Javascript', value: 'javascript' },
    { label: 'Typescript', value: 'typescript' }
  ];

  const editorOptions = {
    minimap: {
      enabled: false
    },
    renderLineHighlight: 'none',
    scrollBeyondLastLine: false,
    fixedOverflowWidgets: true,
    fontSize: 13,
    fontLigatures: true,
    contextmenu: false,
    automaticLayout: true,
    wordWrap: true
  };
  const code = ref('');
  // document.body.addEventListener('keyup', function () {
  //   debugger;
  // });

  watch(problem, (value) => {
    code.value = [
      'function test() {',
      '\t// your implementation here',
      '}',
      '// test example',
      `console.log(JSON.stringify(${JSON.stringify(
        value?.testCases[0].output
      )}) === JSON.stringify(test(${JSON.stringify(value?.testCases[0].input)})));`
    ].join('\n');
  });
  onMounted(() => {
    let style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.32.1/min/vs/editor/editor.main.css';
    root.value!.appendChild(style);

    InjectCssInShadoRoot(root.value!, 'style[cssr-id]');
  });

  onBeforeMount(() => {
    appDispatcher(AppActionTypes.GET_CODING_PROBLEM);
  });

  window.addEventListener('message', (e) => {
    const data = e.data;
    if (data.type === 'log') {
      const _p = document.createElement('p');
      _p.innerHTML = data.args;
      resultRenderer.value?.appendChild(_p);
    }
  });

  const createIframeResult = () => {
    resultRenderer.value!.innerHTML = '';
    // if (resultRenderer.value?.querySelector('#platform-result-frame-test')) {
    // resultRenderer.value?.querySelector('#platform-result-frame-test')?.remove();

    // }

    const iframe = document.createElement('iframe');
    iframe.id = 'platform-result-frame-test';
    iframe.style.display = 'none';
    iframe.src =
      'data:text/html;charset=utf-8,' +
      encodeURI(
        `<script>
          const originalLog = console.log;
          console.log = (...args) => {
            parent.window.postMessage({ type: 'log', args: args }, '*');
            originalLog(...args)
          };
          ${code.value}
        <\/script>`
      );
    resultRenderer.value?.appendChild(iframe);
  };

  const evaluate = () => {
    if (problem.value) {
      if (selectedLanguage.value === 'javascript') {
        createIframeResult();
      }
    }
  };
</script>
