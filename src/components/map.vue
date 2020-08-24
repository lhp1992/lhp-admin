<template>
  <div style="width: 100%;height: 100%;position: relative;overflow: hidden;">
    <div :id="idName" style="width: 100%;height: 100%;"></div>
    <slot v-if="visible" :tomap="map"></slot>
  </div>
</template>

<script>
import config from '@/config'
let { map: { mapOptions } } = config

export default {
  props: {
    mapOptions: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      map: null,
      visible: false,
      idName: this.getUuid(8, 16)
    }
  },
  methods: {
    getUuid (len, radix) {
      let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
      let uuid = []
      let i
      radix = radix || chars.length
      if (len) {
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
      } else {
        let r
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
        uuid[14] = '4'
        for (i = 0; i < 36; i++) {
          if (!uuid[i]) {
            r = 0 | Math.random() * 16
            uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
          }
        }
      }
      return uuid.join('')
    }
  },
  mounted () {
    let options = Object.assign({}, mapOptions, this.mapOptions)
    this.map = new AMap.Map(this.idName, options)
    this.$emit('onLoad', this.map)
    this.visible = true
  }
};
</script>
