
<template>
  <div
    class="total-power-chart"
    element-loading-background="var(--board-bg-color)"
  >
    <div class="chart-con" ref="power"></div>
  </div>
</template>
<script>
import { getTotalPowerData } from "@/api/home";
let chart;
export default {
  name: "NewPowerChart",
  data() {
    return {
      dataList: [],
      totalPower: 0,
      RawPower: 0,
      QualityPower: 0,
      loading: false,
      storageCapacity: 0,
      timer: null
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
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    drawPowerChart() {
      const series = this.dataList;
      const rate = this.rate;
      const isMobile = this.isMobile;
      // const { axisLine, seriesItem, area } = this.chartTheme.totalPower;
      const {
        axisLine,
        seriesItem,
        seriesMarkLine
      } = this.chartTheme.blockTime;
      // const {
      //   axisLine1
      //   seriesItem,
      //   seriesMarkLine
      // } = this.chartTheme.blockSize.seriesItem;
      const xData = series.map((item) => {
        return {
          value: item.name,
        };
      });
      const series1 = series.map((item) => {
        return {
          value: item.RawPower,
        };
      });
      const series2 = series.map((item) => {
        return {
          value: item.QualityPower,
        };
      });
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
              color: '#ffffff',
              fontSize: isMobile?11:13
            },
          },
        },
        yAxis: [{
          type:'value',
          name:  vm.$t("chart.powerGrouth"),
          nameTextStyle: {
            color: '#00ccf8',
            fontSize: isMobile?11:13
          },
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
              fontSize: isMobile?11:13*rate
            },
            formatter: function(p) {
              return vm.unitConversion(p)
            }
          },
      
        },{
          type:'value',
          name: vm.$t("chart.totalPower1"),
          nameTextStyle: {
            color: '#f3921b',
            fontSize: isMobile?11:14
          },
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
              fontSize: isMobile?11:12.5*rate
            },
            formatter: function(p) {
              return vm.unitConversion(p)
            }
          },
      
        }],
        grid: {
          left: 55,
          top: 30,
          right: 50,
          bottom: 25,
        },
        tooltip: {
          trigger: "axis",
          // axisPointer: {
          //   type: "cross",
          // },
          
            formatter: function(p) {
              const html = vm.$t("chart.totalPower", {
                rawPower:vm.unitConversion(p[0].data.value, 3),
                qualityPower:vm.unitConversion(p[1].data.value, 3),
                // value: vm.unitConversion(p[0].data.value, 3),
                name: p[0].name
              });
              return html;
            }
        },
        series: [
            {

                name: vm.$t("chart.totalPower1"),
                type: 'bar',
                // color: '#5ad8a6',
                barMaxWidth: 15,
                itemStyle: {
                normal: {
                  color: seriesItem
                }
              },
                data: series2
            }, {
                name: vm.$t("chart.powerGrouth"),
                type: 'line',
                yAxisIndex: 1,
                color: '#f3921b',
                data: series1
            }
        ],
      };
      chart.setOption(option);
    },
    async getTotalPowerData() {
      try {
        this.loading = true;
        const res = await getTotalPowerData({
          time: this.time.end_time,
        });
        console.log(res)
        if(res.code.code == 0) this.loading = false;
        // debugger
        // 8.9
        const dataList = res.graph.map((item) => {
          return {
            // name: this.formatTimeByStr(item.time * 1000, "MMM Do YYYY HH:mm"),
            name: this.formatTimeByStr(item.Time, "MM/DD"),
            RawPower: item.TotalPower,
            QualityPower: item.PowerIncr,
            // value: item.power
            // value: item.Power
          };
        });
        // this.storageCapacity = this.unitConversion(res.storage_capacity, 3);
        this.RawPower = this.unitConversion(dataList.slice(-1)[0].RawPower, 3);
        this.QualityPower = this.unitConversion(
          dataList.slice(-1)[0].QualityPower,
          3
        );
        this.dataList = Object.freeze(dataList);
        this.drawPowerChart();
      } catch (e) {
        this.loading = false;
      }
    },
  },
  mounted() {
    chart = this.$chart.init(this.$refs.power);
    this.getTotalPowerData();
    this.timer = setInterval(() => {
      this.getTotalPowerData();
    }, 60000);
  },
  watch: {
    latestBlockHeight() {
      if (this.loadCount === 1) {
        return;
      }
      this.getTotalPowerData();
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
    .total-power-chart {
      display: flex;
      height: 200px;
      background: var(--board-bg-color);
      align-items: center;
      background: var(--board-item-bg-color);
      border-radius: 3px;
      box-shadow: 0 0 7.5px 0 var(--block-meta-item-shadow) inset;
    }
  }
}

</style>
