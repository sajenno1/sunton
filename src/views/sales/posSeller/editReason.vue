<template>
  <div>
    <el-dialog title="申请驳回" :visible.sync="show" width="40%">
      <el-form :model="form" style="padding-right:5%;">
        <el-form-item label="请输入驳回的原因" :label-width="formLabelWidth">
          <el-input v-model="form.rejectReason" auto-complete="off"></el-input>
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
    name: 'sales-posSeller-editReason',
    data () {
      return {
        formLabelWidth: '140px',
        show: false,
        form: {}
      }
    },
    methods: {
      open (id) {
        this.form = {}
        this.form.id = id
        this.show = true
      },
      create () {
        this.$http.post(api.auditingPOSSeller, {
          id: this.form.id,
          status: false,
          rejectReason: this.form.rejectReason
        }).then(res => {
          this.$emit('getList')
          this.$notify.success({
            title: '成功',
            message: '驳回成功'
          })
          this.show = false
        })
      }
    }
  }
</script>
<style>


</style>
