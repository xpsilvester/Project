//选择组件
Vue.component('Selectbox',{
    data: function () {
        return {
            optiondata:{
                value:'',
                options:['选项1','选项2','选项3','选项4','选项5'],
                title:'* 标题',
                open: false
            }
        }
    },
    props:{
        //optiondata: Object
    },
    methods:{
        manaModeClick:function(){
            this.optiondata.open = !this.optiondata.open
        },
        manaModeChoose:function(index){
            this.optiondata.value = this.optiondata.options[index]
        }
    },
    template: `<div class="info-box">
                    <p class="title">{{optiondata.title}}</p>
                    <div class="select-box" :class="optiondata.open ? 'open' : ''" @click="manaModeClick">
                        <span :class="optiondata.value == '' ? '':'active'">{{ optiondata.value == '' ? '请选择' : optiondata.value }}</span>
                        <div class="select-options">
                            <p :class="optiondata.value == item ? 'selected' : ''" v-for="(item,index) in optiondata.options" :key="index" @click="manaModeChoose(index)">{{item}}</p>
                        </div>
                    </div>
                </div>`,
    created(){
        //console.log(this.optiondata)
    }
})