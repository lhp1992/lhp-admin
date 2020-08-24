<template>
  <div class="grid-box">
    <el-row style="height: 100px;">
      <el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
    </el-row>

    <el-row style="height: 300px;">
      <el-col :span="8" style="float: right"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="16" style="height: 100px;"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="16" style="height: 200px;"><div class="grid-content bg-purple"></div></el-col>
    </el-row>

    <el-row style="height: 100px;">
      <el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
    </el-row>

  </div>
</template>

<script>
export default {
};
</script>
