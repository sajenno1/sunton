<template>
	<div>
		<!-- <div class="nav-top">
      <el-row :gutter="24">
        <el-col :span="4" class="logo">
          <span>码上营销管理平台</span>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-dark">
            <el-menu :default-active="activeIndex" class="el-menu-navbar-top" mode="horizontal" background-color="#2d3a4b" text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
              <el-menu-item v-for="item in navbar" :key="item.id" :index="item.id">{{ item.text }}</el-menu-item>
            </el-menu>
          </div>
        </el-col>
        <el-col :span="2" class="userInfo">
          <div class="grid-content bg-purple-dark">
            <el-dropdown>
              <span class="el-dropdown-link"><span class="user-name">陈柏松</span><img src="../../../static/images/tx.jpg" id="user-portrait"></span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item class="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>

        <el-col :span="2" class="userMessage">
          <div class="grid-content bg-purple-dark">
            <el-badge :value="200" :max="99" class="item">
              <el-button size="small"><a href="#">未读消息</a></el-button>
            </el-badge>
          </div>
        </el-col>
      </el-row>
    </div> -->

		<div class="nav-top">
			<el-row :gutter="24">
				<el-col :span="20">
					<div class="nav-left">
						<div class="logo">
							<span>{{ siteSetting }}</span>
						</div>
						<div>
							<!-- 
							<el-menu :default-active="activeIndex" mode="horizontal" :background-color="backgroundColor" text-color="#fff"
							 active-text-color="#ffd04b" @select="handleSelect">
								<el-menu-item v-for="item in navbar" :key="item.id" :index="item.id">{{ item.text }}</el-menu-item>
							</el-menu>
							 -->
							
							<el-menu :default-active="activeIndex1" class="el-menu-demo" mode="horizontal" 
							@select="handleSelect"
							:background-color="backgroundColor" 
							text-color="#fff" 
							active-text-color="#ffd04b" 
							:router="true"
							>
								<!-- <el-menu-item v-for="item in navbar" :key="item.id" :index="item.id">{{ item.text}}</el-menu-item> -->
								<el-submenu v-for="item in navbar" :index="item.id" :key="item.id">
									<template slot="title">{{item.text}}</template>
									<template v-for="(sbus,index) in menus">
										<template v-if="index == item.id">
											<template v-for="is in sbus">
												<el-submenu v-if="is.children" :index="is.id" :key="is.id">
													<template slot="title">{{is.text}}</template>
													<el-menu-item v-for="iis in is.children" 
													:index="iis.webUrl"
													:key="iis.id">{{iis.text}}</el-menu-item>
												</el-submenu>
												
												<el-menu-item v-else 
												:index="is.webUrl"
												:key="is.id">{{is.text}}</el-menu-item>
												<!-- <template v-else-if="is.webUrl == ''">
													<template slot="title">{{is.text}}</template>
													<el-menu-item v-for="iis in is.children" 
													:index="iis.webUrl"
													:key="iis.id">{{iis.text}}</el-menu-item>
												</template> -->
											</template>
										</template>
									</template>
									<!-- 
									<el-menu-item index="2-1">选项1</el-menu-item>
									<el-menu-item index="2-2">选项2</el-menu-item>
									<el-menu-item index="2-3">选项3</el-menu-item>
									<el-submenu index="2-4">
										<template slot="title">选项4</template>
										<el-menu-item index="2-4-1">选项1</el-menu-item>
										<el-menu-item index="2-4-2">选项2</el-menu-item>
										<el-menu-item index="2-4-3">选项3</el-menu-item>
									</el-submenu> 
									-->
								</el-submenu>
								
								<!-- 
								<el-menu-item index="1">处理中心</el-menu-item>
								<el-submenu index="2">
									<template slot="title">我的工作台</template>
									<el-menu-item index="2-1">选项1</el-menu-item>
									<el-menu-item index="2-2">选项2</el-menu-item>
									<el-menu-item index="2-3">选项3</el-menu-item>
									<el-submenu index="2-4">
										<template slot="title">选项4</template>
										<el-menu-item index="2-4-1">选项1</el-menu-item>
										<el-menu-item index="2-4-2">选项2</el-menu-item>
										<el-menu-item index="2-4-3">选项3</el-menu-item>
									</el-submenu>
								</el-submenu>
								<el-menu-item index="3" disabled>消息中心</el-menu-item>
								<el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item> 
								-->
							</el-menu>
						</div>
					</div>
				</el-col>
				<el-col :span="4">
					<div class="nav-message">
						<div class="grid-content bg-purple-dark">
							<!-- <el-badge :value="200" :max="99" class="item">
                <a href="#">未读消息</a>
              </el-badge> -->
						</div>
					</div>
					<div class="nav-user">
						<div class="grid-content bg-purple-dark">
							<el-dropdown @command="handleCommand">
								<span class="el-dropdown-link"><span class="user-name">{{ admin.displayName }}</span><img :src="admin.avatar || '../../../static/images/tx.jpg'"
									 class="user-portrait"></span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
									<el-dropdown-item command="personalData">个人资料</el-dropdown-item>
									<el-dropdown-item command="loginOut" class="logout">退出登录</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'navbar',
		data() {
			return {
				backgroundColor: this.$store.state.app.backgroundColor,
			}
		},
		methods: {
			te(e) {
				console.log(e)
				console.log(this)
			},
			handleSelect(key, keyPath) {
				this.$store.dispatch('app/getMenus', {
					id: key
				})
			},
			async getData() {
				await this.$store.dispatch('account/getAdminInfo')
			},
			async getSiteInfo() {
				await this.$store.dispatch('account/getSiteProp')
			},
			handleCommand(command) {
				if (command === 'changePassword') {
					this.$router.replace({
						path: '/system/admin/changepassword'
					})

					return
				}

				if (command === 'personalData') {
					this.$router.replace({
						path: '/system/admin/personaldata'
					})

					return
				}

				if (command === 'loginOut') {
					this.$router.replace({
						path: '/login'
					})
					this.$store.dispatch('account/signOut')
				}
			}
		},
		mounted() {
			this.$store.dispatch('app/getModuleMenus').then(() => {
				this.$store.dispatch('app/activeMenu', {
					path: this.$route.path
				})
			})
			this.getData()
			this.getSiteInfo()
		},
		computed: {
			navbar() {
				return this.$store.state.app.moduleMenus.subSystems
			},
			activeIndex() {
				return this.$store.state.app.activeIndex
			},
			admin() {
				return this.$store.state.account.adminInfo
			},
			siteSetting() {
				return this.$store.state.account.siteItem.value
			},
			menus() {
				return this.$store.state.app.moduleMenus.menus
			},
			activeIndex1 () {
			  return this.$route.path
			}
		},
		create() {
			
		}
	}
</script>

<style lang="scss" scoped>
	.nav-top {
		overflow: hidden;
		height: 60px;
		z-index: 1002;
	}

	.logo {
		position: relative;
		float: left;
		width: 160px;
		height: 60px;
		padding-right: 20px;
		color: #fff;
		font-size: 20px;
		font-weight: bold;
		text-align: center;
		line-height: 60px;
		z-index: 9999999999;
	}

	.nav-message {
		float: left;
		width: 40%;
		margin-top: 18px;
		text-align: center;
	}

	.nav-message a {
		color: #fff;
		font-size: 14px;
		text-decoration: none;
	}

	.nav-user {
		float: left; 
		width: 60%;
		height: 60px;
		cursor: pointer;
	}

	.user-name {
		float: left;
		height: 30px;
		margin-top: 18px;
		padding: 0 5px;
		color: #fff;
		text-align: center;
		line-height: 30px;
	}

	.user-portrait {
		float: right;
		width: 35px;
		height: 35px;
		margin-top: 13px;
		border-radius: 50%;
	}

	.el-menu--horizontal>.el-menu-item {
		height: 60px;
		line-height: 60px;
	}
	
</style>
