<template>
  <div class="form-bar" ref="form">
    <div class="form-header-bar">
      <div class="form-header-title">产品销售合同审批表</div>
      <div class="form-header-en">PRODUCT SALES CONTRACT APPROVAL FORM</div>
    </div>

    <form-info-bar :form="form"></form-info-bar>

    <h2 class="form-item-title">客户信息</h2>
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
    </lhp-form-row>


    <el-table
      :data="tableData"
      :summary-method="getSummaries"
      border
      show-summary
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="amount1"
        sortable
        label="数值 1">
      </el-table-column>
      <el-table-column
        prop="amount2"
        sortable
        label="数值 2">
      </el-table-column>
      <el-table-column
        prop="amount3"
        sortable
        label="数值 3">
      </el-table-column>
    </el-table>


    <iframe :src='`https://view.officeapps.live.com/op/view.aspx?src=${path}`' width='1366px' height='623px' frameborder='0'>This is an embedded
      <a target='_blank' href='http://office.com'>Microsoft Office</a> document, powered by
      <a target='_blank' href='http://office.com/webapps'>Office Online</a>.
    </iframe>

  </div>
</template>

<script>
import FormInfoBase from './FormInfoBase'

export default {
  components: {
    'form-info-bar': FormInfoBase
  },
  props: {
    form: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      tableData: [
        {
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          id: '12987123',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }, {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, {
          id: '12987125',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        }, {
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }
      ],
      path: 'http://localhost:8080/static/JM291200661R90250000000.doc'
    }
  },
  mounted() {
    // console.log(this.$refs.form)
    let doms = this.$refs.form.querySelectorAll('input')
    // console.log(doms)
    doms.forEach(e => {
      e.setAttribute('disabled', true)
    })
  },
  methods: {
    getSummaries(param) {
      const { columns, data } = param;
      let arr = new Array(columns.length)
      arr[0] = '合计'
      columns.forEach((column, index) => {
        if (column.property === 'amount3') {
          arr[index] = data.reduce((total, item) => {
            let num = Number(item['amount3'])
            return total + num;
          }, 0)
        }
      })
      return arr
    }
  }
};
</script>

<style lang="scss">
  // .form-bar {
  //   .el-form-item {
  //     margin-bottom: 10px;
  //   }
  // }
</style>

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