<template>
  <div>
    <el-card>
      <div class="headerCon clearfix" slot="header">
        <span>快递列表</span>
        <el-button class="right" size="small" type="primary" icon="el-icon-plus" @click="openAddDialog">添加</el-button>
      </div>
      <div class="searchCon clearfix">
        <el-input v-model="name" placeholder="请输入名称"></el-input>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
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
            label="图标">
            <template slot-scope="scope">
              <img :src="scope.row.photo" style="max-width: 64px; max-height: 64px;" />
            </template>
          </el-table-column>

          <el-table-column
            label="编号"
            prop="no">
          </el-table-column>

          <el-table-column
            label="名称"
            prop="name">
          </el-table-column>

          <el-table-column
            label="物流查询编码"
            prop="logisticsQueryCode">
          </el-table-column>

          <el-table-column
            label="排序"
            prop="sort">
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
        <add-express ref="add" @getList="getList"/>
        <edit-express ref="edit" @getList="getList" />
      </div>
    </el-card>
  </div>
</template>

<script>
import * as api from '../../../api'
import addExpress from './add'
import editExpress from './edit'
export default {
  name: 'basic-express-list',
  components: { addExpress, editExpress },
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
      this.$http.post(api.expressList, {
        name: this.name,
        page: this.currentPage,
        pageSize: this.pageSize
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
      this.$confirm('确定删除该快递数据吗？').then(res => {
        this.$http.post(api.delExpress, { id: row.id }).then(res => {
          this.$notify.success({ title: '成功', message: '删除成功' })
          this.getList()
        })
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
