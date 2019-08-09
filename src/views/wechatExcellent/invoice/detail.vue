<template>
  <div>
    <el-dialog title="发货单详情" :visible.sync="show" width="75%" @close='closeDialog'>
      <div  class="button-container">
        <el-button class="right" type="success" @click="completeOrder" size="medium" v-if="canOption && invoice.status=='Shipped'">确认收货</el-button>
      </div>
      <div class="express-container clearfix">
        <el-card>
          <div slot="header">
            <span>发货单信息</span>
          </div>
          <div>
            <el-form label-width="120px">
              <el-form-item label="发货单号">
                <span>{{ invoice.no }}</span>
              </el-form-item>
              <el-form-item label="发货单状态">
                <span>{{ invoice.statusName }}</span>
              </el-form-item>
              <el-form-item label="相关订单">
                <span>{{ invoice.orders.map(item =>item.no).join(",") }}</span>
              </el-form-item>
              <el-form-item label="收货人姓名">
                <span>{{ invoice.consigneeName }}</span>
              </el-form-item>
              <el-form-item label="手机号">
                <span>{{ invoice.consigneeMobile }}</span>
              </el-form-item>

              <el-form-item label="地址">
                <span>{{ invoice.consigneeAreaName + " " + invoice.consigneeAddress }}</span>
              </el-form-item>

              <el-form-item label="发货单备注">
                <span>{{ invoice.remark }}</span>
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
              :data="invoice.items"
              border
              show-summary
              style="width: 100%;">
              <el-table-column
                label="图片" width="100px" align="center">
                <template slot-scope="scope">
                  <img :src="scope.row.product.photo" style="max-width: 64px; max-height: 64px;"/>
                </template>
              </el-table-column>
              <el-table-column
                label="产品名称"
                prop="product.name"
                align="center">
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
  name: 'wechatExcellent-invoice-detail',
  data () {
    return {
      show: false,
      invoice: {
        status: '',
        orders: []
      },
      id: '',
      canOption: false
    }
  },
  methods: {
    open (id) {
      this.show = true
      this.getData(id)
      this.id = id
    },
    getData (id) {
      this.$http.post(api.weChatExcellentInvoiceInfo, { id: id }).then(res => {
        this.invoice = res.data
      })
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

