const cluster = require('cluster');
const dgram = require('dgram');

if (cluster.isMaster) {
  cluster.fork(); // 可工作。
  cluster.fork(); // 失败并抛出 EADDRINUSE。
} else {
  const socket  = dgram.createSocket('udp4');
  socket.bind(1234, () => {
    socket.addMembership('224.0.0.114');
  });
}