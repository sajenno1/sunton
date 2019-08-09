<template>
  <div>
    <el-dialog title="发货" :visible.sync="show" width="40%">
      <el-form :model="form" label-width="120px" style="padding-right:5%;">

        <el-form-item label="配送方式">
          <el-select v-model="form.shipType" placeholder="请选择配送方式">
            <el-option label="无需配送" value="None"></el-option>
            <el-option label="快递" value="Express"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="快递" v-if="form.shipType === 'Express'">
          <el-select v-model="form.expressId" placeholder="请选择快递">
            <el-option v-for="item in expressList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="快递单号" v-if="form.shipType === 'Express'">
          <el-input v-model="form.expressNo" placeholder="请填写快递单号"></el-input>
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
  name: 'mall-order-delivery',
  data () {
    return {
      show: false,
      form: {},
      expressList: []
    }
  },
  methods: {
    open (id) {
      this.form = {
        id: id,
        expressNo: ''
      }
      this.show = true
      this.getExpressList()
    },
    create () {
      this.$http.post(api.shippingMallOrder, this.form).then(res => {
        this.$emit('getList')
        this.show = false
        this.$notify({ title: '成功', message: '发货成功！', type: 'success' })
      })
    },
    getExpressList () {
      this.$http.post(api.mallExpressList, {
      }).then(res => {
        this.expressList = res.data
      })
    }
  }
}
</script>

<style>

</style>
