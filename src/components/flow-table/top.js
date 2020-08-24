import Vue from 'vue'

export default () => {
  return new Vue ({
    data() {
      return {
        queryParams: {},
        pageNumber: 1,
        tableSelect: [],
        tableData: [],
        thList: ['日期', '姓名', '地址'],
        unThList: []
      }
    },
    methods: {
      // mutation
      SET_UNTHLIST(value) {
        this.unThList = value
      },
      SET_TABLESELECT(value) {
        this.tableSelect = value
      },
      SET_TABLEDATA(value) {
        this.tableData = value
      },
      SET_PAGENUMBER(value) {
        this.pageNumber = value
      },
      UPDATE_QUERYPARAMS(key, value) {
        this.$set(this.queryParams, key, value)
      },
      DELETE_QUERYPARAMS(key) {
        this.$delete(this.queryParams, key)
      },
      // action
      tableSelectionChange(value) {
        this.SET_TABLESELECT(value)
      },
      query(pageNumber = 1) {
        this.$vm.$emit('onQuery', {
          ...this.queryParams,
          pageNumber: pageNumber
        }, (data) => {
          if (data && data.length > 0) {
            this.SET_TABLEDATA(data)
            this.SET_PAGENUMBER(pageNumber)
          }
        })
      },
      search(object = {}) {
        for (let key in object) {
          let value = object[key]
          if (value === undefined) {
            this.DELETE_QUERYPARAMS(key)
          } else {
            this.UPDATE_QUERYPARAMS(key, value)
          }
        }
        this.SET_PAGENUMBER(1)
        this.query()
      },
      transfer() {
        this.$modules.open('MODAL-LIST', 'Transfer', {
          title: '显示列定制',
          data: this.thList.map((item, index) => {return {key: item}}),
          label: this.unThList,
          titles: ['已显示列名', '已隐藏列名'],
          onSubmit: value => this.SET_UNTHLIST(value)
        })
      }
    },
  })
}