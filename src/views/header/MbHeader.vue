<template>
  <div class="mb-header-con">
    <div class="header-main">
      <div class="el-icon-arrow-left arrow-back" v-if="!atIndex" @click.stop="$router.go(-1)"><div :class="['route-name',$route.name == 'addressDetail'||$route.name == 'messageDetail'?'mcopy':'']" @click.stop="copyaddress(title)">{{ title }}</div></div>
      <div class="logo" v-else>
        <img src="@/assets/image/epik_m_logo.png" />
        <span>{{ $t("header.title") }}</span>
      </div>
      <!-- <div class="route-name">{{ routeName }}</div> -->
      <div class="tools" v-if="!showSearch && !showNav">
        <div class="lang-switch" @click="changeLang">
          <span :class="$i18n.locale === 'en'?'active':''" >EN</span>/
          <span :class="$i18n.locale === 'zh'?'active':''">中文</span>
        </div>
        <img :src="searchSrc" style="width:4.2vw;margin-right: 2vw;" alt @click="showSearch = true" />
        <img :src="moreSrc" alt @click="showNav = true" />
        <!-- <theme-switch /> -->
      </div>
      <div class="close" v-else @click="hide">
        <span class="el-icon-close"></span>
      </div>
    </div>
    <div v-if="showNav" class="nav-bar">
      <div v-for="(value, key) in $t('header.nav')" :key="key" class="nav-item">
        <div class="title" @click="go(value.index)">{{ value.label }}</div>
        <div v-if="value.items">
          <div
            v-for="item in value.items"
            :key="item.index"
            class="sub-item"
            @click="go(item.index)"
          >{{ item.label }}</div>
        </div>
      </div>
    </div>
    <div v-if="showSearch" class="search-bar">
      <div>{{ $t("header.mb.title") }}</div>
      <Search @hide="hide" />
    </div>
  </div>
</template>
<script>
import Search from "./Search";
import ThemeSwitch from "./components/Switch";
import searchIcon from "@/assets/image/icons/search.png";
import searchDarkIcon from "@/assets/image/icons/search-dark.png";
import moreIcon from "@/assets/image/icons/more.png";
import moreDarkIcon from "@/assets/image/icons/more-dark.png";
export default {
  name: "MbHeader",
  data() {
    return {
      showNav: false,
      showSearch: false
    };
  },
  computed: {
    searchSrc() {
      return this.theme === "light" ? searchIcon : searchDarkIcon;
    },
    moreSrc() {
      return this.theme === "light" ? moreIcon : moreDarkIcon;
    },
    atitle(){
      if(this.$route.name == 'addressDetail'){
        return (this.$route.query.address)
      }
      if(this.$route.name == 'messageDetail'){
        return (this.$route.query.cid) 
      }
      if(this.$route.name == 'addressCoinbase'){
        return this.$route.query.coinbase 
      }
      return this.routeName

    },
     title(){
      if(this.$route.name == 'addressDetail'){
        return this.ellipsisByLength(this.$route.query.address)
      }
      if(this.$route.name == 'messageDetail'){
        return this.ellipsisByLength(this.$route.query.cid) 
      }
      if(this.$route.name == 'addressCoinbase'){
        return this.$route.query.coinbase 
      }
      return this.routeName

    }
  },

  methods: {
    copyaddress(){
      if(this.$route.name == 'addressDetail'||this.$route.name == 'messageDetail'){
        this.docopy(this.atitle, 'copy')
      }
      

    },
    
    go(path) {
      if(path.indexOf('http')>-1){
        window.open(path)
        return
      } 
      this.showNav = false;
      this.$router.push(path);
    },
    hide() {
      this.showNav = false;
      this.showSearch = false;
    }
  },
  components: {
    Search,
    ThemeSwitch
  }
};
</script>
<style lang="scss" scoped>
@media (max-width: 768px) {
  .mb-header-con {
    z-index: 10;
    background: var(--main-bg-color);
    top: 0;
    width: 100%;
    position: fixed;
    font-size: 4vw;
    .header-main {
      background: var(--board-bg-color);
      z-index: 10000;
      padding: 0 10px;
      display: flex !important;
      height: 13.4vw;
      box-shadow: 0px 1px 0.365vw 0.469vw rgba(0, 0, 0, 0.03);
      box-sizing: border-box;
      justify-content: space-between;
      & > div:first-child,
      .route-name {
        color: var(--main-text-color);
        font-size:17px;
        margin-left: 10px;
        // color: var(--logo-text-color);
        // text-shadow: 0 0 4px var(--logo-text-color);
      }
      .logo {
        height: 100%;
        display: flex;
        align-items: center;
        line-height: 13.4vw;
        color: var(--logo-text-color);
      }
      img {
        width: 6.3vw;
        &:first-child {
          margin-right: 3vw;
        }
      }
      .tools {
        display: flex;
        align-items: center;
        .lang-switch {
          margin-right: 2vw;
          color: #ccc;
          font-size: 12px;
          span.active{
            color: var(--force-mark-color);
          }
        }
      }
    }
    .nav-bar,
    .search-bar {
      position: fixed;
      width: 100%;
      top: 44px;
      height: 100%;
      padding: 10px;

      z-index: 10000;
      background: var(--main-bg-color);

      .nav-item {
        margin-bottom: 4vw;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.03);
        border-radius: 10px;
        font-size: 4vw;
        background: var(--board-bg-color);
        color: var(--main-text-color);
        .title {
          height: 10.6vw;
          font-weight: bold;
          padding-left: 6vw;
          line-height: 10.6vw;
        }
        .sub-item {
          height: 10.6vw;
          border-top: 1px solid var(--border-bottom-color);
          padding-left: 10vw;
          line-height: 10.6vw;
        }
      }
    }
    .search-bar {
      background: var(--board-bg-color);
      & > div:first-child {
        margin-top: 30vh;
        text-align: center;
        margin-bottom: 20px;
        color: var(--main-text-color);
      }
      .el-select{
        width:300px;
      }
      .el-button {
        display: block;
        width: 100%;
        margin-top: 20px;
        height: 30px;
        border-radius: 15px;
      }
    }
    .close {
      display: flex;
      align-items: center;
      background: var(--board-bg-color);
      text-align: right;
      height: 13.4vw;
      line-height: 13.4vw;
      color: var(--main-text-color);
      &::before {
        font-size: 8vw;
        margin-right: 4vw;
      }
      img {
        width: 6.3vw;
      }
      span {
        font-size: 8vw;
      }
    }
    .arrow-back {
      display: flex !important;
      align-items: center !important;
      font-size: 6.6vw;
    }
    .route-name {
      display: flex;
      align-items: center;
    }
  }
}
</style>
