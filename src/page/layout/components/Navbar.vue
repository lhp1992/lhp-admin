<template>
  <div class="navbar">

    <div class="navbar-logo">
      <span>惠州市公安局OA系统</span>
    </div>

    <div class="navbar-home">
      <i class="navbar-icon el-icon-s-home"></i>
    </div>

    <search-bar />
  
    <div class="right-menu">
      
      <tool-bar />

      <div class="navbar-toolbar-splitter"></div>

      <user-bar />
    </div>
  </div>
</template>

<script>
import Searchbar from './Searchbar'
import Toolbar from './Toolbar'
import Userbar from './Userbar'

export default {
  components: { 
    'search-bar': Searchbar,
    'tool-bar': Toolbar,
    'user-bar': Userbar
  }
};
</script>

<style lang="scss" scoped>
  .navbar {
    height: 55px;
    overflow: hidden;
    position: relative;
    background: $headerBgColor;
    color: $headerColor;
    line-height: 55px;
    .navbar-logo {
      width: $sideBarWidth;
      font-size: 14px;
      float: left;
      background: $headerLogoBgColor;
      height: 55px;
      line-height: 55px;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
    }
    .navbar-home {
      float: left;
      text-align: center;
      display: inline-block;
      margin-left: 10px;
      cursor: pointer;
      width: 40px;
      height: 55px;
    }
    .navbar-icon{
      font-size: 18px;
    }
    .navbar-toolbar-splitter {
      float: left;
      width: 1px;
      height: 15px;
      margin: 20px 5px;
      background-color: #fff;
      opacity: .5;
      filter: Alpha(opacity=50);
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;
      &:focus {
        outline: none;
      }
    }
  }
</style>