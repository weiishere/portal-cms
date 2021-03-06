<article id="document">
    <h2 id="1.1">开发流程示意图</h2>
    <p><img src="//img20.360buyimg.com/wympay/jfs/t3184/43/3988112562/15667/d69670bc/57fc7a85N1b812def.jpg"/></p>

    <h2>产品支持编辑语言</h2>
    <p>服务器支持语言: Java、C#、.NET、PHP</p>
    <p>客户端支持方式：安卓sdk、WAP（Html5）、PC（web）</p>

    <h2 id="1.2">开发平台调用示意图</h2>
    <p><img src="//img30.360buyimg.com/wympay/jfs/t3727/84/27799487/17579/167f364c/57fc7b18N43a4eae4.png"/></p>

    <h2 id="2.1">企业帐户注册接口</h2>
    <p>请求参数对象：EnterRegisterRequestBody</p>
    <p>响应参数对象：EnterRegisterResponseBody</p>
    <p>接口对象及方法：EnterpriseServiceInter.register(EnterRegisterRequestBody)</p>

    <p class="table-title">请求参数对象说明如下：</p>
    <table>
        <tbody>
        <tr>
            <td colspan="4">EnterRegisterRequestBody</td>
        </tr>
        <tr>
            <th>属性名</th>
            <th>类型</th>
            <th>空值</th>
            <th>备注</th>
        </tr>
        <tr>
            <td>merCustomerId</td>
            <td>String</td>
            <td>否</td>
            <td>商户平台用户的唯一标识</td>
        </tr>
        </tbody>
    </table>

    <p class="table-title">响应参数对象说明如下：</p>
    <table>
        <tbody>
        <tr>
            <td colspan="4">EnterRegisterResponseBody</td>
        </tr>
        <tr>
            <th>属性名</th>
            <th>类型</th>
            <th>空值</th>
            <th>备注</th>
        </tr>
        <tr>
            <td>registerLoginName</td>
            <td>String</td>
            <td>否</td>
            <td>注册账户的用户名</td>
        </tr>
        <tr>
            <td>jrMerchantId</td>
            <td>String</td>
            <td>否</td>
            <td>商户号</td>
        </tr>
        <tr>
            <td>alais</td>
            <td>String</td>
            <td>是</td>
            <td>账户别名，1.0.0版本该值暂空</td>
        </tr>
        </tbody>
    </table>

    <h2 id="2.2">企业账户信息查询接口</h2>
    <p>请求参数对象：EnterAccountInfoRequestBody</p>
    <p>响应参数对象：EnterAccountInfoResponseBody</p>
    <p>接口对象及方法：EnterpriseAccountService.queryAccountInfo(EnterAccountInfoRequestBody)</p>

    <p class="table-title">请求参数对象说明如下：</p>
    <table>
        <tbody>
        <tr>
            <td colspan="4">EnterAccountInfoRequestBody</td>
        </tr>
        <tr>
            <th>属性名</th>
            <th>类型</th>
            <th>空值</th>
            <th>备注</th>
        </tr>
        <tr>
            <td>merCustomerId</td>
            <td>String</td>
            <td>否</td>
            <td>商户平台用户的唯一标识</td>
        </tr>
        </tbody>
    </table>

    <p class="table-title">响应参数对象说明如下：</p>
    <table>
        <tbody>
        <tr>
            <td colspan="4">EnterAccountInfoResponseBody</td>
        </tr>
        <tr>
            <th>属性名</th>
            <th>类型</th>
            <th>空值</th>
            <th>备注</th>
        </tr>
        <tr>
            <td>amount</td>
            <td>Long</td>
            <td>否</td>
            <td>可用金额，单位：分</td>
        </tr>
        <tr>
            <td>frozenAmount</td>
            <td>Long</td>
            <td>否</td>
            <td>冻结金额，单位：分</td>
        </tr>
        <tr>
            <td>status</td>
            <td>String</td>
            <td>是</td>
            <td>状态</td>
        </tr>
        </tbody>
    </table>

    <h2 id="2.3">企业实名认证接口（http）</h2>
    <p>接口路径：/mer/realName</p>

    <p class="table-title">请求参数对象说明如下：</p>
    <table>
        <tbody>
        <tr>
            <th>属性名</th>
            <th>类型</th>
            <th>空值</th>
            <th>备注</th>
        </tr>
        <tr>
            <td>version</td>
            <td>String</td>
            <td>否</td>
            <td>接口版本号</td>
        </tr>
        <tr>
            <td>partnerId</td>
            <td>String</td>
            <td>否</td>
            <td>标识商户的唯一标识，由开放平台定义，并提供给商户。</td>
        </tr>
        <tr>
            <td>appId</td>
            <td>String</td>
            <td>否</td>
            <td>商户应用编码（企业编码+应用序号）</td>
        </tr>
        <tr>
            <td>merRequestNo</td>
            <td>String</td>
            <td>否</td>
            <td>商户请求流水号</td>
        </tr>
        <tr>
            <td>merRequestTime</td>
            <td>String</td>
            <td>否</td>
            <td>商户请求时间，格式：yyyyMMddHHmmss</td>
        </tr>
        <tr>
            <td>merCustomerId</td>
            <td>String</td>
            <td>否</td>
            <td>商户平台用户的唯一标识</td>
        </tr>
        <tr>
            <td colspan="4">实名认证参数</td>
        </tr>
        <tr>
            <td>merchantid</td>
            <td>String</td>
            <td></td>
            <td>商户号</td>
        </tr>
        <tr>
            <td>businessLicenseCertify.companyname</td>
            <td>String</td>
            <td></td>
            <td>营业执照公司名</td>
        </tr>
        <tr>
            <td>businessLicenseCertify.licenseCode</td>
            <td>String</td>
            <td></td>
            <td>营业执照号</td>
        </tr>
        <tr>
            <td>businessLicenseCertify.establishDate</td>
            <td>String</td>
            <td></td>
            <td>成立时间</td>
        </tr>
        <tr>
            <td>businessLicenseCertify.startDate</td>
            <td>String</td>
            <td></td>
            <td>开始时间</td>
        </tr>
        <tr>
            <td>businessLicenseCertify.endDate</td>
            <td>String</td>
            <td></td>
            <td>结束时间</td>
        </tr>
        <tr>
            <td>businessLicenseCertify.province</td>
            <td>String</td>
            <td></td>
            <td>省</td>
        </tr>
        <tr>
            <td>businessLicenseCertify.city</td>
            <td>String</td>
            <td></td>
            <td>市</td>
        </tr>
        <tr>
            <td>businessLicenseCertify.address</td>
            <td>String</td>
            <td></td>
            <td>地址</td>
        </tr>
        <tr>
            <td>businessLicenseCertify.businessScope</td>
            <td>String</td>
            <td></td>
            <td>营业范围</td>
        </tr>
        <tr>
            <td>idCardCertify.code</td>
            <td>String</td>
            <td></td>
            <td>法人身份证上号码</td>
        </tr>
        <tr>
            <td>idCardCertify.startDate</td>
            <td>String</td>
            <td></td>
            <td>法人身份证开始日期</td>
        </tr>
        <tr>
            <td>idCardCertify.entDate</td>
            <td>String</td>
            <td></td>
            <td>法人身份证结束日期</td>
        </tr>
        <tr>
            <td>idCardCertify.name</td>
            <td>String</td>
            <td></td>
            <td>法人身份证上姓名</td>
        </tr>
        <tr>
            <td>proxyIdCertify.code</td>
            <td>String</td>
            <td></td>
            <td>代理人身份证号码</td>
        </tr>
        <tr>
            <td>proxyIdCertify.name</td>
            <td>String</td>
            <td></td>
            <td>代理人身份证上姓名</td>
        </tr>
        <tr>
            <td>proxyIdCertify.startDate</td>
            <td>String</td>
            <td></td>
            <td>代理人开始日期</td>
        </tr>
        <tr>
            <td>proxyIdCertify.entDate</td>
            <td>String</td>
            <td></td>
            <td>代理人结束日期</td>
        </tr>
        <tr>
            <td>orgCodeCertify.code</td>
            <td>String</td>
            <td></td>
            <td>组织机构代码</td>
        </tr>
        <tr>
            <td>orgCodeCertify.startDate</td>
            <td>String</td>
            <td></td>
            <td>组织机构代码证开始时间</td>
        </tr>
        <tr>
            <td>orgCodeCertify.endDate</td>
            <td>String</td>
            <td></td>
            <td>组织结构代码证结束时间</td>
        </tr>
        <tr>
            <td>taxCertify.taxCode</td>
            <td>String</td>
            <td></td>
            <td>税务登记证号码</td>
        </tr>
        <tr>
            <td colspan="4">图片参数</td>
        </tr>
        <tr>
            <td>businessLicenseCertify.img</td>
            <td>String</td>
            <td></td>
            <td>营业执照图片地址（本地路径）</td>
        </tr>
        <tr>
            <td>idCardCertify.img</td>
            <td>String</td>
            <td></td>
            <td>身份证正面图片地址（本地路径）</td>
        </tr>
        <tr>
            <td>idCardCertify.backImg</td>
            <td>String</td>
            <td></td>
            <td>身份证背面图片地址（本地路径）</td>
        </tr>
        <tr>
            <td>proxyIdCertify.img</td>
            <td>String</td>
            <td></td>
            <td>代理人身份证正面图片地址（本地路径）</td>
        </tr>
        <tr>
            <td>proxyIdCertify.backImg</td>
            <td>String</td>
            <td></td>
            <td>代理人身份证背面图片地址（本地路径）</td>
        </tr>
        <tr>
            <td>orgCodeCertify.img</td>
            <td>String</td>
            <td></td>
            <td>组织机构代码证图片（本地路径）</td>
        </tr>
        <tr>
            <td>taxCertify.img</td>
            <td>String</td>
            <td></td>
            <td>税务登记证图片地址（本地路径）</td>
        </tr>
        <tr>
            <td>openAccountCertify.img</td>
            <td>String</td>
            <td></td>
            <td>银行开户正面图片地址（本地路径）</td>
        </tr>
        <tr>
            <td>proxyLetterCertify.img</td>
            <td>String</td>
            <td></td>
            <td>代理人的委托书图片地址（本地路径）</td>
        </tr>
        </tbody>
    </table>

    <p class="table-title">响应参数对象说明如下：</p>
    <table>
        <tbody>
        <tr>
            <td colspan="4">EnterAccountInfoResponseBody</td>
        </tr>
        <tr>
            <th>属性名</th>
            <th>类型</th>
            <th>空值</th>
            <th>备注</th>
        </tr>
        <tr>
            <td>resultCode</td>
            <td>string</td>
            <td>否</td>
            <td>00000：成功</td>
        </tr>
        </tbody>
    </table>

    <h2 id="3.1">H5组件通用调用</h2>
    <p>请求参数对象：HapiLoginRequestBody 和 HttpServletResponse</p>
    <p>响应参数对象：异常情况下返回CommonResponseHeader</p>
    <p>&nbsp;</p>
    <p>接口对象及方法：</p>
    <p>企业调用HapiLoginService. enterLoginIn()</p>
    <p>个人调用HapiLoginService. personalLoginIn()</p>

    <p class="table-title">请求参数对象说明如下：</p>
    <table>
        <tbody>
        <tr>
            <td colspan="4">HapiLoginRequestBody</td>
        </tr>
        <tr>
            <th>属性名</th>
            <th>类型</th>
            <th>空值</th>
            <th>备注</th>
        </tr>
        <tr>
            <td>merCustomerId</td>
            <td>string</td>
            <td>否</td>
            <td>商户平台用户的唯一标识</td>
        </tr>
        <tr>
            <td>componentCode</td>
            <td>string</td>
            <td>否</td>
            <td>组件编码，标识一个组件</td>
        </tr>
        <tr>
            <td>extJson</td>
            <td>string</td>
            <td>是</td>
            <td>拓展属性，按照约定传递json串（参数的具体格式与componentCode相关，<br/>详情见5.3 组件扩展参数说明）</td>
        </tr>
        </tbody>
    </table>

    <p class="table-title">响应参数对象说明如下：</p>
    <p>访问H5组件过程，异常处理返回通用响应头对象CommonResponseHeader；正常处理不存在同步返回数据对象，直接完成组件访问</p>

    <h2 id="4.1">个人账户注册</h2>
    <p>请求参数对象：PersonalRegisterRequestBody</p>
    <p>响应参数对象：PersonalRegisterResponseBody</p>
    <p>接口对象及方法：PersonalBaseSerivice.register()</p>

    <p class="table-title">请求参数对象说明如下：</p>
    <table>
        <tbody>
        <tr>
            <td colspan="4">PersonalRegisterRequestBody</td>
        </tr>
        <tr>
            <th>属性名</th>
            <th>类型</th>
            <th>空值</th>
            <th>备注</th>
        </tr>
        <tr>
            <td>merCustomerId</td>
            <td>String</td>
            <td>否</td>
            <td>商户平台用户的唯一标识</td>
        </tr>
        <tr>
            <td>jrUserMobile</td>
            <td>String</td>
            <td rowspan="2">不能同时为空</td>
            <td>用户绑定的手机号</td>
        </tr>
        <tr>
            <td>jrUserEmail</td>
            <td>String</td>
            <td>用户绑定的email</td>
        </tr>
        <tr>
            <td>JrNickName</td>
            <td>String</td>
            <td>可空</td>
            <td>昵称</td>
        </tr>
        </tbody>
    </table>

    <p class="table-title">响应参数对象说明如下：</p>
    <table>
        <tbody>
        <tr>
            <td colspan="4">PersonalRegisterResponseBody</td>
        </tr>
        <tr>
            <th>属性名</th>
            <th>类型</th>
            <th>空值</th>
            <th>备注</th>
        </tr>
        <tr>
            <td>jrId</td>
            <td>String</td>
            <td>否</td>
            <td>金融会员ID</td>
        </tr>
        <tr>
            <td>merCustomerId</td>
            <td>String</td>
            <td>否</td>
            <td>商户平台用户的唯一标识</td>
        </tr>
        <tr>
            <td>status</td>
            <td>String</td>
            <td>是</td>
            <td>会员状态</td>
        </tr>
        </tbody>
    </table>

    <h2 id="4.2">个人账户信息查询</h2>
    <p>请求参数对象：PersonalAccountInfoRequestBody</p>
    <p>响应参数对象：PersonalAccountInfoResponseBody</p>
    <p>接口对象及方法：PersonalAccountService.queryAccountInfo()</p>

    <p class="table-title">请求参数对象说明如下：</p>
    <table>
        <tbody>
            <tr>
                <td colspan="4">PersonalAccountInfoRequestBody</td>
            </tr>
            <tr>
                <th>属性名</th>
                <th>类型</th>
                <th>空值</th>
                <th>备注</th>
            </tr>
            <tr>
                <td>merCustomerId</td>
                <td>String</td>
                <td>否</td>
                <td>商户平台用户的唯一标识</td>
            </tr>
        </tbody>
    </table>

    <p class="table-title">响应参数对象说明如下：</p>
    <table>
        <tbody>
            <tr>
                <td colspan="4">PersonalAccountInfoResponseBody</td>
            </tr>
            <tr>
                <th>属性名</th>
                <th>类型</th>
                <th>空值</th>
                <th>备注</th>
            </tr>
            <tr>
                <td>jrId</td>
                <td>String</td>
                <td>否</td>
                <td>金融会员ID</td>
            </tr>
            <tr>
                <td>merCustomerId</td>
                <td>String</td>
                <td>否</td>
                <td>商户平台用户的唯一标识</td>
            </tr>
            <tr>
                <td>status</td>
                <td>String</td>
                <td>否</td>
                <td>会员状态</td>
            </tr>
            <tr>
                <td>registerDate</td>
                <td>Date</td>
                <td>是</td>
                <td>注册时间</td>
            </tr>
            <tr>
                <td>jrUserMobile</td>
                <td>String</td>
                <td>是</td>
                <td>绑定手机号</td>
            </tr>
            <tr>
                <td>jrUserEmail</td>
                <td>String</td>
                <td>是</td>
                <td>绑定邮箱</td>
            </tr>
        </tbody>
    </table>

    <h2 id="5.1">余额支付收单接口</h2>
    <p>请求参数对象：BanlancepayOrderRequestBody</p>
    <p>响应参数对象：BanlancepayOrderReponseBody</p>
    <p>接口对象及方法：BanlancepayService.order()</p>

    <p class="table-title">请求参数对象说明如下：</p>
    <table>
        <tbody>
            <tr>
                <td colspan="4">BanlancepayOrderRequestBody</td>
            </tr>
            <tr>
                <th>属性名</th>
                <th>类型</th>
                <th>空值</th>
                <th>备注</th>
            </tr>
            <tr>
                <td>merCustomerId</td>
                <td>String</td>
                <td>否</td>
                <td>商户平台用户的唯一标识</td>
            </tr>
            <tr>
                <td>merOrderNo</td>
                <td>String</td>
                <td>否</td>
                <td>商户订单号，唯一定位一笔订单</td>
            </tr>
            <tr>
                <td>orderAmount</td>
                <td>Long</td>
                <td>否</td>
                <td>单位：分</td>
            </tr>
            <tr>
                <td>memo</td>
                <td>String</td>
                <td>是</td>
                <td>订单概述，限制30中文</td>
            </tr>
        </tbody>
    </table>

    <p class="table-title">响应参数对象说明如下：</p>
    <table>
        <tbody>
            <tr>
                <td colspan="4">BanlancepayOrderReponseBody</td>
            </tr>
            <tr>
                <th>属性名</th>
                <th>类型</th>
                <th>空值</th>
                <th>备注</th>
            </tr>
            <tr>
                <td>merCustomerId</td>
                <td>String</td>
                <td>否</td>
                <td>商户平台用户的唯一标识</td>
            </tr>
            <tr>
                <td>merOrderNo</td>
                <td>String</td>
                <td>否</td>
                <td>商户订单号，唯一定位一笔订单</td>
            </tr>
            <tr>
                <td>orderAmount</td>
                <td>Long</td>
                <td>否</td>
                <td>单位：分</td>
            </tr>
            <tr>
                <td>orderCode</td>
                <td>String</td>
                <td>是</td>
                <td>收单成功，金融返回该笔订单的流水号，在支付环节需要回传至收银台</td>
            </tr>
        </tbody>
    </table>

    <h2 id="6.1">接口文档下载</h2>
    <a class="download-btn" href="document/document.zip"> 文档下载</a>

</article>