<template>
  <div>
    <el-dialog title="等级价格" :visible.sync="show" width="65%">

      <!--<div>
        <el-button style="margin-bottom: 20px; float: right;" size="small" type="primary" icon="el-icon-plus" @click="openAddDialog">添加</el-button>
      </div>-->

      <div class="table-container">
        <el-table
          :data="list"
          border
          style="width: 100%;">

          <el-table-column
            type="selection"
            width="55"
            align="center">
          </el-table-column>

          <!--<el-table-column
            label="SkuId"
            width="80">
            <template slot-scope="scope">
              <span style="overflow: hidden; text-overflow:ellipsis; white-space: nowrap;">{{ scope.row.id }}</span>
            </template>
          </el-table-column>-->

          <el-table-column
            label="经销商等级">
            <template slot-scope="scope">
              <div>
                <span>
                  {{ scope.row.dealerLevelName }}
                </span>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="价格">
            <template slot-scope="scope">
              <div>
                <span>
                  {{ scope.row.price }}
                </span>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="折扣">
            <template slot-scope="scope">
              <div>
                <span v-if="scope.row.isEdit">
                  <el-input v-model="scope.row.favourable" style="width:50%"></el-input>%
                </span>
                <span v-else>
                  {{ scope.row.favourable }}%
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
              <!--<el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
            </template>
          </el-table-column>

        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import addSku from './addSku'
import * as api from '../../../api'
export default {
  name: 'products-product-sku',
  components: { addSku },
  data () {
    return {
      show: false,
      list: [],
      row: {},
      columns: [],
      data: [],
      productPrice: 0
    }
  },
  methods: {
    async open (row) {
      this.show = true
      this.row = row
      this.list = []
      this.productPrice = 0
      await this.getProductLevelPrice(row.id)
      await this.getProductPrice(row.id)
    },
    async getProductLevelPrice (id) {
      await this.$http.post(api.productLevelPriceInfo, { productId: id }).then(res => {
        this.list = res.data.rows.map(x => {
          x.isEdit = false
          return x
        })
      })
    },
    async getProductPrice (id) {
      await this.$http.post(api.productInfo, { id: id }).then(res => {
        this.productPrice = res.data.price
      })
    },
    handleEdit (index, row) {
      row.isEdit = true
    },
    handleSave (index, row) {
      row.price = this.productPrice * (row.favourable / 100)
      this.$http.post(api.editProductLevelPrice, row).then(res => {
        this.$notify.success({ title: '成功', message: '保存成功' })
        row.isEdit = false
      })
    }
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  margin-top: 10px;
}
</style>

