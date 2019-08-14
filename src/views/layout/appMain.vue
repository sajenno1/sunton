<template>
  <section class="app-main">
		<transition name="fade" mode="out-in">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</transition>
	</section>
</template>

<script>
export default {
  name: 'appMain',
  computed: {
		/**自动更新: router-view :key="key"*/
    key () {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  }
}
</script>

<style>
.app-main {
  min-width: 1100px;
  margin: 5px;
  /* border: 1px #eee solid; */
}
</style>
