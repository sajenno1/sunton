<template>
  <div>
    <el-card>
      <div slot="header">
        <span>发货单列表</span>
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
            label="发货单号"
            width="200px"
            prop="no">
          </el-table-column>
          
          <el-table-column
            label="发货经销商"
            width="200px"
            prop="createDealerName">
          </el-table-column>

          <el-table-column
            label="收货经销商"
            width="200px"
            prop="consigneeDealerName">
          </el-table-column>

          <el-table-column
            label="状态"
            width="100"
            prop="statusName"
            align="center">
          </el-table-column>
          <el-table-column
            label="物流公司"
            width="100"
            prop="expressName"
            align="center">
          </el-table-column>

          <el-table-column
            label="物流单号"
            width="200px"
            prop="expressNo"
            align="center">
          </el-table-column>

          <el-table-column
            label="物流金额"
            prop="expressAmount"
            width="100"
            align="right">
            <template slot-scope="scope">
              {{scope.row.expressAmount | Currency}}
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

          <el-table-column label="操作" width="200px">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleDetail(scope.$index, scope.row)">详情</el-button>
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
        <invoice-search ref="search" @searchInvoice="searchInvoice" v-bind:searchdata="searchdata"/>
        <invoice-detail ref="detail" @getList="getList"/>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as api from '../../../api'
import invoiceDetail from './detail'
import invoiceSearch from './search'
export default {
  name: 'wechatExcellent-invoice-list',
  components: { invoiceDetail, invoiceSearch },
  data () {
    return {
      list: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      searchdata: {
        no: '',
        statuslist: [],
        createDate1: '',
        createDate2: ''
      }
    }
  },
  methods: {
    getList () {
      this.$http.post(api.weChatExcellentInvoiceList, {
        page: this.currentPage,
        pageSize: this.pageSize,
        no: this.searchdata.no,
        createDate1: this.searchdata.createDate1,
        createDate2: this.searchdata.createDate2,
        statuslist: this.searchdata.statuslist
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
    handleDetail (index, row) {
      this.$refs.detail.open(row.id)
    },
    openSearchDialog () {
      this.$refs.search.open()
    },
    searchInvoice (searchdata) {
      this.searchdata = searchdata
      this.currentPage = 1
      this.total = 0
      this.getList()
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
