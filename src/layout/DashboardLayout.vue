<template>
  <div class="wrapper">
    <side-bar :title="userInfo">
      <template slot="links">
        <sidebar-link v-if="roleMember || roleAdmin" to="/home" name="Trang chủ" icon="ti-home" />
        <sidebar-link
          v-if="roleMember || roleAdmin"
          to="/problem"
          name="Danh sách Bài Tập"
          icon="ti-package"
        />
        <sidebar-link
          v-if="roleMember || roleAdmin"
          to="/solution"
          name="Giải Bài Tập"
          icon="ti-palette"
        />
        <sidebar-link
          v-if="roleMember || roleAdmin"
          to="/user-solution"
          name="Danh sách bài làm"
          icon="ti-cup"
        />
        <sidebar-link
          v-if="roleMember || roleAdmin"
          to="/user-profile"
          name="Thông tin người dùng"
          icon="ti-user"
        />
        <sidebar-link
          v-if="roleAdmin"
          to="/dashboard-content"
          name="Quản trị nội dung"
          icon="ti-list-ol"
        />
        <sidebar-link
          v-if="roleAdmin"
          to="/management-content"
          name="Thêm mới nội dung"
          icon="ti-view-grid"
        />
        <sidebar-link
          v-if="roleAdmin"
          to="/management-solution"
          name="Quản trị bài tập"
          icon="ti-book"
        />
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>
      <dashboard-content @click.native="toggleSidebar"></dashboard-content>
      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent
  },
  data() {
    return {
      roleAdmin: this.$store.getters.isRoleMember,
      roleMember: this.$store.getters.isRoleAdmin,
      userInfo: this.$store.getters.getUserInfo.username
    };
  },
  created() {
    this.roleMember = this.$store.getters.isRoleMember;
    this.roleAdmin = this.$store.getters.isRoleAdmin;
    let userLoginInfo = this.$store.getters.getUserInfo;
    if (userLoginInfo) {
      this.userInfo = "Xin chào: " + userLoginInfo.username.toUpperCase();
    }
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
