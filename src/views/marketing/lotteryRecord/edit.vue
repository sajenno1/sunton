<template>
  <div>
    
    <el-dialog title="编辑快递信息" :visible.sync="show" width="40%">
      <el-tabs v-model="activeName">
        <el-tab-pane label="编辑快递信息" name="first">
          <el-form :model="form" label-width="120px" style="padding-right:5%;">

          <el-form-item label="活动名称">
          <el-input v-model="form.activityName"></el-input>
          </el-form-item>

          <el-form-item label="奖品名称">
          <el-input v-model="form.awardName"></el-input>
          </el-form-item>

          <el-form-item label="快递编号">
          <el-input v-model="form.ExpressCode"></el-input>
          </el-form-item>

          <el-form-item label="快递名称">
          <el-input v-model="form.ExpressName"></el-input>
          </el-form-item>       

          <el-form-item label="快递单号">
          <el-input v-model="form.ExpressNo"></el-input>
          </el-form-item>

          </el-form>
        </el-tab-pane>
      </el-tabs>
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
  name: 'marketing-lotteryRecord-edit',
  data () {
    return {
      show: false,
      form: {},
      activeName: 'first'
    }
  },
  methods: {
    open (row) {
      this.form = {}
      this.show = true
      this.getData(row.id)
    },
    create () {
      this.$http.post(api.editLotteryRecord, this.form).then(res => {
        this.show = false
        this.$emit('getList')
        this.$notify.success({ title: '成功', message: '添加成功' })
      })
    },
    getData (id) {
      this.$http.post(api.lotteryRecordInfo, { id: id }).then(res => {
        this.form = res.data
      })
    }
  }
}
</script>

<style>

</style>