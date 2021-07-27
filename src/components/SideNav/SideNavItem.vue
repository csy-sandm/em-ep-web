<template>
  <!--  <side-nav-item></side-nav-item>-->
  <el-menu-item v-if="!hasChild(item.menuInfoEntity)" :route="{ path: item.menuUrl}" :index="item.menuId" @click="setInfoShowTrue()">
    <i :class="item.menuIcon"></i>
    <span>{{ item.menuName }}</span>
  </el-menu-item>

  <el-submenu v-else :index="item.menuId" popper-append-to-body>
    <template slot="title">
      <i :class="item.menuIcon"></i>
      <span>{{ item.menuName }}</span>
    </template>
    <side-nav-item v-for="child in item.menuInfoEntity" :key="child.path" :is-nest="true" :item="child"
      :route-path="item.menuUrl" class="nest-menu" @click="setInfoShowTrue()" />
  </el-submenu>
</template>

<script>
export default {
  name: 'SideNavItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    menuUrl: {
      type: String,
      default: ''
    }
  },
  methods: {
    setInfoShowTrue () {
      this.$store.commit('setInfoShowTrue')
    },
    hasChild (itemChildren) {
      if (itemChildren !== undefined && itemChildren.length !== 0) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>

</style>
