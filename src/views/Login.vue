<template>
  <div class="login">
    <div class="login-box">
      <h3>鸿雁</h3>
      <van-cell-group>
        <van-field v-model="username" clearable placeholder="请输入用户名" />
      </van-cell-group>
      <van-cell-group>
        <van-field
          v-model="password"
          clearable
          type="password"
          placeholder="请输入密码"
        />
      </van-cell-group>
      <van-cell-group>
        <van-button type="info" class="login-btn" @click="login"
          >登录</van-button
        >
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  background: #fafafa;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  // padding: 16px;

  .login-box {
    width: 100%;

    .login-btn {
      width: 100%;
    }
  }
}
</style>
