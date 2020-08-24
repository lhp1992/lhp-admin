<template>
  <lhp-tabs @onChange="onChange" :data="data" :nameKey="idKey" :labelKey="labelKey" style="height: 40px;padding-top: 1px;">
    <template slot="tabs-title" slot-scope="{ value }">
      <span style="padding: 0 6px;">
        <slot :value="value">
          {{ value[labelKey] }}
        </slot>
      </span>
    </template>

    <template slot="tabs-right">
      <div class="search-bar-box">
        <slot name="tabs-right"></slot>
      </div>
    </template>
  </lhp-tabs>
</template>

<script>
export default {
  inject: ['top'],
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    queryKey: {
      type: String,
      default: 'tabid'
    },
    idKey: {
      type: String,
      default: 'id'
    },
    labelKey: {
      type: String,
      default: 'label'
    }
  },
  methods: {
    onChange(name, tab, index) {
      let data = this.data[index]
      let object = {}
      object[this.queryKey] = data[this.idKey]
      this.top.search(object)
    }
  }
};
</script>

<style lang="scss" scoped>
  .search-bar-box {
    margin: 5px 12px 0;
    font-size: 0;
  }
</style>
