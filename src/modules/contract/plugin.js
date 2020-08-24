import Vue from 'vue'
import TitleContentPage from '../../components/title-content-page'
import Tabs from '../../components/tabs'
import TabsPane from '../../components/tabs-pane'
import Contract from '../../components/contract'

import FormRow from '../../components/form-row'
import FormCol from '../../components/form-col'

export default {
  install (Vue, options) {
    Vue.component('lhp-title-content-page', TitleContentPage)
    Vue.component('lhp-tabs', Tabs)
    Vue.component('lhp-tabs-pane', TabsPane)
    Vue.component('lhp-contract', Contract)

    Vue.component('lhp-form-row', FormRow)
    Vue.component('lhp-form-col', FormCol)
  }
}