<template>
  <div>
    <el-card>
      <div class="headerCon clearfix" slot="header">
        <span>可扩展模块管理</span>
        <el-button class="right" style="margin-left:5px;" size="small" type="primary" icon="el-icon-refresh" v-on:click="getList">刷新</el-button>
        <!-- <el-button class="right" size="small" type="primary" icon="el-icon-plus" click="dialogCreatedFormVisible = !dialogCreatedFormVisible">添加</el-button> -->
      </div>
      <div class="table-container">
        <el-table
          v-bind:data="datalist">

          <el-table-column
            label="名称" align="left" width="325">
            <template slot-scope="scope">
              <span v-bind:class="{red: scope.row.enabled }">{{ scope.row.id }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="类别"
            prop="category" width="120">
          </el-table-column>

          <el-table-column
            label="说明" align="left" width="500">
            <template slot-scope="scope">
              <span>{{ scope.row.description }}</span><!--{{ scope.row.createDate | FormattersDateTime }}-->
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" width="300">
            <template slot-scope="scope">
              <el-button v-show="!scope.row.enabled"
                size="mini" class="red"
                v-on:click="enabledchange(scope.$index, scope.row, true)">启用</el-button>
              <el-button v-show="scope.row.enabled"
                size="mini"
                v-on:click="enabledchange(scope.$index, scope.row, false)">停用</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!--
      <div class="page-container" v-if="total > pageSize">
        <el-pagination
          v-on:size-change="handleSizeChange"
          v-on:current-change="handleCurrentChange"
          layout="prev, pager, next, sizes, total"
          v-bind:total="total">
        </el-pagination>
      </div>
      -->
    </el-card>

  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'system-extendModule-list',
  data () {
    return {
      formLabelWidth: '120px',
      datalist: [],
      pageSize: 10,
      currentPage: 1,
      total: 0
    }
  },
  methods: {
    getList () {
      this.$http.post(api.extendModuleList, {
        page: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        this.datalist = res.data.rows
        this.total = res.data.total
      })
    },
    enabledchange (index, row, enabled) {
      var _this = this
      if (!confirm('确定要 ' + (enabled ? '启用' : '停用') + ' 吗? (此操作需要重新登录)')) return
      _this.$http.post(api.extendModuleEnabledChange, {
        id: row.id,
        enabled: enabled
      }).then(response => {
        if (response.status === 200) {
          _this.getList()
        } else {
          alert(response.statusText)
        }
      })
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  margin-top: 10px;
}
.table-container {
  margin-top: 10px;
}

.red {
    color: red;
}
.gray {
    color: gray;
}
</style>
