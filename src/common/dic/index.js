var resources = {
    // careers: require('./careers'),
    careers: require('./careersAll'),
    cities: require('./cities'),
    districts: require('./districts'),
    genders: require('./genders'),
    icTypes: require('./icTypes'),
    icIsLongValid: require('./icIsLongValid'),
    taxIdentity: require('./taxIdentity'),
    insure_period: require('./insure_period'),
    maritalStatus: require('./maritalStatus'),
    nationalities: require('./nationalities'),
    nationalitiesForBirth: require('./nationalitiesForBirth'),
    orderStatus: require('./orderStatus'),
    organizations: require('./organizations'),
    pay_years: require('./pay_years'), //设置交费方式
    getYears: require('./getYears'), //设置交费方式
    paymentMethod: require('./paymentMethod'), //设置交费方式
    products: require('./products'),
    provinces: require('./provinces'),
    relationships: require('./relationships'),
    surveys: require('./surveys'),
    uwResults: require('./uwResults'),
    work_departments: require('./work_departments'),
    non_taxpayer_no: require('./non_taxpayer_no'),
    positions: require('./positions'),
};

module.exports = resources;
