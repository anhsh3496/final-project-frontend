<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h5>{{problemName}}</h5>
          </div>
          <div class="card-body">
            <b-table
              striped
              hover
              bordered
              :fields="fields"
              :items="listUserSolution"
              head-variant="dark"
            >
              <template v-slot:cell(action)="row">
                <p
                  class="showSolutionDetail"
                  @click="row.toggleDetails"
                >{{ row.detailsShowing ? 'Đóng' : 'Xem chi tiết'}}</p>
              </template>

              <template v-slot:row-details="row">
                <vue-code-highlight>{{row.item.solutionContent}}</vue-code-highlight>
              </template>
            </b-table>
            <br />
            <p-button type="success" round @click.native.prevent="userSolutionPrevious">Quay lại</p-button>
            <p-button
              style="float: right"
              type="success"
              round
              @click.native.prevent="userSolutionNext"
            >Tiếp theo</p-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { component as VueCodeHighlight } from "vue-code-highlight";

export default {
  components: {
    VueCodeHighlight
  },
  data() {
    return {
      fields: [
        {
          key: "fullName",
          label: "Tên người dùng"
        },
        {
          key: "languageName",
          label: "Ngôn ngữ"
        },
        {
          key: "submitTime",
          label: "Số lần nộp bài"
        },
        {
          key: "lastSubmit",
          label: "Thời gian nộp bài"
        },
        {
          key: "result",
          label: "Kết quả"
        },
        {
          key: "action",
          label: "Chi tiết"
        }
      ],
      listUserSolution: [],
      currentPage: 0,
      sizePerPage: 10,
      totalPage: 0,
      problemSolutionId: 0,
      problemName: ""
    };
  },
  created() {
    let problemSolutionId = this.$route.query.id;
    let currentProblemSolutionId = this.$store.state.currentProblemSolution;

    if (problemSolutionId) {
      this.problemSolutionId = problemSolutionId;
      this.getListUserSolution();
    } else if (currentProblemSolutionId) {
      this.problemSolutionId = currentProblemSolutionId;
      this.getListUserSolution();
    } else {
    }
  },
  methods: {
    async getListUserSolution() {
      let loader = this.$loading.show({
        loader: "dots",
        opacity: 0.1,
        color: "#007bff",
        zIndex: 999
      });
      await this.$store
        .dispatch("getListUserSolution", {
          problem: this.problemSolutionId,
          page: this.currentPage,
          size: this.sizePerPage
        })
        .then(response => {
          this.totalPage = response.data.totalPage;
          this.listUserSolution = response.data.data;
          this.problemName = response.data.data[0].problemName;
          loader.hide();
        })
        .catch(error => {
          console.log("error");
          loader.hide();
        });
      loader.hide();
    },
    userSolutionPrevious() {
      if (this.currentPage > 0) {
        this.currentPage -= 1;
        this.getListUserSolution();
      }
    },
    userSolutionNext() {
      if (this.currentPage < this.totalPage - 1) {
        this.currentPage += 1;
        this.getListUserSolution();
      }
    }
  }
};
</script>

<style scoped>
.showSolutionDetail {
  color: #68b3c8;
}

.showSolutionDetail:hover {
  cursor: pointer;
  color: #3091b2;
}
</style>