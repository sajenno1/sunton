<template>
  <div>
    <el-card>
      <div slot="header">
        <span>渠道充值记录</span>
      </div>
      <div class="searchCon clearfix">
        <!-- <el-input v-model="searchData.address" placeholder="请输入地址"></el-input>
        <el-button size="small" type="primary" icon="el-icon-search" v-on:click="doSearch">搜索</el-button>
        <el-button class="right" size="small" type="primary" icon="el-icon-plus" v-on:click="openCreate">添加</el-button> -->
        <div class="left">
          <el-date-picker v-model="searchData.createDate1"
            type="date"
            placeholder="选择开始日期"></el-date-picker>
          <el-date-picker v-model="searchData.createDate2"
            type="date"
            placeholder="选择结束日期"></el-date-picker>
            <el-select v-model="searchData.type" placeholder="请选择充值类型">
              <el-option
                v-for="item in rechargeType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          <el-button size="small" type="primary" icon="el-icon-search" v-on:click="doSearch">搜索</el-button>
        </div>
        <div class="right">
          <el-button size="small" type="primary" icon="el-icon-sold-out" v-on:click="doExport">导出</el-button>
        </div>
      </div>
      <div class="table-container">
        <el-table
          :data="list"
          border
          style="width: 100%">

          <!-- <el-table-column
            type="selection"
            width="55">
          </el-table-column> -->

          <el-table-column label="流水号"
            width="170"
            prop="no">
          </el-table-column>

          <el-table-column label="经销商"
            width="170"
            prop="dealerName">
          </el-table-column>

          <el-table-column
            label="充值日期"
            width="100"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.rechargeDate | FormattersDate }}</span>
            </template>
          </el-table-column>

          <!--<el-table-column label="备注说明"
            prop="description">
          </el-table-column>-->

          <el-table-column label="充值类型" width="80">
            <template slot-scope="scope">
              <span>{{ getRechargeType(scope.row.rechargeType) }}</span>
            </template>
          </el-table-column>

          <el-table-column label="提交金额" width="110">
            <template slot-scope="scope">
              <div style='color:#333;font-size:16px'>{{ scope.row.amount | Currency}}</div>
            </template>
          </el-table-column>

          <el-table-column label="状态" width="80">
            <template slot-scope="scope">
              <span>{{ getStatusText(scope.row.status) }}</span>
            </template>
          </el-table-column>

          <el-table-column label="审核时间" width="100">
            <template slot-scope="scope">
              <!-- <span>{{ formatTime(scope.row.checkedDateTime) }}</span> -->
              <span>{{ scope.row.checkedDateTime | FormattersDate }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作员" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.managerUserName }}</span>
            </template>
          </el-table-column>

          <el-table-column label="图片" width="80">
            <template slot-scope="scope">
              <div><img style="width:50px;height:50px;" v-bind:src="scope.row.photo" v-on:click="showImage(scope.row.photo)"/></div>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" 
                v-on:click="detail(scope.$index, scope.row)">详情</el-button>
              <el-button size="mini" type="primary" v-show="scope.row.status=='Unchecked'"
                v-on:click="doSetChecked(scope.$index, scope.row)">审核</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="page-container" v-if="searchData.total > searchData.pageSize">
        <el-pagination
          v-on:size-change="handleSizeChange"
          v-on:current-change="handleCurrentChange"
          layout="prev, pager, next, sizes, total"
          :total="searchData.total">
        </el-pagination>
      </div>

      <div>
        <!-- <recharge-add ref="add" v-on:getList="getList"></recharge-add> -->
        <!-- <userAddress-edit ref="edit" v-on:getList="getList"></userAddress-edit> -->
        <recharge-detail ref="detail" v-on:getList="getList"></recharge-detail>
      </div>
    </el-card>
    <div>
   <el-dialog
      width="60%"
      title=""
      :visible.sync="innerVisible"
      append-to-body>
      <div><img style="width:95%;height:95%;" v-bind:src="image"/></div>
    </el-dialog>
  </div>
  </div>
</template>

<script>
import * as api from '../../../api'
// import rechargeAdd from './add'
// import userAddressEdit from './edit'
import rechargeDetail from './detail'
export default {
  name: 'mall-recharge-outerlist',
  components: { rechargeDetail }, // rechargeAdd
  data () {
    return {
      searchData: {
        page: 1,
        pageSize: 10,
        total: 0,
        createDate1: '',
        createDate2: '',
        type: ''
      },
      list: [],
      image: '',
      innerVisible: false,
      rechargeType: [{
        value: 'BankCard',
        label: '银行卡'
      }, {
        value: 'Alipay',
        label: '支付宝'
      }, {
        value: 'WeChat',
        label: '微信'
      }]
      // name: '',
      // no: '',
      // uploadUrl: this.$http.defaults.baseURL + api.importMallProducts,
      // headers: {}
    }
  },
  methods: {
    getList () {
      this.searchData.createDate1 = this.$common.timeChange(this.searchData.createDate1)
      this.searchData.createDate2 = this.$common.timeChange(this.searchData.createDate2)
      this.$http.post(api.mallRechargeRecordOuterList, this.searchData).then(res => {
        this.list = res.data.rows
        this.searchData.total = res.data.total
      })
    },
    getStatusText (status) {
      switch (status) {
        case 'Unchecked': return '待审核'
        case 'Checked': return '已审核'
        case 'Reject': return '已驳回'
      }
      return ''
    },
    getRechargeType (type) {
      switch (type) {
        case 'BankCard': return '银行卡'
        case 'Alipay': return '支付宝'
        case 'WeChat': return '微信'
      }
      return ''
    },
    formatDate (date1) {
      return this.$common.formatDate(date1)
    },
    formatTime (date1) {
      return this.$common.formatTime(date1)
    },
    handleSizeChange (val) {
      this.searchData.pageSize = val
      this.searchData.page = 1
      this.getList()
    },
    handleCurrentChange (val) {
      this.searchData.page = val
      this.getList()
    },
    handleDelete (index, row) {
      this.$confirm('确定删除吗？')
        .then(() => {
          // this.$http.post(api.delUserAddress, { id: row.id }).then(res => {
          //   this.getList()
          //   this.$notify({ title: '成功', message: '删除成功！', type: 'success' })
          // })
          console.log(121)
        })
        .catch(() => {})
    },
    // openCreate () {
    //   this.$refs.add.open()
    // },
    doSearch () {
      this.searchData.page = 1
      this.searchData.total = 0
      this.getList()
    },
    showImage (img) {
      this.image = img
      this.innerVisible = true
    },
    detail (index, row) {
      this.$refs.detail.open(row)
    },
    doSetChecked (index, row) {
      this.$confirm('确定要审核吗').then(() => {
        this.$http.post(api.mallRechargeSetChecked, {id: row.id}).then(() => {
          this.$notify({ title: '成功', message: '审核成功！', type: 'success' })
          this.getList()
        })
      }).catch(() => {})
    },
    doExport () {
      this.$http.post('/Admin/Mall/ExportOuterList', {}
      , {responseType: 'arraybuffer'}).then((res) => {
        let fileName = '渠道充值记录.xls'
        let blob = new Blob([res.data], { type: 'application/x-xls' })
        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob, fileName)
        } else {
          var link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = fileName
          link.click()
          window.URL.revokeObjectURL(link.href)
        }
      })
    }
  },
  mounted () {
    this.innerVisible = false
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
