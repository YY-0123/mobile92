import { extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
// rules: {alpha:xx,alpha_dash:xx,alpha_num:xx……}
Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule])
})
// Object.keys(rules) 获得对象中全部的属性名称，
// 并以数组返回["alpha", "alpha_dash", "alpha_num", ……]
// extend(rule, rules[rule]) 完成每个内置校验规则的注册操作