<style lang="less">
    @import "../assets/less/main";
</style>
<template>
    <div class="list">
        <div class="main center-page">
            <div class="type-pnl">
                <ul class="type-list">
                    <li v-for="type in types" @click="onTabSelect(type.value)" :key="type.value">{{type.text}}</li>
                </ul>
            </div>
            <ul class="list-container">
                <li v-for="(item, i) in list" :key="item.id">
                    <span class="index" :title="i + 1">{{(i + 1) > 9999 ? "..." : (i + 1)}}</span>
                    <span class="face">
                        <img :src="item.author.avatar_url" alt="" :title="item.author.loginname"/>
                    </span>
                    <span :class="{type: item.tab, good: item.good}" v-if="item.tab">{{item.tab | tab}}</span>
                    <span class="name" :title="item.title">{{item.title}}</span>
                </li>
            </ul>
            <div class="load-more">
                <span class="prev" @click="prev" v-show="page != 1">上一页</span>
                <span class="next" @click="next">下一页</span>
            </div>
        </div>
        <div class="bg"></div>
    </div>
</template>

<script>
    import $ from "jquery";
    import common from "../lib/common";
    import {
        Indicator
    } from 'mint-ui';
    export default {
        data() {
            return {
                list: [],
                types: [],
                tab: "",
                page: 1
            }
        },
        computed: {
            isPhone() {
                // 判断是否在移动端，暂时没什么作用
                console.log(common.isPhone());
                return common.isPhone();
            }
        },
        mounted() {
            // 设置默认页数
            this.page = parseInt(this.$route.query.page) || 1;
            // 设置默认分类
            this.tab = this.$route.query.tab;
            // 请求数据
            this.getData();
            // 设置默认头部分类
            this.types = [{
                text: "全部",
                value: ""
            }, {
                text: "精华",
                value: "good"
            }, {
                text: "分享",
                value: "share"
            }, {
                text: "招聘",
                value: "job"
            }, {
                text: "回答",
                value: "ask"
            }];
        },
        methods: {
            getData() {
                // 打开loading
                Indicator.open();
                // 请求数据
                common.ajaxGet(common.api + '/topics', {
                    page: this.page, // 页数
                    tab: this.tab // 分类
                }).then(data => {
                    if (data.success) {
                        // 填充数据
                        this.list = data.data;
                        // 移动到顶层
                        $(".list").animate({
                            scrollTop: 0
                        }, 200);
                    }
                    // 关闭loading
                    Indicator.close();
                });
            },
            prev() {
                this.page--;

                // 改变路由
                let query = {
                    page: this.page
                }
                if (this.tab) {
                    query.tab = this.tab;
                }
                this.$router.push({
                    path: 'list',
                    query: query
                })
            },
            next() {
                // 改变当前页数
                this.page++;

                // 改变路由
                let query = {
                    page: this.page
                }
                if (this.tab) {
                    query.tab = this.tab;
                }
                this.$router.push({
                    path: 'list',
                    query: query
                })
            },
            onTabSelect(value) {
                // 改变当前分类
                this.tab = value;
                this.page = 1;

                // 改变路由
                let query = {
                    page: this.page
                }
                if (this.tab) {
                    query.tab = this.tab;
                }
                this.$router.push({
                    path: 'list',
                    query: query
                })
            }
        },
        watch: {
            $route() {
                // 检测路由变化
                this.page = this.$route.query.page || 1;
                this.tab = this.$route.query.tab;

                // 获取数据
                this.getData();
            }
        },
        filters: {
            tab(value) {
                return common.getType(value);
            }
        }
    }
</script>