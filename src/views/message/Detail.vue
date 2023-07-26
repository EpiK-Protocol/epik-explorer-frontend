<template>
  <div class="message-detail bottom-10">
    <overview
      :title="title"
      :dataList="dataList"
      :dataLabel="$t('message.detail.overview')"
      :showLoading="loading"
    />
  </div>
</template>
<script>
import { search } from "@/api/home";

export default {
  name: "MessageDetail",
  data() {
    return {
      cid: "",
      loading: false,
  
      dataList: [
        // {
        //   key: "cid",
        //   style: {
        //     fontWeight: "bold"
        //   }
        // },
        // {
        //   key: "height",
        //   isLink: true,
        //   target: "tipset",
        //   isComponent: true
        // },
        // {
        //   key: "blockHash",
        //   isLink: true,
        //   target: "tipset",
        //   paramKey: "hash"
        // },
        {
          key: "time"
        },
        {
          key: "from",
          isLink: true,
          target: "address/detail",
          paramKey: "address"
        },
        {
          key: "to",
          isLink: true,
          target: "address/detail",
          paramKey: "address"
        },
        {
          key: "value",
          // unit: "tEPK"
        },
        {
          key: "Receipt",
          // unit: "tEPK"
        },
        // {
        //   key: "fee",
        //   unit: "tEPK"
        // },
        // {
        //   key: "code"
        // },
        {
          key: "method"
        },
        {
          key: "actor",
        },
        
        {
          key: "nonce"
        },
        // "a", "f", "p", "n", "μ", "m"
        {
          key: "GasLimit",
          unit: "μEPK"
        },
        {
          key: "GasUsed",
          unit: "μEPK"
        },
        {
          key: "params",
          isComponent: true
        }
      ],
      title: {
        label: this.$t('message.detail.titl'), 
        detail: `${this.$route.query.cid}`
      }
    };
  },
  methods: {
    
    async getMessageDetail() {
      try {
        this.loading = true;
        let data = await search({
          word: this.cid,
          // type: 'message'
        });
        
        if(data.code.message == 'Not found'){
           this.goTo('noResult', {
            query: {
              key: this.cid
            }
          });
          return
        }
       

        const {
          // height,
          // From,
          // To,
          // Method,
          // Nonce,
          // Params,
          // GasLimit,
          // Value,
          Message,
          Timestamp,
          Receipt,
          MethodName,
          ActorName 
        } = data.message;
        // const { from, to, nonce, params, value, gaslimit } = msg;
        // let blockRes = await getBlockConfirmCount({
        //   cid: block_cid
        // });
        const paramTip = this.$t("message.detail.paramTip");
        const confirm = this.$t("message.detail.confirm");
        
        const sourceMap = {
          // height: this.formatNumber(height),
          // cid: this.cid,
          // confirm: this.formatNumber(blockRes.count),
          time: Timestamp?this.getFormatTime(Timestamp*1000):'',
          from: Message.From,
          to: Message.To,
          // method: Message.Method,
          method: MethodName || Message.Method,
          actor: ActorName,
          Receipt: Receipt?this.getCodeText(Receipt.ExitCode):'pending',
          nonce: Message.Nonce,
          // params: Message.Params.length > 256 ? `${Message.Params.slice(0, 256)} ...` : Message.Params,
          params: Message.Params?Message.Params:'null',
          value:this.formatFilNumber(Message.Value),
          // fee: this.formatNumber(Message.GasLimit),
          GasLimit: this.formatNumber(Message.GasLimit/1000000),
          GasUsed: Receipt?this.formatNumber(Receipt.GasUsed/1000000):'0'
          // blockHash: block_cid,
          // code: exit_code
        };

        this.dataList = this.dataList.map(item => {
          let linkList;
          if (item.isLink) {
            linkList = [sourceMap[item.key]];
          } else {
            linkList = sourceMap[item.key];
          }
          let res = {
            ...item,
            value: sourceMap[item.key],
            linkList
          };
          
          if (item.key === "height") {
            res.component = {
              render() {
                return (
                  <div class="height-link">
                    <a href={`./#/tipset?height=${res.value}`}>
                      {sourceMap.height}
                    </a>
                    <span>
                      {" "}
                      ({sourceMap.confirm} {confirm})
                    </span>
                  </div>
                );
              }
            };
          }
          if (item.key === "params") {
            res.component = {
              render() {
                return (
                  <div class="top-10 params-con">
                    <el-popover
                      placement="bottom-start"
                      width="200"
                      trigger="hover"
                      content={paramTip}
                    >
                      <i class="el-icon-warning-outline" slot="reference"></i>
                    </el-popover>
                    <span class="params-value">{sourceMap[item.key]}</span>
                  </div>
                );
              }
            };
          }
          return res;
        });
        this.loading = false;
      } catch (e) {
        if (e) {
          this.loading = false;
        }
      }
    }
  },
  watch: {
    cid: {
      immediate: true,
      handler(v) {
        if (v) {
          this.getMessageDetail();
        }
      }
    }
  },
  mounted() {
    this.cid = this.$route.query.cid;
  }
};
</script>
<style lang="scss" scoped>
.message-detail {
  background: var(--board-bg-color);
  // padding: 1.042vw;
  .detail-info-con{

  }
  .info-item{
    background: var(--board-item-bg-color);
    border-bottom: 1px dashed #153550;
  }
  & ::v-deep .height-link {
    width: 100%;
    display: flex;
    align-items: center;
    a {
      color: var(--link-color);
      margin-right: 5px;
    }
  }
  & ::v-deep .params-con {
    margin-right: 10px;
    .params-value {
      line-height: 1.5;
      word-break: break-all;
      margin-left: 3px;
    }
  }
}
</style>
