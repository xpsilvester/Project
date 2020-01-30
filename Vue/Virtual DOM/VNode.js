/**
 * VNode类
 */
class VNode{
    constructor(tag,data,children,text,elm,context,componentOptions,asyncFactory){
        this.tag = tag //元素节点名称
        this.data = data 
        this.children = children //子节点
        this.text = text //文本节点的文本
        this.elm = elm 
        this.ns = undefined
        this.context = context
        this.functionalContext = undefined
        this.functionalOptions = undefined
        this.functionalScopeId = undefined
        this.key = data && data.key
        this.componentOptions = componentOptions
        this.componentInstance = undefined
        this.parent = undefined
        this.raw = false
        this.isStatic = false
        this.isRootInsert = true
        this.isComment = false
        this.isCloned = false
        this.isOnce = false
        this.asyncFactory = asyncFactory
        this.asyncMeta = undefined
        this.isAsyncPlaceholder = false
    }
    get child (){
        return this.componentInstance
    }
}

/**
 * 注释节点，两个有效属性：text，isComment
 * 例如 
 * <!-- 注释节点 -->
 * {
 *      text: '注释节点',
 *      isComment: true
 * }
 */
const createEmptyVNode = text => {
    const node = new VNode()
    node.text = text
    node.isComment = true
    return node
}

/**
 * 文本节点，一个属性：text
 * {
 *      text: 'Hello'
 * }
 */
const createTextVNode = val => {
    return new VNode(undefined,undefined,undefined,String(val))
}

/**
 * 克隆节点
 */
const cloneVNode = (vnode,deep) => {
    const cloned = new VNode(
        vnode.tag,
        vnode.data,
        vnode.children,
        vnode.text,
        vnode.elm,
        vnode.context,
        vnode.componentOptions,
        vnode.asyncFactory
    )
    cloned.ns = vnode.ns
    cloned.isStatic = vnode.isStatic
    cloned.key = vnode.key
    cloned.isComment = vnode.isComment
    cloned.isCloned = true
    if(deep && vnode.children){
        cloned.children = cloneVNode(vnode.children)
    }
    return cloned
}

/**
 * 删除节点
 */
//删除一组指定节点,删除vnodes数组中从startIdx指定的位置到endIdx指定位置的内容
function removeVnodes(vnodes,startIdx,endIdx){
    for(;startIdx<=endIdx;++startIdx){
        const ch = vnodes[startIdx]
        if(isDef(ch)){
            removeNode(ch.elm)
        }
    }
}

const nodeOps = {
    removeChild(node,child){
        node.removeChild(child)
    }
}
//删除视图中的单个节点  
function removeNode(el){
    const parent = nodeOps.parentNode(el)
    if(isDef(parent)){
        nodeOps.removeChild(parent,el)
    }
}