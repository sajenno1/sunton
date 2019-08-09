<template>
  <div>
    <el-dialog title="编辑产品标签" :visible.sync="show" width="40%">
      <el-form :model="form" style="padding-right:5%;">

        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.labelText" auto-complete="off" readonly="true"></el-input>
        </el-form-item>

        <el-form-item label="Sign" :label-width="formLabelWidth">
          <el-input v-model="form.specialId" auto-complete="off"></el-input>
          新品 EfexJNxJdgh101, 促销 EfexJNxJdgh102
        </el-form-item>

        <el-form-item label="是否推荐到首页" :label-width="formLabelWidth">
          <el-checkbox v-model="form.isPropelling">是</el-checkbox>
        </el-form-item>
        
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            :action="imgUpload"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
            :before-upload="beforeUpload"
            :headers="headers">
            <img v-if="tmpPhoto" :src="tmpPhoto" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
  name: 'products-productSeries-edit',
  data () {
    return {
      formLabelWidth: '120px',
      show: false,
      form: {},
      tmpPhoto: '',
      imgUpload: this.$http.defaults.baseURL + api.uploadLabelPhoto,
      headers: {}
    }
  },
  methods: {
    open (id) {
      this.form = {}
      this.$http.post(api.productLabelInfo, { id: id }).then(res => {
        this.form = res.data
        this.tmpPhoto = res.data.labelPhoto
        this.show = true
      })
    },
    handleUploadSuccess (res, file) {
      this.form.labelPhoto = res.fileName
      this.tmpPhoto = res.tmpFileName
      this.form.tmpPhoto = res.tmpFileName
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
      this.$http.post(api.editProductLabel, this.form).then(res => {
        this.$emit('getList')
        this.show = false
        this.$notify({ title: '成功', message: '添加成功！', type: 'success' })
      })
    }
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
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>

