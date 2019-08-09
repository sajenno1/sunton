<template>
  <div>
    <el-card>
      <div slot="header">
        <span>门店管理</span>
      </div>

      <div class="searchCon clearfix">
        <div class="left">
          <el-input v-model="no" size="small" placeholder="请输入编号"></el-input>
          <el-input v-model="name" size="small" placeholder="请输入名称"></el-input>
          <el-input v-model="mobile" size="small" placeholder="请输入手机号码"></el-input>
          <el-input v-model="parentNo" size="small" placeholder="请输入所属经销商代码"></el-input>
          <el-select v-model="status" clearable placeholder="状态" size="small">
            <el-option label="已审核" value="Approved"></el-option>
            <el-option label="已冻结" value="Freeze"></el-option>
            <el-option label="未审核" value="Pending"></el-option>
          </el-select>
          <el-button type="primary" size="small" v-on:click="search" icon="el-icon-search">搜索</el-button>
        </div>
        <div class="right">
          <span style="display: inline-block;">
            <el-upload
              size="small"
              v-bind:action="uploadUrl"
              v-bind:show-file-list="false"
              v-bind:on-success="handleUploadSuccess"
              v-bind:headers="headers"
              v-bind:on-error="handleUploadError">
              <!-- <el-button type="primary" size="small" plain><i class="el-icon-news"></i> 导入</el-button> -->
            </el-upload>
          </span>
          <el-button type="primary" style="margin-left: 5px;" size="small" icon="el-icon-plus" v-on:click="openAddDialog">添加</el-button>
        <el-button class="right" size="small" type="danger" icon="el-icon-delete" v-on:click="batchDeleteItems">批量删除</el-button>
        </div>
      </div>

      <div class="table-container">
        <el-table
          v-bind:data="list"
          border
          v-on:selection-change="handleSelectionChange">

          <el-table-column
            type="selection"
            width="48"
            align="center"
            >
          </el-table-column>

          <el-table-column
            label="编号"
            width="200"
            prop="no">
          </el-table-column>

          <el-table-column
            label="名称"
            width="350">
            <template slot-scope="scope">
              <span>
                {{scope.row.name}}<br/>
                {{scope.row.mobile}}
              </span>
            </template>
          </el-table-column>

          <!--<el-table-column
            label="手机"
            prop="mobile">
          </el-table-column>-->

          <!--<el-table-column
            label="联系人"
            prop="linkMan">
          </el-table-column>-->

          <!--<el-table-column
            label="所在地区"
            prop="areaName">
          </el-table-column>-->

          <!--<el-table-column
            label="地址"
            prop="address">
          </el-table-column>-->

          <!--<el-table-column
            label="电话"
            prop="tel">
          </el-table-column>-->

          <!-- <el-table-column
            label="上级代理">
            <template slot-scope="scope">
              <span v-html="scope.row.parentDealerInfo.replace(',','<br/>')"></span>
            </template>
          </el-table-column> -->
          <el-table-column
            label="所属经销商"
            width="150">
            <template slot-scope="scope">
              <span v-html="scope.row.parentDealerInfo.replace(',','<br/>')"></span>
            </template>
          </el-table-column>

          <el-table-column
            label="状态"
            width="120">
            <template slot-scope="scope">
              <span>{{ getStatusText(scope.row.status) }}</span>
            </template>
          </el-table-column>

          <!--<el-table-column
            label="级别"
            prop="titleLevel">
          </el-table-column>-->

          <!-- <el-table-column
            label="级别"
            prop="dealerLevelTitle">
          </el-table-column> -->

          <el-table-column
            label="创建时间"
            align="center"
            width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDate }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="right">
            <template slot-scope="scope">
              <div style="margin-top:5px;">
              <el-button
                size="mini"
                v-on:click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <!-- <el-button
                size="mini"
                v-on:click="handleAccount(scope.$index, scope.row)">账户</el-button> -->
              <!-- <el-button
                size="mini"
                v-on:click="handleRevertPassword(scope.$index, scope.row)">还原密码</el-button> -->
              <el-button
                size="mini"
                type="danger"
                v-on:click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <el-button
                size="mini"
                v-bind:type="getStatusText(scope.row.status) === '已审核' ? 'info' : 'success'"
                v-on:click="handleUpdateStatus(scope.$index, scope.row)">{{ getNextStatusText(scope.row.status) }}</el-button>
              </div>
              <!-- <div style="margin-top:5px;">
              </div> -->
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="page-container" v-if="total > pageSize">
        <el-pagination
          v-on:size-change="handleSizeChange"
          v-on:current-change="handleCurrentChange"
          layout="prev, pager, next, sizes, total"
          v-bind:total="total">
        </el-pagination>
      </div>

      <div>
        <antiChannelConflict-dealerSellStore-add
          ref="addSellStore"
          v-if="show"
          v-on:getList="getList"
          v-on:close="close" >
        </antiChannelConflict-dealerSellStore-add>

        <anti-channel-conflict-dealerSellStore-edit
          ref="editSellStore"
          v-on:getList="getList"
          v-if="show"
          v-on:close="close">
        </anti-channel-conflict-dealerSellStore-edit>
        <!-- <anti-channel-conflict-dealer-account
          ref="account"
          v-on:getList="getList" >
        </anti-channel-conflict-dealer-account> -->
      </div>
      <!-- <div>
        {{$route.params.pid}}
      </div> -->
    </el-card>
  </div>
</template>

<script>
import * as api from '../../../api'
import antiChannelConflictDealerSellStoreAdd from './addSellStore'
import antiChannelConflictDealerSellStoreEdit from './editSellStore'
// import antiChannelConflictDealerSellStoreAccount from './accountSellStore'
// , antiChannelConflictDealerSellStoreAccount
export default {
  name: 'antiChannelConflict-dealer-list',
  components: { antiChannelConflictDealerSellStoreAdd, antiChannelConflictDealerSellStoreEdit },
  data () {
    return {
      pageSize: 10,
      currentPage: 1,
      total: 0,
      list: [],
      show: true,
      uploadUrl: this.$http.defaults.baseURL + api.importDealers,
      headers: {},
      no: '',
      name: '',
      mobile: '',
      status: '',
      parentNo: '',
      selectedItems: []
    }
  },
  methods: {
    getList () {
      var _this = this
      var pid = _this.$route.params.pid === undefined ? '' : _this.$route.params.pid
      if (pid.length > 0) pid = pid.substr(1)
      this.$http.post(api.dealerSellStoreList, {
        page: this.currentPage,
        pageSize: this.pageSize,
        no: this.no,
        name: this.name,
        mobile: this.mobile,
        status: this.status,
        parentId: pid, // $route.params.pid
        parentNo: this.parentNo
      }).then(res => {
        this.list = res.data.rows
        console.log(this.list)
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
      this.show = true
      setTimeout(() => {
        this.$refs.editSellStore.open(row)
      }, 500)
    },
    // handleAccount (index, row) {
    //   this.show = true
    //   setTimeout(() => {
    //     this.$refs.account.open(row)
    //   }, 500)
    // },
    handleDelete (index, row) {
      this.$confirm('确定删除该门店吗？')
        .then(() => {
          this.$http.post(api.delDealer, { id: row.id }).then(res => {
            this.getList()
            this.$notify({ title: '成功', message: '添加成功！', type: 'success' })
          })
        })
        .catch(() => {})
    },
    openAddDialog () {
      this.show = true
      this.$refs.addSellStore.open()
    },
    close () {
      this.show = false
    },
    handleUploadError (err, file) {
      this.$notify.error({ title: `错误码:${err.status}`, message: err.message })
    },
    handleUploadSuccess (res, file) {
      this.$notify.success({ title: '成功', message: '导入成功' })
      this.getList()
    },
    handleUpdateStatus (index, row) {
      // this.$http.post(api.updateDealerStatus, {
      //   id: row.id,
      //   dealerStatus: row.status === 'Approved' ? 'Freeze' : 'Approved'
      // }).then(res => {
      //   this.$notify.success({ title: '成功', message: row.status === 'Approved' ? '冻结成功' : '启动成功' })
      //   row.status = row.status === 'Approved' ? 'Freeze' : 'Approved'
      // })
      var _this = this
      // + (row.status === 'Approved' ? '冻结' : row.status === 'Pending'?'审核':'启用')
      var optText = _this.getNextStatusText(row.status)
      var optName = _this.getNextStatusText(row.status, true)
      this.$confirm('确定要 ' + optText + ' 此门店吗?', '提示').then(function () {
        _this.$http.post(api.updateDealerStatus, {
          id: row.id,
          dealerStatus: optName // row.status === 'Approved' ? 'Freeze' : 'Approved'
        }).then(res => {
          _this.$notify.success({ title: '成功', message: optText + '成功' })
          row.status = optName
        })
      })
    },
    getNextStatusText (status, isName) {
      if (isName) {
        switch (status) {
          case 'Approved': return 'Freeze'
          case 'Pending': return 'Approved'
        }
        return 'Approved'
      }
      switch (status) {
        case 'Approved': return '冻结'
        case 'Pending': return '启用'
      }
      return '启用'
    },
    // handleUpdateStatusToPending (index, row) {
    //   this.$http.post(api.updateDealerStatus, {
    //     id: row.id,
    //     dealerStatus: 'Pending'
    //   }).then(res => {
    //     this.$notify.success({ title: '设置成功', message: '取消审核成功' })
    //     // row.status = row.status === 'Approved' ? 'Freeze' : 'Approved'
    //   })
    // },
    handleSelectionChange (selectedItems) {
      this.selectedItems = selectedItems
    },
    batchDeleteItems () {
      if (this.selectedItems.length === 0) {
        this.$notify({title: '错误', message: '请先选择操作项！', type: 'error'})
        return
      }
      this.$confirm('确定要删除 吗?', '提示').then(() => {
        var sIds = this.selectedItems.map(function (item) {
          return item.id
        })
        this.$http.post(api.batchRemoveDealer, sIds).then(response => {
          if (response.status === 200) {
            this.$notify({ title: '成功', message: '删除成功！', type: 'success' })
            this.getList()
          } else {
            this.$notify({ title: '失败', message: response.message, type: 'error' })
          }
        })
      }).catch(() => {})
    },
    handleRevertPassword (index, row) {
      if (!confirm('确定要还原密码,为其手机号吗?')) return
      this.$http.post(api.dealerResetPassword, {id: row.id}).then(response => {
        if (response.status === 200) {
          this.$notify({ title: '成功', message: '密码还原成功！', type: 'success' })
          this.getList()
        } else {
          this.$notify({ title: '失败', message: response.message, type: 'error' })
        }
      })
    },
    search () {
      this.currentPage = 1
      this.total = 0
      this.getList()
    },
    getStatusText (status) {
      switch (status) {
        case 'Approved':
          return '已审核'
        case 'Pending':
          return '待审核'
        case 'Freeze':
          return '冻结'
        case 'Reject':
          return '被驳回'
      }
      return '.'
    }
  },
  mounted () {
    this.getList()
    this.headers['access-token'] = this.$store.state.account.access_token
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
