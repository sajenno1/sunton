<template>
  <div>
    <el-card>
      <div class="headerCon clearfix" slot="header">
        <span>奖品列表</span>
        <el-button class="right" size="small" type="primary" icon="el-icon-plus" @click="openAddDialog">添加</el-button>
      </div>      
      
      <div class="table-container">
        <el-table
          :data="list"
          border
          style="width: 100%;">

          <el-table-column
            label="图片">
            <template slot-scope="scope">
              <img :src="scope.row.photo" style="max-width: 64px; max-height: 64px;"/>
            </template>
          </el-table-column>

          <el-table-column
            label="名称"
            prop="name">
          </el-table-column>

          <el-table-column
            label="奖品类型"
            prop="awardType">
          </el-table-column>

          <el-table-column
            label="数量"
            prop="count">
          </el-table-column>

          <el-table-column
            label="价格"
            prop="price">
          </el-table-column>

          <el-table-column
            label="积分"
            prop="integral">
          </el-table-column>

          <el-table-column
            label="派发数量"
            prop="dispatchCount">
          </el-table-column>

          <el-table-column label="操作" width="180">
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
        <add-award ref="add" @getList="getList"/>
        <edit-award ref="edit" @getList="getList"/>
      </div>

    </el-card>
  </div>
  
  
</template>

<script>
import * as api from '../../../api'
import addAward from './add'
import editAward from './edit'
export default {
  name: 'marketing-award-list',
  components: { addAward, editAward },
  data () {
    return {
      show: false,
      list: [],
      row: {},
      pageSize: 10,
      currentPage: 1,
      total: 0
    }
  },
  methods: {
    open (row) {
      this.row = row
      this.show = true
      this.pageSize = 10
      this.currentPage = 1
      this.total = 0
      this.list = []
      this.getList()
    },
    getList () {
      this.$http.post(api.awardList, {
        activityId: this.row.id,
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
      this.$refs.add.open(this.row)
    },
    handleEdit (index, row) {
      this.$refs.edit.open(row)
    },
    handleDelete (index, row) {
      this.$confirm('确定删除该奖品吗？')
        .then(() => {
          this.$http.post(api.delAward, { id: row.id }).then(res => {
            this.getList()
            this.$notify.success({ title: '成功', message: '删除成功' })
          })
        })
        .catch(() => {})
    }
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
