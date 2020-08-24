<template>
  <lhp-grid-page-item class="dbzxbar-box">
    <template slot="title">
      代办中心
    </template>
    <template slot="header-right">
      <el-button type="text" size="mini">更多</el-button>
    </template>
    <el-tabs style="padding: 0 10px;" v-model="activeName">
      <el-tab-pane label="用户管理" name="first">
        <lhp-table-list :list="list">
          <template slot-scope="{ scope, index }">
            <td>{{ scope.text }}</td>
            <td width="50">{{ scope.name }}</td>
            <td width="80">{{ scope.time }}</td>
          </template>
        </lhp-table-list>
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </lhp-grid-page-item>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first',
      list: [
        {
          text: 'aaa',
          name: '杨文元',
          time: '2020-07-15'
        }, {
          text: 'aaa',
          name: '杨文元',
          time: '2020-07-15'
        }, {
          text: 'aaa',
          name: '杨文元',
          time: '2020-07-15'
        }, {
          text: 'aaa',
          name: '杨文元',
          time: '2020-07-15'
        }, {
          text: 'aaa',
          name: '杨文元',
          time: '2020-07-15'
        }, {
          text: 'aaa',
          name: '杨文元',
          time: '2020-07-15'
        }
      ]
    }
  }
};
</script>

<style lang="scss">
  .dbzxbar-box .el-tabs__header {
    margin: 0;
  }
</style>