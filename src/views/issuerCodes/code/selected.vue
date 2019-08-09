<template>
  <div>
    <el-dialog title="选择发行记录" :visible.sync="show" width="70%">
      <div class="searchCon clearfix">
        <el-input v-model="no" style="width: 200px;" placeholder="请输入编号"></el-input>

        <el-date-picker
          v-model="issueDateTime"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="发行开始日期"
          end-placeholder="发行结束日期">
        </el-date-picker>

        <el-select v-model="isActived" clearable placeholder="是否激活">
          <el-option key="true" label="是" :value="true"></el-option>
          <el-option key="false" label="否" :value="false"></el-option>
        </el-select>

        <el-date-picker
          v-model="activeDateTime"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="激活开始日期"
          end-placeholder="激活结束日期"
          v-show="isActived">
        </el-date-picker>

        <el-button type="primary" icon="el-icon-search" @click="getList">搜索</el-button>
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
            label="数量"
            prop="count">
          </el-table-column>

          <el-table-column
            label="激活">
            <template slot-scope="scope">
              <span>{{ scope.row.isActived }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="描述"
            prop="description">
          </el-table-column>

          <el-table-column
            label="激活时间"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.activeDateTime | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="发行时间"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.issueDateTime | FormattersDateTime }}</span>
            </template>
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
                @click="handleSelected(scope.$index, scope.row)">选择</el-button>
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
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'issuer-code-selected',
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
      show: false,
      list: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      no: '',
      issueDateTime: [ null, null ],
      isActived: null,
      activeDateTime: [ null, null ]
    }
  },
  methods: {
    getList () {
      this.$http.post(api.issuerRecordList, {
        page: this.currentPage,
        pageSize: this.pageSize,
        no: this.no,
        issueDateTime1: this.issueDateTime[0],
        issueDateTime2: this.issueDateTime[1],
        isActived: this.isActived,
        activeDateTime1: this.activeDateTime[0],
        activeDateTime2: this.activeDateTime[1]
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
    handleSelected (index, row) {
      this.$emit('selected', row.id)
      this.show = false
    },
    open () {
      this.show = true
      this.getList()
    }
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
