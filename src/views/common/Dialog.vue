<template>
  <div class="page-common-notice">
    <el-button @click="layer = !layer">弹窗</el-button>
    <el-dialog title="提示" :visible.sync="layer" >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="layer = false">取 消</el-button>
        <el-button type="primary" @click="layer = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
const list = [
  '床以外的地方都是远',
  '手够不到的地方都是他乡',
  '每次起床都是背井离乡',
  '上个厕所都是出差到遥远的边疆'
]
export default {
  data() {
    return {
      layer: false
    }
  }
}
</script>
<style lang="scss">
.page-common-notice {
  padding: 20px;
  .el-button + .el-button {
    margin: 10px;
  }
}
</style>