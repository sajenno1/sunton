<template>
  <div>
    <el-dialog title="加盟申请" :visible.sync="show" width="30%">
      <el-form :model="form" style="padding-right:5%;">
        <el-form-item label="联系人" :label-width="formLabelWidth">
          <span style="padding-left:15px;"> {{ form.linkManName }} </span>
        </el-form-item>

        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <span style="padding-left:15px;"> {{ form.mobile }} </span>
        </el-form-item>

        <el-form-item label="所在地区" :label-width="formLabelWidth">
          <span style="padding-left:15px;"> {{ form.areaName }} </span>
        </el-form-item>

        <el-form-item label="所在地区" :label-width="formLabelWidth">
          <span style="padding-left:15px;"> {{ form.address }} </span>
        </el-form-item>
        <el-form-item label="详细" :label-width="formLabelWidth">
          <span style="padding-left:15px;"> {{ form.applyContent }} </span>
        </el-form-item>

        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.remark"></el-input>
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
  name: 'wechatexcellent-joininapply-detail',
  data () {
    return {
      formLabelWidth: '120px',
      show: false,
      form: {}
    }
  },
  methods: {
    async open (id) {
      this.form = {}
      this.show = true
      await this.getInfo(id)
    },
    async getInfo (id) {
      await this.$http.post(api.weChatExcellentJoinInApplyInfo, { id: id }).then(res => {
        this.form = res.data
      })
    },
    update () {
      this.$http.post(api.weChatExcellentJoinInApplyEdit, this.form).then(res => {
        this.$emit('getList')
        this.show = false
        this.$notify({ title: '成功', message: '保存成功！', type: 'success' })
      })
    }
  }
}
</script>