(function () {
'use strict';

let uid = 0;

//管理依赖
//通过这个类可以收集依赖、删除依赖、或者向依赖发送通知等。
class Dep {
  constructor () {
    this.id = uid++;
    this.subs = [];
  }

  addSub (sub) {
    this.subs.push(sub);
  }

  removeSub (sub) {
    remove(this.subs, sub);
  }

  depend () {
    if (window.target) {
      window.target.addDep(this);
    }
  }

  removeSub (sub) {
    const index = this.subs.indexOf(sub);
    if (index > -1) {
      return this.subs.splice(index, 1)
    }
  }

  notify () {
    // 发布订阅
    const subs = this.subs.slice();
    for (let i = 0, l = subs.length; i < l; i++) {
      //执行订阅者Watcher的update方法
      subs[i].update();
    }
  }
}

const arrayProto = Array.prototype;
/**
 * arrayMethods继承自Array.prototype,具备其所有功能。
 * 我们要使用arrayMethods去覆盖Array.prototype
 */
const arrayMethods = Object.create(arrayProto);

//在arrayMethods上使用Object.defineProperty方法将那些可以改变数组自身内容的方法进行封装。
[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
].forEach(function (method) {
  //缓存原始方法
  const original = arrayProto[method];
  Object.defineProperty(arrayMethods, method, {
    //当使用数组的这些方法时，其实调用的是mutator函数，可以劫持用来做一些其他事
    value: function mutator (...args) {
      const result = original.apply(this, args);//先实现原始功能
      //当value身上被标记了__ob__之后(observe方法)，就可以通过value.__ob__来访问
      //Observer实例。如果是Array拦截器，因为拦截器是原型方法
      //所以可以直接通过this.__ob__来访问Observer实例
      const ob = this.__ob__;
      let inserted;
      //如果操作数组的方法是push,unshift和splice，
      //则把参数中新增的元素拿过来，用Observer来侦测
      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args;
          break
        case 'splice':
          inserted = args.slice(2);
          break
      }
      if (inserted) ob.observeArray(inserted);
      ob.dep.notify();
      return result
    },
    enumerable: false,
    writable: true,
    configurable: true
  });
});

//工具函数
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

const hasProto = '__proto__' in {};//__proto__是否可用

//是否为对象
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

const hasOwnProperty = Object.prototype.hasOwnProperty;
//是否含有相应的key属性
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

function isValidArrayIndex (val) {
  const n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

const arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * Observer 类会附加到每一个被侦测的 object 上。
 * 一旦被附加上，Observer 会将 object 的所有属性转换为 getter/setter 的形式
 * 来收集属性的依赖，并且当属性发生变化时，会通知这些依赖
 */
class Observer {
  constructor (value) {
    this.value = value;
    this.dep = new Dep();
    //在value上新增一个不可枚举的属性__ob__
    //这个属性的值就是当前Observer实例
    //__ob__的作用不仅仅是为了在拦截器中访问Observer实例，
    //还可以用来标记当前value是否已经被Observer转换成了响应式数据
    //即，所有被侦测了变化的数据身上都会有一个__ob__属性来表示它们是响应式的。
    def(value, '__ob__', this);

    if (Array.isArray(value)) {
      const augment = hasProto
        ? protoAugment
        : copyAugment;
      augment(value, arrayMethods, arrayKeys);
    } else {
      this.walk(value);
    }
  }

  /**
   * Walk 会将每一个属性都转换成 getter/setter 的形式来侦测变化
   * 这个方法只有在数据类型为 Object 时被调用
   */
  walk (obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]]);
    }
  }

  observeArray (items) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i]);
    }
  }
}

/**
 * 尝试为 value 创建一个 Observer 实例，
 * 如果创建成功直接返回新创建的 Observer实例。
 * 如果 value 已经已经存在一个 Observer 实例则直接返回它
 * 通过__ob__属性来判断：如果value是响应式的，
 * 则直接返回__ob__，如果不是响应式的，则使用new Observer来将数据转换成响应式数据。
 */
function observe (value, asRootData) {
  if (!isObject(value)) {
    return
  }
  let ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else {
    ob = new Observer(value);
  }
  return ob
}


//data:需要侦测的对象，key：对象的属性，val：key对应的属性初始值
function defineReactive (data, key, val) {
  //返回Observer实例
  let childOb = observe(val);
  let dep = new Dep();
  Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      //每当从data的key中读取数据时，get函数被触发
      get: function () {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        return val
      },
      //每当往data的key中设置数据时，set函数被触发
      set: function (newVal) {
        if(val === newVal){
          return
        }
        val = newVal;
        //调用依赖管理中的通知
        dep.notify();
      }
  });
}
//存在__proto__
function protoAugment (target, src, keys) {
  //将拦截器（加工后具备拦截功能的arrayMethods）赋值给value.__proto__，
  //通过__proto__可以很巧妙地实现覆盖value原型的功能
  target.__proto__ = src;
}
//不存在__proto__
//将拦截器上的方法直接添加到value的属性中
function copyAugment (target, src, keys) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i];
    def(target, key, src[key]);
  }
}

function set (target, key, val) {
  //如果target是数组并且key是一个有效的索引值，就先设置length属性
  //这样如果我们传递的索引值大于当前数组的length，就需要让target的length等于索引值。
  //通过splice方法把val设置到target中的指定位置。
  //当使用splice方法把val设置到target中的时候，数组拦截器会侦测到target发生了变化，
  //并且会自动帮助我们把这个新增的val转换成响应式的。
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  //由于key已经存在于target中，所以其实这个key已经被侦测了变化。
  //也就是说，这种情况属于修改数据，直接用key和val改数据就好了。
  //修改数据的动作会被vue.js侦测到，所以数据发生变化后，会自动向依赖发送通知。
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  //
  const ob = (target).__ob__;
  //target不能是vue.js实例或vue.js实例的根数据对象的情况
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && console.warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  //如果target身上没有__ob__属性，说明它并不是响应式的，并不需要做什么特殊处理，
  //只需要通过key和val在target上设置就行了。
  if (!ob) {
    target[key] = val;
    return val
  }
  //以上情况不满足，说明是新增属性，使用defineReactive将新增属性转换成getter/setter的形式即可
  defineReactive(ob.value, key, val);
  //最后，向target的依赖触发变化通知
  ob.dep.notify();
  return val
}

function del (target, key) {
  //只需使用splice将参数key所指定的索引位置的元素删除即可。
  //因为使用了splice方法，数组拦截器会自动向依赖发送通知
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  const ob = (target).__ob__;
  //如果target上有_isVue属性（target是Vue.js实例）或者ob.vmCount数量大于1（target是根数据）
  //则直接返回，终止程序继续执行
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && console.warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  //如果key不是target自身的属性，则终止程序继续执行
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  //判断target是不是响应式数据，即target存不存在__ob__。
  //只有响应式数据才需要发送通知，非响应式数据只需执行删除操作即可
  if (!ob) {
    return
  }
  ob.dep.notify();
}

//依赖收集中介
//数据发生变化时通知它，然后它再通知其他地方
class Watcher {
  constructor (vm, expOrFn, cb, options) {
    this.vm = vm;

    // 新增
    if (options) {
      this.deep = !!options.deep;
    } else {
      this.deep = false;
    }

    this.deps = [];
    this.depIds = new Set();
    //执行this.getter(),就可以读取data.a.b.c的内容
    this.getter = parsePath(expOrFn);
    this.cb = cb;
    this.value = this.get();
  }
  /**
   * 在get方法中先把window.target设置成了this,也就是当前的Watcher实例，
   * 然后再读一下data.a.b.c的值，这肯定会触发defineReactive中的get方法
   * 触发get，就会触发收集依赖的逻辑dep.depend()。（会从window.target中读取一个依赖并添加到Dep中）
   * 这就导致，只要先在window.target赋一个this，
   * 然后再读一下值，去触发get,就可以把this主动添加到keypath（parsePath）的Dep中。
   * 
   * 依赖注入到Dep类中（查看class Dep）,每当data.a.b.c的值发生变化时，
   * 就会让依赖列表中所有的依赖循环触发update方法，也就是Watcher中的update方法。
   * 而update方法会执行参数中的回调函数，将value和oldValue传到参数中。
   * 即 defineReactive中的set -> dep.notify() -> Watcher的update 
   */
  get () {
    window.target = this;
    let value = this.getter.call(this.vm, this.vm);
    if (this.deep) {
      traverse(value);
    }
    window.target = undefined;
    return value
  }

  addDep (dep) {
    //记录自己都订阅过哪些Dep
    const id = dep.id;
    if (!this.depIds.has(id)) {
      this.depIds.add(id);
      this.deps.push(dep);
      dep.addSub(this);
    }
  }
  //把watcher实例从当前正在观察的状态的依赖列表中移除
  teardown () {
    let i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
  }

  update () {
    const oldValue = this.value;
    this.value = this.get();
    this.cb.call(this.vm, this.value, oldValue);
  }
}

/**
 * 解析简单路径
 * 先将path用.分割成数组，然后循环数组一层一层去读数据，
 * 最后拿到的obj就是path中想要读的数据。
 */
const bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {//是否含有特殊字符
    return
  }
  const segments = path.split('.');
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]];
    }
    return obj
  }
}

const seenObjects = new Set();
/**
 * 递归value的所有子值来触发它们收集依赖的功能
 * 
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  let i, keys;
  //先判断val的类型，如果不是Array和Object，或者已经被冻结，那么直接返回，什么都不干
  const isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val)) {
    return
  }
  
  if (val.__ob__) {
    const depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  //如果是数组，则循环数组，将数组中的每一项递归调用_traverse
  //如果是Object类型的数据，则循环Object中所有key，然后执行一次读取操作，再递归子值
  if (isA) {
    i = val.length;
    while (i--) _traverse(val[i], seen);
  } else {
    keys = Object.keys(val);
    i = keys.length;
    //val[keys[i]]会触发getter，也就是说会触发收集依赖的操作，
    //这时window.target还没有被清空，会将当前的Watcher收集进去。
    while (i--) _traverse(val[keys[i]], seen);
  }
}

function stateMixin (Vue) {
  Vue.prototype.$watch = function (expOrFn, cb, options) {
    const vm = this;
    options = options || {};
    const watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;
}

function Vue$1 (options) {
  this._isVue = true;
  this.data = options.data;
  new Observer(this.data);
}

stateMixin(Vue$1);

const vue = new Vue$1({
  data: {
    title: 'users',
    deep: {a: {b: {name: 'berwin'}}},
    list: [{name: 'berwin', age: 22}]
  }
});

window.vue = vue;

const unwatchList = vue.$watch('data.list', (newValue) => {
  console.log('list: ', newValue);
});

const unwatchDeep = vue.$watch('data.deep', (newValue, oldValue) => {
  console.log('deep: ', newValue, oldValue);
}, {deep: true});

const unwatchTitle = vue.$watch('data.title', (newValue, oldValue) => {
  console.log('title: ', newValue, oldValue);
}, {immediate: true});

const handlers = {
  fetch () {
    console.log(vue.data);
  },
  push () {
    vue.data.list.push({name: 'bowen', age: Math.random()});
  },
  changeTitle () {
    vue.data.title = Math.random();
  },
  deepChange () {
    vue.data.deep.a.b.name = Math.random();
  },
  set () {
    vue.$set(vue.data, 'name', Math.random());
  },
  del () {
    vue.$delete(vue.data.deep, 'a');
  },
  unwatch () {
    unwatchList();
    unwatchTitle();
    unwatchDeep();
  }
};

document.body.onclick = function (event) {
  handlers[event.target.id] && handlers[event.target.id]();
};

}());
