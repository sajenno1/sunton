<template>
  <div>
    <el-dialog title="订单发货" v-bind:visible.sync="showCurrentDialog" width="600px">
      <el-card>
        <div slot="header">
          <span>订单号：{{order.no}}</span>
        </div>
        
        <el-form v-bind:model="shipForm" style="padding-right:5%;">
          <el-form-item label="配送方式" v-bind:label-width="formLabelWidth">
            <el-select v-model="expressType" placeholder="" value-key="id">
              <el-option
                v-for="item in expressTypeList"
                v-bind:key="item.id"
                v-bind:label="item.name"
                v-bind:value="item.id"
                >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="物流公司" v-show="expressType==0" v-bind:label-width="formLabelWidth">
            <el-select v-model="shipForm.expressId" placeholder="请选择物流公司" filterable clearable>
              <el-option
                v-for="item in expressDrowList"
                v-bind:key="item.id"
                v-bind:label="item.name"
                v-bind:value="item.id"
                >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="物流单号" v-show="expressType==0" v-bind:label-width="formLabelWidth">
            <el-input v-model="shipForm.expressNo" auto-complete="off" size="small"></el-input>
          </el-form-item>
          <el-form-item label="发货日期" v-show="expressType==0" v-bind:label-width="formLabelWidth">
            <el-date-picker
              v-model="shipForm.businessDateTime"
              type="date"
              placeholder="选择日期"
              value-format='yyyy-MM-dd'
              ></el-date-picker>
          </el-form-item>
        </el-form>
      </el-card>
        
      <div slot="footer" class="dialog-footer">
        <el-button v-on:click="showCurrentDialog = false" size="medium">取 消</el-button>
        <el-button type="primary" v-on:click="submitOrderShip" size="medium">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'mall-channelOrder-setStatusToShiped',
  data () {
    return {
      showCurrentDialog: false,
      expressVisible: false,
      expressTypeList: [
        { id: 0, name: '快递物流' },
        { id: 1, name: '无需配送' }
      ],
      expressType: 0,
      shipForm: { expressId: '', expressNo: '', businessDateTime: new Date() },
      formLabelWidth: '120px',
      order: {},
      // order: {
      //   no: '',
      //   statusText: ''
      // },
      expressDrowList: []
      // orderStatusText: {
      //   WaittingForPay: '待支付',
      //   Paid: '已支付',
      //   Shipped: '已发货',
      //   Finished: '已完成',
      //   Closed: '已关闭'
      // }
    }
  },
  methods: {
    open (row) {
      this.showCurrentDialog = true
      this.getData(row.id)
      this.getExpressDrowList()
    },
    getData (id) {
      this.$http.post(api.mallChannelOrderInfo, { id: id }).then(response => {
        // response.data.statusText = this.orderStatusText[response.data.status]
        this.shipForm.id = response.data.id
        // this.order = response.data
        //
        var mOrder = response.data
        this.order = mOrder
        if (mOrder.status === 'Shipped') {
          this.expressType = mOrder.expressName === '' ? 1 : 0
          this.shipForm.expressId = mOrder.expressId
          this.shipForm.expressNo = mOrder.expressNo
          this.shipForm.businessDateTime = mOrder.shipedDateTime
        } else {
          this.expressType = 0
          this.shipForm.expressId = ''
          this.shipForm.expressNo = ''
          this.shipForm.businessDateTime = new Date()
        }
      })
    },
    getExpressDrowList () {
      this.$http.post(api.basicExpressDrowList, {}).then(response => {
        this.expressDrowList = response.data
      })
    },
    submitOrderShip () {
      var getrequest = () => {
        this.shipForm.needExpress = this.expressType !== 1
        this.$http.post(api.mallChannelOrderSetStatusToShiped, this.shipForm).then(response => {
          if (response.status === 200) {
            this.$notify({ title: '成功', message: '订单发货成功！', type: 'success' })
            this.showCurrentDialog = false
            this.$emit('getList')
          } else {
            this.$notify({ title: '失败', message: response.message, type: 'error' })
          }
        })
      }
      // if (this.expressType === 1) {
      //   // data = { id: this.shipForm.id }
      //   this.$confirm('订单确定是 已发货，无需配送 吗?', '提示').then(getrequest).catch(() => {})
      // } else {
      //   getrequest()
      // }
      getrequest()
    }
  }
}
</script>

<style lang="scss" scoped>
.express-container {
  margin-top: 10px;
}
.items-container {
  margin-top: 10px;
}
</style>

