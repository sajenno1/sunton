<template>
  <div>
    <el-card>
      <div slot="header">
        <span>我的充值记录</span>
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
          <el-button size="small" type="primary" icon="el-icon-plus" v-on:click="doAddRecharge">添加</el-button>
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
            prop="no">
          </el-table-column>

          <el-table-column
            label="充值日期"
            align="center" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.rechargeDate | FormattersDate }}</span>
            </template>
          </el-table-column>

          <!--<el-table-column label="备注说明"
            prop="description">
          </el-table-column>-->

          <el-table-column label="充值类型">
            <template slot-scope="scope">
              <span>{{ getRechargeType(scope.row.rechargeType) }}</span>
            </template>
          </el-table-column>

          <el-table-column label="提交金额">
            <template slot-scope="scope">
              <div style='color:#333;font-size:16px'>{{ scope.row.amount | Currency}}</div>
            </template>
          </el-table-column>

          <el-table-column label="图片">
            <template slot-scope="scope">
              <div><img style="width:150px;height:100px;" v-bind:src="scope.row.photo" v-on:click="showImage(scope.row.photo)"/></div>
            </template>
          </el-table-column>

          <el-table-column label="状态">
            <template slot-scope="scope">
              <span>{{ getStatusText(scope.row.status) }}</span>
            </template>
          </el-table-column>

          <el-table-column label="审核时间">
            <template slot-scope="scope">
              <span>{{ formatTime(scope.row.checkedDateTime) }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="150" align="center">
            <template slot-scope="scope">
              <!-- <el-button size="mini" type="danger"
                v-on:click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
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
export default {
  name: 'mall-recharge-minelist',
  components: { }, // rechargeAdd
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
      this.$http.post(api.mallRechargeRecordMineList, this.searchData).then(res => {
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
    showImage (img) {
      this.image = img
      this.innerVisible = true
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
    doAddRecharge () {
      this.$router.push('./add')
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
