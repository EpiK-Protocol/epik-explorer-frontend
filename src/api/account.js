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
    url: "/miner",
    method: "get",
    params
  });
}
export function getAddress(params) {
  return fetch({
    url: "/address",
    method: "get",
    params
  });
}
export function getCoinbase(params) {
  return fetch({
    url: "/coinbase",
    method: "get",
    params
  });
}

// POST {{HOST}}/signUserTag
// Content-Type: application/json

// {
//     "address":"",
//     "signature":"",
//     "user_tag":""
// }
// ###
export function signUserTag(data) {
  return fetch({
    method: "post",
    url: "/signUserTag",
    data
  });
}
