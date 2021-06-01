const en = {
  component: {
    mesList: {
      label: [
        // "Type",
        "Msg ID",
        // "Height",
        "Time",
        "From",
        "To",
        "Value",
        "Receipt",
        "Actor",
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
    title: "EPIK EXPLORER",
    tab: ["Home", "Tipset", "Stats"],
    placeholder: "Search by Address/Msg ID/BlockHash",
    filter: [
      //     {
      //     label: "筛选类型",
      //     value: 0
      // },
      {
        label: "All filters",
        value: 0
      },
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
            label: "View Latest Messages",
            index: "/message/list"
          },
          // {
          //   label: "View All Accounts",
          //   index: "/address/list"
          // }
        ]
      },
      rank:{
        label: "Top Miners",
        index: "/mining/list"
      },
      experts:{
          label: "Experts",
          index: "/experts/list"
      },
      web:{
          label: "EPIK",
          index: "https://www.epik-protocol.io/"
      },
      // stats: {
      //   label: "Stats",
      //   index: "Stats",
      //   items: [
      //     {
      //       label: "Mining",
      //       index: "/stats/mining"
      //     },
      //     {
      //       label: "Token Metrics",
      //       index: "/stats/metrics"
      //     },
      //     {
      //       label: "Peer Map",
      //       index: "/stats/map"
      //     }
      //   ]
      // }
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
      t1: 'Registered Miners',
      t2: 'Staked Miners',
      t3: 'Active Miners',
    },
    totalPower: {
      power: "RawBytePower",
      capacity: "QualityAdjPower"
    },
    blockTable: {
      title: "Block",
      // label: ["Height", "Hash", "Blocktime", "Miner", "Reward"]
      label: ["Height", "Hash", "BlockTime", "Miner", "GasReward", "BlockReward"]
    },
    rankType:['Top Power','Real-time Reward','24h Reward','7d Reward','30d Reward'],
    minerTable: {
      title: "Miner",
      // "Rewards",
      label: ["Rank", "Miner", "Tag", "QualityAdjPower", "RawBytePower", "Blocks",  "Last Block Tipset"]
    },
    profitTable: {
      title: "Profit",
      label: ["Rank", "Coinbase", "Address", "Profit", "WinBlocks"]
  },
    expertTable: {
      title: "Expert",
      label: ["ID", "VoteAmount", "ApplicationHash", "FileSize（GB）", "FileCount", "Reward", "Status"]
    },
    messageTable: {
      title: "Message",
      // label: ["Message ID", "Time", "From", "To", "Value"]
      label: ["Cid", "From", "To", "Value"]
    },
    board: {
      base: {
        Height: {
          label: "Block Height",
        },
        AvgTipSetTime: {
          label: "Avg. Blocktime（s）",
        },
        TotalBlocks: {
          label: "Total Blocks",
        },
        TotalEPK: {
          label: "Total EPK",
        },
        CirculationEPK: {
          label: "Circulation EPK",
        },
        EPK_USDTPrice: {
          label: "EPKPrice（USDT）",
        }

      },
      miner: {
        TotalMiners: {
          label: "Total Miners",
        },
        PledgedMiners: {
          label: "Pledged Miners",
        },
        ActiveMiners: {
          label: "Active Miners",
        },
        TotalPower: {
          label: "Network Storage Power",
        },
        TopMinerPower: {
          label: "TopMinerPower",
        },
        MinerMinWinPower: {
          label: "MinerMinWinPower",
        },
        TotalMinerPledged: {
          label: "TotalMinerPledged（EPK）",
        },
        TotalRetrievalPledged: {
          label: "TotalRetrievalPledged（EPK）",
        },
        TotalPledged: {
          label: "TotalPledged（EPK）",
        },
        TotalMiningReward: {
          label: "TotalMiningReward（EPK）",
        },
        TotalRetrievalReward: {
          label: "TotalRetrievalReward（EPK）",
        },
        DataFlowPerEPK: {
          label: "DataFlowPerEPK",
        },

      },
      expert: {
        TotalExperts: {
          label: "Total Experts",
        },
        ActiveExperts: {
          label: "Active Experts",
        },
        TotalVote: {
          label: "Total Vote",
        },
        AvgVote: {
          label: "Avg.Vote",
        },
        TopExpertVote: {
          label: "TopExpertVote",
        },
        TotalDataSize: {
          label: "TotalDataSize",
        },
        TotalExpertReward: {
          label: "TotalExpertReward（EPK）",
        },
        TotalCrowdsourcingReward: {
          label: "TotalCrowdsourcingReward（EPK）",
        },
        TotalVoteReward: {
          label: "TotalVoteReward（EPK）",
        },
        AnnualizedRate: {
          label: "AnnualizedRate",
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
      overview: ["Address", "Balance", "RawBytePower", "QualityAdjPower", "Peer Id", "Sector Size"],
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
    radio: ["Message", "Blocks Mined"],
    overview:['Miner Overview','Total Balance','Power Glance','QualityAdjPower','Power Rate','RawBytePower','Total Blocks','Total Reward','Sector Size'],
    account:['Account Overview','Actor','Owner','Peer ID','Type','StorageMiner','Worker','Region(Public IP)','unknown (unknown)','Address','Controller']


  },
  message: {
    detail: {
      titl: "Msg ID",
      overview: [
        // "Msg ID",
        // "Height",
        // "Block",
        "Time",
        "From",
        "To",
        "Value",
        "Receipt",
        "Fee",
        "Method",
        "Actor",
        "Nonce",
        "GasLimit",
        "GasUsed",
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
    peer: "Peer Detail",
    minerList:"Top Miners",
    expertsList: "Experts"
  },
  chart: {
    blockTime:
      "<div style='margin-bottom:5px'>Avg Block Time: {value}s</div><div>Time: {name}</div>",
    // blockSize:
    //   "<div style='margin-bottom:5px'>Avg BlockHeader Size: {value}bytes</div><div>Time: {name}</div>",
    blockSize: "<div >Total Miner: {t1}</div><div>Pledged: {t2}</div><div>Won Miner: {t3}</div>",

    totalPower: "<div class='circle2' style='margin-bottom:5px'>Network Power: {qualityPower}</div><div class='circle1' style='margin-bottom:5px'>Power Grouth: {rawPower}</div><div>Time: {name}</div>",
    blocksWon: "<div>MinerID: {miner_id}</div><div>Height: {height}</div><div>BlockTime: {block_time}</div><div>BlockHash: {cid}</div>",
    filOutstanding: ["Floating", "Pledge"],
    blockReward: ["# Of Miners", "Cumulative Block Reward"],
    filecoin: "Block Reward(tEPK)",
    filVested: ["Cumulative tEPK Vested", "tEPK Vested Daily"],
    map:
      "<div style='margin-bottom:5px'><a href='/#/stats/peer?peer_id={pid}'><span>Peer ID : </span><span>{pid}</span></a></div><div style='margin-bottom:5px'><span>Location : </span><span>{name}</span></div><div><span>IP : </span><span>{ip}</span></div>",
    totalPower1:'Network Power',
    powerGrouth:'Power Grouth',
    price: 'Price',
    MiningPledge:'Mining Pledge',
    TotalRewards:'Lock Rewards'

  },
  banner: {
    t1: "Building an Everlasting Knowledge Vault",
    t2: "Broaden AI's Horizons",
    t3: 'EpiK Protocol is a decentralized trusted knowledge graph collaboration platform<br/> of the People, by the People, for the People.',
    m_t3: 'EpiK Protocol is a decentralized trusted knowledge graph collaboration platform of the People, by the People, for the People.',
    t4: 'It is an epic sermon of carbon-based to silicon-based life that will last at least 50 years.',
    m_t4: 'It is be an epic sermon of carbon-based to silicon-based life that will last at least 50 years.'
},
};
export default en;
