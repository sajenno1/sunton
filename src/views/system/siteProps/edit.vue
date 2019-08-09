<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span style="lineHeight: 32px;">站点配置</span>
        <el-button class="saveButton" type="primary" size="small" @click="save">保存</el-button>
      </div>
      <el-tabs type="border-card">
        <el-tab-pane v-for="item in list" :key="item.key" :label="item.key">
          <el-form>
            <el-form-item v-for="model in item.data" :key="model.name" :label="model.name" label-width="300px">
              <el-input-number
                v-model="model.value"
                v-if="
                  model.valueType === 'System.Int32'
                  || model.valueType === 'System.Int64'
                  || model.valueType === 'System.Decimal'
                  || model.valueType === 'System.Single'"></el-input-number>

              <el-select
                v-model="model.value"
                v-else-if="model.valueType === 'System.Boolean'">
                <el-option label="是" value="true"></el-option>
                <el-option label="否" value="false"></el-option>
              </el-select>

              <el-input
                v-model="model.value"
                v-else></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>

  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'system-siteProps-edit',
  data () {
    return {
      list: []
    }
  },
  methods: {
    getData () {
      this.$http.post(api.sitePropList).then(res => {
        this.list = res.data
        console.log('配置信息')
        console.log(res.data)
      })
    },
    save () {
      let props = this.list.map(x => x.data)
      this.$http.post(api.editSiteProp, { siteProps: props }).then(res => {
        this.$notify.success({ title: '成功', message: '保存成功' })
      })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style>
.saveButton {
  float: right;
}
</style>
