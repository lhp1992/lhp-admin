<template>
	<loginbar />
</template>

<script>
import Login from '@/page/login'

export default {
  components: {
    'loginbar': Login
  },
};
</script>

<style lang="scss">
  @import '../../public/css/base.scss';
  body {
    background-color: #e8edf4;
  }
</style>