<template>
  <div>
    <el-card>
      <div slot="header">
        <span>消息列表</span>
      </div>
      <div class="searchCon clearfix">

        <div>
        <el-input v-model="noticeTitle" placeholder="请输入消息标题"></el-input>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        </div>
        <div style="margin-top:10px">
        <el-button size="small" type="primary" icon="el-icon-plus" @click="openCreate">添加</el-button>
        </div>

      </div>
      <div class="table-container">
        <el-table
          :data="list"
          border
          style="width: 100%">

          <el-table-column
            type="selection"
            width="40">
          </el-table-column>


          <el-table-column
            label="消息标题"
            width="260"
            prop="noticeTitle">
          </el-table-column>

          <el-table-column
            label="消息摘要"
            width="260"
            prop="abstract">
          </el-table-column>

          <el-table-column
            label="消息类型"
            width="120"
            prop="type">
          </el-table-column>

          <el-table-column
            label="创建时间"
            align="center" width="240">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作">
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
        <notice-add
          ref="add"
          @getList="getList">
        </notice-add>

        <notice-edit
          ref="edit"
          @getList="getList">
        </notice-edit>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as api from '../../../api'
import noticeAdd from './add'
import noticeEdit from './edit'
export default {
  name: 'mall-notice-list',
  components: { noticeAdd, noticeEdit },
  data () {
    return {
      list: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      noticeTitle: ''
    }
  },
  methods: {
    getList () {
      this.$http.post(api.noticeList, {
        page: this.currentPage,
        pageSize: this.pageSize,
        noticeTitle: this.noticeTitle
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
      this.$refs.edit.open(row.id)
    },
    handleDelete (index, row) {
      this.$confirm('确定删除该消息吗？')
        .then(() => {
          this.$http.post(api.delNotice, { id: row.id }).then(res => {
            this.getList()
            this.$notify({ title: '成功', message: '删除成功！', type: 'success' })
          })
        })
        .catch(() => {})
    },
    openCreate () {
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
.el-card__body .searchCon{
  height:65px;
}
</style>
