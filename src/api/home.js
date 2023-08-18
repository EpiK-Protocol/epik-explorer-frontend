import { fetch } from "./fetch";
export function getLatestBlock() {
  return fetch({
    method: "get",
    // url: "LatestBlock",
    url: 'tipsets?from=&size=20',
    // data: {
    //   num
    // }
  });
}
export function getTopMiner() {
  return fetch({
    method: "get",
    // url: "LatestBlock",
    url: 'topMiners',
    // data: {
    //   num
    // }
  });
}
export function getMiner(params) {
  return fetch({
    method: "get",
    url: 'miners',
    params
  });
}
export function coinbaseRankRuntime(params) {
  return fetch({
    method: "get",
    url: 'coinbaseRankRuntime',
    params
  });
}
export function coinbaseRank24H(params) {
  return fetch({
    method: "get",
    url: 'coinbaseRank24H',
    params
  });
}
export function coinbaseRank7D(params) {
  return fetch({
    method: "get",
    url: 'coinbaseRank7D',
    params
  });
}
export function coinbaseRank30D(params) {
  return fetch({
    method: "get",
    url: 'coinbaseRank30D',
    params
  });
}
export function getExperts(params) {
  return fetch({
    method: "get",
    // url: "LatestBlock",
    url: 'experts',
    params
  });
}
export function getLatestMessage() {
  return fetch({
    method: "get",
    url: "/latestMessages",
    // data: {
    //   num
    // }
  });
}
export function getBoardInfo() {
  return fetch({
    method: "get",
    url: "baseInfomation"
  });
}
/*
param:{
  start_time timestamp
  end_time timestamp
}
*/
export function getBlockTimeData(data) {
  return fetch({
    method: "post",
    url: "BlocktimeGraphical",
    data
  });
}
/*
param:{
  start_time timestamp
  end_time timestamp
}
*/
export function getBlocSizeData(data) {
  return fetch({
    method: "post",
    url: "AvgBlockheaderSizeGraphical",
    data
  });
}

export function getMinerStatus(data) {
  return fetch({
    method: "get",
    url: "minerGraph",
    data
  });
}
/*
param:{
  time timestamp
}
*/
export function getTotalPowerData(data) {
  return fetch({
    method: "get",
    url: "/powerGraph",
    data
  });
}
export function getKLineData(data) {
  return fetch({
    method: "get",
    url: "/kline?symbol=AIEPK_USDT&interval=1h",
    data
  });
}
/*
param:{
  key string
  filter number
}
*/
// export function search(data) {
//   return fetch({
//     method: "post",
//     url: "SearchIndex",
//     data
//   });
// }

// {
//   "type":"address/message/block",
//   "word":""
// }
// height size
export function getMessagesById(data) {
  return fetch({
    method: "get",
    url: "messages",
    params:data
  });
}

export function search(data) {
  return fetch({
    method: "get",
    url: "search",
    params:data
  });
}

export function getActivePeerCount() {
  return fetch({
    method: "post",
    url: "/peer/ActivePeerCount"
  });
}

