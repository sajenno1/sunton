<template>
  <div>
    <el-card>
      <div slot="header">
        <span>流水账</span>
      </div>
      <div class="searchCon clearfix">
        <!-- 
        
        <el-button class="right" size="small" type="primary" icon="el-icon-plus" v-on:click="openCreate">添加</el-button> -->
        <div class="left">
          <el-input v-model="searchData.adminUserName" placeholder="经销商用户名"></el-input>
          <el-select v-model="searchData.isInto" placeholder="请选择">
            <el-option v-for="(item,i) in isIntoItems" v-bind:label="item.name" v-bind:value="item.id" v-bind:key="i"></el-option>
          </el-select>
          <el-date-picker v-model="searchData.createDate1"
            type="date"
            placeholder="选择开始日期"></el-date-picker>
          <el-date-picker v-model="searchData.createDate2"
            type="date"
            placeholder="选择结束日期"></el-date-picker>
          <el-button size="small" type="primary" icon="el-icon-search" v-on:click="doSearch">搜索</el-button>
        </div>
        <div class="right">
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

          <el-table-column label="经销商"
            width="160"
            prop="adminDisplayName">
          </el-table-column>

          <el-table-column label="操作管理员"
            width="160"
            prop="checkedAdminDisplayName">
          </el-table-column>

          <!-- <el-table-column label="提交金额">
            <template slot-scope="scope">
              {{ scope.row.isInto ? '转入' : '转出' }}
            </template>
          </el-table-column> -->

          <el-table-column label="相关流水号"
            width="230"
            prop="aboutNo">
          </el-table-column>

          <el-table-column
            width="150"
            label="创建时间">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDate }}</span>
            </template>
          </el-table-column>

          <!-- <el-table-column label="备注说明"
            prop="orderRemark">
          </el-table-column> -->

          <el-table-column label="金额" width="150">
            <template slot-scope="scope">
              <div v-bind:style="{'color':scope.row.intoFlag=='-1'?'#ff0000':'#00b700'}" style='font-size:16px'>{{ (scope.row.intoFlag*scope.row.amount) | Currency}}</div>
            </template>
          </el-table-column>

          <el-table-column label="余额" width="150">
            <template slot-scope="scope">
              <div>{{ (scope.row.balance) | Currency}}</div>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <div> </div>
            </template>
          </el-table-column>

          <!-- <el-table-column label="审核时间">
            <template slot-scope="scope">
              <span>{{ scope.row.checkedDateTime }}</span>
            </template>
          </el-table-column> -->

          <!-- <el-table-column label="操作" width="300" align="center">
            <template slot-scope="scope">
            </template>
          </el-table-column> -->
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
        createDate2: ''
      },
      list: [],
      isIntoItems: [
        {id: '', name: '[转入转出]'},
        {id: 'true', name: '转入'},
        {id: 'false', name: '转出'}
      ]
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
      this.$http.post(api.mallWaterAccountList, this.searchData).then(res => {
        this.list = res.data.rows
        this.searchData.total = res.data.total
      })
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
    } // ,
    // timeChange (dateString, formdate) {
    //   dateString = dateString || ''
    //   if (dateString === '') return ''
    //   // new Date('');传入毫秒数,也可以得到普通的时间,再对date处理
    //   // var date = new Date(parseInt(dateString))
    //   var date = new Date(dateString)
    //   formdate = formdate || 'yyyy-mm-dd HH:mm'
    //   // 获取年份,月份,天数,小时数,分钟数,小于10的显示01-09
    //   var year = date.getFullYear()
    //   var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    //   var currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    //   var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    //   var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    //   switch (formdate) {
    //     case 'yyyy-mm-dd HH:mm': return year + '-' + month + '-' + currentDate + ' ' + hours + ':' + minutes
    //     case 'yyyy-mm-dd': return year + '-' + month + '-' + currentDate
    //     case 'mm-dd': return month + '-' + currentDate
    //     case 'HH:mm': return hours + ':' + minutes
    //   }
    //   return ''
    // }
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
