<template>
  <div>
    <el-dialog title="添加资源" :visible.sync="show" width="40%">
      <el-form :model="form" label-width="120px">

        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="KEY">
          <el-input v-model="form.resourceKey"></el-input>
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
  name: 'updater-resource-add',
  data () {
    return {
      show: false,
      form: {}
    }
  },
  methods: {
    open () {
      this.form = {}
      this.show = true
    },
    create () {
      this.$http.post(api.addResource, this.form).then(res => {
        this.show = false
        this.$emit('getList')
        this.$notify.success({ title: '成功', message: '添加成功' })
      })
    }
  }
}
</script>

<style>

</style>
