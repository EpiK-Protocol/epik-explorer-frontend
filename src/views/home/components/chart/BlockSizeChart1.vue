<template>
  <div
    class="block-size-chart"
    v-loading="loading"
    element-loading-background="var(--board-bg-color)"
  >
   <div class="info-con">
      <div class="power-info bottom-10">
        <span>
          {{ $t("home.blockSize.t1") }}:
        </span>
        <span class="top-10" v-show="!loading">{{ data1 }}</span>
      </div>
      <div class="power-info bottom-10">
        <span>
          {{ $t("home.blockSize.t2") }}:
        </span>
        <span class="top-10 " style="color:var(--block-size-color)" v-show="!loading">{{ data2 }}</span>
      </div>
      <div class="power-info bottom-10">
        <span>
          {{ $t("home.blockSize.t3") }}:
        </span>
        <span class="top-10" style="color: #0091ff;" v-show="!loading">{{ data3 }}</span>
      </div>
    </div>
    <!-- <div class="size-info-con">
      <div class="top-30">
        {{ $t("home.blockSize.label") }}
        <el-popover
          placement="bottom-start"
          width="200"
          trigger="hover"
          :content="$t('home.blockSize.tips')"
        >
          <i class="el-icon-warning-outline" slot="reference"></i>
        </el-popover>
      </div>
      <div v-show="!loading">
        {{ $t("home.blockSize.size", { avg: avgSize }) }}
      </div>
    </div> -->
    <div class="chart-con" ref="size"></div>
  </div>
</template>
<script>
import { getBlocSizeData ,getMinerStatus} from "@/api/home";
import dayjs from "dayjs";
let chart;
export default {
  name: "BlockSizeChart",
  data() {
    return {
      dataList: [],
      avgSize: 0,
      loading: false,
      Total:[],
      Pledged:[],
      Won:[],
      data1:0,
      data2:0,
      data3:0,


    };
  },
  methods: {
    drawSizeChart() {
      // const data = this.dataList;
      var xdata=[]
      for(let i=0;i<this.Total.length;i++){
        xdata.push(i+1);
      }
      const {
        axisLine,
        seriesItem,
        seriesMarkLine
      } = this.chartTheme.blockSize;
      const vm = this;
      const option = {
        xAxis: {
           type: 'category',
           boundaryGap: false,
          data: xdata,
          axisLine: {
            lineStyle: {
              color: '#666666'
            }
          },
          axisLabel:{
            show:false
          },
          
          axisTick: {
            show: false
          }
        },
        yAxis: {
          show: false,
          // scale:true
        },
        grid: {
          left: 0,
          top: 0,
          bottom: 10,
          right: 0
        },
        tooltip: {
          trigger: "axis",
          formatter: function(p) {

             const html = vm.$t("chart.blockSize", {
              t1:p[0].data,
              t2:p[1].data,
              t3:p[2].data
            });
            return html;
          }
        },
      
        series: [
          {
            data: vm.Total,
            type: "line",
            symbol: "none",
            smooth: true,
            lineStyle: {
              color: this.chartTheme.blockSize.axisLine
            },
            // areaStyle: {
            //   color: seriesItem
            // }
          },
          {
            data: vm.Pledged,
            type: "line",
            symbol: "none",
            smooth: true,
            lineStyle: {
              color: this.chartTheme.totalPower.seriesItem
            },
            // areaStyle: {
            //   color: this.chartTheme.totalPower.area
            // }
          },
          {
            data: vm.Won,
            type: "line",
            symbol: "none",
            smooth: true,
            lineStyle: {
              color: this.chartTheme.blockTime.axisLine
            },
            // areaStyle: {
            //   color: this.chartTheme.blockTime.area
            // }
          }
        ]
      };
      chart.setOption(option);
    },
    async getMinerStatus() {
      try {
        this.loading = true;
        const res = await getMinerStatus(this.time);
        this.loading = false;
      
        const { list } = res;
        for (var i=0;i<list.length;i++){
          this.Total.push(list[i].Total)
          this.Pledged.push(list[i].Pledged)
          this.Won.push(list[i].Won)
          if(i==list.length-1){
            this.data1 = list[i].Total
            this.data2 = list[i].Pledged
            this.data3 = list[i].Won
          }
        }
        
        // const dataList = data.map(item => {
        //   const end = dayjs(item.time * 1000)
        //     .add(1, "hour")
        //     .format("HH:mm");
        //   return {
        //     name: `${this.formatTimeByStr(
        //       item.time * 1000,
        //       "MMM Do YYYY HH:mm"
        //     )}-${end}`,
        //     formatValue: this.formatNumber(item.block_size),
        //     value: item.block_size
        //   };
        // });
        // this.dataList = Object.freeze(dataList);
        // this.avgSize = this.formatNumber(avg_blocksize);
        this.drawSizeChart();
      } catch (e) {
        this.loading = false;
      }
    }
  },
  props: {
    time: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  mounted() {
    chart = this.$chart.init(this.$refs.size);
    this.getMinerStatus();
  },
  watch: {
    latestBlockHeight() {
      if (this.loadCount === 1) {
        return;
      }
      this.getMinerStatus();
    },
    theme() {
      this.drawSizeChart();
    }
  }
};
</script>
<style lang="scss" scoped>
.block-size-chart {
  display: flex;

  .info-con {
    //flex: 2;
    // margin-right: 10px;
    flex-shrink: 0;
    min-width: 180px;
    display: flex;
    flex-direction: column;
    & > div {
      span:last-child {
        font-size: 26px;
        color: var(--total-power-color);
      }
      span:first-child {
        color: var(--total-board-top-color);
        font-weight: bold;
        margin-right: 5px;
      }
    }
  }
  .chart-con {
    flex: 1;
    height: 100%;
  }
  @media (max-width: 768px) {
    .info-con {
      & > div span:last-child {
        margin-top: 5px !important;
        font-size: 13px;
      }
    }
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.03);
    border-radius: 4px;
    .info-con {
      flex: 2;
    }
    .chart-con {
      flex: 3;
    }
  }
}
</style>
