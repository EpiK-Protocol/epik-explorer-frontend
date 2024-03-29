import List from "@/views/address/List";
import Detail from "@/views/address/Detail";
const route = [
  {
    path: "/address",
    name: "address",
    component: () =>
      import(/* webpackChunkName: "Address" */ "@/views/address"),
    redirect: "/address/list",
    children: [
      {
        path: "list",
        name: "addressList",
        component: List
      },
      {
        path: "detail",
        name: "addressDetail",
        component: Detail,
        meta: {
          name: "Address Detail"
        }
      },
      {
        path: "coinbase",
        name: "addressCoinbase",
        component: ()=>import("@/views/address/Coinbase"),
        meta: {
          name: "Coinbase"
        }
      }
    ]
  }
];
export default route;
