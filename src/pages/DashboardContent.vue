<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h5>Danh sách danh mục</h5>
          </div>
          <div class="card-body">
            <b-table
              striped
              hover
              bordered
              :fields="fieldCategory"
              :items="listCategory"
              head-variant="dark"
            >
              <template v-slot:cell(update)="row">
                <p
                  class="showSolutionDetail"
                  @click="row.toggleDetails"
                >{{ row.detailsShowing ? 'Đóng' : 'Cập nhật nội dung'}}</p>
              </template>
              <template v-slot:row-details="row">
                <div class="row">
                  <div class="col-md-8">
                    <b-form-group label="Tên danh mục">
                      <fg-input type="text" v-model="row.item.name" placeholder="Nhập tên danh mục"></fg-input>
                    </b-form-group>
                  </div>
                  <div class="col-md-4">
                    <b-form-group label="Trạng thái">
                      <b-form-select :options="status" required v-model="row.item.status"></b-form-select>
                    </b-form-group>
                  </div>
                  <div class="col-md-12">
                    <b-button @click="updateCategory(row.item)" variant="primary">Cập nhật</b-button>
                  </div>
                </div>
              </template>
            </b-table>
            <br />
            <p-button type="success" round @click.native.prevent="categoryPrevious">Quay lại</p-button>
            <p-button
              style="float: right"
              type="success"
              round
              @click.native.prevent="categoryNext"
            >Tiếp theo</p-button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h5>Danh sách bài tập</h5>
          </div>
          <div class="card-body">
            <b-table
              striped
              hover
              bordered
              :fields="fieldProblem"
              :items="listProblem"
              head-variant="dark"
            >
              <template v-slot:cell(update)="row">
                <p
                  class="showSolutionDetail"
                  @click="row.toggleDetails"
                >{{ row.detailsShowing ? 'Đóng' : 'Cập nhật nội dung'}}</p>
              </template>
              <template v-slot:cell(viewUser)="row">
                <router-link :to="{path:'/management-solution',query:{id:row.item.id}}">
                  <p>Xem bài làm</p>
                </router-link>
              </template>
              <template v-slot:row-details="row">
                <div class="row">
                  <div class="col-md-6">
                    <fg-input
                      v-model="row.item.name"
                      type="text"
                      label="Tên bài tập"
                      placeholder="Nhập tên bài tập"
                    ></fg-input>
                  </div>

                  <div class="col-md-6">
                    <b-form-group label="Tên danh mục">
                      <b-form-select v-model="row.item.category.id" :options="categories" required></b-form-select>
                    </b-form-group>
                  </div>

                  <div class="col-md-3">
                    <b-form-group label="Độ khó">
                      <b-form-select v-model="row.item.level" :options="levels" required></b-form-select>
                    </b-form-group>
                  </div>
                  <div class="col-md-3">
                    <b-form-group label="Điểm">
                      <b-form-select v-model="row.item.point" :options="points" required></b-form-select>
                    </b-form-group>
                  </div>

                  <div class="col-md-3">
                    <fg-input
                      v-model="row.item.timeLimit"
                      type="text"
                      label="Thời gian chạy (s)"
                      placeholder="(s)"
                    ></fg-input>
                  </div>

                  <div class="col-md-3">
                    <b-form-group label="Trạng thái">
                      <b-form-select :options="status" required v-model="row.item.status"></b-form-select>
                    </b-form-group>
                  </div>

                  <div class="col-md-6">
                    <label>Test Case</label>
                    <b-form-textarea
                      class="text-area"
                      placeholder="Nhập test case"
                      rows="10"
                      max-rows="10"
                      v-model="row.item.testCase"
                    ></b-form-textarea>
                  </div>

                  <div class="col-md-6">
                    <label>Đáp án</label>
                    <b-form-textarea
                      class="text-area"
                      placeholder="Nhập đáp án"
                      rows="10"
                      max-rows="10"
                      v-model="row.item.answer"
                    ></b-form-textarea>
                  </div>

                  <div class="col-md-12">
                    <br />
                    <label>Nội dung bài tập</label>
                    <text-edit v-model="row.item.problemContent"></text-edit>
                    <br />
                    <b-button @click="updateProblem(row.item)" variant="primary">Cập nhật</b-button>
                  </div>
                </div>
              </template>
            </b-table>
            <br />
            <p-button type="success" round @click.native.prevent="problemPrevious">Quay lại</p-button>
            <p-button
              style="float: right"
              type="success"
              round
              @click.native.prevent="problemNext"
            >Tiếp theo</p-button>
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
import { Editor } from "@toast-ui/vue-editor";

export default {
  components: {
    "text-edit": Editor
  },
  data() {
    return {
      fieldCategory: [
        { key: "id", label: "No." },
        { key: "name", label: "Tên danh mục" },
        { key: "status", label: "Trạng thái" },
        { key: "update", label: "Cập nhật thông tin" }
      ],
      listCategory: [],
      categoryCurrentPage: 0,
      categorySizePerPage: 10,
      categoryTotalPage: 0,
      status: [
        { value: "true", text: "true" },
        { value: "false", text: "false" }
      ],

      fieldProblem: [
        { key: "id", label: "No." },
        { key: "name", label: "Tên bài tập" },
        { key: "level", label: "Độ khó" },
        { key: "point", label: "Điểm" },
        { key: "update", label: "Cập nhật thông tin" },
        { key: "viewUser", label: "Xem bài giải" }
      ],
      listProblem: [],
      problemCurrentPage: 0,
      problemSizePerPage: 10,
      problemTotalPage: 0,

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
      categories: []
    };
  },
  created() {
    this.getAllCategory();
    this.getProblem();
    this.getCategories();
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
          page: this.categoryCurrentPage,
          size: this.categorySizePerPage
        })
        .then(response => {
          this.categoryTotalPage = response.data.totalPage;
          this.listCategory = response.data.data;
        });

      loader.hide();
    },
    async getCategories() {
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

    async getProblem() {
      let loader = this.$loading.show({
        loader: "dots",
        opacity: 0.1,
        color: "#007bff",
        zIndex: 999
      });

      await this.$store
        .dispatch("getAllProblem", {
          page: this.problemCurrentPage,
          size: this.problemSizePerPage
        })
        .then(response => {
          this.problemTotalPage = response.data.totalPage;
          this.listProblem = response.data.data;
        });
      loader.hide();
    },

    categoryPrevious() {
      if (this.categoryCurrentPage > 0) {
        this.categoryCurrentPage -= 1;
        this.getAllCategory();
      }
    },
    categoryNext() {
      if (this.categoryCurrentPage < this.categoryTotalPage - 1) {
        this.categoryCurrentPage += 1;
        this.getAllCategory();
      }
    },
    problemPrevious() {
      if (this.problemCurrentPage > 0) {
        this.problemCurrentPage -= 1;
        this.getProblem();
      }
    },
    problemNext() {
      if (this.problemCurrentPage < this.problemTotalPage - 1) {
        this.problemCurrentPage += 1;
        this.getProblem();
      }
    },

    async updateCategory(data) {
      let loader = this.$loading.show({
        loader: "spinner",
        opacity: 0.1,
        color: "#007bff",
        zIndex: 999
      });

      await this.$store
        .dispatch("updateCategory", {
          id: data.id,
          name: data.name
        })
        .then(response => {
          this.categories.forEach(item => {
            if (item.value == response.data.id) {
              item.text = response.data.name;
            }
          });
          this.$notify({
            group: "foo",
            type: "success",
            title: "Cập nhật danh mục thành công"
          });
        })
        .catch(error => {
          this.$notify({
            group: "foo",
            type: "warn",
            title: "Cập nhật danh mục thất bại"
          });
        });

      loader.hide();
    },

    async updateProblem(data) {
      let loader = this.$loading.show({
        loader: "spinner",
        opacity: 0.1,
        color: "#007bff",
        zIndex: 999
      });

      await this.$store
        .dispatch("updateProblem", {
          answer: data.answer,
          categoryId: data.category.id,
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
            title: "Cập nhật nội dung bài tập thành công"
          });
        })
        .catch(error => {
          this.$notify({
            group: "foo",
            type: "warn",
            title: "Cập nhật nội dung bài tập thất bại"
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
  background: #fff;
}

.showSolutionDetail {
  color: #68b3c8;
}

.showSolutionDetail:hover {
  cursor: pointer;
  color: #3091b2;
}
</style>
