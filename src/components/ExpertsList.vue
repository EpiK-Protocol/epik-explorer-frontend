<template>
  <div
    class="message-list"
    element-loading-background="var(--board-bg-color)"
  >
    <div class="table-con" >
      <base-table
        :dataSource="messageData"
        :columns="columns"
        :labels="$t('home.expertTable.label')"
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
import { getExperts } from "@/api/home";
import { search } from "@/api/home";

export default {
  name: "ExpertsList",
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
          key: "Miner",
          // isLink: true,
          // target: "address/detail",
          // paramKey: "address",
        },
        
        {
          key: "VoteAmount",
        },
        // {
        //   key: "ApplicationHash",
        //   isLink: true,
        //   target: "tipset",
        //   ellipsis: true
        // },
        {
          key: "FileSize",
        },
        {
          key: "FileCount",
        },
        {
          key: "Reward",
        },
        {
          key: "Type",
          width: "200px"
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
   
    async loadMessageData() {
      if (this.loading) {
        return;
      }else if(this.messageData.length < this.offset*20){
        return
      }
  
       else {
        try {
            
          this.loading = true;
          await this.getExperts()
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
    async getExperts() {
      try {
        const vm = this
        this.loading = true;
        // this.columns;
        const data = await getExperts({
          size: 20,
          offset: this.offset*20,
        });
    
        const minerData = data.list.map((item, index) => {
          const { ID,Owner ,Type,VoteAmount,ApplicationHash, FileSize,FileCount,Reward,StatusDesc} = item
          return {
            Miner: ID,
            Type:StatusDesc,
            VoteAmount,
            FileSize: vm.unitConversion(FileSize, 2),
            FileCount,
            Reward,
            // ApplicationHash,
          };
        });

        this.messageData = [...this.messageData,...minerData]


        this.loading = false;
      } catch (e) {
        this.loading = false;
      }
    },

  },

  mounted() {

  },

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
