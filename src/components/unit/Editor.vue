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
  <button v-if="isConsole || isBoth" @click="compileConsole">Compile Console</button>
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
/*editor*/
#editor {
  height: 50vh;
}
</style>