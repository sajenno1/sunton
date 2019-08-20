<template>
  <div>
    <el-card>
      <div slot="header">
        <span>经销商管理</span>
      </div>

      <div class="searchCon clearfix">
        <div>
          <el-input v-model="no" size="small" style="width:150px" placeholder="请输入编号"></el-input>
          <el-input v-model="name" size="small" style="width:150px" placeholder="请输入名称"></el-input>
          <el-input v-model="mobile" size="small" style="width:160px" placeholder="请输入手机号码"></el-input>
          <el-select v-model="status" clearable placeholder="状态" size="small" style="width:120px;">
            <el-option label="已审核" value="Approved"></el-option>
            <el-option label="已冻结" value="Freeze"></el-option>
            <el-option label="待审核" value="Pending"></el-option>
          </el-select>
          <el-button type="primary" size="small" v-on:click="search" icon="el-icon-search">搜索</el-button>
        </div>
        <div style="margin-top: 10px; margin-bottom: 10px; height:30px;">
          <el-button type="primary" style="margin-left: 0px;" size="small" icon="el-icon-plus" v-on:click="openAddDialog">添加</el-button>
          <span style="display: inline-block;">
            <el-upload
              size="small"
              v-bind:action="uploadUrl"
              v-bind:show-file-list="false"
              v-bind:on-success="handleUploadSuccess"
              v-bind:headers="headers"
              v-bind:on-error="handleUploadError">
              <el-button  size="small" plain><i class="el-icon-news"></i> 导入</el-button>
            </el-upload>
          </span>
          <!-- <el-button size="small" type="danger" icon="el-icon-delete" v-on:click="batchDeleteItems">批量删除</el-button> -->
          <!-- <el-button type="primary" style="margin-left: 0px;" size="small" icon="el-icon-check" v-on:click="batchSetCheckedRich(false)">审核</el-button> -->
          <!-- <el-button type="primary" style="margin-left: 0px;" size="small" icon="el-icon-close" v-on:click="batchSetCheckedRich(true)" plain>反审核</el-button> -->
<el-dropdown>
  <el-button size="mini" type="primary">
    批量操作
  </el-button>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item  v-on:click.native="batchDeleteItems">删除</el-dropdown-item>
    <el-dropdown-item  v-on:click.native="batchSetCheckedRich(false)">审核</el-dropdown-item>
    <el-dropdown-item  v-on:click.native="batchSetCheckedRich(true)" >反审核</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
        </div>
      </div>

      <div class="table-container">
        <el-table
          v-bind:data="list"
          border
          style="width:100%"
          v-on:selection-change="handleSelectionChange">

          <el-table-column
            type="selection"
            width="40"
            align="center"
            >
          </el-table-column>

          <el-table-column
            label="编号"
            width="120"
            prop="no">
          </el-table-column>

          <!--width="180"-->
          <el-table-column
            label="名称">
            <template slot-scope="scope">
              <div>
                {{scope.row.name}} 
              </div>
              <div>
                {{scope.row.mobile}} {{scope.row.softDeleted?'[已删]':''}}
              </div>
            </template>
          </el-table-column>

          <!-- <el-table-column
            label="联系人"
            prop="linkMan">
          </el-table-column> -->

<!--scope.row.mobile-->
          <!-- <el-table-column
            width="150"
            label="授信额度">
            <template slot-scope="scope">
              <span>{{ scope.row.creditLimit | Currency }}</span>
            </template>
          </el-table-column> -->

          <!-- <el-table-column
            label="联系人"
            prop="linkMan">
          </el-table-column> -->

          <el-table-column
            width="150"
            label="余额">
            <template slot-scope="scope">
              <span>{{ scope.row.balance | Currency }}</span>
            </template>
          </el-table-column>
          
          <!--<el-table-column
            label="手机"
            prop="mobile">
          </el-table-column>-->

          <!-- <el-table-column
            label="联系人">
            <template slot-scope="scope">
              <span>
                {{scope.row.linkMan}}&nbsp;
              </span>
            </template>
          </el-table-column> -->

          <el-table-column
            width="140"
            label="上级">
            <template slot-scope="scope">
              <!-- <div>{{scope.row.parentDealerInfo!=','?scope.row.parentDealerInfo.replace(',','<br/>'):''}}</div> -->
              <div v-html="scope.row.parentDealerInfo.replace(',','<br/>')"></div>
            </template>
          </el-table-column>

          <el-table-column
            width="100"
            label="地区"
            prop="areaName">
          </el-table-column>

          <!-- <el-table-column
            label="地址"
            prop="address">
          </el-table-column> -->

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
            width="75"
            label="状态">
            <template slot-scope="scope">
              <span v-bind:style="{'color':scope.row.status=='Pending'?'#ff0000':''}">{{ getStatusText(scope.row.status) }}</span>
            </template>
          </el-table-column>

          <el-table-column
            width="40"
            label="店">
            <template slot-scope="scope">
              <div>{{scope.row.isSellStore?'是':'否'}}</div>
            </template>
          </el-table-column>

          <!-- <el-table-column
            label="备注"
            prop="remark">
          </el-table-column> -->


          <el-table-column
            label="等级"
            width="150"
            prop="dealerLevelTitle">
          </el-table-column>

          <el-table-column
            width="130"
            label="创建时间"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDate }}</span>
            </template>
          </el-table-column>


          <el-table-column label="操作">
            <template slot-scope="scope">
            
                <!-- <el-button
                  size="mini"
                  v-on:click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit" style="margin-top:5px;"></el-button>
                <el-button
                  size="mini"
                  type="danger"
                  v-on:click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete" style="margin-top:5px;"></el-button>
                <el-button
                  size="mini"
                  type="danger" v-show="$store.state.account.adminInfo.roleName=='超级管理员'"
                  v-on:click="handleRealDelete(scope.$index, scope.row)" icon="el-icon-delete" style="margin-top:5px;">删</el-button> -->
                <!-- <el-button
                  size="mini"
                  v-on:click="handleAccount(scope.$index, scope.row)" style="margin-top:5px;">账户</el-button> -->
                  <!-- <el-button
                  size="mini"
                  v-on:click="handleRevertPassword(scope.$index, scope.row)" style="margin-top:5px;">还原密码</el-button> -->
                <!-- <el-button type="text"
                  v-on:click="handleAdminAccountList(scope.$index, scope.row)" style="margin-top:5px;">账户</el-button> -->
              <el-button type="text" v-on:click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <!-- <el-button type="text" v-on:click="handleAdminAccountList(scope.$index, scope.row)">账户</el-button> -->
              <!-- <el-button type="text" v-on:click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
              <!-- <el-button type="text" v-on:click="handleRevertPassword(scope.$index, scope.row)">还原密码</el-button> -->
              <el-button type="text" v-show=false>审核</el-button>
              <el-dropdown>
                <el-button type="text" class='more'>...</el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-on:click.native="handleAdminAccountList(scope.$index, scope.row)">账号</el-dropdown-item>
                  <el-dropdown-item v-on:click.native="handleRevertPassword(scope.$index, scope.row)" >还原密码</el-dropdown-item>
                  <el-dropdown-item v-on:click.native="handleDelete(scope.$index, scope.row)">删除</el-dropdown-item>
                  <el-dropdown-item v-on:click.native="handleAddress(scope.$index, scope.row)">收货地址</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            
            
              <div style="margin-top:5px;">
                
                <!-- <el-button
                  size="mini"
                  v-bind:type="getStatusText(scope.row.status) === '已审核' ? 'info' : 'success'"
                  v-on:click="handleUpdateStatus(scope.$index, scope.row)" style="margin-top:5px;">{{ getNextStatusText(scope.row.status) }}</el-button> -->
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

          <!--<el-table-column
            label="级别"
            prop="titleLevel">
          </el-table-column>-->

          <!-- <el-table-column
            label="级别"
            prop="dealerLevelTitle">
          </el-table-column> -->
      <!-- <el-button
        size="mini"
        v-on:click="handleRevertPassword(scope.$index, scope.row)">还原密码</el-button> -->
      <!-- <el-button
        size="mini"
        v-on:click="openDealerSellStore(scope.row.parentDealerId)">门店</el-button> -->
    <!-- <div style="margin-top:5px;">
    </div> -->

      <div class="page-container" v-if="total > pageSize">
        <el-pagination
          v-on:size-change="handleSizeChange"
          v-on:current-change="handleCurrentChange"
          layout="prev, pager, next, sizes, total"
          v-bind:total="total">
        </el-pagination>
      </div>

      <div>
        <antiChannelConflict-dealer-add
          ref="add"
          v-if="show"
          v-on:getList="getList"
          v-on:close="close" >
        </antiChannelConflict-dealer-add>

        <anti-channel-conflict-dealer-edit
          ref="edit"
          v-on:getList="getList"
          v-if="show"
          v-on:close="close">
        </anti-channel-conflict-dealer-edit>

        <anti-channel-conflict-dealer-adminAccountList
          ref="adminAccountList"
          v-on:getList="getList">
        </anti-channel-conflict-dealer-adminAccountList>

        <antiChannelConflit-address-list
          ref="addressList"
          v-if="show"
          v-on:getList="getList"
          v-on:close="close" >
        </antiChannelConflit-address-list>

      </div>
    </el-card>
  </div>
</template>

<script>
import * as api from '../../../api'
import antiChannelConflictDealerAdd from './add'
import antiChannelConflictDealerEdit from './edit'
import antiChannelConflictDealerAdminAccountList from './adminAccountList'
import antiChannelConflitAddressList from './addressList'

// import Vue from 'vue'

export default {
  name: 'antiChannelConflict-dealer-list',
  components: { antiChannelConflictDealerAdd, antiChannelConflictDealerEdit, antiChannelConflictDealerAdminAccountList, antiChannelConflitAddressList },
	inject:['reload'],
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
      selectedItems: [],
      balanceIds: []
    }
  },
  methods: {
    openCheckUser () {
      this.show = true
      // Vue.component('error.vue').open()
    },
    getList () {
      this.$http.post(api.dealerList, {
        page: this.currentPage,
        pageSize: this.pageSize,
        no: this.no,
        name: this.name,
        mobile: this.mobile,
        status: this.status
      }).then(res => {
        this.balanceIds = []
        for (var item of res.data.rows) {
          item.balance = 0
          this.balanceIds.push(item.id)
        }
        this.list = res.data.rows
        // console.log(this.list)

        this.total = res.data.total
        //
        this.getBalances()
      })
    },
    getBalances () {
      this.$http.post(api.mallDealerAccountBalanceList, {ids: this.balanceIds}).then(res => {
        // this.$notify.success({ title: '成功', message: res.data })
        for (var item of this.list) {
          // item.balance = '不' + res.data[item.id].toString()
          item.balance = res.data[item.id]
          // console.log(item)
        }
        // console.log(res.data)
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
        this.$refs.edit.open(row)
      }, 500)
    },
    // handleAccount (index, row) {
    //   this.show = true
    //   setTimeout(() => {
    //     this.$refs.account.open(row)
    //   }, 500)
    // },
    handleAdminAccountList (index, row) {
      this.show = true
      setTimeout(() => {
        this.$refs.adminAccountList.open(row)
      }, 500)
    },
    handleAddress (index, row) {
      this.show = true
      setTimeout(() => {
        this.$refs.addressList.open(row)
      }, 500)
    },
    handleDelete (index, row) {
      this.$confirm('确定删除该经销商吗？')
        .then(() => {
          this.$http.post(api.delDealer, { id: row.id }).then(res => {
            this.getList()
            this.$notify({ title: '成功', message: '删除成功！', type: 'success' })
          })
        })
        .catch(() => {})
    },
    handleRealDelete (index, row) {
      this.$confirm('确定删除该经销商吗？')
        .then(() => {
          this.$http.post(api.realDelDealer, { id: row.id }).then(res => {
            this.getList()
            this.$notify({ title: '成功', message: '添加成功！', type: 'success' })
          })
        })
        .catch(() => {})
    },
    openAddDialog () {
      this.show = true
      this.$refs.add.open()
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
      this.$confirm('确定要 ' + optText + ' 此经销商吗?', '提示').then(function () {
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
    batchSetCheckedRich (isNot) {
      if (this.selectedItems.length === 0) {
        this.$notify({title: '错误', message: '请先选择操作项！', type: 'error'})
        return
      }
      var title = isNot ? '反审核' : '审核'
      this.$confirm('确定要' + title + ' 吗?', '提示').then(() => {
        var sIds = this.selectedItems.map(function (item) {
          return item.id
        })
        var url = isNot ? api.batchSetNotCheckedDealer : api.batchSetCheckedDealer
        this.$http.post(url, sIds).then(response => {
          if (response.status === 200) {
            this.$notify({ title: '成功', message: '' + title + '成功！', type: 'success' })
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
    },
    openDealerSellStore (parentId) {
      // console.log(parentId)
      // this.$router.go({name: 'antiChannelConflict-sellStore-list2', params: {pid: '-' + parentId}})
      // this.$router.go('/antichannelconflict/dealer/sellStorelist/-' + parentId)
      // this.$router.push({path: '/antichannelconflict/dealer/sellStorelist/-' + parentId})
      this.$router.push({path: '/antichannelconflict/dealer/sellStorelist'})
    },
		refresh() {
			this.reload();
		}
  },
  mounted () {
    this.getList()
    var requireComponents = require.context('./', true, /\.vue/)
    requireComponents.keys().forEach(fileName => {
    //  console.log(fileName)
      // var reqCom = requireComponents(fileName)
    // var reqComName = fileName.split('/')[1]
    // Vue.component(reqComName, reqCom.default || reqCom)
    })
  // this.headers['access-token'] = this.$store.state.account.access_token
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
.el-card__body .searchCon{
  height:63px;
}
.el-button {
  margin-left: 5px;
}
</style>
<style>
.el-card__body .searchCon .el-input{
  width:auto;
}
</style>
