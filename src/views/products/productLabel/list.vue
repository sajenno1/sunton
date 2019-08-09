<template>
  <div>
    <el-card>
      <div slot="header">
        <span>产品标签列表</span>
      </div>
      <div class="searchCon clearfix">
        <el-input v-model="name" placeholder="请输入名称"></el-input>

        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>

        <el-button class="right" size="small" type="primary" icon="el-icon-plus" @click="openCreate">添加</el-button>
      </div>
      <div class="table-container">
        <el-table
          :data="list"
          border
          style="width: 100%">

          <el-table-column
            type="selection"
            width="55"
            align="center">
          </el-table-column>

          <el-table-column
            label="名称"
            prop="labelText">
          </el-table-column>

          <el-table-column
            label="sign"
            prop="specialId">
          </el-table-column>
          
          <el-table-column
            label="是否推荐到首页"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.isPropelling? '是' : '否'}}</span>
            </template>
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
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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

      <div>
        <productLabel-add
          ref="add"
          @getList="getList">
        </productLabel-add>

        <productLabel-edit
          ref="edit"
          @getList="getList">
        </productLabel-edit>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as api from '../../../api'
import productLabelAdd from './add'
import productLabelEdit from './edit'
export default {
  name: 'products-productLabel-list',
  components: { productLabelAdd, productLabelEdit },
  data () {
    return {
      list: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      name: ''
    }
  },
  methods: {
    getList () {
      this.$http.post(api.productLabelList, {
        page: this.currentPage,
        pageSize: this.pageSize,
        name: this.name
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
      this.$confirm('确定删除该标签吗？')
        .then(() => {
          this.$http.post(api.delProductLabel, { id: row.id }).then(res => {
            this.getList()
            this.$notify({ title: '成功', message: '删除成功！', type: 'success' })
          })
        })
        .catch(() => {})
    },
    openCreate () {
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
