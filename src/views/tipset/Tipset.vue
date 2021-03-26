<template>
  <div class="tipset">
    <ticket-chain
      @hash-change="handleHashChange"
      :height.sync="height"
      :hash="hash"
      @height-change="handleHeightChange"
      @get-blocks="getBlocks"
      v-show="!isMobile"
    />
    <block-detail v-if="hash" :loading="loading" :hash="hash" :block="block" />
    <block-list
      v-if="!hash && !isMobile"
      :height="currentHeight"
      :list="currentBlockList"
    />
    <div class="mb-block-list" v-if="isMobile && !hash">
      <div
        v-for="(value, key) in mbBlockList"
        :key="key"
        class="block-item-con"
      >
        <div class="height">
          <div>{{ $t("tipset.height") }}：</div>
          <div>{{ key }}</div>
        </div>
        <mb-board
          v-for="item in value"
          :key="item.hash"
          :dataSource="item"
          :columns="mbColumns"
        ></mb-board>
      </div>
    </div>
  </div>
</template>
<script>
import TicketChain from "./components/TicketChain";
import BlockList from "./components/BlockList";
import BlockDetail from "./components/BlockDetail";
import { search } from "@/api/home";

import { mapState } from "vuex";
export default {
  name: "Tipset",
  data() {
    return {
      hash: "",
      loading: false,
      height: 0,
      value: 0,
      blocks: [],
      block:{},

      columns: [
        {
          key: "hash",
          isLink: true,
          target: "tipset",
          ellipsis: true
        },
        {
          key: "timestamp"
        },
        {
          key: "mesLength"
        },
        // {
        //   key: "size",
        //   unit: "bytes"
        // },
        {
          key: "miner",
          isLink: true,
          target: "address/detail",
          paramKey: "address"
        },
        // {
        //   key: "reward",
        //   unit: "tEPK"
        // }
      ]
    };
  },
  watch: {
    "$route.query": {
      deep: true,
      immediate: true,
      handler(v) {
        // 11/16
        if(this.hash != v.hash){
          this.loadData(v.hash)
        }

        this.hash = v.hash;
        let height = 0;
        if (v.height) {
          height = this.parseFormatNumber(v.height);
        }
        this.height = Number(height);
        
        
      }
    }
  },
  components: {
    TicketChain,
    BlockList,
    BlockDetail
  },
  async mounted(){
    if(this.$route.query.hash){
       this.hash = this.$route.query.hash;
        this.loadData(this.hash)
    }
       

  },
  computed: {
    ...mapState(["defaultHeight"]),
    currentHeight() {
      return Number(this.height || this.defaultHeight);
    },
    currentBlockList() {
      if (this.height) {
        return this.blocks.filter(item => {
          return item.height == this.formatNumber(this.height);
        });
      } else {
        return this.blocks;
      }
    },
    currentBlock() {
      return this.blocks.filter(item => {
        return item.hash == this.hash;
      })[0];
      
    },
    mbBlockList() {
      const res = {};
      this.blocks.forEach(item => {
        if (!res[item.height]) {
          res[item.height] = [item];
        } else {
          res[item.height].push(item);
        }
      });
      return res;
    },
    mbColumns() {
      const labels = [...this.$t("component.blockList.label")];
      labels.shift();
      return this.columns.map((item, index) => {
        return {
          ...item,
          title: labels[index]
        };
      });
    }
  },
  methods: {
    async loadData(hash){
      try{
           if(!hash) return
        this.loading = true
        
        let res = await search({
          word: hash,
          type: 'block'
        });

//  debugger 
           const {
            Timestamp,
            Height,
            Miner,
            ParentWeight,
            Ticket,
            Parents,
            Messages,
            ParentStateRoot,
          } = res.block;
          let parents =  Parents.map(item=>{
            return item['/']
          })

        this.block = {
            height: Height,
            hash: this.$route.query.hash,//item.cid
            // timestamp: this.formatTime(Timestamp),
            utcTime: this.getFormatTime(Timestamp),
            // size:0,//size: this.formatNumber(size),
            mesLength: Messages['/'],
            miner:Miner,
            // reward:0,//?
            parents,
            parent_weight: this.formatNumber(ParentWeight),
            tickets:Ticket.VRFProof,
            state_root: ParentStateRoot['/']
          };
          loading = false;
        }
        catch (e) {
        if (e) {
          this.loading = false;
        }
      }

    },
    getBlocks(v) {
      this.blocks = v;
    },
    handleHashChange(v) {
      this.goTo("tipset", {
        query: {
          hash: v
        }
      });
    },
    handleHeightChange(v) {
      this.goTo("tipset", {
        query: {
          height: v
        }
      });
    },
    handleValueChange() {
      this.height = this.value;
      this.goTo("tipset", {
        query: {
          height: this.value
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.tipset {
  .chart-con {
    width: 100%;
    background: var(--main-bg-color);
    .chart {
      width: 100%;
      height: 500px;
    }
  }
  @media (max-width: 768px) {
    .block-item-con {
      .height {
        // text-align: center;
        // background: var(--link-color);
        color: white;
        line-height: 20px;
        margin-bottom: 5px;

        padding: 5px 10px;
        display: flex;
        background: var(--board-bg-color);
      }
      //display: flex;
      // .height{
      //   background: var(--link-color);
      //   height: 20px;
      //   line-height: 20px;
      //   color: white;
      //   padding-left: 10px;
      //   margin-right: 10px;
      //   position: relative;
      //   width: 70px;
      //   &::after{
      //     content: '';
      //     display: inline-block;
      //     width: 14px;
      //     height: 14px;
      //     background: var(--link-color);
      //     transform: rotate(45deg);
      //     position: absolute;
      //     right: -7px;
      //     top: 3px
      //   }
      // }
    }
  }
}
</style>
