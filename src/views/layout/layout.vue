<template>
	<div class="app-container">
		<el-container style="height: 100%">
			<el-header :style="backgroundStyle">
				<navbar></navbar>
			</el-header>
			<el-container>
				<!-- <el-aside :width="isCollapse ? '64px' : '180px'">
					<div class="el-nav-left" :style="isCollapse ? 'width:64px' : 'width:180px'">
						<sidebar></sidebar>
					</div>
				</el-aside> -->
				<el-main>
					<tabs-view></tabs-view>
					<appMain ></appMain>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
import navbar from './navbar'
import appMain from './appMain'
import tabsView from './tabsView'
export default {
  name: 'layout',
  components: { navbar, appMain, tabsView },
  data () {
    return {
      backgroundStyle: {
        background: this.$store.state.app.backgroundColor,
        height: 50
      },
    }
  },
  methods: {},
  computed: {
	
    isCollapse () {
      return this.$store.state.app.isCollapse
    }
  },
}
</script>

<style lang="scss" scoped>
.app-container{
  // position: fixed;
  // top: 0;
  // left: 0;
  // right: 0;
  // bottom: 0;
  height: 100%;
}
.el-aside {
  background-color: #333743;
}

.el-main {
  padding: 0
}

.el-header {
height: 60px;
}

</style>

