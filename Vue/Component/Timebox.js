//日期组件
let Timebox = {
    data: function () {
        return {
            monthData:[],
            years:[2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019],
            months:[1,2,3,4,5,6,7,8,9,10,11,12],
            timedata:{
                year:'',
                month:'',
                day:'',
                yearsOpen:false,
                monthOpen: false,
                dayOpen:false,
                open:false,
                title:'* 时间'
            }
        }
    },
    props:{
        //timedata: Object
    },
    methods:{
        //年点击
        yearClick:function(){
            this.timedata.yearsOpen = !this.timedata.yearsOpen
            this.timedata.open = this.timedata.yearsOpen
            this.timedata.monthOpen = false
            this.timedata.dayOpen = false
        },
        //年选择
        yearChoose:function(item){
            this.timedata.yearsOpen = false
            this.timedata.year = item
            this.timedata.monthOpen = true
        },
        //年跳转
        yearSikp:function(num){
            this.years = this.years.map((obj)=>{
                return obj + num
            })
        },
        yearChange:function(num){
            this.timedata.year = this.timedata.year + num
        },
        //月点击
        monthClick:function(){
            if(this.timedata.year != ''){
                this.timedata.monthOpen = !this.timedata.monthOpen
                this.timedata.open = this.timedata.monthOpen
                this.timedata.yearsOpen = false
                this.timedata.dayOpen = false
            }
        },
        //月选择
        monthChoose:function(item){
            this.timedata.monthOpen = false
            this.timedata.month = item
            this.timedata.dayOpen = true
        },
        //月跳转
        monthSkip:function(num){
            if(this.timedata.month == 1 && num < 0)
                return
            else if(this.timedata.month == 12 && num > 0)
                return
            else
                this.timedata.month = this.timedata.month + num
        },
        //日点击
        dayClick:function(){
            if(this.timedata.year != '' && this.timedata.month != ''){
                this.timedata.dayOpen = !this.timedata.dayOpen
                this.timedata.open = this.timedata.dayOpen
                this.timedata.yearsOpen = false
                this.timedata.monthOpen = false
            }
        },
        //日选择
        dayChoose:function(item){
            this.timedata.dayOpen = false
            this.timedata.open = false
            this.timedata.day = item
        }
    },
    computed:{
        //当月日期数组
        days:function(){
            if(this.timedata.year != '' && this.timedata.month != ''){
                let year = this.timedata.year,month = this.timedata.month
                let nowDays = new Date(year,month,0).getDate(),
                    prevDays = new Date(year,month-1,0).getDate();
                let weekDay = new Date(year,month-1,0).getDay() + 1;
                let daysArr = [];
                for(let i=0;i<weekDay;i++){
                    daysArr.unshift(prevDays)
                    prevDays--
                }
                for(let i=1;i<nowDays + 1;i++){
                    daysArr.push(i)
                }
                let remain = 42 - daysArr.length + 1;
                for(let i=1;i<remain;i++){
                    daysArr.push(i)
                }
                return {
                    daysArr:daysArr,
                    weekDay:weekDay,
                    remainDay: weekDay+nowDays
                }
            }else{
                return {
                    daysArr:[],
                    weekDay: 0,
                    remainDay: 0
                }
            }
        }
    },
    template: `<div class="info-box">
                <p class="title">{{timedata.title}}</p>
                <div class="select-box" :class="timedata.open ? 'open' : ''">
                    <span @click="yearClick" :class="timedata.year == '' ? '' : 'active'">{{timedata.year == '' ? '' : timedata.year }}年</span>
                    /<span @click="monthClick" :class="timedata.month == '' ? '' : 'active'">{{timedata.month == '' ? '' : timedata.month }}月</span>
                    /<span @click="dayClick" :class="timedata.day == '' ? '' : 'active'">{{timedata.day == '' ? '' : timedata.day }}日</span>
                    <div class="year-options" v-show="timedata.yearsOpen">
                        <div class="year-item">
                            <div class="year-range">
                                <span class="prev" @click="yearSikp(-12)"></span>{{years[0] + '-' + years[11]}} <span class="next" @click="yearSikp(12)"></span>
                            </div>
                            <p v-for="(item,index) in years" :key="index" @click="yearChoose(item)">{{item}}</p>
                        </div>
                    </div>
                    <div class="month-options" v-show="timedata.monthOpen">
                        <div class="month-item">
                            <div class="month-range">
                                <span class="prev" @click="yearChange(-1)"></span>{{timedata.year}} <span class="next" @click="yearChange(1)"></span>
                            </div>
                            <p v-for="(item,index) in months" :key="index" @click="monthChoose(item)">{{item}}月</p>
                        </div>
                    </div>
                    <div class="day-options" v-show="timedata.dayOpen">
                        <div class="day-item">
                            <div class="day-range">
                                <span class="prev" @click="yearChange(-1)"></span>
                                <span>{{timedata.year}}</span> 
                                <span class="next" @click="yearChange(1)"></span>
                                <span class="prev" @click="monthSkip(-1)"></span>
                                <span>{{timedata.month}}月</span>
                                <span class="next" @click="monthSkip(1)"></span>
                            </div>
                            <div class="week">
                                <p>日</p>
                                <p>一</p>
                                <p>二</p>
                                <p>三</p>
                                <p>四</p>
                                <p>五</p>
                                <p>六</p>
                            </div>
                            <div class="day">
                                <p v-for="(item,index) in days.daysArr" :key="index" v-if="index < days.weekDay">{{item}}</p>
                                <p class="valid" v-for="(item,index) in days.daysArr" v-if="index >= days.weekDay && index < days.remainDay " :key="index" @click="dayChoose(item)">{{item}}</p>
                                <p v-for="(item,index) in days.daysArr" :key="index" v-if="index >= days.remainDay">{{item}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
    ,
    created(){
        
    }
}