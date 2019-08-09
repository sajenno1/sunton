<template>
  <div>
    <el-dialog title="微信账户列表" :visible.sync="showCurrentDialog" width="70%">

      <div>
        <el-button style="margin-bottom: 20px; " size="small" type="normal" @click="getList">刷新</el-button>
        <el-button style="margin-bottom: 20px; float: right;" size="small" type="primary" icon="el-icon-edit" @click="openAddDialog">添加</el-button>
      </div>

      <div class="table-container">
        <el-table
          :data="list"
          border
          style="width: 100%;">

          <el-table-column
            type="selection"
            width="55"
            align="center">
          </el-table-column>

          <el-table-column
            label="用户名"
            width="130"
            prop="userName">
          </el-table-column>

          <!-- <el-table-column
            label="微信昵称"
            prop="nickName">
          </el-table-column> -->

          <!-- <el-table-column
            label="密码"
            prop="password">
          </el-table-column> -->

          <el-table-column
            label="显示名称"
            width="220"
            prop="displayName">
          </el-table-column>

          <el-table-column
            label="角色"
            width="130">
          <template slot-scope="scope">
            <div>{{getAdminAccountTypeText(scope.row.adminAccountType)}}</div>
          </template>
          </el-table-column>

          <el-table-column
            label="修改时间"
            width="220"
            prop="updateDateTime">
          </el-table-column>

          <!-- <el-table-column
            label="登陆的次数"
            prop="loginCount">
          </el-table-column> -->

          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <!-- <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <el-button
                size="mini"
                @click="handleClearAdminAccount(scope.$index, scope.row)">清除</el-button>
              <el-button
                size="mini"
                @click="handleRevertPasswordAdminAccount(scope.$index, scope.row)">还原密码</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <div>
      <ctrl-addAdminAccount
        ref="addAccount"
        @getList="getList"/>
      <!-- <anti-channel-conflict-dealer-editAccount
        ref="editAccount"
        @getList="getList"
        @close="close"/>           -->
    </div>
  </div>
</template>

<script>
import * as api from '../../../api'
import ctrlAddAdminAccount from './addAdminAccount'
// import antiChannelConflictDealerEditAccount from './editAccount'
export default {
  name: 'ctrl-admin-adminaccount',
  components: { ctrlAddAdminAccount }, // , antiChannelConflictDealerEditAccount
  data () {
    return {
      pageSize: 100,
      currentPage: 1,
      showCurrentDialog: false,
      list: [],
      row: {},
      columns: [],
      data: []
    }
  },
  methods: {
    open (row) {
      this.showCurrentDialog = true
      this.row = row
      console.log(1)
      this.getList()
    },
    getList () {
      this.$http.post(api.adminAccountList, {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        adminId: this.row.id
      }).then(res => {
        this.list = res.data.rows
      })
    },
    openAddDialog () {
      this.$refs.addAccount.open(this.row)
    },
    handleDelete (index, row) {
      this.$confirm('确定删除该微信账户吗？')
        .then(() => {
          this.$http.post(api.delAdminAccount, { id: row.id }).then(res => {
            this.getList()
            this.$notify({ title: '成功', message: '删除成功！', type: 'success' })
          })
        })
        .catch(() => {})
    },
    handleClearAdminAccount (index, row) {
      this.$confirm('确定清除该账户吗？')
        .then(() => {
          this.$http.post(api.clearAdminAccount, { id: row.id }).then(res => {
            this.getList()
            this.$notify({ title: '成功', message: '清除成功！', type: 'success' })
          })
        })
        .catch(() => {})
    },
    handleRevertPasswordAdminAccount (index, row) {
      this.$confirm('确定还原密码吗？')
        .then(() => {
          this.$http.post(api.AdminAccountRevertPassword, { id: row.id }).then(res => {
            this.getList()
            this.$notify({ title: '成功', message: '还原成功！', type: 'success' })
          })
        })
        .catch(() => {})
    },
    getAdminAccountTypeText (adminAccountType) {
      switch (adminAccountType) {
        case 'Owner': return '所有者'
        case 'Default': return '默认'
        case 'Boss': return '老板'
        case 'FinanceManager': return '财务管理员'
        case 'StockManager': return '仓库管理员'
      }
      return ''
    },
    close () {
      this.showCurrentDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  margin-top: 10px;
}
</style>
