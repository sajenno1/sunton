<template>
  <div>
    <el-card>
      <div slot="header">
        <span>订单列表</span>
      </div>
      <div class="searchCon clearfix">         
        <el-button  class="right" size="small" type="primary" icon="el-icon-seach" @click="openSearchDialog">查询</el-button>
      </div>
      <div class="table-container">
        <el-table
          :data="list"
          stripe
          highlight-current-row
          border
          style="width: 100%">

          <el-table-column
            type="selection"
            width="55"
            align="center">
          </el-table-column>

          <el-table-column
            label="订单号"
            width="240px"
            prop="no">
          </el-table-column>

          <el-table-column
            label="会员"
            width="100"
            prop="nickName"
            align="center">
          </el-table-column>

          <el-table-column
            label="所属区域经理"
            prop="areaManagerName"
            align="center">
          </el-table-column>

          <el-table-column
            label="补货的POS点"
            prop="pOSName"
            align="center">
          </el-table-column>

          <el-table-column
            label="状态"
            width="100"
            prop="statusText"
            align="center">
          </el-table-column>

          <el-table-column
            label="商品总数"
            width="100"
            prop="productCount"
            align="center">
          </el-table-column>

          <el-table-column
            label="订单备注"
            prop="remark">
          </el-table-column>

          <el-table-column
            label="收货人"
            prop="consigneeName"
            align="center">
          </el-table-column>

          <el-table-column
            label="订单金额"
            prop="totalAmount"
            align="right">
            <template slot-scope="scope">
              {{scope.row.totalAmount | Currency}}
            </template>
          </el-table-column>

          <el-table-column
            label="创建时间"
            align="center"
            min-width="150px">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="250px">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleDetail(scope.$index, scope.row)">详情</el-button>
              <el-button
                size="mini"
                type="warning"
                @click="handleShip(scope.$index, scope.row)"
                v-if="scope.row.status === 'Paid'">发货</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleClose(scope.$index, scope.row)"
                v-if="scope.row.status !== 'Closed' && scope.row.status !== 'Finished'">关闭</el-button>
            </template>
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
        <order-search ref="search" @searchOrder="searchOrder" v-bind:searchdata="searchdata"/>
        <order-detail ref="detail" @getList="getList"/>
        <order-ship ref="orderShip" @getList="getList"/>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as api from '../../../api'
import orderDetail from './detail'
import orderShip from './orderShip'
import orderSearch from './search'
export default {
  name: 'replenishment-replenishOrder-list',
  components: { orderDetail, orderShip, orderSearch },
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
      this.$http.post(api.replenishOrderList, {
        page: this.currentPage,
        pageSize: this.pageSize,
        no: this.searchdata.no,
        createDate1: this.searchdata.createDate1,
        createDate2: this.searchdata.createDate2,
        statuslist: this.searchdata.statuslist,
        startPayDate: !this.searchdata.payDates ? '' : this.searchdata.payDates[0],
        endPayDate: !this.searchdata.payDates ? '' : this.searchdata.payDates[1]

      }).then(res => {
        res.data.rows.forEach(item => {
          item.statusText = this.orderStatusText[item.status]
        })
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
    handleShip (index, row) {
      this.$refs.orderShip.open(row.id)
    },
    handleDetail (index, row) {
      this.$refs.detail.open(row.id)
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
        this.$http.post(api.replenishOrderClose, {
          id: row.id
        }).then(res => {
          row.status = res.data.status
          row.statusText = res.data.statusName
          this.$notify({ title: '成功', message: '操作成功！', type: 'success' })
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
</style>
