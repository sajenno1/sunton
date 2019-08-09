<template>
  <div>
    <el-dialog title="拒绝" :visible.sync="show" width="40%">
      <el-form :model="form" label-width="120px" style="padding-right:5%;">

        <el-form-item label="原因">
          <el-input v-model="form.message"></el-input>
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
import * as api from '@/api'
export default {
  name: 'antiChannelConflict-dealerUpdate-reject',
  data () {
    return {
      form: {},
      show: false
    }
  },
  methods: {
    open (id) {
      this.form = {
        id: id,
        message: ''
      }

      this.show = true
    },
    create () {
      this.$http.post(api.rejectDealerUpdate, this.form).then(res => {
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
