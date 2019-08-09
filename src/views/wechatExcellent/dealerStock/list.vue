<template>
  <div>
    <el-card>
      <div slot="header">
        <span>经销商库存</span>
      </div>

      <div class="searchCon clearfix">
        <div class="left">
          <el-input v-model="productName" size="small" placeholder="请输入商品名称"></el-input>
          <el-input v-model="dealerName" size="small" placeholder="请输入经销商名称"></el-input>
          <el-button type="primary" size="small" @click="search" icon="el-icon-search">搜索</el-button>
        </div>
        <div class="right">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="openAddDialog">添加</el-button>
        </div>
      </div>

      <div class="table-container">
        <el-table
          :data="list"
          border
          stripe
          style="width: 100%">

          <el-table-column
            type="selection"
            width="48"
            align="center"
            >
          </el-table-column>

          <el-table-column
            label="经销商名称"
            prop="dealer.name">
          </el-table-column>

          <el-table-column
            label="商品编号"
            prop="product.no">
          </el-table-column>


          <el-table-column
            label="商品名称"
            prop="productName">
          </el-table-column>

          <el-table-column
            label="SKU"
            prop="propertyNames">
          </el-table-column>
          <el-table-column
            label="单位"
            prop="unit">
          </el-table-column>

          <el-table-column
            label="数量"
            prop="quantity">
            <template slot-scope="scope">
              <div>
                <span v-if="scope.row.isEdit">
                  <el-input-number v-model.number="scope.row.quantity" controls-position="right" :min="0"  size="small" ></el-input-number>
                </span>
                <span v-else>
                  {{ scope.row.quantity }}
                </span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="230" align="center">
            <template slot-scope="scope">
               <el-button
                v-if="scope.row.isEdit"
                size="mini"
                type="success"
                @click="handleSave(scope.$index, scope.row)">保存</el-button>
              <el-button
                size="mini"
                v-else
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
             
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
        <wechatExcellent-dealerstock-add
          ref="add"
          @getList="getList" >
        </wechatExcellent-dealerstock-add>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as api from '../../../api'
import wechatExcellentDealerstockAdd from './add'
export default {
  name: 'wechatExcellent-dealerStock-list',
  components: { wechatExcellentDealerstockAdd },
  data () {
    return {
      headers: {},
      pageSize: 10,
      currentPage: 1,
      total: 0,
      list: [],
      dealerName: '',
      productName: ''
    }
  },
  methods: {
    getList () {
      this.$http.post(api.dealerStockList, {
        page: this.currentPage,
        pageSize: this.pageSize,
        dealerName: this.dealerName,
        productName: this.productName
      }).then(res => {
        this.list = res.data.rows.map(x => {
          x.isEdit = false
          return x
        })
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
    handleEdit (index, row) {
      row.isEdit = true
    },
    handleSave (index, row) {
      this.$http.post(api.dealerStockEdit, row).then(res => {
        this.$notify({ title: '成功', message: '修改库存成功！', type: 'success' })
        this.getList()
        row.isEdit = false
      })
    },
    openAddDialog () {
      this.$refs.add.open()
    },
    search () {
      this.currentPage = 1
      this.total = 0
      this.getList()
    }
  },
  mounted () {
    this.getList()
    this.headers['access-token'] = this.$store.state.account.access_token
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
