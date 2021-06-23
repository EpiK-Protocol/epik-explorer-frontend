<template>
  <div
    class="block-size-chart"
    
    element-loading-background="var(--board-bg-color)"
  >

   <div class="info-con">
      <div class="power-info">
        <span>
          {{ $t("home.blockSize.t1") }}：
        </span>
        <span  >{{ data1 }}</span>
      </div>
      <div class="power-info">
        <span>
          {{ $t("home.blockSize.t2") }}：
        </span>
        <span style="color:var(--block-size-color)" >{{ data2 }}</span>
      </div>
      <div class="power-info">
        <span>
          {{ $t("home.blockSize.t3") }}：
        </span>
        <span style="color: #0091ff;" >{{ data3 }}</span>
      </div>
    </div>
    
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
      Actived:[],
      data1:0,
      data2:0,
      data3:0,
      timer: null,
      xdata:[]


    };
  },
  methods: {
    drawSizeChart() {
      // const data = this.dataList;
      const rate = this.rate;
      const isMobile = this.isMobile;
      // var xdata=[]
      // for(let i=0;i<this.Total.length;i++){
      //   xdata.push(i+1);
      // }
      // const xData = series.map((item) => {
      //   return {
      //     value: item.name,
      //   };
      // });
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
          data: vm.xdata,
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: '#ffffff',
              fontSize: isMobile?11:13
            },
          },
        },
        yAxis: {
          type:'value',
    
          scale: true,
          splitNumber: 3,
          axisLine: {
              show:false
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: '#153550',
            },
          },
          axisTick: { show: false },
          axisLabel: {
            textStyle: {
              color: '#ffffff',
              fontSize: isMobile?11:13
            },
          },
        },
        grid: {
          left: 60*rate,
          top: 30,
          bottom: 20,
          right: 20
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
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
              color: this.chartTheme.totalPower.seriesItem
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
              
              color: this.chartTheme.blockSize.axisLine
            },
            // areaStyle: {
            //   color: this.chartTheme.totalPower.area
            // }
          },
          {
            data: vm.Actived,
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
      
        const { graph } = res;
        const list = graph 
        this.Total = []
        this.Pledged = []
        this.Actived = []
        this.xdata = []
        for (var i=0;i<list.length;i++){
          this.Total.push(list[i].Total)
          this.Pledged.push(list[i].Pledged)
          this.Actived.push(list[i].Actived)
          this.xdata.push(this.formatTimeByStr(list[i].Date, "MM/DD"))
          if(i==list.length-1){
            this.data1 = list[i].Total
            this.data2 = list[i].Pledged
            this.data3 = list[i].Actived
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
  beforeDestroy() {
    clearInterval(this.timer);
  },
  mounted() {
    chart = this.$chart.init(this.$refs.size);
    this.getMinerStatus();
    this.timer = setInterval(() => {
      this.getMinerStatus();
    }, 60000)
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
    },
    '$i18n.locale'() {
      this.drawPowerChart();
    }
  }
};
</script>
<style lang="scss" scoped>
.block-size-chart {
    display: flex;
    flex-direction: column;
    // padding: 10px;
    box-sizing: border-box;
//   display: flex;
   height: 300px;
  .info-con {
    //flex: 2;
    // margin-right: 10px;
    flex-shrink: 0;
    // min-width: 180px;
    display: flex;
    // flex-direction: column;
    .power-info{
        display: flex;
        align-items: center;
        // justify-content: start;
    }
    & > div {
      span:last-child {
        font-size: 15px;
        margin-right: 20px;
        color: var(--total-power-color);
      }
      span:first-child {
        // color: var(--total-board-top-color);
        // font-weight: bold;
        // margin-right: 5px;
        font-size: 13px;
        color: var(--main-text-color);
      }
    }
  }
  .chart-con {
    flex: 1;
    height: 100%;
  }
  @media (max-width: 768px) {
    
    .info-con {
      & > div {span:last-child {
        // margin-top: 5px !important;
        font-size: 13px;
      }
      span:first-child {
        // color: var(--total-board-top-color);
        // font-weight: bold;
        margin-right: 5px;
        font-size: 12px;
        color: var(--main-text-color);
      }
    }
    }
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.03);
    border-radius: 4px;
    .info-con {
      flex: 1;
    }
    .chart-con {
      flex: 4;
      width: 100%;
    }
  }
}
@media (max-width: 768px) {

  .block-size-chart {
    display: flex;
    flex-direction: column;
    height: 200px;
    background: var(--board-bg-color);
    align-items: center;
    background: var(--board-item-bg-color);
    border-radius: 3px;
    box-shadow: 0 0 7.5px 0 var(--block-meta-item-shadow) inset;
  } 
}
</style>
