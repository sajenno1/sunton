<template>
  <div>
    <el-card>
      <div slot="header">
        <span>商品列表</span>
      </div>
      <div>
        <el-input v-model="name" style="width: 200px;" placeholder="请输入名称"></el-input>

        <el-input v-model="no" style="width: 200px;" placeholder="请输入编号"></el-input>

        <el-button type="primary" icon="el-icon-search" @click="getList">搜索</el-button>

        <el-button type="primary" icon="el-icon-plus" @click="openAddDialog">添加</el-button>
      </div>
      <div class="table-container">
        <el-table
          :data="list"
          border
          style="width: 100%">

          <el-table-column
            label="图片">
            <template slot-scope="scope">
              <img v-if="scope.row.product.photo" :src="scope.row.product.photo" :alt="scope.row.product.name">
            </template>
          </el-table-column>

          <el-table-column
            label="品牌"
            prop="product.brandName">
          </el-table-column>

          <el-table-column
            label="编号"
            prop="product.no">
          </el-table-column>

          <el-table-column
            label="名称"
            prop="product.name">
          </el-table-column>

          <el-table-column
            label="单位"
            prop="product.unit">
          </el-table-column>

          <el-table-column
            label="规格"
            prop="product.specification">
          </el-table-column>

          <el-table-column
            label="价格"
            prop="price">
          </el-table-column>

          <!-- <el-table-column
            label="消费的积分"
            prop="customeIntegral">
          </el-table-column>

          <el-table-column
            label="会员获得积分"
            prop="rewardIntegral">
          </el-table-column>

          <el-table-column
            label="销售员获得积分"
            prop="sellRewardIntegral">
          </el-table-column> -->

          <el-table-column
            label="创建时间"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleSku(scope.$index, scope.row)">Sku</el-button>
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <el-button
                size="mini"
                type="warning"
                @click="handlePullOff(scope.$index, scope.row)"
                v-if="scope.row.productStatus === 'PutOn'">下架</el-button>
              <el-button
                size="mini"
                type="success"
                @click="handlePutOn(scope.$index, scope.row)"
                v-else>上架</el-button>
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
        <add-replenish-product ref="add" @getList="getList"/>
        <edit-replenish-product ref="edit" @getList="getList"/>
        <replenish-product-sku-list ref="sku"/>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as api from '../../../api'
import addReplenishProduct from './add'
import editReplenishProduct from './edit'
import replenishProductSkuList from './sku'
export default {
  name: 'replenishment-product-list',
  components: { addReplenishProduct, editReplenishProduct, replenishProductSkuList },
  data () {
    return {
      list: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      name: '',
      no: ''
    }
  },
  methods: {
    getList () {
      this.$http.post(api.replenishProductList, {
        page: this.currentPage,
        pageSize: this.pageSize,
        name: this.name,
        no: this.no
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
    handleEdit (index, row) {
      this.$refs.edit.open(row)
    },
    handleDelete (index, row) {
      this.$confirm('确定删除该商品吗？')
        .then(() => {
          this.$http.post(api.delReplenishProduct, { id: row.id }).then(res => {
            this.getList()
            this.$notify({ title: '成功', message: '删除成功！', type: 'success' })
          })
        })
        .catch(() => {})
    },
    openAddDialog () {
      this.$refs.add.open()
    },
    handleSku (index, row) {
      this.$refs.sku.open(row)
    },
    handlePullOff (index, row) {
      this.$http.post(api.editReplenishProductStatus, {
        id: row.id,
        productStatus: 'PullOff'
      }).then(res => {
        this.$notify.success({ title: '成功', message: '下架成功' })
        row.productStatus = 'PullOff'
      })
    },
    handlePutOn (index, row) {
      this.$http.post(api.editReplenishProductStatus, {
        id: row.id,
        productStatus: 'PutOn'
      }).then(res => {
        this.$notify.success({ title: '成功', message: '上架成功' })
        row.productStatus = 'PutOn'
      })
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
