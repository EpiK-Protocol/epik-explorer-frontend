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
        "Node",
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
      rank: {
        label: "Top Nodes",
        index: "/mining/list"
      },
      experts: {
        label: "Experts",
        index: "/experts/list"
      },
      web: {
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
      t1: 'Registered Nodes',
      t2: 'Staked Nodes',
      t3: 'Active Nodes',
    },
    totalPower: {
      power: "RawBytePower",
      capacity: "QualityAdjPower"
    },
    blockTable: {
      title: "Block",
      // label: ["Height", "Hash", "Blocktime", "Node", "Reward"]
      label: ["Height", "Hash", "BlockTime", "Node", "GasReward", "BlockReward"]
    },
    rankType: ['Top Power', 'Real-time Reward', '24h Reward', '7d Reward', '30d Reward'],
    minerTable: {
      title: "Node",
      // "Rewards",
      label: ["Rank", "Node", "Tag", "QualityAdjPower", "RawBytePower", "Blocks", "Last Block Tipset"]
    },
    certification: 'Verify',
    profitTable: {
      title: "Profit",
      label: ["Rank", "Coinbase", "Tag", "Address", "Profit", "WinBlocks"]
    },
    expertTable: {
      title: "Expert",
      // "ApplicationHash", 
      label: ["ID", "VoteAmount", "FileSize（GB）", "FileCount", "Reward", "Status"]
    },
    messageTable: {
      title: "Message",
      // label: ["Message ID", "Time", "From", "To", "Value"]
      label: ["Cid", "From", "To", "Value"]
    },
    board: {
      base: {
        title: 'Basic Data',
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
          label: "Total AIEPK",
        },
        CirculationEPK: {
          label: "Circulation AIEPK",
        },
        EPK_USDTPrice: {
          label: "AIEPK Price（USDT）",
        }

      },
      miner: {
        title: 'Node Data',
        TotalMiners: {
          label: "Total Nodes",
        },
        PledgedMiners: {
          label: "Pledged Nodes",
        },
        ActiveMiners: {
          label: "Active Nodes",
        },
        TotalPower: {
          label: "Network Storage Power",
        },
        TopMinerPower: {
          label: "Top Node Power",
        },
        MinerMinWinPower: {
          label: "Node MinWinPower",
        },
        TotalMinerPledged: {
          label: "Total Node Pledged（AIEPK）",
        },
        TotalRetrievalPledged: {
          label: "Total Retrieval Pledged（AIEPK）",
        },
        TotalPledged: {
          label: "Total Pledged（AIEPK）",
        },
        TotalMiningReward: {
          label: "Total Storage Reward（AIEPK）",
        },
        TotalRetrievalReward: {
          label: "Total Retrieval Reward（AIEPK）",
        },
        DataFlowPerEPK: {
          label: "Data Flow Per AIEPK",
        },

      },
      expert: {
        title: 'Knowledge Data',
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
          label: "Top Expert Vote",
        },
        TotalDataSize: {
          label: "Total Data Size",
        },
        TotalExpertReward: {
          label: "Total Expert Reward（AIEPK）",
        },
        TotalCrowdsourcingReward: {
          label: "Total Crowdsourcing Reward（AIEPK）",
        },
        TotalVoteReward: {
          label: "Total Vote Reward（AIEPK）",
        },
        AnnualizedRate: {
          label: "Vote APY",
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
        title: "Active Storage Nodes",
        count: "Node Count"
      },
      provenPower: {
        title: "Evolution of Top Nodes for Nodes For Proven Power"
      },
      minerList: {
        title: "Node List",
        label: [
          "Node",
          "Peer ID",
          "Storage Power",
          "Power %",
          "Blocks Mined",
          "% of Blocks Mined"
        ],
        detail: ["Peer ID", "IP", "Location"],
        placeholder: "Search by Node Address/Peer ID"
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
      label: ["Peer ID", "Node Address", "IP", "Location"]
    }
  },
  coinbase:{
    total:'Total balance',
    vested:'Unlocked',
    vesting:'Locking',
    column: [ "Node", "Tag", "QualityAdjPower", "RawBytePower", "Blocks", "Last Block Tipset"]

  },
  address: {
    balance:"Balance",
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
    overview: ['Node Overview', 'Total Balance', 'Power Glance', 'QualityAdjPower', 'Power Rate', 'RawBytePower', 'Total Blocks', 'Total Reward', 'Sector Size'],
    account: ['Account Overview', 'Actor', 'Owner', 'Peer ID', 'Type', 'StorageMiner', 'Worker', 'Region(Public IP)', 'unknown (unknown)', 'Address', 'Controller']


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
        // "Fee",
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
        "Node",
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
    mining: "Storage",
    metrics: "Metrics",
    map: "Peer Map",
    peer: "Peer Detail",
    minerList: "Top Nodes",
    expertsList: "Experts"
  },
  chart: {
    blockTime:
      "<div style='margin-bottom:5px'>Avg Block Time: {value}s</div><div>Time: {name}</div>",
    // blockSize:
    //   "<div style='margin-bottom:5px'>Avg BlockHeader Size: {value}bytes</div><div>Time: {name}</div>",
    blockSize: "<div >Total Node: {t1}</div><div>Pledged: {t2}</div><div>Won Node: {t3}</div>",

    totalPower: "<div class='circle2' style='margin-bottom:5px'>Network Power: {qualityPower}</div><div class='circle1' style='margin-bottom:5px'>Power Growth: {rawPower}</div><div>Time: {name}</div>",
    blocksWon: "<div>MinerID: {miner_id}</div><div>Height: {height}</div><div>BlockTime: {block_time}</div><div>BlockHash: {cid}</div>",
    filOutstanding: ["Floating", "Pledge"],
    blockReward: ["# Of Nodes", "Cumulative Block Reward"],
    filecoin: "Block Reward(tEPK)",
    filVested: ["Cumulative tEPK Vested", "tEPK Vested Daily"],
    map:
      "<div style='margin-bottom:5px'><a href='/#/stats/peer?peer_id={pid}'><span>Peer ID : </span><span>{pid}</span></a></div><div style='margin-bottom:5px'><span>Location : </span><span>{name}</span></div><div><span>IP : </span><span>{ip}</span></div>",
    totalPower1: 'Network Power',
    powerGrowth: 'Power Growth',
    price: 'Price',
    MiningPledge: 'Storage Pledge',
    TotalRewards: 'Lock Rewards'

  },
  banner: {
    t1: "Building an Everlasting Knowledge Vault",
    t2: "Broaden AI's Horizons",
    t3: 'EpiK Protocol is a decentralized trusted knowledge graph collaboration platform<br/> of the People, by the People, for the People.',
    m_t3: 'EpiK Protocol is a decentralized trusted knowledge graph collaboration platform of the People, by the People, for the People.',
    t4: 'It is an epic sermon of carbon-based to silicon-based life that will last at least 50 years.',
    m_t4: 'It is be an epic sermon of carbon-based to silicon-based life that will last at least 50 years.'
  },
  verify: {
    title: 'Signature verification',
    t1: 'Address',
    t2: 'Account name',
    t3: 'Signature code',
    t4: 'Signature',
    t5: 'Please copy the above code, sign in the epik miner, and paste the signature here',
    t6: 'OK',
    t7: 'Value cannot be empty'
  }
};
export default en;
