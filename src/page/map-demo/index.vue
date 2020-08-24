<template>
  <lhp-map @onLoad="onLoad">
    <btns-bar/>
  </lhp-map>
</template>

<script>
import initMarkers from '@/map/iconMarkers'
import BtnsBar from './components/BtnsBar'

export default {
  components: {
    'btns-bar': BtnsBar
  },
  provide() {
    return {
      mapObj: this.mapObj
    }
  },
  data() {
    return {
      mapObj: {}
    }
  },
  methods: {
    onLoad(map) {
      this.$set(this.mapObj, 'map', map)
      this.$set(this.mapObj, 'markers', initMarkers(map))
    }
  }
};
</script>

<style lang="scss" scoped>
  .map-btns {
    position: absolute;
    left: 10px;
    top: 10px;
  }
</style>
