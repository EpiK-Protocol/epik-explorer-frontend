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
  name: "KLineChartt",
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
      const { axisLine, seriesItem, area } = this.chartTheme.totalPower;
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
          data: ["10-24", "10-25", "10-26", "10-27","10-28","11-01","11-02","11-03"],
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
        // xAxis: {

        //   boundaryGap: false,
        //   axisLine: {
        //     lineStyle: {
        //       color: '#153550'
        //     }
        //   },
        // //   axisLabel: {
        // //     show: false
        // //   },
        // //   axisTick: {
        // //     show: false
        // //   },
        // //   data: xData
        //     data: ['2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27']
        // },
        yAxis: {
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
          },
      
        },
        grid: {
          left: 30,
          top: 20,
          right: 0,
          bottom: 20,
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
        series: [
          {
            type: "k",
            data: [
              [20, 34, 10, 38],
              [40, 35, 30, 50],
              [31, 38, 33, 44],
              [38, 15, 5, 42],
              [31, 38, 33, 44],
              [38, 15, 5, 42],
              [31, 38, 33, 44],
              [38, 15, 5, 42],
            ],
            barMaxWidth: 10,
            itemStyle: {
              normal: {
                color: "#47b262",
                color0: "#eb5454",
                borderColor: "#47b262",
                borderColor0: "#eb5454",
                borderWidth: 1
              },
            },
          },
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
        // console.log(res)
        this.loading = false;
        // debugger
        // 8.9
        const dataList = res.data.map((item) => {
          return {
            // name: this.formatTimeByStr(item.time * 1000, "MMM Do YYYY HH:mm"),
            name: this.formatTimeByStr(item.Time * 1000, "MMM Do YYYY HH:mm"),
            RawPower: item.RawPower,
            QualityPower: item.QualityPower,
            // value: item.power
            // value: item.Power
          };
        });
        this.storageCapacity = this.unitConversion(res.storage_capacity, 3);
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
