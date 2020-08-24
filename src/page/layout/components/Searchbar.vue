<template>
  <div class="navbar-quick-search">

    <el-dropdown class="navbar-quick-search-types" trigger="click" placement="bottom-start" size="medium">
      <div class="navbar-quick-search-type">
        <span class="navbar-quick-search-types-name" title="微搜">
          微搜
        </span>
        <span class="navbar-quick-search-types-icon">
          <i class="el-icon-caret-bottom"></i>
        </span>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>Profile</el-dropdown-item>
        <el-dropdown-item>Dashboard</el-dropdown-item>
        <el-dropdown-item>Github</el-dropdown-item>
        <el-dropdown-item>Docs</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <div class="navbar-quick-search-split">
    </div>
    <div class="navbar-quick-search-content">
      <input id="navbar-quick-search-input" class="navbar-quick-search-input" placeholder="请输入关键词搜索">
    </div>
    <div class="navbar-quick-search-icon">
      <i class="wevicon-quick-search-search"></i>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .navbar-quick-search {
    background: rgba(0, 0, 0, 0.08);
    margin: 10px 10px 0;
    float: left;
    height: 35px;
    line-height: 35px;
    background: rgba(0,0,0,.08);
    transition: background .6s;
    &:hover {
      background: rgba(0, 0, 0, 0.14);
    }
    .navbar-quick-search-types {
      float: left;
      width: 60px;
      cursor: pointer;
      .navbar-quick-search-types-name {
        color: $headerColor;
        float: left;
        width: 40px;
        padding-left: 10px;
        white-space: nowrap;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        text-align: center;
      }
      .navbar-quick-search-types-icon {
        color: #fff;
        float: right;
        position: relative;
        height: 35px;
      }
      .navbar-quick-search-type {
        font-size: 12px;
        width: 60px;
      }
    }
    .navbar-quick-search-split {
      float: left;
      width: 1px;
      height: 15px;
      margin: 11px 8px;
      background-color: #fff;
      opacity: .3;
      filter: Alpha(opacity=30);
    }
    .navbar-quick-search-content {
      float: left;
      .navbar-quick-search-input {
        width: 190px;
        height: 30px;
        line-height: 30px;
        padding: 0;
        background: transparent;
        border: 0;
        outline: none;
        box-shadow: none;
        color: $headerSearchColor;
        &::-webkit-input-placeholder { 
          color: #ccc; 
        } 
        &:-moz-placeholder { 
          color: #ccc; 
        } 
        &::-moz-placeholder { 
          color: #ccc; 
        } 
        &:-ms-input-placeholder { 
          color: #ccc; 
        }
      }
    }
    .navbar-quick-search-icon {
      float: left;
      width: 14px;
      height: 35px;
      margin: 0 10px;
      cursor: pointer;
    }
  }
</style>