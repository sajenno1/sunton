<template>
  <div>
    <el-dialog title="编辑销售点" :visible.sync="show" width="40%" :before-close="close">
      <el-form :model="form" style="padding-right:5%;">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off" size="small"></el-input>
        </el-form-item>
         <el-form-item label="简称" :label-width="formLabelWidth">
          <el-input v-model="form.shortName" auto-complete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="form.tel" auto-complete="off" size="small"></el-input>
        </el-form-item>
         <el-form-item label="详细地址" :label-width="formLabelWidth">
          <el-input v-model="form.location" auto-complete="off" size="small"></el-input>
        </el-form-item>
       <el-form-item label="禁止补货" :label-width="formLabelWidth">
          <el-select v-model="form.disableReplenish" clearable placeholder="请选择是否禁止补货" size="small">
            <el-option label="是" value="true"></el-option>
            <el-option label="否" value="false"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="地区" :label-width="formLabelWidth">
          <el-cascader
            :options="areas"
            :props="props"
            v-model="form.areaId"
             size="small"
            ></el-cascader>
        </el-form-item>

        <el-form-item label="区域负责人" :label-width="formLabelWidth">
          <el-input v-model="areaManager" readonly style="width:350px;"></el-input>
          <el-button type="primary" @click="selectAreaManager" size="medium">更换区域负责人</el-button>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false" size="medium">取 消</el-button>
        <el-button type="primary" @click="update" size="medium">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="选择区域负责人" :visible.sync="dialogAreaManagerListVisible" width="60%">
     <div>
       <el-input v-model="areaManagerName" style="width: 200px; margin-bottom: 10px;" placeholder="请输入区域负责人姓名"></el-input>
        <el-input v-model="mobile" style="width: 200px;" placeholder="请输入区域负责人手机"></el-input>
         <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </div>
      <div>
       <el-table
          :data="list"
          border
          style="width: 100%">
          <el-table-column
            label="头像">
            <template slot-scope="scope">
              <img :src="scope.row.avatar.replace('/0', '/64')" style="max-width: 64px; max-height: 64px;" />
            </template>
          </el-table-column>

          <el-table-column
            label="姓名"
            prop="name">
          </el-table-column>

          <el-table-column
            label="昵称"
            prop="nickName">
          </el-table-column>

          <el-table-column
            label="手机"
            prop="mobile" align="center">
          </el-table-column>

          <el-table-column
            label="性别"
            align="center">
            <template slot-scope="scope">
              <span>{{ genderEnum[scope.row.sex] }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="OpenId"
            prop="openId">
          </el-table-column>

          <el-table-column
            label="创建时间"
            align="center"
            width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" @click="selectedAreaManageer(scope.$index, scope.row)" size="medium">选择</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="page-container" v-if="total > pageSize">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="prev, pager, next, sizes, total"
          :total="total">
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUserListVisible = false" size="medium">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'sales-posSeller-edit',
  data () {
    return {
      form: {},
      formLabelWidth: '120px',
      loading: false,
      timer: null,
      show: false,
      areaMangerOptions: [],
      areas: [],
      props: {
        label: 'label',
        value: 'value',
        children: 'children'
      },
      list: [],
      dialogAreaManagerListVisible: false,
      areaManagerName: '',
      mobile: '',
      genderEnum: {
        Unknown: '未知',
        Male: '男',
        Female: '女'
      },
      pageSize: 10,
      currentPage: 1,
      total: 0,
      areaManager: ''
    }
  },
  methods: {
    open (id) {
      this.form = {}
      this.areaOptions = []
      if (this.areas.length === 0) {
        this.getArea().then(res => {
          this.getInfo(id)
        })
        return
      }
      this.getInfo(id)
    },
    close (done) {
      this.show = false
      this.$emit('close')
    },
    getInfo (id) {
      this.$http.post(api.posInfo, { id: id }).then(res => {
        this.form = res.data
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
        if (res.data.disableReplenish) {
          this.form.disableReplenish = '是'
        } else {
          this.form.disableReplenish = '否'
        }
        this.form.areaId = [first, second, third]
        this.areaManager = res.data.areaManagerName
      })
    },
    update () {
      if (this.form.disableReplenish === '是') {
        this.form.disableReplenish = true
      }
      if (this.form.disableReplenish === '否') {
        this.form.disableReplenish = false
      }
      this.$http.post(api.editPOS, this.form).then(res => {
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
    selectAreaManager () {
      this.dialogAreaManagerListVisible = true
      this.getAreaManagerList()
    },
    getAreaManagerList () {
      this.$http.post(api.areaManagerInfoList, {
        page: this.currentPage,
        pageSize: this.pageSize,
        name: this.areaManagerName,
        mobile: this.mobile
      }).then(res => {
        this.list = res.data.rows
        this.total = res.data.total
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.currentPage = 1
      this.getAreaManagerList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getAreaManagerList()
    },
    search () {
      this.currentPage = 1
      this.total = 0
      this.getAreaManagerList()
    },
    selectedAreaManageer (index, row) {
      this.form.areaManagerId = row.id
      this.areaManager = row.name
      this.dialogAreaManagerListVisible = false
    }
  }
}
</script>

<style>

</style>
