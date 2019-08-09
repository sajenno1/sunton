<template>
  <div>
    <el-dialog title="编辑积分" :visible.sync="show" width="40%" :before-close="close">
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
        <el-button type="primary" @click="update" size="medium">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'mall-integral-edit',
  data () {
    return {
      form: {},
      formLabelWidth: '120px',
      loading: false,
      timer: null,
      show: false,
      list: [],
      posOptions: []
    }
  },
  methods: {
    open (id) {
      this.form = {}
      this.getInfo(id)
    },
    close (done) {
      this.show = false
      this.$emit('close')
    },
    getInfo (id) {
      this.$http.post(api.integralInfo, { id: id }).then(res => {
        this.form = res.data
        this.show = true
      })
    },
    update () {
      this.$http.post(api.editIntegral, this.form).then(res => {
        this.$notify({ title: '成功', message: '编辑成功！', type: 'success' })
        this.$emit('getList')
        this.show = false
      })
    }
  }
}
</script>

<style>

</style>
