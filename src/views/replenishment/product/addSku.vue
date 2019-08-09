<template>
  <div>
    <el-dialog title="添加Sku" :visible.sync="show" width="60%" append-to-body>
      <el-form :model="skus" style="padding-right:5%;">

        <el-form-item v-for="item in list" :key="item.name" :label="item.name" :label-width="formLabelWidth">
          <el-checkbox-group v-model="skus[item.id]">
            <el-checkbox
              v-for="value in item.items"
              :key="value.id"
              :label="value.id"
              :disabled="value.disabled"
              :checked="value.disabled">{{ value.nameAlias }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="create">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'replenish-product-addSku',
  data () {
    return {
      show: false,
      row: {},
      list: [],
      skus: {},
      formLabelWidth: '120px',
      ids: []
    }
  },
  props: ['valueIds'],
  methods: {
    open (row) {
      this.show = true
      this.list = []
      this.row = row
      this.skus = {}
      this.getList()
    },
    getList () {
      this.$http.post(api.getProductPropertyCategoryPropertyVaules, {
        id: this.row.product.productPropertyCategoryId,
        isSaleProp: true
      }).then(res => {
        // let set = new Set()
        // this.valueIds.map(x => {
        //   x.map(v => {
        //     set.add(v)
        //   })
        // })
        // this.ids = [...set]
        // this.list = res.data.map(x => {
        //   x.items = x.items.map(v => {
        //     v.disabled = this.ids.findIndex(a => a === v.id) >= 0
        //     return v
        //   })
        //   return x
        // })
        // console.log(this.list)

        this.list = res.data
        let obj = {}
        res.data.map(x => {
          obj[x.id] = []
        })
        this.skus = obj
      })
    },
    create () {
      let form = {}
      form.productId = this.row.id
      form.skus = []
      for (var item in this.skus) {
        form.skus.push({
          propertyId: item,
          valueIds: this.skus[item].map(x => {
            return {
              propertyId: item,
              valueId: x
            }
          })
        })
      }

      this.$http.post(api.addReplenishProductSku, form).then(res => {
        this.$emit('getList')
        this.show = false
        this.$notify({ title: '添加成功', message: `成功添加${res.data.count}条Sku.`, type: 'success' })
      })
    }
  }
}
</script>

<style>

</style>
