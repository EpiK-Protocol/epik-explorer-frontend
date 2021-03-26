<template>
  <div
    class="total-power-chart"
    v-loading="loading"
    element-loading-background="var(--board-bg-color)"
  >
    <!-- <div>最新成交价（${series[series.length-1][1]}）</div> -->
    <div class="chart-con" ref="power"></div>
  </div>
</template>
<script>
import { getKLineData } from "@/api/home";
let chart;
export default {
  name: "KLineChartt",
  data() {
    return {
      dataList: [],
      totalPower: 0,
      RawPower: 0,
      QualityPower: 0,
      loading: false,
      storageCapacity: 0,
      latestPrice: 0
    };
  },
  props: {
    time: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    drawPowerChart() {
      const rate = this.rate;
      const isMobile = this.isMobile;
      const series = this.dataList;
      const { axisLine, seriesItem, area } = this.chartTheme.totalPower;
      // const {
      //   axisLine1
      //   seriesItem,
      //   seriesMarkLine
      // } = this.chartTheme.blockSize.seriesItem;
      const xData = series.map((item) => {
        return item.time;
      });
      const series1 = series.map((item) => {
        return item.data;
      });
      // const series2 = series.map((item) => {
      //   return {
      //     value: item.QualityPower,
      //   };
      // });
      const vm = this;
      const option = {
        animation: false,
        xAxis: {
          type: "category",
          data: xData,
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#ffffff",
              fontSize: isMobile?11:14.5*rate
            },
          },
        },

        yAxis: {
          name: vm.$t("chart.price"),
          nameTextStyle: {
            color: "#ffffff",
            fontSize: isMobile?11:14.5*rate,
          },
          scale: true,
          splitNumber: 3,
          axisLine: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "#153550",
            },
          },
          axisTick: { show: false },
          axisLabel: {
            textStyle: {
              color: "#ffffff",
              fontSize: isMobile?11:14.5*rate,
            },
          },
        },
        grid: {
          left: 30,
          top: 30,
          right: 30,
          bottom: 25,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },

          //   formatter: function(p) {
          //     const html = vm.$t("chart.totalPower", {
          //       rawPower:vm.unitConversion(p[1].data.value, 3),
          //       qualityPower:vm.unitConversion(p[0].data.value, 3),
          //       // value: vm.unitConversion(p[0].data.value, 3),
          //       name: p[0].name
          //     });
          //     return html;
          //   }
        },
        dataZoom: [
          {
            type: "inside",
            start: 85,
            end: 100,
          },
        ],
        series: [
          {
            type: "k",
            name: "EPK",
            data: series1,
            barMaxWidth: 13,
            itemStyle: {
              normal: {
                color: "#47b262",
                color0: "#eb5454",
                borderColor: "#47b262",
                borderColor0: "#eb5454",
                borderWidth: 1,
              },
            },
            markPoint: {
              // Symbol: false,
              symbolSize: 40,
              label: {
                normal: {
                  fontSize: 10,
                  formatter: function (param) {
                    return param != null ? param.value.toFixed(2) : "";
                  },
                },
              },
              data: [
                // {
                //   name: "最近成交价",
                //   type: "max",
                //   valueIndex: 0,
                //   symbol: "rect",
                //   symbolSize: [50, 20],
                //   symbolOffset: [20, 0],
                //   symbolKeepAspect: true,
                //   itemStyle: {
                //     color: "rgba(0,0,0,0)",
                //   },
                //   label: {
                //     formatter: (item) => {
                //       // console.log(item.data.coord[1])
                //       debugger
                //       return series1[item.data.coord[0]][1].toFixed(3);
                //     },
                //     fontSize: 10,
                //   },
                // },

                {
                  name: "highest value",
                  type: "max",
                  valueDim: "highest",
                },
                {
                  name: "lowest value",
                  type: "min",
                  valueDim: "lowest",
                  // color:'#eb5454',
                  itemStyle: {
                    color: "#eb5454",
                  },
                  
                  // symbolRotate: 180,
                  // symbolOffset: [0,0]
                },
              ],
              tooltip: {
                formatter: function (param) {
                  return param.name + "<br>" + (param.data.coord || "");
                },
              },
            },
            markLine: {
              //     symbol: ['none', 'none'],
              data: [
                //         {
                //             name: 'min line on close',
                //             type: 'min',
                //             // valueDim: 'close',
                //             // series1[series1.length-1][1]
                //             // xData[xData.length-1]
                //             coord: ['15:00','1.06'],
                //             label:{
                //               show: true,
                //               fontSize: 10
                //             },
                //             lineStyle:{
                //               color: "rgba(255, 255, 255, .8)",
                //             }
                //         },
                //         // {
                //         //     name: 'max line on close',
                //         //     type: 'max',
                //         //     valueDim: 'open',
                //         //     label:{
                //         //       show: true,
                //         //       fontSize: 10
                //         //     },
                //         //     lineStyle:{
                //         //       color: "rgba(255, 255, 255, .8)",
                //         //     }
                //         // }
              ],
            },
          },
        ],
      };

      chart.setOption(option);
    },
    async getKLineData() {
      try {
        this.loading = true;
        const res = await getKLineData();
        // console.log(res)
        this.loading = false;
        // debugger
        const dataList = res.kline.map((item) => {
          return {
            time: this.formatTimeByStr(item.id * 1000, "HH:mm"),
            data: [item.open, item.close, item.low, item.high],
          };
        });

        this.dataList = Object.freeze(dataList);
        this.drawPowerChart();
      } catch (e) {
        this.loading = false;
      }
    },
  },
  mounted() {
    chart = this.$chart.init(this.$refs.power);
    this.getKLineData();
  },
  watch: {
    latestBlockHeight() {
      if (this.loadCount === 1) {
        return;
      }
      this.getKLineData();
    },
    theme() {
      this.drawPowerChart();
    },
    '$i18n.locale'() {
      this.drawPowerChart();
    }
  },
};
</script>
<style lang="scss" scoped>
.total-power-chart {
  display: flex;
  height: 300px;

  .chart-con {
    flex: 1;
    height: 100%;
  }
  @media (max-width: 768px) {
   
    .info-con .power-info,
    .info-con .storage-info {
      & > div:last-child {
        margin-top: 5px !important;
        font-size: 12px !important;
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
@media (max-width: 768px) {

   .total-power-chart{
     display: flex;
    height: 200px;
    background: var(--board-bg-color);
    align-items: center;
    background: var(--board-item-bg-color);
    border-radius: 3px;
    box-shadow: 0 0 7.5px 0 var(--block-meta-item-shadow) inset;
    }
}
</style>
