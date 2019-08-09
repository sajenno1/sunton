<template>
  <div>
    <el-dialog title="编辑消息类型" :visible.sync="show" width="60%">
      <el-form :model="form" style="padding-right:5%;">

       <el-form-item label="消息类型" :label-width="formLabelWidth">
          <el-input placeholder="请输入类型" v-model="form.type" auto-complete="off"></el-input>
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
import '../../../../static/utf8-net/ueditor.config'
import '../../../../static/utf8-net/ueditor.all'
import '../../../../static/utf8-net/lang/zh-cn/zh-cn'
import * as api from '../../../api'
export default {
  name: 'mall-notice-edit',
  data () {
    return {
      formLabelWidth: '120px',
      show: false,
      form: {}
    }
  },
  methods: {
    async open (id) {
      var _this = this
      _this.form = {}
      _this.show = true
      await _this.getInfo(id)
    //   setTimeout(() => {
    //     _this.ue = window.UE.getEditor('editor', {
    //       BaseUrl: '',
    //       UEDITOR_HOME_URL: 'static/utf8-net/',
    //       zIndex: 9999
    //     })
    //     setTimeout(() => {
    //       window.UE.getEditor('editor').setContent(_this.form.content || '')
    //     }, 200)
    //   }, 100)
    },
    async getInfo (id) {
      await this.$http.post(api.noticeTypeInfo, { id: id }).then(res => {
        this.form = res.data
      })
    },
    update () {
      // this.form.content = window.UE.getEditor('editor').getContent()
      this.$http.post(api.editNoticeType, this.form).then(res => {
        this.$emit('getList')
        this.show = false
        this.$notify({ title: '成功', message: '保存成功！', type: 'success' })
      })
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
