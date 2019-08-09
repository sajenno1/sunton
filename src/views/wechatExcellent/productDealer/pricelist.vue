<template>
  <div>
    <el-dialog title="产品经销商价格" :visible.sync="show" width="40%" :close="this.$emit('getList')">
      <div class="table-container">
        <el-table
          :data="list"
          border
          style="width: 100%;">

          <el-table-column
            label="等级值"
            width="80"
            prop="level">
          </el-table-column>

          <el-table-column
            label="经销商等级"
            prop="title">
          </el-table-column>

          <el-table-column
            label="默认经销价格">
            <template slot-scope="scope">
              <div>
                <span v-if="scope.row.isEdit">
                  <el-input v-model="scope.row.dealerPrice"></el-input>
                </span>
                <span v-else>
                  {{ scope.row.dealerPrice }}
                </span>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
            width="200"
            align="center">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.isEdit"
                size="mini"
                type="success"
                @click="handleSave(scope.$index, scope.row)">保存</el-button>
              <el-button
                v-else
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="handleSkuPrice(scope.$index, scope.row)">Sku</el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>
    </el-dialog>
    <div>
        <sku-price-list
          ref="setskudealprice"
          @getList="getList"
          />
      </div>
  </div>
</template>

<script>
import * as api from '../../../api'
import skuPriceList from './skupricelist'
import Vue from 'Vue'
export default {
  name: 'products-product-sku',
  components: { skuPriceList },
  data () {
    return {
      show: false,
      list: [],
      product: {}
    }
  },
  methods: {
    async open (row) {
      this.show = true
      this.product = row
      this.list = []
      await this.getList()
    },
    async getList () {
      await this.$http.post(api.dealerLevelAllList).then(res => {
        this.list = res.data.map(x => {
          x.isEdit = false
          x.dealerLevelId = x.id
          return x
        })
        this.getDefaultPrice()
      })
    },
    async getDefaultPrice () {
      await this.$http.post(api.weChatExcellentProductDealerDefaultPriceList, { id: this.product.id }).then(res => {
        this.list.forEach((item, index) => {
          res.data.map(x => {
            if (x.dealerLevel.id === item.id) {
              Vue.set(item, 'dealerPrice', x.dealerPrice)
            }
          })
        })
      })
    },
    handleEdit (index, row) {
      row.isEdit = true
    },
    handleSkuPrice (index, row) {
      this.$refs.setskudealprice.open(this.product.id, row)
    },
    handleSave (index, row) {
      let data = {
        productId: this.product.id,
        dealerPrice: row.dealerPrice,
        isDefault: true,
        dealerLevelId: row.dealerLevelId
      }
      this.$http.post(api.weChatExcellentProductDealerPriceEdit, data).then(res => {
        this.$notify.success({ title: '成功', message: '保存成功' })
        row.isEdit = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  margin-top: 10px;
}
</style>

