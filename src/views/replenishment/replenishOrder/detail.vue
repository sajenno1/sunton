<template>
  <div>
    <el-dialog title="订单详情" :visible.sync="show" width="75%" @close='closeDialog'>
      <div  class="button-container">
            <el-button class="right" type="warning" @click="payOrder" size="medium" v-if="data.status=='WaittingForPay'">确认付款</el-button>
            <el-button class="right" type="primary" @click="shipOrder" size="medium" v-if="data.status=='Paid' || data.status=='Shipped'">订单发货</el-button>
            <el-button class="right" type="success" @click="completeOrder" size="medium" v-if="data.status=='Shipped'">订单完成</el-button>
            <el-button class="right" type="danger" @click="closeOrder" size="medium"  v-if="data.status!='Closed' && data.status !== 'Finished'" >关闭订单</el-button>
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
                  <h1>{{ orderStatusText[data.status] }}</h1>
                </div>
              </el-col>
              <el-col :span="18">
                <div>
                  <el-steps :active="orderStatus[data.status]" process-status="finish">
                    <el-step title="待支付" icon="el-icon-edit" :description="data.createDate|FormattersDateTime" ></el-step>
                    <el-step title="已支付" icon="el-icon-upload" :description="data.payDateTime|FormattersDateTime"></el-step>
                    <el-step title="已发货" icon="el-icon-message" :description="data.shipDateTime|FormattersDateTime"></el-step>
                    <el-step title="已完成" icon="el-icon-check" :description="data.completeTime|FormattersDateTime"></el-step>
                  </el-steps>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </div>
      <div class="aaa clearfix">
      <div class="express-container clearfix">
        <el-card>
          <div slot="header">
            <span>物流信息</span>
          </div>

          <div>
            <el-row>
              <el-col :span="8">
                <el-form label-width="120px">
                  <el-form-item label="补货人">
                    <span>{{ data.consigneeName }}</span>
                  </el-form-item>

                  <el-form-item label="手机号">
                    <span>{{ data.consigneeMobile }}</span>
                  </el-form-item>

                  <el-form-item label="地址">
                    <span>{{ data.consigneeAreaName + " " + data.consigneeAddress }}</span>
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
     
      <div class="items-container clearfix">
        <el-card>
          <div slot="header">
            <span>订单详情</span>
          </div>
          <div>
            <el-row>
              <el-col :span="8">
                <el-form label-width="120px">
                  <el-form-item label="所属区域经理">
                    <span>{{ data.areaManagerName }}</span>
                  </el-form-item>

                  <el-form-item label="补货的POS点">
                    <span>{{ data.pOSName }}</span>
                  </el-form-item>

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
      <div class="items-container2">
        <el-card>
          <div slot="header">
            <span>商品列表</span>
          </div>

          <div>
            <el-table
              :data="data.items"
              border
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
                label="单价"
                prop="price"
                align="right">
                <template slot-scope="scope">
                  <span style="color:#ff0607">{{scope.row.price|Currency}}</span>
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
                label="总金额"
                align="center">
                <template slot-scope="scope">
                  <div>
                    {{ scope.row.totalAmount|Currency }}
                  </div>
                  <div v-if="false">
                    <h3>{{ scope.row.needTotalIntegral }}</h3>
                  </div>
                </template>
              </el-table-column>

            </el-table>
          </div>
        </el-card>
      </div>
      </div>
      
    </el-dialog>
    <order-ship ref="orderShip" @getList="finishShipOrder"/>
  </div>
</template>

<script>
import * as api from '../../../api'
import orderShip from './orderShip'

export default {
  name: 'replenishment-replenishOrder-detail',
  components: { orderShip },
  data () {
    return {
      show: false,
      data: {
        status: ''
      },
      id: '',
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
      }
    }
  },
  methods: {
    open (id) {
      this.show = true
      this.getData(id)
      this.id = id
    },
    getData (id) {
      this.$http.post(api.replenishOrderInfo, { id: id }).then(res => {
        var order = res.data
        this.data = order
      })
    },
    payOrder () {
      this.$confirm('确认订单已付款,此操作无法撤销, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post(api.replenishOrderPay, {
          id: this.id
        }).then(res => {
          this.data = res.data
          this.$notify({ title: '成功', message: '操作成功！', type: 'success' })
        })
      }).catch(() => {})
    },
    shipOrder () {
      this.$refs.orderShip.open(this.id)
    },
    finishShipOrder () {
      // this.data.status = 'Shipped'
      this.getData(this.id)
    },
    completeOrder () {
      this.$confirm('确认要完成订单,此操作无法撤销, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post(api.replenishOrderFinished, {
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
        this.$http.post(api.replenishOrderClose, {
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
.items-container {
  float: right;
  width: 49.5%;
}
.items-container2 {
  float: right;
  width: 100%;
  margin-top: 10px;
}
.express-container .el-card {
  float: left;
  width: 100%;
  height: 550px;
}
.items-container .el-card {
  float: right;
  width: 100%;
  height: 550px;
}
.el-col-8 {
  width: 100%;
}
.clearfix {*zoom:1;}
.clearfix:after {content:'\200B';clear:both;display:block;height:0px}
</style>

