<template>
  <div class="container-fluid">
    <transition name="fade" mode="out-in">
      <div class="col-md-4 resetpassword-form">
        <fg-input type="email" v-model="email" label="E-mail" placeholder="Nhập email"></fg-input>
        <p>
          Nếu bạn đã có tài khoản?
          <router-link to="/login">&nbsp;đăng nhập</router-link>
        </p>
        <div class="text-center">
          <p-button type="success" round @click.native.prevent="resetPassword">Lấy lại mật khẩu</p-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      email: ""
    };
  },
  methods: {
    resetPassword() {
      this.loading = true;
      this.$store
        .dispatch("resetPassword", {
          email: this.email
        })
        .then(response => {
          this.loading = false;
          console.log(response);
        })
        .catch(error => {
          this.loading = false;
          this.serverError = error.response.data;
          this.password = "";
          this.successMessage = "";
        });
    }
  }
};
</script>

<style scoped>
.resetpassword-form {
  margin: 15vh auto 0px auto;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 5px;
  background: #eee;
}
</style>