<template>
  <div>
    <el-card>
      <div class="headerCon clearfix" slot="header">
        <span>活动列表</span>
        <el-button class="right" size="small" type="primary" icon="el-icon-plus" @click="openAddDialog">添加</el-button>
      </div>

      <div>
      </div>

      <div class="table-container">
        <el-table
          :data="list"
          border
          style="width: 100%;">

          <el-table-column
            label="名称"
            prop="name">
          </el-table-column>

          <el-table-column
            label="备注"
            prop="remark">
          </el-table-column>

           <el-table-column
            label="启用"
            align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.isActive">启用</el-tag>
            </template>
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
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                @click="handleAward(scope.$index, scope.row)">奖品</el-button>
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
        <add-activity ref="add" @getList="getList"/>
        <edit-activity ref="edit" @getList="getList"/>
        <award-list ref="awardList"/>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as api from '../../../api'
import addActivity from './add'
import editActivity from './edit'
import awardList from '../award/list'
export default {
  name: 'marketing-activity-list',
  components: { addActivity, editActivity, awardList },
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
      this.$http.post(api.activityList, {
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
      this.$confirm('确定删除该活动?').then(() => {
        this.$http.post(api.delActivity, { id: row.id }).then(res => {
          this.getList()
          this.$notify.success({ title: '成功', message: '删除成功' })
        })
      }).catch(() => {})
    },
    openAddDialog () {
      this.$refs.add.open()
    },
    handleAward (index, row) {
      this.$refs.awardList.open(row)
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
