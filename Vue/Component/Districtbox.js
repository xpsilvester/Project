//省市区联动组件
Vue.component('Districtbox', {
    data: function () {
        return {
            cityData:[],
            provinces:[
                //A-G
                {
                    name: '北京',
                    value: 0
                },
                {
                    name: '安徽',
                    value: 11
                },
                {
                    name: '重庆',
                    value: 21
                },
                {
                    name: '福建',
                    value: 12
                },
                {
                    name: '广东',
                    value: 18
                },
                {
                    name: '广西',
                    value: 19
                },
                {
                    name: '贵州',
                    value: 23
                },
                {
                    name: '甘肃',
                    value: 27
                },
                //H-K
                {
                    name: '河北',
                    value: 2
                },
                {
                    name: '河南',
                    value: 15
                },
                {
                    name: '吉林',
                    value: 6
                },
                {
                    name: '黑龙江',
                    value: 7
                },
                {
                    name: '江苏',
                    value: 9
                },
                {
                    name: '江西',
                    value: 13
                },
                {
                    name: '湖北',
                    value: 16
                },
                {
                    name: '湖南',
                    value: 17
                },
                {
                    name: '海南',
                    value: 20
                },
                //L-S
                {
                    name: '山东',
                    value: 14
                },
                {
                    name: '山西',
                    value: 3
                },
                {
                    name: '陕西',
                    value: 26
                },
                {
                    name: '内蒙古',
                    value: 4
                },
                {
                    name: '辽宁',
                    value: 5
                },
                {
                    name: '上海',
                    value: 8
                },
                {
                    name: '四川',
                    value: 22
                },
                {
                    name: '青海',
                    value: 28
                },
                {
                    name: '宁夏',
                    value: 29
                },
                //T-Z
                {
                    name: '天津',
                    value: 1
                },
                {
                    name: '西藏',
                    value: 25
                },
                {
                    name: '新疆',
                    value: 30
                },
                {
                    name: '云南',
                    value: 24
                },
                {
                    name: '浙江',
                    value: 10
                },
            ],
            citys:[],
            areas:[],
            regisaddr: {
                province:'',
                city:'',
                areas:'',
                addrDetail:'',
                provincesOpen:false,
                cityOpen: false,
                areasOpen:false,
                open:false,
                title:'地址'
            }
        }
    },
    props:{
        //regisaddr: Object
    },
    methods:{
        //省点击
        provinceClick:function(){
            this.regisaddr.cityOpen = false
            this.regisaddr.areasOpen = false
            this.regisaddr.provincesOpen = !this.regisaddr.provincesOpen
            this.regisaddr.open = this.regisaddr.provincesOpen
        },
        //省选择
        provinceChoose:function(item){
            //console.log(item)
            this.regisaddr.areasOpen = false
            this.regisaddr.provincesOpen = false
            this.regisaddr.province = item.name
            this.citys = this.cityData[item.value].city
            this.regisaddr.city = ''
            this.regisaddr.areas = ''
            this.regisaddr.cityOpen = true
        },
        //市点击
        cityClick:function(){
            this.regisaddr.provincesOpen = false
            this.regisaddr.areasOpen = false
            this.regisaddr.cityOpen = !this.regisaddr.cityOpen
            this.regisaddr.open = this.regisaddr.cityOpen
        },
        //市选择
        cityChoose:function(item){
            this.regisaddr.cityOpen = false
            this.regisaddr.city = item.name
            this.areas = item.area
            this.regisaddr.areas = ''
            this.regisaddr.areasOpen = true
        },
        //区点击
        areasClick:function(){
            this.regisaddr.provincesOpen = false
            this.regisaddr.cityOpen = false
            this.regisaddr.areasOpen = !this.regisaddr.areasOpen
            this.regisaddr.open = this.regisaddr.areasOpen
        },
        //区选择
        areasChoose:function(item){
            this.regisaddr.cityOpen = false
            this.regisaddr.areasOpen = false
            this.regisaddr.open = false
            this.regisaddr.areas = item
        }
    },
    template: `<div class="info-box">
                <p class="title">{{regisaddr.title}}</p>
                <div class="select-box" :class="regisaddr.open ? 'open' : ''">
                    <span @click="provinceClick" :class="regisaddr.province == '' ? '' : 'active'">{{regisaddr.province == '' ? '' : regisaddr.province }}省</span>
                    /<span @click="cityClick" :class="regisaddr.city == '' ? '' : 'active'">{{regisaddr.city == '' ? '' : regisaddr.city }}市</span>
                    /<span @click="areasClick" :class="regisaddr.areas == '' ? '' : 'active'">{{regisaddr.areas == '' ? '区' : regisaddr.areas }}</span>
                    <div class="province-options" v-show="regisaddr.provincesOpen">
                        <div class="letter">A-G</div>
                        <div class="province-item">
                            <p v-for="(item,index) in provinces" :key="index" v-if="index <  8" @click="provinceChoose(item)">{{item.name}}</p>
                        </div>
                        <div class="clear" style="height:12px"></div>
                        <div class="letter">H-K</div>
                        <div class="province-item">
                            <p v-for="(item,index) in provinces" :key="index" v-if="index >  7 && index < 17" @click="provinceChoose(item)">{{item.name}}</p>
                        </div>
                        <div class="clear" style="height:12px"></div>
                        <div class="letter">L-S</div>
                        <div class="province-item">
                            <p v-for="(item,index) in provinces" :key="index" v-if="index >  16 && index < 26" @click="provinceChoose(item)">{{item.name}}</p>
                        </div>
                        <div class="clear" style="height:12px"></div>
                        <div class="letter">T-Z</div>
                        <div class="province-item">
                            <p v-for="(item,index) in provinces" :key="index" v-if="index >  25" @click="provinceChoose(item)">{{item.name}}</p>
                        </div>
                    </div>
                    <div class="city-options" v-show="regisaddr.cityOpen">
                        <div class="city-item">
                            <p v-for="(item,index) in citys" :key="index" @click="cityChoose(item)">{{item.name}}市</p>
                        </div>
                    </div>
                    <div class="areas-options" v-show="regisaddr.areasOpen">
                        <div class="areas-item">
                            <p v-for="(item,index) in areas" :key="index" @click="areasChoose(item)">{{item}}</p>
                        </div>
                    </div>
                </div>
            </div>`
    ,
    created(){
        //获取城市数据
        axios.get('cityData.json')
        .then((response) => {
            this.cityData = response.data
            //console.log(response.data);
        })
        .catch( (error) => {
            console.log(error);
        });
    }
})