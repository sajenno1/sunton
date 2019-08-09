<template>
  <div>
    <el-dialog title="添加消息类型" :visible.sync="show" width="60%">
      <el-form :model="form" style="padding-right:5%;">

        <el-form-item label="消息类型" :label-width="formLabelWidth">
          <el-input placeholder="请输入类型" v-model="form.type" auto-complete="off"></el-input>
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
import '../../../../static/utf8-net/ueditor.config'
import '../../../../static/utf8-net/ueditor.all'
import '../../../../static/utf8-net/lang/zh-cn/zh-cn'
export default {
  name: 'mall-notice-add',
  data () {
    return {
      formLabelWidth: '120px',
      show: false,
      form: {},
      ue: '',
      pageParams: {
        page: 1,
        pageSize: 1000
      }
    }
  },
  methods: {
    open () {
      this.form = {}
      this.show = true
      // setTimeout(() => {
      //   this.ue = window.UE.getEditor('editor1', {
      //     BaseUrl: '',
      //     UEDITOR_HOME_URL: 'static/utf8-net/'
      //   })
      // }, 100)
    //   setTimeout(() => {
    //     this.ue = window.UE.getEditor('editor1', {
    //       BaseUrl: '',
    //       UEDITOR_HOME_URL: 'static/utf8-net/',
    //       zIndex: 9999
    //     })
    //     setTimeout(() => {
    //       window.UE.getEditor('editor1').setContent('')
    //     }, 200)
    //   }, 100)
    },
    create () {
      // this.form.content = window.UE.getEditor('editor1').getContent()
      this.$http.post(api.addNoticeType, this.form).then(res => {
        this.$emit('getList')
        this.show = false
        this.$notify({ title: '成功', message: '添加成功！', type: 'success' })
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
