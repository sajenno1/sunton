<template>
  <div>
    <el-dialog title="添加分类" :visible.sync="show" width="40%">
      <el-form :model="form" style="padding-right:5%;">

        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            :action="imgUpload"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
            :before-upload="beforeUpload">
            <img v-if="form.photo" :src="form.photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
  name: 'products-brand-add',
  data () {
    return {
      formLabelWidth: '120px',
      show: false,
      form: {},
      imgUpload: api.imgUpload
    }
  },
  methods: {
    open (row) {
      this.form = {}
      this.show = true
      this.getData(row.id)
    },
    getData (id) {
      this.$http.post(api.productCategoryInfo, { id: id }).then(res => {
        this.form = res.data
      })
    },
    handleUploadSuccess (res, file) {
      this.form.photo = URL.createObjectURL(file.raw)
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
    update () {
      this.$http.post(api.editProductCategory, this.form).then(res => {
        this.$emit('getList')
        this.show = false
        this.$notify({ title: '成功', message: '保存成功！', type: 'success' })
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
</style>
