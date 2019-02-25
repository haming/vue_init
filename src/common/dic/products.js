var products = {
    getName: function (order_type) {
        for (var i = 0; i < this.products.length; i++) {
            var item = this.products[i];
            if (item.order_type == order_type) {
                return item.value;
            }
        }
    },
    products: [
        {
            key: "pension", value: '招商信诺心意保一年期重大疾病保险', order_type: 801, riskCode: 'PNSD002', products_texts: [
                {
                    key: "pension", value: '保障全面：45类常见的重大疾病', order_type: 801, riskCode: 'PNSD002'
                },
                {
                    key: "pension", value: '一笔赔付：赔付看病两不误，不为就诊添负担', order_type: 801, riskCode: 'PNSD002'
                },
                {
                    key: "pension", value: '价格实惠：每天不到2元钱，入门保障轻松享', order_type: 801, riskCode: 'PNSD002'
                },
            ]
        },


        {
            key: "pension", value: '招商信诺心意保一年期意外伤害保险', order_type: 603, riskCode: 'PNSA024', products_texts: [

                {
                    key: "pension", value: '身故伤残 保障兼顾', order_type: 603, riskCode: 'PNSA024'
                },
                {
                    key: "pension", value: '防患未然 全年安心', order_type: 603, riskCode: 'PNSA024'
                },
                {
                    key: "pension", value: '价格实惠 自在掌握', order_type: 603, riskCode: 'PNSA024'
                },

            ]
        },
        {
            key: "pension", value: '招商信诺心意保一年期定期寿险', order_type: 605, riskCode: 'PNST002', products_texts: [

                {
                    key: "pension", value: '疾病身故、意外身故均涵盖', order_type: 605, riskCode: 'PNST002'
                },
                {
                    key: "pension", value: '一次性给付，补偿家中经济来源', order_type: 605, riskCode: 'PNST002'
                },
                {
                    key: "pension", value: '小资金撬动大保障，交费灵活自在掌握', order_type: 605, riskCode: 'PNST002'
                },
            ]
        },
        {
            key: "pension", value: '招商信诺安康万家重大疾病保险产品计划', order_type: 701, riskCode: ['PMLD007', 'QMLD018'], products_texts: [

                {
                    key: "pension", value: '覆盖疾病高达160种', order_type: 701,
                },
                {
                    key: "pension", value: '可附加特定恶性肿瘤责任升级保障', order_type: 701,
                },
                {
                    key: "pension", value: '0-60周岁员工、配偶、子女、双方父母均可参保', order_type: 701,
                },
                {
                    key: "pension", value: '出生满28天-7周岁的民生银行员工子女专属', order_type: 701,
                },
            ]
        }

    ],

};
module.exports = products;
