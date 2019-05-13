<%@ Page Language="C#" %>
<%@ Import Namespace="System.Collections.Generic" %>
<%@ Import Namespace="System.Linq" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Web.Script.Serialization" %>
<%@ Import Namespace="System.Windows" %>


<script runat="server">
    Dictionary<string, string> context = new Dictionary<string, string>();
    string macCompany = "";
    string macCompanyAddr1 = "";
    string macCompanyAddr2 = "";
    string macCompanyAddr3 = "";
    string comKey = "";
    
    protected void Page_Load(object sender, EventArgs e)
    {
        string macKey = (null == Request.QueryString["mackey"] || Request.QueryString["mackey"].ToString().Length <= 6) ? string.Empty : Request.QueryString["mackey"].ToString().Substring(0, 6);
        if (string.IsNullOrEmpty(macKey))
        {
            return; 
        }
        comKey = null == Request.QueryString["mackey"] ? "" : Request.QueryString["mackey"].ToString();
        
        if (null == Application["macList"])
        {
            Application["macList"] = ReaderFile();
        }
        
        context = Application["macList"] as Dictionary<string, string>;
        try
        {
            if (context.Keys.Contains(macKey))
            {
                macCompany = context[macKey].ToString().Split(new char[1] { '|' })[0];
                macCompanyAddr1 = context[macKey].ToString().Split(new char[1] { '|' })[1];
                macCompanyAddr2 = context[macKey].ToString().Split(new char[1] { '|' })[2];
                macCompanyAddr3 = context[macKey].ToString().Split(new char[1] { '|' })[3];
            }
            else
            {
                macCompany = "<font color=\"red\">未找到相关记录</font>";
            }
        }
        catch
        {
            macCompany = "<font color=\"red\">未找到相关记录</font>";
        }
        
        //return "";
    }

    public static Dictionary<string, string> ReaderFile()
    {
        string path = HttpContext.Current.Server.MapPath("/Content/mac_addr.txt");
        string fileData = string.Empty;
        Dictionary<string, string> dictionary = new Dictionary<string, string>();
        
        try
        {   ///读取文件的内容      
            StreamReader reader = new StreamReader(path, Encoding.GetEncoding("utf-8"));

            string key = "";
            
            while (reader.Peek() > -1)
            {
                fileData = reader.ReadLine();
                int tabIndex = fileData.LastIndexOf("\t");
                if (fileData.IndexOf("base 16") > -1)
                {
                    key = fileData.Substring(0, 6);
                    try
                    {
                        
                        dictionary.Add(key, fileData.Substring(tabIndex,fileData.Length - tabIndex));
                    }
                    catch
                    {
                        
                    }
                }
                else if (fileData.IndexOf("(hex)") == -1 && key != "" && tabIndex > -1)
                {
                    dictionary[key] = dictionary[key] + "|" + fileData.Substring(tabIndex, fileData.Length - tabIndex);
                }
            }
            reader.Close();
        }
        catch (Exception ex)
        {
            dictionary.Add("err", "服务器内部错误");     
        }      
        return dictionary;
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
    <title>MAC地址查询</title>
</head>

<body>
    <div class="content">
        <header>
            <h2 id="Web_title">MAC地址查询</h2>
        </header>
        <p>MAC地址：</p>
        <div class="ip-addr-input">
            <input type = "text" value="<%=comKey.Length >= 2 ? comKey.Substring(0,2) : ""%>" size = 2 maxlength=2 id="macInput1" class="macInput"><span>-</span>
            <input type = "text" value="<%=comKey.Length >= 4 ? comKey.Substring(2,2) : ""%>" size = 2 maxlength=2 id="macInput2" class="macInput"><span>-</span>
            <input type = "text" value="<%=comKey.Length >= 6 ? comKey.Substring(4,2) : ""%>" size = 2 maxlength=2 id="macInput3" class="macInput"><span>-</span>
            <input type = "text" value="<%=comKey.Length >= 8 ? comKey.Substring(6,2) : ""%>" size = 2 maxlength=2 id="macInput4" class="macInput"><span>-</span>
            <input type = "text" value="<%=comKey.Length >= 10 ? comKey.Substring(8,2) : ""%>" size = 2 maxlength=2 id="macInput5" class="macInput"><span>-</span>
            <input type = "text" value="<%=comKey.Length >= 12 ? comKey.Substring(10,2) : ""%>" size = 2 maxlength=2 id="macInput6" class="macInput">
        </div>
        <p class="caculate"><button onclick="macSearch()">查询</button></p>
        <p id="ipsearch-result1">MAC地址厂商：</p>
        <p><%=macCompany %></p>
        <p class="mac-search-result">厂商地址：</p>
        <div class="mac-search-content">
            <p><%=macCompanyAddr1 %></p>
            <p><%=macCompanyAddr2 %></p>
            <p><%=macCompanyAddr3 %></p>
        </div>
    </div>
    <script>
        window.onload = function () {
            //Mac自动跳格
            var macInput = document.getElementsByClassName('macInput');
            function moveNextId(index, keyCode) {
                if (macInput[index].value.length >= 2 && keyCode != 8) {
                    macInput[index + 1].focus();
                }
                if (macInput[index].value.length == 0 && keyCode == 8) {
                    macInput[index - 1].focus();
                    var text = macInput[index - 1].value;
                    macInput[index - 1].value = "";
                    macInput[index - 1].value = text;
                }
            }

            for (var i = 0; i < macInput.length; i++) {
                (function (i) {
                    macInput[i].addEventListener("keyup", function (e) {
                        moveNextId(i, e.keyCode)
                    }, false);
                    macInput[i].addEventListener("keydown", function (e) {
                        moveNextId(i, e.keyCode);
                    }, false);
                }(i))
            }
        }
        //MAC查询
        function macSearch() {
            var macAddr = "";
            var macInput = document.getElementsByClassName('macInput');
            for (var j = 0; j < macInput.length; j++) {

                var macInputCurrent = document.getElementById('macInput' + (j + 1)).value;

                if (macInputCurrent.length < 1) {
                    macInputCurrent = '00';
                }

                macAddr += macInputCurrent.toUpperCase();

            }
            window.location.href = window.location.origin + window.location.pathname + "?mackey=" + macAddr;

        }
    </script>
</body>
</html>
