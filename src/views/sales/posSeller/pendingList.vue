<template>
  <div>
    <el-card>
      <div slot="header">
        <span>待审核销售会员</span>
      </div>

      <div class="searchCon clearfix">
        <div class="left">

          <el-input v-model="sellerName" size="small" placeholder="请输入名称"></el-input>

          <el-input v-model="sellerMobile" size="small" placeholder="请输入手机号码"></el-input>

          <el-select v-model="level" clearable placeholder="请选择级别" size="small">
            <el-option label="普通" value="普通"></el-option>
            <el-option label="高级" value="高级"></el-option>
          </el-select>

          <el-button type="primary" icon="el-icon-search" @click="search" size="small">搜索</el-button>
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
            label="驳回原因"
            prop="rejectReason">
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

          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.status === '申请中'">
                <el-button
                  size="mini"
                  @click="handleApproved(scope.$index, scope.row)">通过</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleFreeze(scope.$index, scope.row)">驳回</el-button>
              </div>
              <div v-else>
                <span>已驳回</span>
              </div>
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
        <posSeller-editReason
          ref="editReason"
          @getList="getList">
        </posSeller-editReason>
      </div>
    </el-card>

  </div>
</template>

<script>
import * as api from '../../../api'
import posSellerEditReason from './editReason'
export default {
  name: 'sales-posSeller-pendingList',
  components: {posSellerEditReason},
  data () {
    return {
      list: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      level: '',
      sellerMobile: '',
      sellerName: ''
    }
  },
  methods: {
    getList () {
      this.$http.post(api.possellerPendingList, {
        page: this.currentPage,
        pageSize: this.pageSize,
        sellerName: this.sellerName,
        sellerMobile: this.sellerMobile,
        level: this.level
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
    handleApproved (index, row) {
      this.$http.post(api.auditingPOSSeller, {
        id: row.id,
        status: true,
        rejectReason: ''
      }).then(res => {
        this.$notify.success({ title: '成功', message: '审核成功' })
        this.getList()
      })
    },
    handleFreeze (index, row) {
      this.$refs.editReason.open(row.id)
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
