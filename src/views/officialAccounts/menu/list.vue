<template>
  <div>
    <el-card>
      <div class="headerCon clearfix" slot="header">
        <span>公众号菜单</span>
        <el-button class="right" style="margin-left: 5px;" size="small" type="primary" icon="el-icon-plus" @click="openAddDialog">添加</el-button>
        <el-button class="right" size="small" type="primary" icon="el-icon-share" @click="handlePublish">发布</el-button>
      </div>
      <div class="list-container">
        <ul style="width: 30%">
          <li v-for="item in list" :key="item.id">
            <div>
              <el-row>
                <el-col :span="14">
                  <span>{{ item.name }}</span>
                </el-col>
                <el-col :span="10">
                  <el-button
                    size="mini"
                    @click="handleEdit(item)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(item)">删除</el-button>
                </el-col>
              </el-row>
            </div>
            <ul class="sub-ul">
              <li v-for="sub in item.subMenus" :key="sub.id">
                <el-row>
                  <el-col :span="14">
                    <span>{{ sub.name }}</span>
                  </el-col>
                  <el-col :span="10">
                    <el-button
                      size="mini"
                      @click="handleEdit(sub)">编辑</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(sub)">删除</el-button>
                  </el-col>
                </el-row>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div>
        <add-menu ref="add" @getList="getList"/>
        <edit-menu ref="edit" @getList="getList"/>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as api from '../../../api'
import addMenu from './add'
import editMenu from './edit'
export default {
  name: 'officialAccounts-menu-list',
  components: { addMenu, editMenu },
  data () {
    return {
      list: []
    }
  },
  methods: {
    getList () {
      this.$http.post(api.officialAccountMenuList).then(res => {
        this.list = res.data
      })
    },
    openAddDialog () {
      this.$refs.add.open()
    },
    handleEdit (row) {
      this.$refs.edit.open(row)
    },
    handleDelete (row) {
      this.$confirm('确定要删除公众号目录吗？')
        .then(() => {
          this.$http.post(api.delOfficialAccountMenu, { id: row.id }).then(res => {
            this.getList()
            this.$notify.success({ title: '成功', message: '删除成功' })
          })
        })
        .catch(() => {})
    },
    handlePublish () {
      this.$http.post(api.publishOfficialAccountMenu).then(res => {
        this.$notify.success({ title: '成功', message: '发布成功' })
      })
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
.list-container {
  ul {
    li {
      list-style: none;
    }
  }
}
.sub-ul {
  li {
    line-height: 40px;
  }
}
</style>

