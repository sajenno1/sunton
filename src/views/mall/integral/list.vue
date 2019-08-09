<template>
  <div>
    <el-card>
      <div slot="header">
        <span>积分列表</span>
      </div>
      <div class="searchCon clearfix">
        <el-button class="right" size="small" type="primary" icon="el-icon-plus" @click="openCreate">添加</el-button>
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
            label="兑换金额"
            prop="money" align="center">
          </el-table-column>

          <el-table-column
            label="积分"
            prop="integration" align="center">
          </el-table-column>

          <el-table-column
            label="库存"
            prop="inventory" align="center">
          </el-table-column>

          <el-table-column
            label="积分兑换情况"
             align="center">
              <template slot-scope="scope">
              <div class="alignRight">
                <span>{{ scope.row.integrationStatus === 'ExchangeIng' ? '兑换中' : '已换完' }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="创建时间"
            align="center" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="300" align="center">
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
                type="warning"
                @click="handlePullOff(scope.$index, scope.row)"
                v-if="scope.row.integralStatus=== 'ExchangeOn'">关闭</el-button>
              <el-button
                size="mini"
                type="success"
                @click="handlePutOn(scope.$index, scope.row)"
                v-else>开启</el-button>
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
        <integral-add
          ref="add"
          @getList="getList">
        </integral-add>

        <integral-edit
          ref="edit"
          @getList="getList">
        </integral-edit>
      </div>
  </div>
</template>

<script>
import * as api from '../../../api'
import integralAdd from './add'
import integralEdit from './edit'
export default {
  name: 'mall-integral-list',
  components: { integralAdd, integralEdit },
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
      this.$http.post(api.integralList, {
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
    handleEdit (index, row) {
      this.$refs.edit.open(row.id)
    },
    handleDelete (index, row) {
      this.$confirm('确定删除该积分设置吗？')
        .then(() => {
          this.$http.post(api.delIntegral, { id: row.id }).then(res => {
            this.getList()
            this.$notify({ title: '成功', message: '删除成功！', type: 'success' })
          })
        })
        .catch(() => {})
    },
    openCreate () {
      this.$refs.add.open()
    },
    handlePullOff (index, row) {
      this.$http.post(api.editIntegralStatus, {
        id: row.id,
        integralStatus: 'ExchangeOff'
      }).then(res => {
        this.$notify.success({ title: '成功', message: '关闭成功' })
        row.integralStatus = 'ExchangeOff'
      })
    },
    handlePutOn (index, row) {
      this.$http.post(api.editIntegralStatus, {
        id: row.id,
        integralStatus: 'ExchangeOn'
      }).then(res => {
        this.$notify.success({ title: '成功', message: '开启成功' })
        row.integralStatus = 'ExchangeOn'
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
