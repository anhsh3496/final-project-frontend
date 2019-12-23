<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h3>Thêm mới danh mục</h3>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-12">
              <fg-input
                v-model="categoryData.name"
                type="text"
                label="Tên danh mục"
                placeholder="Nhập tên danh mục"
              ></fg-input>
            </div>

            <div class="col-md-12">
              <b-button @click="createCategory(categoryData)" variant="primary">Tạo danh mục</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h3>Thêm mới bài tập</h3>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-6">
              <fg-input
                v-model="problemData.name"
                type="text"
                label="Tên bài tập"
                placeholder="Nhập tên bài tập"
              ></fg-input>
            </div>

            <div class="col-md-6">
              <b-form-group label="Tên danh mục">
                <b-form-select v-model="problemData.categoryId" :options="categories" required></b-form-select>
              </b-form-group>
            </div>

            <div class="col-md-3">
              <b-form-group label="Độ khó">
                <b-form-select v-model="problemData.level" :options="levels" required></b-form-select>
              </b-form-group>
            </div>
            <div class="col-md-3">
              <b-form-group label="Điểm">
                <b-form-select v-model="problemData.point" :options="points" required></b-form-select>
              </b-form-group>
            </div>

            <div class="col-md-3">
              <fg-input
                v-model="problemData.timeLimit"
                type="text"
                label="Thời gian chạy (s)"
                placeholder="(s)"
              ></fg-input>
            </div>

            <div class="col-md-3">
              <b-form-group label="Trạng thái">
                <b-form-select v-model="problemData.status" :options="status" required></b-form-select>
              </b-form-group>
            </div>

            <div class="col-md-6">
              <label>Test Case</label>
              <b-form-textarea
                v-model="problemData.testCase"
                class="text-area"
                placeholder="Nhập test case"
                rows="10"
                max-rows="10"
              ></b-form-textarea>
            </div>

            <div class="col-md-6">
              <label>Đáp án</label>
              <b-form-textarea
                v-model="problemData.answer"
                class="text-area"
                placeholder="Nhập đáp án"
                rows="10"
                max-rows="10"
              ></b-form-textarea>
            </div>

            <div class="col-md-12">
              <br />
              <label>Nội dung bài tập</label>
              <text-edit v-model="problemData.problemContent"></text-edit>
              <br />
              <b-button @click="createProblem(problemData)" variant="primary">Tạo bài tập</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "tui-editor/dist/tui-editor.css";
import "tui-editor/dist/tui-editor-contents.css";
import "codemirror/lib/codemirror.css";
import "tui-editor/dist/tui-editor-contents.css";
import "highlight.js/styles/atom-one-light.css";
import { Editor, Viewer } from "@toast-ui/vue-editor";

export default {
  components: {
    "text-edit": Editor,
    viewer: Viewer
  },
  data() {
    return {
      editorText: "int main()",
      points: [
        { value: "100", text: "100" },
        { value: "200", text: "200" },
        { value: "300", text: "300" },
        { value: "400", text: "400" },
        { value: "500", text: "500" }
      ],
      levels: [
        { value: "1", text: "Cơ bản" },
        { value: "2", text: "Trung bình" },
        { value: "3", text: "Nâng cao" }
      ],
      status: [
        { value: "true", text: "true" },
        { value: "false", text: "false" }
      ],
      categories: [],

      categoryData: {},
      problemData: {}
    };
  },
  created() {
    this.getAllCategory();
  },
  methods: {
    async getAllCategory() {
      let loader = this.$loading.show({
        loader: "dots",
        opacity: 0.1,
        color: "#007bff",
        zIndex: 999
      });

      await this.$store
        .dispatch("getAllCategory", {
          page: 0,
          size: 100
        })
        .then(response => {
          response.data.data.forEach(item =>
            this.categories.push({
              value: item.id,
              text: item.name
            })
          );
        })
        .catch(error => {});

      loader.hide();
    },

    async createCategory(data) {
      let loader = this.$loading.show({
        loader: "spinner",
        opacity: 0.1,
        color: "#007bff",
        zIndex: 999
      });
      await this.$store
        .dispatch("createCategory", {
          name: data.name
        })
        .then(response => {
          this.categories.push({
            value: response.data.id,
            text: response.data.name
          });

          this.$notify({
            group: "foo",
            type: "success",
            title: "Thêm mới danh mục thành công"
          });
        })
        .catch(error => {
          this.$notify({
            group: "foo",
            type: "warn",
            title: "Thêm mới danh mục thất bại"
          });
        });
      loader.hide();
    },

    async createProblem(data) {
      let loader = this.$loading.show({
        loader: "spinner",
        opacity: 0.1,
        color: "#007bff",
        zIndex: 999
      });
      await this.$store
        .dispatch("createProblem", {
          answer: data.answer,
          categoryId: data.categoryId,
          timeLimit: data.timeLimit,
          id: data.id,
          status: data.status,
          level: data.level,
          name: data.name,
          point: data.point,
          problemContent: data.problemContent,
          testCase: data.testCase
        })
        .then(response => {
          this.$notify({
            group: "foo",
            type: "success",
            title: "Thêm mới bài tập thành công"
          });
        })
        .catch(error => {
          this.$notify({
            group: "foo",
            type: "warn",
            title: "Thêm mới bài tập thất bại"
          });
        });
      loader.hide();
    }
  }
};
</script>
<style scoped>
.text-area {
  border: 1px solid #ced4da;
}
</style>
