<template>
  <div
    class="message-list"
    v-loading="loading"
    element-loading-background="var(--board-bg-color)"
  >
    <div class="table-con" v-if="!isMobile">
      <base-table
        :dataSource="messageData"
        :columns="columns"
        :labels="$t('home.minerTable.label')"
        :loadMore="true"
        @load="loadMessageData"
        :showLoading="loading"
      ></base-table>
    </div>
    <!-- <mb-board
      v-for="(item, index) in messageData"
      :key="item.cid + index"
      :dataSource="item"
      :columns="mbColumns"
      v-else
    /> -->
    <!-- <mb-page v-if="isMobile" @page-change="handlePageChange" :total="total" /> -->
  </div>
</template>
<script>
import { getMiner } from "@/api/home";
import { search } from "@/api/home";

export default {
  name: "MinerList",
  data() {
    const type = this.type;
    return {

      loading: false,
      option: {
        method: "",
        begindex: "0",
        count: "25",
      },
      currentPage: 1,
      total: 0,
      messageData: [],
      columns: [
        {
          key: "Rank",
        },

        {
          key: "Miner",
          isLink: true,
          target: "address/detail",
          paramKey: "address",
        },
        {
          key: "Tag",
        },

        {
          key: "QualityAdjPower",
        },
        {
          key: "RawBytePower",
        },
        {
          key: "Blocks",
        },
        {
          key: "Rewards",
        },
        {
          key: "lastblock",
        },
      ],
      labels: [],
      offset: 0,
    //   loadCount: 0,
    };
  },
  props: {
    withType: {
      type: Boolean,
      default: true,
    },
    cid: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "block",
    },
    address: {
      type: String,
      default: "",
    },
  },
  methods: {
    // handleSizeChange(v) {
    //   this.option.count = v;
    // },
    // handlePageChange(v) {
    //   this.currentPage = v;
    //   this.option.begindex = (v - 1) * this.option.count;
    // },
    // handleMethodChange(v) {
    //   this.currentPage = 1;
    //   this.option = {
    //     method: v,
    //     begindex: 0,
    //     count: 25,
    //   };
    // },
    async loadMessageData() {
      if (this.loading) {
        return;
      }
    //   debugger
    //   if (this.loadCount == 3) {
    //     // this.append = true;
    //     return;
    //   }
       else {
        // clearInterval(this.timer);
        try {
            
          this.loading = true;
          await this.getMessage()
          this.offset++;
          this.loading = false;
        //   this.initMesTimer();
        } catch (e) {
          if (e) {
            this.loading = false;
          }
        }
      }
    },
    async getMessage() {
      try {
        const vm = this
        this.loading = true;
        // this.columns;
        const data = await getMiner({
          size: 20,
          offset: this.offset*20,
        });
        //   data.msgs = data.list;
        //   data.total = data.list.length;
        // // }
        // this.total = Number(data.total);
        
        const minerData = data.list.map((item, index) => {
          const { ID, NewWorker, MinerPower } = item;
          return {
            Rank: vm.offset*20 + index + 1,
            Miner: ID,
            Tag: NewWorker,
            QualityAdjPower: vm.unitConversion(MinerPower.QualityAdjPower, 3),
            RawBytePower: vm.unitConversion(MinerPower.RawBytePower, 3),
            Blocks: "",
            Rewards: "",
            lastblock: "",
          };
        });

        this.messageData = [...this.messageData,...minerData]


        // this.messageData = Object.freeze(minerData);
        this.loading = false;
      } catch (e) {
        this.loading = false;
      }
    },
    // async getMessageMethods() {
    //   try {
    //     let data = await getMessageMethods();
    //     this.method = data.method.map((item) => {
    //       return {
    //         value: item,
    //         label: item,
    //       };
    //     });
    //   } catch (e) {
    //     this.loading = false;
    //   }
    // },
  },

  watch: {
    // $route: "getMessage",
    // option: {
    //   deep: true,
    //   handler() {
    //     this.getMessage();
    //   },
    // },
    // cid() {
    //   this.option = {
    //     begindex: 0,
    //     count: 25,
    //   };
    // },
    // address() {
    //   this.getMessage();
    // },
  },
  mounted() {
    // this.labels = [...this.$t("component.mesList.label")];
    // if (!this.withType) {
    //   this.columns.shift();
    //   this.labels.shift();
    // }

    // this.getMessage();
    // this.getMessageMethods();
  },
//   computed: {
//     mbColumns() {
//       return this.columns
//         .map((item, index) => {
//           return {
//             ...item,
//             title: this.labels[index],
//           };
//         })
//         .filter((item) => {
//           return !item.hideInMobile;
//         });
//     },
//   },
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
