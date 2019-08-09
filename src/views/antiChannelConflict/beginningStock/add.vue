<template>
  <div>
    <el-dialog :visible.sync="show" width="40%">
      <el-form :model="form" label-width="120px" style="padding-right:5%;">

        <el-form-item label="仓库">
          <el-select v-model="form.warehouseId" placeholder="请选择">
            <el-option
              v-for="item in warehouseList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="产品">
          <el-button size="small" type="primary" icon="el-icon-plus" @click="openSelectedSKU">添加</el-button>
          <el-table
            :data="productList"
            border
            style="width: 100%; margin-top: 10px;">

            <el-table-column
              label="产品名称"
              prop="name">
            </el-table-column>

            <el-table-column
              label="SKU"
              prop="propertyNames">
            </el-table-column>            

            <el-table-column
              label="数量">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.count" :min="1" size="small" ></el-input-number>
              </template>
            </el-table-column>

            <el-table-column
              label="操作"
              width="80"
              align="center">
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  size="mini"
                  @click="handleDelProduct(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="show = false">取 消</el-button>
        <el-button size="small" type="primary" @click="create">确 定</el-button>
      </div>

      <div>
        <selected-SKU ref="selectedSKU" @selectedSku="handleselectedSKU"/>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
import selectedSKU from './selectedSKU'
export default {
  name: 'antiChannelConflict-inStock-add',
  components: { selectedSKU },
  data () {
    return {
      show: false,
      no: '',
      form: {},
      warehouseList: [],
      pageParams: {
        page: 1,
        pageSize: 1000
      },
      pdaAccountList: [],
      productList: [],
      sellAreaList: [],
      dealerName: ''
    }
  },
  methods: {
    open () {
      this.form = {}
      this.warehouseList = []
      this.pdaAccountList = []
      this.productList = []
      this.sellAreaList = []
      this.dealerName = ''
      this.show = true
      this.getWarehouseList()
    },
    getWarehouseList () {
      this.$http.post(api.warehouseList, this.pageParams).then(res => {
        this.warehouseList = res.data.rows
      })
    },
    create () {
      this.form.items = this.productList.map(x => {
        return {
          productId: x.id,
          QTY: x.count,
          productSkuId: x.productSkuId,
          warehouseId: this.form.warehouseId

        }
      })

      this.$http.post(api.addBeginStock, this.form).then(res => {
        this.show = false
        this.$emit('getList')
        this.$notify.success({ title: '成功', message: '添加成功' })
      })
    },
    openSelectedSKU () {
      this.$refs.selectedSKU.open()
    },
    handleDelProduct (index, row) {
      this.productList.splice(index, 1)
    },
    handleselectedSKU (row) {
      for (let sku in row.skuList) {
        this.productList.push({
          id: row.productId,
          name: row.productName,
          count: 1,
          propertyNames: row.skuList[sku].propertyNames,
          productSkuId: row.skuList[sku].id
        })
      }
    }
  }
}
</script>

<style>

</style>
