var CentralWidget = require('../../widget/CentralWidget');

var dateWidget = require('../../widget/date'); //引用date组件的getAge功能

var premiul_body_check_801 = $.extend({}, CentralWidget, {
    type: 'premiul_body_check_601', //组件的类别，用于service层动态对比配置进行实例化
    value: '',
    leastValue: '',//显示不需要体验报告的最低金额
    gender: '',
    relationship: '',
    totalAmount: 0,
    age: 0,
    bigTotalDecimal: 0,
    configs: [],
    visible: false,
    configsForAppnt: [
        {
            amountStart: 100001,
            amountEnd: 300000,
            ageStart: 56,
            ageEnd: 65,
            requires: ["c"]
        },
        {
            amountStart: 300001,
            amountEnd: 500000,
            ageStart: 51,
            ageEnd: 65,
            requires: ["c"]
        },
        {
            amountStart: 500001,
            amountEnd: 700000,
            ageStart: 46,
            ageEnd: 65,
            requires: ["c"]
        },
        {
            amountStart: 700001,
            amountEnd: 1000000,
            ageStart: 41,
            ageEnd: 65,
            requires: ["c"]
        },
        {
            amountStart: 1000001,
            amountEnd: 1300000,
            ageStart: 18,
            ageEnd: 65,
            requires: ["c", "甲状腺彩超"]
        },
        {
            amountStart: 1300001,
            amountEnd: 2000000,
            ageStart: 18,
            ageEnd: 65,
            requires: ["d", "甲状腺彩超"]
        },
        {
            amountStart: 2000001,
            amountEnd: 2500000,
            ageStart: 18,
            ageEnd: 65,
            requires: ["f", "甲状腺彩超"]
        },
        {
            amountStart: 2500001,
            amountEnd: 10000000000,
            ageStart: 18,
            ageEnd: 50,
            requires: ["g(女)", "f(男)", "甲状腺彩超"]
        },
        {
            amountStart: 2500001,
            amountEnd: 10000000000,
            ageStart: 51,
            ageEnd: 65,
            requires: ["g(女)", "h(男)", "甲状腺彩超"]
        },
    ],
    configsForFamily: [
        {
            amountStart: 100001,
            amountEnd: 200000,
            ageStart: 56,
            ageEnd: 65,
            requires: ["c"]
        },
        {
            amountStart: 200001,
            amountEnd: 300000,
            ageStart: 46,
            ageEnd: 65,
            requires: ["c"]
        },
        {
            amountStart: 300001,
            amountEnd: 500000,
            ageStart: 41,
            ageEnd: 65,
            requires: ["c"]
        },
        {
            amountStart: 500001,
            amountEnd: 600000,
            ageStart: 36,
            ageEnd: 65,
            requires: ["c"]
        },
        {
            amountStart: 600001,
            amountEnd: 1000000,
            ageStart: 18,
            ageEnd: 65,
            requires: ["c"]
        },
        {
            amountStart: 1000001,
            amountEnd: 1300000,
            ageStart: 18,
            ageEnd: 65,
            requires: ["c", "甲状腺彩超"]
        },
        {
            amountStart: 1300001,
            amountEnd: 2000000,
            ageStart: 18,
            ageEnd: 65,
            requires: ["d", "甲状腺彩超"]
        },
        {
            amountStart: 2000001,
            amountEnd: 2500000,
            ageStart: 18,
            ageEnd: 65,
            requires: ["f", "甲状腺彩超"]
        },
        {
            amountStart: 2500001,
            amountEnd: 10000000000,
            ageStart: 18,
            ageEnd: 45,
            requires: ["g(女)", "f(男)", "甲状腺彩超"]
        },
        {
            amountStart: 2500001,
            amountEnd: 10000000000,
            ageStart: 46,
            ageEnd: 65,
            requires: ["g(女)", "h(男)", "甲状腺彩超"]
        },
    ],
    plan: {
        a: "体查、尿常规、验血（1）",
        b: "体查、尿常规、验血（2）、心电图",
        c: "体查、尿常规、验血（2）、心电图、腹部B超",
        d: "体查、尿常规、验血（3）、心电图、腹部B超+心脏彩超",
        e: "体查、胸透、尿常规、验血（4）、心电图、腹部B超",
        f: "体查、胸透、尿常规、验血（5）、心电图、腹部B超+心脏彩超、再保要求的项目",
        g: "体查、胸透、尿常规、验血（5）、心电图、腹部B超+心脏彩超+乳腺及妇科B超（女）、再保要求的项目",
        h: "体查、胸透、尿常规、验血（6）、心电图、腹部B超+心脏彩超、再保要求的项目",
    },
    bloods: [
        {key: '验血（1）', value: '血常规、血脂（总胆固醇、甘油三酯）、空腹血糖、肾功（尿素氮、肌酐、尿酸）、乙肝两对半、肝功（谷丙转氨酶、谷草转氨酶、碱性磷酸酶、谷氨酰肽移转酶、总蛋白、白蛋白、球蛋白）'},
        {
            key: '验血（2）',
            value: '血常规、血脂（总胆固醇、甘油三酯）、空腹血糖、肾功（尿素氮、肌酐、尿酸）、乙肝两对半、肝功（谷丙转氨酶、谷草转氨酶、碱性磷酸酶、谷氨酰肽移转酶、总蛋白、白蛋白、球蛋白）、甲胎蛋白、高密度脂蛋白、低密度脂蛋白'
        },
        {
            key: '验血（3）',
            value: '血常规、血脂（总胆固醇、甘油三酯）、空腹血糖、肾功（尿素氮、肌酐、尿酸）、乙肝两对半、肝功（谷丙转氨酶、谷草转氨酶、碱性磷酸酶、谷氨酰肽移转酶、总蛋白、白蛋白、球蛋白）、甲胎蛋白、高密度脂蛋白、低密度脂蛋白、丙肝'
        },
        {
            key: '验血（4）',
            value: '血常规、血脂（总胆固醇、甘油三酯）、空腹血糖、肾功（尿素氮、肌酐、尿酸）、乙肝两对半、肝功（谷丙转氨酶、谷草转氨酶、碱性磷酸酶、谷氨酰肽移转酶、总蛋白、白蛋白、球蛋白）、甲胎蛋白、高密度脂蛋白、低密度脂蛋白、梅毒、艾滋病'
        },
        {
            key: '验血（5）',
            value: '血常规、血脂（总胆固醇、甘油三酯）、空腹血糖、肾功（尿素氮、肌酐、尿酸）、乙肝两对半、肝功（谷丙转氨酶、谷草转氨酶、碱性磷酸酶、谷氨酰肽移转酶、总蛋白、白蛋白、球蛋白）、甲胎蛋白、高密度脂蛋白、低密度脂蛋白、梅毒、艾滋病、 丙肝'
        },
        {
            key: '验血（6）',
            value: '血常规、血脂（总胆固醇、甘油三酯）、空腹血糖、肾功（尿素氮、肌酐、尿酸）、乙肝两对半、肝功（谷丙转氨酶、谷草转氨酶、碱性磷酸酶、谷氨酰肽移转酶、总蛋白、白蛋白、球蛋白）、甲胎蛋白、高密度脂蛋白、低密度脂蛋白、梅毒、艾滋病、 丙肝、前列腺特异性抗原（男）'
        },
    ],

    setValue: function (startDate, relationship, gender, birthday, totalAmount, bigTotalDecimal) { //设置值
        var that = this;
        that.relationship = relationship;

        if (relationship == '00') {
            that.configs = that.configsForAppnt
        } else {
            that.configs = that.configsForFamily
        }

        that.gender = gender;
        that.birthday = birthday;
        that.totalAmount = totalAmount;
        that.age = dateWidget.getAge(startDate, birthday);
        that.bigTotalDecimal = bigTotalDecimal ? bigTotalDecimal : 0;
        that.getValue();
    },
    fix: function () { //根据最新状态修正提示信息
        var that = this;

        var configs = that.configs;
        var totalAmount = that.totalAmount;
        var age = that.age;
        console.log(totalAmount, age)
        var configToChoose = ''
        for (var i = 0; i < configs.length; i++) {
            var config = configs[i];
            if (
                totalAmount >= config.amountStart &&
                totalAmount <= config.amountEnd &&
                age >= config.ageStart &&
                age <= config.ageEnd
            ) {
                configToChoose = config;
            }
        }

        console.log(totalAmount, age, configToChoose)

        //生成提示
        var tips = "";
        if (configToChoose) {
            var plan = that.plan;
            var requires = configToChoose.requires;
            var bloods = that.bloods;
            for (var i = 0; i < requires.length; i++) {
                var dou = "、";
                var require = requires[i];
                tips += require;
                if (i != requires.length - 1) {
                    tips += dou;
                }
            }
            //性别区分
            if (that.gender == '0') { //替换男女的项目 男
                tips = tips.replace("g(女)、", '')
                tips = tips.replace("(男)", '')
            } else {//女
                tips = tips.replace("f(男)、", '')
                tips = tips.replace("h(男)、", '')
                tips = tips.replace("(女)", '')
            }
            for (var x in plan) { //批量替换体验方案的文本
                tips = tips.replace(x, plan[x]);
            }
            for (var i = 0; i < bloods.length; i++) {//替换验血项目
                var blood = bloods[i];
                tips = tips.replace(blood.key, blood.value);
            }
            that.visible = true;
        }
        else { //不需要提示体检资料
            that.value = '';
            that.visible = false;
        }
        console.log("生成提示");
        console.log(tips);
        that.value = tips;


        //设置最后值
        var tempAmountStart = 0;

        for (var y in configs) {
            if (age >= configs[y].ageStart) {
                tempAmountStart = configs[y].amountStart;
                break;
            }
        }
        // that.leastValue = configToChoose[0].amountStart
        // that.leastValue = parseInt((configToChoose.amountStart / 10000));

        that.leastValue = parseInt(((tempAmountStart - that.bigTotalDecimal) / 10000));
        if (that.leastValue <= 0) {
            that.leastValue = parseInt(((tempAmountStart) / 10000));
        }
        return tips;
    },
});


module.exports = premiul_body_check_801;
