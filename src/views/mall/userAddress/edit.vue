<template>
  <div>
    <el-dialog title="修改收货地址" :visible.sync="showCurrentDialog" width="60%">
      <el-form :model="upForm" style="padding-right:5%;">


        <el-form-item label="地区" :label-width="formLabelWidth">
          <el-cascader
            size="small"
            :options="areaList"
            :props="areaProps"
            v-model="upForm.areaId"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="联系人" :label-width="formLabelWidth">
          <el-input v-model="upForm.contacter" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="具体地址" :label-width="formLabelWidth">
          <el-input v-model="upForm.address" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮编" :label-width="formLabelWidth">
          <el-input v-model="upForm.zipCode" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="upForm.mobile" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="upForm.remark" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="" :label-width="formLabelWidth">
          <el-checkbox label="是否默认" v-model="upForm.isDefault" name="upForm.isDefault"></el-checkbox>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" v-on:click="showCurrentDialog = false">取 消</el-button>
        <el-button size="small" type="primary" v-on:click="doEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'mall-userAddress-edit',
  data () {
    return {
      formLabelWidth: '120px',
      upForm: {},
      areaList: [],
      areaProps: {
        label: 'label',
        value: 'value',
        children: 'children'
      },
      showCurrentDialog: false
    }
  },
  methods: {
    open (id) {
      if (!this.areaList.length) {
        this.getArea()
      }
      this.upForm = {}
      this.getInfo(id)
      this.showCurrentDialog = true
    },
    getInfo (id) {
      var _this = this
      var awNum = 50
      var getResData = null
      var awaitfn = function () {
        if (_this.areaList.length !== 0) {
          _this.upForm = getResData
          return
        }
        if (awNum <= 0) return
        awNum -= 1
        setTimeout(awaitfn, 500)
      }
      this.$http.post(api.userAddressInfo, { id: id }).then(res => {
        getResData = res.data
        awaitfn()
      })
    },
    getArea () {
      this.$http.post(api.loadAreas).then(res => {
        res.data.forEach(x => {
          if (x.depth === 1) {
            let first = {}
            first.label = x.name
            first.value = x.id
            first.children = []
            res.data.forEach(v => {
              if (x.id === v.parentId && v.depth === 2) {
                let second = {}
                second.label = v.name
                second.value = v.id
                second.children = []
                res.data.forEach(c => {
                  if (v.id === c.parentId && c.depth === 3) {
                    let third = {}
                    third.label = c.name
                    third.value = c.id
                    second.children.push(third)
                  }
                })
                first.children.push(second)
              }
            })
            this.areaList.push(first)
          }
        })
      })
    },
    doEdit () {
      this.$http.post(api.editUserAddress, this.upForm).then(res => {
        this.$emit('getList')
        this.showCurrentDialog = false
        this.$notify({ title: '成功', message: '收货地址修改成功！', type: 'success' })
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
