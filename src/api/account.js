import { fetch } from "./fetch";
/*
param:{
  begindex number
  count number
  miners string[]
}
*/
export function getBlocksByMiner(data) {
  return fetch({
    url: "/tipset/BlockByMiner",
    method: "post",
    data
  });
}

/*
param:{
  begindex number
  count number
}
*/
export function getAccountList(data) {
  return fetch({
    url: "/account/AccountList",
    method: "post",
    data
  });
}

/*
param:{
  actor_id string
}
*/
// ?miner=t012999
export function getActorById(params) {
  return fetch({
    url: "/MinerInfo",
    method: "get",
    params
  });
}
