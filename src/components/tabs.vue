<template>
  <div :class="{ 'tabs-main': true, 'tabs-main-unborder': !border }">
    <div class="tabs-header">
      <el-tabs class="tabs-header-content" :value="tabsParent.activeName" @tab-click="handleClick">
        <el-tab-pane v-for="item in tabsParent.tabs" :key="item[nameKey]" :name="item[nameKey]">
          <span slot="label" class="tabs-title">
            <slot name="tabs-title" :value="item">{{ item[labelKey] }}</slot>
          </span>
        </el-tab-pane>
      </el-tabs>
      <div class="tabs-right">
        <slot name="tabs-right"></slot>
      </div>
    </div>
    <div class="tabs-main-content">
      <slot :value="activeTab"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    border: {
      type: Boolean,
      default: false
    },
    nameKey: {
      type: String,
      default: 'name'
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    value: {
      type: Number,
      default: 0
    }
  },
  provide() {
    return {
      tabsParent: this.tabsParent
    }
  },
  data() {
    let self = this
    let activeName
    let tab = this.data[this.value]
    if (this.data[this.value]) activeName = tab[this.nameKey]
    return {
      tabsParent: {
        setPage(name, label) {
          let tab = {}
          tab[self.nameKey] = name
          tab[self.labelKey] = label
          if (this.activeName === undefined) {
            this.activeName = name
            self.activeTab = tab
          }
          this.tabs.push(tab)
        },
        tabs: this.data,
        activeName: activeName
      },
      activeTab: this.data[0]
    }
  },
  methods: {
    handleClick(tab) {
      this.activeTab = this.data[tab.index]
      this.$emit('input', Number(tab.index))
      this.$emit('onChange', tab.name, this.activeTab, tab.index)
      this.tabsParent.activeName = tab.name
    }
  }
};
</script>

<style lang="scss">
  .tabs-header {
    .el-tabs__item {
      padding: 0;
    }
    .el-tabs__header {
      margin: 0;
    }
  } 
  .tabs-main.tabs-main-unborder {
    .el-tabs__nav-wrap::after {
      background-color: transparent;
    }
  }
</style>

<style lang="scss" scoped>
  .tabs-main {
    height: 100%;
    @include flex(1);
  }
  .tabs-main-content{
    overflow-y: auto;
    position: relative;
  }
  .tabs-title {
    font-size: 12px;
    padding: 0px 12px;
    display: inline-block;
  }
  .tabs-header {
    height: 39px;
    @include flex
  }
</style>