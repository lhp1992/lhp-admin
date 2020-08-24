<template>
  <table class="table-list">
    <tbody>
      <tr v-for="item, index in list">
        <slot :scope="item" :index="index"></slot>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss" scoped>
  .table-list {
    width: 100%;
    color: $textColorLight;
    border-spacing: 0;
    tr {
      cursor: pointer;
      transition: all .3s ease;
      &:hover {
        background: #e9f7ff;
      }
    }
    td {
      padding: 5px 0;
    }
    td:last-child,
    th:last-child {
      text-align: right;
    }
  }
</style>