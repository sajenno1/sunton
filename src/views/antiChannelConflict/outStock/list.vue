<template>
  <div>
    <el-card>
      <div class="headerCon clearfix" slot="header">
        <span>出库单列表</span>
      </div>

      <div class="searchCon clearfix">
        <div class="left">
          <el-input v-model="searchData.no" size="small" placeholder="搜索 出库单编号" @change="search"></el-input>
          <el-button type="primary" size="small" v-on:click="search" icon="el-icon-search">搜索</el-button>
        </div>
        <div class="right">
          <el-button class="right" style="margin-left: 5px;" size="small" type="primary" icon="el-icon-plus" v-on:click="openAddDialog">添加</el-button>
          <el-button class="right" style="margin-left: 5px;" size="small" type="primary" icon="el-icon-arrow-left" v-on:click="backStatus">后退状态</el-button>
          <el-button class="right" size="small" type="danger" icon="el-icon-delete" v-on:click="batchDeleteItems">批量删除</el-button>
        </div>
      </div>
      <div class="table-container">
        <el-table
          v-bind:data="list"
          border
          show-summary="true"
          style="width: 100%"
          v-on:selection-change="handleSelectionChange">

          <el-table-column
            type="selection"
            width="55"
            align="center">
          </el-table-column>

          <el-table-column
            label="编号"
            prop="no" width="300">
          </el-table-column>

          <el-table-column
            label="外部编号"
            prop="outerNo">
          </el-table-column>

          <el-table-column
            label="经销商"
            prop="dealerName">
          </el-table-column>

          <!--<el-table-column
            label="地区"
            prop="areaName">
          </el-table-column>-->

          <el-table-column
            label="上级经销商"
            prop="parentDealerName">
          </el-table-column>

          <el-table-column
            label="仓库"
            prop="warehouseName">
          </el-table-column>

          <el-table-column
            label="PDA账号"
            prop="pdaAccountName">
          </el-table-column>

          <el-table-column
            label="总金额"
            prop="amount">
          </el-table-column>          

          <el-table-column
            label="状态">
            <template slot-scope="scope">
              <span>{{ getStatutText(scope.row.status) }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="创建时间"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="120" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleDetail(scope.$index, scope.row)">详情</el-button>
              <!-- <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
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

      <div>
        <antiChannelConflict-outStock-detail ref="detail"></antiChannelConflict-outStock-detail>
        <add-out-stock ref="add" v-on:getList="getList"/>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as api from '../../../api'
import antiChannelConflictOutStockDetail from './detail'
import addOutStock from './add'
export default {
  name: 'antiChannelConflict-outStock-list',
  components: { antiChannelConflictOutStockDetail, addOutStock },
  data () {
    return {
      searchData: {
        no: '',
        pageSize: 10,
        page: 1
      },
      total: 0,
      list: [],
      selectedItems: [],
      outStockInput: {}
    }
  },
  methods: {
    getList () {
      this.$http.post(api.outStockList, this.searchData).then(res => {
        this.list = res.data.rows
        this.total = res.data.total
      })
      var _this = this
      setTimeout(() => {
        console.log(_this.$store)
      }, 1000)
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
    batchDeleteItems () {
      if (this.selectedItems.length === 0) {
        this.$notify({title: '错误', message: '请先选择操作项！', type: 'error'})
        return
      }
      this.$confirm('确定要删除 吗?', '提示').then(() => {
        var sIds = this.selectedItems.map(function (item) {
          return item.id
        })
        this.$http.post(api.batchRemoveOutStock, sIds).then(response => {
          if (response.status === 200) {
            this.$notify({ title: '成功', message: '删除成功！', type: 'success' })
            this.getList()
          } else {
            this.$notify({ title: '失败', message: response.message, type: 'error' })
          }
        })
      }).catch(() => {})
    },
    handleSelectionChange (selectedItems) {
      this.selectedItems = selectedItems
    },
    backStatus () {
      if (this.selectedItems.length === 0) {
        this.$notify({title: '错误', message: '请先选择操作项！', type: 'error'})
        return
      }
      this.$confirm('确定要后退状态 吗?', '提示').then(() => {
        var sIds = this.selectedItems.map(function (item) {
          return item.id
        })
        this.$http.post(api.batchBackStatusOutStock, sIds).then(response => {
          if (response.status === 200) {
            this.$notify({ title: '成功', message: '操作成功！', type: 'success' })
            this.getList()
          } else {
            this.$notify({ title: '失败', message: response.message, type: 'error' })
          }
        })
      }).catch(() => {})
    },
    getStatutText (status) {
      switch (status) {
        case 'Pendding':
          return '待发货'
        case 'Finished':
          return '已发货'
      }
      return ''
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
