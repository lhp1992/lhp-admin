<template>
  <div class="home-box grid-box">
    <el-row style="height: 200px;" v-if="$ifPermission('demo')">
      <el-col :span="16">
        <div class="grid-content">
          <carouselbar />
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <calendarbar />
        </div>
      </el-col>
    </el-row>

    <el-row style="height: 400px;">
      <el-col :span="8" style="float: right">
        <div class="grid-content">
          <lctxbar />
        </div>
      </el-col>
      <el-col :span="16" style="height: 120px;">
        <div class="grid-content">
          <div class="home-menu">
            <div class="home-menu-item" @click="$modules.open('MODAL-LIST', 'Demo')">
              <img class="home-menu-img" src="http://e8.weaver.com.cn/plugin/element/uploadImg/260.png">
              <div class="home-menu-text">
                <a>费用报销</a>
              </div>
            </div>
            <div class="home-menu-item">
              <img class="home-menu-img" src="http://e8.weaver.com.cn/plugin/element/uploadImg/260.png">
              <div class="home-menu-text">
                <a>费用报销</a>
              </div>
            </div>
            <div class="home-menu-item">
              <img class="home-menu-img" src="http://e8.weaver.com.cn/plugin/element/uploadImg/260.png">
              <div class="home-menu-text">
                <a>费用报销</a>
              </div>
            </div>
            <div class="home-menu-item">
              <img class="home-menu-img" src="http://e8.weaver.com.cn/plugin/element/uploadImg/260.png">
              <div class="home-menu-text">
                <a>费用报销</a>
              </div>
            </div>
            <div class="home-menu-item">
              <img class="home-menu-img" src="http://e8.weaver.com.cn/plugin/element/uploadImg/260.png">
              <div class="home-menu-text">
                <a>费用报销</a>
              </div>
            </div>
            <div class="home-menu-item">
              <img class="home-menu-img" src="http://e8.weaver.com.cn/plugin/element/uploadImg/260.png">
              <div class="home-menu-text">
                <a>费用报销</a>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="16" style="height: 280px;">
        <div class="grid-content">
          <dbzxbar />
        </div>
      </el-col>
    </el-row>

    <el-row style="height: 100px;">
      <el-col :span="16"><div class="grid-content"></div></el-col>
      <el-col :span="8"><div class="grid-content"></div></el-col>
    </el-row>

  </div>
</template>

<script>
import CalendarBar from './components/CalendarBar'
import CarouselBar from './components/CarouselBar'
import DbzxBar from './components/DbzxBar'
import LctxBar from './components/LctxBar'

export default {
  // mounted() {
  //   this.$axios.all([this.$ajax('getSignUpData'), this.$ajax('getSignUpData2')]).then(this.$axios.spread((a, b) => {
  //     console.log(a)
  //     console.log(b)
  //   }))
  // },
  components: {
    'calendarbar': CalendarBar,
    'carouselbar': CarouselBar,
    'dbzxbar': DbzxBar,
    'lctxbar': LctxBar
  },
};
</script>

<style lang="scss" scoped>
  .home-box{
    background-color: transparent;
  }
  .home-menu {
    height: 100%;
    padding: 5px;
    display: flex;
    color: $textColorDark;
    .home-menu-item {
      flex: 1;
      height: 100%;
      cursor: pointer;
      text-align: center;
      padding-top: 10px;
      &:hover {
        background-color: $hoverBarColor;
        opacity: 0.8;
      }
      & img {
        width: 55px;
        height: 55px;
      }
    }
  }
</style>
