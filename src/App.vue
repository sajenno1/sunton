<template>
  <div id="app" v-loading="showLoading">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  // data () {
  //   return {}
  // },
  computed: {
    showLoading () {
      return this.$store.state.showLoading
    }
  }
}
</script>

<style lang="scss">
html{
  height: 100%;
}
body{
  padding: 0;
  margin: 0;
  height: 100%;
}
#app{
  height: 100%;
}

.clearfix {
  *zoom:1;
}
.clearfix:after {
  content:'\200B';
  clear:both;
  display:block;
  height:0px
}

.el-card__header {
  .headerCon {
    height: 32px;
    line-height: 32px;
    .right {
      float: right;
    }
  }
}

.el-card__body {
  .table-container {
    margin-top: 0 !important;
  }
  .el-form-item {
    // .el-input {
    //   width: 500px;
    // }
    .el-input__inner {
      height: 32px;
    }
  }
  .searchCon {
    height: 32px;
    margin-bottom: 20px;
    .el-input {
      width: 200px;
      .el-input__inner {
        height: 32px;
      }
    }
    .left {
      float: left;
    }
    .right {
      float: right;
    }
  }
}

.el-dialog__body {
  padding: 20px;
  .el-form {
    padding-right: 5%;
    .el-form-item {
      margin-bottom: 15px;
      .el-button {
        height: 32px;
        padding: 8px 20px;
      }
      .el-date-editor .el-range-input {
        height: auto;
      }
    }
    .el-input input {
      height: 32px;
    }
  }
}
.el-loading-mask {
  z-index: 9999;
}
.el-date-editor .el-input__icon{
  line-height: inherit
}
.more{
  position: relative
}
.more>span{
  position: absolute;
  top: -4px
}
.el-submenu .el-menu-item {
  min-width: 180px!important;
}
</style>
