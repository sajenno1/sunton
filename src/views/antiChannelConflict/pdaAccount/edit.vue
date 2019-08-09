<template>
  <div>
    <el-dialog title="编辑PDA账号" :visible.sync="show" width="40%">
      <el-form :model="form" style="padding-right:5%;">

        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.userName" auto-complete="off" readonly></el-input>
        </el-form-item>

        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="form.displayName" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password1" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input v-model="form.password2" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="show = false">取 消</el-button>
        <el-button size="small" type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'antiChannelConflict-pdaAccount-edit',
  data () {
    return {
      show: false,
      form: {},
      formLabelWidth: '120px'
    }
  },
  methods: {
    update () {
      this.$http.post(api.editPDAAccount, this.form).then(res => {
        this.$emit('getList')
        this.show = false
        this.$notify({ title: '成功', message: '保存成功！', type: 'success' })
      })
    },
    open (data) {
      this.form = data
      this.show = true
    }
  }
}
</script>

<style>

</style>
