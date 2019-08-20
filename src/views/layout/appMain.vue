<template>
	<section class="app-main">
		<transition name="fade" mode="out-in">
			<keep-alive :exclude="refreshCpn">
				<router-view v-if="isRouterAlive" ></router-view>
			</keep-alive>
		</transition>
	</section>
</template>

<script>
	export default {
		name: 'appMain',
		provide() {
			return {
				reload: this.reload
			}
		},
		data() {
			return {
				isRouterAlive: true,
				refreshCpn: ''
			}
		},
		methods: {
			reload() {
				this.refreshCpn = this.$route.name
				this.isRouterAlive = false
				this.$nextTick(function() {
					this.isRouterAlive = true
				})
				setTimeout(()=>this.refreshCpn = "",50)
			}
		},
		computed: {
			/**自动更新: router-view :key="key"*/
			// key() {
			// 	return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
			// },
			// refreshList() {
			// 	
			// }
			
		},
		
	}
</script>

<style>
	.app-main {
		min-width: 1100px;
		margin: 5px;
		/* border: 1px #eee solid; */
	}
</style>
