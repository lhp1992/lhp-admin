<template>
  <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
    <div class="avatar-wrapper">
      <div class="avatar-img">
        <i class="el-icon-user"></i>
        <!-- <img src="http://e8.weaver.com.cn/messager/usericon/6094efe97f2841c4a05615968c595ae1.jpg"> -->
      </div>
      <span class="avatar-username">杨文元</span><span class="avatar-username-icon"><i class="el-icon-caret-bottom"></i></span>
    </div>

    <el-dropdown-menu slot="dropdown">
      <router-link to="/profile/index">
        <el-dropdown-item>Profile</el-dropdown-item>
      </router-link>
      <router-link to="/">
        <el-dropdown-item>Dashboard</el-dropdown-item>
      </router-link>
      <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
        <el-dropdown-item>Github</el-dropdown-item>
      </a>
      <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
        <el-dropdown-item>Docs</el-dropdown-item>
      </a>
      <el-dropdown-item divided @click.native="logout">
        <span style="display:block;">Log Out</span>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  methods: {
    logout(params) {
      window.location.href = "../login.html";
    }
  }
};
</script>

<style lang="scss" scoped>
  .avatar-container {
    margin-right: 50px;
    .avatar-wrapper {
      color: $headerColor;
      margin-right: 10px;
      cursor: pointer;
      .avatar-img {
        float: left;
        margin: 7px 10px;
        width: 41px;
        height: 41px;
        line-height: 41px;
        font-size: 18px;
        text-align: center;
        border-radius: 100%;
        background: rgba(0, 0, 0, 0.14);
        &>img {
          width: 41px;
          height: 41px;
          border-radius: 50%;
          vertical-align: baseline;
        }
      }
      .avatar-username {
        float: left;
        margin-right: 5px;
        .avatar-username-icon {
          float: left;
          position: relative;
          width: 20px;
          height: 55px;
        }
      }
    }
  }
</style>