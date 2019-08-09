<template>
  <div>
    <el-dialog title="编辑支付配置" :visible.sync="show" width="40%">
      <el-form :model="form" style="padding-right:5%;">

        <el-form-item label="PaymentMethod" :label-width="formLabelWidth">
          <el-select v-model="form.paymentMethod" placeholder="请选择">
            <el-option
              v-for="item in paymentMethods"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Partner" :label-width="formLabelWidth">
          <el-input v-model="form.partner" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="PartnerKey" :label-width="formLabelWidth">
          <el-input v-model="form.partnerKey" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="TradeType" :label-width="formLabelWidth">
          <el-input v-model="form.tradeType" auto-complete="off"></el-input>
        </el-form-item>

        <!-- <el-form-item label="IsDefault" :label-width="formLabelWidth">
          <el-checkbox v-model="form.isDefault" :checked="form.isDefault">默认</el-checkbox>
        </el-form-item> -->

        <el-form-item label="Status" :label-width="formLabelWidth">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option key="Enabled" value="Enabled" label="启用"></el-option>
            <el-option key="Disabled" value="Disabled" label="禁用"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="AppId" :label-width="formLabelWidth">
          <el-input v-model="form.appId" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="AppSecret" :label-width="formLabelWidth">
          <el-input v-model="form.appSecret" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="PaySignKey" :label-width="formLabelWidth">
          <el-input v-model="form.paySignKey" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="PrivateKey" :label-width="formLabelWidth">
          <el-input v-model="form.privateKey" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="PublicKey" :label-width="formLabelWidth">
          <el-input v-model="form.publicKey" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="CertPassword" :label-width="formLabelWidth">
          <el-input v-model="form.certPassword" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="CertPath" :label-width="formLabelWidth">
          <el-input v-model="form.certPath" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="NotifyHostName" :label-width="formLabelWidth">
          <el-input v-model="form.notifyHostName" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="RedirectUrl" :label-width="formLabelWidth">
          <el-input v-model="form.redirectUrl" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="show = false">取 消</el-button>
        <el-button size="small" type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'system-payment-addConfig',
  data () {
    return {
      formLabelWidth: '120px',
      paymentMethods: [],
      show: false,
      form: {}
    }
  },
  methods: {
    open (row) {
      this.show = true
      this.form = {}
      this.getPaymentMethods().then(() => {
        this.getData(row.id)
      })
    },
    getData (id) {
      return this.$http.post(api.paymentConfigInfo, { id: id }).then(res => {
        this.form = res.data
      })
    },
    getPaymentMethods () {
      return this.$http.post(api.paymentModeList).then(res => {
        this.paymentMethods = res.data
      })
    },
    update () {
      this.$http.post(api.editPaymentConfig, this.form).then(res => {
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
