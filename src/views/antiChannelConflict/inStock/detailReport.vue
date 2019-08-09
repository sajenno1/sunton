<template>
  <div>
    <el-card>
      <div slot="header">
        <span>入库明细表</span>
      </div>
    <!-- <el-dialog title="入库明细表" :visible.sync="show"> -->

     <div class="searchCon clearfix">
        <div class="left">
          <el-input v-model="searchData.no" size="small" placeholder="输入单号" clearable></el-input>
          <el-input v-model="searchData.code" size="small" placeholder="输入货号" clearable></el-input>
          <el-input v-model="searchData.name" size="small" placeholder="输入品名" clearable></el-input>
          
            <el-select v-model="searchData.wareHouseId" placeholder="请选择仓库" clearable>
              <el-option v-for="item in warehouseList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
              </el-option>
            </el-select>

          <el-button type="primary" size="small" v-on:click="search" icon="el-icon-search">搜索</el-button>
        </div>       
        <!-- <div class="right">
          <el-button class="right" style="margin-left: 5px;" size="small" type="primary" icon="el-icon-plus" v-on:click="openAddDialog">新增入库单</el-button>
        </div> -->
      </div>

      <el-table
        :data="detailList"
        border
        style="width: 100%">

        <el-table-column
          label="产品"
          prop="productName">
        </el-table-column>

        <el-table-column
          label="仓库"
          prop="wareHouseName">
        </el-table-column>

        <el-table-column
          label="编码"
          prop="code">
        </el-table-column>        

        <el-table-column
          label="SKU">
          <template slot-scope="scope">
            <span>{{ getSkuData(scope.row.skuPropertyNames) }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="单位"
          prop="unit">
        </el-table-column>

        <el-table-column
          label="单价"
          prop="price">
        </el-table-column>

        <el-table-column
          label="数量"
          prop="count">
        </el-table-column>

        <el-table-column
          label="金额"
          prop="amount">
        </el-table-column>        

        <el-table-column
          label="备注"
          prop="remarks">
        </el-table-column>        

        <el-table-column
          label="入库时间"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createDate | FormattersDateTime }}</span>
          </template>
        </el-table-column>

      </el-table>

      <div class="page-container" v-if="total > searchData.pageSize">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="prev, pager, next, sizes, total"
          :total="total">
        </el-pagination>
      </div>

    <!-- </el-dialog> -->
    </el-card>
  </div>
</template>

<script>
import * as api from '../../../api'
import common from '../../../filter/common'
export default {
  name: 'antiChannelConflict-dealer-detail',
  data () {
    return {
      total: 0,
      show: true,
      list: {},
      searchData: {no: '', name: '', wareHouseId: '', code: '', page: 1, pageSize: 10},
      detailList: [],
      pageParams: {page: 1, pageSize: 20},
      warehouseList: []
    }
  },
  methods: {
    getSkuData (sku) {
      common.removeSkuData(sku)
    },
    search () {
      this.searchData.page = 1
      this.getList()
    },
    toggleDialog () {
      this.show = !this.show
    },
    showDialog (data) {
      this.list = data
      this.show = true
    },
    handleCurrentChange (val) {
      this.searchData.page = val
      this.getList()
    },
    handleSizeChange (val) {
      this.searchData.pageSize = val
      this.searchData.page = 1
      this.getList()
    },
    getWarehouseList () {
      this.$http.post(api.warehouseList, this.pageParams).then(res => {
        this.warehouseList = res.data.rows
      })
    },
    getList () {
      this.$http.post(api.instockDetailReport, this.searchData).then(res => {
        this.detailList = res.data.rows
        this.total = res.data.total
      })
    }
  },
  mounted () {
    this.getWarehouseList()
    this.getList()
  }
}
</script>

<style>
.page-container {
  margin-top: 10px;
}
</style>
