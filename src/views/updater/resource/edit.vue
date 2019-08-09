<template>
  <div>
    <el-dialog title="编辑资源" :visible.sync="show" width="40%">
      <el-form :model="form" label-width="120px" style="padding-right:5%;">

        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="KEY">
          <el-input v-model="form.resourceKey"></el-input>
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
  name: 'updater-resource-add',
  data () {
    return {
      show: false,
      form: {}
    }
  },
  methods: {
    open (row) {
      this.form = {}
      this.show = true
      this.getData(row.id)
    },
    getData (id) {
      this.$http.post(api.resourceInfo, { id: id }).then(res => {
        this.form = res.data
      })
    },
    update () {
      this.$http.post(api.editResource, this.form).then(res => {
        this.show = false
        this.$emit('getList')
        this.$notify.success({ title: '成功', message: '保存成功' })
      })
    }
  }
}
</script>

<style>

</style>
