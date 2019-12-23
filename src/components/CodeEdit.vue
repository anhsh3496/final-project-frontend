<template>
  <div class="editor">
    <div class="menu">
      <select name="language" v-model="language" @change="changeStyle">
        <option value="c_cpp">C/C++</option>
        <option value="java">Java</option>
        <option value="python">Python</option>
      </select>

      <select name="theme" v-model="theme" @change="changeStyle">
        <option value="textmate">Textmate</option>
        <option value="monokai">Monokai</option>
        <option value="eclipse">Eclipse</option>
        <option value="crimson_editor">Crimson</option>
      </select>

      <select name="font-size" v-model="fontSize" @change="changeStyle">
        <option value="14px">14px</option>
        <option value="16px">16px</option>
        <option value="18px">18px</option>
        <option value="20px">20px</option>
      </select>

      <button @click="submit">
        <i class="ti-control-play" style="margin-right: 5px"></i>
        <span>Submit</span>
      </button>
      <button @click="save">
        <i class="ti-save" style="margin-right: 5px"></i>
        <span>Save</span>
      </button>
    </div>
    <div id="code-edit" @change="changeContent"></div>
  </div>
</template>

<script>
export default {
  name: "code-edit",
  props: {
    sourceCode: {
      type: Object,
      default: {
        cpp: "",
        java: "",
        python: ""
      }
    }
  },
  data() {
    return {
      language: "c_cpp",
      theme: "textmate",
      fontSize: "14px"
    };
  },
  mounted() {
    var code_edit = ace.edit("code-edit");
    code_edit.getSession().setTabSize(4);
    code_edit.getSession().setMode("ace/mode/" + this.language);
    code_edit.setTheme("ace/theme/" + this.theme);
    code_edit.setFontSize(this.fontSize);
    code_edit.setValue(this.getSourceCode(this.language));
  },
  methods: {
    getSourceCode(language) {
      if (language == "c_cpp") {
        return this.sourceCode.cpp;
      } else if (language == "java") {
        return this.sourceCode.java;
      } else {
        return this.sourceCode.python;
      }
    },
    changeStyle() {
      let code_edit = ace.edit("code-edit");
      code_edit.getSession().setTabSize(4);
      code_edit.getSession().setMode("ace/mode/" + this.language);
      code_edit.setTheme("ace/theme/" + this.theme);
      code_edit.setFontSize(this.fontSize);
      code_edit.setValue(this.getSourceCode(this.language));
    },

    changeContent() {
      let code_edit = ace.edit("code-edit");
      let sourceCode = code_edit.getValue();
      this.$emit("changeContent", {
        isSave: false,
        language: this.language,
        sourceCode: sourceCode
      });
    },
    getLanguageId(language) {
      if (language == "c_cpp") {
        return 2;
      } else if (language == "java") {
        return 1;
      } else {
        return 3;
      }
    },
    submit() {
      let code_edit = ace.edit("code-edit");
      let sourceCode = code_edit.getValue();
      this.$emit("submit", {
        language: this.getLanguageId(this.language),
        sourceCode: sourceCode
      });
    },

    save() {
      let code_edit = ace.edit("code-edit");
      let sourceCode = code_edit.getValue();
      this.$emit("save", {
        language: this.getLanguageId(this.language),
        sourceCode: sourceCode
      });
    }
  }
};
</script>

<style>
.editor {
  border: 3px solid #35495e;
  margin-bottom: 20px;
}
.menu {
  padding-top: 10px;
  background: #35495e;
  height: 50px;
}

.menu select {
  height: 30px;
  background: #eee;
  margin-left: 20px;
  padding: 0px 10px;
  width: 120px;
  float: left;
  border: 1px solid #5babc3;
  border-radius: 3px;
}

.menu button {
  display: flex;
  align-content: center;
  align-items: center;
  float: right;
  text-align: center;
  height: 30px;
  max-width: 100%;
  margin-right: 20px;
  background: #eee;
  border: 1px solid #5babc3;
  border-radius: 3px;
}

#code-edit {
  font-size: 14px;
  font-family: "Consolas";
  height: 500px;
  padding-bottom: 10px;
  line-height: 25px;
}
</style>