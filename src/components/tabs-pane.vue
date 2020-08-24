<template>
  <div v-if="tabsParent.activeName === this.name" style="height: 100%;">
    <slot>{{ name }}</slot>
  </div>
</template>

<script>
export default {
  inject: ['tabsParent'],
  props: {
    label: String,
    name: {
      type: String,
      default() {
        return this.tabsParent.tabs.length.toString()
      }
    }
  },
  created() {
    this.tabsParent.setPage(this.name, this.label)
  }
};
</script>
