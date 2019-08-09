<template>
  <div>
    <el-card>
      <div slot="header">
        <span>入库管理</span>
      </div>
    
     <div class="searchCon clearfix">
        <div class="left">
          <el-input v-model="searchData.no" size="small" placeholder="输入单号" clearable @change="search"></el-input>

            <el-select v-model="searchData.wareHouseId" placeholder="请选择仓库" clearable>
              <el-option v-for="item in warehouseList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
              </el-option>
            </el-select>

          <el-button type="primary" size="small" v-on:click="search" icon="el-icon-search">搜索</el-button>
        </div>       
        <div class="right">
          <el-button class="right" style="margin-left: 5px;" size="small" type="primary" icon="el-icon-plus" v-on:click="openAddDialog">新增入库单</el-button>
        </div>
      </div>

      <div class="table-container">
        <el-table
          :data="list"
          border
          style="width: 100%">

          <el-table-column
            type="selection"
            width="48" align="center">
          </el-table-column>

          <el-table-column
            label="编号"
            prop="no">
          </el-table-column>

          <el-table-column
            label="总金额"
            prop="amount">
          </el-table-column>

          <el-table-column
            label="仓库"
            prop="warehouseName">
          </el-table-column>

          <el-table-column
            label="开单员"
            prop="createUser">
          </el-table-column>

          <el-table-column
            label="创建时间"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleDetail(scope.$index, scope.row)">详情</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    </el-card>

    <div>
      <antiChannelConflict-inStock-detail ref="detail"></antiChannelConflict-inStock-detail>
      <add ref="add"  v-on:getList="getList"/>
    </div>
  </div>
</template>
<script>
import * as api from '../../../api'
import antiChannelConflictInStockDetail from './detail'
// import add from './add'
// import add from './addBySKU'

export default {
  name: 'antiChannelConflict-inStock-list',
  components: { antiChannelConflictInStockDetail },
  data () {
    return {
      pageSize: 10,
      currentPage: 1,
      total: 0,
      list: [],
      warehouseList: [],
      searchData: {
        no: '',
        wareHouseId: '',
        pageSize: 10,
        page: 1
      },
      pageParams: {
        page: 1,
        pageSize: 1000
      }
    }
  },
  methods: {
    handleselectedSKU () {
      alert('sdsd')
    },
    openAddDialog () {
      // this.$refs.selectedSKU.open()
      // this.$refs.add.open()
      this.$router.push('./addBySKU')
    },
    getList () {
      this.$http.post(api.inStockList, this.searchData).then(res => {
        this.list = res.data.rows
        this.total = res.data.total
      })
    },
    getWarehouseList () {
      this.$http.post(api.warehouseList, this.pageParams).then(res => {
        this.warehouseList = res.data.rows
      })
    },
    search () {
      this.searchData.page = 1
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
      this.$http.post(api.inStockInfo, { id: row.id }).then(res => {
        this.$refs.detail.showDialog(res.data)
      })
    },
    handleDelete (index, row) {
      this.$confirm('确定删除该单据吗？')
      .then(() => {
        this.$http.post(api.delInStock, { id: row.id }).then(res => {
          this.getList()
          this.$notify({ title: '成功', message: '删除成功！', type: 'success' })
        })
      })
        .catch(() => {})
    }
  },
  mounted () {
    console.log('被创建')
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
