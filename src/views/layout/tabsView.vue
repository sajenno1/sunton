<template>
	<div class="scr-top">
		<el-row>
			<el-col :span="24" >

				<router-link v-for="tag in Array.from(visitedViews)" :to="tag.path" :key="tag.path">
					
					<el-tag v-menus :closable="true" :type="isActive(tag.path) ? '' : 'info'" @close='closeViewTabs(tag,$event)'>
						{{tag.name}}
					</el-tag> 
	<ul class="contextmenu" :style="{'left': menuLeft, 'top': menuTop}" v-show="menuShow">
		<li>刷新</li>
		<li>关闭</li>
		<li>关闭其它</li>
		<li>关闭所有</li>
	</ul>
				</router-link>

			</el-col>
		</el-row>
	</div>

</template>

<script>
	export default {
		name: 'tabs-view',
		data() {
			return {
				menuShow: false,
        menuLeft: 0,
        menuTop: 0,
			}
		},
		directives: {
			menus: {
      inserted: function (el, binding, vnode) {
		console.log(binding)
        //获取vue实例对象
        let vm = vnode.context;
        let showFlag = true;
        vnode = vnode.elm;
        //阻止默认浏览器的右键菜单
        el.oncontextmenu = ((event) => {
          event.preventDefault();
        });
        el.onmouseup = ((event) => {
			
          if (event.button === 2) {
			  console.log(vm)
              vm.menuShow = true;
              showFlag = false;
              let realTop = vm.getElementToPageTop(vnode);
              let realLeft = vm.getElementToPageLeft(vnode);
              let top = event.pageY - realTop + 5 + 'px';
              let left = event.pageX - realLeft + 5 + 'px';
              vm.menuLeft = left;
              vm.menuTop = top;
          }
        });
        document.onmouseup = (() => {
          if (showFlag) {
            vm.menuShow = false;
          }
          showFlag = true;
        });
      }
    }
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
			},
			 getElementToPageTop: function (el) {
       if (el.offsetParent) {
         return this.getElementToPageTop(el.offsetParent) + el.offsetTop;
        }
       return el.offsetTop;
    },
    getElementToPageLeft: function (el) {
       if (el.offsetParent) {
         return this.getElementToPageLeft(el.offsetParent) + el.offsetLeft;
       }
       return el.offsetLeft;
    },
		},
		computed: {
			visitedViews() {
				return this.$store.state.app.visitedViews.slice()
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
	.scr-top {
		height: 63px;
		width: 100%;
		white-space: nowrap;
		// overflow-x: scroll;
	}

	.el-row {
		padding: 5px 7px;
		// margin-bottom: 10px;
		// padding-bottom: 10px;
		box-shadow: 0px 1px #eee;
		// box-shadow: 0 2px 1px 1px rgba(100, 100, 100, 0.1);
		background-color: #f0f0f0;
	}
	.el-col {
		position: relative;
	}

	.el-tag {
		margin-top: 1px;
		margin-right: 5px;
		background-color: #fff;
	}
	
	.contextmenu {
  margin: 0;
  background: #fff;
  width: 100px;
  z-index: 9999999999;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, .3)
}

.contextmenu li {
  margin: 0;
  padding: 7px 16px;
  cursor: pointer;
}

.contextmenu li:hover {
  background: #eee;
}
</style>
