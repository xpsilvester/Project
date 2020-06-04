const log4js = require('log4js')
const env = process.env.NODE_ENV

log4js.configure({    //配置log4js
  appenders: {        //配置日志记录器
    everything: {     //采用文件记录
      type: 'file',
      filename: 'logs/app.log',
      maxLogSize: 10485760,   //按照日志体积进行分割
      backups: 3,    //保留多少个备份文件
      compress: true   //压缩备份的日志
    },
    dev: {
      type: 'console'    //在开发的时候，输出日志到console 中
    }
  },
  categories: {    //定义日志记录器的类别
    default: {     //默认记录，线上采用此配置
      appenders: ['everything'],    //采用文件的方式存储日志
      level: 'info'    //记录info 级别之上的日志
    },
    dev: {
      appenders: ['dev', 'everything'],   //采用文件存储和控制台输出日志
      level: 'debug'     //记录debug 级别之上的日志
    }  
  }
})

let logger = log4js.getLogger()    //线上采用默认的日志配置（类别为default)

if (env !== 'production') {     //如果是非线上环境
  logger = log4js.getLogger('dev')    //采用dev 的日志配置（类别为dev)
}

module.exports = async function (ctx, next) {   //定义中间件
  ctx.logger = logger       //将日志记录器挂载到上下文中，便于调用
  ctx.logger.info(JSON.stringify({     //默认记录每个请求的数据
    url: ctx.url,
    query: ctx.query,
    headers: ctx.request.headers,
    ua: ctx.userAgent,
    timespan: Date.now()   //记录访问的时间戳，便于排查问题
  }))
  await next()
}