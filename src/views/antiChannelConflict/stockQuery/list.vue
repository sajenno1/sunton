<template>
  <div>
    <el-card>
      <div class="headerCon clearfix" slot="header">
        <span>库存查询</span>
      </div>

      <div class="searchCon clearfix">
        <div class="left">
          <el-input v-model="searchData.searchKey" size="small" placeholder="输入品名或货号" clearable="true"></el-input>

            <el-select v-model="searchData.wareHouseId" placeholder="请选择仓库" clearable="true">
              <el-option v-for="item in wareHouseList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
              </el-option>
            </el-select>

          <el-button type="primary" size="small" v-on:click="search" icon="el-icon-search">搜索</el-button>
        </div>
      </div>
      <div class="table-container">
        <el-table
          v-bind:data="list"
          border
          style="width: 100%"
          :row-class-name="stockStatusShow">

          <el-table-column
            label="货号"
            prop="productNo" width="300">
          </el-table-column>

          <el-table-column
            label="品名"
            prop="productName">
          </el-table-column>

          <el-table-column
            label="SKU">
            <template slot-scope="scope">
              <span>{{ getSkuData(scope.row.skuPropertyNames) }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="库存数量"
            prop="qty">
          </el-table-column>

          <el-table-column
            label="安全库存"
            prop="safeStock">
          </el-table-column>          

          <el-table-column
            label="仓库"
            prop="wareHouseName">
          </el-table-column>

          <el-table-column
            label="状态">
            <template slot-scope="scope">
              <span>{{ getStatutText(scope.row.status) }}</span>
            </template>
          </el-table-column>

        </el-table>
      </div>

      <div class="page-container" v-if="total > searchData.pageSize">
        <el-pagination
          v-on:size-change="handleSizeChange"
          v-on:current-change="handleCurrentChange"
          layout="prev, pager, next, sizes, total"
          v-bind:total="total">
        </el-pagination>
      </div>

    </el-card>
  </div>
</template>

<style>
  .el-table .warning-row {
    background: rgb(253, 243, 230);
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>

<script>
import * as api from '../../../api'
import commo from '../../../filter/common.js'
// import antiChannelConflictOutStockDetail from './detail'

export default {
  name: 'antiChannelConflict-outStock-list',
  components: {},
  data () {
    return {
      searchData: {
        searchKey: '',
        pageSize: 10,
        page: 1
      },
      total: 0,
      list: [],
      selectedItems: [],
      wareHouseList: [],
      pageParams: {
        page: 1,
        pageSize: 1000
      }
    }
  },
  methods: {
    getSkuData (sku) {
      return commo.removeSkuData(sku)
    },
    stockStatusShow (row, rowIndex) {
      // console.log(row.row.status)
      switch (row.row.status) {
        case 'Pendding':
          return 'warning-row'
        case 'Finished':
          return 'success-row'
      }
      return ''
    },
    getWarehouseList () {
      this.$http.post(api.warehouseList, this.pageParams).then(res => {
        this.wareHouseList = res.data.rows
      })
    },
    getList () {
      this.$http.post(api.stockList, this.searchData).then(res => {
        this.list = res.data.rows
        this.total = res.data.total
      })
    },
    search () {
      this.getList()
    },
    handleSizeChange (val) {
      this.searchData.pageSize = val
      this.searchData.page = 1
      this.getList()
    },
    handleCurrentChange (val) {
      this.searchData.page = val
      this.getList()
    },
    handleDetail (index, row) {
      this.$refs.detail.showDialog(row.id)
    },
    openAddDialog () {
      this.$refs.add.open()
    },
    getStatutText (status) {
      switch (status) {
        case 'Pendding':
          return '缺货'
        case 'Finished':
          return '正常'
      }
      return ''
    }
  },
  mounted () {
    this.getWarehouseList()
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
