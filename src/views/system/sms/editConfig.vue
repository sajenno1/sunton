<template>
  <div>
    <el-dialog title="添加短信配置" :visible.sync="show" width="40%">
      <el-form :model="form" style="padding-right:5%;">

        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="供应商" :label-width="formLabelWidth">
          <el-select v-model="form.provider" placeholder="请选择">
            <el-option
              v-for="item in smsProviderList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="PartnerId" :label-width="formLabelWidth">
          <el-input v-model="form.partnerId" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="AppKey" :label-width="formLabelWidth">
          <el-input v-model="form.appKey" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="AppSecret" :label-width="formLabelWidth">
          <el-input v-model="form.appSecret" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="IsDefault" :label-width="formLabelWidth">
          <el-checkbox v-model="form.isDefault">默认</el-checkbox>
        </el-form-item>

        <el-form-item label="Status" :label-width="formLabelWidth">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option key="Enabled" value="Enabled" label="启用"></el-option>
            <el-option key="Disabled" value="Disabled" label="禁用"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="ApiUrl" :label-width="formLabelWidth">
          <el-input v-model="form.apiUrl" auto-complete="off"></el-input>
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
  name: 'system-sms-addConfig',
  data () {
    return {
      show: false,
      form: {},
      smsProviderList: [],
      formLabelWidth: '120px'
    }
  },
  methods: {
    open (row) {
      this.form = {}
      this.show = true
      this.getSmsProvider().then(() => {
        this.getData(row.id)
      })
    },
    getData (id) {
      this.$http.post(api.smsConfigInfo, { id: id }).then(res => {
        this.form = res.data
      })
    },
    getSmsProvider () {
      return this.$http.post(api.smsProviderList).then(res => {
        this.smsProviderList = res.data
      })
    },
    update () {
      this.$http.post(api.editSmsConfig, this.form).then(res => {
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
