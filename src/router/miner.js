import MinerListCon from "@/views/miner/List";
import MinerDetail from "@/views/miner/Detail";
const route = [
  {
    path: "/mining",
    name: "mining",
    component: () =>
      import(/* webpackChunkName: "Message" */ "@/views/miner"),
    redirect: "/mining/list",
    children: [
      {
        path: "list",
        name: "minerList",
        component: MinerListCon
      },
      {
        path: "detail",
        name: "minerDetail",
        component: MinerDetail
      }
    ]
  }
];
export default route;
