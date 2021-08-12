<template>
  <section v-if="editorExercise" class="editorcontainer">
    <div id="editor">
      {{ editorExercise.code_start }}
    </div>
    <div class="output_container">
      <div class="toggle" v-if="isBoth">
        <button id="compile_toggle" @click="toggle='compile'" :class="{active:toggle==='compile'}">
          <p class="code">Kompilierter Code</p>
        </button>
        <button id="console_toggle" @click="toggle='console'" :class="{active:toggle==='console'}">
          <p class="code">Konsole</p>
        </button>
      </div>
      <div class="output">
        <div id="compile" v-if="toggle==='compile' || isCompile">
          <div v-html="codeEdited"></div>
        </div>
        <div id="console_ct" v-if="toggle==='console' || isConsole">
          <pre id="console"></pre>
        </div>
      </div>
    </div>
  </section>
  <div class="compiler">
    <button class="btn code small" v-if="isConsole || isBoth" @click="compileConsole">Konsole kompilieren</button>
  </div>
</template>
<script>
import ace from 'ace-builds';
ace.config.set(
    "basePath",
    "https://cdn.jsdelivr.net/npm/ace-builds@" + require('ace-builds').version + "/src-noconflict/")
export default {
  name: "Editor",
  data(){
    return{
      codeEdited: null,
      toggle: null,
    }
  },
  computed: {
    language() {
      return this.editorExercise.baselanguage || null;
    },
    output() {
      return this.editorExercise.output || null;
    },
    isCompile() {
      return this.output === 'compile';
    },
    isConsole() {
      return this.output === 'console';
    },
    isBoth() {
      return this.output === 'both';
    },
    console() {
      return document.querySelector('#console');
    }
  },
  props: {
    editorExercise: {
      type: Object,
      required: true
    }
  },
  methods: {
    initEditor() {
      let self = this
      this.editor = ace.edit('editor')
      this.editor.setTheme('ace/theme/nord_dark')
      this.editor.session.setMode(`ace/mode/${this.language}`)
      this.editor.session.setUseWrapMode(true)
      this.editor.commands.addCommand({
        name: 'myCommand',
        bindKey: {win: 'Ctrl-Shift-S', mac: 'Command-Shift-S'},
        exec: function (editor) {
          self.compileConsole()
        }
      });
      this.codeEdited = this.editor.getValue()
    },
    compileConsole(){
      let foundLogs = this.editor.find('console.log')
      let annotations = this.editor.getSession().getAnnotations();
      let hasError = annotations.find(note => {
        return note.type === 'error'
      })
      if(!hasError && foundLogs){
        this.console.innerHTML = ''
        console.log(new Function(this.codeEdited)());
      }
    },
    watchEditor() {
      this.editor.on('change', () => {
        this.codeEdited = this.editor.getValue()
        console.clear()
      })
    },
    setCorrectToggle() {
      if (this.isBoth || this.isCompile) {
        this.toggle = 'compile'
      } else {
        this.toggle = 'console'
      }
    },
    changeLog() {
      console.old = console.log;
      const logger = document.getElementById('console')
      console.log = function () {
        let output = "", arg, i;
        for (i = 0; i < arguments.length; i++) {
          arg = arguments[i];
          if(arg){
            output += "<span class=\"log-" + (typeof arg) + "\">";
            if ( typeof arg === "object" && typeof JSON === "object" && typeof JSON.stringify === "function") {
              output += JSON.stringify(arg);
            } else {
              output += arg;
            }
            output += "</span>&nbsp;";
          }
        }
        logger.innerHTML += output + "<br>";
      }
    },
  },
  mounted() {
    this.initEditor()
    this.watchEditor()
    this.setCorrectToggle()
    this.changeLog()
  }
}
</script>
<style lang="scss" scoped>
section.editorcontainer {
  position: relative;
  @include flex(row,center,center);
  &>*{
    width: 100%;
  }
  #editor {
    height: 50vh;
    font: $f-code-s;
  }
  .output_container {
    border: $bo-standard;
    overflow: scroll;
    background-color: $co-font;
    div.output{
      div#compile{
        height: calc( 50vh - 2px );
        padding: $ga-inner;
        background-color: $co-bg;
      }
      div#console_ct{
        padding: $ga-inner;
        background-color: $co-font;
        height: calc( 50vh - 2px );
        color: $co-bg;
        pre#console{
          font: $f-code-s;
        }
      }
    }
    div.toggle {
      @include flex(row,center,center);
      border: $bo-standard;
      margin-bottom: $ga-inner;
      &>*{
        cursor: pointer;
        border: none;
        width: 50%;
        padding: 10px 0;
        background-color: $co-akzent;
        &:not(.active){
          filter: brightness(50%);
        }
      }
    }
  }
}
div.compiler{
  @include flex(row,center,center);
  position: relative;
  margin-top: -20px;
  z-index: 3;
}
</style>