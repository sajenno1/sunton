<template>
  <div>
    <el-card>
      <div slot="header">
        <span>短信日志</span>
      </div>
      <div>
        <!-- <el-button type="primary" icon="el-icon-edit" @click="openAddDialog">添加</el-button> -->
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
            label="UserId"
            prop="userId">
          </el-table-column>

          <el-table-column
            label="Mobile"
            prop="mobile">
          </el-table-column>

          <el-table-column
            label="Code"
            prop="code">
          </el-table-column>

          <el-table-column
            label="Success"
            prop="success">
          </el-table-column>

          <el-table-column
            label="ErrMessage"
            prop="errMessage">
          </el-table-column>

          <el-table-column
            label="Content"
            prop="content">
          </el-table-column>

          <el-table-column
            label="创建时间"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <!-- <el-table-column label="操作" width="280">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="showTemplate(scope.$index, scope.row)">模板</el-button>
            </template>
          </el-table-column> -->
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
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'system-sms-logList',
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
      this.$http.post(api.smsLogList, {
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
