import random, time, queue

from multiprocessing.managers import BaseManager

task_queue = queue.Queue()

result_queue = queue.Queue()

#替代原来的匿名函数
def return_task_queue():
    global task_queue
    return task_queue
#替代原来的匿名函数
def return_result_queue():
    global result_queue
    return result_queue


class QueueManager(BaseManager):
    pass

#加入main判断
if __name__ == '__main__':
    #callable参数指定函数
    QueueManager.register('get_task_queue',callable=return_task_queue)
    #callable参数指定函数
    QueueManager.register('get_result_queue',callable=return_result_queue)

    manager = QueueManager(address=('127.0.0.1',34512), authkey=b'abc')

    manager.start()

    task = manager.get_task_queue()
    result = manager.get_result_queue()

    for i in range(10):
        n = random.randint(0, 10000)
        print('Put task %d...' % n)
        task.put(n)

    print('Try get result...')
    for i in range(10):
        r = result.get(timeout=10)
        print('Result: %s' %r)

    manager.shutdown()
    print('master exit.')