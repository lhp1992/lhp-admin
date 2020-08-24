<template>
  <div>
    <h2 class="form-item-title">基本信息</h2>
    <lhp-form-row :gutter="50" class="form-item-bar">
      <lhp-form-col label="活动区域" :span="24">
        <el-input size="medium" v-model="form.name"></el-input>
      </lhp-form-col>
      <lhp-form-col label="活动名称">
        <el-input size="medium" v-model="form.name"></el-input>
      </lhp-form-col>
      <lhp-form-col label="活动区域">
        <el-input size="medium" v-model="form.name"></el-input>
      </lhp-form-col>
      <lhp-form-col label="活动名称">
        <el-input size="medium" v-model="form.name"></el-input>
      </lhp-form-col>
      <lhp-form-col label="活动区域">
        <el-input size="medium" v-model="form.name"></el-input>
      </lhp-form-col>
      <lhp-form-col label="活动名称">
        <el-input size="medium" v-model="form.name"></el-input>
      </lhp-form-col>
      <lhp-form-col label="活动区域">
        <el-input size="medium" v-model="form.name"></el-input>
      </lhp-form-col>
      <lhp-form-col label="活动名称">
        <el-input size="medium" v-model="form.name"></el-input>
      </lhp-form-col>
      <lhp-form-col label="活动区域">
        <el-input size="medium" v-model="form.name"></el-input>
      </lhp-form-col>
    </lhp-form-row>
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default() {
        return {}
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .form-bar {
    background-color: #fff;
  }
  .form-item-bar {
    padding: 20px 75px;
  }
  .form-item-title {
    padding: 20px 50px 10px;
    color: black;
    font-family: Microsoft YaHei;
    font-weight: bold;
    font-size: 16px;
    border-top: 1px solid $borderSolidColor;
  }
  .form-header-bar {
    text-align: center;
    padding: 20px;
  }
  .form-header-title {
    font-size: 22px;
  }
</style>