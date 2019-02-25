var interfaces = require('../repository/ajax');
var checkValid = require('./CheckValid');
var validateService = require('./ValidateService');
var config = require('../repository/config');
var inputFilter = require('./inputFilter');
var validate = require('./3-validate');
var base64 = require('./base64');
var calculateDate = require('./CalculateDate');
var centralService = {
    interfaces: interfaces,
    localStorage: window.localStorage,
    checkValid: checkValid,
    config: config,
    inputFilter: inputFilter,
    validate: validate,
    validateService: validateService,
    calculateDate: calculateDate,
    base64: base64,
    //获取默认值
    getDefaultDataService: function (urlParams) { //获取默认值设置的服务
        var that = this;
        var deferred = $.Deferred();
        var data = {
                statusCode: 1,
                msg: "",
                data: {
                    singleProduct: false,//是否单产品项目
                    candidateArrays: that.getDefaultCandidateArrayService(urlParams),
                    auxProperties: {myOrderAge: 21, isLogin: false},
                    urlParams: urlParams,
                    productInfo: {},
                    userInfo: {},
                    order: {
                        organizationId: urlParams.organization_id,
                        relationship: '',
                        type: urlParams.order_type
                    },
                    appntInfo: that.getDefaultappntInfoService(urlParams),
                    insuredInfos: that.getDefaultInsuredInfosService(urlParams),
                    schemaInfo: that.getDefaultschemaInfoService(urlParams),
                    LCInsureImparts: that.getDefaultLCInsureImpartsService(urlParams),
                    crsInfos: that.getDefaultcrsService(urlParams),
                },
            }
        ;
        deferred.resolve(data);
        return deferred;
    },
    getDefaultCandidateArrayService: function (urlParams) {
        var candidates = require('../repository/dic/index')
        var relationships = candidates.relationships;

        var relationshipForXyb = [
            {
                key: "00", value: '本人'
            },
            {
                key: "01", value: '配偶'
            },
            {
                key: "03", value: '子女'
            },
            {
                key: "02", value: '父母'
            }
        ];
        var relationshipForAki = [
            {
                key: "00", value: '本人'
            },
            {
                key: "01", value: '配偶'
            },
            {
                key: "03", value: '子女'
            },
            {
                key: "02", value: '父母'
            },
            {
                key: "13", value: '配偶父母'
            }
        ];

        relationships = (urlParams.order_type == 601 || urlParams.order_type == 603 || urlParams.order_type == 605) ? relationshipForXyb : relationshipForAki;

        candidates.relationships = relationships;

        return candidates;
    },
    getDefaultappntInfoService: function (urlParams) {
        // return { //投保人信息
        //     appntName: '测试',
        //     rankCode: '',
        //     rankName: '',
        //     appntidType: 'A',
        //     appntidNo: '23234113123123',
        //     idExpDate: '2019-01-02',
        //     idIsLongValid: '0',
        //     appntSex: '0',
        //     appntBirthday: '1980-01-01',
        //     marriage: '',
        //     nativePlace: 'CHN',
        //     personalIncome: '10',
        //     premSource: '测试',
        //     occupationCode: '',
        //     workDepartment: '测试单位',
        //     companyOrSchool: '测试单位',
        //     mobilePhoneNumber: '13988555858',
        //     email: '2342' + parseInt(Math.random() * 10000) + '34@234234.com',
        //     contactProvince: '44',
        //     contactCity: '4401',
        //     contactDistrict: '440101',
        //     contactDetailedAddress: '在在在在在',
        //     taxIdentity: 1,
        //     serviceNo: "123456798"
        // }
        return { //投保人信息
            appntName: '',
            rankCode: '',
            rankName: '',
            appntidType: '',
            appntidNo: '',
            idExpDate: '',
            idIsLongValid: '',
            appntSex: '',
            appntBirthday: '1980-01-01',
            marriage: '',
            nativePlace: 'CHN',
            personalIncome: '',
            premSource: '',
            occupationCode: '',
            workDepartment: '',
            companyOrSchool: '',
            mobilePhoneNumber: '',
            email: '',
            contactProvince: '',
            contactCity: '',
            contactDistrict: '',
            contactDetailedAddress: '',
            taxIdentity: 1,
            serviceNo: ""
        }
    },
    // getDefaultInsuredInfosService: function (urlParams) {
    //     return [{ //被保人信息
    //         insuredseqNo: '1',
    //         relationToAppnt: '00',
    //         rankCode: '0',
    //         rankName: '员工家属',
    //         insuredName: '测试用户' + parseInt(Math.random() * 10000),
    //         insuredIdtype: "I",
    //         insuredIdno: "2342342342342342",
    //         idExpDate: "2019-01-01",
    //         idIsLongValid: 0,
    //         insuredSex: "0",
    //         insuredBirthday: "1980-01-01",
    //         marriage: "",
    //         nativePlace: "CHN",
    //         personalIncome: "10",
    //         occupationCode: "",
    //         companyOrSchool: "测试机构",
    //         mobilePhoneNumber: 13500000000 + parseInt(Math.random() * 10000),
    //         contactProvince: '44',
    //         contactCity: '4401',
    //         contactDistrict: '440101',
    //         contactDetailedAddress: '在在在在在',
    //         email: "135@qq.com",
    //         taxIdentity: "1",
    //     }]
    // },
    getDefaultInsuredInfosService: function (urlParams) {
        var result = [{ //被保人信息
            insuredseqNo: '1',
            relationToAppnt: '00',
            rankCode: '0',
            rankName: '员工家属',
            insuredName: "",
            insuredIdtype: "",
            insuredIdno: "",
            idExpDate: "",
            idIsLongValid: "",
            insuredSex: "0",
            insuredBirthday: "1980-01-01",
            marriage: "",
            nativePlace: "CHN",
            personalIncome: "",
            occupationCode: "",
            companyOrSchool: "",
            mobilePhoneNumber: "",
            contactProvince: '',
            contactCity: '',
            contactDistrict: '',
            contactDetailedAddress: '',
            email: "",
            taxIdentity: "1",
        }];
        // if (urlParams.order_type == '701') {
        //     result[0].relationToAppnt = '-1'
        // } else {
        //     result[0].relationToAppnt = '00'
        // }
        return result
    },

    getDefaultschemaInfoService: function (urlParams) {
        var that = this;
        var result = [{ //保险方案信息
            insuredseqNo: '1',
            organizationId: urlParams.organization_id, //组织id
            type: urlParams.order_type,//类型
            insuredSeq: '1',
            relationship: '00',//与投保人的关系
            birthday: '1980-01-01', //被保人生日
            sex: '0', //被保人性别
            insuYear: '1', //保险期间
            payEndYear: '1',//交费期间
            payIntv: '12',//交费方式
            getIntv: '12',//年金领取方式
            payEndYearFlag: 'Y',//缴费标识
            riskCode: 'PNSD002',
            insuYearFlag: 'Y',
            amnt: 100000,//保额
            prem: '',
            mult: '1',
        }];
        // if (result.order_type == '701') {
        //     result[0].relationship = '-1'
        // } else {
        //     result[0].relationship = '00'
        // }

        //根据orderType选取riskCode
        var riskCode = "PNSD002"; //
        var products = that.getDefaultCandidateArrayService(urlParams).products.products;
        for (var i = 0; i < products.length; i++) {
            var product = products[i];
            if (product.order_type == urlParams.order_type) {
                riskCode = product.riskCode
            }
        }
        result[0].riskCode = riskCode;
        return result;
    },
    getDefaultLCInsureImpartsService: function (urlParams) {
        var xyb601 = [
            { //健康告知信息
                impartCode: 'IGI_601_1',
                impartParammodle: '/',
                impartResult: '0',
            },
            { //健康告知信息
                impartCode: 'IGI_601_2',
                impartParammodle: '///',
                impartResult: '0',
            },
            { //健康告知信息
                impartCode: 'IGI_601_3',
                impartParammodle: '////',
                impartResult: '0',
            },
            { //健康告知信息
                impartCode: 'IGI_601_4',
                impartParammodle: '',
                impartResult: '0',
            },
            { //健康告知信息
                impartCode: 'IGI_601_5',
                impartParammodle: '',
                impartResult: '0',
            },
            { //健康告知信息
                impartCode: 'IGI_601_6',
                impartParammodle: '',
                impartResult: '0',
            },
            { //健康告知信息
                impartCode: 'IGI_601_7',
                impartParammodle: '/////',
                impartResult: '0',
            },
            { //健康告知信息
                impartCode: 'IGI_601_8',
                impartParammodle: '',
                impartResult: '0',
            },
            { //健康告知信息
                impartCode: 'IGI_601_9',
                impartParammodle: '',
                impartResult: '0',
            },
            { //健康告知信息
                impartCode: 'IGI_601_10',
                impartParammodle: '',
                impartResult: '0',
            },
            { //健康告知信息
                impartCode: 'IGI_601_11',
                impartParammodle: '',
                impartResult: '0',
            },
            { //健康告知信息
                impartCode: 'IGI_601_12',
                impartParammodle: '',
                impartResult: '0',
            },
            { //健康告知信息
                impartCode: 'IGI_601_13',
                impartParammodle: '/',
                impartResult: '0',
            },
            { //健康告知信息
                impartCode: 'IGI_601_14',
                impartParammodle: '/',
                impartResult: '0',
            },

        ];

        var xyb605 = [
            { //健康告知信息
                impartCode: 'IGI_605_1',
                impartParammodle: '/',
                impartResult: '0',
            },
            { //健康告知信息
                impartCode: 'IGI_605_2',
                impartParammodle: '///',
                impartResult: '0',
            },
            { //健康告知信息
                impartCode: 'IGI_605_3',
                impartParammodle: '////',
                impartResult: '0',
            },
            { //健康告知信息
                impartCode: 'IGI_605_4',
                impartParammodle: '',
                impartResult: '0',
            },
            { //健康告知信息
                impartCode: 'IGI_605_5',
                impartParammodle: '',
                impartResult: '0',
            },
            { //健康告知信息
                impartCode: 'IGI_605_6',
                impartParammodle: '',
                impartResult: '0',
            },
            { //健康告知信息
                impartCode: 'IGI_605_7',
                impartParammodle: '/////',
                impartResult: '0',
            },
            { //健康告知信息
                impartCode: 'IGI_605_8',
                impartParammodle: '',
                impartResult: '0',
            },
            { //健康告知信息
                impartCode: 'IGI_605_9',
                impartParammodle: '',
                impartResult: '0',
            },
            { //健康告知信息
                impartCode: 'IGI_605_10',
                impartParammodle: '',
                impartResult: '0',
            },
            { //健康告知信息
                impartCode: 'IGI_605_11',
                impartParammodle: '',
                impartResult: '0',
            },
            { //健康告知信息
                impartCode: 'IGI_605_12',
                impartParammodle: '',
                impartResult: '0',
            },
            { //健康告知信息
                impartCode: 'IGI_605_13',
                impartParammodle: '/',
                impartResult: '0',
            },
            { //健康告知信息
                impartCode: 'IGI_605_14',
                impartParammodle: '/',
                impartResult: '0',
            },

        ];

        var xyb603 = [
            { //健康告知信息
                impartCode: 'IGI_603_1',
                impartParammodle: '',
                impartResult: '0',
            },
            { //健康告知信息
                impartCode: 'IGI_603_2',
                impartParammodle: '/',
                impartResult: '0',
            },
        ];


        var xyb701 = [
            { //健康告知信息
                impartCode: 'IGI_701_1',
                impartParammodle: '/',
                impartResult: '0',
            },
            { //健康告知信息
                impartCode: 'IGI_701_2',
                impartParammodle: '',
                impartResult: '0',
            },
            { //健康告知信息
                impartCode: 'IGI_701_3',
                impartParammodle: '/////',
                impartResult: '0',
            },
            { //健康告知信息
                impartCode: 'IGI_701_4',
                impartParammodle: '/////',
                impartResult: '0',
            },
            { //健康告知信息
                impartCode: 'IGI_701_5',
                impartParammodle: '/////',
                impartResult: '0',
            },
            { //健康告知信息
                impartCode: 'IGI_701_6',
                impartParammodle: '',
                impartResult: '0',
            },
            { //健康告知信息
                impartCode: 'IGI_701_7',
                impartParammodle: '/////',
                impartResult: '0',
            },
            { //健康告知信息
                impartCode: 'IGI_701_8',
                impartParammodle: '/////',
                impartResult: '0',
            },

        ];
        if (urlParams.order_type == 601) {
            return xyb601;
        }
        else if (urlParams.order_type == 603) {
            return xyb603;
        } else if (urlParams.order_type == 605) {
            return xyb605;
        } else if (urlParams.order_type == 701) {
            return xyb701;
        }

    },
    getDefaultcrsService: function (urlParams) {
        return {
            homeNation: '',
            contactDetailedAddress: '',
            contactProvince: '',
            contactCity: '',
            contactDistrict: '',

            contactNation: "CHN",//默认为中国（业务需求）
            homeDetailedAddress: "",
            homeProvince: '',
            homeCity: '',
            homeDistrict: '',

            nation: '',
            taxpayerno: '',
            detailreason: '',
            noTaxpayernoReason: '',
        }
    },
    //组件
    setUpWidgetService: function (form, widgetConfig) {
        var deferred = $.Deferred();
        var that = this;
        //将配置自动化复制进组件
        for (var x in widgetConfig) {
            //取得组件实例 (创建一个独立的新对象)
            var widget = $.extend({}, require('../widget/index')[widgetConfig[x].type]);
            //将配置放进组件实例
            for (var y in widgetConfig[x]) {
                widget[y] = widgetConfig[x][y];
            }
            var value = form[x];
            widget.setValue(value); //设置值的时候，组件会进行单位转换、拆解等操作
            form[x] = widget
        }
        deferred.resolve(form);
        // deferred.reject();
        return deferred;
    },
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    //后台接口
    getUserInfo: function (urlParams) { //获取用户信息
        var deferred = $.Deferred();
        var that = this;
        var dataToPost = {type: urlParams.order_type};
        if (!dataToPost.type) {
            dataToPost.type = '601'
        }

        interfaces.post(urlParams.source + "/getUserInfo", dataToPost)
            .then(function (data) {
                deferred.resolve(data);
            })
            .catch(function (res) {
                deferred.reject('系统超时');
            });
        return deferred;
    },
    checkPayStatus: function (urlParams) { //获取用户信息
        var deferred = $.Deferred();
        var that = this;
        var dataToPost = {payOrderId: urlParams.orderId};
        interfaces.post(urlParams.source + "/checkPayStatus", dataToPost)
            .then(function (data) {
                if (data.statusCode == 1) {
                    deferred.resolve(data);
                } else {
                    deferred.reject({type: "modal", msg: data.msg, code: data.statusCode});
                }
            })
            .catch(function (res) {
                deferred.reject('系统超时');
            });
        return deferred;
    },
    submitExperienceStatus: function (urlParams, person_number) { //是否已经提交了调研结果
        var deferred = $.Deferred();
        var that = this;
        var dataToPost = {person_number: person_number}
        interfaces.post(urlParams.source + "/submitExperienceStatus", dataToPost)
            .then(function (data) {
                if (data.statusCode == 1) {
                    deferred.resolve(data);
                } else {
                    deferred.reject({type: "modal", msg: data.msg, code: data.statusCode});
                }
            })
            .catch(function (res) {
                deferred.reject('系统超时');
            });
        return deferred;
    },
    submitExperience: function (urlParams, person_number, choose, order_type) { //提交调研结果
        var deferred = $.Deferred();
        var that = this;
        var dataToPost = {
            person_number: person_number,
            evaluate: choose,
            type: order_type
        };
        interfaces.post(urlParams.source + "/submitExperience", dataToPost)
            .then(function (data) {
                if (data.statusCode == 1) {
                    deferred.resolve(data);
                } else {
                    deferred.reject({type: "modal", msg: data.msg, code: data.statusCode});
                }
            })
            .catch(function (res) {
                deferred.reject('系统超时');
            });
        return deferred;
    },
    getUserFile: function (urlParams) {
        var deferred = $.Deferred();
        var that = this;
        var dataToPost = {orderId: urlParams.id};
        interfaces.post(urlParams.source + "/getUserFile", dataToPost)
            .then(function (data) {
                if (data.statusCode == 1) {
                    deferred.resolve(data);
                } else {
                    deferred.reject([{type: "modal", msg: data.msg, code: data.statusCode}]);
                }
            })
            .catch(function (res) {
                deferred.reject('系统超时');
            });
        return deferred;
    },
    premiumTrialService: function (urlParams, dataList) { //保存保险方案
        var deferred = $.Deferred();
        var that = this;
        var dataToPost = {
            organization_id: urlParams.organization_id,
            type: urlParams.order_type,
            risks: JSON.stringify(dataList)
        };
        interfaces.post(urlParams.source + "/premiumTrial", dataToPost)
            .then(function (data) {
                if (data.statusCode == 1) {
                    // deferred.resolve(parseInt(Math.random() * 10000)); //测试用
                    deferred.resolve(data.data.prem);
                } else {
                    deferred.reject([{type: "modal", msg: data.msg, code: data.statusCode}]);
                }

            })
            .catch(function (res) {
                deferred.reject('系统超时');
            });
        return deferred;
    },
    saveOrderNewResidentInfo: function (urlParams, taxInfo) { //保存保险方案
        var deferred = $.Deferred();
        var that = this;
        interfaces.post(urlParams.source + "/saveOrderNewResidentInfo", taxInfo)
            .then(function (data) {
                if (data.statusCode == 1) {
                    deferred.resolve();
                } else {
                    deferred.reject([{type: "modal", msg: data.msg, code: data.statusCode}]);
                }
            })
            .catch(function (res) {
                deferred.reject('系统超时');
            });
        return deferred;
    },
    saveSchemaInfo: function (urlParams, schemaInfo, current_premium, orderId) { //保存保险方案
        var deferred = $.Deferred();
        var that = this;
        var dataToPost = {
            currentPremium: current_premium,
            type: urlParams.order_type,
            orderId: orderId,
            risks: JSON.stringify(schemaInfo)
        };

        interfaces.post(urlParams.source + "/saveSchemaInfo", dataToPost)
            .then(function (data) {
                if (data.statusCode == 1) {
                    deferred.resolve(data);
                } else {
                    deferred.reject([{type: "modal", msg: data.msg, code: data.statusCode}]);
                }
            })
            .catch(function (res) {
                deferred.reject('系统超时');
            });
        return deferred;
    },
    saveAppntInfo: function (urlParams, appntInfo, orderId) { //保存投保人信息
        var deferred = $.Deferred();
        var that = this;
        var dataToPost = {
            orderId: orderId,
            type: urlParams.order_type,
            appntNew: JSON.stringify(appntInfo)
        };
        interfaces.post(urlParams.source + "/saveAppntInfo", dataToPost)
            .then(function (data) {
                if (data.statusCode == 1) {
                    deferred.resolve(data);
                } else {
                    deferred.reject([{type: "modal", msg: data.msg, code: data.statusCode}]);
                }
            })
            .catch(function (res) {
                deferred.reject('系统超时');
            });
        return deferred;
    },
    saveInsuredInfo: function (urlParams, insuredInfo, orderId) { //保存投保人信息
        var deferred = $.Deferred();
        var that = this;
        var insuredInfoObj = JSON.parse(JSON.stringify(insuredInfo))

        if (insuredInfoObj[0].contactDistrict == "0") {
            insuredInfoObj[0].contactDistrict = null;
        }

        var dataToPost = {
            orderId: orderId,
            type: urlParams.order_type,
            insureds: JSON.stringify(insuredInfoObj)
        };
        interfaces.post(urlParams.source + "/saveInsuredInfo", dataToPost)
            .then(function (data) {
                if (data.statusCode == 1) {
                    deferred.resolve(data);
                } else {
                    deferred.reject([{type: "modal", msg: data.msg, code: data.statusCode}]);
                }
            })
            .catch(function (res) {
                deferred.reject('系统超时');
            });
        return deferred;
    },
    saveHealthInfo: function (urlParams, LCInsureImparts, orderId) { //保存健康告知信息
        var deferred = $.Deferred();
        var dataToPost = {
            orderId: orderId,
            type: urlParams.order_type,
            LCInsureImparts: JSON.stringify(LCInsureImparts),
        };
        interfaces.post(urlParams.source + "/saveHealthInfo", dataToPost)
            .then(function (data) {
                if (data.statusCode == 1) {
                    deferred.resolve(data.data);
                } else {
                    deferred.reject([{type: "modal", msg: data.msg, code: data.statusCode}]);
                }
            })
            .catch(function (res) {
                deferred.reject('系统超时');
            });
        return deferred;
    },
    getOrder: function (urlParams, orderId) {
        var deferred = $.Deferred();
        var that = this;
        var dataToPost = {
            orderId: orderId,
            type: urlParams.order_type
        };
        interfaces.post(urlParams.source + "/getOrder", dataToPost)
            .then(function (data) {
                if (data.statusCode == 1) {
                    deferred.resolve(data)
                } else {
                    deferred.reject(data.msg)
                }
            })
            .catch(function (res) {
                deferred.reject('系统超时');
            });
        return deferred;
    },
    deleteOrder: function (urlParams, orderId) {
        var deferred = $.Deferred();
        var that = this;
        var dataToPost = {
            orderId: orderId,
            type: urlParams.order_type
        };
        interfaces.post(urlParams.source + "/deleteOrder", dataToPost)
            .then(function (data) {
                if (data.statusCode == 1) {
                    deferred.resolve(data)
                } else {
                    deferred.reject(data.msg)
                }
            })
            .catch(function (res) {
                deferred.reject('系统超时');
            });
        return deferred;
    },
    getOrderList: function (urlParams) {
        var deferred = $.Deferred();
        var that = this;
        var dataToPost = {type: urlParams.order_type};
        interfaces.post(urlParams.source + "/getNewOrderList", dataToPost)
            .then(function (data) {
                if (data.statusCode == 1) {
                    deferred.resolve(data)
                } else {
                    deferred.reject(data.msg)
                }
            })
            .catch(function (res) {
                deferred.reject('系统超时');
            });
        return deferred;
    },
    createOrder: function (urlParams, relationShip) {
        var deferred = $.Deferred();
        var dataToPost = {
            organizationId: urlParams.organization_id,
            relationship: relationShip,
            type: urlParams.order_type
        };
        interfaces.post(urlParams.source + "/createOrder", dataToPost)
            .then(function (data) {
                if (data.statusCode == 1) {
                    deferred.resolve(data.data)
                } else {
                    deferred.reject(data.msg)
                }
            })
            .catch(function (res) {
                deferred.reject('系统请求超时')
            });
        return deferred
    },
    saveOrder: function (order, orderId) {//保存订单
        var deferred = $.Deferred();
        var dataToPost = {
            orderId: orderId,
            organizationId: order.organizationId,
            relationship: order.relationship,
            type: order.type,
            insuredAmount: order.insuredAmount,
            insuYear: order.insuYear,
            payEndYear: order.payEndYear,
            payIntv: order.payIntv
        };//
        interfaces.post(urlParams.source + "/saveOrder", dataToPost)
            .then(function (data) {
                if (data.statusCode == 1) {
                    deferred.resolve();
                } else {
                    deferred.reject(data.msg);
                }
            })
            .catch(function (res) {
                deferred.reject('系统超时');
            });
        return deferred
    },
    editOrder: function (urlParams, orderId) {//保存订单
        var deferred = $.Deferred();
        var dataToPost = {
            orderId: orderId,
            type: urlParams.order_type
        };
        interfaces.post(urlParams.source + "/editOrder", dataToPost)
            .then(function (data) {
                if (data.statusCode == 1) {
                    deferred.resolve();
                } else {
                    deferred.reject(data.msg);
                }
            })
            .catch(function (res) {
                deferred.reject('系统超时');
            });
        return deferred
    },
    submitOrder: function (urlParams, ids) {//保存订单
        var deferred = $.Deferred();
        var dataToPost = {
            ids: ids,
            type: urlParams.order_type
        };//
        interfaces.post(urlParams.source + "/submitOrder", dataToPost)
            .then(function (data) {
                if (data.statusCode == 1) {
                    deferred.resolve(data);
                } else {
                    deferred.reject(data.msg);
                }
            })
            .catch(function (res) {
                deferred.reject('系统超时');
            });
        return deferred
    },
    cancelUserOrders: function (urlParams, orderId) {//保存订单
        var deferred = $.Deferred();
        var dataToPost = {
            orderId: orderId,
            type: urlParams.order_type
        };//
        interfaces.post(urlParams.source + "/cancelUserOrders", dataToPost)
            .then(function (data) {
                if (data.statusCode == 1) {
                    deferred.resolve();
                } else {
                    deferred.reject(data.msg);
                }
            })
            .catch(function (res) {
                deferred.reject('系统超时');
            });
        return deferred
    },
    goToNewPayOrder: function (urlParams, order_type, ids, terminalType) {//保存订单
        var deferred = $.Deferred();
        var dataToPost = {
            orderIds: ids,
            terminal: terminalType,
            type: order_type
        };
        interfaces.post(urlParams.source + "/goToNewPayOrder", dataToPost)
            .then(function (data) {
                if (data.statusCode == 1) {
                    deferred.resolve(data);
                } else {
                    deferred.reject(data.msg);
                }
            })
            .catch(function (res) {
                deferred.reject('系统超时');
            });
        return deferred
    },
    getInsuredAmount: function (urlParams, schemaInfo, employeeNumber) {//获取产品信息
        console.log("schemaInfo");
        console.log(schemaInfo);
        var deferred = $.Deferred();
        var that = this;
        var dataToPost = {
            order_type: urlParams.order_type,
            relationship: schemaInfo.relationship,
            pay_year_flag: schemaInfo.payEndYearFlag,
            pay_interval: schemaInfo.payIntv,
            pay_year: schemaInfo.payEndYear,
            gender: schemaInfo.sex,
            birthday: schemaInfo.birthday,
            insuredAmount: schemaInfo.insuredAmount,
            employee_number: employeeNumber
        };

        interfaces.post(urlParams.source + "/getInsuredAmount", dataToPost)
            .then(function (data) {
                if (data.statusCode == 1) {
                    deferred.resolve(data.data);
                } else {
                    deferred.reject(data.msg);
                }
            });
        return deferred
    },
    getCashValue: function (urlParams, data) {
        var deferred = $.Deferred();
        var dataToPost = {
            type: urlParams.order_type,
            organization_id: urlParams.organization_id,
            risks: JSON.stringify(data.risks),
        };
        interfaces.post(urlParams.source + "/cashValue", dataToPost)
            .then(function (data) {
                if (data.statusCode == 1) {
                    try {
                        if (data.statusCode == 1) {//请求状态正常
                            for (var i = 0; i < data.data.length; i++) {
                                var product = data.data[i];
                                if (product.cashCount > 0) {
                                    for (var j = 0; j < product.cashList.length; j++) {
                                        var cashItem = data.data[i].cashList[j];
                                        console.log(cashItem.cashValue);
                                        console.log(cashItem.contYear);
                                        var item = {
                                            year: cashItem.contYear,
                                            age: j + 1,
                                            value: cashItem.cashValue
                                        };
                                        cashItem.displayItem = item;
                                    }
                                }
                            }
                            deferred.resolve(data.data);
                        } else {//返回码异常
                            deferred.reject(data.msg);
                        }
                    } catch (e) {
                        deferred.reject("返回数据格式异常");
                    }
                } else {
                    deferred.reject(data.msg);
                }
            });
        return deferred
    },
    getProductInfo: function (urlParams) {//获取产品信息
        var deferred = $.Deferred();
        var that = this;
        var dataToPost = {
            organization_id: urlParams.organization_id,
            order_type: urlParams.order_type,
            source: urlParams.source,
            config_item_id: urlParams.config_item_id
        }
        interfaces.post(urlParams.source + "/getProductInfo", dataToPost)
            .then(function (data) {
                if (data.statusCode == 1) {
                    deferred.resolve(data.data);
                } else {
                    deferred.reject(data.msg);
                }
            });
        return deferred;
    },
    getUserAge: function (urlParams, birthday) {
        var deferred = $.Deferred();
        var that = this;
        var dataToPost = {
            birthday: birthday,
            organization_id: urlParams.organization_id,
            source: urlParams.source,
            type: urlParams.order_type
        };
        interfaces.post(urlParams.source + "/getUserAge", dataToPost)
            .then(function (data) {
                if (data.statusCode == 1) {
                    deferred.resolve(data)
                } else {
                    deferred.reject(data.msg)
                }
            })
            .catch(function (res) {
                deferred.reject('系统超时');
            });
        return deferred;
    },
    sendFaceMessage: function (urlParams, orderId, insuredseqNo) {
        var deferred = $.Deferred();
        var that = this;
        var dataToPost = {orderId: orderId, type: urlParams.order_type, insuredseqNo: insuredseqNo};
        interfaces.post(urlParams.source + "/sendFaceMessage", dataToPost)
            .then(function (data) {
                console.log("发送短信数据：", data);
                if (data.statusCode == 1) {
                    deferred.resolve(data.msg)
                } else {
                    deferred.reject(data.msg)
                }
            })
            .catch(function (res) {
                deferred.reject('系统超时');
            });
        return deferred;
    },
    changeConfirmModeService: function (urlParams, orderId, insuredseqNo) { //保存保险方案
        var deferred = $.Deferred();
        var that = this;

        var url = "changeConfirmMode" + '/' + orderId + '/' + insuredseqNo

        that.interfaces.postFile2(url, "")
            .then(function (data) {
                if (data.statusCode == 1) {
                    deferred.resolve(data);
                } else {
                    deferred.reject([{type: "modal", msg: data.msg, code: data.statusCode}]);
                }
            })
            .catch(function (res) {
                deferred.reject('系统超时');
            });

        return deferred;
    },
    getShareUrl: function (urlParams, orderId, seqNo) {
        var deferred = $.Deferred();
        var that = this;

        var dataToPost = {
            orderId: orderId,
            seqNo: seqNo
        };

        interfaces.postFile2("getShareUrl", dataToPost)
            .then(function (data) {
                if (data.statusCode == 1) {
                    deferred.resolve(data);
                } else {
                    deferred.reject([{type: "modal", msg: data.msg, code: data.statusCode}]);
                }
            })
            .catch(function (res) {
                deferred.reject('系统超时');
            });

        return deferred;
    },
    previewOrder: function (urlParams, orderId, token, insuredseqNo) { //保存保险方案
        var deferred = $.Deferred();
        var that = this;

        var dataToPost = {orderId: orderId, token: token, seqNo: insuredseqNo};

        interfaces.postFile2("previewOrder", dataToPost)
            .then(function (data) {
                if (data.statusCode == 0 || data.statusCode == 1) {
                    deferred.resolve(data);
                } else {
                    deferred.reject([{type: "modal", msg: data.msg, code: data.statusCode}]);
                }
            })
            .catch(function (res) {
                deferred.reject('系统超时');
            });

        return deferred;
    },
    logOut: function (urlParams) { //获取用户信息
        var deferred = $.Deferred();
        var that = this;
        interfaces.post(urlParams.source + "/userLogOut", "")
            .then(function (data) {
                if (data.statusCode == 1) {
                    deferred.resolve(data);
                } else {
                    deferred.reject([{type: "modal", msg: data.msg, code: data.statusCode}]);
                }
            })
            .catch(function (res) {
                deferred.reject('系统超时');
            });
        return deferred;
    },
    //缓存接口
    setOrderToCache: function (urlParams, order) {
        var deferred = $.Deferred();
        var that = this;

        var prefix = that.getCacheNamePrefix(urlParams);
        var cacheName = prefix + 'order';
        var result = JSON.stringify(order);
        localStorage.setItem(cacheName, result);

        deferred.resolve(result);
        return deferred;

    },
    getOrderCache: function (urlParams) {
        var that = this;
        try {
            var prefix = that.getCacheNamePrefix(urlParams);
            var cacheName = prefix + 'order';
            var result = localStorage.getItem(cacheName);
            if (result) {
                result = JSON.parse(result)
            }
        } catch (e) {
            console.log(e)
        }
        return result;
    },
    deleteOrderCache: function (urlParams) {
        var deferred = $.Deferred();
        var that = this;

        //删除缓存
        try {
            var form_order_widget = require('../widget/order_form');
            form_order_widget.urlParams = urlParams;
            form_order_widget.removeCache();//删除缓存
        } catch (e) {

        }

        deferred.resolve();
        return deferred;
    },
    //服务
    loginService: function (urlParams, form) { //获取用户信息
        var deferred = $.Deferred();
        var that = this;

        var dataToPost = {
            employee_number: form.employee_number,
            employee_name: form.employee_name,
            mobile_phone: form.mobile_phone,
            authImage_Code: form.authImage_Code,
            type: urlParams.order_type,
            organization_id: urlParams.organization_id,
            verification_code: form.verification_code
        };

        interfaces.post(urlParams.source + "/userLogin", dataToPost)
            .then(function (data) {
                if (data.statusCode == 1) {
                    deferred.resolve(data);
                } else {
                    deferred.reject(data);
                }
            })
            .catch(function (res) {
                deferred.reject('系统超时');
            });
        return deferred;
    },
    sendVerificationCodeService: function (urlParams, form) { //获取用户信息
        var deferred = $.Deferred();
        var that = this;

        var dataToPost = {
            employee_number: form.employee_number,
            employee_name: form.employee_name,
            mobile_phone: form.mobile_phone,
            authImage_Code: form.authImage_Code,
            type: urlParams.order_type,
            organization_id: urlParams.organization_id,
            verification_code: form.verification_code
        };

        interfaces.post(urlParams.source + "/verificationCode", dataToPost)
            .then(function (data) {
                if (data.statusCode == 1) {
                    deferred.resolve(data);
                } else {
                    deferred.reject([{type: "modal", msg: data.msg, code: data.statusCode}]);
                }
            })
            .catch(function (res) {
                deferred.reject('系统超时');
            });
        return deferred;
    },
    getCacheNamePrefix: function (urlParams) {
        return urlParams.source + '-' + urlParams.organization_id + '-' + urlParams.order_type + '-'
    },
    extractUrlParams: function (url) {
        var that = this;
        // http://192.168.199.249:8062/xyb-detail.html?organization_id=xyb&source=xyb&uploadType=1&order_type=601
        var splitedUrl = url.split("?")
        var object = {}
        if (splitedUrl[1]) {
            var splitedParams = splitedUrl[1].split("&");
            for (var i = 0; i < splitedParams.length; i++) {
                var param = splitedParams[i].split("=");
                if (param[0]) {
                    object[param[0]] = that.getQueryString(param[0]);
                }
            }
        }
        return object;
    },
    combineUrlWithParams: function (baseUrl, urlParams) {
        var params = '';
        var i = 0;
        var length = Object.keys(urlParams).length;
        for (var x in urlParams) {
            i++;
            if (i == length) {
                params = params + x + "=" + urlParams[x];
            } else {
                params = params + x + "=" + urlParams[x] + "&";
            }
            console.log("key:" + x, urlParams[x]);
        }
        var url = baseUrl + "?" + params;
        return url;
    },
    //初始化
    initwithLoginService: function () {
        var deferred = $.Deferred();
        var that = this;
        var result = {
            data: {}
        };

        //解释参数
        var urlParams = that.extractUrlParams(window.location.href)
        result.data.urlParams = urlParams;
        that.getDefaultDataService(urlParams)
            .then(function (data) {
                for (var x in data.data) {
                    result.data[x] = data.data[x];
                }
                return that.getProductInfo(urlParams)
            })
            .then(function (productInfo) {
                result.data.productInfo = productInfo;
                return centralService.getUserInfo(urlParams)
            })
            .then(function (data) {
                if (data.statusCode == -401) { //未登录
                    throw new Exception(data.msg);
                } else {
                    result.data.userInfo = data.data;
                    result.data.auxProperties.isLogin = true;
                    deferred.resolve(result);
                }
            })
            .catch(function (err) {
                deferred.reject(err)
            });

        return deferred;
    },
    initWithoutLoginService: function (url) {
        var deferred = $.Deferred();
        var that = this;

        var result = {
            data: {}
        };
        //解释参数
        var urlParams = that.extractUrlParams(window.location.href)
        result.data.urlParams = urlParams;

        that.getDefaultDataService(urlParams)
            .then(function (data) {
                for (var x in data.data) {
                    result.data[x] = data.data[x];
                }
                return that.getProductInfo(urlParams)
            })
            .then(function (productInfo) {
                result.data.productInfo = productInfo;
                return that.getUserInfo(urlParams)
            })
            .then(function (data) {
                if (data.statusCode == -401) { //未登录
                    result.data.auxProperties.isLogin = false;
                } else {
                    result.data.userInfo = data.data;
                    result.data.auxProperties.isLogin = true;
                }
                deferred.resolve(result);
            })
            .catch(function (err) {
                deferred.resolve(result)
            });

        return deferred;
    },
    myBrowserType: function myBrowserType() {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
        if (isIE) {
            return true
        } else {
            return false
        }
    },
};
module.exports = centralService;
