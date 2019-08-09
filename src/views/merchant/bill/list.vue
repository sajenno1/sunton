<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%">

      <el-table-column
        label="商户名称"
        prop="nickName">
      </el-table-column>

      <el-table-column
        label="账单类型"
        prop="billType">
      </el-table-column>

      <el-table-column
        label="账单金额"
        prop="amount">
      </el-table-column>

      <el-table-column
        label="商户OpenId"
        prop="merchantOpenId">
      </el-table-column>

      <el-table-column
        label="创建时间"
        align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createDate | FormattersDateTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="hendledetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="page-container" v-if="total > pageSize">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="prev, pager, next, sizes, total"
        :total="total">
      </el-pagination>
    </div>

    <div>
      <el-dialog title="账单详情" :visible.sync="showDetail" width="40%">
        <div class="text item">{{'商户名称：' + billDetail.nickName}}</div>
        <div class="text item">{{'账单类型：' + billDetail.billType}}</div>
        <div class="text item">{{'账单金额：' + billDetail.amount}}</div>
        <div class="text item">{{'商户OpenId：' + billDetail.merchantOpenId}}</div>
        <div class="text item">创建时间：{{ billDetail.createDate | FormattersDateTime }}</div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="showDetali = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div class="page-container" v-if="total > pageSize">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="prev, pager, next, sizes, total"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'merchant-bill-list',
  data () {
    return {
      list: [],
      showDetail: false,
      billDetail: {},
      pageSize: 10,
      currentPage: 1,
      total: 0
    }
  },
  methods: {
    getList () {
      return this.$http.post(api.merchantBillList, {
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
    handleDetail (row) {
      this.$http.get(api.merchantBillInfo, { id: row.id }).then(res => {
        this.billDetail = res.data
        this.showDetail = true
      })
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
