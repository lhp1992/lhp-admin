<template>
  <div class="carousel-bar">
    <el-carousel>
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 class="small" style="height: 100%; background: #999;">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style lang="scss">
  .carousel-bar {
    height: 100%;
    padding: 5px;
    & .el-carousel,
    & .el-carousel__container {
      height: 100%;
    }
  }
  .carousel-bar img{
    width: 100%;
    height: 100%;
  }
</style>