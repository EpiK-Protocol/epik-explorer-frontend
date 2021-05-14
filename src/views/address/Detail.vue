<template>
  <div class="address-detail bottom-10">
    <!-- <overview
      v-if="isminer"
      :dataList="dataList"
      :dataLabel="$t('address.detail.overview')"
      class="bottom-20"
    /> -->
    <div class="overview" >
      <div class="top bg-item">
        <span>
          {{ $t("address.detail.overview[0]") }}: {{ $route.query.address }}
        </span>
        <!-- <div class="updateSign">修改签名&gt;</div> -->
      </div>
      <el-row v-if="isminer" :class="['chart-container', isMobile ? '' : 'flex', 'top-20']">
        <el-col
          :span="isMobile ? 24 : 11"
          class="address-balance bg-item"
          style="margin-right: 8px"
        >
          <div class="titl">{{ $t("address.overview[0]") }}</div>
          <div class="info flex">
            <div class="l">
              <div ref="pie" class="pie"></div>
            </div>
            <div class="r font-14">
              <div class="l1 bottom-10">{{ $t("address.overview[1]") }}</div>
              <div class="l2 font-28 bottom-20">{{ info.Balance }} EPK</div>
              <div class="pie-info">
                <div class="spot p1">
                  <span></span>{{ $t("chart.MiningPledge") }}:
                  {{ info.MiningPledge }} EPK
                </div>
                <div class="spot p2">
                  <span></span>{{ $t("chart.TotalRewards") }}:
                  {{ formatNumber(info.TotalRewards, 3) }} EPK
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col
          v-if="!isMobile"
          :span="13"
          class="bg-item"
          style="margin-left: 8px"
        >
          <div class="titl">{{ $t("address.overview[2]") }}</div>
          <div class="subtitle">{{ $t("address.overview[3]") }}</div>
          <div class="flex bottom-20 power">
            <div class="block font-28 font-500 text flex align-center">
              <span>{{
                unitConversion(info.TotalPower.QualityAdjPower || 0, 2)
              }}</span>
            </div>
            <div class="block flex">
              <div class="label">{{ $t("address.overview[4]") }}:</div>
              <div class="value">
                {{
                  (
                    (info.MinerPower.QualityAdjPower /
                      info.TotalPower.QualityAdjPower) *
                    100
                  ).toFixed(3) || 0
                }}%
              </div>
            </div>
            <div class="block flex">
              <div class="label">{{ $t("address.overview[5]") }}:</div>
              <div class="value">
                {{ unitConversion(info.TotalPower.RawBytePower || 0, 2) }}
              </div>
            </div>
          </div>
          <div class="flex bottom-20 power">
            <div class="block text flex align-center">
              <div class="label">{{ $t("address.overview[6]") }}:</div>
              <div class="value">{{ info.WinBlocks }}</div>
            </div>
            <div class="block flex">
              <div class="label">{{ $t("address.overview[7]") }}:</div>
              <div class="value">
                {{ formatNumber(info.TotalRewards, 3) }} EPK
              </div>
            </div>
            <div class="block flex">
              <div class="label">{{ $t("address.overview[8]") }}:</div>
              <div class="value">{{ unitConversion(info.SectorSize) }}</div>
            </div>
          </div>
        </el-col>
        <el-col v-else :span="24" class="bg-item">
          <div class="titl">{{ $t("address.overview[2]") }}</div>
          <div class="block font-28 flex align-center">
            <div class="label">{{ $t("address.overview[3]") }}:</div>
            <span>{{
              unitConversion(info.TotalPower.QualityAdjPower, 2)
            }}</span>
          </div>
          <div class="block flex">
            <div class="label">{{ $t("address.overview[4]") }}:</div>
            <div class="value">0.775%</div>
          </div>
          <div class="block flex">
            <div class="label">{{ $t("address.overview[5]") }}:</div>
            <div class="value">
              {{ unitConversion(info.TotalPower.RawBytePower || 0, 2) }}
            </div>
          </div>
          <div class="block text flex align-center">
            <div class="label">{{ $t("address.overview[6]") }}:</div>
            <div class="value">{{ info.WinBlocks }}</div>
          </div>
          <div class="block flex">
            <div class="label">{{ $t("address.overview[7]") }}:</div>
            <div class="value">
              {{ formatNumber(info.TotalRewards, 3) }} EPK
            </div>
          </div>
          <div class="block flex">
            <div class="label">{{ $t("address.overview[8]") }}:</div>
            <div class="value">{{ unitConversion(info.SectorSize) }}</div>
          </div>
        </el-col>
      </el-row>
      <div v-if="isminer" class="account-overview bg-item top-20 radius">
        <div class="top flex font-18 font-500 p-left-20">
          {{ $t("address.account[0]") }}
        </div>
        <div class="bottom font-14 flex info-main">
          <div>
            <span>{{ $t("address.account[1]") }}:</span>
            <span>{{ info.ID }}</span>
          </div>
          <div>
            <span>{{ $t("address.account[2]") }}:</span>
            <div class="content">
              <router-link
                :to="{ query: { address: info.Owner } }"
                type="primary"
                >{{ info.Owner }}
              </router-link>
            </div>
          </div>
          <div>
            <span>{{ $t("address.account[3]") }}:</span>
            <span>{{ info.PeerId }}</span>
          </div>
          <div>
            <span>{{ $t("address.account[4]") }}:</span>
            <span>{{ $t("address.account[5]") }}</span>
          </div>
          <div>
            <span>{{ $t("address.account[6]") }}:</span>
            <div class="content">
              <router-link :to="{ query: { address: info.Worker } }"
                >{{ info.Worker }}
              </router-link>
            </div>
          </div>
          <div>
            <span>{{ $t("address.account[7]") }}:</span>
            <span>{{ $t("address.account[8]") }}</span>
          </div>
          <div>
            <span>{{ $t("address.account[9]") }}:</span>
            <router-link :to="{ query: { address: info.Worker } }"
              >{{ info.Coinbase }}
            </router-link>
          </div>
          <div>
            <span>Coinbase：</span>
            <div class="content">
              <router-link
                :to="{ query: { address: info.Coinbase } }"
                type="primary"
                >{{ info.Coinbase }}
              </router-link>
            </div>
          </div>
          <div>
            <span>{{ $t("address.account[10]") }}:</span>
            <div class="content">
              <router-link :to="{ query: { address: info.ControlAddresses } }"
                >{{ info.ControlAddresses }}
              </router-link>
            </div>
          </div>
          
        </div>
        <div class="flex"></div>
      </div>
    </div>
    <div class="worker-list bottom-20" v-if="workers.length">
      <span>{{ $t("address.detail.worker") }}</span>
      <span>
        <base-link
          v-for="link in workers"
          :key="link"
          :label="link"
          target="address/detail"
          :param="{
            key: 'address',
            value: link,
          }"
        ></base-link>
      </span>
    </div>
    <overview
      :dataList="accountList"
      :dataLabel="$t('address.detail.ownerOverview')"
      class="bottom-20"
      v-if="isMiner"
    />
    <el-radio-group
      v-model="showMessage"
      style="margin-bottom: 20px"
      v-if="isMiner || workers.length"
    >
      <el-radio-button :label="true">
        {{ $t("address.radio")[0] }}
      </el-radio-button>
      <el-radio-button :label="false">
        {{ $t("address.radio")[1] }}
      </el-radio-button>
    </el-radio-group>
    <!-- type="address" -->
    <message-list v-if="showMessage" :address="$route.query.address" />
    <block-list v-else :miners="address" />
  </div>
</template>
<script>
import { getActorById } from "@/api/account";
import mixin from "./mixin";
export default {
  name: "AddressDetail",
  mixins: [mixin],
  data() {
    return {
      showMessage: true,
      isminer: false,
      isOwner: false,
      messageData: [],
      address: "",
      isMiner: false,
      workers: [],
      info: {
        TotalPower: {
          QualityAdjPower: 0,
          RawBytePower: 0,
        },
        MinerPower: {
          QualityAdjPower: 0,
          RawBytePower: 0,
        },
      },
      dataList: [
        {
          key: "address",
        },
        {
          key: "balance",
          unit: "tEPK",
        },
        {
          key: "raw",
        },
        {
          key: "quality",
        },
        {
          key: "peer_id",
        },
        {
          key: "sector_size",
          unit: "bytes",
        },
      ],
      accountList: [
        {
          key: "owner_address",
          isLink: true,
          target: "address/detail",
          paramKey: "address",
        },
        {
          key: "peer_id",
          isLink: true,
          target: "stats/peer",
        },
        {
          key: "power",
        },
        {
          key: "sector_size",
          unit: "bytes",
        },
        {
          key: "sector_num",
        },
        {
          key: "proving_sector_num",
        },
        {
          key: "fault_num",
        },
      ],
    };
  },
  watch: {
    "$route.query.address": {
      immediate: true,
      handler(v) {
        if (!v) {
          return;
        }
        this.address = [v];
        this.getAddressInfo(v);
      },
    },
    "$i18n.locale"() {
      this.getAddressInfo(this.$route.query.address);
    },
  },
  methods: {
    async getAddressInfo(a) {
      try {
        let res = await getActorById({
          id: a,
        });
        if (res.code.code != 0) {
          this.isminer = false;
          return;
        } else {
          this.isminer = true;
        }
        this.info = res.miner;
        let data = [
          {
            name: this.$t("chart.MiningPledge"),
            value: Number(this.info.MiningPledge),
          },
          {
            name: this.$t("chart.TotalRewards"),
            value: Number(this.info.TotalRewards),
          },
        ];
        // console.log(data)
        this.drawSizeChart(data);

        // const detail = this.parseAddress(res);

        // this.dataList = this.dataList.map((item) => {
        //   return {
        //     ...item,
        //     value: detail[item.key],
        //   };
        // });
        // this.workers = res.work_list;
        // if (res.data.is_miner && res.miner.owner_address != "") {
        //   this.isMiner = true;
        // } else {
        //   this.isMiner = false;
        // }
        // if (res.work_list.length) {
        //   this.address = res.work_list;
        // }
        this.accountList = this.accountList.map((item) => {
          let linkList;
          const originValue = res.miner[item.key];
          if (item.key === "owner_address" || item.key === "peer_id") {
            linkList = [originValue];
          } else {
            linkList = originValue;
          }
          const isNumber = parseFloat(originValue) == originValue;
          let result = {
            ...item,
            value: isNumber ? this.formatNumber(originValue, 18) : originValue,
            linkList: linkList,
          };
          if (item.key === "power") {
            result.value = `${originValue} bytes (${this.unitConversion(
              originValue
            )})`;
          }
          return result;
        });
      } catch (e) {
        console.log(e);
      }
    },
    drawSizeChart(data) {
      // const data = this.dataList;
      let chart = this.$chart.init(this.$refs.pie);
      const rate = this.rate;
      const isMobile = this.isMobile;

      const vm = this;
      const option = {
        tooltip: {
          trigger: "item",
          // formatter: '{b} : {c} ({d}%)',
          position: ["80%", "50%"],
        },
        color: ["#5ad8a6", "#9270ca"],

        series: [
          {
            // data: vm.Total,
            radius: ["40%", "70%"],
            type: "pie",
            avoidLabelOverlap: false,
            labelLine: {
              show: false,
            },
            label: {
              show: false,
              position: "center",
            },
            data: data,
          },
        ],
      };
      chart.setOption(option);
    },
  },
};
</script>
<style lang="scss" scoped>
.address-detail {
  color: var(--main-text-color);
  .overview {
    background: var(--board-bg-color);
    padding: 20px;
    .bg-item {
      background: var(--board-item-bg-color);
      padding-bottom: 10px;
    }
    .account-overview {
      .top {
        border-bottom: 1px solid var(--border-color);
      }
      .bottom.info-main {
        padding: 20px 20px 0;
        flex-wrap: wrap;
      }
      .bottom.info-main > div {
        margin-bottom: 15px;
        line-height: 20px;

        &:nth-child(2),
        &:nth-child(5),
        &:nth-child(8) {
          width: 33.33%;
          display: flex;
          flex-direction: row;
          min-height: 26px;
          span:first-child {
            display: inline-block;
            min-width: 100px;
            margin-right: 10px;
            white-space: nowrap;
          }
          .content {
            display: flex;
            flex-direction: column;
            padding-right: 60px;
            a {
              word-break: break-word;
              white-space: break-spaces;
              color: #409eff;
            }
          }
          span:first-child {
            display: inline-block;
            min-width: 100px;
            margin-right: 10px;
            white-space: nowrap;
          }
        }
        &:nth-child(3),
        &:nth-child(6),
        &:nth-child(9) {
          min-height: 26px;
          width: 33.33%;
          display: flex;
          flex-direction: row;
          word-break: break-word;
          white-space: break-spaces;
          span:first-child {
            display: inline-block;
            min-width: 100px;
            margin-right: 10px;
            white-space: nowrap;
          }
          .content {
            display: flex;
            flex-direction: column;
            padding-right: 60px;
            a {
              word-break: break-word;
              white-space: break-spaces;
              color: #409eff;
            }
          }
        }
        &:first-child,
        &:nth-child(4),
        &:nth-child(7) {
          min-height: 26px;
          width: 33.33%;
          span:first-child {
            display: inline-block;
            min-width: 100px;
            margin-right: 10px;
          }
        }
      }
    }
    .top {
      border-radius: 4px;
      display: flex;
      align-items: center;
      height: 50px;
      padding: 0 20px;
    }
    .power {
      align-items: center;
    }
    .block {
      // margin-bottom: 15px;
      // line-height: 30px;
      box-sizing: border-box;
      padding: 0 20px;
      flex: 1;
      flex-shrink: 0;
      .label {
        padding-right: 20px;
      }
    }
    .subtitle {
      padding-left: 20px;
      font-size: 14px;
      margin-bottom: 24px;
    }
    .titl {
      padding: 20px;
      font-size: 18px;
    }
    .address-balance {
      .info {
        .l {
          width: 33.3%;
          height: 140px;
          flex-shrink: 0;
          .pie {
            height: 130px !important;
          }
        }
        .r {
          width: 100%;
          .l2 {
            line-height: 40px;
          }
          .pie-info {
            .spot {
              width: 100%;
              margin-bottom: 10px;
              span {
                display: inline-block;
                width: 6px;
                height: 6px;
                border-radius: 4px;
                margin-right: 10px;
              }
            }
            .p1 span {
              background: #5ad8a6;
            }

            .p2 span {
              background: #9270ca;
            }
          }
        }
      }
    }
    .chart-container {
    }
  }

  & ::v-deep .el-radio-group label {
    display: inline-block;
    width: 150px;
    span {
      width: 100%;
    }
  }
  .worker-list {
    min-height: 60px;
    display: flex;
    background: var(--board-bg-color);
    box-shadow: 0px 1px 5px 7px rgba(0, 0, 0, 0.03);
    border-radius: 4px;
    color: var(--main-text-color);
    span {
      line-height: 60px;
    }
    span:first-child {
      padding-left: 100px;
      min-width: 200px;
    }
    span:last-child {
      flex: 1;
      word-break: break-all;
    }
    & ::v-deep a span {
      margin-right: 10px;
    }
  }
  @media (max-width: 768px) {
    // .content-container{
    //   padding: 60px 00px 0px;
    // }
    .overview {
      background: var(--main-bg-color);
      padding: 0;
      .bg-item {
        margin: 0 0 5px !important;
      }
      .account-overview {
        .top {
          border-bottom: 1px solid var(--border-color);
        }
        .bottom.info-main {
          padding: 20px 20px 0;
          flex-wrap: wrap;
        }
        .bottom.info-main > div {
          margin-bottom: 15px;
          line-height: 20px;

          &:nth-child(2),
          &:nth-child(5),
          &:nth-child(8) {
            width: 100%;
            display: flex;
            flex-direction: row;
            min-height: 26px;
            span:first-child {
              display: inline-block;
              min-width: 100px;
              margin-right: 10px;
              white-space: nowrap;
            }
            .content {
              display: flex;
              flex-direction: column;
              padding-right: 60px;
              a {
                word-break: break-word;
                white-space: break-spaces;
                color: #409eff;
              }
            }
            span:first-child {
              display: inline-block;
              min-width: 100px;
              margin-right: 10px;
              white-space: nowrap;
            }
          }
          &:nth-child(3),
          &:nth-child(6),
          &:nth-child(9) {
            min-height: 26px;
            width: 100%;
            display: flex;
            flex-direction: row;
            word-break: break-word;
            white-space: break-spaces;
            span:first-child {
              display: inline-block;
              min-width: 100px;
              margin-right: 10px;
              white-space: nowrap;
            }
            .content {
              display: flex;
              flex-direction: column;
              padding-right: 60px;
              a {
                word-break: break-word;
                white-space: break-spaces;
                color: #409eff;
              }
            }
          }
          &:first-child,
          &:nth-child(4),
          &:nth-child(7) {
            min-height: 26px;
            width: 100%;
            span:first-child {
              display: inline-block;
              min-width: 100px;
              margin-right: 10px;
            }
          }
        }
      }
      .top {
        font-size: 13px;
        display: flex;
        align-items: center;
        height: 30px;
        padding: 0 13px;
      }
      .power {
        align-items: center;
      }
      .block {
        // margin-bottom: 15px;
        // line-height: 30px;
        box-sizing: border-box;
        padding: 0 13px;
        flex: 1;
        flex-shrink: 0;
        justify-content: space-between;
        margin-bottom: 15px;
        .label {
          padding-right: 10px;
        }
      }
      .titl {
        padding: 10px;
        font-size: 13px;
        margin-bottom: 0px;
      }
      .address-balance {
        .info {
          .l {
            width: 33.3%;
            height: 100px;
            flex-shrink: 0;
            .pie {
              height: 100px !important;
            }
          }
          .r {
            width: 100%;
            .l2 {
              line-height: 30px;
              font-size: 16px;
            }
            .pie-info {
              display: block;
              .spot {
                width: 100%;
                margin-bottom: 5px;
                span {
                  display: inline-block;
                  width: 6px;
                  height: 6px;
                  border-radius: 4px;
                  margin-right: 10px;
                }
              }
              .p1 span {
                background: #5ad8a6;
              }

              .p2 span {
                background: #9270ca;
              }
            }
          }
        }
      }
    }
    .worker-list {
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.03);
      border-radius: 4px;
      margin: 10px 0;
      span {
        height: 30px;
        line-height: 30px;
        &:first-child {
          margin-right: 10px;
        }
        a {
          margin-right: 5px;
        }
      }
    }
    & ::v-deep .el-radio-group {
      display: flex !important;
      border-radius: 4px !important;
      label {
        flex: 1;
        height: 30px !important;
        &:first-child span {
          border-radius: 4px 0 0 4px;
        }
        &:last-child span {
          border-radius: 0 4px 4px 0;
        }
        span {
          height: 100% !important;
          line-height: 30px !important;
          padding: 0;
        }
      }
    }
    & ::v-deep > div:nth-child(2).general-overview {
      margin: 10px 0 !important;
    }
  }
}
</style>
