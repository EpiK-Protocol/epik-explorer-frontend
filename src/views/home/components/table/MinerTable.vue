<template>
  <div class="block-table miner-table">
    <!-- :max-height="isMobile ? 200 : 400 * rate" -->
    <div class="top-miner">
      <div class="titl">{{$t("header.nav.tipset.items[1].label")}}</div>
      <div class="more" @click="goTo('minerList')">More ></div>

    </div>
    
    <base-table
      :dataSource="blockTable.dataSource"
      :columns="blockTable.columns"
      :showLoading="blockTable.loading"
      @click-append="goTo('mining')"
  
      :labels="$t('home.minerTable.label')"
      radius
    ></base-table>
  </div>
</template>
<script>
import { getTopMiner } from "@/api/home";
import { mapState } from "vuex";
export default {
  name: "MinerTable",
  mounted(){
      this.loadBlockData()
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
          {
            key:'Rewards'
          },
          {
            key:'lastblock'
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
        const { miners } = await getTopMiner(num);
        const data = miners
        const heightMap = {};
        // debugger
        // 8.9
        const dataSource = data.map((item, index) => {
          const { ID, NewWorker, MinerPower} = item;
          return {
            Rank: index + 1, 
            Miner: ID,
            Tag: NewWorker,
            QualityAdjPower: vm.unitConversion(MinerPower.QualityAdjPower,3),
            RawBytePower: vm.unitConversion(MinerPower.RawBytePower,3), 
            Blocks: '',
            Rewards: "",
            lastblock: "", 

          };
        });
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
  },
  computed: {
    ...mapState(["rate"])
  }
};
</script>
<style lang="scss" scoped>
.miner-table{
  /deep/ .el-table{
     max-height: 425PX;
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
