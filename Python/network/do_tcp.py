import socket

# 创建一个socket:
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# 建立连接:
s.connect(('www.baidu.com', 80))

# 发送数据:
s.send(b'GET / HTTP/1.1\r\nHost: www.baidu.com\r\nConnection: close\r\n\r\n')

# 接收数据:
buffer = []
while True:
    # 每次最多接收1k字节:
    d = s.recv(1024)
    if d:
        buffer.append(d)
    else:
        break

data = b''.join(buffer)

# 关闭连接:
s.close()

header, html = data.split(b'\r\n\r\n', 1)
print(header.decode('utf-8'))

# 把接收的数据写入文件:
with open('baidu.html', 'wb') as f:
    f.write(html)