<template>
  <div v-if="name">
    <template v-if="panel">
      <transition-group class="module-animated" tag="div" :name="animated">
        <template v-for="item in list">
          <component :key="item.name" v-bind:is="panel" :params="item.params" v-on:close="$modules.close(name, item.name)">
            <template slot-scope="{ tostate }">
              <component :params="item.params" :parentState="tostate" v-bind:is="getComponents(item.name)" v-on:close="$modules.close(name, item.name)"></component>
            </template>
          </component>
        </template>
      </transition-group>
    </template>
    <template v-else>
      <transition-group class="module-animated" tag="div" :name="animated">
        <component v-for="item in list" :key="item.name" :params="item.params" v-bind:is="getComponents(item.name)" v-on:close="$modules.close(name, item.name)"></component>
      </transition-group>
    </template>
  </div>
</template>

<script>
import config from '@/config'

const { modal: { modules } } = config

var components = {}
for (var key in modules) {
  if (modules[key].path) components[key +'Panel'] = modules[key].path
  modules[key].children.forEach(cpage => {
    let ckey = cpage.name
    components[key +'-'+ ckey] = cpage.path
  })
}
    
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  components: components,
  computed: {
    panel () {
      return components[this.name +'Panel']
    },
    list () {
      return this.$modules.openModules[this.name]
    },
    animated () {
      return modules[this.name].animated
    }
  },
  methods: {
    getComponents(ckey){
      return this.name +'-'+ ckey
    }
  },
};
</script>
