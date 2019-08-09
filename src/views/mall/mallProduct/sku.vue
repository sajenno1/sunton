<template>
  <div>
    <el-dialog title="产品SKU" :visible.sync="show" width="60%">

      <div>
        <el-button style="margin-bottom: 20px; float: right;" size="small" type="primary" icon="el-icon-plus" @click="openAddDialog">添加</el-button>
      </div>

      <div class="table-container">
        <el-table
          :data="list"
          border
          style="width: 100%;">

          <el-table-column
            type="selection"
            width="55">
          </el-table-column>

          <el-table-column
            label="SkuId"
            width="80">
            <template slot-scope="scope">
              <span style="overflow: hidden; text-overflow:ellipsis; white-space: nowrap;">{{ scope.row.id }}</span>
            </template>
          </el-table-column>

          <el-table-column
            v-for="(item, index) in columns"
            :key="item"
            :label="item">
            <template slot-scope="scope">
              <span>{{ scope.row.sku[index].valueName }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="价格">
            <template slot-scope="scope">
              <div>
                <span v-if="scope.row.isEdit">
                  <el-input v-model="scope.row.price"></el-input>
                </span>
                <span v-else>
                  {{ scope.row.price }}
                </span>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="市场价格">
            <template slot-scope="scope">
              <div>
                <span v-if="scope.row.isEdit">
                  <el-input v-model="scope.row.marketPrice"></el-input>
                </span>
                <span v-else>
                  {{ scope.row.marketPrice }}
                </span>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="库存">
            <template slot-scope="scope">
              <div>
                <span v-if="scope.row.isEdit">
                  <el-input v-model="scope.row.quota"></el-input>
                </span>
                <span v-else>
                  {{ scope.row.quota }}
                </span>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="防窜库存"
            prop="scanQuota">
          </el-table-column>

          <el-table-column
            label="操作"
            width="180">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.isEdit"
                size="mini"
                type="success"
                @click="handleSave(scope.$index, scope.row)">保存</el-button>
              <el-button
                v-else
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>

      <div>
        <add-sku
          ref="add"
          @getList="getList"
          :valueIds="valueIds"/>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import addSku from './addSku'
import * as api from '../../../api'
export default {
  name: 'mall-mallProduct-sku',
  components: { addSku },
  data () {
    return {
      show: false,
      list: [],
      row: {},
      columns: [],
      data: []
    }
  },
  methods: {
    async open (row) {
      this.show = true
      this.row = row
      this.list = []
      this.data = []
      this.columns = []
      await this.getList()
    },
    async getList () {
      await this.$http.post(api.mallProductSkuList, { id: this.row.id }).then(res => {
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

      this.columns = this.list[0].sku.map(x => x.propertyName)
    },
    openAddDialog () {
      this.$refs.add.open(this.row)
    },
    handleEdit (index, row) {
      row.isEdit = true
    },
    handleDelete (index, row) {
      this.$confirm('确定删除该Sku吗？').then(() => {
        this.$http.post(api.delMallProductSku, { id: row.id }).then(res => {
          this.getList()
          this.$notify({ title: '成功', message: '删除成功', type: 'success' })
        })
      })
    },
    handleSave (index, row) {
      this.$http.post(api.editMallProductSku, row).then(res => {
        this.$notify.success({ title: '成功', message: '保存成功' })
        row.isEdit = false
      })
    }
  },
  computed: {
    valueIds () {
      return this.list.map(x => {
        let arr = x.properties.split(';')
        return arr.map(v => {
          return v.split(':')[1]
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  margin-top: 10px;
}
</style>

