<template>
  <div class="page-home">
    <div class="page-home__side">
      <div>
        <h5>list</h5>
        <a href="javascript:;">表单</a>
      </div>
    </div>
    <div class="page-home__body">
      <div>
        <h3>图标</h3>
        <i class="el-icon-edit"></i>
        <i class="el-icon-share"></i>
        <i class="el-icon-delete"></i>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>

        <h3>按钮</h3>

        <el-row>
          <el-button>默认按钮</el-button>
          <el-button type="primary">主要按钮</el-button>
          <el-button type="success">成功按钮</el-button>
          <el-button type="info">信息按钮</el-button>
          <el-button type="warning">警告按钮</el-button>
          <el-button type="danger">危险按钮</el-button>
        </el-row>

        <el-row>
          <el-button plain>朴素按钮</el-button>
          <el-button type="primary" plain>主要按钮</el-button>
          <el-button type="success" plain>成功按钮</el-button>
          <el-button type="info" plain>信息按钮</el-button>
          <el-button type="warning" plain>警告按钮</el-button>
          <el-button type="danger" plain>危险按钮</el-button>
        </el-row>

        <el-row>
          <el-button round>圆角按钮</el-button>
          <el-button type="primary" round>主要按钮</el-button>
          <el-button type="success" round>成功按钮</el-button>
          <el-button type="info" round>信息按钮</el-button>
          <el-button type="warning" round>警告按钮</el-button>
          <el-button type="danger" round>危险按钮</el-button>
        </el-row>

        <el-row>
          <el-button icon="el-icon-search" circle></el-button>
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="success" icon="el-icon-check" circle></el-button>
          <el-button type="info" icon="el-icon-message" circle></el-button>
          <el-button type="warning" icon="el-icon-star-off" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
        </el-row>

        <div style="margin-top: 20px">
          <el-radio-group>
            <el-radio-button label="上海"></el-radio-button>
            <el-radio-button label="北京"></el-radio-button>
            <el-radio-button label="广州"></el-radio-button>
            <el-radio-button label="深圳"></el-radio-button>
          </el-radio-group>
        </div>

        <h3>表单</h3>
        <el-input placeholder="请输入密码" show-password></el-input>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  data() {
    return {

    }
  },
  mounted() {

  }
}
</script>
<style lang="scss">
.page-home {
  position: relative;
  height: calc(100vh - 100px);
  &__side,
  &__body {
    height: 100%;
  }
  &__side {
    position: absolute;
    width: 200px;
    & > div {
      height: 100%;
      overflow-y: hidden;
      padding: 20px;
      box-sizing: border-box;
      &:hover {
        overflow-y: auto;
      }
    }
    h3,
    a {
      font-size: 14px;
      line-height: 40px;
      height: 40px;
      margin: 0;
      padding: 0;
      text-decoration: none;
      display: block;
      position: relative;
      transition: 0.15s ease-out;
    }
    h3 {
      font-size: 16px;
      font-weight: 700;
    }
    h5 {
      font-size: 12px;
      color: #999;
      line-height: 26px;
      margin-top: 15px;
    }
  }
  &__body {
    margin-left: 200px;
  }
}
</style>
