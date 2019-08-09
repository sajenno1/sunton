<template>
  <div>
    <el-dialog title="订单关闭" :visible.sync="showCurrentDialog" width="75%">
      <div  class="button-container" align="right">
      </div>
      
      <el-form v-bind:model="closeForm" style="padding-right:5%;">
        <el-form-item label="订单号" v-bind:label-width="formLabelWidth">
          <div>{{orderData.no}}</div>
        </el-form-item>
        <el-form-item label="备注" v-bind:label-width="formLabelWidth">
          <el-input v-model="closeForm.remark" auto-complete="off" size="small"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="padding-left:30px;">
        <el-button type="primary" v-on:click="showCurrentDialog=false" size="medium">取 消</el-button>
        <el-button type="primary" v-on:click="doClose" size="medium">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'mall-order-setStatusToShiped',
  components: { },
  data () {
    return {
      orderData: {},
      closeForm: {},
      showCurrentDialog: false,
      formLabelWidth: '120px'
    }
  },
  methods: {
    open (row) {
      this.showCurrentDialog = true
      this.orderData = row
    },
    doClose () {
      this.$confirm('确认关闭订单吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'information'
      }).then(() => {
        this.closeForm.id = this.orderData.id
        //
        this.$http.post(api.mallChannelOrderSetStatusToClosed, this.closeForm).then(res => {
          this.$notify({ title: '成功', message: '订单关闭成功！', type: 'success' })
          this.showCurrentDialog = false
          this.$emit('getList')
        })
      }).catch((e) => {
        console.log(e)
      })
    },
    closeDialog () {
      this.$emit('getList')
    }
  }
}
</script>

  