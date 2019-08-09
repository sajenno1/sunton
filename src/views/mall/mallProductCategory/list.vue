<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <div slot="header">
            <span>产品分类</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text" @click="addTopCategory">添加顶级分类</el-button> -->
          </div>
          <div>
            <el-tree
              :data="tree"
              :props="defaultProps"
              node-key="id"
              highlight-current
              :expand-on-click-node="false"
              default-expand-all
              @node-click="handleNodeClick"></el-tree>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <div class="headerCon clearfix" slot="header">
            <span>{{ selected.name || '产品分类' }}</span>
            <el-button class="right" style="margin-left: 5px;" size="small" type="primary" icon="el-icon-plus" @click="openAddDialog">添加</el-button>
            <el-button class="right" size="small" type="primary" @click="saveSort">保存排序</el-button>
          </div>
          <div class="table-container">
            <el-table
              :data="list"
              border
              style="width: 100%">

              <el-table-column
                type="selection"
                width="55">
              </el-table-column>

              <el-table-column
                label="图片">
                <template slot-scope="scope">
                  <img v-if="scope.row.photo" :src="scope.row.photo" :alt="scope.row.name" style="max-width: 64px; max-height: 64px;">
                </template>
              </el-table-column>

              <el-table-column
                label="名称"
                prop="name">
              </el-table-column>

              <el-table-column
                label="创建时间"
                align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.createDate | FormattersDateTime }}</span>
                </template>
              </el-table-column>

              <el-table-column align="center" label="拖拽" width="80">
                <template slot-scope="scope">
                  <i class="el-icon-rank"></i>
                </template>
              </el-table-column>

              <el-table-column label="操作" width="180" align="center">
                <template slot-scope="scope">
                  <el-button
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
        </el-card>
      </el-col>
    </el-row>

    <div>
      <add-product-category
        ref="add"
        @getList="refresh"/>

      <edit-product-category
        ref="edit"
        @getList="refresh"/>
    </div>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
import * as api from '../../../api'
import addProductCategory from './add'
import editProductCategory from './edit'
export default {
  name: 'mall-mallProductCategory-list',
  components: { addProductCategory, editProductCategory },
  data () {
    return {
      tree: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      selected: {},
      list: [],
      olderList: [],
      newList: [],
      sortable: null
    }
  },
  methods: {
    getTree () {
      this.$http.post(api.mallProductCategoryTree).then(res => {
        this.tree = res.data
      })
    },
    refresh () {
      this.getTree()
      this.getList()
    },
    handleNodeClick (data) {
      if (data.id === this.selected.id) {
        return
      }

      this.selected = data
      this.getList()
    },
    getList () {
      this.$http.post(api.mallProductCategoryList, { id: this.selected.id }).then(res => {
        this.list = res.data
        this.olderList = this.list.map(v => v.id)
        this.newList = this.olderList.slice()
        this.$nextTick(() => {
          this.setSort()
        })
      })
    },
    setSort () {
      const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        onEnd: evt => {
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
          this.newList.splice(evt.newIndex, 0, tempIndex)
        }
      })
    },
    addTopCategory () {
      this.$refs.add.open(null)
    },
    openAddDialog () {
      this.$refs.add.open(this.selected.id)
    },
    handleEdit (index, row) {
      this.$refs.edit.open(row)
    },
    handleDelete (index, row) {
      this.$confirm('确定删除该商品分类吗？')
        .then(() => {
          this.$http.post(api.delMallProductCategory, { id: row.id }).then(res => {
            this.refresh()
            this.$notify({ title: '成功', message: '删除成功！', type: 'success' })
          })
        })
        .catch(() => {})
    },
    saveSort () {
      if (this.list.length === 0) {
        return
      }
      let sortList = []
      for (var i = 0; i < this.newList.length; i++) {
        sortList.push({
          id: this.newList[i],
          sort: i
        })
      }
      this.$http.post(api.setMallProductCategorySort, { sort: sortList }).then(res => {
        this.$notify({ title: '成功', message: '设置成功！', type: 'success' })
      })
    }
  },
  mounted () {
    this.refresh()
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  margin-top: 10px;
}
</style>
