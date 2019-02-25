var arrays = require('../repository/dic/index'); //引入默认的候选数组
var config = {
    "loginConfig": { //登录页配置

        employee_number: {type: 'input', id: 'employee_number', validators: []},
        employee_name: {type: 'input', id: 'employee_name', validators: []},
        mobile_phone: {type: 'input', id: 'mobile_phone', validators: ['mobile']},
        verification_code: {type: 'input', id: 'verification_code', validators: []},
        authImage_Code: {type: 'input', id: 'authImage_Code', validators: []},
    },
    "premiumTrialConfig": { //试算页配置
        relationship: {type: 'select', validators: [], candidateArray: arrays.relationships},//与投保人关系
        birthday: {type: 'date', validators: ['date']},//生日
        sex: {type: 'select', validators: [], candidateArray: arrays.genders},//性别
        insuYear: {type: 'select', validators: [], candidateArray: [{key: '1', name: '1年'},]},//保险期限
        getYear: {type: 'select', validators: [], candidateArray: arrays.getYears},// 何时开始领取年金
        amnt: {type: 'insureAmount', validators: ['notZero', 'notInt']},
        payIntv: {
            type: 'select',
            validators: [],
            candidateArray: [{key: "1", value: '月交', view: '月'}, {key: "12", value: '年交', view: '年'}]
        },//交费方式
        getIntv: {
            type: 'select',
            validators: [],
            candidateArray: arrays.getIntvs
        },//年金领取方式
        payEndYear: {type: 'select', validators: [], candidateArray: arrays.pay_years},//交费年限
    },
    "appntConfig": { //投保人配置
        appntName: {type: 'input', validators: ['name'], name: '投保人姓名'},
        rankCode: {
            type: 'select_and_input',
            validators: ['rankCode'],
            candidateArray: arrays.positions,
            name: '投保人职级具体描述'
        },
        appntidType: {type: 'select', validators: [], candidateArray: arrays.icTypes, name: '投保人证件类型'},
        appntidNo: {type: 'idcard', validators: [], name: '投保人证件号码'},
        idExpDate: {type: 'expDate', validators: [], name: '投保人证件长期'},
        idIsLongValid: {
            type: 'select',
            validators: ['longValidate'],
            candidateArray: arrays.icIsLongValid,
            name: '投保人证件有效期'
        },
        appntSex: {type: 'select', validators: ['options'], candidateArray: arrays.genders, name: '投保人性别'},
        appntBirthday: {type: 'date', validators: ['date'], name: '投保人生日'},
        marriage: {type: 'select', validators: [], candidateArray: arrays.maritalStatus, name: '投保人婚姻状态'},
        nativePlace: {type: 'select', validators: [], candidateArray: arrays.nationalities, name: '投保人国籍'},
        personalIncome: {type: 'input', validators: ['appntIncome'], name: '投保人个人年收入'},
        email: {type: 'input', validators: ['email'], name: '投保人邮箱'},
        premSource: {type: 'input', validators: [], name: '投保人保险资金来源'},
        occupationCode: {type: 'select', validators: [], candidateArray: arrays.careers, name: '投保人职业'},
        // workDepartment: {type: 'select', validators: [], candidateArray: arrays.work_departments,name:'投保人工作内容'},
        companyOrSchool: {type: 'input', validators: [], name: '投保人单位或学校'},
        mobilePhoneNumber: {type: 'input', validators: ['mobile'], name: '投保人手机号码'},
        contactDetailedAddress: {type: 'address', validators: ['options'], name: '投保人联系地址'},
        taxIdentity: {type: 'select', validators: [], candidateArray: arrays.taxIdentity, name: '被保险人个人税收居民身份声明'},
        // position: {type: 'select', validators: ['options'], candidateArray: arrays.positions,name:'投保人职级具体描述'},
    },
    "insuredConfig": { //被保人配置
        relationToAppnt: {type: 'select', validators: [], candidateArray: arrays.relationships, name: '被保险人关系'},
        insuredName: {type: 'input', validators: ['name'], name: '被保险人姓名'},
        insuredIdtype: {type: 'select', validators: [], candidateArray: arrays.icTypes, name: '被保险人证件类型'},
        insuredIdno: {type: 'idcard', validators: [], name: '被保险人证件号码', id: "insuredIdno"},
        idExpDate: {type: 'expDate', validators: [], name: '被保险人证件长期'},
        idIsLongValid: {
            type: 'select',
            validators: ['longValidate'],
            candidateArray: arrays.icIsLongValid,
            name: '被保险人证件有效期'
        },
        insuredSex: {type: 'select', validators: ['options'], candidateArray: arrays.genders, name: '被保险人性别'},
        insuredBirthday: {type: 'date', validators: ['date'], name: '被保险人生日'},
        marriage: {type: 'select', validators: [], candidateArray: arrays.maritalStatus, name: '被保险人婚姻状态'},
        nativePlace: {type: 'select', validators: [], candidateArray: arrays.nationalities, name: '被保险人国籍'},
        personalIncome: {type: 'input', validators: ["insuredNotNull"], name: '被保险人个人年收入'},
        premSource: {type: 'input', validators: [], name: '被保险人资金来源'},
        occupationCode: {type: 'select', validators: [], candidateArray: arrays.careers, name: '被保险人职业'},
        mobilePhoneNumber: {type: 'input', validators: ['mobile'], name: '被保险人手机号码'},
        email: {type: 'input', validators: ['email'], name: '被保险人邮箱'},
        contactDetailedAddress: {type: 'address', validators: ['options'], name: '被保险人地址'},
        companyOrSchool: {type: 'input', validators: ['options'], name: '被保险人单位或学校'},
        taxIdentity: {type: 'select', validators: [], candidateArray: arrays.taxIdentity, name: '被保险人个人税收居民身份声明'},
    },
    "questionConfig": {
        question: [],
    },
    "crsConfig": { //crs页配置
        homeNation: {type: 'select', validators: [], candidateArray: arrays.nationalities},
        homeDetailedAddress: {type: 'address', validators: ['email']},
        contactDetailedAddress: {type: 'address', validators: ['email']},
        contactNation: {type: 'select', validators: [], candidateArray: arrays.nationalities},
    },
    "recognitionNumberConfig": { //crs页识别号部分配置
        nation: {type: 'select', validators: [], candidateArray: arrays.nationalities},
        taxpayerno: {type: 'input', validators: ['name']},
        detailreason: {type: 'select', validators: [], candidateArray: arrays.non_taxpayer_no},
        noTaxpayernoReason: {type: 'input', validators: ['name']},
    },


};
module.exports = config;
