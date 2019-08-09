<template>
  <div>
    <el-dialog title="资源升级列表" :visible.sync="show">
      <div>
        <el-button size="small"  style="margin: 0 20px 10px; float: right;" type="primary" icon="el-icon-plus" @click="openAddDialog">添加</el-button>
      </div>

      <div class="table-container">
        <el-table
          :data="list"
          border
          style="width: 100%">

          <el-table-column
            label="资源代码"
            prop="resourceKey">
          </el-table-column>

          <el-table-column
            label="版本号"
            prop="version">
          </el-table-column>

          <el-table-column
            label="整型版本号"
            prop="intVersion">
          </el-table-column>

          <el-table-column
            label="更新说明"
            prop="updateDescription">
          </el-table-column>

          <el-table-column
            label="完整更新">
            <template slot-scope="scope">
              <span>{{ scope.row.fullUpdate ? '是' : '否' }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="创建时间"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" width="180">
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
        <add-update ref="add" @getList="getList"/>
        <edit-update ref="edit" @getList="getList"/>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
import addUpdate from './addUpdate'
import editUpdate from './editUpdate'
export default {
  name: 'updater-resource-updateList',
  components: { addUpdate, editUpdate },
  data () {
    return {
      list: [],
      row: {},
      show: false,
      pageSize: 10,
      currentPage: 1,
      total: 0
    }
  },
  methods: {
    open (row) {
      this.init()
      this.row = row
      this.getList()
      this.show = true
    },
    init () {
      this.list = []
      this.row = {}
      this.pageSize = 10
      this.currentPage = 1
      this.total = 0
    },
    getList () {
      this.$http.post(api.resourceUpdateList, { resourceId: this.row.id }).then(res => {
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
      this.$confirm('确定删除该资源吗？')
        .then(() => {
          this.$http.post(api.delResourceUpdate, { id: row.id }).then(res => {
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
.el-table .cell {
  text-align: center;
}
</style>
