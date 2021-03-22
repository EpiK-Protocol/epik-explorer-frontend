import MinerListCon from "@/views/experts/List";
import MinerDetail from "@/views/experts/Detail";
const route = [
  {
    path: "/experts",
    name: "experts",
    component: () =>
      import(/* webpackChunkName: "Message" */ "@/views/experts"),
    redirect: "/experts/list",
    children: [
      {
        path: "list",
        name: "expertsList",
        component: MinerListCon
      },
      {
        path: "detail",
        name: "expertsDetail",
        component: MinerDetail
      }
    ]
  }
];
export default route;
