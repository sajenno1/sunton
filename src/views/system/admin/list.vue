<template>
  <div>
    <el-card>
      <div class="headerCon clearfix" slot="header">
        <span>管理员</span>
        <el-button class="right" size="small" type="primary" icon="el-icon-plus" @click="dialogCreatedFormVisible = !dialogCreatedFormVisible">添加</el-button>
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
            label="用户账号"
            width="140">
            <template slot-scope="scope">
              <div>{{scope.row.userName}}</div>
            </template>
          </el-table-column>

          <el-table-column
            label="用户昵称"
            width="140">
            <template slot-scope="scope">
              <div>
                {{scope.row.displayName}}<br/>
                {{scope.row.mobile}}
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="角色"
            width="130"
            prop="roleName">
          </el-table-column>

          <el-table-column
            label="状态"
            width="100">
            <template slot-scope="scope">
              <div>
                {{getStatusText(scope.row.status)}}
              </div>
            </template>
            <!-- <template slot-scope="scope">
              <el-tag :type="scope.row.status ? 'success' : 'danger'" @click.native="toggleStatus(scope.row)">
                {{ scope.row.isActive ? '启用' : '禁用'}}
              </el-tag>
            </template> -->
          </el-table-column>

          <!-- <el-table-column
            label="登录次数"
            prop="loginCount"
            width="100"
            align="center">
          </el-table-column> -->

          <el-table-column
            label="最后登录IP"
            prop="lastLoginIP"
            width="170"
            align="center">
          </el-table-column>

          <el-table-column
            label="最后登录时间"
            width="170"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.lastLoginDate | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="创建时间"
            width="220"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                v-show="bSuperPower"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <el-button
                size="mini"
                @click="showAdminAccount(scope.$index, scope.row)">账户</el-button>
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

    
    <ctrl-adminAccountList
      ref="adminAccountList"/>

    <div>
      <el-dialog title="添加管理员" :visible.sync="dialogCreatedFormVisible" width="40%">
        <el-form :model="createdForm" style="padding-right:5%;">
          <el-form-item label="用户账号" :label-width="formLabelWidth">
            <el-input v-model="createdForm.userName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" :label-width="formLabelWidth">
            <el-input v-model="createdForm.displayName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系人" :label-width="formLabelWidth">
            <el-input v-model="createdForm.linkMan" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input v-model="createdForm.mobile" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="账号密码" :label-width="formLabelWidth">
            <el-input v-model="createdForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" :label-width="formLabelWidth">
            <el-input v-model="createdForm.password2" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色" :label-width="formLabelWidth">
            <el-select v-model="createdForm.roleId" placeholder="请选择角色">
              <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.name"
                :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogCreatedFormVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="createdAccount">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="编辑管理员" :visible.sync="dialogUpdatedFormVisible" width="40%">
        <el-form :model="updatedForm" style="padding-right:5%;">

          <el-form-item label="用户昵称" :label-width="formLabelWidth">
            <el-input v-model="updatedForm.displayName" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="联系人" :label-width="formLabelWidth">
            <el-input v-model="updatedForm.linkMan" auto-complete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input v-model="updatedForm.mobile" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="角色" :label-width="formLabelWidth">
            <el-select v-model="updatedForm.roleId" placeholder="请选择角色">
              <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.name"
                :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="状态" :label-width="formLabelWidth">
            <el-select v-model="updatedForm.status" placeholder="请选择状态">
              <el-option key="Approved" label="已审核" value="Approved"></el-option>
              <el-option key="Freeze" label="冻结" value="Freeze"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogUpdatedFormVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="updatedAccount">确 定</el-button>
        </div>
      </el-dialog>

      <el-popover
        ref="confirm"
        placement="top"
        width="160"
        v-model="showConfirm">
        <p>{{ confirmMessage }}</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="showConfirm = false">取消</el-button>
          <el-button type="primary" size="mini" @click="toggleStatus">确定</el-button>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script>
import * as api from '../../../api'
import ctrlAdminAccountList from './adminAccountList'
export default {
  name: 'system-admin-list',
  components: { ctrlAdminAccountList }, // , antiChannelConflictDealerEditAccount
  data () {
    return {
      list: [],
      dialogCreatedFormVisible: false,
      dialogUpdatedFormVisible: false,
      formLabelWidth: '120px',
      createdForm: {},
      roleList: [],
      updatedForm: {},
      changeStatusIndex: 0,
      showConfirm: false,
      confirmMessage: '',
      pageSize: 10,
      currentPage: 1,
      total: 0,
      bSuperPower: false
    }
  },
  methods: {
    getList () {
      return this.$http.post(api.adminList, {
        page: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        this.list = res.data.rows
        this.total = res.data.total
      })
    },
    getRoleList () {
      return this.$http.post(api.roleList, {
        page: 1,
        pageSize: 100
      }).then(res => {
        this.roleList = res.data.rows
      })
    },
    successNotufy (message) {
      this.$notify({
        title: '成功',
        message: message,
        type: 'success'
      })
    },
    handleEdit (index, row) {
      this.$http.post(api.adminInfo, {
        id: row.id
      }).then(res => {
        this.updatedForm = res.data
        this.dialogUpdatedFormVisible = !this.dialogUpdatedFormVisible
        this.getList()
      })
    },
    handleDelete (index, row) {
      this.$confirm('确定删除该管理员吗？')
        .then(() => {
          this.$http.post(api.delAdmin, { id: row.id }).then(res => {
            // this.list.splice(index, 1)
            this.getList()
            this.successNotufy('删除成功！')
          })
        })
        .catch(() => {})
    },
    showAdminAccount (index, row) {
      this.$refs.adminAccountList.open(row)
      // this.$confirm('确定删除该管理员吗？')
      //   .then(() => {
      //     this.$http.post(api.delAdmin, { id: row.id }).then(res => {
      //       // this.list.splice(index, 1)
      //       this.getList()
      //       this.successNotufy('删除成功！')
      //     })
      //   })
      //   .catch(() => {})
    },
    getStatusText (status) {
      switch (status) {
        case 'Pending': return '未审核'
        case 'Freeze': return '冻结'
        case 'Approved': return '已审核'
      }
      return ''
    },
    createdAccount () {
      this.$http.post(api.AddAdmin, this.createdForm).then(res => {
        this.getList()
        this.successNotufy('添加成功！')
        this.createdForm = {}
        this.dialogCreatedFormVisible = false
      })
    },
    updatedAccount () {
      this.$http.post(api.editAdmin, this.updatedForm).then(res => {
        this.getList()
        this.successNotufy('保存成功！')
        this.dialogUpdatedFormVisible = false
      })
    },
    clickTag (index) {
      this.changeStatusIndex = index
      this.confirmMessage = this.list[index].IsActive ? '确定禁用该账号吗？' : '确定启用该账号吗？'
      this.showConfirm = !this.showConfirm
    },
    toggleStatus (account) {
      this.$confirm(account.IsActive ? '确定禁用该账号吗？' : '确定启用该账号吗？')
        .then(_ => {
          account.IsActive = !account.IsActive
        })
        .catch(_ => {})
      // this.list[this.changeStatusIndex].IsActive = !this.list[this.changeStatusIndex].IsActive
      // this.showConfirm = false
      // this.$http.post('/Account/ChangeStatus', { Id: account.Id, Status: !account.IsActive }).then(res => {
      //   account.IsActive = !account.IsActive
      // })
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
    queryStart () {
      this.$http.post(api.AdminListQueryStart, this.createdForm).then(res => {
        this.bSuperPower = res.data.super
      })
    }
  },
  mounted () {
    this.queryStart()
    this.getList().then(() => {
      this.getRoleList()
    })
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


