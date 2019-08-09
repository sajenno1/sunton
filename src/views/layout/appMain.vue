<template>
  <section class="app-main">
		<transition name="fade" mode="out-in">
			<router-view :key="key"></router-view>
		</transition>
	</section>
</template>

<script>
export default {
  name: 'appMain',
  computed: {
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
