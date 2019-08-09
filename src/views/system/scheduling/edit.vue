<template>
  <div>
    <el-dialog title="编辑计划任务" :visible.sync="show" width="40%">
      <el-form label-width="130px">

        <el-form-item label="名称">
          <el-input v-model="form.name" readonly></el-input>
        </el-form-item>

        <el-form-item label="Task的类型">
          <el-input v-model="form.taskType" readonly></el-input>
        </el-form-item>

        <el-form-item label="执行间隔">
          <el-input v-model="form.interval"></el-input>
        </el-form-item>

        <el-form-item label="是否激活">
          <el-checkbox v-model="form.isActivated"></el-checkbox>
        </el-form-item>

        <el-form-item label="发生错误是否继续">
          <el-checkbox v-model="form.continueOnException"></el-checkbox>
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
  name: 'system-shceduling-edit',
  data () {
    return {
      show: false,
      form: {}
    }
  },
  methods: {
    open (row) {
      this.show = true
      this.getData(row.taskType)
    },
    getData (taskType) {
      this.$http.post(api.scheduledTaskInfo, { taskType: taskType }).then(res => {
        this.form = res.data
      })
    },
    update () {
      this.$http.post(api.editScheduledTask, this.form).then(res => {
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
