<template>
  <div class="container-fluid">
    <transition name="fade" mode="out-in">
      <div class="col-md-4 login-form">
        <fg-input type="text" v-model="username" label="Username" placeholder="Nhập tên tài khoản"></fg-input>
        <fg-input type="password" v-model="password" label="Password" placeholder="Nhập mật khẩu"></fg-input>

        <p>
          Tạo tài khoản mới?
          <router-link to="/register">&nbsp;đăng kí</router-link>
        </p>
        <p>
          Quên mật khẩu?
          <router-link to="/resetpassword">&nbsp;lấy lại mật khẩu</router-link>
        </p>
        <div class="text-center">
          <p-button type="success" round @click.native.prevent="login" :disabled="loading">Đăng nhập</p-button>
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
      username: "",
      password: ""
    };
  },
  methods: {
    async login() {
      this.loading = true;
      let loader = this.$loading.show({
        loader: "dots",
        opacity: 0.1,
        color: "#007bff",
        zIndex: 999
      });

      await this.$store
        .dispatch("login", {
          username: this.username,
          password: this.password
        })
        .then(response => {
          this.loading = false;
          this.$notify({
            group: "foo",
            type: "info",
            title: "Login successfully!",
            text: "Welcome " + response.data.user.username
          });
          loader.hide();
          this.$router.push("/");
        })
        .catch(error => {
          this.loading = false;
          this.$notify({
            group: "foo",
            type: "warn",
            title: "Login error!",
            text: "Username or password incorrect "
          });
          loader.hide();
        });
    }
  }
};
</script>

<style scoped>
.login-form {
  margin: 15vh auto 0px auto;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 5px;
  background: #eee;
}
</style>