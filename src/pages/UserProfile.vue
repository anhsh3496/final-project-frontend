<template>
  <div class="row">
    <div class="col-xl-4 col-lg-5 col-md-6">
      <div class="row">
        <div class="col-md-12">
          <card class="card-user">
            <div>
              <div class="author">
                <img class="avatar border-white" src="@/assets/img/faces/face-1.jpg" alt="..." />
                <h4 class="title">
                  {{ username }}
                  <br />
                  <small>{{ email }}</small>
                </h4>
              </div>
              <p class="description text-center">{{ descriptions }}</p>
            </div>
          </card>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <card class="card">
            <div>
              <form @submit.prevent>
                <div class="row">
                  <div class="col-md-12">
                    <fg-input
                      type="password"
                      placeholder="Enter old password"
                      v-model="oldPassword"
                    ></fg-input>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <fg-input
                      type="password"
                      placeholder="Enter new password"
                      v-model="newPassword"
                    ></fg-input>
                  </div>
                </div>
                <div class="text-center">
                  <p-button type="info" round @click.native.prevent="changePassword">Change Password</p-button>
                </div>
                <div class="clearfix"></div>
              </form>
            </div>
          </card>
        </div>
      </div>
    </div>
    <div class="col-xl-8 col-lg-7 col-md-6">
      <card class="card" title="Cập nhật thông tin cá nhân">
        <div>
          <form @submit.prevent>
            <div class="row">
              <div class="col-md-12">
                <fg-input type="text" label="Nhập E-mail" placeholder="Nhập E-mail" v-model="email"></fg-input>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <fg-input
                  type="text"
                  label="Họ và tên"
                  placeholder="Nhập họ và tên"
                  v-model="fullName"
                ></fg-input>
              </div>
              <div class="col-md-6">
                <fg-input
                  type="text"
                  label="Ngày tháng năm sinh"
                  placeholder="yyyy-mm-dd"
                  v-model="dateOfBirth"
                ></fg-input>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label>Thông tin thêm</label>
                  <textarea
                    rows="5"
                    class="form-control border-input"
                    placeholder="Nhập thông tin mô tả về bạn"
                    v-model="descriptions"
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="text-center">
              <p-button type="info" round @click.native.prevent="updateProfile">Update Profile</p-button>
            </div>
            <div class="clearfix"></div>
          </form>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      descriptions: "",
      fullName: "",
      dateOfBirth: "",
      oldPassword: "",
      newPassword: ""
    };
  },
  created() {
    let userInfo = this.$store.getters.getUserInfo;
    this.username = userInfo.username;
    this.email = userInfo.email;
    this.descriptions = userInfo.descriptions;
    this.fullName = userInfo.fullName;
    this.dateOfBirth = userInfo.dateOfBirth;
  },
  methods: {
    async updateProfile() {
      let loader = this.$loading.show({
        loader: "dots",
        opacity: 0.1,
        color: "#007bff",
        zIndex: 999
      });

      await this.$store
        .dispatch("updateProfile", {
          email: this.email,
          fullName: this.fullName,
          dateOfBirth: this.dateOfBirth,
          descriptions: this.descriptions
        })
        .then(response => {
          this.loading = false;
          this.$notify({
            group: "foo",
            type: "success",
            title: "Update profile successfully!"
          });
        })
        .catch(error => {
          this.loading = false;
          this.$notify({
            group: "foo",
            type: "warn",
            title: "Update profile error!"
          });
        });

      loader.hide();
    },
    async changePassword() {
      let loader = this.$loading.show({
        loader: "dots",
        opacity: 0.1,
        color: "#007bff",
        zIndex: 999
      });

      await this.$store
        .dispatch("changePassword", {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword
        })
        .then(response => {
          this.loading = false;
          this.$notify({
            group: "foo",
            type: "success",
            title: "Change password successfully!"
          });
        })
        .catch(error => {
          this.loading = false;
          this.$notify({
            group: "foo",
            type: "warn",
            title: "Change password error!"
          });
        });

      loader.hide();
    }
  }
};
</script>
<style>
</style>
