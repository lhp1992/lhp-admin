<template>
	<div class="map-btns">
		<el-button size="small" @click="add('sp')">添加点</el-button>
		<el-button size="small" @click="open">InfoWindow</el-button>
	</div>
</template>

<script>
import { getOverlayOptions } from '@/public/units'
export default {
	inject: ['mapObj'],
	methods: {
		getPoint(type){
			if (!this.i) this.i = 0
			this.i++
			return getOverlayOptions('marker', this.center, {
				id: this.i,
				text: '第'+ this.i +'个点',
				type:  type || (Math.random() > 0.5 ? 1 : 2)
			})
		},
		add(type){
			this.mapObj.markers.add(this.getPoint(type))
			this.mapObj.markers.infoWindow.on('sp', (title, data) => console.log(2, title, data))
		},
    open() {
      this.mapObj.markers.infoWindow.show({
        title: "视频44",
        field: {a: '编号', b: '名称'}
      }, this.center, {a: 1, b: 2})
    }
	},
	created () {
		let center = this.mapObj.map.getCenter()
		this.center = [center.lng, center.lat]
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