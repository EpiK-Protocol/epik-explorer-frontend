<template>
  <div class="header-search">

    <el-input
      :placeholder="$t('header.placeholder')"
      v-model="key"
      :class="['input-with-select', theme === 'light' ? 'light' : 'dark']"
      @keyup.native="handleSearch"
      :clearable="!isMobile"
      :suffix-icon="loading && !isMobile ? 'el-icon-loading' : ''"
    >
    
      <el-select
        v-model="filter"
        slot="prepend"
        popper-class="filter-select"
        class="search-filter"
      >
        <el-option
          v-for="item in $t('header.filter')"
          :key="item.label"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button
        slot="append"
        icon="el-icon-search"
        @click.native="handleSearch"
        v-if="!isMobile"
      ></el-button>
    </el-input>
    <div class="mb-button" v-if="isMobile">
      <el-button type="primary" @click.native="handleSearch">
        {{ $t("header.mb.search") }}
      </el-button>
    </div>
  </div>
</template>
<script>
import { search } from "@/api/home";
export default {
  name: "Search",
  data() {
    return {
      filter: 0,
      key: "",
      loading: false
    };
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
          word: this.key,
          // type: this.filter
        });
        // debugger
        this.loading = false;
        // const { model_flag } = res;
        let target = "";
        let key = "";
        // let filter = this.filter
        let filter = res.type
        if(res.code.code !== 0) filter = 'noResult'
  
        switch (filter) {
          case "block":
            target = "tipset";
            key = "hash";
            break;
          case "Height":
            target = "tipset";
            key = "height";
            break;
          // case "message_ID":
          //   target = "message";
          //   key = "cid";
          //   break;
          case "message":
            target = "messageDetail";
            key = "cid";
            break;
          case "address":
            target = "addressDetail";
            key = "address";
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
        this.$emit("hide");
        
        this.goTarget(target, key);
      } catch (e) {
        this.loading = false;
      }
    }
  },
  watch: {
    "$route.path"() {
      this.key = "";
    }
  }
};
</script>
<style lang="scss" scoped>
.header-search {
  flex: 1;
  box-shadow: 0 0 0.313vw 0 rgba(0,0,0,.25);
  box-sizing: border-box;
  // border-radius: 1.042vw;
  ::v-deep .el-input-group{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .input-with-select {
    & ::v-deep  input:nth-child(2) {
      background: var(--board-bg-color) !important;
      color: var(--main-text-color);
      height: 40px!important;
      line-height: 40px;
      
      padding: 0 40px 0 20px!important;
      // border: none!important;
      border-radius: 0!important;
      
      font-size: 14px;
      box-sizing: border-box;
      
      
     
    }
    &.dark ::v-deep input:nth-child(2) {
      border-color:  var(--search-bg-color);
      background: var(--search-bg-color)!important;
      color: var(--main-text-color)!important;
      box-sizing: content-box;
      
    }
    &.dark ::v-deep .el-input-group__prepend{
      background: var(--search-bg-color)!important;
      border-color: transparent;
      border-right: 1px solid var(--board-bg-color);
      
    
      .el-select .el-input input{
        color: var(--search-text-color) !important;
        font-size: 14px;
      }
    }
    &.dark ::v-deep .el-input-group__append {
      background: var(--search-bg-color)!important;
      border-color: transparent;
      border-left: 1px solid var(--board-bg-color);
      height: 40px !important;
      line-height:40px!important; 
      font-size: 16px;
    }
  }
  & ::v-deep .el-input-group__prepend {
    background: var(--board-bg-color) !important;
    height: 40px;
    font-weight: 500;
    line-height: 40px;
    width: 8.854vw;
 
    .el-select.search-filter input {
      width: 150px;
      background: transparent !important;
    }
  }
  & ::v-deep .el-input-group__append {
    background: var(--board-bg-color) !important;
    color: var(--main-text-color) !important;
    width: 20px;
  }
  & ::v-deep .el-button {
    width: 70px;
  }
  & ::v-deep .el-input__suffix {
      .el-select__caret{
        font-size: 12PX !important;
        color: var(--search-text-color);
      }
      i {
        line-height: 40px;
        padding-left: 5px;
        
        &.is-reverse {
          padding-right: 10px;
        }
      }
      i.el-icon-loading{
        padding-left: 0px;
        height: 30PX;
        width: 30PX;
        line-height: 30PX;
      }
    }
  @media (max-width: 768px) {
    .input-with-select {
    & ::v-deep  input:nth-child(2) {
      background: var(--board-bg-color) !important;
      color: var(--main-text-color);
      height: 40px!important;
      line-height: 40px;
      
      padding: 0 40px 0 20px!important;
      // border: none!important;
      border-radius: 0!important;
      
      font-size: 12PX;
      box-sizing: border-box;

    }

    }
    & ::v-deep .el-input-group__prepend {
    background: var(--board-bg-color) !important;
    height: 40px;
    font-weight: 500;
    line-height: 40px;
    width: 100px;
 
    .el-select.search-filter input {
      width: 150px;
      background: transparent !important;
    }
  }
    & ::v-deep input {
      // height: 30px !important;
      // border-radius: 15px !important;
    }
    input {
      height: 30px!important;
      border-radius: 4px!important;
      background: var(--board-bg-color)!important;
      border: none!important;
      margin-bottom: 10px;
      padding-left: 10px!important;
      font-size: 10px!important;

    }
    & ::v-deep .el-input-group{
      font-size: 10px !important;
    }
    & ::v-deep .el-select input{
      width: 95px !important;
    }
    & ::v-deep .el-input__suffix {
      .el-select__caret{
        font-size: 10px !important;
      }
      i {
        line-height: 20px;
        padding-left: 5px;
        &.is-reverse {
          padding-right: 10px;
        }
      }
    }
    & ::v-deep button {
      width: 50px !important;
    }
    .mb-button .el-button {
      // height: 30px;
      // border-radius: 15px;
      width: 100% !important;
      margin-top: 20px;
      font-size: 14px !important;
    }
  }
}
</style>