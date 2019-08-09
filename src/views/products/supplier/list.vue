<template>
  <div>
    <el-card>
      <div slot="header">
        <span>供应商列表</span>
      </div>
      <div class="searchCon clearfix">
        <el-input v-model="name" placeholder="请输入名称"></el-input>
        <el-input v-model="phone" placeholder="请输入联系电话"></el-input>

        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>

        <el-button class="right" size="small" type="primary" icon="el-icon-plus" @click="openCreate">添加</el-button>
        
      </div>
      <div class="table-container">
        <el-table
          :data="list"
          border
          style="width: 100%">

          <el-table-column
            label="名称"
            prop="name">
          </el-table-column>

          <el-table-column
            label="创建时间"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="电话"
            prop="phone">
          </el-table-column>

          <el-table-column
            label="地址"
            prop="address">
          </el-table-column>

          <el-table-column
            label="说明"
            prop="memo">
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
        <supplier-add
          ref="add"
          @getList="getList">
        </supplier-add>

        <supplier-edit
          ref="edit"
          @getList="getList">
        </supplier-edit>

      </div>
    </el-card>
  </div>
</template>

<script>
import * as api from '../../../api'
import supplierAdd from './add'
import supplierEdit from './edit'

export default {
  name: 'products-supplier-list',
  components: { supplierAdd, supplierEdit },
  data () {
    return {
      list: [],
      pageSize: 20,
      currentPage: 1,
      total: 0,
      name: '',
      phone: '',
      testData: { name: 'zain', success: true }
    }
  },
  methods: {
    openSupplier () {
      this.$refs.newSupplier.open()
    },
    openNewForm () {
      this.$refs.newFormww.open()
      // this.$refs.newSupplier.open()
    },
    getList () {
      this.$http.post(api.supplierList, {
        page: this.currentPage,
        pageSize: this.pageSize,
        name: this.name,
        phone: this.phone
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
      this.$confirm('确定删除该供应商吗？')
        .then(() => {
          this.$http.post(api.delSupplier, { id: row.id }).then(res => {
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
