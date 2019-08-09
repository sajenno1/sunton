<template>
  <div>
    <el-card>
      <div class="headerCon clearfix" slot="header">
        <span>产品属性类别</span>
        <el-button class="right" size="small" type="primary" icon="el-icon-plus" @click="openAddDialog">添加</el-button>
      </div>
      <div class="table-container">
        <el-table
          :data="list"
          border
          style="width: 100%">

          <el-table-column
            type="selection"
            
            align="center">
          </el-table-column>

          <el-table-column
            label="名称"
            prop="name">
          </el-table-column>

          <el-table-column
            label="创建时间"
            align="center" width="380">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="280" align="center">
            <template slot-scope="scope">
              <!--<el-button
                size="mini"
                @click="handleValues(scope.$index, scope.row)">关联属性值</el-button>-->
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
      <add-product-property-category
        ref="add"
        @getList="getList"/>

      <edit-product-property-category
        ref="edit"
        @getList="getList"/>

      <property-values
        ref="values"/>
    </div>
  </div>
</template>

<script>
import * as api from '../../../api'
import addProductPropertyCategory from './add'
import editProductPropertyCategory from './edit'
import propertyValues from './values'
export default {
  name: 'products-productPropertyCategory-list',
  components: { addProductPropertyCategory, editProductPropertyCategory, propertyValues },
  data () {
    return {
      list: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      flag: 'category'
    }
  },
  methods: {
    getList () {
      this.$http.post(api.productPropertyCategoryList, {
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
      this.$refs.add.open(this.flag)
    },
    handleEdit (index, row) {
      this.$refs.edit.open(row)
    },
    handleDelete (index, row) {
      this.$confirm('确定删除该产品属性分类和关联的属性值吗？')
        .then(() => {
          this.$http.post(api.cancleCreatePropertyCategory, { id: row.id }).then(res => {
            this.getList()
            this.$notify({ title: '成功', message: '删除成功', type: 'success' })
          })
        })
        .catch(() => {})
    },
    handleValues (index, row) {
      this.$refs.values.open(row)
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
