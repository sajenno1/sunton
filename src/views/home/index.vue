<template >
  <div>
    主页
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'home',
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
				moduleMenus: this.$store.state.app.moduleMenus
      }
    }
  },
  methods: {
    onSubmit () {
      console.log(1)
    }
  },
	watch: {
		menus(n,m) {
			if(n != m) {
				console.log("new:" + n)  
				console.log("old:" + m)
			}
		}
	},
	mounted() {
	}
}
</script>

