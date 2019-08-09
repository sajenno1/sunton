<template>
  <div>
    <el-card>
      <div slot="header">
        <span>退货列表</span>
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
            label="编号"
            prop="no">
          </el-table-column>

          <el-table-column
            label="外部编号"
            prop="outerNo">
          </el-table-column>

          <el-table-column
            label="经销商"
            prop="parentDealerName">
          </el-table-column>

          <el-table-column
            label="仓库"
            prop="warehouseName">
          </el-table-column>

          <el-table-column
            label="PDA"
            prop="pDAAccountName">
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
                @click="handleDetail(scope.$index, scope.row)">详情</el-button>
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
      <antiChannelConflict-productReturn-detail
        ref="detail">
      </antiChannelConflict-productReturn-detail>
    </div>

  </div>
</template>

<script>
import * as api from '../../../api'
import antiChannelConflictProductReturnDetail from './detail'
export default {
  name: 'antiChannelConflict-productReturn-list',
  components: { antiChannelConflictProductReturnDetail },
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
      this.$http.post(api.productReturnList, {
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
    handleDetail (index, row) {
      this.$refs.detail.open(row)
    },
    handleDelete (index, row) {
      this.$confirm('确定删除退货单吗？')
        .then(() => {
          this.$http.post(api.delProductReturn, { id: row.id }).then(res => {
            this.getList()
            this.$notify({ title: '成功', message: '删除成功！', type: 'success' })
          })
        })
        .catch(() => {})
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
