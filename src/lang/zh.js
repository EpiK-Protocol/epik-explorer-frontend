const zh = {
    component: {

        mesList: {
            // label: ["类型", "消息ID", "区块高度", "块龄", "发送地址", "接收地址", "数额", "收据", "方法"],
            label: ["消息ID", "时间", "发送地址", "接收地址", "数额", "收据", "Actor", "方法"],
            total: "总计<i> {total} </i>消息 {extra}",
            method: {
                ChangePeerID: "变更节点编号",
                ChangeWorkerAddress: "变更矿工地址",
                ControlAddresses: "地址管理",
                PreCommitSector: "数据预提交",
                ProveCommitSector: "数据提交证明",
                SubmitWindowedPoSt: "提交时空证明",
                Transfer: "转账"
            },
            placeholder: "方法",
            tips: "(仅展示近一周内的消息)",
            receipt: ["成功", "失败", "确认中"]
        },
        blockList: {
            label: ["高度", "区块哈希", "块龄", "消息", "区块大小", "矿工", "奖励"],
            total: "总计<i>{total}</i> 区块(<i>{fil}</i>tEPK)",
            height: "区块高度 # {height}"
        },
        timeSelector: [{
            value: "24h",
            label: "24小时"
        },
        {
            value: "1w",
            label: "1周"
        },
        {
            value: "1m",
            label: "1月"
        },
        {
            value: "1y",
            label: "1年"
        },
        {
            value: "all",
            label: "全部"
        }],
        more: "更多"
    },

    header: {
        title: "EPIK EXPLORER",
        tab: ["首页", "Tipset", "统计数据"],
        placeholder: "请输入地址/消息ID/区块哈希",
        //     filter: [
        //         {
        //         label: "筛选类型",
        //         value: 0
        //     },
        //     {
        //         label: "地址",
        //         value: 1
        //     },
        //     {
        //         label: "消息ID",
        //         value: 2
        //     },
        //     {
        //         label: "高度",
        //         value: 3
        //     },
        //     {
        //         label: "区块哈希",
        //         value: 4
        //     },
        //     {
        //         label: "节点ID",
        //         value: 5
        //     }
        // ],
        filter: [
            {
                label: "全部筛选",
                value: 0
            },
            {
                label: "地址",
                value: "address"
            },
            {
                label: "消息ID",
                value: "message"
            },
            // {
            //     label: "高度",
            //     value: 3
            // },
            {
                label: "区块哈希",
                value: "block"
            },
            // {
            //     label: "节点ID",
            //     value: 5
            // }
        ],

        nav: {
            home: {
                label: "首页",
                index: "/"
            },
            tipset: {
                label: "区块链",
                index: "block",
                items: [
                    {
                        label: "查看区块",
                        index: "/tipset"
                    },


                    {
                        label: "查看最新消息",
                        index: "/message/list"
                    },
                    // {
                    //     label: "查看全部账户",
                    //     index: "/address/list"
                    // }
                ]
            },
            rank: {
                label: "矿工排行",
                index: "/mining/list"
            },
            experts: {
                label: "领域专家",
                index: "/experts/list"
            },
            web: {
                label: "EPIK",
                index: "https://www.epik-protocol.io/"
            },

            // stats: {
            //     label: "数据",
            //     index: "Stats",
            //     items: [{
            //         label: "挖矿数据",
            //         index: "/stats/mining"
            //     },
            //     {
            //         label: "代币指标",
            //         index: "/stats/metrics"
            //     },
            //     {
            //         label: "节点地图",
            //         index: "/stats/map"
            //     }]
            // }
        },
        mb: {
            title: "EpiK 搜索",
            search: "Search"
        }
    },
    footer: {
        peer: "活跃矿工 {count}",
        mobile: [{
            label: "Filecoin官网",
            href: " https://filecoin.io"
        },
        {
            label: "测试网水龙头",
            href: "https://faucet.testnet.filecoin.io/"
        },
        {
            label: "lotus文档",
            href: "https://lotu.sh/"
        },
        {
            label: "测试网说明",
            href: " https://testnet.filecoin.io/"
        }],
        links: [{
            title: "加入Filecoin社区",
            items: [{
                label: "在GitHub上参与我们",
                class: "icon-github",
                href: "https://github.com/filecoin-project"
            },
            {
                label: "加入讨论",
                class: "icon-forum",
                href: "https://discuss.filecoin.io/"
            },
            {
                label: "Slack聊天",
                class: "icon-slack",
                href: "https://join.slack.com/t/filecoinproject/shared_invite/enQtNTUwNTI1Mzk5MDYwLTY4YmFjMzRlZjFiNDc0NmI2N2JjMjk5YTAyMDUyODljODg3MGI0ZGRhZTI5ZDNkZTAyNjkyMzI1ODM1YjA1MWI"
            },
            {
                label: "关注微信公众号",
                class: "icon-wechat",
                popover: !0
            },
            {
                label: "Matrix聊天",
                class: "icon-matrix",
                href: "https://riot.im/app/#/group/+filecoin:matrix.org"
            },
            {
                label: "关注推特",
                class: "icon-ttww",
                href: "https://twitter.com/@Filecoin"
            }]
        },
        {
            title: "项目信息",
            items: [{
                label: "Filecoin",
                href: "https://filecoin.io/"
            },
            {
                label: "Testnet水龙头",
                href: "https://faucet.testnet.filecoin.io/"
            },
            {
                label: "协议试验室",
                href: "https://protocol.ai/"
            },
            {
                label: "协议学院",
                href: "https://proto.school/"
            }]
        },
        {
            title: "开发者",
            items: [{
                label: "Filecoin技术说明书",
                href: "https://filecoin-project.github.io/specs/"
            },
            {
                label: "Lotus文档",
                href: "https://lotu.sh/"
            },
            {
                label: "Filscan Github",
                href: "https://github.com/filecoin-shipyard/filscan-frontend"
            }]
        }],
        copyright: '版权所有 © Filecoin开发补助计划，遵循<a href="https://www.mit-license.org/" target="_blank"> MIT </a> 和<a href="https://www.apache.org/licenses/LICENSE-2.0.html" target="_blank"> Apache 2.0 </a>版权协议.'
    },
    home: {
        blockTime: {
            label: "平均出块时间",
            min: "最小",
            max: "最大",
            tips: "近24小时平均出块时间"
        },
        blockSize: {
            label: "平均区块元数据",
            size: "{avg} 字节",
            tips: "近24小时平均区块元数据大小",
            t1: '注册矿工',
            t2: '完成抵押',
            t3: '出块矿工',
        },
        totalPower: {
            power: "原值算力",
            capacity: "有效算力"
        },
        rankType:['算力排行','实时收益','24小时收益','7天收益','30天收益'],


        minerTable: {
            title: "矿工",
            // "累计奖励",
            label: ["排名", "矿工ID", "标签", "有效算力", "原值算力", "出块数", "最后出块高度",]
        },
        profitTable: {
            title: "收益",
            label: ["排名", "Coinbase", "地址", "收益", "出块数"]
        },
        expertTable: {
            title: "领域专家",
            label: ["账户ID", "投票数", "申请表", "有效数据贡献量（GB）", "上传有效数据文件数", "累计奖励", "状态"]

        },
        blockTable: {
            title: "区块",
            // label: ["区块高度", "哈希", "块龄", "矿工", "奖励"]
            label: ["区块高度", "哈希", "块龄", "矿工", "Gas奖励", "出块奖励"]
        },
        messageTable: {
            title: "消息",
            // label: ["最新消息", "块龄", "发送地址", "接收地址", "数额"]
            label: ["Cid", "发送地址", "接收地址", "数额"]
        },
        board: {
            base: {
                Height: {
                    label: "区块高度",
                },
                AvgTipSetTime: {
                    label: "平均每高度时间（s）",
                },
                TotalBlocks: {
                    label: "全网出块数量",
                },
                TotalEPK: {
                    label: "全网代币上限（EPK）",
                },
                CirculationEPK: {
                    label: "全网代币流通总量（EPK）",
                },
                EPK_USDTPrice: {
                    label: "当前代币价格（USDT）",
                }

            },
            miner: {
                TotalMiners: {
                    label: "完成注册矿工数",
                },
                PledgedMiners: {
                    label: "完成抵押矿工数",
                },
                ActiveMiners: {
                    label: "当前活跃矿工数",
                },
                TotalPower: {
                    label: "全网有效算力",
                },
                TopMinerPower: {
                    label: "矿工最高算力",
                },
                MinerMinWinPower: {
                    label: "预估最小每日爆块算力",
                },
                TotalMinerPledged: {
                    label: "全网矿工抵押数（EPK）",
                },
                TotalRetrievalPledged: {
                    label: "全网访问抵押数（EPK）",
                },
                TotalPledged: {
                    label: "全网总抵押数（EPK）",
                },
                TotalMiningReward: {
                    label: "累积出块奖金池（EPK）",
                },
                TotalRetrievalReward: {
                    label: "累积带宽奖金池（EPK）",
                },
                DataFlowPerEPK: {
                    label: "单位抵押代币每日访问流量",
                },

            },
            expert: {
                TotalExperts: {
                    label: "完成注册专家数",
                },
                ActiveExperts: {
                    label: "当前活跃专家数",
                },
                TotalVote: {
                    label: "全网专家选票数",
                },
                AvgVote: {
                    label: "平均专家选票数",
                },
                TopExpertVote: {
                    label: "专家最高票数",
                },
                TotalDataSize: {
                    label: "全网有效数据量",
                },
                TotalExpertReward: {
                    label: "累积专家奖金池（EPK）",
                },
                TotalCrowdsourcingReward: {
                    label: "累积众包奖金池（EPK）",
                },
                TotalVoteReward: {
                    label: "累积投票奖金池（EPK）",
                },
                AnnualizedRate: {
                    label: "投票年化收益率",
                }

            },
            height: {
                label: "区块高度",
                tips: "最新高度"
            },
            reward: {
                label: "每选票奖励",
                tips: "最新高度的每选票奖励。每个高度平均会有5个选票，一个区块中会出现多个选票并获得多份奖励的情况"
            },
            blockTime: {
                label: "最新出块时间",
                tips: "自一个矿工最近创建一个区块以来的时间"
            },
            head: {
                label: "最新出块时间",
                tips: ""
            },
            avgBlocks: {
                label: "平均每高度区块数量",
                tips: "近24小时每高度平均区块数量"
            },
            outstanding: {
                label: "全网可用",
                tips: ""
            },
            pledge: {
                label: "抵押代币",
                tips: "全网抵押担保的代币"
            },
            number: {
                label: "最新集合区块数量",
                tips: "最新集合高度的区块数量。一个集合包含了一组在同一高度拥有同一父块的区块。"
            },
            size: {
                label: "区块大小",
                tips: "最新的区块大小"
            },
            power: {
                label: "全网算力",
                tips: "全网存储算力"
            },
            avgBlockTime: {
                label: "平均出块时间",
                tips: ""
            },
            avgBlockSize: {
                label: "平均区块元数据大小",
                tips: "全网平均区块元数据大小"
            },
            avgMsgTipset: {
                label: "平均消息数量",
                tips: "近24小时每高度的平均消息数量"
            },
            avgGas: {
                label: "平均燃料价格",
                tips: "近24小时的平均燃料价格"
            },
            avgMsg: {
                label: "平均消息大小",
                tips: "近24小时内的平均消息大小"
            },
            floating: {
                label: "流通中",
                tips: ""
            }
        },
        filType: {
            floating: "流通中 ",
            pledge: "全网抵押",
            outstanding: "全网可用"
        },
        topPowerTable: {
            title: "算力排行榜",
            label: ["原值算力", "有效算力", "矿工"]
        },
        topPowerChartLabel: ["原值算力", "有效算力"],
        messageContainer: {
            board: {
                avgMsgTipset: {
                    label: "平均消息数量",
                    tips: "近24小时平均每高度的消息数量"
                },
                avgGas: {
                    label: "平均燃料价格",
                    tips: "近24小时平均燃料价格"
                },
                avgMsg: {
                    label: "平均消息大小",
                    tips: "全网平均消息大小"
                }
            }
        },
        blocksWon: {
            title: "出块",
            tips: "近半小时内的出块情况，区块柱状上的数字代表该区块内的选票数量，缺省值为1"
        }
    },
    stats: {
        mining: {
            activeMiner: {
                title: "活跃矿工",
                count: "矿工数量",
                tips: "近24小时打包数据块的存储矿工"
            },
            provenPower: {
                title: "矿工{power}走势"
            },
            minerList: {
                title: "矿工列表",
                label: ["矿工", "节点ID", "原值算力", "算力占比", "出块数量", "出块占比"],
                detail: ["节点ID", "IP", "位置"],
                placeholder: "请输入矿工地址/节点ID"
            }
        },
        metrics: {
            blockReward: {
                title: "累计区块奖励"
            },
            filecoin: {
                title: "Filecoin区块奖励曲线"
            },
            filVested: {
                title: "tEPK释放"
            }
        },
        peer: {
            title: "节点ID:",
            label: ["节点ID", "矿工地址", "IP", "位置"]
        }
    },
    address: {
        list: {
            label: ["地址", "类型", "余额", "消息数量"],
            total: "共计发现 <i>{num}</i> 账户，总计 ({filNum}tEPK)"
        },
        detail: {
            // overview: ["地址", "类型", "余额", "代码 Cid", "随机数"],
            overview: ["地址", "余额", "原值算力", "有效算力", "节点ID", "扇区大小"],
            worker: "矿工列表",
            ownerOverview: ["所有者账户", "节点ID", "原值算力", "有效算力", "数据块大小", "数据块数量", "证明中的数据块数量", "失败数量"]
        },
        type: {
            account: "一般账户",
            owner: "所有者账户",
            wallet: "一般账户",
            miner: "存储矿工",
            actor: "一般账户"
        },
        radio: ["消息", "出块"],
        overview: ['矿工账户', '账户余额', '算力一览', '有效算力', '算力占比', '原值算力', '总出块数', '总奖励', '扇区大小'],
        account: ['账户总览', '矿工账号', 'Owner', '节点标识', '账户类型', '存储矿工', 'Worker', '地区(公共IP)', '未知 (未知)', '矿工地址', 'Controller'],
        // overview:['Miner Overview','Total Balance','Power Glance','QualityAdjPower','Power Rate']


    },
    message: {
        detail: {
            titl: "消息 ID",
            // overview: ["消息 ID", "高度", "区块", "时间", "发送地址", "接收地址", "数值", "收据", "方法", "随机值", "参数"],
            overview: ["时间", "发送地址", "接收地址", "数值", "收据", "方法","Actor", "随机值", "Gas Limit", "Gas Used", "参数"],

            paramTip: "Base64格式元数据",
            confirm: "确认"
        }
    },
    tipset: {
        height: "高度",
        block: {
            // overview: ["哈希", "高度", "时间戳", "区块大小", "消息", "矿工", "奖励", "父块哈希", "父块重量", "ticket", "State Root"]
            overview: ["哈希", "高度", "时间戳", "消息", "矿工", "父块哈希", "父块重量", "ticket", "State Root"]
        },
        blockType: ["无区块", "最小票值区块", "其它区块"],
        tips: "票值为一个随机数"
    },
    noResult: {
        res: "搜索无结果",
        404: "页面未发现",
        key: "Oops! 您输入的搜索字符:",
        invalid: "对不起！这是一个无效的字符串",
        back: "返回首页"
    },
    routeName: {
        blockDetail: "区块详情",
        messageDetail: "消息详情",
        addressDetail: "地址详情",
        messageList: "查看全部消息",
        addressList: "查看全部账户",
        tipset: "查看区块",
        mining: "矿工",
        metrics: "指标",
        map: "节点地图",
        peer: "节点详情",
        minerList: "矿工排行",
        expertsList: "领域专家"
    },
    chart: {
        blocksWonTitle: "近半小时内未发现区块",
        blockRatio: "出块率",
        ticketRatio: "赢票率",
        blocksWon: "<div>矿工ID: {miner_id}</div><div>高度: {height}</div><div>出块时间: {block_time}</div><div>区块哈希: {cid}</div>",
        blockTime: "<div style='margin-bottom:5px'>平均出块时间: {value}s</div><div>时间: {name}</div>",
        // blockSize: "<div style='margin-bottom:5px'>平均区块元数据大小: {value}字节</div><div>时间: {name}</div>",
        blockSize: "<div>注册矿工: {t1}</div><div>完成抵押: {t2}</div><div>出块矿工: {t3}</div>",
        totalPower: "<div class='circle2' style='margin-bottom:5px'>全网算力: {qualityPower}</div><div class='circle1' style='margin-bottom:5px'>算力增长: {rawPower}</div><div>时间: {name}</div>",
        mesHistory: "<div>消息: {count}</div><div>{time}</div>",
        mesHistoryTitle: "近14天消息历史",
        topPowerTitleText: "矿工{power}排行",
        pledge: "<div>抵押: {pledge} tEPK</div><div>{time}</div>",
        tipset: "<div>矿工ID: {miner}</div><div>高度: {height}</div><div>出块时间: {block_time}</div><div>区块哈希: {cid}</div>",
        filOutstanding: ["流通中", "抵押"],
        blockReward: ["爆块矿工数量", "累计区块奖励(tEPK)"],
        filecoin: "区块奖励(tEPK)",
        filVested: ["累计tEPK释放", "每日释放tEPK"],
        coming: "敬请期待",
        map: "<div style='margin-bottom:5px'><a href='/#/stats/peer?peer_id={pid}'><span>节点ID : </span><span>{pid}</span></a></div><div style='margin-bottom:5px'><span>位置 : </span><span>{name}</span></div><div><span>IP : </span><span>{ip}</span></div>",
        totalPower1: '全网算力',
        powerGrouth: '算力增长',
        price: '价格',
        MiningPledge: '挖矿质押',
        TotalRewards: '锁仓奖励'


    },
    banner: {
        t1: "构建人类永恒知识库",
        t2: '开阔 AI 的认知',
        t3: '铭识协议是一个去中心化的共建共享共益的安全可信知识图谱协作平台，<br/>赋能认知智能新基建。',
        m_t3: '铭识协议是一个去中心化的共建共享共益的<br/>安全可信知识图谱协作平台，赋能认知智能新基建。',
        t4: '这是一场至少持续50年的从碳基生命到硅基生命的史诗级布道',
        m_t4: '这是一场至少持续50年的<br/>从碳基生命到硅基生命的史诗级布道'
    },
};
export default zh;
