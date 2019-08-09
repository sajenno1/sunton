<template>
  <div>
    <el-card>
      <div class="headerCon clearfix" slot="header">
        <span>产品属性</span>
        <el-button class="right" size="small" type="primary" icon="el-icon-plus" @click="openAddDialog">添加</el-button>
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
            label="名称"
            prop="name">
          </el-table-column>

          <el-table-column
            label="是否为销售属性" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.isSaleProp ? '是' : '否' }}</span>
            </template>
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

          <el-table-column label="操作" width="280" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleValue(scope.$index, scope.row)">属性值</el-button>
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
    </el-card>

    <div>
      <add-product-property
        ref="add"
        @getList="getList"/>

      <edit-product-property
        ref="edit"
        @getList="getList"/>

      <product-property-value
        ref="list"/>
    </div>
  </div>
</template>

<script>
import * as api from '../../../api'
import addProductProperty from './add'
import editProductProperty from './edit'
import productPropertyValue from '../mallProductPropertyValue/list'
export default {
  name: 'mall-mallProductProperty-list',
  components: { addProductProperty, editProductProperty, productPropertyValue },
  data () {
    return {
      list: [],
      pageSize: 10,
      currentPage: 1,
      total: 0
    }
  },
  methods: {
    getList () {
      this.$http.post(api.mallProductPropertyList, {
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
    openAddDialog () {
      this.$refs.add.open()
    },
    handleEdit (index, row) {
      this.$refs.edit.open(row)
    },
    handleDelete (index, row) {
      this.$confirm('删除该属性值将清空该产品属性下的属性值，确定删除吗？').then(() => {
        this.$http.post(api.delMallProductProperty, { id: row.id }).then(res => {
          this.getList()
          this.$notify({ title: '成功', message: '删除成功', type: 'success' })
        })
      }).catch(() => {})
    },
    handleValue (index, row) {
      this.$refs.list.open(row)
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
