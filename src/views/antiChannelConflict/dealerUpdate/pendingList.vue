<template>
  <div>
    <el-card>
      <div slot="header">
        <span>经销商升级管理</span>
      </div>

      <div></div>

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
            label="真实姓名"
            prop="dealer.realName">
          </el-table-column>

          <el-table-column
            label="手机号"
            prop="dealer.mobile"
            align="center">
          </el-table-column>

          <el-table-column
            label="证件类型"
            prop="dealer.documentType">
          </el-table-column>

          <el-table-column
            label="证件号码"
            prop="dealer.identificationNumber">
          </el-table-column>

          <el-table-column
            label="通讯地址"
            prop="dealer.areaName">
          </el-table-column>

          <el-table-column
            label="详细地址"
            prop="dealer.address">
          </el-table-column>

          <el-table-column
            label="状态"
            prop="dealer.status">
          </el-table-column>

          <el-table-column
            label="当前级别"
            prop="dealer.titleLevel"
            align="center">
          </el-table-column>

          <el-table-column
            label="申请级别"
            prop="titleLevel"
            align="center">
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
                @click="handleApproved(scope.$index, scope.row)">通过</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleReject(scope.$index, scope.row)">拒绝</el-button>
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
      <reject-dealer-update
        ref="reject"
        @getList="getList"
      />
    </div>
  </div>
</template>

<script>
import * as api from '@/api'
import rejectDealerUpdate from './reject'
export default {
  name: 'antiChannelConflict-dealerUpdate-pendingList',
  components: { rejectDealerUpdate },
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
      this.$http.post(api.dealerUpdatePendingList, {
        page: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        this.list = res.data.rows
        this.total = res.data.total
      })
    },
    handleApproved (index, row) {
      this.$http.post(api.approvedDealerUpdate, { id: row.id }).then(res => {
        this.getList()
        this.$notify.success({ title: '成功', message: '保存成功' })
      })
    },
    handleReject (index, row) {
      this.$refs.reject.open(row.id)
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
