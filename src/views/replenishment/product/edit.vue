<template>
  <div>
    <el-dialog title="编辑商品" :visible.sync="show" width="40%">
      <el-form :model="form" label-width="120px" style="padding-right:5%;">

        <el-form-item label="产品">
          <el-input v-model="form.productName" readonly></el-input>
        </el-form-item>

        <el-form-item label="价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>

        <el-form-item label="市场价">
          <el-input v-model="form.marketPrice"></el-input>
        </el-form-item>

        <el-form-item label="消费的积分">
          <el-input v-model="form.customeIntegral"></el-input>
        </el-form-item>

        <el-form-item label="会员获得积分">
          <el-input v-model="form.rewardIntegral"></el-input>
        </el-form-item>

        <el-form-item label="销售员获得积分">
          <el-input v-model="form.sellRewardIntegral"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'replenish-product-add',
  data () {
    return {
      show: false,
      form: {}
    }
  },
  methods: {
    open (row) {
      this.form = {}
      this.show = true
      this.getData(row.id)
    },
    getData (id) {
      this.$http.post(api.replenishProductInfo, { id: id }).then(res => {
        this.form = res.data
      })
    },
    update () {
      this.$http.post(api.editReplenishProduct, this.form).then(res => {
        this.$emit('getList')
        this.show = false
        this.$notify({ title: '成功', message: '保存成功！', type: 'success' })
      })
    }
  }
}
</script>

<style>

</style>
