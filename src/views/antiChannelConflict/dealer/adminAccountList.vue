<template>
  <div>
    <el-dialog title="经销商账户列表" :visible.sync="show" width="60%">

      <div>
        <el-button style="margin-bottom: 20px;" size="small" type="normal" @click="getList">刷新</el-button>
        <el-input v-model="row.id" size="small" style="width:350px" placeholder="经销商授权码" readonly="true"></el-input>
        <el-button style="margin-bottom: 20px; float: right;" size="small" type="primary" icon="el-icon-edit" @click="openAddDialog">添加</el-button>
      </div>

      <div class="table-container">
        <el-table
          :data="list"
          border
          style="width: 100%;">

          <el-table-column
            type="selection"
            width="50"
            align="center">
          </el-table-column>

          <el-table-column
            label="用户名"
            width="150"
            prop="userName">
          </el-table-column>

          <!-- <el-table-column
            label="微信昵称"
            width="200"
            prop="nickName">
          </el-table-column> -->

          <!-- <el-table-column
            label="密码"
            prop="password">
          </el-table-column> -->

          <el-table-column
            label="名称"
            width="200"
            prop="displayName">
          </el-table-column>

          <el-table-column
            label="修改时间"
            width="200">
            <template slot-scope="scope">
              <div>
                {{ scope.row.updateDateTime | FormattersDateTime }}
              </div>
            </template>
          </el-table-column>

          <!-- <el-table-column
            label="登陆的次数"
            prop="loginCount">
          </el-table-column> -->
          <el-table-column align="center"
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
      <anti-channel-conflict-dealer-addAdminAccount
        ref="addAdminAccount"
        @getList="getList"/>
      <!-- <anti-channel-conflict-dealer-editAdminAccount
        ref="editAdminAccount"
        @getList="getList"
        @close="close"/>           -->
    </div>
  </div>
</template>

<script>
import * as api from '../../../api'
import antiChannelConflictDealerAddAdminAccount from './addAdminAccount'
// import antiChannelConflictDealerEditAdminAccount from './editAdminAccount'
export default {
  name: 'antiChannelConflict-dealer-adminAccount',
  components: { antiChannelConflictDealerAddAdminAccount }, // , antiChannelConflictDealerEditAdminAccount
  data () {
    return {
      pageSize: 100,
      currentPage: 1,
      show: false,
      list: [],
      row: {},
      columns: [],
      data: []
    }
  },
  methods: {
    open (row) {
      console.log(row)
      this.show = true
      this.row = row
      this.getList()
    },
    getList () {
      this.$http.post(api.dealerAdminAccountList, {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        dealerId: this.row.id
      }).then(res => {
        this.list = res.data.rows
      })
    },
    openAddDialog () {
      this.$refs.addAdminAccount.open(this.row)
    },
    handleDelete (index, row) {
      this.$confirm('确定删除该经销商账户吗？')
        .then(() => {
          this.$http.post(api.delDealerAdminAccount, { id: row.id }).then(res => {
            this.getList()
            this.$notify({ title: '成功', message: '删除成功！', type: 'success' })
          })
        })
        .catch(() => {})
    },
    handleClearAdminAccount (index, row) {
      this.$confirm('确定清除该经销商账户吗？')
        .then(() => {
          this.$http.post(api.clearDealerAdminAccount, { id: row.id }).then(res => {
            this.getList()
            this.$notify({ title: '成功', message: '清除成功！', type: 'success' })
          })
        })
        .catch(() => {})
    },
    handleRevertPasswordAdminAccount (index, row) {
      this.$confirm('确定还原密码吗？')
        .then(() => {
          this.$http.post(api.dealerAdminAccountRevertPassword, { id: row.id }).then(res => {
            this.getList()
            this.$notify({ title: '成功', message: '还原成功！', type: 'success' })
          })
        })
        .catch(() => {})
    },
    // handleEdit (index, row) {
    //   this.show = true
    //   setTimeout(() => {
    //     this.$refs.editAdminAccount.open(row)
    //   }, 500)
    // },
    close () {
      this.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  margin-top: 10px;
}
</style>
