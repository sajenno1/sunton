<template>
    <el-card>
      <div slot="header">
        <span>防伪码</span>
      </div>
      <div>
        <div>
          <el-input v-model="code" style="width: 200px; margin: 0px 0 20px 5px;" size="small" placeholder="请输入发行码"></el-input>

          <el-date-picker
            size="small"
            v-model="dateTime"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>

          <el-button type="primary" icon="el-icon-search" size="small" @click="search">搜索</el-button>
        </div>
      </div>
      <div class="table-container">
        <el-table
          :data="list"
          border
          style="width: 100%">

          <el-table-column
            type="selection"
            width="48" align="center">
          </el-table-column>

          <el-table-column
            label="发行代码"
            prop="code">
          </el-table-column>

          <el-table-column
            label="安全码"
            prop="securityCode">
          </el-table-column>

          <el-table-column
            label="查询次数"
            prop="queryCount">
          </el-table-column>

          <el-table-column
            label="安全码查询成功次数"
            prop="scSuccessCount">
          </el-table-column>

          <el-table-column
            label="安全码查询失败次数"
            prop="scFailCount">
          </el-table-column>

          <el-table-column
            label="最后查询时间"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.lastQueryDateTime | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="创建时间"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <!-- <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleDetail(scope.$index, scope.row)">详情</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column> -->
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
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'antiFake-code-list',
  data () {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      list: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      code: '',
      dateTime: [ null, null ]
    }
  },
  methods: {

    getList () {
      this.$http.post(api.antiFakeCodeList, {
        page: this.currentPage,
        pageSize: this.pageSize,
        lastQueryDateTime1: this.dateTime[0],
        lastQueryDateTime2: this.dateTime[1],
        code: this.code
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
