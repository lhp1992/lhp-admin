<template>
  <div>
    <p class="tips">*请插入数字证书后点击登录。</p>
    <el-button type="primary" @click="$parent.toHome">登录</el-button>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
  .tips {
    color: red;
    text-align: center;
    font-size: 14px;
  }
</style>
