<template>
  <div>
    <el-dialog title="订单发货" :visible.sync="showCurrentDialog" width="75%">
      <div  class="button-container" align="right">
      </div>
      
      <el-form v-bind:model="shipForm" style="padding-right:5%;">
        <el-form-item label="订单号" v-bind:label-width="formLabelWidth">
          <div>{{orderData.no}}</div>
        </el-form-item>
        <el-form-item label="快递编号" v-bind:label-width="formLabelWidth">
          <el-input v-model="shipForm.expressNo" auto-complete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="快递名称" v-bind:label-width="formLabelWidth">
          <el-input v-model="shipForm.expressName" auto-complete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="备注" v-bind:label-width="formLabelWidth">
          <el-input v-model="shipForm.remark" auto-complete="off" size="small"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="padding-left:30px;">
        <el-button type="primary" v-on:click="showCurrentDialog='false'" size="medium">取 消</el-button>
        <el-button type="primary" v-on:click="doShip" size="medium">确 定</el-button>
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
      shipForm: {},
      showCurrentDialog: false,
      data: {},
      formLabelWidth: '120px'
    }
  },
  methods: {
    open (row) {
      this.showCurrentDialog = true
      // this.getData(row.id)
      this.orderData = row
    },
    doShip () {
      this.shipForm.id = this.orderData.id
      // this
      //
      this.$http.post(api.mallChannelOrderSetStatusToShiped, this.shipForm).then(res => {
        this.$notify({ title: '成功', message: '订单发货成功！', type: 'success' })
        this.getList()
      })
    },
    // getData (id) {
    //   this.$http.post(api.mallChannelOrderInfo, { id: id }).then(res => {
    //     this.data = res.data
    //   })
    // },
    // getStatusText (status) {
    //   switch (status) {
    //     case 'Checking': return '待审核'
    //     case 'Shiping': return '待发货'
    //     case 'Finishing': return '待完成'
    //     case 'Finished': return '已完成'
    //     case 'Closed': return '已关闭'
    //   }
    //   return ''
    // },
    closeDialog () {
      this.$emit('getList')
    }
  }
}
</script>

  