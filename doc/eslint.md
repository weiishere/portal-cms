# 前端代码规范




### 缩进
---

|检测项|规则|报错级别|eslint设置规则|
|-------|------|------|------|
|缩进|使用soft tab(4个空格)|error|indent|




### 分号
---

|检测项|规则|报错级别|eslint设置规则|
|-------|------|------|------|
|分号|必须|error|semi|
|分号与代码之间的间隔|分号后面一个空格|warn|semi-spacing|
|多余的分号|不能有多个分号|error|no-extra-semi|


### 引号
---
|检测项|规则|报错级别|eslint设置规则|
|-------|------|------|------|
|引号|统一使用单引号|error|quotes|


### 变量定义
---
|检测项|规则|报错级别|eslint设置规则|
|-------|------|------|------|
|变量是否必须先定义|先定义|error|no-use-before-define|
|是否允许定义没有使用到的变量|不允许|error|no-unused-vars|
|变量命名是否必须大写驼峰|建议|warn|camelcase|
|变量申明的位置|建议放到函数或者代码块的顶部|warn|vars-on-top|
|是否允许重复定义一个变量|不允许|error|no-redeclare|



### 相等判断
---
|检测项|规则|报错级别|eslint设置规则|
|-------|------|------|------|
|判断两个值是否相等|建议使用===|warn|eqeqeq|

### 杂项(全部是error级别)
---
|检测项|eslint设置规则|
|-------|------|------|
|条件语句中，不应该出现 =|no-cond-assign|
|是否允许使用常量式表达式 if (false) { }|no-constant-condition|
|不允许重复的case变量值|no-duplicate-case|
|不允许给函数重新赋值 |no-func-assign|
|避免书写不可达的代码，比如在return后添加新的代码，或抛出异常，中断语句后|no-unreachable|
|不要用NaN跟变量作比较，而是应该调用 isNaN()|use-isnan|
|在循环或判断语句中是否需要加花括号|curly|
|不允许修改扩展内置对象的属性|no-extend-native|
|switch语句中 case 后必须有break，return或throw|no-fallthrough|
|不允许在循环中定义函数|no-loop-func|
|如果回调函数中有错误变量（比如err），我们需要判断处理错误的情况|handle-callback-err|
|不允许使用嵌套的三元表达式|no-nested-ternary|


> 写在后面
配置文件中还有一些error级别的设置 这里没有一一列出
