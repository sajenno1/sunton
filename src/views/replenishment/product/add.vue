<template>
  <div>
    <el-dialog title="添加商品" :visible.sync="show" width="40%">
      <el-form :model="form" label-width="120px" style="padding-right:5%;">

        <el-form-item label="产品">
          <el-input v-model="form.name" readonly>
            <el-button type="primary" slot="append" @click="openSelectedDialog">选择产品</el-button>
          </el-input>
        </el-form-item>

        <el-form-item label="价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>

        <el-form-item label="市场价">
          <el-input v-model="form.marketPrice"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="create">确 定</el-button>
      </div>

      <div>
        <selected-product ref="selected" @selected="handleSelected"/>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
import selectedProduct from './selectedProduct'
export default {
  name: 'replenish-product-add',
  components: { selectedProduct },
  data () {
    return {
      show: false,
      form: {}
    }
  },
  methods: {
    open () {
      this.form = {
        name: ''
      }
      this.show = true
    },
    create () {
      this.$http.post(api.addReplenishProduct, this.form).then(res => {
        this.$emit('getList')
        this.show = false
        this.$notify({ title: '成功', message: '添加成功！', type: 'success' })
      })
    },
    openSelectedDialog () {
      this.$refs.selected.open()
    },
    handleSelected (val) {
      this.form.name = val.name
      this.form.productId = val.id
    }
  }
}
</script>

<style>

</style>
