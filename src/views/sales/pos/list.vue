<template>
  <div>
    <el-card>
      <div slot="header">
        <span>销售点</span>
      </div>

      <div class="searchCon clearfix">
        <div class="left">

          <el-input v-model="name" size="small" placeholder="请输入名称"></el-input>

          <el-input v-model="tel" size="small" placeholder="请输入手机号码"></el-input>

          <el-input v-model="areaMangerName" size="small" placeholder="请输入区域负责人姓名"></el-input>

          <el-button type="primary" size="small" @click="search" icon="el-icon-search">搜索</el-button>
        </div>
        <div class="right">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="openAddDialog">添加</el-button>
        </div>
      </div>

      <div class="table-container">
        <el-table
          :data="list"
          border
          style="width: 100%">

          <el-table-column
            type="selection"
            width="48"
            align="center"
            >
          </el-table-column>

          <el-table-column
            label="名称"
            prop="name">
          </el-table-column>

          <el-table-column
            label="简称"
            prop="shortName">
          </el-table-column>

          <el-table-column
            label="联系电话"
            prop="tel">
          </el-table-column>

          <el-table-column
            label="详细地址"
            prop="location">
          </el-table-column>

          <el-table-column
            label="禁止补货" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.disableReplenish ? '是' : '否' }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="所在区域"
            prop="areaName">
          </el-table-column>

          <el-table-column
            label="区域负责人"
            prop="areaMangerName">
          </el-table-column>

          <el-table-column
            label="创建时间"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="230" align="center">
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
        <pos-add
          ref="add"
          @getList="getList" >
        </pos-add>

        <pos-edit
          ref="edit"
          @getList="getList"
          v-if="show"
          @close="close">
        </pos-edit>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as api from '../../../api'
import posAdd from './add'
import posEdit from './Edit'
export default {
  name: 'sales-pos-list',
  components: { posAdd, posEdit },
  data () {
    return {
      pageSize: 10,
      currentPage: 1,
      total: 0,
      list: [],
      show: true,
      name: '',
      tel: '',
      areaMangerName: ''
    }
  },
  methods: {
    getList () {
      this.$http.post(api.posList, {
        page: this.currentPage,
        pageSize: this.pageSize,
        name: this.name,
        tel: this.tel,
        areaMangerName: this.areaMangerName
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
      this.show = true
      setTimeout(() => {
        this.$refs.edit.open(row.id)
      }, 500)
    },
    handleDelete (index, row) {
      this.$confirm('确定删除该销售点吗？')
        .then(() => {
          this.$http.post(api.delPOS, { id: row.id }).then(res => {
            this.getList()
            this.$notify({ title: '成功', message: '删除成功！', type: 'success' })
          })
        })
        .catch(() => {})
    },
    openAddDialog () {
      this.$refs.add.open()
    },
    close () {
      this.show = false
    },
    handleUploadError (err, file) {
      this.$notify.error({ title: `错误码:${err.status}`, message: err.message })
    },
    search () {
      this.currentPage = 1
      this.total = 0
      this.getList()
    },
    judge () {
      return this.list.disableReplenish ? '是' : '否'
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
