<template>
  <div>
    <el-dialog title="编辑菜单" :visible.sync="show" width="40%">
      <el-form :model="form" label-width="120px" style="padding-right:5%;">

        <el-form-item label="父级菜单">
          <span>{{ form.parentMenuName || '顶级菜单' }}</span>
        </el-form-item>

        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="类型">
          <el-select v-model="form.type" disabled placeholder="请选择类型">
            <el-option label="点击推事件" value="click"></el-option>
            <el-option label="跳转URL" value="view"></el-option>
            <el-option label="扫码推事件" value="scancode_push"></el-option>
            <el-option label="扫码推事件且弹出“消息接收中”提示框" value="scancode_waitmsg"></el-option>
            <el-option label="弹出系统拍照发图" value="pic_sysphoto"></el-option>
            <el-option label="弹出拍照或者相册发图" value="pic_photo_or_album"></el-option>
            <el-option label="弹出微信相册发图器" value="pic_weixin"></el-option>
            <el-option label="弹出地理位置选择器" value="location_select"></el-option>
            <el-option label="下发消息（除文本消息）" value="media_id"></el-option>
            <el-option label="跳转图文消息URL" value="view_limited"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="处理类型">
          <el-input v-model="form.processType"></el-input>
        </el-form-item>

        <el-form-item label="Key" v-if="form.type === 'click'">
          <el-input v-model="form.menuKey"></el-input>
        </el-form-item>

        <el-form-item label="自动回复" v-if="form.type === 'click'">
          <el-checkbox v-model="form.autoResponse">是</el-checkbox>
        </el-form-item>

        <el-form-item label="消息" v-if="form.type === 'click'">
          <el-input type="textarea" v-model="form.responseMessage"></el-input>
        </el-form-item>

        <el-form-item label="URL" v-if="form.type === 'view'">
          <el-input v-model="form.url"></el-input>
        </el-form-item>

        <el-form-item label=" " v-if="form.type === 'media_id'">
          <el-radio v-model="form.mediaType" label="news">图文消息</el-radio>
          <el-radio v-model="form.mediaType" label="image">图片</el-radio>
          <el-radio v-model="form.mediaType" label="video">视频</el-radio>
          <el-radio v-model="form.mediaType" label="voice">语音</el-radio>
        </el-form-item>

        <el-form-item label="素材Id" v-if="form.type === 'media_id'">
          <el-input v-model="form.mediaId">
            <el-button slot="append" @click="openSelectedDialog">选择</el-button>
          </el-input>
        </el-form-item>

        <el-form-item label="图文消息" v-if="form.type === 'media_id' && form.mediaType === 'news'">
          <el-table
            :data="newsList"
            border
            style="width: 100%">

            <el-table-column
              label="封面">
              <template slot-scope="scope">
                <img :src="scope.row.thumb_url" style="max-width: 64px; max-height: 64px;"/>
              </template>
            </el-table-column>

            <el-table-column
              label="标题"
              prop="title">
            </el-table-column>

            <el-table-column
              label="作者"
              prop="author">
            </el-table-column>

          </el-table>
        </el-form-item>

        <el-form-item label="图片" v-if="form.type === 'media_id' && form.mediaType === 'image'">
          <img :src="imageUrl" style="max-width: 100px; max-height: 100px;"/>
        </el-form-item>

        <el-form-item label="排序">
          <el-input-number v-model="form.sort"></el-input-number>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
import selectedNews from './selectedNews'
import selectedImage from './selectedImage'
import selectedOthers from './selectedOthers'
export default {
  name: 'officialAccounts-menu-edit',
  components: { selectedNews, selectedImage, selectedOthers },
  data () {
    return {
      form: {},
      show: false,
      newsList: [],
      imageUrl: ''
    }
  },
  methods: {
    async open (row) {
      this.form = {}
      this.show = true
      await this.getData(row.id)
    },
    async getData (id) {
      await this.$http.post(api.officialAccountMenuInfo, { id: id }).then(res => {
        this.form = res.data
        if (res.data.type === 'media_id') {
          if (res.data.mediaType === 'news') {
            this.getMedia(res.data.mediaId)
          }
          if (res.data.mediaType === 'image') {
            this.imageUrl = res.data.mediaUrl
          }
        }
      })
    },
    async getMedia (mediaId) {
      this.$http.post(api.getForeverNews, { mediaId: mediaId }).then(res => {
        this.newsList = res.data.news_item
      })
    },
    update () {
      this.$http.post(api.editOfficialAccountMenu, this.form).then(res => {
        this.show = false
        this.$emit('getList')
        this.$notify.success({ title: '成功', message: '保存成功' })
      })
    },
    openSelectedDialog () {
      if (this.form.mediaType === 'news') {
        this.$refs.selectedNews.open()
        return
      }

      if (this.form.mediaType === 'image') {
        this.$refs.selectedImage.open()
        return
      }

      this.$refs.selectedOthers.open(this.form.mediaType)
    },
    handleNewsSelected (row) {
      this.form.mediaId = row.media_id
      this.newsList = row.content.news_item
    },
    handleImageSelected (row) {
      this.form.mediaId = row.media_id
      this.imageUrl = row.url
      this.form.mediaUrl = row.url
    },
    handleOthersSelected (row) {
      this.form.mediaId = row.media_id
      this.form.mediaUrl = row.url
    }
  }
}
</script>

<style>

</style>
