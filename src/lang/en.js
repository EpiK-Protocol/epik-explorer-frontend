const en = {
  component: {
    mesList: {
      label: [
        // "Type",
        "Msg ID",
        // "Height",
        // "Time",
        "From",
        "To",
        "Value",
        // "Receipt",
        // "Fee",
        "Method"
      ],
      total: "Total of <i>{total}</i> Messages",
      method: [
        { label: "All", value: "" },
        { label: "0", value: "0" },
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
        { label: "5", value: "5" }
      ],
      placeholder: "Method"
    },
    blockList: {
      label: [
        "Height",
        "Block Hash",
        "Time",
        "Messages",
        "BlockSize",
        "Miner",
        "Reward"
      ],
      total: "Total of <i>{total}</i> Blocks(<i>{fil}</i>tEPK)",
      height: "Tipset Height # {height}"
    }
  },
  header: {
    title: "EpiK Explorer",
    tab: ["Home", "Tipset", "Stats"],
    placeholder: "Search by Address/Msg ID/BlockHash",
    filter: [
      //     {
      //     label: "筛选类型",
      //     value: 0
      // },
      {
          label: "Address",
          value: "address"
      },
      {
          label: "Msg ID",
          value: "message"
      },
      // {
      //     label: "高度",
      //     value: 3
      // },
      {
          label: "BlockHash",
          value: "block"
      },
      // {
      //     label: "节点ID",
      //     value: 5
      // }
  ],
    // filter: [
    //   {
    //     label: "All filters",
    //     value: 0
    //   },
    //   {
    //     label: "Address",
    //     value: 1
    //   },
    //   {
    //     label: "Message ID",
    //     value: 2
    //   },
    //   {
    //     label: "Height",
    //     value: 3
    //   },
    //   {
    //     label: "Block Hash",
    //     value: 4
    //   },
    //   {
    //     label: "Peer ID",
    //     value: 5
    //   }
    // ],
    nav: {
      home: {
        label: "Home",
        index: "/"
      },
      tipset: {
        label: "Tipset",
        index: "tipset",
        items: [
          {
            label: "Tipset",
            index: "/tipset"
          },
          {
            label: "View All Messages",
            index: "/message"
          },
          {
            label: "View All Accounts",
            index: "/address/list"
          }
        ]
      },
      stats: {
        label: "Stats",
        index: "Stats",
        items: [
          {
            label: "Mining",
            index: "/stats/mining"
          },
          {
            label: "Token Metrics",
            index: "/stats/metrics"
          },
          {
            label: "Peer Map",
            index: "/stats/map"
          }
        ]
      }
    },
    mb: {
      title: "EpiK Search",
      search: "Search"
    }
  },
  footer: {
    peer: "Active Peers {count}",
    nav: [
      {
        label: "Github",
        href: ""
      },
      {
        label: "API",
        href: ""
      },
      {
        label: "Documentation",
        href: ""
      }
    ]
  },
  home: {
    blockTime: {
      label: "Avg. Blocktime",
      min: "Min",
      max: "Max",
      tips: "Avg blocktime in latest 24H"
    },
    blockSize: {
      label: "Avg Blockheader Size",
      size: "{avg} bytes",
      tips: "Avg blockheader size in latest 24H",
      t1:'Registered Miners',
      t2:'Staked Miners',
      t3:'Active Miners',
    },
    totalPower: {
      power: "RawBytePower",
      capacity: "QualityAdjPower"
    },
    blockTable: {
      title: "Block",
      // label: ["Height", "Hash", "Blocktime", "Miner", "Reward"]
      label: ["Height", "Hash", "BlockTime", "Miner", "GasReward","BlockReward"]
    },
    messageTable: {
      title: "Message",
      // label: ["Message ID", "Time", "From", "To", "Value"]
      label: ["Cid", "From", "To", "Value"]
    },
    board: {
      base: {
        Height: {
            label: "区块高度",
        },
        AvgTipSetTime: {
            label: "平均每高度时间",
        },
        TotalBlocks:{
            label: "全网出块数量", 
        },
        TotalEPK:{
            label: "全网代币流通总量（EPK）",  
        },
        CirculationEPK:{
            label: "全网代币上限（EPK）",  
        },
        EPK_USDTPrice:{
            label: "当前代币价格（$）",  
        }

    },
    miner: {
        TotalMiners: {
            label: "完成注册矿工数",
        },
        PledgedMiners: {
            label: "完成抵押矿工数",
        },
        ActiveMiners:{
            label: "当前活跃矿工数", 
        },
        TotalPower:{
            label: "全网有效算力",  
        },
        TopMinerPower:{
            label: "矿工最高算力",  
        },
        MinerMinWinPower:{
            label: "最小每日暴块算力",  
        },
        TotalMinerPledged:{
            label: "全网矿工抵押数（EPK）",  
        },
        TotalRetrievalPledged:{
            label: "全网访问抵押数（EPK）",  
        },
        TotalPledged:{
            label: "全网总抵押数（EPK）",  
        },
        TotalMiningReward:{
            label: "累积出块奖金池（EPK）",  
        },
        TotalRetrievalReward:{
            label: "累积带宽奖金池（EPK）",  
        },
        DataFlowPerEPK:{
            label: "单位抵押代币每日可访问流量 （10 MB）",  
        },
        
    },
    expert: {
        TotalExperts: {
            label: "完成注册专家数",
        },
        ActiveExperts: {
            label: "当前活跃专家数",
        },
        TotalVote:{
            label: "全网专家选票数", 
        },
        AvgVote:{
            label: "平均专家选票数",  
        },
        TopExpertVote:{
            label: "专家最高票数",  
        },
        TotalDataSize:{
            label: "全网有效数据量（GB）",  
        },
        TotalExpertReward:{
            label: "累积专家奖金池（EPK）",  
        },
        TotalCrowdsourcingReward:{
            label: "累积众包奖金池（EPK）",  
        },
        TotalVoteReward:{
            label: "累积投票奖金池（EPK）",  
        },
        AnnualizedRate:{
            label: "投票年化收益率",  
        }

    },
      height: {
        label: "Block Height",
        tips: "The Latest Block Height"
      },
      reward: {
        label: "Reward Per Vote",
        tips: "The Latest Reward Per Vote"
      },
      blockTime: {
        label: "Last BlockTime",
        tips: "Time since a miner last created a block"
      },
      avgMsgTipset: {
        label: "Avg. Number of Msg",
        tips: "Avg Number of Messages per Block Height"
      },
      avgGas: {
        label: "Avg. Gas Fee",
        tips: "Avg Gas Fee over the Last 24h"
      },
      avgMsg: {
        label: "Avg. Msg Size",
        tips: "Avg Message Size of Total Network"
      },
      pledge: {
        label: "Token Staked",
        tips: "Total Fil in Token Staked"
      },
      number: {
        label: "Blocks In Tipset",
        tips:
          "Number of blocks in the current best tipset. A tipset is a set of blocks at the same height that share the same parent set"
      },
      size: {
        label: "Block Size",
        tips: "The Latest Block Size"
      },

      power: {
        label: "Total Power",
        tips: "Total Storage Power"
      },

      avgBlockTime: {
        label: "Avg. BlockTime",
        tips: ""
      },
      avgBlockSize: {
        label: "Avg Blcokheader Size",
        tips: "Avg Blockheader Size of Total Block"
      }
    },
    filType: {
      floating: "Floating ",
      pledge: "Pledge Collateral",
      outstanding: "Outstanding"
    }
  },
  stats: {
    mining: {
      activeMiner: {
        title: "Active Storage Miners",
        count: "Miner Count"
      },
      provenPower: {
        title: "Evolution of Top Miners for Miners For Proven Power"
      },
      minerList: {
        title: "Miner List",
        label: [
          "Miner",
          "Peer ID",
          "Storage Power",
          "Power %",
          "Blocks Mined",
          "% of Blocks Mined"
        ],
        detail: ["Peer ID", "IP", "Location"],
        placeholder: "Search by Miner Address/Peer ID"
      }
    },
    metrics: {
      blockReward: {
        title: "Cumulative Block Rewards"
      },
      filecoin: {
        title: "EpiK Network Block Reward Curve"
      },
      filVested: {
        title: "tEPK Vested"
      }
    },
    peer: {
      title: "Peer ID:",
      label: ["Peer ID", "Miner Address", "IP", "Location"]
    }
  },
  address: {
    list: {
      label: ["Address", "Type", "Balance", "Messages"],
      total: "Total of <i>{num}</i> Accounts Found ({filNum}tEPK)"
    },
    detail: {
      // overview: ["Address", "Type", "Balance", "Code Cid", "Nonce"],
      overview: ["Address", "Balance", "RawBytePower", "QualityAdjPower" ,"Peer Id","Sector Size"],
      worker: "Worker List",
      ownerOverview: [
        "Owner Account",
        "Peer ID",
        "Power",
        "Sector Size",
        "Sector Number",
        "Proving Sector Number",
        "Fault Number"
      ]
    },
    type: {
      account: "Account",
      owner: "Account(Owner)",
      wallet: "Account",
      miner: "StorageMiner",
      actor: "Account"
    },
    radio: ["Message", "Blocks Mined"]
  },
  message: {
    detail: {
      overview: [
        "Msg ID",
        // "Height",
        // "Block",
        // "Time",
        "From",
        "To",
        "Value",
        // "Receipt",
        //"Fee",
        "Method",
        "Nonce",
        "Params"
      ],
      paramTip: "Raw data in Base64",
      confirm: "Confirmations"
    }
  },
  tipset: {
    height: "Height",
    block: {
      overview: [
        "Hash",
        "Height",
        "TimeStamp",
        // "Block Size",
        "Messages",
        "Miner",
        // "Reward",
        "Parent Hash",
        "Parent Weight",
        "Ticket",
        "State Root"
      ]
    },
    blockType: ["Null Block", "Min Ticket Block", "Other Block"]
  },
  noResult: {
    res: "Search Not Found",
    404: "Page Not Found",
    key: "Oops!The search string you enterd was:",
    invalid: "Sorry! This is an invalid search string",
    back: "Back Home"
  },
  routeName: {
    blockDetail: "Block Detail",
    messageDetail: "Message Detail",
    addressDetail: "Address Detail",
    messageList: "View All Messages",
    addressList: "View All Accounts",
    tipset: "Tipset",
    mining: "Mining",
    metrics: "Metrics",
    map: "Peer Map",
    peer: "Peer Detail"
  },
  chart: {
    blockTime:
      "<div style='margin-bottom:5px'>Avg Block Time: {value}s</div><div>Time: {name}</div>",
    // blockSize:
    //   "<div style='margin-bottom:5px'>Avg BlockHeader Size: {value}bytes</div><div>Time: {name}</div>",
    blockSize: "<div >Total Miner: {t1}</div><div>Pledged: {t2}</div><div>Won Miner: {t3}</div>",

    totalPower:
      "<div style='margin-bottom:5px'>Total Power: {value}</div><div>Time: {name}</div>",
      blocksWon: "<div>MinerID: {miner_id}</div><div>Height: {height}</div><div>BlockTime: {block_time}</div><div>BlockHash: {cid}</div>",
    filOutstanding: ["Floating", "Pledge"],
    blockReward: ["# Of Miners", "Cumulative Block Reward"],
    filecoin: "Block Reward(tEPK)",
    filVested: ["Cumulative tEPK Vested", "tEPK Vested Daily"],
    map:
      "<div style='margin-bottom:5px'><a href='/#/stats/peer?peer_id={pid}'><span>Peer ID : </span><span>{pid}</span></a></div><div style='margin-bottom:5px'><span>Location : </span><span>{name}</span></div><div><span>IP : </span><span>{ip}</span></div>"
  }
};
export default en;
