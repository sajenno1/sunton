<template>
  <div>
    <el-dialog title="添加新闻" :visible.sync="show" width="60%">
      <el-form :model="form" style="padding-right:5%;">

          <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" auto-complete="off" size="small"></el-input>
        </el-form-item>

        <el-form-item label="摘要" :label-width="formLabelWidth">
          <el-input v-model="form.summary" auto-complete="off" size="small" type="textarea" :rows="4"></el-input>
        </el-form-item>

          <el-form-item label="新闻图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            :action="imgUpload"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
            :before-upload="beforeUpload"
            :headers="headers">
            <img v-if="form.Picture" :src="form.Picture" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="详细" :label-width="formLabelWidth">
          <div>
            <div id="editor" type="text/plain"></div>
          </div>
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
  name: 'wechatExcellent-new-add',
  data () {
    return {
      formLabelWidth: '120px',
      show: false,
      form: {},
      brandList: [],
      imgUpload: this.$http.defaults.baseURL + api.uploadPictures,
      ue: '',
      headers: {}
    }
  },
  methods: {
    open () {
      this.form = {

        Picture: ''
      }
      this.show = true
      // setTimeout(() => {
      //   this.ue = window.UE.getEditor('editor1', {
      //     BaseUrl: '',
      //     UEDITOR_HOME_URL: 'static/utf8-net/'
      //   })
      // }, 100)
      var _this = this
      setTimeout(() => {
        _this.ue = window.UE.createEditor('editor', {
          BaseUrl: '',
          UEDITOR_HOME_URL: 'static/utf8-net/'
        })
      })
    },
    handleUploadSuccess (res, file) {
      this.form.Picture = res.tmpFileName
    },
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 0.2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG、PNG 格式!')
      }

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 0.2MB!')
      }

      return isJPG && isLt2M
    },
    create () {
      this.form.newsContent = window.UE.getEditor('editor').getContent()
      this.$http.post(api.weChatExcellentNewsAdd, this.form).then(res => {
        this.$emit('getList')
        this.show = false
        this.$notify({ title: '成功', message: '添加成功！', type: 'success' })
      })
    }
  },
  mounted () {
    this.headers['access-token'] = this.$store.state.account.access_token
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