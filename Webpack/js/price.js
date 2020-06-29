import 'es6-promise/auto'
import '../scss/price.scss'
window.onload = function(){
    let app = new Vue({
        el: '#app',
        data() {
            return {
                isMask: false,
                currentProIndex:0,
                productList:[
                    // {
                    //     sysno: 321321,
                    //     sys_product_sysno: 34434,
                    //     sys_product_model: 'TL-SDFJSK',
                    //     cal_final_price: 343.43,
                    //     cal_refer_price: 4343.34,
                    //     cal_increment_price: 3434.34,
                    //     art_increment_price: 343,
                    //     art_zt_deduction_amount: 34.3,
                    //     art_sf_increased_amount: 23.3,
                    //     cal_shipment_price: 34.3,
                    //     cal_weight: 1.2,
                    //     cal_zt_ship_price: 33,
                    //     cal_sf_ship_price: 40,
                    //     art_limited_price: 232,
                    //     art_tmall_price: 343,
                    //     art_jd_price: 344,
                    //     isRed: false,
                    //     isChecked:false
                    // }
                ],
                productListShow:[],
                editProduct:{
                    sysno: 321321,
                    sys_product_sysno: 34434,
                    sys_product_model: 'TL-SDFJSK',
                    cal_final_price: 343.43,
                    cal_refer_price: 4343.34,
                    cal_increment_price: 3434.34,
                    art_increment_price: 343,
                    art_zt_deduction_amount: 34.3,
                    art_sf_increased_amount: 23.3,
                    cal_shipment_price: 34.3,
                    cal_weight: 1.2,
                    cal_zt_ship_price: 33,
                    cal_sf_ship_price: 40,
                    art_limited_price: 232,
                    art_tmall_price: 343,
                    art_jd_price: 344,
                    isRed: false
                },
                keywords:'',
                pageCount: 0,
                pageCurrent: 1,
                pageSize: 10,
                skipPage:0,
                loading: true,
                isSearch:false
            }
        },
        components:{},
        methods: {
            edit(item,index){
                this.currentProIndex = index;
                this.editProduct = Object.assign({},item);
                this.isMask = true;
            },
            updateConfirme(){
                this.productList[this.currentProIndex] = Object.assign({},this.editProduct);
                this.isMask = false;
            },
            calculate(type){
                switch(type){
                    case 'all':
                        this.productList = this.calculateProduct(this.productList)
                        break;
                    case 'selected':
                        this.productList = this.productList.map(item => {
                            if(item.isChecked){
                                item = Object.assign({},this.calculateProduct([item])[0])
                            }
                            return item
                        })
                        break;
                    case 'current':
                        this.editProduct = Object.assign({},this.calculateProduct([this.editProduct])[0]) 
                        console.log(this.editProduct)
                        break;
                }
            },
            displayProduct(type){
                if(type === 'all'){
                    //是否为搜索列表
                    if(this.isSearch){
                        this.getDatas(1,10)
                        this.isSearch = false
                    }else{
                        this.productListShow = this.productList
                    }
                }else{
                    this.productListShow = this.productList.filter(item => item.isRed === true)
                }
            },
            synchronous(type){
                if(window.confirm('确定要同步价格吗？')){
                    let productList = [];
                    if(type === 'all'){
                        //console.log(this.productList)
                        this.calculate('all')
                        productList = this.productList.filter(item => item.isRed != true)
                    }else{
                        //console.log(this.selectedProduct)
                        if(this.selectedProduct.length === 0){
                            alert('选中商品数为空！')
                            return;
                        }
                        this.calculate('selected')
                        productList = this.selectedProduct.filter(item => item.isRed != true)
                    }
                    if(productList.length == 0){
                        return false
                    }
                    axios.post(`/newpricesystem/NewPriceSystem.ashx?method=sync-price`,productList)
                    .then((response) => {
                        if(response.data.errorCode == 0){
                            alert('同步成功！')
                        }else{
                            alert('同步失败');
                            console.log(response.data)
                        }
                    })
                    .catch( (error) => {
                        alert('同步失败');
                        console.log(error);
                    });
                    return true;
                 }else{
                    return false;
                }
            },
            search(){
                //console.log(this.keywords)
                this.isSearch = true
                let keys = this.keywords.split(',').map(item => item.trim())
                axios.post(`/newpricesystem/NewPriceSystem.ashx?method=search`,keys)
                .then((response) => {
                    //console.log(response.data)
                    this.productList = response.data.data.productData.map(item=>{
                        item.isChecked = false;
                        if(item.cal_weight == 0 || item.cal_shipment_price == 0){
                            item.isRed = true;
                        }else{
                            item.isRed = false;
                        }
                        return item;
                    })
                    this.productListShow = this.productList
                })
                .catch( (error) => {
                    console.log(error);
                });
            },
            getDatas(page){
                axios.post(`/newpricesystem/NewPriceSystem.ashx?method=get-data&page=${page}&limit=${this.pageSize}`)
                .then((response) => {
                    //console.log(response.data)
                    this.loading = false;
                    this.pageCurrent = page <=1 ? 1 : page;
                    this.pageCount =  Math.ceil(response.data.data.count/this.pageSize);
                    this.productList = response.data.data.productData.map(item=>{
                        item.isChecked = false;
                        if(item.cal_weight == 0 || item.cal_shipment_price == 0){
                            item.isRed = true;
                        }else{
                            item.isRed = false;
                        }
                        
                        return item;
                    })
                    this.productListShow = this.productList
                })
                .catch( (error) => {
                    console.log(error);
                });

            }
        },
        computed:{
            selectedProduct(){
                return this.productList.filter(item => item.isChecked == true)
            },
            calculateProduct(){
                return function(productList){
                    return productList.map(item => {
                        item.art_limited_price = parseFloat(item.art_limited_price);
                        item.art_increment_price = parseFloat(item.art_increment_price);
                        item.cal_shipment_price = parseFloat(item.cal_shipment_price);
                        item.cal_sf_ship_price = parseFloat(item.cal_sf_ship_price);

                        //线上限价非空、价格增量（确认）值为空时，建议零售价=线上限价
                        //线上限价非空、价格增量（确认）值非空值时，建议零售价=出货标准价+快递成本基准值+人工成本+价格增量（确认）
                        if(item.art_limited_price != 0){
                            if(item.art_increment_price == 0){
                                item.cal_final_price = item.art_limited_price
                            }else{
                                item.cal_final_price = item.cal_shipment_price + 3.5 + 3 + item.art_increment_price;
                            }
                        }else{
                            //线上限价为空、价格增量（确认）值为空时，建议售价=出货标准价+人工成本+实际顺丰运费-顺丰增加金额；
                            //线上限价为空、价格增量（确认）值非空值时，建议零售价=出货标准价+快递成本基准值+人工成本+价格增量（确认）
                            if(item.art_increment_price == 0){
                                item.cal_final_price = item.cal_shipment_price + 3 + item.cal_sf_ship_price - item.art_sf_increased_amount
                            }else{
                                item.cal_final_price = item.cal_shipment_price + 3.5 + 3 + item.art_increment_price;
                            }
                        }
                        if(item.art_limited_price == 0 ||item.cal_final_price < item.art_limited_price || item.cal_weight == 0 || item.cal_shipment_price == 0){
                            item.isRed = true
                        }else{
                            item.isRed = false
                        }
                        return item
                    })
                }
            }
        },
        created() {
            axios.post(`/newpricesystem/NewPriceSystem.ashx?method=sync-data`)
            .then((response) => {
                //console.log(response.data)
                this.getDatas(1);
            })
            .catch( (error) => {
                console.log(error);
                alert('更新数据失败！');
                this.getDatas(1);
            });
        }
    })
}