<template>
  <div class="block-table miner-table">
    <!-- :max-height="isMobile ? 200 : 400 * rate" -->
    <div class="top-miner">
      <div class="titl">{{$t("header.nav.rank.label")}}</div>
      <div class="more" @click="goTo('minerList')">More ></div>

    </div>
    
    <base-table
      :dataSource="blockTable.dataSource"
      :columns="blockTable.columns"
      @click-append="goTo('mining')"
      :showLoading="false"
  
      :labels="$t('home.minerTable.label')"
      radius
    ></base-table>
      <!-- :showLoading="blockTable.loading" -->
  </div>
</template>
<script>
import { getTopMiner,getBoardInfo } from "@/api/home";
import { mapState } from "vuex";
export default {
  name: "MinerTable",
  mounted(){
      this.loadBlockData()
      this.timer = setInterval(() => {
        this.loadBlockData();
      }, 30000);
  },
  data() {
    return {
      blockTable: {
        dataSource: [],
        span: true,
        columns: [
          {
            key: "Rank",
          },
  
          {
            key: "Miner",
            isLink: true,
            target: "address/detail",
            paramKey: "address"
          },
          {
            key: "Tag"
          },
          
          {
            key: "QualityAdjPower",
          },
          {
            key: "RawBytePower",
          },
          {
            key:'Blocks'
          },
          // {
          //   key:'Rewards'
          // },
          {
            key:'lastblock',
            isLink: true,
            target: "tipset",
          },
       
        ],
        loadCount: 0,
        loading: false,
        append: false,
        heightMap: {},
        timer: null
      }
    };
  },
  methods: {
 
    async getBlockData(num) {
      const vm = this;
      this.blockTable.loading = true;
      this.blockTable.span = false;
      try {
        const info = await getBoardInfo()
        const { miners } = await getTopMiner(num);
        const data = miners
        // debugger
        // 8.9
        const dataSource = data.map((item, index) => {
          const { ID, UserTag, MinerPower,WinBlocks,TotalRewards,LatestWinBlock} = item;
          return {
            Rank: index + 1, 
            Miner: ID,
            Tag: UserTag||'--',
            QualityAdjPower:{
              data:vm.unitConversion(MinerPower.QualityAdjPower,2),
              percent: (MinerPower.QualityAdjPower/info.minerInfomation.TotalPower*100).toFixed(2)
            },
            RawBytePower:{
              data: vm.unitConversion(MinerPower.RawBytePower,2), 
              percent: (MinerPower.RawBytePower/info.minerInfomation.TotalPower*100).toFixed(2)
            }, 
            
            Blocks: {
              data: WinBlocks,
              percent: (WinBlocks/info.baseInfomation.TotalBlocks*100).toFixed(2)
            } ,
            Rewards: {
              data: Number(TotalRewards).toFixed(3),
              percent: (Number(TotalRewards)/info.minerInfomation.TotalMiningReward*100).toFixed(2)
            },
            lastblock: LatestWinBlock,
          };
        })
        // console.log(dataSource)
        this.blockTable.dataSource = dataSource;
     
        this.blockTable.loading = false;
        return Promise.resolve();
      } catch (e) {
        this.blockTable.loading = false;
      }
    },
    async loadBlockData() {
      if (this.blockTable.loading) {
        return;
      }
      if (this.blockTable.loadCount == 1) {
        this.blockTable.append = true;
        return;
      } else {
        try {
          this.blockTable.loading = true;
          await this.getBlockData();
          this.blockTable.loadCount++;
          this.blockTable.loading = false;
        } catch (e) {
          this.blockTable.loading = false;
        }
      }
    }
  },
   beforeDestroy() {
    clearInterval(this.timer);
  },
  computed: {
    ...mapState(["rate"])
  }
};
</script>
<style lang="scss" scoped>
.miner-table{
  /deep/ .el-table{
     min-height: 425PX;
     max-height: 425PX;
     table{
       width:100% !important;
     }
  }
}
.top-miner{
  padding: 10px;
  background: var(--board-bg-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .titl{
    font-size: 14PX;
    color: var(--force-mark-color);
  }
  .more{
    cursor: pointer;
    font-size:12PX;
  }
}
.block-miner-table {
  display: flex;
  & > div {
    flex: 1;
    max-width: 50%;
    background: var(--main-bg-color);
  }
  & > div:first-child {
    margin-right: 10px;
  }
  .table-title {
    padding: 15px;
    background: var(--main-bg-color);
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    img {
      width: 20px;
      margin-right: 15px;
    }
  }
}
@media (max-width: 768px) {
 .miner-table{
  /deep/ .el-table{
     max-height: 300px;
  }
} 
}
</style>
