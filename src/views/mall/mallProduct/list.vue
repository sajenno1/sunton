<template>
  <div>
    <el-card>
      <div slot="header">
        <span>产品列表</span>
      </div>
      <div class="searchCon clearfix">
        <el-input v-model="name" placeholder="请输入名称"></el-input>

        <el-input v-model="no" placeholder="请输入编号"></el-input>

        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>

        <el-button class="right" size="small" type="primary" icon="el-icon-plus" @click="openCreate">添加</el-button>

        <span style="display: inline-block; float: right;">
          <el-upload
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
            :headers="headers"
            :on-error="handleUploadError">
            <el-button size="small" type="primary">导入</el-button>
          </el-upload>
        </span>
      </div>
      <div class="table-container">
        <el-table
          :data="list"
          border
          style="width: 100%">

          <el-table-column
            type="selection"
            width="55">
          </el-table-column>

          <el-table-column
            label="图片">
            <template slot-scope="scope">
              <img v-if="scope.row.photo" :src="scope.row.photo" :alt="scope.row.name" style="max-width: 64px; max-height: 64px;">
            </template>
          </el-table-column>

          <el-table-column
            label="品牌"
            prop="brandName">
          </el-table-column>

          <el-table-column
            label="编号"
            prop="no">
          </el-table-column>

          <el-table-column
            label="名称"
            prop="name" width="160">
          </el-table-column>

          <el-table-column
            label="单位"
            prop="unit" width="60" align="center">
          </el-table-column>

          <el-table-column
            label="规格"
            prop="specification" align="center">
          </el-table-column>

          <el-table-column
            label="价格" align="center">
            <template slot-scope="scope">
              <div class="alignRight fontRed">
                <span>{{ scope.row.price | UnsignedCurrency }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="消费的积分" align="center">
            <template slot-scope="scope">
              <div class="alignRight">
                <span>{{ scope.row.customeIntegral }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="会员获得积分" align="center">
            <template slot-scope="scope">
              <div class="alignRight">
                <span>{{ scope.row.rewardIntegral }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="销售员获得积分" width="120" align="center">
            <template slot-scope="scope">
              <div class="alignRight">
                <span>{{ scope.row.sellRewardIntegral }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="防窜库存"
            prop="scanQuota" align="center">
          </el-table-column>

          <el-table-column
            label="创建时间"
            align="center" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="300" align="center">
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
        <product-add
          ref="add"
          @getList="getList">
        </product-add>

        <product-edit
          ref="edit"
          @getList="getList">
        </product-edit>

        <sku-list
          ref="sku"/>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as api from '../../../api'
import productAdd from './add'
import productEdit from './edit'
import skuList from './sku'
export default {
  name: 'mall-mallProduct-list',
  components: { productAdd, productEdit, skuList },
  data () {
    return {
      list: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      name: '',
      no: '',
      uploadUrl: this.$http.defaults.baseURL + api.importMallProducts,
      headers: {}
    }
  },
  methods: {
    getList () {
      this.$http.post(api.mallProductList, {
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
      this.$refs.edit.open(row.id)
    },
    handleDelete (index, row) {
      this.$confirm('确定删除该商品吗？')
        .then(() => {
          this.$http.post(api.delMallProduct, { id: row.id }).then(res => {
            this.getList()
            this.$notify({ title: '成功', message: '删除成功！', type: 'success' })
          })
        })
        .catch(() => {})
    },
    openCreate () {
      this.$refs.add.open()
    },
    handleSku (index, row) {
      this.$refs.sku.open(row)
    },
    handlePullOff (index, row) {
      this.$http.post(api.editMallProductStatus, {
        id: row.id,
        productStatus: 'PullOff'
      }).then(res => {
        this.$notify.success({ title: '成功', message: '下架成功' })
        row.productStatus = 'PullOff'
      })
    },
    handlePutOn (index, row) {
      this.$http.post(api.editMallProductStatus, {
        id: row.id,
        productStatus: 'PutOn'
      }).then(res => {
        this.$notify.success({ title: '成功', message: '上架成功' })
        row.productStatus = 'PutOn'
      })
    },
    handleUploadError (err, file) {
      this.$notify.error({ title: `错误码:${err.status}`, message: err.message })
    },
    handleUploadSuccess (res, file) {
      this.$notify.success({ title: '成功', message: '导入成功' })
      this.getList()
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
