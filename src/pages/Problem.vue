<template>
  <div>
    <!--Stats cards-->
    <div class="row">
      <div class="col-md-6 col-xl-3" v-for="(problem, k) in listProblem" :key="k">
        <stats-card>
          <div class="icon-big text-center" v-if="problem.level === 3" slot="header">
            <i class="ti-crown" style="color: #EB5E29"></i>
          </div>
          <div class="icon-big text-center" v-else-if="problem.level === 2" slot="header">
            <i class="ti-medall" style="color: #F3BB45"></i>
          </div>
          <div class="icon-big text-center" v-else slot="header">
            <i class="ti-ruler-pencil" style="color: #54B883"></i>
          </div>
          <div class="numbers" slot="content">
            <router-link :to="{path:'/solution',query:{id:problem.id}}">
              <p>{{problem.name}}</p>
            </router-link>
            <p v-if="problem.level === 3" style="color: #F9C216">
              <i class="ti-star"></i>
              <i class="ti-star"></i>
              <i class="ti-star"></i>
            </p>
            <p v-else-if="problem.level === 2" style="color: #F9C216">
              <i class="ti-star"></i>
              <i class="ti-star"></i>
            </p>
            <p v-else style="color: #F9C216">
              <i class="ti-star"></i>
            </p>
            <p>
              {{problem.point}}
              Point
            </p>
          </div>
          <div class="stats" slot="footer">
            <i class="ti-calendar"></i>
            {{problem.createDate}}
          </div>
        </stats-card>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <p-button type="success" round @click.native.prevent="previous">Quay lại</p-button>
        <p-button style="float: right" type="success" round @click.native.prevent="next">Tiếp theo</p-button>
      </div>
    </div>
  </div>
</template>
<script>
import { StatsCard, ChartCard } from "@/components/index";
import Pagination from "@/components";

export default {
  components: {
    StatsCard
  },
  data() {
    return {
      currentPage: 0,
      maxPage: 10,
      sizePerPage: 12,
      listProblem: []
    };
  },
  created() {
    this.getProblem();
  },
  methods: {
    previous() {
      if (this.currentPage > 0) {
        this.currentPage -= 1;
        this.getProblem();
      }
    },
    next() {
      if (this.currentPage < this.maxPage - 1) {
        this.currentPage += 1;
        this.getProblem();
      }
    },
    async getProblem() {
      let loader = this.$loading.show({
        loader: "dots",
        opacity: 0.1,
        color: "#007bff",
        zIndex: 999
      });

      await this.$store
        .dispatch("getProblem", {
          page: this.currentPage,
          size: this.sizePerPage
        })
        .then(response => {
          this.maxPage = response.data.totalPage;
          this.listProblem = response.data.data;
          loader.hide();
        });
    }
  }
};
</script>
<style>
</style>
