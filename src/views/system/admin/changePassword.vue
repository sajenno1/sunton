<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>修改密码</span>
      </div>
      <div>
        <el-form label-width="120px">

          <el-form-item label="旧密码">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>

          <el-form-item label="新密码">
            <el-input type="password" v-model="form.newPassword"></el-input>
          </el-form-item>

          <el-form-item label="确认密码">
            <el-input type="password" v-model="form.newPassword2"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="save">保存</el-button>
          </el-form-item>

        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'system-admin-changePassword',
  data () {
    return {
      form: {}
    }
  },
  methods: {
    save () {
      this.$http.post(api.changePassword, this.form).then(res => {
        this.$notify.success({ title: '成功', message: '修改成功' })
        this.$router.replace({ path: '/login' })
        this.$store.dispatch('account/signOut')
      })
    }
  }
}
</script>

<style>

</style>
