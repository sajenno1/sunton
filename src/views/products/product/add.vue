<template>
  <div>
    <el-dialog title="添加产品" :visible.sync="show" width="60%">
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
              v-bind:key="item.id"
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
          <el-button  size="small" type="primary" icon="el-icon-plus" @click="openAddDialog"></el-button>
        </el-form-item>-->

        <el-form-item label="运费模板" :label-width="formLabelWidth">
          <el-select v-model="form.deliveryTemplateId" placeholder="请选择运费模板">
            <el-option
              v-for="item in deliveryTemplateList"
              v-bind:key="item.id"
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
                format="yyyy"
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
        <el-form :model="form" style="padding-right:5%;">
        <el-form-item label="SKU默认库存" :label-width="formLabelWidth">
        <el-input v-model="skuDefaultCount" style="width:300px" type="number" min=0 placeholder="请输入sku的默认库存"></el-input>                
        </el-form-item>
        <!--<el-button type="primary" icon="el-icon-plus" v-if="addSku == true" @click="initSku">增加sku</el-button>-->
        <el-form-item label="SKU1" :label-width="formLabelWidth">
        
        <el-input v-model="mainSku.name" style="width:300px" placeholder="请输入sku1名称"></el-input>
         <!--<el-button icon="el-icon-close" type="error" class="param-button"  @click="deleteMainSku()" circle></el-button>-->
          <div v-for="(item,index) in mainSku.values">
          <div style='display:flex;margin:10px 0;align-items:center'>
            <el-upload
            class="avatarSku-uploader"
            :action="imgSkuUpload"
            :show-file-list="false"
            :on-success="(value)=> handleSkuUploadSuccess(index,value)"
            :before-upload="beforeUpload"
            :headers="headers"
            >
            <img v-if="item.tmpPhoto" :src="item.tmpPhoto" class="avatarSku">
            <i v-else class="el-icon-plus avatarSku-uploader-icon"></i>
          </el-upload>
          <span style='margin-left:10px;color:#a5a5a5;font-size:12px'>请选择图片上传</span>
          </div>
        
          <div style='display:flex;align-items:center'> 
          <el-input v-model="item.code" style="width:140px" placeholder="请输入编号"></el-input>
          --
          <el-input v-model="item.name" style="width:140px" placeholder="请输入值"></el-input>
          <i class="el-icon-circle-close" style='font-size:20px;color:#f56c6c;margin-left:10px'  @click="removeMainSku(index)"></i>
          </div>
         
          </div>
          <div>
          <el-button style="width:300px" icon="el-icon-plus" @click="addMainSku" circle></el-button>
          </div>     
        </el-form-item>
        <el-form-item label="SKU2" :label-width="formLabelWidth">
        <el-input v-model="skuFirst.name" style="width:300px" placeholder="请输入sku2名称"></el-input>        
         <!--<el-button icon="el-icon-close" type="error" class="param-button"  @click="deleteMainSku()" circle></el-button>-->
          <div v-for="(item,index) in skuFirst.values" style='display:flex;align-items:center'>
          <el-input v-model="item.code" style="width:140px" placeholder="请输入编号"></el-input>
          --
          <el-input v-model="item.name" style="width:140px" placeholder="请输入值" v-on:change="sku1nameChange(item)"></el-input>
           <i class="el-icon-circle-close" style='font-size:20px;color:#f56c6c;margin-left:10px'  @click="removeSku1(index)"></i>
          </div>
          <div>
          <el-button style="width:300px" icon="el-icon-plus" @click="addSku1" circle></el-button>
          </div>          
        </el-form-item>

        <!--<el-form-item :label-width="formLabelWidth">        
          <div>
            <el-input v-model="skuFirst.name" style="width:300px" placeholder="请输入sku2名称"></el-input>
            <el-tag
            :key="tag.name"
            v-for="(tag,sindex) in skuFirst.values"
            closable
            :disable-transitions="false"
            @close="handleClose(sindex,'sku1')">
           {{tag.name}}
          </el-tag>
          <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 输入值</el-button>
          <el-button icon="el-icon-close" type="error" class="param-button"  @click="reSetSku1()" circle></el-button>
          </div>

        </el-form-item>--->
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
            <img v-if="form.tmpPhoto" :src="form.tmpPhoto" class="avatar">
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
            <div id="editor1" type="text/plain"></div>
          </div>
        </el-form-item>
        </el-form>
        <div  style="float: right;">
        <el-button size="large" @click="show = false">取 消</el-button>
        <el-button size="large" type="primary" @click="checkSku">确 定</el-button>
      </div>
      </el-tab-pane>
      </el-tabs>
      </el-form>
      
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="alertVisible"
      width="30%">
      <span>SKU尚未配置，是否使用默认SKU，保存后SKU后续将不能修改！！！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="alertVisible = false">取 消</el-button>
        <el-button type="primary" @click="create">确 定</el-button>
      </span>
    </el-dialog>

    <div>
      <add-product-property-category
        ref="add" @createPropertyCategory="handlePropertyCategory"/>
    </div>
  </div>
</template>

<script>
import '../../../../static/utf8-net/ueditor.config'
import '../../../../static/utf8-net/ueditor.all'
import '../../../../static/utf8-net/lang/zh-cn/zh-cn'
import * as api from '../../../api'
import addProductPropertyCategory from '../productPropertyCategory/add'
import Vue from 'vue'
export default {
  name: 'products-product-add',
  components: { addProductPropertyCategory },
  data () {
    return {
      formLabelWidth: '120px',
      show: false,
      //
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
      timer: null,
      loading: false,
      flag: 'product',
      propertyCategory: {},
      saleSeasonList: ['春季', '夏季', '秋季', '冬季'],
      selectedSeason: [],
      productLevelPrice: [],
      optionsDealerLevel: [],
      dealerLevelCount: 0,
      serieList: [],
      labelList: [],
      selectedLabels: [],
      sexs: ['女性', '男性', '中性'],
      mainSku: {
        name: '配色',
        values: []
      },
      skuFirst: {
        name: '尺码',
        values: []
      },
      addSku: true,
      first: false,
      second: false,
      inputVisible: false,
      inputValue: '',
      activeName: 'first',
      productSkuList: [],
      mainSkuFlag: false,
      alertVisible: false,
      skuDefaultCount: 0
    }
  },
  methods: {
    open () {
      this.form = {
        photos: [],
        photo: '',
        tmpPhoto: '',
        price: 0,
        tradePrice: 0,
        marketPrice: 0,
        isPropelling: false,
        sex: '中性',
        weight: 2
        // productDeliveryTemplateIds: []
      }
      this.activeName = 'first'
      this.photos = []
      this.addSku = true
      this.first = false
      this.second = false
      this.mainSku = {
        name: '配色',
        values: [],
        isIllustration: true
      }
      this.skuFirst = {
        name: '尺码',
        values: [],
        isIllustration: false
      }
      this.skuDefaultCount = 0
      this.inputVisible = false
      this.inputValue = ''
      this.alertVisible = false
      this.propertyCategory = {}
      this.selectedCategory = []
      this.selectedSeason = []
      this.selectedLabels = []
      this.productSkuList = []
      this.productLevelPrice = []
      this.getBrandList()
      this.getPropertyCategoryList()
      this.getDeliveryTemplateList()
      this.getCategoryList()
      this.getAllDealerLevel()
      this.getLabelList()
      this.getSeries()
      this.show = true
      setTimeout(() => {
        this.ue = window.UE.getEditor('editor1', {
          BaseUrl: '',
          UEDITOR_HOME_URL: 'static/utf8-net/',
          zIndex: 9999
        })
        setTimeout(() => {
          window.UE.getEditor('editor1').setContent('')
        }, 200)
      }, 100)
      // this.loadDeliveryTemplateCheckboxList()
    },
    // // 加载运费模板
    // loadDeliveryTemplateCheckboxList () {
    //   var _this = this
    //   this.$http.post(api.deliveryTemplateCheckboxList, {}).then(res => {
    //     _this.productDeliveryTemplateIds = res.data
    //   })
    // },
    // productDeliveryTemplateIdsChange (val) {
    //   console.log(val)
    // },
    getBrandList () {
      this.$http.post(api.brandList, this.pageParams).then(res => {
        this.brandList = res.data.rows
      })
    },
    getSeries () {
      this.$http.post(api.productSeriesList, this.pageParams).then(res => {
        this.serieList = res.data.rows
      })
    },
    getLabelList () {
      this.$http.post(api.productLabelList, this.pageParams).then(res => {
        this.labelList = res.data.rows
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
    handleSkuUploadSuccess (index, res, file) {
      this.mainSku.values[index].photo = res.fileName
      this.mainSku.values[index].tmpPhoto = res.tmpFileName
    },
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 0.2

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG、PNG 格式!')
      }

      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 0.2MB!')
      }

      return isJPG && isLt2M
    },
    create () {
      this.alertVisible = false
      this.productSkuList = []
      this.form.photos = this.photos.map(x => x.fileName)
      this.form.saleSeason = this.selectedSeason.join(',')
      this.form.saleYear = this.$common.timeChange(this.form.saleYear).substr(0, 4)
      this.form.productLabel = this.selectedLabels.join(',')
      if (this.mainSku.values.length === 0 && this.skuFirst.values.length > 0) {
        this.productSkuList.push(this.skuFirst)
        this.productSkuList.push(this.mainSku)
      } else {
        this.productSkuList.push(this.mainSku)
        this.productSkuList.push(this.skuFirst)
      }
      if (this.form.propertyCategoryId === this.propertyCategory.name) {
        this.form.propertyCategoryId = this.propertyCategory.id
      }
      this.form.descrption = window.UE.getEditor('editor1').getContent()
      this.$http.post(api.addProduct, this.form).then(res => {
        if (this.productSkuList.length > 0 && res.data.id !== '') {
          console.log(this.productSkuList)
          this.$http.post(api.createSku, {
            productId: res.data.id,
            ProductSku: this.productSkuList,
            skuDefaultCount: this.skuDefaultCount
          }).then(res2 => {
            this.$notify({ title: '成功', message: 'Sku保存成功！', type: 'success' })
          })
        }
        for (var index = 0; index < this.dealerLevelCount; index++) {
          this.productLevelPrice[index].productId = res.data.id
          this.productLevelPrice[index].price = this.form.price
          this.$http.post(api.addProductLevelPrice, this.productLevelPrice[index]).then(res1 => {
          })
        }
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
    openAddDialog () {
      this.$refs.add.open(this.flag)
    },
    handlePropertyCategory (row) {
      this.propertyCategory = row
      Vue.set(this.form, 'propertyCategoryId', row.name)
    },
    getAllDealerLevel () {
      this.$http.post(api.dealerLevelAllList).then(res => {
        this.optionsDealerLevel = res.data || []
        this.dealerLevelCount = res.data.length
        for (var index = 0; index < res.data.length; index++) {
          this.productLevelPrice.push({
            productId: '',
            dealerLevelId: res.data[index].id,
            dealerLevelName: res.data[index].title,
            price: 0,
            favourable: 0
          })
        }
      })
    },
    tmpAutoNo (s) {
      var t0 = (s.length + 1).toString()
      var s1 = '000' + t0
      return t0.length > 3 ? t0 : s1.substr(s1.length - 3)
    },
    addMainSku () {
      this.mainSku.values.push({
        photo: '',
        tmpPhoto: '',
        code: this.tmpAutoNo(this.mainSku.values),
        name: ''
      })
    },
    removeMainSku (index) {
      if (this.mainSku.values.length < 2) {
        this.deleteMainSku()
        return
      }
      this.mainSku.values.splice(index, 1)
    },
    addSku1 () {
      this.skuFirst.values.push({
        photo: '',
        tmpPhoto: '',
        code: '',
        name: ''
      })
    },
    removeSku1 (index) {
      if (this.skuFirst.values.length < 2) {
        this.reSetSku1()
        return
      }
      this.skuFirst.values.splice(index, 1)
    },
    sku1nameChange (item) {
      item.code = item.name
    },
    deleteMainSku () {
      this.mainSku = {
        name: '配色',
        values: [],
        isIllustration: true
      }
    },
    reSetSku1 () {
      this.skuFirst = {
        name: '尺码',
        values: [],
        isIllustration: false
      }
    },
    checkSku () {
      if (this.mainSku.values.length > 0) {
        for (var mainIndex = 0; mainIndex < this.mainSku.values.length; mainIndex++) {
          if (this.mainSku.values[mainIndex].code === '') {
            this.$message.error('SKU1编码不能为空')
            return
          }
          if (this.mainSku.values[mainIndex].name === '') {
            this.$message.error('SKU1值不能为空')
            return
          }
        }
      }
      if (this.skuFirst.values.length > 0) {
        for (var index = 0; index < this.skuFirst.values.length; index++) {
          if (this.skuFirst.values[index].code === '') {
            this.$message.error('SKU2编码不能为空')
            return
          }
          if (this.skuFirst.values[index].name === '') {
            this.$message.error('SKU2值不能为空')
            return
          }
        }
      }
      if (this.mainSku.values.length === 0 && this.skuFirst.values.length === 0) {
        this.alertVisible = true
      }
      this.create()
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
  border:1px dashed #dcdfe6;
  border-radius: 5px;
}
.avatarSku {
  width: 50px;
  height: 50px;
  display: block;
}
</style>
