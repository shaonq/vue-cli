<template>
  <div class="page-common-notice">
    <el-alert title="提示消息演示" type="info" description="点击下方按钮查看" show-icon :closable="!1"></el-alert>
    <el-row>
      <el-button @click="mes()">提示信息</el-button>
      <el-button type="success" @click="mes('success')">成功信息</el-button>
      <el-button type="info" @click="mes('info')">信息按钮</el-button>
      <el-button type="warning" @click="mes('warning')">警告信息</el-button>
      <el-button type="danger" @click="mes('error')">危险按钮</el-button>
    </el-row>

    <el-row>
      <el-button @click="ale()">提示弹窗</el-button>
      <el-button type="success" @click="ale('success')" plain>成功按钮</el-button>
      <el-button type="info" @click="ale('info')" plain>信息按钮</el-button>
      <el-button type="warning" @click="ale('warning')" plain>警告按钮</el-button>
      <el-button type="danger" @click="ale('error')" plain>危险按钮</el-button>
    </el-row>

    <el-row>
      <el-button type="danger" icon="el-icon-delete" @click="del()" circle></el-button>
    </el-row>
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
  methods: {
    mes(type) {
      this.$message({
        message: list[Math.random() * list.length | 0],
        type,
        showClose: true
      });
    },
    ale(type) {
      this.$msgbox({
        message: list[Math.random() * list.length | 0],
        title: '弹窗提示',
        type
      });
    },
    del() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '删除操作', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      })
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