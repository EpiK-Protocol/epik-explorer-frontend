<template>
  <div class="header-con">
    <el-row align="middle" type="flex">
      <el-col :span="4" class="logo-con" @click.native="goTo('home')">
        <img src="/logo.png" class="logo" />
        <span>{{ $t("header.title") }}</span>
      </el-col>
      <el-col :span="8" class="link-con">
        <el-menu mode="horizontal" :default-active="$route.path" :router="true">
          <el-menu-item index="/">
          <div class="">
            {{$t("header.nav.home.label")}}
          </div>
          </el-menu-item>
          <el-submenu index="block">
            <template slot="title">{{
              $t("header.nav.tipset.label")
            }}</template>
            <el-menu-item
              v-for="item in $t('header.nav.tipset.items')"
              :key="item.label"
              :index="item.index"
              >{{ item.label }}</el-menu-item
            >
          </el-submenu>
           <el-menu-item index="/mining/list">
          <div class="">
            {{$t("header.nav.rank.label")}}
          </div>
          </el-menu-item>
           <el-menu-item index="/experts/list">
          <div class="">
            {{$t("header.nav.experts.label")}}
          </div>
          </el-menu-item>
          <!-- <el-menu-item index="https://www.epik-protocol.io/"> -->
          <div class="link">
            <a :href="$t('header.nav.web.index')" target="_blank" class="">
              {{$t("header.nav.web.label")}}
            </a>
            </div>
          <!-- </el-menu-item> -->
          <!-- <el-submenu index="stats">
            <template slot="title">{{ $t("header.nav.stats.label") }}</template>
            <el-menu-item
              v-for="item in $t('header.nav.stats.items')"
              :key="item.label"
              :index="item.index"
              >{{ item.label }}</el-menu-item
            >
          </el-submenu> -->
        </el-menu>
      </el-col>

      <el-col :span="9" class="search-wrap">
        <Search />
      </el-col>
            <el-col :span="3" style="display:flex">
        <!-- <span class="testnet">Testnet</span> -->
        <!-- <span :class="[iconClass,'theme-switch']" @click="handleThemeChange"></span> -->
        <div class="lang-switch" @click="changeLang">
          <span :class="$i18n.locale === 'en'?'active':''" >EN</span>
          <span>/</span>
          <span :class="$i18n.locale === 'zh'?'active':''">中文</span>
        </div>
        <!-- <theme-switch /> -->
      </el-col>
    </el-row>
    <!-- <img :src="testPicSrc" alt="" class="test-pic" /> -->
  </div>
</template>
<script>
import { search } from "@/api/home";
import Search from "./Search";
import ThemeSwitch from "./components/Switch";
import testPic from "@/assets/image/icons/test.png";
import testDarkPic from "@/assets/image/icons/test-dark.png";
export default {
  name: "Header",
  data() {
    return {
      filter: 0,
      key: "",
      loading: false,
      isLight: false
    };
  },
  computed: {
    iconClass() {
      return this.theme === "dark" ? "el-icon-sunny" : "el-icon-moon";
    },
    testPicSrc() {
      return this.theme === "dark" ? testDarkPic : testPic;
    }
  },
  methods: {
    goTarget(name, key) {
      this.goTo(name, {
        query: {
          [key]: this.key
        }
      });
    },
    async handleSearch(e) {
      /* eslint-disable */
      this.key = this.key.replace(/[^0-9a-zA-Z]/g, "");

      if ((e.type === "keyup" && e.keyCode !== 13) || !this.key) {
        return;
      }
      try {
        
        this.loading = true;
      
        let res = await search({
          key: this.key,
          filter: this.filter
        });
        this.loading = false;
        const { model_flag } = res;
        let target = "";
        let key = "";
        switch (model_flag) {
          case "block_hash":
            target = "tipset";
            key = "hash";
            break;
          case "Height":
            target = "tipset";
            key = "height";
            break;
          case "message_ID":
            target = "messageDetail";
            key = "cid";
            break;
          case "actor":
            target = "addressDetail";
            key = "address";
            break;
          case "peer_id":
            target = "peer";
            key = "peer_id";
            break;
          default:
            target = "noResult";
            key = "key";
        }
        this.goTarget(target, key);
      } catch (e) {
        this.loading = false;
      }
    },
  },
  components: {
    Search,
    ThemeSwitch
  }
};
</script>
<style lang="scss" scoped>
.header-con {
  padding: 0 20px;
  height: 70px;
  position: fixed;
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;
  z-index: 1000;
  background: var(--board-bg-color);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0px 1px 0.208vw 0.26vw rgba(0 ,0 ,0 , 0.3);
  .lang-switch{
    margin: 0 30px;
    font-size:14px;
    color: var(--force-mark-color);
    cursor: pointer;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    span:not(.active) {
    opacity: .5;
    color: #7c7c7c;
  }
  span{
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
  }

  }
  .link-con {
    display: flex;
    // justify-content: flex-start;
    justify-content: center;
    ul{
      background: var(--board-bg-color);
      li::v-deep{
        color: var(--main-text-color);
        font-size: 14px;
        &.is-active{
          // font-weight: bold;
          color: var(--force-mark-color);
          border-bottom: none;
          div{
            border-bottom: 2px solid var(--force-mark-color); 
          }
        }
        &:hover,&:focus{
          color: var(--force-mark-color)!important;
          background: var(--board-bg-color)!important;
        }
        div,div>i{
          // background: var(--board-bg-color)!important;
          // color: var(--main-text-color)!important;
          &:hover{
            color: var(--force-mark-color)!important;
            background: var(--board-bg-color)!important;
          }
        }

      }
    }
    a {
      font-size: 24px;
      position: relative;
      &.router-link-exact-active::after {
        content: "";
        display: inline-block;
        position: absolute;
        top: 40px;
        left: 0;
        width: 100%;
        height: 3px;
        background: var(--main-bg-color);
      }
    }
  }
  & ::v-deep .el-menu--horizontal.el-menu {
    border: none!important;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-evenly;
    padding: 0 20px;
    // justify-content: center;
    .link{
      padding:0 10px;
      
      a{
        font-size: 14px;
      }
      &:hover a{
        color: var(--force-mark-color) !important;
      }
    }

  }
  .el-col-2{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .theme-switch{
    font-size: 30px;
    color: var(--main-text-color)
  }
  .testnet{
    font-size: 24px;
    color: var(--link-color);
    margin: 0 15px
  }
  .test-pic{
    position: absolute;
    height: 70px;
    right: 0;
    top: 0
  }
}
.logo-con,
.search-wrap {
  display: flex;
  align-items: center;
  justify-content: left;
  .icon {
    margin-left: auto;
    width: 40px;
  }
}
.logo-con {
  cursor: pointer;
  padding-left: 10px;
}
.logo {
  width: 25px;
  margin-right: 5px;
  & + span {
    font-size: 23px;
    color: var(--main-text-color);
    // color: var(--logo-text-color);
    // text-shadow: 0 0 4px var(--logo-text-color);
  }
}
@media (max-width: 768px) {
  .header-con {
    display: none;
  }
}

.el-menu--horizontal>.el-menu-item{
  line-height: 3.646vw;
  height: 3.646vw;
  padding: 0 10px;
}
::v-deep .el-menu--horizontal>.el-submenu{
  .el-submenu__title{
    line-height: 3.646vw;
    height: 3.646vw;
    font-size: 13px;
    color: var(--main-text-color) !important;
  }
  .el-submenu__title i{
    color: var(--main-text-color);
  }


} 


</style>
