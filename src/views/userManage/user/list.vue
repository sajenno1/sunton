<template>
  <div>
    <el-card>
      <div slot="header">
        <span>品牌列表</span>
      </div>
      <div>
        <el-input v-model="nickName" style="width: 200px; margin-bottom: 20px;" placeholder="请输入用户昵称"></el-input>

        <el-input v-model="mobile" style="width: 200px;" placeholder="请输入用户手机"></el-input>

        <el-select v-model="status" clearable placeholder="请选择状态">
          <el-option label="未审核" value="Pending"></el-option>
          <el-option label="已审核" value="Approved"></el-option>
          <el-option label="冻结" value="Freeze"></el-option>
        </el-select>

        <el-select v-model="gender" clearable placeholder="请选择性别">
          <el-option label="未知" value="Unknown"></el-option>
          <el-option label="男" value="Male"></el-option>
          <el-option label="女" value="Female"></el-option>
        </el-select>

        <el-date-picker
          v-model="createDate"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="创建日期开始"
          end-placeholder="创建日期结束">
        </el-date-picker>

        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
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
            label="头像">
            <template slot-scope="scope">
              <img :src="scope.row.avatar.replace('/0', '/64')" style="max-width: 64px; max-height: 64px;" />
            </template>
          </el-table-column>

          <!-- <el-table-column
            label="用户名"
            prop="userName">
          </el-table-column> -->

          <!-- <el-table-column
            label="真实姓名"
            prop="realName">
          </el-table-column> -->

          <el-table-column
            label="昵称"
            prop="nickName">
          </el-table-column>

          <el-table-column
            label="手机"
            prop="mobile" align="center">
          </el-table-column>

          <el-table-column
            label="状态"
            align="center">
            <template slot-scope="scope">
              <span>{{ statusEnum[scope.row.status] }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="性别"
            align="center">
            <template slot-scope="scope">
              <span>{{ genderEnum[scope.row.gender] }}</span>
            </template>
          </el-table-column>

          <!-- <el-table-column
            label="邮箱"
            prop="email">
          </el-table-column> -->

          <el-table-column
            label="余额"
            prop="balance"
            align="center">
          </el-table-column>

          <el-table-column
            label="预计收益"
            prop="anticipatedIncome"
            align="center">
          </el-table-column>

          <el-table-column
            label="可提现余额"
            prop="realizableBalance"
            align="center">
          </el-table-column>

          <el-table-column
            label="积分"
            prop="integral"
            align="center">
          </el-table-column>

          <!-- <el-table-column
            label="修改签名"
            prop="signature">
          </el-table-column> -->

          <el-table-column
            label="最后登录时间"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.lastLoginDate | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="登录次数"
            prop="loginCount"
            align="center">
          </el-table-column>

          <el-table-column
            label="最后登录IP"
            prop="lastLoginIP" align="center">
          </el-table-column>

          <el-table-column
            label="创建时间"
            align="center"
            width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                :type="scope.row.status === 'Approved' ? 'danger' : 'success'"
                @click="handleStatus(scope.$index, scope.row)">{{ scope.row.status === 'Approved' ? '禁用' : '启用' }}</el-button>
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
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'userManage-user-list',
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
      nickName: '',
      mobile: '',
      status: '',
      gender: '',
      lastLoginIP: '',
      createDate: [null, null],
      statusEnum: {
        Pending: '未审核',
        Approved: '已审核',
        Freeze: '冻结'
      },
      genderEnum: {
        Unknown: '未知',
        Male: '男',
        Female: '女'
      }
    }
  },
  methods: {
    getList () {
      this.$http.post(api.userList, {
        page: this.currentPage,
        pageSize: this.pageSize,
        nickName: this.nickName,
        mobile: this.mobile,
        status: this.status,
        gender: this.gender,
        lastLoginIP: this.lastLoginIP,
        createDate1: this.createDate[0],
        createDate2: this.createDate[1]
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
    handleStatus (index, row) {
      this.$http.post(api.changeUserStatus, {
        id: row.id,
        status: row.status
      }).then(res => {
        row.status = row.status === 'Approved' ? 'Freeze' : 'Approved'
        this.$notify.success({ title: '成功', message: '修改成功' })
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
