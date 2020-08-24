<template>
  <menupage 
    :key="`${ mode }-${ isIndex }`" 
    :isIndex="isIndex" 
    :unAnchor="unAnchor" 
    :anchorList="anchorList" 
    :mode="mode" 
    :value="isIndex ? indexList : list" 
  >
    <template slot="title" slot-scope="{ data, color }">
      <!-- {{ color }} -->
      <!-- <slot name="title" :data="data" :color="color"></slot> -->
    </template>

    <template slot-scope="{ data }">
      <slot :data="data"></slot>
    </template>
  </menupage>
</template>

<script>
import MenuPage from './components/MenuPage'
export default {
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    mode: String,
    isIndex: Boolean,
    unAnchor: Boolean,
    anchorList: [Array, String],
    indexList: {
      type: Array,
      default() {
        let indexObj = {}
        this.list.forEach(data => {
          data.wfbeans.forEach(item => {
            if (!indexObj[item.letter]) indexObj[item.letter] = []
            indexObj[item.letter].push(item)
          })
        })
        let indexArr = []
        for (let key in indexObj) {
          indexArr.push({
            letter: key,
            wfbeans: indexObj[key]
          })
        }
        indexArr = indexArr.sort((a, b) => a.letter > b.letter ? 1 : -1)
        return indexArr
      }
    }
  },
  components: {
    'menupage': MenuPage
  }
};
</script>