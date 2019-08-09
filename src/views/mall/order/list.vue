<template>
  <div>
    <el-card>
      <div slot="header">
        <span>订单列表</span>
      </div>
      <div class="searchCon clearfix">         
        <el-button class="right" size="small" type="primary" icon="el-icon-seach" @click="openSearchDialog">查询</el-button>
      </div>

      <div class="table-container">
        <el-table
          :data="list"
          border
          style="width: 100%;">
          <el-table-column
            label="订单号"
            prop="no"
            width="260px">
          </el-table-column>

          <el-table-column
            label="买家名称"
            width="120px"
            align="center"
            prop="userName">
          </el-table-column>

          <el-table-column
            label="商品总数"
            align="center"
            width="120px"
            prop="productCount">
          </el-table-column>

          <el-table-column
            label="订单总额（包含运费）"
            width="180px"
            align="right">
            <template slot-scope="scope">
              <span class="table-money">{{ scope.row.totalAmount|Currency}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="支付的积分总数"
            width="210px"
            align="center"
            prop="payTotalIntegral">
          </el-table-column>

          <el-table-column
            label="订单状态"
            align="center"
            width="120px"
            prop="orderStatus">
          </el-table-column>

          <el-table-column
            label="支付时间"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.payDateTime | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="发货时间"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.shipDateTime | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleDetail(scope.$index, scope.row)">详情</el-button>
              <el-button
                v-if="scope.row.orderStatus === '已支付'"
                size="mini"
                type="warning"
                @click="handleDelivery(scope.$index, scope.row)">发货</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleClose(scope.$index, scope.row)"
                v-if="scope.row.orderStatus !== '已完成' && scope.row.orderStatus !== '已关闭'">关闭</el-button>
            </template>
          </el-table-column>

          </el-table-column>

        </el-table>
      </div>

      <div class="page-container" v-if="total > pageSize">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="prev, pager, next, sizes, total"
          :total="total">
        </el-pagination>
      </div>

      <div>
        <order-delivery ref="delivery" @getList="getList"/>
        <order-detail ref="detail" @getList="getList"/>
        <order-search ref="search" @searchOrder="searchOrder" v-bind:searchdata="searchdata"/>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as api from '../../../api'
import orderDelivery from './delivery'
import orderDetail from './detail'
import orderSearch from './search'
export default {
  name: 'mall-order-list',
  components: { orderDelivery, orderDetail, orderSearch },
  data () {
    return {
      list: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      searchdata: {
        no: '',
        statuslist: [],
        payDates: ['', ''],
        createDate1: '',
        createDate2: ''
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
    getList () {
      this.$http.post(api.mallOrderList, {
        page: this.currentPage,
        pageSize: this.pageSize,
        no: this.searchdata.no,
        createDate1: this.searchdata.createDate1,
        createDate2: this.searchdata.createDate2,
        statuslist: this.searchdata.statuslist,
        startPayDate: !this.searchdata.payDates ? '' : this.searchdata.payDates[0],
        endPayDate: !this.searchdata.payDates ? '' : this.searchdata.payDates[1]
      }).then(res => {
        this.list = res.data.rows
        this.total = res.data.total
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.currentPage = 1
      this.getList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getList()
    },
    handleDelivery (index, row) {
      this.$refs.delivery.open(row.id)
    },
    handleDetail (index, row) {
      this.$refs.detail.open(row)
    },
    openSearchDialog () {
      this.$refs.search.open()
    },
    searchOrder (searchdata) {
      this.searchdata = searchdata
      this.currentPage = 1
      this.total = 0
      this.getList()
    },
    handleClose (index, row) {
      this.$confirm('确认要关闭订单,此操作无法撤销, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post(api.closeMallOrder, {
          id: row.id
        }).then(res => {
          row.orderStatus = this.orderStatusText[res.data.orderStatus]
          this.$notify({ title: '成功', message: '订单关闭成功！', type: 'success' })
          this.getList()
        })
      }).catch(() => {})
    }

  },
  mounted () {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  margin-top: 10px;
}
.table-container {
  margin-top: 10px;
}
.table-money {
color: #ef4f4f;

}
</style>
