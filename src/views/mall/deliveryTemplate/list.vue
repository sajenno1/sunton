<template>
  <div>
    <el-card>
      <div class="headerCon clearfix" slot="header">
        <span>运费模板列表</span>
        <el-button class="right" size="small" type="primary" icon="el-icon-plus" @click="openAddDialog">添加</el-button>
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
            label="模板名称"
            prop="name">
          </el-table-column>

          <!-- <el-table-column
            label="模板备注"
            prop="remark">
          </el-table-column> -->

          <el-table-column
            label="计价方式">
            <template slot-scope="scope">
              <span>{{ scope.row.isQuantity ? '按件数' : '按重量' }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="首件(重)">
            <template slot-scope="scope">
              <span>{{ scope.row.isQuantity ? `${ scope.row.startQuantity }件` : `${ scope.row.startWeight }KG` }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="首费(元)"
            prop="startFees">
          </el-table-column>

          <el-table-column
            label="续件(重)">
            <template slot-scope="scope">
              <span>{{ scope.row.isQuantity ? `${ scope.row.startQuantity }件` : `${ scope.row.startWeight }KG` }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="续费(元)"
            prop="addFees">
          </el-table-column>

          <el-table-column
            label="默认"
            align="center" width="120">
            <template slot-scope="scope">
              <span>
                <i class="el-icon-success" style="color: #67c23a;" v-if="scope.row.isDefault"></i>
                <el-button type="text" @click="handleSetDefault(scope.$index, scope.row)" v-else>设为默认</el-button>
              </span>
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

    </el-card>

    <div>
      <add-delivery-template
        ref="add"
        @getList="getList"></add-delivery-template>

      <edit-delivery-template
        ref="edit"
        @getList="getList"></edit-delivery-template>
    </div>
  </div>
</template>

<script>
import * as api from '../../../api'
import addDeliveryTemplate from './add'
import editDeliveryTemplate from './edit'
export default {
  name: 'mall-deliveryTemplate-list',
  components: { addDeliveryTemplate, editDeliveryTemplate },
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
      this.$http.post(api.deliveryTemplateList, {
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
      this.$confirm('确定删除该运费模板吗？').then(() => {
        this.$http.post(api.delDeliveryTemplate, { id: row.id }).then(res => {
          this.getList()
          this.$notify({ title: '成功', message: '删除成功！', type: 'success' })
        })
      }).catch(() => {})
    },
    openAddDialog () {
      this.$refs.add.open()
    },
    handleSetDefault (index, row) {
      this.$confirm('确定设置成默认运费模板？').then(() => {
        this.$http.post(api.setDeliveryTemplateDefault, { id: row.id }).then(res => {
          this.list = this.list.map(x => {
            x.isDefault = false
            return x
          })
          row.isDefault = true
        })
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
