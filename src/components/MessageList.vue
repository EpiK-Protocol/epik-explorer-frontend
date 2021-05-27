<template>
  <div
    class="message-list"
    element-loading-background="var(--board-bg-color)"
  >
    <!-- <div class="total-number border-bottom" slot="header">
      <span
        v-html="$t('component.mesList.total', { total: formatNumber(total) })"
      ></span>
      <el-select
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
      </el-select>
    </div> -->
    <div class="table-con" >
      <!-- <base-table
        :dataSource="messageData"
        :columns="columns"
        showPagination
        :total="total"
        @size-change="handleSizeChange"
        @page-change="handlePageChange"
        :labels="$t('component.mesList.label')"
        :currentPage="currentPage"
      ></base-table> -->
      <base-table
        :dataSource="messageData"
        :columns="columns"
        :labels="$t('component.mesList.label')"
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
    />
    <mb-page v-if="isMobile" @page-change="handlePageChange" :total="total" /> -->
  </div>
</template>
<script>
import {
  getMessage,
  getMessageByAddress,
  getMessageMethods
} from "@/api/message";
import { search, getMessagesById,getLatestMessage } from "@/api/home";

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
      loadOver:false,
      height:null,
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
        {
          key: "time",
          width: "250px"
          // hideInMobile: true
        },
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
        {
          key: "Receipt",
         
        },
        // {
        //   key: "fee",
        //   hideInMobile: true,
        //   unit: "tEPK"
        // },
        {
          key: "actor",
        },
        {
          key: "method",
          // width: "80px"
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
    async loadMessageData() {

      if(this.loadOver) return
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

          // this.columns;

        //   const res = await getMessageByAddress({
        //     ...this.option,
        //     address: this.address,
        //     from_to: ""
        //   });
        // debugger
        
            if(addressHash){
                data = await getMessagesById({
                    address: addressHash,
                    height: this.height,
                    size:20,
                    // type: 'address'
                });
                if(data.list.length<20 || !data.list){
                  this.loadOver = true
                }
            }else{
              // debugger
              data = await getLatestMessage({});
              this.loadOver = true
              
            }
            // debugger
          data.messages = data.list;
          if(addressHash) this.height = data.list[data.list.length-1].Height
          
          data.total = data.list.length;
          
        // }
        // this.total = Number(data.total);
        // debugger
        const messageData = data.messages.map(item => {
          const {  
            //   CID,
            //   From,
            // To,
            // Method,
            // Nonce,
            // Params,
            // GasPrice,
            // GasLimit,
            Message,
            Timestamp,
            Receipt,
            ActorName,
            MethodName

            // Value,
             } = item;
            
        //   const { from, to, value, gasprice } = msg;
          let res = {
            cid: Message.CID['/'],
         
            from: Message.From,
            time: this.getFormatTime(Timestamp*1000),
     
            to: Message.To,
            value: this.formatFilNumber(Message.Value),
            // fee: GasPrice,
            // type: this.address !== from ? "in" : "out",
            method: MethodName || Message.Method,
            actor: ActorName,
            Receipt: Receipt? this.getCodeText(Receipt.ExitCode):'',

          };
          if (type === "block") {
            res.from = Message.From;
            res.to = Message.To;
          }
          return res;
        });
        // debugger
        // console.log(messageData)
        this.messageData = [...this.messageData,...messageData]
        // this.messageData = Object.freeze(messageData);
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
