<template>
  <div>

    <el-input
      placeholder="请输入登录账号"
      prefix-icon="el-icon-user"
      v-model="loginForm.username">
    </el-input>

    <el-input
      placeholder="请输入登录密码"
      prefix-icon="el-icon-lock"
      show-password
      v-model="loginForm.password">
    </el-input>

    <el-button type="primary" @click="$parent.toHome(Object.assign({}, loginForm))">登录</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm:{
        username: '',
        password: ''
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>