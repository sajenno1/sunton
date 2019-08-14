<template>
	<div>
		<el-row>
			<el-col :span="24">

				<router-link v-for="tag in Array.from(visitedViews)" :to="tag.path" :key="tag.path">
					<el-tag :closable="true" :type="isActive(tag.path) ? '' : 'info'" @close='closeViewTabs(tag,$event)'
					@node-contextmenu="rightClick"
					>
						{{tag.name}}a
					</el-tag>
				</router-link>

			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'tabs-view',
		data() {
			return {}
		},
		methods: {
			isActive(path) {
				// console.log(this.$route.matched)
				return path === this.$route.path
			},
			closeViewTabs(view, $event) {
				this.$store.dispatch('app/delVisitedViews', view).then((views) => {
					if (this.isActive(view.path)) {
						const latestView = views.slice(-1)[0]
						if (latestView) {
							this.$router.push(latestView.path)
						} else {
							this.$router.push('/')
						}
					}
				})
				$event.preventDefault()
			},
			generateRoute() {
				if (this.$route.matched[this.$route.matched.length - 1].meta.displayName) {
					return this.$route.matched[this.$route.matched.length - 1]
				}
				this.$route.matched[0].path = '/'
				return this.$route.matched[0]
			},
			addViewTabs() {
				this.$store.dispatch('app/addVisitedViews', this.generateRoute())
			},
			show() {
				console.log(11111)
			}
		},
	computed: {
			visitedViews() {
				return this.$store.state.app.visitedViews.slice(-6)
			}
		},
		watch: {
			$route() {
				this.addViewTabs()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.el-row {
		padding: 5px 7px;
		// margin-bottom: 10px;
		// padding-bottom: 10px;
		box-shadow: 0px 1px #eee;
		// box-shadow: 0 2px 1px 1px rgba(100, 100, 100, 0.1);
		background-color: #f0f0f0;
	}

	.el-tag {
		margin-top: 1px;
		margin-right: 5px;
		background-color: #fff;
	}
</style>
