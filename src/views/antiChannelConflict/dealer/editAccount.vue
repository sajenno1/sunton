<template>
  <div>
    <el-dialog title="编辑经销商账户" :visible.sync="show" width="40%">
      <el-form :model="form" style="padding-right:5%;">
        <el-form-item label="显示名称" :label-width="formLabelWidth">
          <el-input v-model="form.displayName" auto-complete="off" size="small"></el-input>
        </el-form-item>
        <!-- <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.password1" auto-complete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.password2" auto-complete="off" size="small"></el-input>
        </el-form-item> -->
        <el-form-item label="用户昵称" :label-width="formLabelWidth">
          <el-input v-model="form.nickName" readonly style="width:350px;"></el-input>
          <el-button type="primary" @click="openUseList" size="medium">选择</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false" size="medium">取 消</el-button>
        <el-button type="primary" @click="update" size="medium" icon="el-icon-success">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog id="selectUser" title="选择用户" :visible.sync="dialogUserListVisible" width="60%">
     <div>
       <el-input v-model="nickName" style="width: 200px; margin-bottom: 10px;" placeholder="请输入用户昵称"></el-input>
        <el-input v-model="mobile" style="width: 200px;" placeholder="请输入用户手机"></el-input>
         <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </div>
      <div>
       <el-table
          :data="list"
          border
          style="width: 100%">
          <el-table-column
            label="头像">
            <template slot-scope="scope">
              <img :src="scope.row.avatar.replace('/0', '/64')" style="max-width: 64px; max-height: 64px;" />
            </template>
          </el-table-column>

          <el-table-column
            label="昵称"
            prop="nickName">
          </el-table-column>

          <el-table-column
            label="手机"
            prop="mobile" align="center">
          </el-table-column>

          <el-table-column
            label="性别"
            align="center">
            <template slot-scope="scope">
              <span>{{ genderEnum[scope.row.gender] }}</span>
            </template>
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
               <el-button type="primary" @click="selectedUser(scope.$index, scope.row)" size="medium">选择</el-button>
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUserListVisible = false" size="medium">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'antiChannelConflict-dealer-addAccount',
  data () {
    return {
      pageSize: 10,
      currentPage: 1,
      total: 0,
      userNickName: '',
      nickName: '',
      mobile: '',
      row: {},
      dialogUserListVisible: false,
      genderEnum: {
        Unknown: '未知',
        Male: '男',
        Female: '女'
      },
      show: false,
      form: {},
      list: [],
      formLabelWidth: '120px'
    }
  },
  methods: {
    open (row) {
      this.form = {}
      this.show = true
      this.getList(row.id)
    },
    getList (id) {
      this.$http.post(api.dealerAccount, { id: id }).then(res => {
        this.form = res.data
      })
    },
    update () {
      this.$http.post(api.editDealerAccount, this.form).then(res => {
        this.$notify({ title: '成功', message: '修改成功！', type: 'success' })
        this.$emit('getList')
        this.show = false
      })
    },
    openUseList () {
      this.dialogUserListVisible = true
      this.getUserList()
    },
    getUserList () {
      this.$http.post(api.userList, {
        page: this.currentPage,
        pageSize: this.pageSize,
        nickName: this.nickName,
        mobile: this.mobile
      }).then(res => {
        this.list = res.data.rows
        this.total = res.data.total
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.currentPage = 1
      this.getUserList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getUserList()
    },
    search () {
      this.currentPage = 1
      this.total = 0
      this.getUserList()
    },
    selectedUser (index, row) {
      this.dialogUserListVisible = false
      this.form.userId = row.id
      this.form.nickName = row.nickName
      this.form.userName = row.userName
    }
  }
}
</script>

