<template>
  <div class="message-list" element-loading-background="var(--board-bg-color)">
    <!-- :loadMore="false"
        @load="loadMessageData"
        :showLoading="loading" -->
	<div class="top-con flex" style="align-items: center;justify-content: space-between;">
    <span v-if="!isMobile" class="copy" @click="docopy($route.query.coinbase, 'copy')">
          Coinbase: {{ $route.query.coinbase }}
    </span>
		<div class="info-con">
		<div class="power-info">
			<span>
			{{ $t("coinbase.total") }}：
			</span>
			<span>{{ coinbaseData.total }} EPK</span>
		</div>
		<div class="power-info">
			<span>
			{{ $t("coinbase.vested") }}：
			</span>
			<span style="color:var(--block-size-color)" >{{ coinbaseData.vested }} EPK</span>
		</div>
		<div class="power-info">
			<span>
			{{ $t("coinbase.vesting") }}：
			</span>
			<span style="color: #0091ff;" >{{ coinbaseData.vesting}} EPK</span>
		</div>
		</div>
  	</div>
    <div class="miner-table-con">
      <base-table
        :dataSource="messageData"
        :columns="columns"
        :labels="$t('coinbase.column')"
        :showLoading="loading"
        :loadMore="loadMore"
        @load="loadMessageData"
        :height="isMobile?'calc(100vh - 70px)':'calc(100vh - 170px)'"
      ></base-table>

      <!-- :showLoading="loading" -->
    </div>
    <!-- <mb-board
      v-for="(item, index) in messageData"
      :key="item.cid + index"
      :dataSource="item"
      :columns="mbColumns"
      v-else
    /> -->
    <!-- <mb-page v-if="isMobile" @page-change="handlePageChange" :total="total" /> -->
    <el-dialog
      :title="$t('verify.title')"
      class="address-detail"
      :visible.sync="dialogFormVisible"
      width="70%"
    >
      <el-form :model="form" ref="signForm" label-width="120px">
        <el-form-item
          :label="$t('verify.t1')"
          prop="address"
          :rules="[{ required: true, message: $t('verify.t7') }]"
        >
          <el-input
            v-model="form.address"
            autocomplete="off"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('verify.t2')"
          prop="user_tag"
          :rules="[{ required: true, message: $t('verify.t7') }]"
        >
          <el-input v-model="form.user_tag" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('verify.t3')">
          <div
            class="flex"
            @click="docopy(sign_code, 'copy')"
            style="align-items: center; color: white"
          >
            <el-input
              v-model="sign_code"
              autocomplete="off"
              :disabled="true"
            ></el-input>
            <i class="el-icon-copy-document" style="margin-left: 10px"></i>
          </div>
        </el-form-item>
        <el-form-item
          :label="$t('verify.t4')"
          prop="signature"
          :rules="[{ required: true, message: $t('verify.t7') }]"
        >
          <el-input
            v-model="form.signature"
            :placeholder="$t('verify.t5')"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="updateSign">{{
          $t("verify.t6")
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getBoardInfo,
} from "@/api/home";

import { encode, decode } from "hex-encode-decode";
import { signUserTag, getCoinbase } from "@/api/account";
import { Message } from "element-ui";

export default {
  name: "MinerList",
  data() {
    return {
      dialogFormVisible: false,
      form: {
        address: "",
        user_tag: "",
        signature: "",
      },
      coinbaseData: {
        total: 0,
        vested: 0,
        vesting: 0,
      },
      loadMore:true,

      loading: false,
      option: {
        method: "",
        begindex: "0",
        count: "25",
      },
      info: {},
      active: 2,
      page: 0,
      total: 0,
      messageData: [],
      columns: [
  
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

      labels: [],
      offset: 0,
      //   loadCount: 0,
    };
  },
  props: {
    withType: {
      type: Boolean,
      default: true,
    },
    cid: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "block",
    },
    coinbase: {
      type: String,
      default: "",
    },
  },
  methods: {
    stringtoHex(str) {
      var val = "";
      for (var i = 0; i < str.length; i++) {
        if (val == "") val = str.charCodeAt(i).toString(16);
        else val += str.charCodeAt(i).toString(16);
      }
      val += "0a";
      return val;
    },
    openDialog(val) {
      this.form.address = val;
      this.dialogFormVisible = true;
    },
    submitForm(formName, fn) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          fn();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    updateSign() {
      this.submitForm("signForm", async () => {
        try {
          let res = await signUserTag(this.form);

          if (res.code.code == 0) {
            Message({
              message: "提交成功",
              type: "success",
              duration: 2500,
            });
            this.form = {
              address: "",
              user_tag: "",
              signature: "",
            };
            this.dialogFormVisible = false;
            this.getMessage();
          } else {
            // Message.error('请求错误')
          }
        } catch (e) {
          console.log(e);
          // Message.error(e)
        }
      });
    },
    changeType(data) {
      this.active = data;
      this.getMessage();
    },
    async loadMessageData() {
      if (this.loading) {
        return;
      }
      //   debugger
      //   if (this.loadCount == 3) {
      //     // this.append = true;
      //     return;
      //   }
      else {
        // clearInterval(this.timer);
        try {
          this.loading = true;
          await this.getMessage();
          this.page++;
          this.loading = false;
          //   this.initMesTimer();
        } catch (e) {
          if (e) {
            this.loading = false;
          }
        }
      }
    },
    async getMessage() {
      try {
        const vm = this;
        this.loading = true;

        const data = await getCoinbase({
          coinbase: this.coinbase,
          page:this.page,
          size:20
        });
        this.coinbaseData = {
          total:Number(data.total).toFixed(2),
          vested:Number(data.vested).toFixed(2),
          vesting:Number(data.vesting).toFixed(2),
        }
      
        let minerData = [];
        let that = this;
      
        if(data.miners.length==0){
          this.loadMore = false
        }else{
          this.loadMore = true
        }
        
          minerData = data.miners.map((item, index) => {
            
            const {
              ID,
              UserTag,
              OwnerAddress,
              MinerPower,
              WinBlocks,
              TotalRewards,
              LatestWinBlock,
            } = item;
            return {
              Miner: ID,
              Tag: {
                data: UserTag || "--",
                btn: UserTag == "" ? that.openDialog : "",
                param: OwnerAddress,
              },
              QualityAdjPower: {
                data: vm.unitConversion(MinerPower.QualityAdjPower, 2),
                percent: (
                  (MinerPower.QualityAdjPower /
                    this.info.minerInfomation.TotalPower) *
                  100
                ).toFixed(2),
              },
              RawBytePower: {
                data: vm.unitConversion(MinerPower.RawBytePower, 2),
                percent: (
                  (MinerPower.RawBytePower /
                    this.info.minerInfomation.TotalPower) *
                  100
                ).toFixed(2),
              },

              Blocks: {
                data: WinBlocks,
                percent: (
                  (WinBlocks / this.info.baseInfomation.TotalBlocks) *
                  100
                ).toFixed(2),
              },
              Rewards: {
                data: Number(TotalRewards).toFixed(3),
                percent: (
                  (Number(TotalRewards) /
                    this.info.minerInfomation.TotalMiningReward) *
                  100
                ).toFixed(2),
              },
              lastblock: LatestWinBlock,
            };
          });
        // debugger

        // this.messageData = minerData;
        this.messageData = [...this.messageData,...minerData]

        // this.messageData = Object.freeze(minerData);
        this.loading = false;
      } catch (e) {
        this.loading = false;
      }
    },
  },

  async mounted() {
    this.info = await getBoardInfo();
    // this.labels = [...this.$t("component.mesList.label")];
    // if (!this.withType) {
    //   this.columns.shift();
    //   this.labels.shift();
    // }

    // this.getMessage();
  },
  watch: {
    "$route.query.coinbase": {
      immediate: true,
      handler(v) {
        if (!v) {
          return;
        }
        // this.address = [v];
        this.page = 0

        this.messageData = []
        this.getMessage(v);
        
      },
    },
  },
  computed: {
    sign_code() {
      if (!this.form.user_tag) return "";
      return `epik wallet sign ${this.form.address} ${encode(
        this.form.user_tag
      )}`;
    },
    mbColumns() {
      return this.columns
        .map((item, index) => {
          return {
            ...item,
            title: this.labels[index],
          };
        })
        .filter((item) => {
          return !item.hideInMobile;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.message-list {
  background: var(--board-bg-color);
  padding: 10px;
  .top-con {
    background: var(--board-item-bg-color);
    padding: 10px;
    margin-bottom: 10px;
    overflow: auto;
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
	line-height: 20PX;
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
  @media (max-width: 768px) {
	  .info-con {
    display: block;
  
  }

  }
  }

  .miner-type {
    color: white;
    border: 1px solid var(--force-mark-color);
    display: inline-flex;
    font-size: 13px;
    border-radius: 20px;
    padding: 5px 10px;
    div {
      padding: 0 15px;
      cursor: pointer;
      min-width: 80px;
    }
    div.active {
      color: var(--force-mark-color);
      font-weight: 500;
    }
    div:not(:last-child) {
      border-right: 1px solid #153550;
    }
  }
  .total-number {
    height: 80px;
    align-items: center;
    padding: 0 100px;
    display: flex;
    background: var(--board-bg-color);
    color: var(--main-text-color);
    & ::v-deep > span {
      margin-right: auto;
      i {
        color: var(--link-color);
        font-size: 22px;
      }
    }
    .el-dropdown-link {
      color: white;
    }
  }
  @media (max-width: 768px) {
    .total-number {
      height: 30px;
      margin-bottom: 10px;
      & ::v-deep .el-select input {
        height: 20px;
        font-size: 12px !important;
        width: 100px;
      }
      & ::v-deep .el-input__suffix {
        i {
          line-height: 20px;
          padding-left: 5px;
          &.is-reverse {
            padding-right: 10px;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
@media (max-width: 768px) {
  .el-select-dropdown {
    z-index: 10000 !important;
    .el-select-dropdown__wrap {
      max-height: 160px !important;
    }
    li {
      height: 20px !important;
      line-height: 20px !important;
      font-size: 12px;
    }
  }
}
</style>
