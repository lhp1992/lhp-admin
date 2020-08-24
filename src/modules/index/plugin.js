import Vue from 'vue'
import GridPageItem from '../../components/grid-page-item'
import TableList from '../../components/table-list'
import TitleContentPage from '../../components/title-content-page'
import Tabs from '../../components/tabs'
import TabsPane from '../../components/tabs-pane'
import Pagination from '../../components/pagination'
import LeftSlideBar from '../../components/left-slide-bar'

import FlowTable from '../../components/flow-table/flow-table'
import FlowTableTree from '../../components/flow-table/flow-table-tree'
import FlowTableTabs from '../../components/flow-table/flow-table-tabs'
import FlowTableSearch from '../../components/flow-table/flow-table-search'
import FlowTableAdvancedSearch from '../../components/flow-table/flow-table-advanced-search'

import FormRow from '../../components/form-row'
import FormCol from '../../components/form-col'

import GdMap from '../../components/map'

export default {
  install (Vue, options) {
    Vue.component('lhp-grid-page-item', GridPageItem)
    Vue.component('lhp-table-list', TableList)
    Vue.component('lhp-title-content-page', TitleContentPage)
    Vue.component('lhp-tabs', Tabs)
    Vue.component('lhp-tabs-pane', TabsPane)
    Vue.component('lhp-pagination', Pagination)
    Vue.component('lhp-left-slide-bar', LeftSlideBar)

    Vue.component('flow-table', FlowTable)
    Vue.component('flow-table-tree', FlowTableTree)
    Vue.component('flow-table-tabs', FlowTableTabs)
    Vue.component('flow-table-search', FlowTableSearch)
    Vue.component('flow-table-advanced-search', FlowTableAdvancedSearch)

    Vue.component('lhp-form-row', FormRow)
    Vue.component('lhp-form-col', FormCol)

    Vue.component('lhp-map', GdMap)
  }
}