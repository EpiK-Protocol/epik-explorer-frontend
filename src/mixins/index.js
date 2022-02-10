import dayjs from "dayjs";
import light from "../chart/theme/light";
import dark from "../chart/theme/dark";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { copy } from "iclipboard";
import { Message } from 'element-ui';

dayjs.extend(advancedFormat);
const mixin = {
  computed: {
    atIndex() {
      return this.$route.path === "/";
    },
    latestBlockHeight() {
      return this.$store.state.defaultHeight;
    },
    loadCount() {
      return this.$store.state.loadCount;
    },
    isMobile() {
      return this.$store.state.isMobile;
    },
    routeName() {
      return this.$t("routeName")[this.$route.name];
    },
    theme() {
      return this.$store.state.theme;
    },
    chartTheme() {
      return this.theme === "dark" ? dark : light;
    },
    now() {
      return dayjs().unix();
    },
    rate() {
      return this.isMobile ? 1 : this.$store.state.rate;
    }
  },
  methods: {
    docopy(str,flag) {
      if(flag != 'copy')return
      if(!str) return
      if (copy(str)) {
        Message({
          message: "已复制到粘贴板",
          type: "success",
          duration: 2500,
        });
      } else {
        Message.error("复制失败");
      }
    },
    windowResize() {
      this.$store.commit('setIsMobile', window.innerWidth < 768);
    },
    goTo(name = "/", { params, query } = {}) {
      this.$router.push({
        name,
        params,
        query
      });
    },
    formatNumber(v, len = 5) {
      return Number(v).toLocaleString("en", { maximumFractionDigits: len });
    },
    parseFormatNumber(v) {
      return typeof v === "number" ? v : Number(v.replace(/,/g, ""));
    },
    formatTime(from, to) {
      const current = new Date(to || new Date()).getTime();
      let interval = Math.abs(current / 1000 - from);
      const secUnit = 1;
      const minUnit = 60;
      const hrUnit = 60 * 60;
      const dayUnit = 24 * hrUnit;
      const arr = [];
      const unit = [dayUnit, hrUnit, minUnit, secUnit];
      const suffix = ["day", "hr", "min", "s"];
      let n = 0;
      while (n < 4) {
        arr.push(Math.floor(interval / unit[n]));
        interval = interval - unit[n] * arr[n];
        n++;
      }
      const strMap = arr
        .map((item, index) => {
          return `${item}${suffix[index]}${item > 1 && index !== 3 ? "s" : ""}`;
        })
        .filter(item => {
          return item[0] !== "0";
        })
        .slice(0, 2);
      return strMap.join(" ");
    },
    formatFloat(v, l = 9) {
      const [int, dot] = Number(v)
        .toString()
        .split(".");
      let length;
      if (dot) {
        length = Math.max(0, l - int.length);
      }
      return Number(`${int}.${dot.slice(0, length)}`).toLocaleString();
    },

    ellipsisByLength(str, length = 6, flag = true) {
      return str.length > 2 * length && flag
        ? `${str.slice(0, length)}...${str.slice(-length)}`
        : str;
    },
    getFormatTime(time) {
      return dayjs(time).format("MMM Do YYYY HH:mm:ss (UTCZ)");
    },
    formatTimeByStr(time, str) {
      return dayjs(time).format(str || "MMM Do YYYY");
    },
    formatFilNumber(value) {
      value = Number(value);
      // if(value.toString().length>=18)
      value = value/1000000000000000000
      // if (value === 0) {
      //   return "0 tEPK";
      // } else {
        // if(value>=0.00001){
        let str = value +'';
        return (str.substring(str.indexOf('.')+1,str.length).length > 3 ? Math.round(str * 1000) / 1000 : parseFloat(value)) + ' EPK'
        // }
        // return value >= 0.00001
        //   ? `${value.toFixed(3)} tEPK`
        //   : `${(value * Math.pow(10, 18)).toLocaleString()} AttoEPK`;
      // }
    },
    getCodeText(code){
      // debugger
      switch(code) {
        case 0:
            return "ok"
            
        case 1:
            return "SysErrSenderInvalid"
            
        case 2:
            return "SysErrSenderInvalid"
            
        case 3:
            return "SysErrInvalidMethod"
            
        case 4:
            return " SysErrReserved1"
            
        case 5:
            return "SysErrInvalidReceiver"
            
        case 6:
            return "SysErrInsufficientFunds"
            
        case 7:
            return "SysErrOutOfGas"
            
        case 8:
            return "SysErrForbidden"
            
        case 9:
            return "SysErrorIllegalActor"
            
        case 10:
            return "SysErrorIllegalArgument"
            
        default:
           return "Error" 
    } 

    },
    unitConversion(item, len) {
      let positive = true;
      if (item == 0) {
        return "0";
      }
      if (item < 0) {
        positive = false;
        item = Math.abs(item);
      }
      let k = 1024;
      let sizes = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
      let c = Math.floor(Math.log(item) / Math.log(k));
      if (c < 0) {
        item = 0;
      } else {
        item = (item / Math.pow(k, c)).toFixed(len) + " " + sizes[c];
      }

      return positive ? item : `-${item}`;
    },
    numberConversion(num, len) {
      if (num == 0) {
        return 0;
      }
      let k = 1000;
      let units = ["", "K", "M", "B"];
      let c = Math.floor(Math.log(num) / Math.log(k));
      num = (num / Math.pow(k, c)).toFixed(len) + " " + units[c];
      return num;
    }
  },
  filters: {
    formatNumber(v) {
      return this.formatNumber(v);
    }
  }
};
export default mixin;
