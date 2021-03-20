
<template>
  <div
    class="total-power-chart"
    v-loading="loading"
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
      const series = this.dataList;
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
              fontSize: '10'
            },
          },
        },
        yAxis: [{
          type:'value',
          name: '全网算力',
          nameTextStyle: {
            color: '#00ccf8',
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
              fontSize: '11'
            },
            formatter: function(p) {
              return vm.unitConversion(p)
            }
          },
      
        },{
          type:'value',
          name: '算力增长',
          nameTextStyle: {
            color: '#f3921b',
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
              fontSize: '11'
            },
            formatter: function(p) {
              return vm.unitConversion(p)
            }
          },
      
        }],
        grid: {
          left: 50,
          top: 30,
          right: 50,
          bottom: 20,
        },
        tooltip: {
          trigger: "axis",
          // axisPointer: {
          //   type: "cross",
          // },
      

            formatter: function(p) {
              const html = vm.$t("chart.totalPower", {
                rawPower:vm.unitConversion(p[1].data.value, 3),
                qualityPower:vm.unitConversion(p[0].data.value, 3),
                // value: vm.unitConversion(p[0].data.value, 3),
                name: p[0].name
              });
              return html;
            }
        },
        series: [
            {
                name: '全网算力',
                type: 'bar',
                // color: '#5ad8a6',
                barMaxWidth: 10,
                itemStyle: {
                normal: {
                  color: seriesItem
                }
              },
                data: series1
            }, {
                name: '算力增长',
                type: 'line',
                yAxisIndex: 1,
                color: '#f3921b',
                data: series2
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
</style>
