<template>
  <div class="container-fluid">
    <transition name="fade" mode="out-in">
      <div class="col-md-4 register-form">
        <fg-input type="text" v-model="username" label="Username" placeholder="Nhập tên tài khoản"></fg-input>
        <fg-input type="email" v-model="email" label="E-mail" placeholder="Nhập email"></fg-input>
        <fg-input type="password" v-model="password" label="Password" placeholder="Nhập mật khẩu"></fg-input>
        <p>
          Nếu bạn đã có tài khoản?
          <router-link to="/login">&nbsp;đăng nhập</router-link>
        </p>
        <div class="text-center">
          <p-button type="success" round @click.native.prevent="register">Đăng kí</p-button>
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
      email: "",
      password: ""
    };
  },
  methods: {
    async register() {
      this.loading = true;
      let loader = this.$loading.show({
        loader: "dots",
        opacity: 0.1,
        color: "#007bff",
        zIndex: 999
      });

      this.$store
        .dispatch("register", {
          username: this.username,
          email: this.email,
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
            title: "Register error!",
            text: "Username or Email is exists"
          });
          loader.hide();
        });
    }
  }
};
</script>

<style scoped>
.register-form {
  margin: 15vh auto 0px auto;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 5px;
  background: #eee;
}
</style>