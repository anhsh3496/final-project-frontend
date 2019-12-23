<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header"></div>
        <div class="card-body">
          <b-table
            striped
            hover
            bordered
            :items="userSolution"
            :fields="fields"
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
          <p-button type="success" round @click.native.prevent="previous">Quay lại</p-button>
          <p-button style="float: right" type="success" round @click.native.prevent="next">Tiếp theo</p-button>
        </div>
        <div class="card-footer"></div>
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
      currentPage: 0,
      maxPage: 10,
      sizePerPage: 10,
      fields: [
        {
          key: "problemName",
          label: "Tên bài tập"
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
          key: "point",
          label: "Điểm"
        },
        {
          key: "language",
          label: "Ngôn ngữ"
        },
        {
          key: "action",
          label: "Xem bài làm"
        }
      ],
      userSolution: []
    };
  },
  created() {
    this.getUserSolutionByUser();
  },
  methods: {
    async getUserSolutionByUser() {
      let loader = this.$loading.show({
        loader: "dots",
        opacity: 0.1,
        color: "#007bff",
        zIndex: 999
      });
      await this.$store
        .dispatch("getUserSolutionByUser", {
          page: this.currentPage,
          size: this.sizePerPage
        })
        .then(response => {
          this.maxPage = response.data.totalPage;
          this.userSolution = response.data.data;
        });
      loader.hide();
    },
    previous() {
      console.log("previous");
      if (this.currentPage > 0) {
        this.currentPage -= 1;
        this.getUserSolutionByUser();
      }
    },
    next() {
      console.log("next");
      if (this.currentPage < this.maxPage - 1) {
        this.currentPage += 1;
        this.getUserSolutionByUser();
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
