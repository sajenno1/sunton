<template>
  <div>
    <el-dialog title="编辑品牌" :visible.sync="show" width="40%">
      <el-form :model="form" style="padding-right:5%;">

        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="show = false">取 消</el-button>
        <el-button size="small" type="primary" @click="create">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'products-brand-edit',
  data () {
    return {
      formLabelWidth: '120px',
      show: false,
      form: {}
    }
  },
  methods: {
    open (id) {
      this.form = {}
      this.$http.post(api.brandInfo, { id: id }).then(res => {
        this.form = res.data
        this.show = true
      })
    },
    create () {
      this.$http.post(api.editBrand, this.form).then(res => {
        this.$emit('getList')
        this.show = false
        this.$notify({ title: '成功', message: '添加成功！', type: 'success' })
      })
    }
  }
}
</script>

<style>

</style>
