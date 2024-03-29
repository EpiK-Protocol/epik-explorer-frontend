import { fetch } from "./fetch";
/*
param:{
  count number
  end_height number
}
*/
export function getTipset(params) {

  return fetch({
    url: "tipsets",
    method: "get",
    params
  });
}
/*
param:{
  height number
}
*/
export function getBlockByHeight(data) {
  return fetch({
    url: "tipset/BlockByHeight",
    method: "post",
    data
  });
}
/*
param:{
  cid number
}
*/
// 9.8
// export function getBlockByCid(data) {
//   return fetch({
//     url: "tipset/BlockByCid",
//     method: "post",
//     data
//   });
// }

export function getBlockByCid(data) {
  return fetch({
    url: "Search",
    method: "get",
    params:data
  });
}
