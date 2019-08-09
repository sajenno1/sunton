<template>
  <div>
    <el-card>
      <div slot="header">
        <span>消息类型列表</span>
      </div>
      <div class="searchCon clearfix">

        <div>
        <el-input v-model="type" placeholder="请输入消息类型"></el-input>
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
            width="55">
          </el-table-column>


          <el-table-column
            label="消息类型"
            prop="type">
          </el-table-column>

          <el-table-column
            label="创建时间"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作"  align="center">
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
        <noticeType-add
          ref="add"
          @getList="getList">
        </noticeType-add>

        <noticeType-edit
          ref="edit"
          @getList="getList">
        </noticeType-edit>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as api from '../../../api'
import noticeTypeAdd from './add'
import noticeTypeEdit from './edit'
export default {
  name: 'mall-notice-list',
  components: { noticeTypeAdd, noticeTypeEdit },
  data () {
    return {
      list: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      type: ''
    }
  },
  methods: {
    getList () {
      this.$http.post(api.noticeTypeList, {
        page: this.currentPage,
        pageSize: this.pageSize,
        type: this.type
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
      this.$confirm('确定删除该消息分类吗？')
        .then(() => {
          this.$http.post(api.delNoticeType, { id: row.id }).then(res => {
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
