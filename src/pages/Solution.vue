<template>
  <div class="row">
    <div class="col-md-12">
      <card>
        <div class="card-body">
          <div v-if="problemId == 0">
            <h3>Hãy chọn bài tập và tìm lời giải ...!</h3>
          </div>
          <div v-else>
            <h3>Bài tập: {{problem.name}}</h3>
            <h5>Danh mục: {{problem.category}}</h5>
            <p>Độ khó: {{getLevel(problem.level)}} - Điểm: {{problem.point}} - Thời gian chạy: {{problem.timeLimit}}</p>
            <div class="content">
              <viewer :value="problem.problemContent" />
            </div>
          </div>
        </div>
      </card>
    </div>
    <div class="col-md-12">
      <code-edit
        :v-model="sourceCode"
        :sourceCode="sourceCode"
        @submit="submit"
        @save="save"
        @changeContent="changeContent"
      ></code-edit>
    </div>
  </div>
</template>

<script>
import CodeEdit from "@/components/CodeEdit.vue";

import "tui-editor/dist/tui-editor.css";
import "tui-editor/dist/tui-editor-contents.css";
import "codemirror/lib/codemirror.css";
import "tui-editor/dist/tui-editor-contents.css";
import "highlight.js/styles/atom-one-light.css";
import { Viewer } from "@toast-ui/vue-editor";

export default {
  components: {
    CodeEdit,
    Viewer
  },
  data() {
    return {
      isSave: true,
      problem: {},
      sourceCode: {
        cpp: "",
        java: "",
        python: ""
      },
      problemId: 0
    };
  },
  created() {
    let problemId = this.$route.query.id;
    let currentProblemId = this.$store.state.currentProblem;

    if (problemId) {
      this.problemId = problemId;
      this.getProblem(problemId);
      this.getUserSolution(problemId);
    } else if (currentProblemId) {
      this.problemId = currentProblemId;
      this.getProblem(currentProblemId);
      this.getUserSolution(currentProblemId);
    } else {
      this.problem.problemContent = "Hãy chọn bài tập và tìm lời giải ...!";
    }
  },
  methods: {
    getLevel(level) {
      if (level == 1) {
        return "Cơ bản";
      } else if (level == 2) {
        return "Trung bình";
      } else if (level == 3) {
        return "Nâng cao";
      }
    },

    async getProblem(problemId) {
      let loader = this.$loading.show({
        loader: "dots",
        opacity: 0.1,
        color: "#007bff",
        zIndex: 999
      });

      await this.$store.dispatch("getProblemById", problemId).then(response => {
        this.problem = response.data;
      });

      loader.hide();
    },
    async getUserSolution(problemId) {
      let loader = this.$loading.show({
        loader: "dots",
        opacity: 0.1,
        color: "#007bff",
        zIndex: 999
      });

      await this.$store
        .dispatch("getUserSolution", problemId)
        .then(response => {
          for (let item of response.data) {
            if (item.language.id == 1) {
              this.sourceCode.java = item.solutionContent;
            } else if (item.language.id == 2) {
              this.sourceCode.cpp = item.solutionContent;
            } else {
              this.sourceCode.python = item.solutionContent;
            }
          }
        });

      loader.hide();
    },
    async submit(data) {
      this.isSave = true;
      let loader = this.$loading.show({
        loader: "spinner",
        opacity: 0.1,
        color: "#007bff",
        zIndex: 999
      });

      await this.$store
        .dispatch("submitUserSolution", {
          languageId: data.language,
          problemId: this.problemId,
          sourceCode: data.sourceCode
        })
        .then(response => {
          this.$notify({
            group: "foo",
            type: "info",
            title: "Kết quả bài tập",
            text:
              "Result: " +
              response.data.result +
              "% - Point: " +
              response.data.point
          });
          loader.hide();
        })
        .catch(error => {
          this.$notify({
            group: "foo",
            type: "info",
            title: "Nộp bài tập bị lỗi, xin thử lại!"
          });
          loader.hide();
        });
    },
    async save(data) {
      this.isSave = true;
      let loader = this.$loading.show({
        loader: "spinner",
        opacity: 0.1,
        color: "#007bff",
        zIndex: 999
      });
      await this.$store
        .dispatch("saveUserSolution", {
          languageId: data.language,
          problemId: this.problemId,
          sourceCode: data.sourceCode
        })
        .then(response => {
          this.$notify({
            group: "foo",
            type: "info",
            title: "Lưu bài tập thành công!"
          });
          loader.hide();
        })
        .catch(error => {
          this.$notify({
            group: "foo",
            type: "warn",
            title: "Lưu bài làm thất bại!"
          });
          loader.hide();
        });
    },
    changeContent(data) {
      this.isSave = data.isSave;
      if (data.language === "c_cpp") {
        this.sourceCode.cpp = data.sourceCode;
      } else if (data.language === "java") {
        this.sourceCode.java = data.sourceCode;
      } else {
        this.sourceCode.python = data.sourceCode;
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.isSave == false) {
      if (!window.confirm("Leave without saving?")) {
        return;
      }
    }
    next();
  }
};
</script>
<style scoped>
.content {
  border-top: 2px solid #888;
}
</style>
