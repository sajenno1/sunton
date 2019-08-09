<template>
  <div>
    <el-card>
      <div slot="header">
        <span>销售会员</span>
      </div>

      <div class="searchCon clearfix">
        <div class="left">

          <el-input v-model="sellerName" size="small" placeholder="请输入名称"></el-input>

          <el-input v-model="sellerMobile" size="small" placeholder="请输入手机号码"></el-input>

          <el-button type="primary" size="small" @click="search" icon="el-icon-search">搜索</el-button>
        </div>
      </div>

      <div class="table-container">
          <el-table
          :data="list"
          border
          style="width: 100%">

          <el-table-column
            label="销售会员名"
            prop="sellerName">
          </el-table-column>

          <el-table-column
            label="手机号"
            prop="sellerMobile" align="center">
          </el-table-column>

          <el-table-column
            label="性别"
            prop="sellerSex" align="center">
          </el-table-column>

          <el-table-column
            label="销售点"
            prop="posName" align="center">
          </el-table-column>

          <el-table-column
            label="状态"
            prop="status">
          </el-table-column>

          <el-table-column
            label="级别"
            prop="level" align="center">
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
                :type="scope.row.status === '已审核' ? 'info' : 'success'"
                @click="handleUpdateStatus(scope.$index, scope.row)">{{ scope.row.status === '已审核' ? '冻结' : '启用' }}</el-button>
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
        <posSeller-edit
          ref="edit"
          @getList="getList">
        </posSeller-edit>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as api from '../../../api'
import posSellerEdit from './edit'
export default {
  name: 'posSeller-list',
  components: {posSellerEdit},
  data () {
    return {
      pageSize: 10,
      currentPage: 1,
      total: 0,
      list: [],
      headers: {},
      sellerName: '',
      sellerMobile: ''
    }
  },
  methods: {
    getList () {
      this.$http.post(api.possellerList, {
        page: this.currentPage,
        pageSize: this.pageSize,
        sellerName: this.sellerName,
        sellerMobile: this.sellerMobile
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
    close () {
      this.show = false
    },
    handleUpdateStatus (index, row) {
      this.$http.post(api.updateStatusPOSSeller, {
        id: row.id,
        status: row.status === 'Approved' ? 'Freeze' : 'Approved'
      }).then(res => {
        this.$notify.success({ title: '成功', message: row.status === 'Approved' ? '冻结成功' : '启动成功' })
        row.status = row.status === 'Approved' ? 'Freeze' : 'Approved'
      })
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
</style>
