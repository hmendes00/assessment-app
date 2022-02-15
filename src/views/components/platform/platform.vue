<template>
  <div ref="root" class="platform">
    <div class="platform-layout">
      <div class="problem-block problem-description">
        <h2>{{ $t('problem-description') }}</h2>
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
        <h2>{{ $t('result') }}:</h2>
        <div ref="resultRenderer" class="result-output">{{ $t('run-code-to-see-logs') }}</div>
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
  import * as ts from 'typescript';

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

  const getCode = () => {
    if (selectedLanguage.value === 'typescript') {
      return ts.transpile(code.value);
    }
    return code.value;
  };

  const getBaseCodeForWorker = () => {
    return `let window = {};
    let console = {
      log: function(){
        var str = "";
        for(var i = 0; i < arguments.length; i++){
          str += JSON.stringify(arguments[i]) + " ";
        }
        str += "\\n";
        // send the message back to the main thread
        self.postMessage(str);
      },
      error: function(){
        console.log.apply(console, ["ERROR: "].concat(Array.prototype.slice.call(arguments)));
      },
      warn: function(){
        console.log.apply(console, ["WARNING: "].concat(Array.prototype.slice.call(arguments)));
      }
    };
    `;
  };

  const execFunction = () => {
    resultRenderer.value!.innerHTML = '';
    const bb = new Blob([getBaseCodeForWorker() + getCode()], {
      type: 'text/javascript'
    });
    const bbURL = URL.createObjectURL(bb);
    let worker: Worker | null = new Worker(bbURL);

    worker.addEventListener(
      'message',
      function (e: any) {
        const string = e.data.toString();
        const _p = document.createElement('p');
        _p.innerHTML = string;
        resultRenderer.value?.appendChild(_p);
      }.bind(this)
    );

    worker.addEventListener('error', function (e) {
      var string = e.message.toString();
      const _p = document.createElement('p');
      _p.innerHTML = 'ERROR: ' + string;
      resultRenderer.value?.appendChild(_p);
    });

    worker.postMessage('start');

    setTimeout(function () {
      worker?.terminate();
      worker = null;
    }, 2000); // if still running after 2 seconds, terminate process (it probably means the code has infinite loop)
  };

  const evaluate = () => {
    if (problem.value) {
      execFunction();
    }
  };
</script>
