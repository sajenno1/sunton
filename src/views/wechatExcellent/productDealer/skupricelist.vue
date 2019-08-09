<template>
  <div>
    <el-dialog title="产品SKU经销价" :visible.sync="show" width="40%">
      <div class="table-container">
        <el-table
          :data="list"
          border
          style="width: 100%;">

          <el-table-column
            v-for="(item, index) in columns"
            :key="item"
            :label="item">
            <template slot-scope="scope">
              <span>{{ scope.row.sku[index].valueName }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="经销价">
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
            width="180">
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
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">清空</el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
import Vue from 'Vue'
export default {
  name: 'wechatExcellent-productDealer-skuprice',
  data () {
    return {
      show: false,
      list: [],
      productId: '',
      columns: [],
      data: {}
    }
  },
  methods: {
    async open (productId, row) {
      this.show = true
      this.data = row
      this.list = []
      this.productId = productId
      await this.getList()
    },
    async getList () {
      await this.$http.post(api.productSkuList, { id: this.productId }).then(res => {
        this.list = res.data.map(x => {
          let arr = x.propertyNames.split(';')
          x.sku = arr.map(v => {
            return {
              propertyName: v.split(':')[0],
              valueName: v.split(':')[1]
            }
          })
          x.isEdit = false
          return x
        })
        this.getColumn()
        this.getSkuPrice()
      })
    },
    async getColumn () {
      if (!this.list.length) {
        return
      }
      this.columns = this.list[0].sku.map(x => x.propertyName)
    },
    async getSkuPrice () {
      await this.$http.post(api.weChatExcellentProductDealerSkuPriceList, { productId: this.productId, dealerLevelId: this.data.id }).then(res => {
        this.list.forEach((item, index) => {
          res.data.map(x => {
            if (x.skuId === item.id) {
              Vue.set(item, 'dealerPrice', x.dealerPrice)
            }
          })
        })
      })
    },
    handleEdit (index, row) {
      row.isEdit = true
    },
    handleSave (index, row) {
      let data = {
        productId: this.productId,
        dealerPrice: row.dealerPrice,
        isDefault: false,
        dealerLevelId: this.data.dealerLevelId,
        productSkuId: row.id
      }
      this.$http.post(api.weChatExcellentProductDealerPriceEdit, data).then(res => {
        this.$notify.success({ title: '成功', message: '保存成功' })
        row.isEdit = false
      })
    },
    handleDelete (index, row) {
      this.$confirm('确定清空该Sku经销价吗？').then(() => {
        let data = {
          productId: this.productId,
          dealerLevelId: this.data.dealerLevelId,
          productSkuId: row.id
        }
        this.$http.post(api.weChatExcellentProductDealerPriceDelete, data).then(res => {
          Vue.set(row, 'dealerPrice', '')
          this.getSkuPrice()
          this.$notify({ title: '成功', message: '删除成功', type: 'success' })
        })
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

