<template>
  <div>
    <el-dialog title="添加产品" :visible.sync="show" width="60%">
      <el-form :model="form" style="padding-right:5%;">

        <el-form-item label="品牌" :label-width="formLabelWidth">
          <el-select v-model="form.brandId" placeholder="请选择品牌">
            <el-option
              v-for="item in brandList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="产品分类" :label-width="formLabelWidth">
          <el-cascader
            :props="props"
            :options="categoryList"
            v-model="selectedCategory"
            @change="handleChange"></el-cascader>
        </el-form-item>

        <el-form-item label="产品特性分类" :label-width="formLabelWidth">
          <el-select v-model="form.propertyCategoryId" placeholder="请选择产品特性分类">
            <el-option
              v-for="item in propertyCategoryList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="运费模板" :label-width="formLabelWidth">
          <el-select v-model="form.deliveryTemplateId" placeholder="请选择运费模板">
            <el-option
              v-for="item in deliveryTemplateList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="编号" :label-width="formLabelWidth">
          <el-input v-model="form.no" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="单位" :label-width="formLabelWidth">
          <el-input v-model="form.unit" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="规格" :label-width="formLabelWidth">
          <el-input v-model="form.specification" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="市场价格" :label-width="formLabelWidth">
          <el-input v-model="form.marketPrice" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="消费的积分" :label-width="formLabelWidth">
          <el-input v-model="form.customeIntegral" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="会员获得积分" :label-width="formLabelWidth">
          <el-input v-model="form.rewardIntegral" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="销售员获得积分" :label-width="formLabelWidth">
          <el-input v-model="form.sellRewardIntegral" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            :action="imgUpload"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
            :before-upload="beforeUpload"
            :headers="headers">
            <img v-if="form.tmpPhoto" :src="form.tmpPhoto" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="产品图片" :label-width="formLabelWidth">
          <el-upload
            :action="imgUpload"
            :on-success="handleUploadPhotosSuccess"
            :before-upload="beforeUpload"
            :file-list="photos"
            list-type="picture-card"
            :headers="headers"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" size="tiny" append-to-body>
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>

        <el-form-item label="详细" :label-width="formLabelWidth">
          <div>
            <div id="editor1" type="text/plain"></div>
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
import '../../../../static/utf8-net/ueditor.config'
import '../../../../static/utf8-net/ueditor.all'
import '../../../../static/utf8-net/lang/zh-cn/zh-cn'
import * as api from '../../../api'
export default {
  name: 'products-product-add',
  data () {
    return {
      formLabelWidth: '120px',
      show: false,
      form: {},
      brandList: [],
      imgUpload: this.$http.defaults.baseURL + api.imgUpload,
      ue: '',
      propertyCategoryList: [],
      deliveryTemplateList: [],
      pageParams: {
        page: 1,
        pageSize: 1000
      },
      categoryList: [],
      props: {
        label: 'name',
        value: 'id',
        children: 'children'
      },
      selectedCategory: [],
      photos: [],
      headers: {},
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  methods: {
    open () {
      this.form = {
        photos: [],
        photo: '',
        tmpPhoto: ''
      }
      this.getBrandList()
      this.getPropertyCategoryList()
      this.getDeliveryTemplateList()
      this.getCategoryList()
      this.show = true
      setTimeout(() => {
        this.ue = window.UE.getEditor('editor1', {
          BaseUrl: '',
          UEDITOR_HOME_URL: 'static/utf8-net/'
        })
      }, 100)
    },
    getBrandList () {
      this.$http.post(api.brandList, this.pageParams).then(res => {
        this.brandList = res.data.rows
      })
    },
    getPropertyCategoryList () {
      this.$http.post(api.productPropertyCategoryList, this.pageParams).then(res => {
        this.propertyCategoryList = res.data.rows
      })
    },
    getDeliveryTemplateList () {
      this.$http.post(api.deliveryTemplateList, this.pageParams).then(res => {
        this.deliveryTemplateList = res.data.rows
      })
    },
    getCategoryList () {
      this.$http.post(api.productCategoryCascader).then(res => {
        this.categoryList = res.data
      })
    },
    handleUploadSuccess (res, file) {
      this.form.photo = res.fileName
      this.form.tmpPhoto = res.tmpFileName
    },
    handleUploadPhotosSuccess (res, file) {
      this.photos.push({
        name: `photo${this.photos.length + 1}`,
        url: res.tmpFileName,
        fileName: res.fileName
      })
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
      this.form.photos = this.photos.map(x => x.fileName)
      this.form.descrption = window.UE.getEditor('editor1').getContent()
      this.$http.post(api.addProduct, this.form).then(res => {
        this.$emit('getList')
        this.show = false
        this.$notify({ title: '成功', message: '添加成功！', type: 'success' })
      })
    },
    handleChange (value) {
      this.form.categoryId = value[value.length - 1]
    },
    handleRemove (file, fileList) {
      for (var i = 0; i < this.photos.length; i++) {
        if (this.photos[i].fileName === file.fileName) {
          this.photos.splice(i, 1)
        }
      }
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
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
