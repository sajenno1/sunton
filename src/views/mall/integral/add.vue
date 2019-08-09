<template>
  <div>
    <el-dialog title="添加积分" :visible.sync="show" width="40%">
      <el-form :model="form" style="padding-right:5%;">
        <el-form-item label="兑换金额" :label-width="formLabelWidth">
          <el-input v-model="form.money" auto-complete="off" size="small"></el-input>
        </el-form-item>

        <el-form-item label="积分" :label-width="formLabelWidth">
          <el-input v-model="form.integration" auto-complete="off" size="small"></el-input>
        </el-form-item>

        <el-form-item label="库存" :label-width="formLabelWidth">
          <el-input v-model="form.inventory" auto-complete="off" size="small"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false" size="medium">取 消</el-button>
        <el-button type="primary" @click="create" size="medium" icon="el-icon-success">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'mall-integral-add',
  data () {
    return {
      form: {},
      formLabelWidth: '120px',
      show: false
    }
  },
  methods: {
    open () {
      this.form = {}
      this.show = true
    },
    create () {
      this.$http.post(api.addIntegral, this.form).then(res => {
        this.$notify({ title: '成功', message: '添加成功！', type: 'success' })
        this.$emit('getList')
        this.show = false
      })
    }
  }
}
</script>
<style>

</style>
