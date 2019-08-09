<template>
  <div>
    <el-dialog title="订单详情" :visible.sync="show" width="75%">
    <div  class="button-container" align="right">
      <el-button class="right" type="warning" @click="payOrder" size="medium" v-if="data.orderStatus=='WaittingForPay'">确认付款</el-button>
      <el-button class="right" type="primary" @click="shipOrder" size="medium" v-if="data.orderStatus=='Paid' || data.orderStatus=='Shipped'">订单发货</el-button>
      <el-button class="right" type="success" @click="completeOrder" size="medium" v-if="data.orderStatus=='Shipped'">订单完成</el-button>
      <el-button class="right" type="danger" @click="closeOrder" size="medium"  v-if="data.orderStatus!='Closed' && data.orderStatus !== 'Finished'" >关闭订单</el-button>
    </div>
      <div>
        <el-card>
          <div slot="header">
            <span>订单号：{{ data.no }}</span>
          </div>

          <div class="data-container">
            <el-row>
              <el-col :span="6">
                <div>
                  <h1 style="text-align: center;">{{ orderStatusText[data.orderStatus] }}</h1>
                </div>
              </el-col>

              <el-col :span="18">
                <div>
                  <el-steps :active="orderStatus[data.orderStatus]" process-status="finish">
                   <el-step title="待支付" icon="el-icon-edit" :description="data.createDate|FormattersDateTime" ></el-step>
                    <el-step title="已支付" icon="el-icon-upload" :description="data.payDateTime|FormattersDateTime"></el-step>
                    <el-step title="已发货" icon="el-icon-message" :description="data.shipDateTime|FormattersDateTime"></el-step>
                    <el-step title="已完成" icon="el-icon-check" :description="data.finishedDateTime|FormattersDateTime"></el-step>
                  </el-steps>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </div>

      <div class="aaa clearfix">
        <div class="express-container">
        <el-card>
          <div slot="header">
            <span>物流信息</span>
          </div>
          <div>
            <el-row>
              <el-col :span="8">
                <el-form label-width="120px">

                  <el-form-item label="收货人">
                    <span>{{ data.consigneeName }}</span>
                  </el-form-item>

                  <el-form-item label="地址">
                    <span>{{ data.consigneeAreaName + data.consigneeAddress }}</span>
                  </el-form-item>

                  <el-form-item label="手机号码">
                    <span>{{ data.consigneeMobile }}</span>
                  </el-form-item>

                   <el-form-item label="订单备注">
                    <span>{{ data.remark }}</span>
                  </el-form-item>

                  <el-form-item label="快递名称">
                    <span>{{ data.expressName }}</span>
                  </el-form-item>

                  <el-form-item label="快递单号">
                    <span>{{ data.expressNo }}</span>
                  </el-form-item>

                  <el-form-item label="发货时间">
                    <span>{{ data.shipDateTime|FormattersDateTime }}</span>
                  </el-form-item>
                </el-form>
              </el-col>
            
            </el-row>
          </div>
        </el-card>
      </div>

      <div class="express-container2">
        <el-card>
          <div slot="header">
            <span>订单信息</span>
          </div>
          <div>
            <el-row>
              <el-col :span="8">
                <el-form label-width="120px">

                 <el-form-item label="商品总数">
                    <span>{{ data.productCount }}</span>
                  </el-form-item>

                  <el-form-item label="商品总金额">
                    <span>{{ data.actualTotalAmount|Currency }}</span>
                  </el-form-item>

                  <el-form-item label="积分抵用金额">
                    <span>{{ data.payTotalIntegral }}</span>
                  </el-form-item>

                  <el-form-item label="快递费">
                    <span>{{ data.expressAmount|Currency }}</span>
                  </el-form-item>

                  <el-form-item label="订单总额">
                    <span>{{ data.totalAmount|Currency }}</span>
                  </el-form-item>

                   <el-form-item label="支付方式">
                    <span>{{ data.paymentMethodName }}</span>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
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
              :data="data.orderItems"
              border
              style="width: 100%;">

              <el-table-column
                label="图片"
                align="center">
                <template slot-scope="scope">
                  <img :src="scope.row.productPhoto" style="max-width: 64px; max-height: 64px;"/>
                </template>
              </el-table-column>

              <el-table-column
                label="产品名称"
                align="center"
                prop="productName">
              </el-table-column>
              

              <el-table-column
                label="属性"
                align="center"
                prop="propertiesName">
              </el-table-column>
              
              <el-table-column
                label="单价"
                align="right">
                <template slot-scope="scope">
                  <span class="table-money">{{ scope.row.price|Currency}}</span>
                </template>
              </el-table-column>

              <el-table-column
                label="积分"
                align="center"
                prop="customeIntegral">
              </el-table-column>

              <el-table-column
                label="数量"
                align="center"
                prop="count">
              </el-table-column>

              <el-table-column
                label="总金额"
                align="center">
                <template slot-scope="scope">
                  <div>
                    <span class="table-money">订单总额：{{ scope.row.totalAmount|Currency}}</span>
                  </div>
                  <div>
                    <span class="table-money">所需积分：{{ scope.row.needTotalIntegral }}</span>
                  </div>
                </template>
              </el-table-column>

            </el-table>
          </div>
        </el-card>
      </div>
     </div>
    </el-dialog>
    <order-delivery ref="orderDelivery" @getList="finishShipOrder"/>
  </div>

</template>

<script>
import * as api from '../../../api'
import orderDelivery from './delivery'
export default {
  name: 'mall-order-detail',
  components: { orderDelivery },
  data () {
    return {
      show: false,
      data: {},
      orderStatus: {
        WaittingForPay: 0,
        Paid: 1,
        Shipped: 2,
        Finished: 3
      },
      orderStatusText: {
        WaittingForPay: '待支付',
        Paid: '已支付',
        Shipped: '已发货',
        Finished: '已完成',
        Closed: '已关闭'
      },
      id: ''
    }
  },
  methods: {
    open (row) {
      this.show = true
      this.id = row.id
      this.getData(row.id)
    },
    getData (id) {
      this.$http.post(api.mallOrderInfo, { id: id }).then(res => {
        this.data = res.data
      })
    },
    finishShipOrder () {
      this.getData(this.id)
    },
    payOrder () {
      this.$confirm('确认订单已付款,此操作无法撤销, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post(api.mallOrderPay, {
          id: this.id
        }).then(res => {
          this.data = res.data
          this.$notify({ title: '成功', message: '操作成功！', type: 'success' })
        })
      }).catch(() => {})
    },
    shipOrder () {
      this.$refs.orderDelivery.open(this.id)
    },
    completeOrder () {
      this.$confirm('确认要完成订单,此操作无法撤销, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post(api.FinishedMallOrder, {
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
        this.$http.post(api.closeMallOrder, {
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
.express-container {
  margin-top: 10px;
}
.items-container {
  margin-top: 10px;
}
.express-container {
  float: left;
  width: 49.5%;
}
.express-container2 {
  float: right;
  width: 49.5%;
  margin-top: 10px;
}
.items-container {
  float: right;
  width: 100%;
  margin-top: 10px;
}
.express-container .el-card,
.express-container2 .el-card {
  float: left;
  width: 100%;
  height: 460px;
}
.items-container .el-card {
  float: right;
  width: 100%;
}
.el-col-8 {
  width: 100%;
}
.clearfix {*zoom:1;}
.clearfix:after {content:'\200B';clear:both;display:block;height:0px}
.table-money {
color: #ef4f4f;
}
</style>

