<template>
  <div>
    <el-dialog title="添加门店" :visible.sync="show" width="40%">
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

        <!-- <el-form-item label="经销商编号" :label-width="formLabelWidth">
          <el-input v-model="form.no" auto-complete="off" size="small"></el-input>
        </el-form-item> -->
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
            :options="areas"
            :props="props"
            v-model="form.areaId"
             size="small"
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
            size="small"
            >
            <el-option
              v-for="item in areaOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-on:click="show = false" size="medium">取 消</el-button>
        <el-button type="primary" v-on:click="create" size="medium" icon="el-icon-success">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'antiChannelConflict-dealer-add',
  data () {
    return {
      form: {},
      formParentSelectDisabled: false,
      formLabelWidth: '120px',
      dialogformVisible: false,
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
      show: false
    }
  },
  methods: {
    open (parent) {
      if (!this.areas.length) {
        this.getArea()
      }
      if (!this.optionsDealerLevel.length) {
        this.getDealerLevel()
      }
      this.show = true
      if (parent && parent.id !== this.form.parentDealerId) {
        this.optionsParentDealer = [{
          id: parent.id,
          name: parent.label
        }]
        this.form = {
          parentDealerId: parent.id
        }
      }
    },
    create () {
      this.$http.post(api.addDealerSellStore, this.form).then(res => {
        this.$notify({ title: '成功', message: '添加成功！', type: 'success' })
        this.$emit('getList')
        this.show = false
      })
    },
    getDealerLevel () {
      this.$http.post(api.dealerLevelAllList).then(res => {
        this.optionsDealerLevel = res.data
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
            this.areas.push(first)
          }
        })
      })
    },
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        this.searchAreas(query, 500)()
      } else {
        this.areaOptions = []
      }
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
