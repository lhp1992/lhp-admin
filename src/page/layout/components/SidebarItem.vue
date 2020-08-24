<template>
  <div>
    <template v-if="value.children && value.children.length > 0">
      <el-submenu :index="value.name || value.title">
        <template slot="title">
          <i v-if="value.icon" :class="value.icon"></i>
          <span slot='title'>{{ value.title }}</span>
        </template>
        <me v-for="item in value.children" :value="item" :key="item.name" class="nest-menu"></me>
      </el-submenu>
    </template>

    <router-link v-else :to="{ name: value.name }">
      <el-menu-item :index="value.name || value.title">
        <template v-if="value.icon">
          <i :class="value.icon"></i>
        </template>
        <span slot='title'>{{ value.title }}</span>
      </el-menu-item>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'me',
    props: ['value']
  };
</script>

<style scoped>
  .el-menu--collapse .el-submenu .el-submenu__title>span {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
  }
</style>