## 用户操作相关接口

----------------------------
### 1、登录admin/login 'post'   
传参：username、password

### 2、退出admin/logout 'get'   

### 3、冻结/解冻用户  /admin/users/changeStatus?type=unfreeze&username=erp 'get'    
传参：
   type(不传或者传空时 默认是freeze冻结，解冻传unfreeze)   
   username(用户erp)  

### 4、改变用户角色 /admin/users/changeRole?username=erp&role=1 'get'   
第3、4条接口成功时均返回：
```
{
    "code":"0",
    "msg":"成功",
    "data":{
        "userName":"liyue38",
        "role":"1",
        "status":1
    }
}
```
### 5、获取登录用户信息 /admin/users/userInfo 'get'   
获取成功返回：   
```
{
    "code":"0",
    "data":
    {
        "username":"liyue38",
        "status":0,
        "role":"0"
    },
    "msg":"成功"
}
```
获取失败直接跳转到登录页   

### 6、条件查询用户列表 /admin/users/userList 'get'   

传参：   
     status  role  userName  也可以什么都不传，返回所有用户列表    
返回：
```
{
    "code":"0",
    "msg":"成功",
    "data":[
        {
            "_id":"582134cdfe6937095471b499",
            "userName":"liyue38",
            "role":"0",
            "status":0
        },
        {
            "_id":"582185be5812e211dc13954d",
            "userName":"liuzhancai",
            "role":"0",
            "status":0
        },
        ...
    ]
}
```
以上接口失败时均返回：   
```
{
    "code":"-1",
    "msg":"未登录/不是管理员/参数错误/其他数据库错误信息等",
    "data":null
}
```   