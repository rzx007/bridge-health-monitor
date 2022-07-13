<template>
  <div class="zth-route-view">
    <router-view>
      <template #default="{ Component }">
        <transition :name="menuMode === 'horizontal' ? 'slide-fade-Y' : 'slide-fade-X'">
          <keep-alive v-if="route.meta.isCache">
            <component :is="Component" :key="route.fullPath" class="child-view" />
          </keep-alive>
          <component :is="Component" v-else :key="route.fullPath" class="child-view" />
        </transition>
      </template>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const route = useRoute()
const menuMode = computed(() => store.getters.menuMode)
console.log(route.fullPath)
</script>
<style lang="scss">
.zth-route-view {
  height: 100%;
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
  position: relative;
  box-sizing: border-box;
  padding: 0 12px;
  // 路由动画
  .child-view {
    height: 100%;
    width: 100%;
  }
}
</style>
