<template>
  <div>
    <el-dialog title="编辑消息模板" :visible.sync="show" width="40%">
      <el-form :model="form" label-width="120px" style="padding-right:5%;">

        <el-form-item label="名称">
          <el-input v-model="form.name" readonly></el-input>
        </el-form-item>

        <el-form-item label="模板ID">
          <el-input v-model="form.templateId"></el-input>
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
  name: 'system-templateMessage-edit',
  data () {
    return {
      show: false,
      form: {}
    }
  },
  methods: {
    open (row) {
      this.show = true
      this.getData(row.uniqueId)
    },
    getData (uniqueId) {
      this.$http.post(api.templateMessageInfo, { uniqueId: uniqueId }).then(res => {
        this.form = res.data
      })
    },
    update () {
      this.$http.post(api.editTemplateMessage, this.form).then(res => {
        this.$emit('getList')
        this.show = false
        this.$notify({ title: '成功', message: '保存成功！', type: 'success' })
      })
    }
  }
}
</script>

<style>

</style>
