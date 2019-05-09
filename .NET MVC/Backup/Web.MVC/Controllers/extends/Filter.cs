using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using System.Text.RegularExpressions;
using System.Text;
using System.Diagnostics;

namespace System
{
    public static class Filter
    {

        /// <summary>
        /// 删除脚本字符。
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public static string FilterHttpGet(this string input)
        {
            if (input == null)
            {
                return "";
            }

            input = input.Trim();
            //删除脚本、注入相关字符
            input = Regex.Replace(input, @"<script[^>]*?>.*?</script>", "", RegexOptions.IgnoreCase);
            input = Regex.Replace(input, @"-->", "", RegexOptions.IgnoreCase);
            input = Regex.Replace(input, @"<!--.*", "", RegexOptions.IgnoreCase);
            input = Regex.Replace(input, @"select", "", RegexOptions.IgnoreCase);
            input = Regex.Replace(input, @"drop", "", RegexOptions.IgnoreCase);
            input = Regex.Replace(input, @"update", "", RegexOptions.IgnoreCase);
            input = Regex.Replace(input, @"insert", "", RegexOptions.IgnoreCase);
            input = Regex.Replace(input, @"delete", "", RegexOptions.IgnoreCase);

            return input;
        }

        /// <summary>
        /// 关键字过滤(包含删除脚本字符)
        /// </summary>
        /// <param name="keywords"></param>
        /// <returns></returns>
        public static string FilterKeywords(this string input)
        {
            if (input == null)
            {
                return "";
            }
            //替换字符
            input = input.Trim().Replace("'", "").Replace(";", " ").Replace('_', ' ');
            //keywords过滤：危险字符去掉，多个空格或英文、中文逗号都替换为一个空格，按一个空格拆分成关键字数组
            return Regex.Replace(input.FilterHttpGet(), @"[\s|,|，]+|\+", " ", RegexOptions.IgnoreCase).Trim();
        }
        

        /// <summary>
        /// 去掉数组中重复记录
        /// 用于去除关键词重复
        /// </summary>
        /// <param name="values"></param>
        /// <returns></returns>
        public static string[] RemoveOverlap(this string[] values)
        {
            List<string> list = new List<string>();
            for (int i = 0; i < values.Length; i++)//遍历数组成员 
            {
                if (list.IndexOf(values[i]) == -1)//对每个成员做一次新数组查询如果没有相等的则加到新数组 
                    list.Add(values[i]);
            }
            return list.ToArray();
        }


        /// <summary>
        /// 将字符串数组转换为整形数组
        /// </summary>
        /// <param name="strArray">需要转换的字符串数组</param>
        /// <returns></returns>
        public static int[] ToIntArray(this string[] strArray)
        {
            int[] result = new int[strArray.Length];
            if (strArray.Length == 1 && strArray[0] == "")
            {
                return null;
            }
            for (int tmp = 0; tmp < strArray.Length; tmp++)
            {
                result[tmp] = Convert.ToInt32(strArray[tmp]);
            }
            return result;
        }

        /// <summary>
        /// 检查相关下载或文章的suitableModels中是否含有指定型号或类别关键字
        /// </summary>
        /// <param name="model">761 5200L</param>
        /// <param name="suitableModels">761 5200L</param>
        /// <returns></returns>
        public static bool CheckSuitableModels(this string suitableModels, string model)
        {
            string[] keys = suitableModels.Replace('，', ',').Split(',');
            return keys.Contains(model);
        }

        /// <summary>
        /// 重载1：检查相关下载或文章的suitableModels中是否含有指定型号或类别关键字
        /// </summary>
        public static bool CheckSuitableModels(this string suitableModels, string[] model)
        {
            string[] keys = suitableModels.Replace('，', ',').Split(',');

            foreach (string m in model)
            {
                if (keys.Contains(m))
                    return true;
            }
            return false;
        }


        /// <summary>
        /// 查看型号或者名称是否包含某个关键字
        /// 用于全站搜索
        /// </summary>
        /// <param name="name"></param>
        /// <param name="arrKeywords"></param>
        /// <returns></returns>
        public static bool getTheKeyWord(this string name, string[] arrKeywords)
        {
            return arrKeywords.Any(tmp => name.ToLower().Contains(tmp.ToLower()));
        }


        /// <summary>
        /// 判断文档内部分类(id)是否和某产品列表的内部分类(List<id>)有交集
        /// 用于获取服务至此某产品的相关FAQ文档
        /// </summary>
        /// <param name="suitableClass"></param>
        /// <param name="list"></param>
        /// <returns></returns>
        public static bool isInClassIdList(this string suitableClass,List<int> list)
        {
            if (string.IsNullOrEmpty(suitableClass)) return false;
            var classArr = suitableClass.Split(',');
            return list.Any(id => classArr.Contains(id.ToString()));
        }
    }
}
