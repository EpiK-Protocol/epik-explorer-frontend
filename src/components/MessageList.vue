<template>
  <div
    class="message-list"
    v-loading="loading"
    element-loading-background="var(--board-bg-color)"
  >
    <div class="total-number border-bottom" slot="header">
      <span
        v-html="$t('component.mesList.total', { total: formatNumber(total) })"
      ></span>
      <!-- <el-select
        v-model="option.method"
        @change="handleMethodChange"
        :placeholder="$t('component.mesList.placeholder')"
      >
        <el-option label="All Method" value="" />
        <el-option
          v-for="item in method"
          :key="item.label"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select> -->
    </div>
    <div class="table-con" v-if="!isMobile">
      <base-table
        :dataSource="messageData"
        :columns="columns"
        showPagination
        :total="total"
        @size-change="handleSizeChange"
        @page-change="handlePageChange"
        :labels="labels"
        :currentPage="currentPage"
      ></base-table>
    </div>
    <mb-board
      v-for="(item, index) in messageData"
      :key="item.cid + index"
      :dataSource="item"
      :columns="mbColumns"
      v-else
    />
    <mb-page v-if="isMobile" @page-change="handlePageChange" :total="total" />
  </div>
</template>
<script>
import {
  getMessage,
  getMessageByAddress,
  getMessageMethods
} from "@/api/message";
import { search } from "@/api/home";

export default {
  name: "MessageList",
  data() {
    const type = this.type;
    return {
      method: [],
      loading: false,
      option: {
        method: "",
        begindex: "0",
        count: "25"
      },
      currentPage: 1,
      total: 0,
      messageData: [],
      columns: [
        // {
        //   key: "type",
        //   hideInMobile: true
        // },
        {
          key: "cid",
          isLink: true,
        //   target: "message/detail",
          target: "message/detail",
          ellipsis: true
        },
        // {
        //   key: "height",
        //   isLink: true,
        //   target: "tipset",
        //   paramKey: "height"
        // },
        // {
        //   key: "time",
        //   hideInMobile: true
        // },
        {
          key: "from",
          isLink: true,
          target: "address/detail",
          paramKey: "address",
          ellipsis: true,
          isComponent: type === "address"
        },
        {
          key: "to",
          isLink: true,
          target: "address/detail",
          paramKey: "address",
          ellipsis: true,
          isComponent: type === "address"
        },
        {
          key: "value"
        },
        // {
        //   key: "fee",
        //   hideInMobile: true,
        //   unit: "tEPK"
        // },
        // {
        //   key: "code",
        //   hideInMobile: true
        // },
        {
          key: "method"
        }
      ],
      labels: []
    };
  },
  props: {
    withType: {
      type: Boolean,
      default: true
    },
    cid: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "block"
    },
    address: {
      type: String,
      default: ""
    }
  },
  methods: {
    handleSizeChange(v) {
      this.option.count = v;
    },
    handlePageChange(v) {
      this.currentPage = v;
      this.option.begindex = (v - 1) * this.option.count;
    },
    handleMethodChange(v) {
      this.currentPage = 1;
      this.option = {
        method: v,
        begindex: 0,
        count: 25
      };
    },
    async getMessage() {
      try {
        this.loading = true;
            const addressHash = this.$route.query.address;
        const type = this.type;
        const ellipsisByLength = this.ellipsisByLength;
        if (this.cid) {
          this.option.block_cid = this.cid;
        }
        let data = {};
        // if (this.type === "block") {
        //   data = await getMessage(this.option);
        // } else {
          this.columns;
        //   const res = await getMessageByAddress({
        //     ...this.option,
        //     address: this.address,
        //     from_to: ""
        //   });
            if(addressHash){
                data = await search({
                    word: addressHash,
                    type: 'address'
                });
            }
          data.msgs = data.list;
          data.total = data.list.length;
        // }
        this.total = Number(data.total);
        const messageData = data.msgs.map(item => {
          const {  
              Cid,
              From,
            To,
            Method,
            Nonce,
            Params,
            GasPrice,
            GasLimit,
            Value, } = item;
        //   const { from, to, value, gasprice } = msg;
          let res = {
            cid: Cid,
            // time: this.formatTime(msgcreate),
            // from: {
            //   render() {
            //     return from !== addressHash ? (
            //       <a
            //         href={`./#/address/detail?address=${from}`}
            //         style={{ color: "var(--link-color)" }}
            //       >
            //         {ellipsisByLength(from, 6, true)}
            //       </a>
            //     ) : (
            //       <span>{ellipsisByLength(from, 6, true)}</span>
            //     );
            //   }
            // },
            from:From,
            // to: {
            //   render() {
            //     return to !== addressHash ? (
            //       <a
            //         href={`./#/address/detail?address=${to}`}
            //         style={{ color: "var(--link-color)" }}
            //       >
            //         {ellipsisByLength(to, 6, true)}
            //       </a>
            //     ) : (
            //       <span>{ellipsisByLength(to, 6, true)}</span>
            //     );
            //   }
            // },
            to: To,
            value: this.formatFilNumber(Value),
            fee: GasPrice,
            // type: this.address !== from ? "in" : "out",
            method: Method,
            // height: this.formatNumber(height),
            // code: exit_code
          };
          if (type === "block") {
            res.from = From;
            res.to = To;
          }
          return res;
        });
        // debugger
        this.messageData = Object.freeze(messageData);
        this.loading = false;
      } catch (e) {
        this.loading = false;
      }
    },
    async getMessageMethods() {
      try {
        let data = await getMessageMethods();
        this.method = data.method.map(item => {
          return {
            value: item,
            label: item
          };
        });
      } catch (e) {
        this.loading = false;
      }
    },
  },
 
  watch: {

    '$route':'getMessage',
    option: {
      deep: true,
      handler() {
        this.getMessage();
      }
    },
    cid() {
      this.option = {
        begindex: 0,
        count: 25
      };
    },
    address() {
      this.getMessage();
    }
  },
  mounted() {
    this.labels = [...this.$t("component.mesList.label")];
    // if (!this.withType) {
    //   this.columns.shift();
    //   this.labels.shift();
    // }
    
    this.getMessage();
    // this.getMessageMethods();
  },
  computed: {
    mbColumns() {
      return this.columns
        .map((item, index) => {
          return {
            ...item,
            title: this.labels[index]
          };
        })
        .filter(item => {
          return !item.hideInMobile;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.message-list {
  .total-number {
    height: 80px;
    align-items: center;
    padding: 0 100px;
    display: flex;
    background: var(--board-bg-color);
    color: var(--main-text-color);
    & ::v-deep > span {
      margin-right: auto;
      i {
        color: var(--link-color);
        font-size: 22px;
      }
    }
    .el-dropdown-link {
      color: white;
    }
  }
  @media (max-width: 768px) {
    .total-number {
      height: 30px;
      margin-bottom: 10px;
      & ::v-deep .el-select input {
        height: 20px;
        font-size: 12px !important;
        width: 100px;
      }
      & ::v-deep .el-input__suffix {
        i {
          line-height: 20px;
          padding-left: 5px;
          &.is-reverse {
            padding-right: 10px;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
@media (max-width: 768px) {
  .el-select-dropdown {
    z-index: 10000 !important;
    .el-select-dropdown__wrap {
      max-height: 160px !important;
    }
    li {
      height: 20px !important;
      line-height: 20px !important;
      font-size: 12px;
    }
  }
}
</style>
