<%@ Page Language="C#" %>
<%@ Import Namespace="System.Collections.Generic" %>
<%@ Import Namespace="System.Linq" %>
<%@ Import Namespace="System.IO" %>

<%@ Import Namespace="System.Web.Script.Serialization" %>
<%@ Import Namespace="System.Net" %>


<script runat="server">    
    string detailDefault = string.Format("{{\"code\":0,\"data\":{{\"ip\":\"\",\"country\":\"\",\"area\":\"\",\"region\":\"\",\"city\":\"\",\"county\":\"\",\"isp\":\"\",\"country_id\":\"\",\"area_id\":\"\",\"region_id\":\"\",\"city_id\":\"local\",\"county_id\":\"local\",\"isp_id\":\"local\"}}}}");
    string detailError = string.Format("{{\"code\":0,\"data\":{{\"ip\":\"\",\"country\":\"服务器忙，请稍后再试！\",\"area\":\"\",\"region\":\"\",\"city\":\"\",\"county\":\"\",\"isp\":\"\",\"country_id\":\"\",\"area_id\":\"\",\"region_id\":\"\",\"city_id\":\"local\",\"county_id\":\"local\",\"isp_id\":\"local\"}}}}");
    string detailNoResult = string.Format("{{\"code\":0,\"data\":{{\"ip\":\"\",\"country\":\"未找到相关结果！\",\"area\":\"\",\"region\":\"\",\"city\":\"\",\"county\":\"\",\"isp\":\"\",\"country_id\":\"\",\"area_id\":\"\",\"region_id\":\"\",\"city_id\":\"local\",\"county_id\":\"local\",\"isp_id\":\"local\"}}}}");
    string userIp = "";
    string userIpDetail = "";
    string searchIp = "";
    string searchIpDetail = "";
    
    protected void Page_Load(object sender, EventArgs e)
    {
        userIpDetail = (null == Request.QueryString["userIpDetail"] || "服务器忙，请稍后再试！" == Request.QueryString["userIpDetail"].ToString()) ? detailDefault : string.Format("{{\"code\":0,\"data\":{{\"ip\":\"\",\"country\":\"{0}\",\"area\":\"\",\"region\":\"\",\"city\":\"\",\"county\":\"\",\"isp\":\"\",\"country_id\":\"\",\"area_id\":\"\",\"region_id\":\"\",\"city_id\":\"local\",\"county_id\":\"local\",\"isp_id\":\"local\"}}}}", Request.QueryString["userIpDetail"].ToString());
        searchIp = null == Request.QueryString["searchIp"] ? "" : Request.QueryString["searchIp"].ToString();
        searchIpDetail = detailDefault;

        try
        {
            userIp = GetRealIp();
        }
        catch
        {
            userIp = "<font color=\"red\">无法获取用户IP</font>";
        }
        
        if (null == Application["getIPTime"])
        {
            Application["getIPTime"] = GetTimeStamp();
            if (userIpDetail == detailDefault)
            {
                userIpDetail = GetIPDetail(userIp);
            }
            else
            {
                searchIpDetail = GetIPDetail(searchIp);
                if (searchIpDetail.IndexOf("country\":\"\"") > -1)
                {
                    searchIpDetail = detailNoResult;
                }
            }
        }
        else
        {
            long currentTime = Convert.ToInt64(GetTimeStamp());
            long oldTime = Convert.ToInt64(Application["getIPTime"]);
            //对比时间差大于1秒
            if ((currentTime - oldTime) > 2000)
            {
                if (userIpDetail == detailDefault)
                {
                    userIpDetail = GetIPDetail(userIp);
                }
                else
                {
                    searchIpDetail = GetIPDetail(searchIp);
                    if (searchIpDetail.IndexOf("country\":\"\"") > -1)
                    {
                        searchIpDetail = detailNoResult;
                    }
                }
                Application["getIPTime"] = currentTime;
            }
            else
            {
                if (userIpDetail == detailDefault)
                {
                    userIpDetail = detailError;
                }
                else
                {
                    searchIpDetail = detailError;
                }
            }
        }
    }
    
    /// <summary>
    ///     获取用户IP
    /// </summary>
    /// <returns></returns>
    public static string GetRealIp()
    {
        var result = String.Empty;
        //cdn ip
        if (HttpContext.Current.Request.Headers["Cdn-Src-Ip"] != null)
        {
            result = HttpContext.Current.Request.Headers["Cdn-Src-Ip"];
            if (IsIpAddress(result))
            {
                return result;
            }
        }
        result = HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
        if (result != null && result != String.Empty)
        {
            //可能有代理 
            if (result.IndexOf(".") == -1)
            {
                //没有“.”肯定是非IPv4格式 
                result = null;
            }
            else
            {
                if (result.IndexOf(",") != -1)
                {
                    //有“,”，估计多个代理，取第一个不是内网的IP。 
                    result = result.Replace(" ", "").Replace("'", "");
                    var temparyip = result.Split(",;".ToCharArray());
                    for (var i = 0; i < temparyip.Length; i++)
                    {
                        if (IsIpAddress(temparyip[i])
                            && temparyip[i].Substring(0, 3) != "10."
                            && temparyip[i].Substring(0, 7) != "192.168"
                            && temparyip[i].Substring(0, 4) != "172.")
                        {
                            return temparyip[i]; //找到不是内网的地址 
                        }
                    }
                }
                else if (IsIpAddress(result)) //代理即是IP格式 
                    return result;
                else
                    result = null; //代理中的内容 非IP，取IP 
            }
        }

        if (result == null || result == String.Empty)
        {
            result = HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
            if (result == "::1")
                result = "127.0.0.1";
        }
        return result;
    }
    

    /// <summary>
    ///     判断是否是ip格式
    /// </summary>
    /// <param name="ip"></param>
    /// <returns></returns>
    private static bool IsIpAddress(string ip)
    {
        IPAddress tip;
        return IPAddress.TryParse(ip, out tip);
    }
    
    /// <summary>
    ///  向支付宝发请求
    /// </summary>
    /// <param name="ip"></param>
    /// <returns></returns>
    /// 
    private string GetIPDetail(string ip)
    {
        var request = (HttpWebRequest)WebRequest.Create("http://ip.taobao.com/service/getIpInfo.php?ip="+ip);
        var response = (HttpWebResponse)request.GetResponse();
        return new StreamReader(response.GetResponseStream()).ReadToEnd();
    }
    
    /// <summary>
    ///  获取时间戳
    /// </summary>
    /// <returns></returns>
    /// 
    public string GetTimeStamp()
    {
        TimeSpan ts = DateTime.UtcNow - new DateTime(1970, 1, 1, 0, 0, 0, 0);
        return Convert.ToInt64(ts.TotalMilliseconds).ToString();
    }
    
</script>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta content="yes" name="apple-mobile-web-app-capable" />
    <meta content="black" name="apple-mobile-web-app-status-bar-style" />
    <meta content="telephone=no" name="format-detection" />
    <link rel="stylesheet" href="/Content/searchStyle.css" type="text/css" />
    <title>IP地址查询</title>
</head>

<body>
    <div class="content">
        <header>
            <h2 id="Web_title">IP地址查询</h2>
        </header>
        <p>您的IP是：<%=userIp %></p>
        <p>来自：</p>
        <input type="text" readonly="readonly" id="ip-city" value="服务器忙请稍后再试"/>
        <p>IP地址：</p>
        <div class="ip-addr-input">
            <input type = "number" value="<%=searchIp.Length >0 ? searchIp.Split('.')[0] : ""%>" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')" size = 3 max=3 id="ipInput1" class="ipInput">     
            <input type = "number" value="<%=searchIp.Length >0 ? searchIp.Split('.')[1] : ""%>" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')" size = 3 max=3 id="ipInput2" class="ipInput">
            <input type = "number" value="<%=searchIp.Length >0 ? searchIp.Split('.')[2] : ""%>" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')" size = 3 max=3 id="ipInput3" class="ipInput">
            <input type = "number" value="<%=searchIp.Length >0 ? searchIp.Split('.')[3] : ""%>" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')" size = 3 max=3 id="ipInput4" class="ipInput">  
        </div>
        <p class="caculate"><button onclick="ipSearch()">查询</button></p>
        <p id="ipsearch-result1">您查询的IP：</p>
        <p class="indent"><%=searchIp %></p>
        <p id="ipsearch-result2">查询结果：</p>
        <p class="indent" id="ipsearch-result-content"></p>
        <%--<p><%=userIpDetail %></p>
        <p><%=searchIpDetail %></p>--%>
    </div>
    <script>
        window.onload = function () {
            //ip自动跳格
            var ipInput = document.getElementsByClassName('ipInput');
            function moveNextId(index,keyCode) {
                if (ipInput[index].value.length >= 3 && keyCode != 8) {
                    ipInput[index].value = ipInput[index].value.slice(0,3);
                    ipInput[index + 1].focus();
                }
                if (ipInput[index].value.length == 0 && keyCode == 8) {
                    ipInput[index - 1].focus();
                    var text = ipInput[index - 1].value;
                    ipInput[index - 1].value = "";
                    ipInput[index - 1].value = text;
                }
            }

            for (var i = 0; i < ipInput.length; i++) {
                (function (i) {
                    ipInput[i].addEventListener("keyup", function (e) {
                        moveNextId(i, e.keyCode)
                    }, false);
                    ipInput[i].addEventListener("keydown", function (e) {
                        moveNextId(i, e.keyCode);
                    }, false);
                }(i))
            }

            var userIpDetail = <%=userIpDetail %>;
            var searchIpDetail = <%=searchIpDetail %>;
            document.getElementById('ip-city').value = userIpDetail.data.country.replace("XX","") + userIpDetail.data.region.replace("XX","") + userIpDetail.data.city.replace("内网IP","").replace("XX","") + userIpDetail.data.county.replace("内网IP","").replace("XX","") + userIpDetail.data.isp.replace("XX",""); 
            document.getElementById('ipsearch-result-content').innerHTML = searchIpDetail.data.country.replace("XX","") + searchIpDetail.data.region.replace("XX","") + searchIpDetail.data.city.replace("内网IP","").replace("XX","") + searchIpDetail.data.county.replace("内网IP","").replace("XX","") + searchIpDetail.data.isp.replace("XX",""); 
        }
        //ip查询
        function ipSearch() {
            var ipAddr = "";
            var ipInput = document.getElementsByClassName('ipInput');
            for (var j = 0; j < ipInput.length; j++) {
                var ipAddrCurrent = ipInput[j].value;
                //输入框为数字且不为空
                if (ipAddrCurrent.length < 1 || parseInt(ipAddrCurrent) !== parseInt(ipAddrCurrent)) {
                    ipAddrCurrent = '0'
                }
                if (j == 0) {
                    ipAddr += ipAddrCurrent;
                } else {
                    ipAddr += '.' + ipAddrCurrent;
                }

            }
            window.location.href = window.location.origin + window.location.pathname + "?searchIp=" + ipAddr +"&userIpDetail=" + document.getElementById('ip-city').value;
        }
        
    </script>
</body>
</html>
