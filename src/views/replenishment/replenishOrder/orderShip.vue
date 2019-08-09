<template>
  <div>
    <el-dialog title="订单发货" :visible.sync="show" width="600px">
      <el-card>
        <div slot="header">
          <span>订单号：{{order.no}}</span>
        </div>
        
        <el-form :model="form" style="padding-right:5%;">
          <el-form-item label="配送方式" :label-width="formLabelWidth">
            <el-select v-model="expressType" placeholder="" value-key="id">
              <el-option
                v-for="item in expressTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="物流公司" v-show="expressType==0" :label-width="formLabelWidth">
            <el-select v-model="form.expressId" placeholder="请选择物流公司" filterable clearable>
              <el-option
                v-for="item in expressDrowList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="物流单号" v-show="expressType==0" :label-width="formLabelWidth">
            <el-input v-model="form.expressNo" auto-complete="off" size="small"></el-input>
          </el-form-item>
          <el-form-item label="发货日期" v-show="expressType==0" :label-width="formLabelWidth">
            <el-date-picker
              v-model="form.shipDateTime"
              type="date"
              placeholder="选择日期"
              value-format='yyyy-MM-dd'
              ></el-date-picker>
          </el-form-item>
        </el-form>
      </el-card>
        
      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false" size="medium">取 消</el-button>
        <el-button type="primary" @click="submitOrderShip" size="medium">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'replenishment-replenishOrder-orderShip',
  data () {
    return {
      show: false,
      expressVisible: false,
      expressTypeList: [{
        id: 0,
        name: '快递物流'
      }, {
        id: 1,
        name: '无需配送'
      }],
      expressType: 0,
      form: { expressId: '', expressNo: '', shipDateTime: new Date() },
      formLabelWidth: '120px',
      order: {
        no: '',
        statusText: ''
      },
      expressDrowList: [],
      orderStatusText: {
        WaittingForPay: '待支付',
        Paid: '已支付',
        Shipped: '已发货',
        Finished: '已完成',
        Closed: '已关闭'
      }
    }
  },
  methods: {
    open (id) {
      this.show = true
      this.getData(id)
      this.getExpressDrowList()
    },
    getData (id) {
      this.$http.post(api.replenishOrderInfo, { id: id }).then(response => {
        response.data.statusText = this.orderStatusText[response.data.status]
        this.form.id = response.data.id
        this.order = response.data
        //
        if (this.order.status === 'Shipped') {
          this.expressType = this.order.expressName === '' ? 1 : 0
          this.form.expressId = this.order.expressId
          this.form.expressNo = this.order.expressNo
          this.form.shipDateTime = this.order.shipDateTime
        } else {
          this.expressType = 0
          this.form.expressId = ''
          this.form.expressNo = ''
          this.form.shipDateTime = new Date()
        }
      })
    },
    getExpressDrowList () {
      this.$http.post(api.replenishExpressDrowList, this.pageParams).then(response => {
        this.expressDrowList = response.data
      })
    },
    submitOrderShip () {
      var data = this.form
      var getrequest = () => {
        this.$http.post(api.replenishOrderShip, data).then(response => {
          if (response.status === 200) {
            this.$notify({ title: '成功', message: '发货成功！', type: 'success' })
            this.show = false
            this.$emit('getList')
          } else {
            this.$notify({ title: '失败', message: response.message, type: 'error' })
          }
        })
      }
      if (this.expressType === 1) {
        data = {
          id: this.form.id
        }
        this.$confirm('订单确定是 已发货，无需配送 吗?', '提示').then(getrequest).catch(() => {})
      } else {
        getrequest()
      }
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

