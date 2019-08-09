<template>
  <div>
    <el-dialog title="添加运费模板" :visible.sync="show" width="60%">
      <el-form :model="form" style="padding-right:5%;">

        <el-form-item label="模板名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="计价方式" :label-width="formLabelWidth">
          <el-radio v-model="form.isQuantity" :label="true">按件数</el-radio>
          <el-radio v-model="form.isQuantity" :label="false">按重量</el-radio>
        </el-form-item>

        <el-form-item label="运送方式" :label-width="formLabelWidth">
          <el-card style="padding-top: 10px;">
            <div>
              <span style="margin-left: 10px;">默认运费</span>
              <span>
                <el-input v-model="form.startQuantity" style="width: 50px;" v-show="form.isQuantity"></el-input>
                <el-input v-model="form.startWeight" style="width: 50px;" v-show="!form.isQuantity"></el-input>
              </span>
              <span>{{ computedUnit }}内，</span>
              <span><el-input v-model="form.startFees" style="width: 50px;"></el-input></span>
              <span>元，每增加</span>
              <span>
                <el-input v-model="form.addQuantity" style="width: 50px;" v-show="form.isQuantity"></el-input>
                <el-input v-model="form.addWeight" style="width: 50px;" v-show="!form.isQuantity"></el-input>
              </span>
              <span>{{ computedUnit }}，增加运费</span>
              <span><el-input v-model="form.addFees" style="width: 50px;"></el-input></span>
              <span>元</span>
            </div>
            <div>
              <el-table
                :data="form.items"
                border
                style="margin-top: 10px;">

                <el-table-column
                  label="运送到">
                  <template slot-scope="scope">
                    <span>{{ scope.row.areas.map(x => x.name).join('、') }}</span>
                    <span><el-button type="text" @click="openAreasDialog(scope.$index)">编辑</el-button></span>
                  </template>
                </el-table-column>

                <el-table-column
                  :label="'首' + computedUnit"
                  width="100">
                  <template slot-scope="scope">
                    <span>
                      <el-input v-model="scope.row.startQuantity" style="width: 50px;" v-show="form.isQuantity"></el-input>
                      <el-input v-model="scope.row.startWeight" style="width: 50px;" v-show="!form.isQuantity"></el-input>
                    </span>
                  </template>
                </el-table-column>

                <el-table-column
                  label="首费(元)"
                  width="100">
                  <template slot-scope="scope">
                    <span><el-input v-model="scope.row.startFees" style="width: 50px;"></el-input></span>
                  </template>
                </el-table-column>

                <el-table-column
                  :label="'续' + computedUnit"
                  width="100">
                  <template slot-scope="scope">
                    <span>
                      <el-input v-model="scope.row.addQuantity" style="width: 50px;" v-show="form.isQuantity"></el-input>
                      <el-input v-model="scope.row.addWeight" style="width: 50px;" v-show="!form.isQuantity"></el-input>
                    </span>
                  </template>
                </el-table-column>

                <el-table-column
                  label="续费(元)"
                  width="100">
                  <template slot-scope="scope">
                    <span><el-input v-model="scope.row.addFees" style="width: 50px;"></el-input></span>
                  </template>
                </el-table-column>

                <el-table-column
                  label="操作"
                  width="80">
                  <template slot-scope="scope">
                    <el-button type="text" @click="areaDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button type="text" @click="openAreasDialog(-1)"><i class="el-icon-plus"></i>为指定的地区设置运费</el-button>
              <el-dialog title="为指定地区设置运费" :visible.sync="showAreas" width="40%" append-to-body>
                <div>
                  <el-checkbox-group v-model="checked">
                    <el-checkbox
                      v-for="item in areas"
                      :key="item.id"
                      :label="item.id"
                      :disabled="item.disabled">{{ item.name }}</el-checkbox>
                  </el-checkbox-group>
                </div>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="showAreas = false">取 消</el-button>
                  <el-button type="primary" @click="confirm">确 定</el-button>
                </div>
              </el-dialog>
            </div>
          </el-card>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="show = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="create">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'replenishment-deliveryTemplate-add',
  data () {
    return {
      show: false,
      form: {},
      formLabelWidth: '120px',
      areas: [],
      showAreas: false,
      checked: [],
      selectedIndex: -1
    }
  },
  methods: {
    open () {
      this.form = {
        isQuantity: true,
        items: []
      }
      this.show = true
      this.loadAreas()
    },
    loadAreas () {
      this.$http.post(api.getProviceAreas).then(res => {
        this.areas = res.data.map(x => {
          return {
            id: x.id,
            name: x.name,
            disabled: false
          }
        })
      })
    },
    create () {
      this.form.items = this.form.items.map(x => {
        x.areaIds = x.areas.map(v => v.id)
        return x
      })
      this.$http.post(api.addDeliveryTemplate, this.form).then(res => {
        this.$emit('getList')
        this.show = false
        this.$notify({ title: '成功', message: '添加成功！', type: 'success' })
      })
    },
    openAreasDialog (index) {
      this.checked = []
      this.selectedIndex = -1
      this.showAreas = true
      this.filterAreas()
      if (index >= 0) {
        let formAreas = this.form.items[index].areas
        this.areas = this.areas.map(x => {
          for (var item of formAreas) {
            if (item.id === x.id) {
              x.disabled = false
              this.checked.push(x.id)
            }
          }

          return x
        })

        this.selectedIndex = index
      }
    },
    filterAreas () {
      if (this.form.items.length === 0) {
        return
      }
      this.areas = this.areas.map(x => {
        x.disabled = false
        for (var item of this.form.items) {
          for (var area of item.areas) {
            if (area.id === x.id) {
              x.disabled = true
            }
          }
        }
        return x
      })
    },
    confirm () {
      let areas = this.getCheckedAreas()

      if (areas.length === 0) {
        return
      }

      if (this.selectedIndex === -1) {
        var item = {
          startWeight: 0,
          startQuantity: 0,
          startFees: 0,
          addWeight: 0,
          addQuantity: 0,
          addFees: 0,
          areas: areas
        }

        this.form.items.push(item)
        this.showAreas = false
        this.checked = []
        return
      }

      this.form.items[this.selectedIndex].areas = areas
      // this.selectedIndex = -1
      this.showAreas = false
      // this.checked = []
    },
    getCheckedAreas () {
      var areas = []
      for (var checked of this.checked) {
        this.areas.map(x => {
          if (x.id === checked) {
            areas.push({
              id: x.id,
              name: x.name
            })
          }
        })
      }
      return areas
    },
    areaDelete (index, rows) {
      this.form.items.splice(index, 1)
    }
  },
  computed: {
    computedUnit () {
      return this.form.isQuantity ? '件' : 'KG'
    }
  }
}
</script>

<style>

</style>
