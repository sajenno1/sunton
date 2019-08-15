<!-- 作废（）-->
<template>
  <div>
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#42485A"
      text-color="#fff"
      active-text-color="#ccc"
      :router="true"
      :default-active="activeIndex">
      <!--el-menu-item index="#" @click.native="toggleCollapse">
        <i class="el-icon-menu"></i>
        <span slot="title">折叠菜单</span>
      </el-menu-item-->
      <template v-for="item in menus">
        <el-submenu v-if="item.children" :index="item.id" :key="item.id">
          <template slot="title">
            <i :class="item.iconClass || 'oel-icon-xitongshiti'"></i>
            <span slot="title">{{ item.text+""+"1" }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="children in item.children" :index="children.webUrl" height="48px" :key="children.id">
              <i :class="children.iconClass || 'oel-icon-xitongshiti'"></i>
              <span slot="title">{{ children.text+""+"2" }}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-menu-item v-else :index="item.webUrl" :key="item.id">
          <i :class="item.iconClass || 'oel-icon-xitongshiti'"></i>
          <span slot="title">{{ item.text+""+"3" }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  data () {
    return {
      backgroundColor: this.$store.state.app.backgroundColor
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    toggleCollapse () {
      this.$store.dispatch('app/toggleSidebar')
    },
    activeMenu () {
      let path = this.$route.path
      let moduleMenus = this.$store.state.app.moduleMenus
      console.log(moduleMenus)
      for (let item in moduleMenus) {
        console.log(item)
        for (let menu in moduleMenus[item]) {
          if (menu.webUrl === path) {
            this.$store.dispatch('app/setActiveIndex', { id: item })
            this.$store.dispatch('app/getMenus', { id: item })
            console.log(item)
            return
          }
          for (let children in menu) {
            if (children.webUrl === path) {
              this.$store.dispatch('app/setActiveIndex', { id: item })
              this.$store.dispatch('app/getMenus', { id: item })
              console.log(item)
              return
            }
          }
        }
      }
    }
  },
  computed: {
    isCollapse () {
      return this.$store.state.app.isCollapse
    },
    menus () {
      return this.$store.state.app.menus
    },
    activeIndex () {
      return this.$route.path
    }
  },
  mounted () {
		
  }
}
</script>

<style lang="scss">
@import "../../assets/font/icon/iconfont.css";
.el-menu {
	border-right: 0;
}
.el-menu-item i, .el-icon-location {
  color: #fff;
}
.el-submenu__title i {
  color: #fff;
}

.el-menu-item, .el-submenu__title {
  height: 48px;
  line-height: 48px;
}
</style>
