<template>
  <div>
    <el-dialog title="订单详情" :visible.sync="show" width="75%" @close='closeDialog'>
      <div  class="button-container">
        <el-button class="right" type="warning" @click="payOrder" size="medium" v-if="canOption && order.status=='WaittingForPay'">确认付款</el-button>
        <el-button class="right" type="primary" @click="shipOrder" size="medium" v-if="canOption && (order.status=='Paid' || order.status=='Shipped')">订单发货</el-button>
        <el-button class="right" type="success" @click="completeOrder" size="medium" v-if="canOption && order.status=='Shipped'">订单完成</el-button>
        <el-button class="right" type="danger" @click="closeOrder" size="medium"  v-if="canOption && order.status!='Closed' && order.status !== 'Finished'" >关闭订单</el-button>
      </div>
      <div>
        <el-card>
          <div slot="header">
            <span>订单号：{{ order.no }}</span>
          </div>
          <div class="order-container">
            <el-row>
              <el-col :span="4">
                <div style="text-align:center" >
                  <h1>{{ order.statusName }}</h1>
                </div>
              </el-col>
              <el-col :span="20">
                <div>
                  <el-steps :active="orderStatus[order.status]" process-status="finish">
                    <el-step title="待支付" icon="el-icon-edit" :description="order.createDate|FormattersDateTime" ></el-step>
                    <el-step title="已支付" icon="el-icon-upload" :description="order.payDateTime|FormattersDateTime"></el-step>
                    <el-step title="已发货" icon="el-icon-message" :description="order.shipDateTime|FormattersDateTime"></el-step>
                    <el-step title="已完成" icon="el-icon-check" :description="order.completeTime|FormattersDateTime"></el-step>
                  </el-steps>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </div>
      <div class="express-container clearfix">
        <el-card>
          <div slot="header">
            <span>物流信息</span>
          </div>
          <div>
            <el-form label-width="120px">
              <el-form-item label="收货人">
                <span>{{ order.consigneeName }}</span>
              </el-form-item>

              <el-form-item label="手机号">
                <span>{{ order.consigneeMobile }}</span>
              </el-form-item>

              <el-form-item label="地址">
                <span>{{ order.consigneeAreaName + " " + order.consigneeAddress }}</span>
              </el-form-item>

              <el-form-item label="订单备注">
                <span>{{ order.remark }}</span>
              </el-form-item>
            </el-form>
          </div>
          <div>
            <el-table
              :data="order.invoices"
              border
              style="width: 100%;">
              <el-table-column
                label="快递名称"
                prop="expressName"
                align="center"
                >
              </el-table-column>
              <el-table-column
                label="快递编号"
                prop="expressNo"
                align="center"
                >
              </el-table-column>
              <el-table-column
                label="发货时间"
                prop="createDate"
                align="center"
                >
                <template slot-scope="scope">
                  <span>{{ scope.row.createDate | FormattersDateTime }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </div>
     
      <div class="items-container clearfix">
        <el-card>
          <div slot="header">
            <span>订单详情</span>
          </div>
          <div>
            <el-form label-width="120px">
              <el-form-item label="下单经销商">
                <span>{{ order.createDealer.name }}</span>
              </el-form-item>

              <el-form-item label="发货经销商">
                <span>{{ order.deliveryDealer.name }}</span>
              </el-form-item>

              <el-form-item label="商品总数">
                <span>{{ order.productCount }}</span>
              </el-form-item>

              <el-form-item label="商品总金额">
                <span>{{ order.payableAmount|Currency }}</span>
              </el-form-item>

              <el-form-item label="快递费">
                <span>{{ order.expressAmount|Currency }}</span>
              </el-form-item>

              <el-form-item label="订单总额">
                <span>{{ order.totalAmount|Currency }}</span>
              </el-form-item>

                <el-form-item label="支付方式">
                <span>{{ order.paymentMethodName }}</span>
              </el-form-item>
            </el-form>
          </div>          
        </el-card>
      </div>
      <div class="items-container">
        <el-card>
          <div slot="header">
            <span>商品列表</span>
          </div>
          <div>
            <el-table
              :data="order.items"
              border
              show-summary
              :summary-method="getSummaries"
              style="width: 100%;">
              <el-table-column
                label="图片" width="100px" align="center">
                <template slot-scope="scope">
                  <img :src="scope.row.productPhoto" style="max-width: 64px; max-height: 64px;"/>
                </template>
              </el-table-column>
              <el-table-column
                label="产品名称"
                prop="productName"
                align="center">
              </el-table-column>
              <el-table-column
                label="经销价"
                prop="dealerPrice"
                align="right">
                <template slot-scope="scope">
                  <span style="color:#ff0607">{{scope.row.dealerPrice|Currency}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="属性"
                prop="propertiesName"
                align="center">
              </el-table-column>
              <el-table-column
                label="数量"
                prop="quantity"
                align="center">
              </el-table-column>
              <el-table-column
                label="小计"
                align="center">
                <template slot-scope="scope">
                  <div>
                    {{ scope.row.dealerPrice * scope.row.quantity|Currency }}
                  </div>
                </template>
              </el-table-column>

            </el-table>
          </div>
        </el-card>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'

export default {
  name: 'wechatExcellent-order-detail',
  data () {
    return {
      show: false,
      order: {
        status: '',
        createDealer: {
          name: ''
        },
        deliveryDealer: {
          name: ''
        }
      },
      id: '',
      canOption: false,
      orderStatus: {
        WaittingForPay: 0,
        Paid: 1,
        Shipped: 2,
        Finished: 3
      }
    }
  },
  methods: {
    open (id) {
      this.show = true
      this.getData(id)
      this.id = id
    },
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        if (index === 5) {
          const valuesCount = data.map(item => Number(item.dealerPrice) * Number(item.quantity))
          sums[index] = valuesCount.reduce((total, num) => {
            return total + num
          }, 0)
        }
      })
      return sums
    },
    getData (id) {
      this.$http.post(api.wechatExcellentOrderInfo, { id: id }).then(res => {
        this.order = res.data
        // 懂事提交的订单,总部可以操作
        this.canOption = !this.order.deliveryDealer
      })
    },
    payOrder () {
      this.$confirm('确认订单已付款,此操作无法撤销, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post(api.wechatExcellentOrderPay, {
          id: this.id
        }).then(res => {
          this.data = res.data
          this.$notify({ title: '成功', message: '操作成功！', type: 'success' })
        })
      }).catch(() => {})
    },
    completeOrder () {
      this.$confirm('确认要完成订单,此操作无法撤销, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post(api.wechatExcellentOrderFinished, {
          id: this.id
        }).then(res => {
          this.data = res.data
          this.$notify({ title: '成功', message: '操作成功！', type: 'success' })
        })
      }).catch(() => {})
    },
    closeOrder () {
      this.$confirm('确认要关闭订单,此操作无法撤销, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post(api.wechatExcellentOrderClose, {
          id: this.id
        }).then(res => {
          this.data = res.data
          this.$notify({ title: '成功', message: '操作成功！', type: 'success' })
        })
      }).catch(() => {})
    },
    closeDialog () {
      this.$emit('getList')
    }
  }
}
</script>

<style lang="scss" scoped>
.button-container
{
   text-align: right;
   margin-bottom: 10px;
}
.express-container,.items-container
{
  margin-top: 10px;
}
</style>

