<template>
  <div
    class="total-board bottom-10"
    v-loading="loading"
    element-loading-background="var(--board-bg-color)"
  >
    <div class="titl-board">基本数据</div>
    <div class="flex flex-wrap">
      <div v-for="item in base" :key="item.key" class="info-item bottom-10">
        <div>
          {{ $t(`home.board.base.${item.labelKey}.label`) }}
        </div>
        <div v-show="!loading">{{ `${item.value || ""} ${item.unit}` }}</div>
      </div>
    </div>

    <div class="titl-board">矿工生态数据</div>
    <div class="flex flex-wrap">
      <div v-for="item in miner" :key="item.key" class="info-item bottom-10">
        <div>
          {{ $t(`home.board.miner.${item.labelKey}.label`) }}
  
        </div>
        <div v-show="!loading">{{ `${item.value || ""} ${item.unit}` }}</div>
      </div>
    </div>
    <div class="titl-board">知识生态数据</div>
    <div class="flex flex-wrap">
      <div v-for="item in expert" :key="item.key" class="info-item bottom-10">
        <div>
          {{ $t(`home.board.expert.${item.labelKey}.label`) }}
  
        </div>
        <div v-show="!loading">{{ `${item.value || ""} ${item.unit}` }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getBoardInfo } from "@/api/home";
import { mapMutations } from "vuex";
export default {
  name: "TotalBoard",
  data() {
    return {
      base: [
        { key: "Height", labelKey: "Height", unit: "" },
        { key: "AvgTipSetTime", labelKey: "AvgTipSetTime", unit: "" },
        { key: "TotalBlocks", labelKey: "TotalBlocks", unit: "" },
        { key: "TotalEPK", labelKey: "TotalEPK", unit: "" },
        { key: "CirculationEPK", labelKey: "CirculationEPK", unit: "" },
        { key: "EPK_USDTPrice", labelKey: "EPK_USDTPrice", unit: "" },
      ],
      miner: [
        {labelKey: "TotalMiners", key: "TotalMiners",unit:"",},
        {labelKey: "PledgedMiners", key: "PledgedMiners",unit:"",},
        {labelKey: "ActiveMiners", key: "ActiveMiners",unit:"",},
        {labelKey: "TotalPower", key: "TotalPower",unit:"",},
        {labelKey: "TopMinerPower", key: "TopMinerPower",unit:"",},
        {labelKey: "MinerMinWinPower", key: "MinerMinWinPower",unit:"",},
        {labelKey: "TotalMinerPledged", key: "TotalMinerPledged",unit:"",},
        {labelKey: "TotalRetrievalPledged", key: "TotalRetrievalPledged",unit:"",},
        {labelKey: "TotalPledged", key: "TotalPledged",unit:"",},
        {labelKey: "TotalMiningReward", key: "TotalMiningReward",unit:"",},
        {labelKey: "TotalRetrievalReward", key: "TotalRetrievalReward",unit:"",},
        {labelKey: "DataFlowPerEPK", key: "DataFlowPerEPK",unit:"",},
      ],
      expert: [
        { labelKey: "TotalExperts", key: "TotalExperts",unit:"",},
        { labelKey: "ActiveExperts", key: "ActiveExperts",unit:"",},
        { labelKey: "TotalVote", key: "TotalVote",unit:"",},
        { labelKey: "AvgVote", key: "AvgVote",unit:"",},
        { labelKey: "TopExpertVote", key: "TopExpertVote",unit:"",},
        { labelKey: "TotalDataSize", key: "TotalDataSize",unit:"",},
        { labelKey: "TotalExpertReward", key: "TotalExpertReward",unit:"",},
        { labelKey: "TotalCrowdsourcingReward", key: "TotalCrowdsourcingReward",unit:"",},
        { labelKey: "TotalVoteReward", key: "TotalVoteReward",unit:"",},
        { labelKey: "AnnualizedRate", key: "AnnualizedRate",unit:"",},
      ],
  
      timer: null,
      loading: false,
    };
  },
  async mounted() {
    this.loading = true;
    await this.getBoardInfo();
    this.loading = false;
    // this.timer = setInterval(() => {
    //   this.getBoardInfo();
    // }, 30000);
  },
  methods: {
    // ...mapMutations(["setHeight", "increaseLoadCount"]),

    async getBoardInfo() {
      try {
        // 8.9
        let res = await getBoardInfo();
        this.loading = false;
        // info.avg_message_size = parseInt(info.avg_message_size);
        this.base = this.base.map((item) => {
          return {
            ...item,
            value: 
            this.formatNumber(
              item.key === "CirculationEPK"|| item.key === "EPK_USDTPrice"
                ? parseFloat(res.baseInfomation[item.key]).toFixed(4)
                : res.baseInfomation[item.key]
            ),
          };
        });
        this.miner = this.miner.map((item) => {
        
      
            let value = this.formatNumber(
              item.key === "TotalMiningReward"|| item.key === "TotalRetrievalReward"
                ? parseFloat(res.minerInfomation[item.key]).toFixed(4)
                : res.minerInfomation[item.key]
            )
            if(item.key == 'DataFlowPerEPK'){
              value = value + '/10 MB'
            }
       
          
          return {
            ...item,
            value
          };
        });
        this.expert = this.expert.map((item) => {
          
          let value;
          if(item.key == 'TotalDataSize'){
            value = this.unitConversion(res.expertInfomation[item.key], 2)
          }else{
            value = this.formatNumber(
                item.key === "CirculationEPK"|| item.key === "EPK_USDTPrice"
                  ? parseFloat(res.expertInfomation[item.key]).toFixed(4)
                  : res.expertInfomation[item.key]
            )
          }
          return {
            ...item,
            value 
          };
        });
        // this.setHeight(info.tipset_height);
        // this.increaseLoadCount();
      } catch (e) {
        console.log(e);
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>
<style lang="scss" scoped>
.total-board {
  padding: 10px 1.042vw 1.042vw;
  background: var(--board-bg-color);
  .titl-board {
    font-size: 18px;
    color: white;
    margin-bottom: 15px;
    margin-top: 15px;
    margin-left: 10px;
  }
  .info-item {
    //width: 16.66%;
    min-width: 150PX;
    flex:1;
    // box-shadow: 0px 1px 7px 9px rgba(0, 0, 0, 0.03);
    padding: 15px;
    margin-right: 10px;
    background: var(--board-bg-color);
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background: var(--board-item-bg-color);
    border-radius: 6px;
    box-shadow: 0 0 7.5px 0 var(--block-meta-item-shadow) inset;
    // &:nth-child(6) {
    //   margin-right: 0;
    // }
    div {
      height: 30px;
      line-height: 30px;
      color: #999;
      text-align: center;
      color: var(--total-board-top-color);
    }
    div:last-child {
      font-size: 26px;
      color: var(--force-mark-color);
      font-weight: 600;
    }
    div:first-child {
      // margin-bottom: 5px;
      // font-size: 11PX;
      font-size: .729vw;
      
      span {
        position: relative;
        i {
          position: absolute;
          top: 4px;
          font-size: 12px;
        }
      }
    }
  }
}
@media (max-width: 768px) {
  .total-board {
    .titl-board{
        font-size: 12px;
        margin-bottom: 5px;

      }
    .info-item {
      flex: 1;
      min-width: 45%;
      margin-bottom: 10px;
      box-sizing: border-box;
      margin-right: 0;
      height: 53px;
      
      &:nth-child(2n + 1) {
        margin-right: 10px;
      }
      div {
        height: 20px;
        line-height: 20px !important;
        color: var(--total-board-bottom-color);
        
        &:first-child {
          font-size: 10px;
          color: var(--total-board-top-color) !important;
        }
        &:last-child {
          font-size: 12px;
          color: var(--force-mark-color);
        }
      }
    }
  }
}
</style>
