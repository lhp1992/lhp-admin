<template>
  <flow-table @onQuery="onQuery" ref="flowTable">
    <flow-table-tree slot="tree" un-parent :data="treeData"></flow-table-tree>
    <flow-table-tabs slot="tabs" :data="tabsList">

      <template slot-scope="{ value }">
        {{ value.label }}
      </template>

      <template slot="tabs-right">
        <flow-table-search></flow-table-search>
        <flow-table-advanced-search>
          <template slot-scope="{ form }">
            <advanced-search-bar :form="form"></advanced-search-bar>
          </template>
        </flow-table-advanced-search>
      </template>
    </flow-table-tabs>

    <header-btns slot="header-right" />

    <template slot-scope="{ ifShow }">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        v-if="ifShow('日期')"
        label="日期"
        width="120">
        <a slot-scope="scope" @click="toContract">{{ scope.row.date }}</a>
      </el-table-column>
      <el-table-column
        v-if="ifShow('姓名')"
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        v-if="ifShow('地址')"
        prop="address"
        label="地址"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        width="55">
        <template slot-scope="scope">
          <el-dropdown trigger="click" size="small">
            <i class="el-icon-more" style="font-size: 14px; cursor: pointer;"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>显示列定制</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </template> 
  </flow-table>
</template>

<script>
import HeaderBtns from './components/HeaderBtns'
import AdvancedSearchBar from './components/AdvancedSearchBar'

export default {
  name: 'Ybsy',
  components: {
    'header-btns': HeaderBtns,
    'advanced-search-bar': AdvancedSearchBar
  },
  data() {
    return {
      treeData: [{"id":1,"label":"一级 1","children":[{"id":4,"label":"二级 1-1","children":[{"id":9,"label":"三级 1-1-1"},{"id":10,"label":"三级 1-1-2"}]}]},{"id":2,"label":"一级 2","children":[{"id":5,"label":"二级 2-1"},{"id":6,"label":"二级 2-2"}]},{"id":3,"label":"一级 3","children":[{"id":7,"label":"二级 3-1"},{"id":8,"label":"二级 3-2"}]}],
      // tabsList: ['全部', '待处理', '待阅', '被退回', '被督办', '未读', '反馈', '超时', '我的关注']
      tabsList: ['全部', '待处理', '待阅', '被退回', '被督办', '未读', '反馈', '超时', '我的关注'].map((item, index) => {return {id: index.toString(), label: item}})
    };
  },
  methods: {
    toContract() {
      window.open("/contract.html#/zjcg?id=1111","","top=0,left=0,width=1920,height=1080")
    },
    log(aa) {
      console.log(aa)
    },
    onQuery(params, next) {
      console.log(params)
      if (params.pageNumber > 5) {
        next([])
        return
      }
      next([...Array(20).keys()].map((e, i) => {
        return {
          date: '2016-05-03',
          name: '王小虎' + params.pageNumber,
          address: '上海市普陀区金沙江路 1518 弄'
        }
      }))
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
