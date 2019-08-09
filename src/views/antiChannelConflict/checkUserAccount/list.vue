<template>
  <div>
    <el-card>
      <div class="headerCon clearfix" slot="header">
        <span>稽查员列表</span>
        <el-button class="right" type="primary" icon="el-icon-edit" size="small" @click="openAddDialog">添加</el-button>
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
            label="用户名"
            prop="userName">
          </el-table-column>

          <el-table-column
            label="昵称"
            prop="displayName">
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
      <checkUserAccountAdd
        ref="add"
        @getList="getList">
      </checkUserAccountAdd>

      <checkUserAccountEdit
        ref="edit"
        @getList="getList">
      </checkUserAccountEdit>
    </div>

  </div>
</template>

<script>
import * as api from '../../../api'
import checkUserAccountAdd from './add'
import checkUserAccountEdit from './edit'
export default {
  name: 'antiChannelConflict-CheckUserAccount-list',
  components: { checkUserAccountAdd, checkUserAccountEdit },
  data () {
    return {
      pageSize: 10,
      currentPage: 1,
      total: 0,
      list: []
    }
  },
  methods: {
    getList () {
      this.$http.post(api.checkUserAccountList, {
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
    toggleStatus (row) {
      this.$confirm(row.isEnable ? '确定禁用该账号吗？' : '确定启用该账号吗？')
        .then(() => {
          row.isEnable = !row.isEnable
          this.$http.post(api.editPDAAccount, row)
        })
        .catch(() => {})
    },
    handleEdit (index, row) {
      this.$refs.edit.open(row)
    },
    handleDelete (index, row) {
      this.$confirm('确定删除该账号吗？')
        .then(() => {
          this.$http.post(api.delCheckUserAccount, { id: row.id }).then(res => {
            this.getList()
            this.$notify({ title: '成功', message: '删除成功！', type: 'success' })
          })
        })
        .catch(() => {})
    },
    openAddDialog () {
      this.$refs.add.open()
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
