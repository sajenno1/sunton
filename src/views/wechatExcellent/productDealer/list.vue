<template>
  <div>
    <el-card>
      <div slot="header">
        <span>产品列表</span>
      </div>
      <div class="searchCon clearfix">
        <el-input v-model="name" placeholder="请输入名称"></el-input>

        <el-input v-model="no" placeholder="请输入编号"></el-input>

        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
 
        <el-button class="right" size="small" type="primary" icon="el-icon-plus" @click="openCreate">添加</el-button>
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
            label="图片">
            <template slot-scope="scope">
              <img v-if="scope.row.photo" :src="scope.row.photo" :alt="scope.row.name" style="max-width: 64px; max-height: 64px;">
            </template>
          </el-table-column>

          <el-table-column
            label="品牌"
            prop="brandName">
          </el-table-column>

          <el-table-column
            label="编号"
            prop="no">
          </el-table-column>

          <el-table-column
            label="名称"
            prop="name" width="160">
          </el-table-column>

          <el-table-column
            label="单位"
            prop="unit" width="60" align="center">
          </el-table-column>

          <el-table-column
            label="规格"
            prop="specification" align="center">
          </el-table-column>

          <el-table-column
            label="价格" align="center" v-if="false">
            <template slot-scope="scope">
              <div class="alignRight fontRed">
                <span>{{ scope.row.price | UnsignedCurrency }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="消费的积分" align="center">
            <template slot-scope="scope">
              <div class="alignRight">
                <span>{{ scope.row.customeIntegral }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="会员获得积分" align="center">
            <template slot-scope="scope">
              <div class="alignRight">
                <span>{{ scope.row.rewardIntegral }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="销售员获得积分" width="120" align="center">
            <template slot-scope="scope">
              <div class="alignRight">
                <span>{{ scope.row.sellRewardIntegral }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="防窜库存"
            prop="scanQuota" align="center">
          </el-table-column>

          <el-table-column
            label="创建时间"
            align="center" width="220">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="250" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleSetDealerPrice(scope.$index, scope.row)">设置经销价</el-button>
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
      <div>
        <product-dealprice-list
          ref="setdealprice"
          @getList="getList"
          />
        <product-dealprice-add
          ref="add"
          @getList="getList"
          />
      </div>
    </el-card>
  </div>
</template>

<script>
import * as api from '../../../api'
import productDealpriceList from './pricelist'
import productDealpriceAdd from './productlist'
export default {
  name: 'wechatexcellent-productdealer-list',
  components: { productDealpriceList, productDealpriceAdd },
  data () {
    return {
      list: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      name: '',
      no: '',
      headers: {}
    }
  },
  methods: {
    getList () {
      this.$http.post(api.weChatExcellentProductDealerPriceList, {
        page: this.currentPage,
        pageSize: this.pageSize,
        name: this.name,
        no: this.no,
        isExists: true
      }).then(res => {
        this.list = res.data.rows
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
    handleSetDealerPrice (index, row) {
      this.$refs.setdealprice.open(row)
    },
    search () {
      this.currentPage = 1
      this.total = 0
      this.getList()
    },
    openCreate () {
      this.$refs.add.open()
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
