<template>
  <div>
    <el-card>
      <div slot="header">
        <span>退货退款列表</span>
      </div>
      
      <div class="searchCon clearfix">         
        <div class="left">
          <el-input v-model="searchData.no" size="small" placeholder="请输入编号"></el-input>
          <el-date-picker v-model="searchData.createDate1"
            type="date"
            placeholder="选择开始日期"></el-date-picker>
          <el-date-picker v-model="searchData.createDate2"
            type="date"
            placeholder="选择结束日期"></el-date-picker>
          <el-button type="primary" size="small" v-on:click="doSearch" icon="el-icon-search">搜索</el-button>
        </div>
        <div class="right">
          <span style="display: inline-block;">
          </span>
        </div>
      </div>
      <el-tabs v-model="currentTabName" v-on:tab-click="tabsClick" type='card'>
        <el-tab-pane label="全部" name="All"></el-tab-pane>
        <el-tab-pane label="新申请" name="BuyerApplyFundGoods"></el-tab-pane>
        <el-tab-pane label="退款成功" name="SellerBackFundGoodsSuccess"></el-tab-pane>
        <el-tab-pane label="退款失败" name="SellerBackFundGoodsFail"></el-tab-pane>
      </el-tabs>
      <div class="table-container">
        <el-table v-bind:data="list" style="width: 100%;">

          <el-table-column label="订单号" width="170px" prop="no">
          </el-table-column> 
          <el-table-column label="经销商" width="150" prop="dealerName">
          </el-table-column>

         <!-- <el-table-column label="商品款数" align="center" width="120px" prop="productNoCount">
          </el-table-column> -->

          <el-table-column label="商品总数" align="center" width="120px" prop="productAllQuantity">
          </el-table-column>

          <el-table-column label="退款金额" width="120px" align="right">
            <template slot-scope="scope">
              <span class="table-money">{{ scope.row.applyAmount | Currency }}</span>
            </template>
          </el-table-column>

          <el-table-column label="状态" align="center" width="120px">
            <template slot-scope="scope">
              <div>{{getStatusText(scope.row.status)}}</div>
            </template>
          </el-table-column>

          <el-table-column label="退款原因" align="center" width="120px" prop="applyReason">
          </el-table-column>

          <el-table-column label="审核人" align="center" width="120px" prop="manageName">
          </el-table-column>

          <el-table-column label="申请时间" align="center" width="130">
            <template slot-scope="scope">
              <span>{{ scope.row.applyDate | FormattersDate }}</span>
            </template>
          </el-table-column>

          <!-- <el-table-column label="创建时间" align="center" width="130">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDate }}</span>
            </template>
          </el-table-column> -->

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button  type="text" v-on:click="showDetail(scope.$index, scope.row)">详情</el-button>
              <el-dropdown>
                <el-button type="text" class="more" v-show="getStatusText(scope.row.status)==='新申请' || getStatusText(scope.row.status)==='买家已发货'">...</el-button>
                <el-dropdown-menu slot="dropdown" >
                  <el-dropdown-item v-show="getStatusText(scope.row.status)==='新申请'" v-on:click.native="changeStatus(scope.row.id, 'SellerAgreeShip', '同意退货')">同意退货</el-dropdown-item>
                  <el-dropdown-item v-show="getStatusText(scope.row.status)==='新申请'" v-on:click.native="setChangeId(scope.row)">拒绝</el-dropdown-item>
                  <el-dropdown-item v-show="getStatusText(scope.row.status)==='买家已发货'" v-on:click.native="changeStatus(scope.row.id, 'SellerBackFundGoodsSuccess', '完成退款')">确定退款</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>

        </el-table>
      </div>

      <div class="page-container" v-if="searchData.total > searchData.pageSize">
        <el-pagination v-on:size-change="handleSizeChange" v-on:current-change="handleCurrentChange"
          layout="prev, pager, next, sizes, total" v-bind:total="searchData.total">
        </el-pagination>
      </div>

      <div>
        <detail ref="detail" v-on:getList="getList"/>
      </div>
      <el-dialog title="请填写拒绝的原因" :visible.sync="dialogFormVisible">
        <el-form>
            <el-form-item label="拒绝原因" :label-width="formLabelWidth">
            <el-input v-model="rejectReason" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="rejectStatus">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>


<script>
import * as api from '../../../api'
import detail from './detail'
export default {
  name: 'mall-backFundGoodsOrder-list',
  components: { detail },
  data () {
    return {
      list: [],
      currentTabName: 'All',
      searchData: {
        pageSize: 10,
        page: 1,
        total: 0,
        no: '',
        status: '',
        createDate1: '',
        createDate2: ''
      },
      rejectReason: '',
      dialogFormVisible: false,
      formLabelWidth: '120px',
      rejectId: null
    }
  },
  methods: {
    getList () {
      this.searchData.createDate1 = this.$common.timeChange(this.searchData.createDate1)
      this.searchData.createDate2 = this.$common.timeChange(this.searchData.createDate2)
      this.$http.post(api.mallBackFundGoodsOrderList, this.searchData).then(res => {
        this.list = res.data.rows
        this.searchData.total = res.data.total
      })
    },
    tabsClick (tab, event) {
      var tabkey = tab.name
      this.searchData.status = tabkey === 'All' ? '' : tabkey
      this.doSearch()
    },
    showDetail (index, row) {
      this.$refs.detail.open(row.id)
    },
    setStatusToChecked (index, row) {
      this.$http.post(api.mallChannelOrderSetStatusToChecked, {id: row.id}).then(res => {
        this.$notify({ title: '成功', message: '订单审核成功！', type: 'success' })
        this.doSearch()
      })
    },
    setChangeId (row) {
      this.rejectId = row.id
      this.dialogFormVisible = true
    },
    rejectStatus () {
      this.dialogFormVisible = false
      this.changeStatus(this.rejectId, 'SellerBackFundGoodsFail', '拒绝')
    },
    changeStatus (id, status, title) {
      if (status === 'SellerBackFundGoodsSuccess') {
        this.rejectReason = ''
      }
      this.$confirm('确定要 ' + title + ' 该退货订单吗？')
        .then(() => {
          this.$http.post(api.mallBackFundGoodsChangeStatus, {id: id, status: status, content: this.rejectReason}).then(res => {
            if (status === 'SellerBackFundGoodsSuccess') {
              this.$notify({ title: '成功', message: '退款审核通过成功！', type: 'success' })
            }
            if (status === 'SellerBackFundGoodsFail') {
              this.$notify({ title: '成功', message: '退款审核拒绝成功！', type: 'success' })
            }
            this.doSearch()
          })
        })
        .catch(() => {})
    },
    getStatusText (status) {
      switch (status) {
        // case 'Paying': return '待付款'
        case 'BuyerApplyFundGoods': return '新申请'
        case 'BuyerCancel': return '用户取消'
        case 'SellerBackFundGoodsSuccess': return '退款成功'
        case 'SellerBackFundGoodsFail': return '退款失败'
        case 'SellerAgreeShip': return '卖家已同意退款'
        case 'BuyerShip': return '买家已发货'
      }
      return ''
    },
    doSearch () {
      this.searchData.page = 1
      this.searchData.total = 0
      this.getList()
    },
    handleSizeChange (val) {
      this.searchData.pageSize = val
      this.searchData.page = 1
      this.getList()
    },
    handleCurrentChange (val) {
      this.searchData.page = val
      this.getList()
    }
  },
  mounted () {
    this.doSearch()
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
.table-money {
color: #ef4f4f;

}
.more{
  position: relative;
  margin-left: 5px
}
.more>span{
  position: absolute!important;
  top: -4px!important
}
</style>
