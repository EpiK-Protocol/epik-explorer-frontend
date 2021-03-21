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
export function getLatestMessage(num) {
  return fetch({
    method: "post",
    url: "LatestMsg",
    data: {
      num
    }
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
    url: "/epkKline",
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
export function search(data) {
  return fetch({
    method: "get",
    url: "Search",
    params:data
  });
}

export function getActivePeerCount() {
  return fetch({
    method: "post",
    url: "/peer/ActivePeerCount"
  });
}
