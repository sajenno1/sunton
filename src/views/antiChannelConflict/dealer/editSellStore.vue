<template>
  <div>
    <el-dialog title="编辑门店" :visible.sync="show" width="40%">
      <el-form :model="form" style="padding-right:5%;">
        <!-- <el-form-item label="上级经销商" :label-width="formLabelWidth">
          <el-select
            size="small"
            v-model="form.parentDealerId"
            popper-class="select-parentdealer"
            filterable
            remote
            clearable
            reserve-keyword
            placeholder="请输入上级经销商"
            :remote-method="remoteMethodParentDealer"
            :loading="loading">
            <el-option
              v-for="item in optionsParentDealer"
              :key="item.id"
              :label="item.name"
              :value="item.id">
              <div class="name">{{ item.name }}</div>
              <span class="addr">{{ item.areaName }}</span>
            </el-option>
          </el-select>
        </el-form-item> -->

        <el-form-item label="编号" :label-width="formLabelWidth">
          <el-input v-model="form.no" auto-complete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off" size="small"></el-input>
        </el-form-item>
        <!-- <el-form-item label="经销商等级" :label-width="formLabelWidth">
          <el-select v-model="form.dealerLevelId" placeholder="请选择经销商等级">
            <el-option
              v-for="item in optionsDealerLevel"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="联系人" :label-width="formLabelWidth">
          <el-input v-model="form.linkMan" auto-complete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" auto-complete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" auto-complete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.tel" auto-complete="off" size="small"></el-input>
        </el-form-item>
        <!-- <el-form-item label="地区" :label-width="formLabelWidth">
          <el-cascader
            size="small"
            :options="areas"
            :props="props"
            v-model="form.areaId"
            ></el-cascader>
        </el-form-item> -->
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" auto-complete="off" size="small"></el-input>
        </el-form-item>
        <!-- <el-form-item label="销售地区" :label-width="formLabelWidth">
          <el-select
            v-model="form.sellAreaIds"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="请输入地区名称"
            :remote-method="remoteMethod"
            :loading="loading"
            size="small">
            <el-option
              v-for="item in areaOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="总部发货权" :label-width="formLabelWidth">
          <el-checkbox v-model="form.isOutStockSpecif" >启用</el-checkbox>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-on:click="show = false" size="medium">取 消</el-button>
        <el-button type="primary" v-on:click="update" size="medium">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'antiChannelConflict-dealer-edit',
  data () {
    return {
      form: {},
      formLabelWidth: '120px',
      dialogCreatedFormVisible: false,
      areas: [],
      optionsParentDealer: [],
      optionsDealerLevel: [],
      props: {
        label: 'label',
        value: 'value',
        children: 'children'
      },
      loading: false,
      areaOptions: [],
      timer: null,
      show: false,
      list: []
    }
  },
  methods: {
    async open (row) {
      if (this.optionsDealerLevel.length === 0) {
        await this.getDealerLevel()
      }
      if (this.areas.length === 0) {
        this.getArea().then(res => {
          this.getInfo(row.id)
        })
        return
      }
      this.getInfo(row.id)
    },
    getInfo (id) {
      this.$http.post(api.dealerInfo, { id: id }).then(res => {
        this.form = res.data
        if (res.data.parentDealer) {
          this.optionsParentDealer = [ res.data.parentDealer ]
        }
        let third = this.form.areaId
        let second
        let first
        this.list.forEach(x => {
          if (x.id === third) {
            second = x.parentId
            this.list.forEach(v => {
              if (second === v.id) {
                first = v.parentId
              }
            })
          }
        })
        this.show = true
        this.form.areaId = [first, second, third]
        this.$http.post(api.lodaSelectedAreas, { areaIds: this.form.sellAreas }).then(res1 => {
          this.areaOptions = res1.data.map(x => {
            return {
              label: x.fullName,
              value: x.id
            }
          })
          this.form.sellAreaIds = this.form.sellAreas
        })
      })
    },
    update () {
      this.$http.post(api.editDealerSellStore, this.form).then(res => {
        this.$notify({ title: '成功', message: '编辑成功！', type: 'success' })
        this.$emit('getList')
        this.show = false
      })
    },
    getArea () {
      return this.$http.post(api.loadAreas).then(res => {
        this.list = res.data
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
            this.areas.push(first)
          }
        })
      })
    },
    async getDealerLevel () {
      this.$http.post(api.dealerLevelAllList).then(res => {
        this.optionsDealerLevel = res.data
      })
    },
    remoteMethodParentDealer (query) {
      if (query !== '') {
        this.loading = true
        this.loadParentDealers(query, 500)()
      } else {
        this.optionsParentDealer = []
      }
    },
    loadParentDealers (query, time) {
      return () => {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$http.post(api.loadDealerList, { name: query }).then(res => {
            this.loading = false
            this.optionsParentDealer = res.data
          })
        }, time)
      }
    },
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        this.searchAreas(query, 500)()
      } else {
        this.areaOptions = []
      }
    },
    searchAreas (query, time) {
      return () => {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$http.post(api.loadFullNameAreas, { name: query }).then(res => {
            this.loading = false
            this.areaOptions = res.data.map(x => {
              return {
                label: x.fullName,
                value: x.id
              }
            })
          })
        }, time)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.select-parentdealer li {
  line-height: normal;
  padding: 7px;
  height: 60px;
  border-bottom: 1px solid #eeeeee
}
.select-parentdealer .name {
  text-overflow: ellipsis;
  overflow: hidden;
}
.select-parentdealer   .addr {
  font-size: 12px;
  color: #b4b4b4;
}

.select-parentdealer .highlighted .addr {
  color: #ddd;
}

</style>