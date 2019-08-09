<template>
  <div>
    <el-dialog title="添加短信模板" :visible.sync="show" width="40%" append-to-body>
      <el-form :model="form" style="padding-right:5%;">

        <el-form-item label="Code" :label-width="formLabelWidth">
          <el-select v-model="form.code" placeholder="请选择">
            <el-option
              v-for="item in templateKeys"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="TemplateCode" :label-width="formLabelWidth">
          <el-input v-model="form.templateCode" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="SignName" :label-width="formLabelWidth">
          <el-input v-model="form.signName" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="SmsContent" :label-width="formLabelWidth">
          <el-input v-model="form.smsContent" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="show = false">取 消</el-button>
        <el-button size="small" type="primary" @click="create">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'system-sms-addTemplate',
  data () {
    return {
      show: false,
      form: {},
      templateKeys: [],
      formLabelWidth: '120px'
    }
  },
  methods: {
    open (configId) {
      this.form = {}
      this.show = true
      this.form.configId = configId
      this.getTemplateKeys()
    },
    getTemplateKeys () {
      this.$http.post(api.smsTemplateKeys).then(res => {
        this.templateKeys = res.data
      })
    },
    create () {
      this.$http.post(api.addSmsTemplate, this.form).then(res => {
        this.$emit('getList')
        this.show = false
        this.$notify({ title: '成功', message: '添加成功！', type: 'success' })
      })
    }
  }
}
</script>

<style>

</style>
