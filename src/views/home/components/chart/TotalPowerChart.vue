<template>
  <div
    class="total-power-chart"
    v-loading="loading"
    element-loading-background="var(--board-bg-color)"
  >
    <div class="info-con">
      <div class="power-info">
        <div>
          {{ $t("home.totalPower.power") }}
        </div>
        <div class="top-10 bottom-10" v-show="!loading">{{ RawPower }}</div>
      </div>
      <div class="storage-info">
        <div>
          {{ $t("home.totalPower.capacity") }}
        </div>
        <div class="top-10" style="color:var(--block-size-color)" v-show="!loading">{{ QualityPower }}</div>
      </div>
    </div>
    <div class="chart-con" ref="power"></div>
  </div>
</template>
<script>
import { getTotalPowerData } from "@/api/home";
let chart;
export default {
  name: "TotalPowerChart",
  data() {
    return {
      dataList: [],
      totalPower: 0,
      RawPower:0,
      QualityPower:0,
      loading: false,
      storageCapacity: 0
    };
  },
  props: {
    time: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    drawPowerChart() {
      const series = this.dataList;
      console.log(series)
      const { axisLine, seriesItem, area } = this.chartTheme.totalPower;
      // const {
      //   axisLine1
      //   seriesItem,
      //   seriesMarkLine
      // } = this.chartTheme.blockSize.seriesItem;
      const xData = series.map(item => {
        return {
          value: item.name
        };
      });
      const series1 = series.map(item => {
        return {
          value: item.RawPower
        };
      });
      const series2 = series.map(item => {
        return {
          value: item.QualityPower
        };
      });
      const vm = this;
      const option = {
        xAxis: {
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#666666'
            }
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          },
          data: xData
        },
        yAxis: {
          type: "value",
          scale:true,
          show: false
        },
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 10
        },
        tooltip: {
          trigger: "axis",

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
            data: series2,
            type: "line",
            symbol: "none",
            smooth: true,
            lineStyle: {
              color: seriesItem
            },
            areaStyle: {
              color: area
            }
          },
          {
            data: series1,
            type: "line",
            symbol: "none",
            smooth: true,
            lineStyle: {
              color: this.chartTheme.blockSize.axisLine
            },
            areaStyle: {
              color: this.chartTheme.blockSize.area
            }
          }
        ]
      };
      chart.setOption(option);
    },
    async getTotalPowerData() {
      try {
        this.loading = true;
        const res = await getTotalPowerData({
          time: this.time.end_time
        });
        // console.log(res)
        this.loading = false;
        // debugger
        // 8.9
        const dataList = res.data.map(item => {
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
        this.QualityPower = this.unitConversion(dataList.slice(-1)[0].QualityPower, 3);
        this.dataList = Object.freeze(dataList);
        this.drawPowerChart();
      } catch (e) {
        this.loading = false;
      }
    }
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
    }
  }
};
</script>
<style lang="scss" scoped>
.total-power-chart {
  display: flex;

  .info-con {
    //flex: 2;
    min-width: 180px;
    display: flex;
    flex-direction: column;
    & > div {
      div:last-child {
        font-size: 26px;
        color: var(--total-power-color);
      }
      div:first-child {
        color: var(--total-board-top-color);
        font-weight: bold;
      }
    }
  }
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
