<template>
    <el-card>
      <div slot="header">
        <span>抽奖明细界面</span>
      </div>
      <div>
        <div>
          <el-input v-model="activity" style="width: 200px; margin: 0px 0 20px 5px;" size="small" placeholder="请输入活动名称"></el-input>
          
          <!-- <el-input v-model="activity" style="width: 200px; margin: 0px 0 20px 5px;" size="small" placeholder="请输入活动名称"></el-input>
           -->
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
            label="发行代码"
            prop="code">
          </el-table-column>

          <el-table-column
            label="活动名称"
            prop="activityName">
          </el-table-column>

          <el-table-column
            label="用户名称"
            prop="lotteryName">
          </el-table-column>

          <el-table-column
            label="联系电话"
            prop="lotteryPhone">
          </el-table-column>
          
          <el-table-column
            label="家庭地址"
            prop="lotteryAddress">
          </el-table-column>

          <el-table-column
            label="奖品名称"
            prop="awardName">
          </el-table-column>

          <el-table-column
            label="抽奖时间"
            prop="createDate">
          </el-table-column>

          <el-table-column
            label="红包金额"
            prop="price">
          </el-table-column>
          
          <el-table-column
            label="积分"
            prop="integral">
          </el-table-column>

          <el-table-column
            label="物品"
            prop="good">
          </el-table-column>

          
          <el-table-column
            label="快递编号"
            prop="expressCode">
          </el-table-column>

          <el-table-column
            label="快递名称"
            prop="expressName">
          </el-table-column>

          <el-table-column
            label="快递单号"
            prop="expressNo">
          </el-table-column>

          <el-table-column
            label="是否提现" align="center">
            <template slot-scope="scope">
            <span>{{ scope.row.IsCash ? '否' : '是' }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="是否发货" align="center" width="150">
            <template slot-scope="scope">
              <span><el-tag :type="scope.row.isSend ? 'true' : 'false'" @click.native="toggleStatus(scope.row)" >{{ scope.row.isSend ? '已发货' : '未发货' }}</el-tag></span>
            </template>
          </el-table-column>
          
           <el-table-column label="操作" width="280" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
        <edit-lotteryRecord ref="edit" @getList="getList"/>
      </div>
    </el-card>
</template>

<script>
import * as api from '../../../api'
import editLotteryRecord from './edit'
export default {
  name: 'marketing-lotteryRecord-list',
  components: { editLotteryRecord },
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
      activity: '',
      dateTime: [ null, null ]
    }
  },
  methods: {
    getList () {
      this.$http.post(api.lotteryRecordList, {
        page: this.currentPage,
        pageSize: this.pageSize,
        lastQueryDateTime1: this.dateTime[0],
        lastQueryDateTime2: this.dateTime[1],
        code: this.activity
      }).then(res => {
        this.list = res.data.rows
        this.total = res.data.total
      })
    },
    toggleStatus (row) {
      this.$confirm(row.isSend ? '该商品没有发货？' : '确定该商品已经发货？')
        .then(() => {
          row.isSend = !row.isSend
          this.$http.post(api.editLotteryRecord, row)
        })
        .catch(() => {})
    },
    handleEdit (index, row) {
      this.$refs.edit.open(row)
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
