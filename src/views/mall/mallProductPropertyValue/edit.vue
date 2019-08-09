<template>
  <div>
    <el-dialog title="编辑产品属性值" :visible.sync="show" width="40%" append-to-body>
      <el-form :model="form" style="padding-right:5%;">

        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="别名" :label-width="formLabelWidth">
          <el-input v-model="form.nameAlias" auto-complete="off"></el-input>
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
  name: 'mall-mallProductPropertyValue-edit',
  data () {
    return {
      show: false,
      form: {},
      formLabelWidth: '120px'
    }
  },
  methods: {
    open (row) {
      this.form = {}
      this.show = true
      this.getData(row.id)
    },
    getData (id) {
      this.$http.post(api.mallProductPropertyValueInfo, { id: id }).then(res => {
        this.form = res.data
      })
    },
    update () {
      this.$http.post(api.editMallProductPropertyValue, this.form).then(res => {
        this.$emit('getList')
        this.show = false
        this.$notify({ title: '成功', message: '保存成功', type: 'success' })
      })
    }
  }
}
</script>

<style>

</style>
