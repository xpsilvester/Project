<template>
    <div id="chat">
        <c-dialog
            ref="loginDialog"
            title='请输入你的昵称'
            confirmBtn="start chat"
            @confirm="login"
        >
            <input class="nickname" v-model="nickname" type="text" placeholder="请输入你的昵称">
        </c-dialog>
        <div class="web-im">
            <div class="header im-title">Chat</div>
            <div class="content im-record">
            <div class="li" :class="{user: item.uid == uid}" v-for="item in messageList" :key="item.date">
                <template v-if="item.type===1">
                    <p class="join-tips">{{item.msg}}</p>
                </template>
                <template v-else>
                    <div class="img">{{item.nickname}}</div>
                    <p class="message-box">{{item.msg}}</p>
                </template>
            </div>
            </div>
            <div class="footer im-input">
            <input type="text" v-model="msg" placeholder="请输入内容">
            <button @click="send">发送</button>
            </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
import cdialog from '@/components/dialog/index.vue'

export default {
    data(){
        return {
            uid: '',
            nickname: 'xpsilvester',
            socket: '',
            msg: '',
            messageList: []
        }
    },
    components: {
        'c-dialog':cdialog
    },
    mounted() {
        let vm = this;
        let user = localStorage.getItem('WEB_IM_USER');
        user = user && JSON.parse(user) || {};
        vm.uid = user.uid;
        vm.nickname = user.nickname;
        if(!vm.uid){
            vm.$refs.loginDialog.show()
        } else {
            vm.conWebSocket();
        }
        document.onkeydown = function (event) {
            var e = event || window.event;
            if (e && e.keyCode == 13) { //回车键的键值为13
                vm.send()
            }
        }
        window.onbeforeunload = function (e) {
            vm.socket.send(JSON.stringify({
                uid: vm.uid,
                type: 2,
                nickname: vm.nickname,
                bridge: []
            }));
        }
    },
    methods:{
        send(){
            if(!this.msg){
                return
            }
            this.sendMessage(2,this.msg)
        },
        sendMessage(type,msg){
            this.socket.send(JSON.stringify({
                uid: this.uid,
                type: type,
                nickname: this.nickname,
                msg: msg
            }))
            this.msg = '';
        },
        conWebSocket(){
            let vm = this;
            if(window.WebSocket){
                vm.socket = new WebSocket('ws://localhost:8001');
                let socket = vm.socket;

                socket.onopen = function(e){
                    console.log("连接服务器成功");
                    if(!vm.uid){
                        // 生成新的用户id,并存入localStorage
                        vm.uid = 'web_im_' + moment().valueOf();
                        localStorage.setItem('WEB_IM_USER', JSON.stringify({
                            uid: vm.uid,
                            nickname: vm.nickname
                        }))
                        vm.sendMessage(1)
                    }
                }
                    socket.onclose = function(e){
                    console.log("服务器关闭");
                }
                socket.onerror = function(){
                    console.log("连接出错");
                }
                // 接收服务器的消息
                socket.onmessage = function(e){
                    let message = JSON.parse(e.data);
                    console.log(message)
                    vm.messageList.push(message);
                }   
            }
        },
        login(){
            this.$refs.loginDialog.hide()
            this.conWebSocket()
        }
    }
}
</script>