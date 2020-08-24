<template>
  <div class="ant-modal" style="width: 1200px; height: 650px;">
    <div class="ant-modal-content ">
      <span class="ant-modal-close" @click="$emit('close')"><span class="ant-modal-close-x"><i class="el-icon-close"></i></span></span>
      <div class="ant-modal-header">
        <div class="ant-modal-title">
          1111
        </div>
      </div>
      <div class="ant-modal-body">
        <button class="sidebar-switch" @click="isCollapse = !isCollapse">
          <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
        </button>
        <el-menu :collapse="isCollapse">
          <template v-for="item in tree">
            <demo-cl v-if="item.children && item.children.length > 0" :value="item"></demo-cl>
            <el-menu-item v-else :index="item.name">
              <i class="el-icon-location"></i>
              <span slot="title">{{ item.name }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  let demoCl = Vue.extend({
    template: '\
      <el-submenu :index="value.name">\
        <template slot="title">\
          <i class="el-icon-location"></i>\
          <span slot="title">{{ value.name }}</span>\
        </template>\
        <template v-for="item in value.children">\
          <me v-if="item.children && item.children.length > 0" :value="item"></me>\
          <el-menu-item v-else :index="item.name">{{ item.name }}</el-menu-item>\
        </template>\
      </el-submenu>\
    ',
    name: 'me',
    props: ['value']
  })

  export default {
    components: {
      // 'demo-cl': () => import('./demo-cl')
      'demo-cl': demoCl
    },
    data(){
      return {
        isCollapse: false,
        tree: [{
          name: '1',
          children: [
            {
              name: '1-1',
              children: [
                {
                  name: '1-1-1'
                }
              ]
            }, {
              name: '1-2'
            }
          ]
        }, {
          name: '2'
        }]
      }
    }
  };
</script>

