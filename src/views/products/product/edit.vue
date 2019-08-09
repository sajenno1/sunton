<template>
  <div>
    <el-dialog title="编辑产品" :visible.sync="show" width="60%">
    <el-tabs v-model="activeName">
     <el-tab-pane label="基本设置" name="first">
      <el-form :model="form" style="padding-right:5%;">

        <el-form-item label="编号" :label-width="formLabelWidth">
          <el-input v-model="form.no" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>

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

          <el-form-item label="系列" :label-width="formLabelWidth">
          <el-select v-model="form.productSeriesId" placeholder="请选择系列">
            <el-option
              v-for="item in serieList"
              v-bind:key="item.id"
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

        <!--<el-form-item label="产品特性分类" :label-width="formLabelWidth">
          <el-select v-model="form.propertyCategoryId" placeholder="请选择产品特性分类">
            <el-option
              v-for="item in propertyCategoryList"
              v-bind:key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>-->

         <!--<el-form-item label="产品特性分类" :label-width="formLabelWidth">
          <el-select
            v-model="form.propertyCategoryId"
            filterable
            remote
            reserve-keyword
            placeholder="请输入产品特性分类名称"
            :remote-method="remoteMethod"
            :loading="loading" 
            size="small"
            >
            <el-option
              v-for="item in propertyCategoryList"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>-->

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

        <!-- <el-form-item label="运费模板" :label-width="formLabelWidth">
            <el-checkbox-group v-model="form.productDeliveryTemplateIds" v-on:change="productDeliveryTemplateIdsChange">
              <el-checkbox v-for="item in productDeliveryTemplateIds" :label="item.key" :key="item.key">{{item.label+','+item.remark}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item> -->

        <el-form-item label="单位" :label-width="formLabelWidth">
          <el-input v-model="form.unit" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="规格" :label-width="formLabelWidth">
          <el-input v-model="form.specification" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="重量(kg)" :label-width="formLabelWidth">
          <el-input v-model="form.weight" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="最低零售价" :label-width="formLabelWidth">
          <el-input v-model="form.price" auto-complete="off"></el-input>
        </el-form-item>
        
         <el-form-item label="市场价" :label-width="formLabelWidth">
          <el-input v-model="form.marketPrice" auto-complete="off"></el-input>
        </el-form-item>

        <!--<el-form-item v-for ="item in productLevelPrice" 
        :label="item.dealerLevelName+'批发价'"
        :label-width="formLabelWidth"
        :key="item.dealerLevelId">
        <el-input v-model="item.price" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="优惠" :label-width="formLabelWidth">
          <el-input v-model="form.favourable" auto-complete="off"></el-input>
        </el-form-item>-->

        <el-form-item label="库存上限" :label-width="formLabelWidth">
          <el-input v-model="form.upperLimitInventory" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="库存下限" :label-width="formLabelWidth">
          <el-input v-model="form.lowerLimitInventory" auto-complete="off"></el-input>
        </el-form-item>
        <el-collapse>
          <el-collapse-item title="销售属性" name="1">
            <el-form-item label="销售季节" :label-width="formLabelWidth">
              <el-select v-model="selectedSeason" style="width: 300px" multiple placeholder="请选择">
                <el-option
                  v-for="item in saleSeasonList"
                  :key="item"
                  :label="item"
                  :value="item">
              </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="年份" :label-width="formLabelWidth">
                <el-date-picker
                v-model="form.saleYear"
                type="year"
                placeholder="选择年">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="性别" :label-width="formLabelWidth">
              <el-radio-group v-model="form.sex">
                <el-radio-button v-for="item in sexs" :label="item" :key="item">{{item}}</el-radio-button>
              </el-radio-group>
            </el-form-item>                 

          </el-collapse-item>
        </el-collapse>

          <el-form-item label="产品标签" :label-width="formLabelWidth">
          <el-checkbox-group v-model="selectedLabels">
            <el-checkbox v-for="item in labelList" :label="item.labelText" :key="item.labelText" border></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="是否推荐到首页" :label-width="formLabelWidth">
          <el-checkbox v-model="form.isPropelling">是</el-checkbox>
        </el-form-item>

        <el-form-item label="搜索关键词" :label-width="formLabelWidth">
          <el-input v-model="form.searchKey" auto-complete="off"></el-input>
        </el-form-item>

        </el-form>
        <div  style="float: right;">
        <el-button class="right" size="large" @click="activeName = 'second'">下一步</el-button>
        </div>
        </el-tab-pane>

         <el-tab-pane label="产品SKU" name="second">
          <div class="table-container">
           <el-table
            :data="propertyValuesPhotos"
            border
            style="width: 100%;bottom: 10px"
            v-if="columns.length > 0 && propertyValuesPhotos.length > 0">
            <el-table-column label="图片">
              <template slot-scope="scope">
                <el-upload
                  class="avatarSku-uploader"
                  :action="imgSkuUpload"
                  :show-file-list="false"
                  :on-success="(value)=> handleSkuUploadSuccess(scope.$index, scope.row, value)"
                  :before-upload="beforeUpload"
                  :headers="headers">
                  <img v-if="scope.row.tmpPhoto" :src="scope.row.tmpPhoto" class="avatarSku">
                  <i v-else class="el-icon-plus avatarSku-uploader-icon"></i>
                </el-upload>
              </template>
            </el-table-column>
            <el-table-column
              label="值"
              prop="name">
            </el-table-column>
        </el-table>
        <div style="margin: 10px 0" v-if="columns.length > 0">
          <span style="width: 160px">设置所有SKU库存 </span>
          <el-input style="width: 200px; margin-left: 10px" v-model="allQuota"></el-input>
          <el-button style="margin-left: 10px" size="mini" type="primary" @click="setAllQuota">设置</el-button>
        </div>

          <el-table
          :data="list"
          border
          style="width: 100%;">
            <template v-for="(item, index) in columns">
                <el-table-column :label="item.name" :key="item.name">
                  <template slot-scope="scope">
                    <div class="borderNone">
                      <span>{{ scope.row.sku[item.skuIndex].valueName }}</span>
                    </div>
                  </template>
                </el-table-column>
              </template>
            <el-table-column
              label="编码" 
              v-if="columns.length > 0">
              <template slot-scope="scope" >
                <div>
                   <span>
                  {{ scope.row.productSkuCode }}
                  </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="状态" 
              v-if="columns.length > 0">
              <template slot-scope="scope" >
                <div>
                   <span v-bind:style="{color:getProductStatus(scope.row.status)=='已上架'?'blue':'red'}">
                  {{ getProductStatus(scope.row.status) }}
                  </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="库存" 
              v-if="columns.length > 0">
              <template slot-scope="scope" >
                 <div>
                <span v-if="scope.row.isEdit">
                  <el-input v-model="scope.row.quota" type="number" min=0></el-input>
                </span>
                <span v-else>
                  {{ scope.row.quota }}
                </span>
              </div>
              </template>
            </el-table-column>
            <el-table-column label="操作"
            v-if="columns.length > 0"
            width="330" >
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.isEdit"
                size="mini"
                type="primary"
                @click="handleSave(scope.$index, scope.row)">保存</el-button>
              <el-button
                v-else
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="warning"
                @click="handlePullOff(scope.$index, scope.row)"
                v-if="scope.row.status === 'PutOn'">下架</el-button>
              <el-button
                size="mini"
                type="success"
                @click="handlePutOn(scope.$index, scope.row)"
                v-else>上架</el-button>
            </template>
          </el-table-column>
            <el-table-column
              label="产品库存" 
              align="center"
              v-if="columns.length === 0">
              <template slot-scope="scope" >
                 <div>
                <span v-if="scope.row.isEdit">
                  <el-input v-model="scope.row.quota" type="number" min=0></el-input>
                </span>
                <span v-else>
                  {{ scope.row.quota }}
                </span>
              </div>
              </template>
            </el-table-column>
            <el-table-column label="操作"
            v-if="columns.length === 0">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.isEdit"
                size="mini"
                type="primary"
                @click="handleSave(scope.$index, scope.row)">保存</el-button>
              <el-button
                v-else
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        </div>
        </el-form>
        <div style="float: right;">
        <el-button size="large" @click="activeName = 'three'">下一步</el-button>
        </div>
        </el-tab-pane>

      <el-tab-pane label="产品图片" name="three">
        <el-form :model="form" style="padding-right:5%;">
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

        <el-form-item label="产品轮播图" :label-width="formLabelWidth">
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
            <div id="editor" type="text/plain"></div>
          </div>
        </el-form-item>

      </el-form>
      <div  style="float: right;">
        <el-button size="large" @click="show = false">取 消</el-button>
        <el-button size="large" type="primary" @click="update">确 定</el-button>
      </div>
      </el-tab-pane>
      </el-tabs>
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
      // productDeliveryTemplateIds: [],
      form: {},
      brandList: [],
      imgUpload: this.$http.defaults.baseURL + api.imgUpload,
      imgSkuUpload: this.$http.defaults.baseURL + api.uploadProductMainSkuPhoto,
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
      dialogImageUrl: '',
      tmpPhoto: '',
      timer: null,
      loading: false,
      propertyCategoryId: '',
      saleSeasonList: ['春季', '夏季', '秋季', '冬季'],
      selectedSeason: [],
      productLevelPrice: [],
      optionsDealerLevel: [],
      dealerLevelCount: 0,
      serieList: [],
      labelList: [],
      selectedLabels: [],
      sexs: ['女性', '男性', '中性'],
      activeName: 'first',
      list: [],
      columns: [],
      propertyValuesPhotos: [],
      price: 0,
      allQuota: 0
    }
  },
  methods: {
    async open (id) {
      this.form = {
        photos: [],
        photo: '',
        tmpPhoto: ''
        // productDeliveryTemplateIds: []
      }
      this.price = 0
      this.allQuota = 0
      this.activeName = 'first'
      this.list = []
      this.columns = []
      this.show = true
      await this.getInfo(id)
      await this.getBrandList()
      await this.getPropertyCategoryList()
      await this.getDeliveryTemplateList()
      await this.getCategoryList()
      await this.getTopCategory(this.form.categoryId)
      await this.getProductLevelPrice(id)
      await this.getLabelList()
      await this.getSeries()
      await this.getSkuList(id)
      await this.getPropertyValuePhoto(id)
      // await this.loadDeliveryTemplateCheckboxList()
      setTimeout(() => {
        this.ue = window.UE.getEditor('editor', {
          BaseUrl: '',
          UEDITOR_HOME_URL: 'static/utf8-net/',
          zIndex: 9999
        })
        setTimeout(() => {
          window.UE.getEditor('editor').setContent(this.form.descrption || '')
        }, 200)
      }, 100)
    },
    async getInfo (id) {
      await this.$http.post(api.productInfo, { id: id }).then(res => {
        this.form = res.data
        this.price = res.data.price
        if (res.data.brandId === '00000000-0000-0000-0000-000000000000') {
          this.form.brandId = ''
        }
        if (res.data.productSeriesId === '00000000-0000-0000-0000-000000000000') {
          this.form.productSeriesId = ''
        }
        if (res.data.deliveryTemplateId === '00000000-0000-0000-0000-000000000000') {
          this.form.deliveryTemplateId = ''
        }
        this.propertyCategoryId = this.form.propertyCategoryId
        this.form.propertyCategoryId = this.form.propertyCategoryName
        this.tmpPhoto = res.data.photo || ''
        this.selectedSeason = (res.data.saleSeason || '').split(',')
        this.selectedLabels = (res.data.productLabel || '').split(',')
        this.photos = res.data.photos.map(x => {
          return {
            name: 'photo',
            url: x,
            fileName: x
          }
        })
      })
    },
    async getBrandList () {
      await this.$http.post(api.brandList, this.pageParams).then(res => {
        this.brandList = res.data.rows
      })
    },
    async getSeries () {
      await this.$http.post(api.productSeriesList, this.pageParams).then(res => {
        this.serieList = res.data.rows
      })
    },
    async getLabelList () {
      await this.$http.post(api.productLabelList, this.pageParams).then(res => {
        this.labelList = res.data.rows
      })
    },
    async getPropertyCategoryList () {
      await this.$http.post(api.productPropertyCategoryList, this.pageParams).then(res => {
        this.propertyCategoryList = res.data.rows
      })
    },
    async getDeliveryTemplateList () {
      await this.$http.post(api.deliveryTemplateList, this.pageParams).then(res => {
        this.deliveryTemplateList = res.data.rows
      })
    },
    async getCategoryList () {
      await this.$http.post(api.productCategoryCascader).then(res => {
        this.categoryList = res.data
      })
    },
    async getTopCategory (id) {
      await this.$http.post(api.getTopCategory, { id: id }).then(res => {
        this.selectedCategory = res.data.reverse()
      })
    },
    async getProductLevelPrice (id) {
      await this.$http.post(api.productLevelPriceInfo, { productId: id }).then(res => {
        this.productLevelPrice = res.data.rows
      })
    },
    async getSkuList (id) {
      this.columns = []
      await this.$http.post(api.productSkuList, { id: id }).then(res => {
        this.list = res.data.map(x => {
          let arr = x.propertyNames.split(';')
          x.sku = arr.map(v => {
            return {
              propertyName: v.split(':')[0],
              valueName: v.split(':')[1]
            }
          })
          x.isEdit = false
          return x
        })
        this.getColumn()
      })
    },
    async getColumn () {
      if (!this.list.length) {
        return
      }
      for (var index = 0; index < this.list[0].sku.length; index++) {
        if (this.list[0].sku[index].valueName !== '无规则') {
          this.columns.push({
            name: this.list[0].sku[index].propertyName,
            skuIndex: index
          })
        }
      }
      // this.columns = this.list[0].sku.map(x => x.propertyName)
    },
    async getPropertyValuePhoto (id) {
      await this.$http.post(api.getPropertyValuePhoto, {id: id}).then(res => {
        this.propertyValuesPhotos = res.data.map(x => {
          x.tmpPhoto = x.photo
          return x
        })
      })
    },
    // // 加载运费模板
    // async loadDeliveryTemplateCheckboxList () {
    //   var _this = this
    //   await this.$http.post(api.deliveryTemplateCheckboxList, {}).then(res => {
    //     _this.productDeliveryTemplateIds = res.data
    //   })
    // },
    // productDeliveryTemplateIdsChange (val) {
    //   console.log(val)
    // },
    handleUploadSuccess (res, file) {
      this.form.photo = res.fileName
      this.form.tmpPhoto = res.tmpFileName
      this.tmpPhoto = res.tmpFileName
    },
    handleSkuUploadSuccess (index, row, res, file) {
      this.propertyValuesPhotos[index].tmpPhoto = res.tmpFileName
      this.propertyValuesPhotos[index].photo = res.fileName
      this.$http.post(api.changePropertyValuePhoto, this.propertyValuesPhotos[index]).then(res => {
        this.$notify({ title: '成功', message: 'sku配图修改成功！', type: 'success' })
      })
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
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 、PNG 格式!')
      }

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }

      return isJPG && isLt2M
    },
    update () {
      this.form.photos = this.photos.map(x => x.fileName)
      this.form.saleSeason = this.selectedSeason.join(',')
      this.form.saleYear = this.$common.timeChange(this.form.saleYear).substr(0, 4)
      this.form.productLabel = this.selectedLabels.join(',')
      this.form.descrption = window.UE.getEditor('editor').getContent()
      if (this.form.propertyCategoryId === this.form.propertyCategoryName) {
        this.form.propertyCategoryId = this.propertyCategoryId
      }
      this.$http.post(api.editProduct, this.form).then(res => {
        if (this.price !== this.form.price) {
          this.$http.post(api.updateAllLevelPrice, {
            productId: this.form.id,
            price: this.form.price
          }).then(res => {})
        }
        this.$emit('getList')
        this.show = false
        this.$notify({ title: '成功', message: '修改成功！', type: 'success' })
      })
    },
    setAllQuota () {
      this.$http.post(api.updateAllSkuQuota, {
        id: this.form.id,
        quota: this.allQuota
      }).then(res => {
        this.getSkuList(this.form.id)
        this.$notify({ title: '成功', message: 'sku库存修改成功！', type: 'success' })
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
    },
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        this.searchPropertyCategoryList(query, 500)()
      } else {
        this.propertyCategoryList = []
      }
    },
    searchPropertyCategoryList (query, time) {
      return () => {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$http.post(api.getProductPropertyCategoryList, { name: query }).then(res => {
            this.loading = false
            this.propertyCategoryList = res.data.map(x => {
              return {
                label: x.name,
                value: x.id
              }
            })
          })
        }, time)
      }
    },
    handleSave (index, row) {
      var quota = row.quota
      this.$http.post(api.changeSkuQuota, {
        id: row.id,
        quota: row.quota
      }).then(res => {
        this.$notify.success({ title: '成功', message: '库存修改成功' })
        if (quota > 0) {
          row.status = 'PutOn'
        } else {
          row.status = 'PullOff'
        }
        row.isEdit = false
      })
    },
    handleEdit (index, row) {
      row.isEdit = true
    },
    handlePullOff (index, row) {
      this.$http.post(api.editSkuStatus, {
        id: row.id,
        status: 'PullOff'
      }).then(res => {
        this.$notify.success({ title: '成功', message: '下架成功' })
        row.status = 'PullOff'
      })
    },
    handlePutOn (index, row) {
      this.$http.post(api.editSkuStatus, {
        id: row.id,
        status: 'PutOn'
      }).then(res => {
        this.$notify.success({ title: '成功', message: '上架成功' })
        row.status = 'PutOn'
      })
    },
    getProductStatus (status) {
      switch (status) {
        case 'PutOn': return '已上架'
        case 'PullOff': return '已下架'
      }
      return ''
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
.avatarSku-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatarSku-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatarSku-uploader-icon {
  font-size: 14px;
  color: #8c939d;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.avatarSku {
  width: 50px;
  height: 50px;
  display: block;
}
</style>
