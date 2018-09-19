# shop

> vue shop project
## 目录结构
```
│  .babelrc                  #ES6语法编译配置
│  .editorconfig             #定义代码格式                   
│  .postcssrc.js             #postcss配置文件
│  goods.json                #模拟数据json文件
│  index.html                #入口页面
│  package.json              #项目基本信息,包依赖信息等
│  
├─build
│      build.js              #项目构建(webpack)相关代码
│      check-versions.js     #检查node、npm等版本
│      logo.png              #标签logo
│      utils.js              #构建工具相关
│      vue-loader.conf.js    #webpack loader配置
│      webpack.base.conf.js  #webpack基础配置
│      webpack.dev.conf.js   #webpack开发环境配置,构建开发本地服务器
│      webpack.prod.conf.js  #webpack生产环境配置
│
├─config                     #项目开发环境配置
│      dev.env.js            #开发环境变量
│      index.js              #项目一些配置变量
│      prod.env.js           #生产环境变量
│      test.env.js           #测试环境变量
│
├─dist
│  │  index.html             #打包后的主页面
│  │
│  └─static/                 #打包后的静态资源文件夹
│   
│
└─src                        #源码目录
   │  App.vue                #页面入口文件
   │  main.js                #程序入口文件，加载各种公共组件
   │
   ├─assets/                 #打包前的资源文件夹
   │
   │
   ├─components              #vue公共组件目录
   │  │  Bottom.vue          #底部导航条
   │  │  Header.vue          #顶部栏
   │  │  Log.vue             #预留打印组件
   │  │  Slider.vue          #轮播图组件
   │  │  style.scss          #组件样式scss
   │  │  Tab.vue             #首页tab切换组件
   │  │
   │  └─Test                 #单元测试
   │      └─ Test.scss     
   │         Test.vue
   │
   ├─lib
   │      utils.js           #通用工具方法
   │
   ├─pages                   #页面目录
   │    └─About.scss         
   │      About.vue          #关于我
   │      Cart.scss          
   │      Cart.vue           #购物车
   │      Category.scss      
   │      Category.vue       #商品分类
   │      Computer.scss      
   │      Computer.vue       #电脑列表
   │      Detail.scss        
   │      Detail.vue         #商品详情
   │      Home.scss
   │      Home.vue           #主页面框架
   │      Login.scss
   │      Login.vue          #登陆页
   │      Phone.scss
   │      Phone.vue          #手机列表页
   │      Recommend.scss
   │      Recommend.vue      #推荐页
   │      Router.scss
   │      Router.vue         #路由器列表页
   │      Search.scss
   │      Search.vue         #搜索页
   │      Television.scss
   │      Television.vue     #电视列表页
   │
   ├─router
   │    └─ index.js           #路由配置
   │
   └─store
      └─ index.js          #Vuex的Store状态管理组件

```
## 生成步骤

``` bash
# 1.安装依赖包
npm install

# 2.启动程序打开浏览器localhost:8080
npm start

```
##### 最近用Vue做了关于电商类的项目，以下就是修改过的demo
##### 博客地址：https://www.xpsilvester.com/2018/09/18/VueProject/
##### 欢迎大家踊跃 提出建议 点个Star或者Fork支持一下~ 

#### 一、首页                 
##### src/pages/Home.vue -- 实现基本布局，轮播组件, 路由切换 

![此处输入图片的描述][1]
#### 二、产品分类页
##### src/pages/Category.vue -- 实现分类tag随着上下滑动而变化

![此处输入图片的描述][2]
#### 三、产品详情页
##### src/pages/Detail.vue -- 实现轮播，底部加入购物车，专题图片展示

![此处输入图片的描述][3]  
#### 四、购物车
##### src/pages/Cart.vue -- 实现全选，取消，单选，清空购物车按钮功能，使用Vuex实现购物车加减计算
![此处输入图片的描述][4]

#### 五、搜索页
##### src/pages/Search.vue -- 搜索功能暂未实现
![此处输入图片的描述][5]
#### 六、关于我
##### src/pages/About.vue -- 基本页面布局

![此处输入图片的描述][6]

#### 七、后台相关接口实现
暂时使用模拟数据

#### 八、页面动图演示

![此处输入图片的描述][7]

  [1]: https://raw.githubusercontent.com/xpsilvester/Project/master/images/shopIndex.png
  [2]: https://raw.githubusercontent.com/xpsilvester/Project/master/images/shopCategory.png
  [3]: https://raw.githubusercontent.com/xpsilvester/Project/master/images/shopDetail.png
  [4]: https://raw.githubusercontent.com/xpsilvester/Project/master/images/shopCart.png
  [5]: https://raw.githubusercontent.com/xpsilvester/Project/master/images/shopSearch.png
  [6]: https://raw.githubusercontent.com/xpsilvester/Project/master/images/shopAbout.png
  [7]: https://raw.githubusercontent.com/xpsilvester/Project/master/images/shopMovie2.gif
