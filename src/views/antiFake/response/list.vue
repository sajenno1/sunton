<template>
  <div>
    <el-card>
      <div slot="header">
        <span>防伪回复列表</span>
      </div>
      <div class="searchCon clearfix">
        <div class="right">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="openAddDialog">添加</el-button>
        </div>
      </div>
      <!-- <div class="searchCon clearfix">
        <el-input v-model="areaName" size="small" placeholder="请输入地区名称"></el-input>

        <el-button type="primary" size="small" icon="el-icon-search" @click="search">搜索</el-button>
      </div> -->
      <div class="table-container">
        <el-table
          :data="list"
          border
          style="width: 100%">

          <el-table-column
            type="selection"
            align="center"
            width="55">
          </el-table-column>

          <el-table-column
            label="正品回复"
            prop="genuineMessage">
          </el-table-column>

          <el-table-column
            label="假冒回复"
            prop="fakeMessage">
          </el-table-column>

          <el-table-column
            label="默认回复"
            align="center"
            width="100">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.isDefault">默认</el-tag>
            </template>
          </el-table-column>

          <el-table-column
            label="销毁"
            align="center"
            width="100">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.isDestroy" type="danger">销毁</el-tag>
            </template>
          </el-table-column>

          <el-table-column
            label="关联发行记录"
            align="center"
            prop="issueRecordCount"
            width="110">
          </el-table-column>

          <el-table-column
            label="创建时间"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column 
            label="操作" 
            width="180"
            align="center">
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
      <add-response
        ref="add"
        @getList="getList"></add-response>
      <edit-response
        ref="edit"
        @getList="getList"></edit-response>
    </div>
  </div>
</template>

<script>
import * as api from '../../../api'
import addResponse from './add'
import editResponse from './edit'
export default {
  name: 'antiFake-response-list',
  components: { addResponse, editResponse },
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
      this.$http
        .post(api.antiFakeResponseList, {
          page: this.currentPage,
          pageSize: this.pageSize
        })
        .then(res => {
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
      this.$confirm('确定删除该防伪回复吗？')
        .then(() => {
          this.$http.post(api.delAntiFakeResponse, { id: row.id }).then(res => {
            this.$notify.success({ title: '成功', message: '删除成功' })
            this.getList(this.selectedArea, 1)
          })
        })
        .catch(() => {})
    },
    search () {
      this.currentPage = 1
      this.total = 0
      this.getList()
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
