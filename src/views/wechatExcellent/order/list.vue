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
            label="下单经销商"
            width="250px"
            prop="createDealerName">
          </el-table-column>

          <el-table-column
            label="发货经销商"
            width="250px"
            prop="deliveryDealerName">
          </el-table-column>

          <el-table-column
            label="状态"
            width="100"
            prop="statusName"
            align="center">
          </el-table-column>

          <el-table-column
            label="商品总数"
            width="100"
            prop="productCount"
            align="center">
          </el-table-column>


          <el-table-column
            label="订单金额"
            prop="totalAmount"
            width="100"
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
      </div>
    </el-card>
  </div>
</template>

<script>
import * as api from '../../../api'
import orderDetail from './detail'
import orderSearch from './search'
export default {
  name: 'wechatExcellent-order-list',
  components: { orderDetail, orderSearch },
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
      }
    }
  },
  methods: {
    getList () {
      this.$http.post(api.wechatExcellentOrderList, {
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
        this.$http.post(api.wechatExcellentOrderClose, {
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
