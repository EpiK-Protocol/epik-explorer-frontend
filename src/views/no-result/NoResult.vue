<template>
  <div class="no-result">
    <div v-if="isMobile" class="res">{{ $t("noResult.res") }}</div>
    <div class="info">
      <div v-if="!isMobile" class="res">{{ $t("noResult.res") }}</div>
      <div class="key">
        {{ $t("noResult.key") }}
        <span>{{ $route.query.key }}</span>
      </div>
      <div>{{ $t("noResult.invalid") }}</div>
      <el-button round type="primary" class="back" @click="goTo('home')">
        {{ $t("noResult.back") }}
      </el-button>
    </div>
    <img src="@/assets/image/no-result.png" alt />
  </div>
</template>
<script>
export default {
  name: "NoResult"
};
</script>
<style lang="scss" scoped>
.no-result {
  padding: 100px;
  display: flex;
  .info {
    width: 60%;
    div {
      margin-bottom: 30px;
      color: #999;
      font-size: 20px;
      span {
        color: #333;
        font-size: 30px;
        margin-left: 10px;
      }
    }
    div.res {
      color: var(--link-color);
      font-size: 60px;
      margin-bottom: 50px;
    }
    .key {
      word-break: break-all;
      color: var(--main-text-color);
      span {
        color: var(--main-text-color);
      }
    }
    .key + div {
      color: var(--main-text-color);
    }
  }

  & ::v-deep .back.el-button {
    width: 300px;
    height: 60px;
    border-radius: 4px !important;
    font-size: 20px;
  }
  img {
    max-height: 600px;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    .info {
      order: 2;
      padding: 0 10px;
      width: 100%;
      text-align: center;
      box-sizing: border-box;
      .key{
        font-size: 17px;
        line-height: 20px;
        text-align: left;
        span{
          font-size: 17px;
          color: var(--link-color);
        }
      }
      .key + div{
        font-size: 17px;
        margin-top: 20px;
      }
    }
    img {
      order: 1;
      width: 250px;
      max-height: 62vw;
      margin: 100px auto 50px;
    }
    & ::v-deep .back.el-button {
      width: 140px;
      height: 40px;
      border-radius: 8px;
      box-shadow: 0px 2px 4px 0px var(--link-color);
      margin-top: 20px;
      font-size: 16px;
    }
    .res {
      text-align: center;
      font-weight: bold;
      color: var(--link-color);
      font-size: 20px;
    }
  }
}
</style>
