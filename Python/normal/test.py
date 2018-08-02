def wagesCal0(n):
    sum=0
    L = list(range(n))
    for i in L:
        sum=sum*1.06 + 10 + i*2
    print(L,sum)
def wagesCal(n):
    sum=5
    L = list(range(n))
    for i in L:
        sum=sum*1.06 + 10 + i*2
    print(L,sum)

def wagesCal2(n):
    sum=0
    L = list(range(n))
    for i in L:
        sum=sum*1.06 + 20 + i*4
    print(L,sum)

def add(x,y,f):
    return f(x) + f(y)

def f(x):
    return x * x

def fn(x,y):
    return x * 10 + y

def char2num(s):
    digits = {'0':0,'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9}
    return digits[s]

def is_odd(n):
    return n%2 == 1

def not_empty(s):
    return s and s.strip()

def calc_sum(*args):
    ax = 0 
    for n in args:
        ax = ax + n
    return ax

def lazy_sum(*args):
    def sum():
        ax = 0
        for n in args:
            ax = ax + n
        return ax
    return sum

# def count():
#     fs = []
#     for i in range(1,5):
#         def f():
#             return i*i
#         fs.append(f)
#     return fs

def count():
    def f(j):
        def g():
            return j*j
        return g
    fs = []
    for i in range(1,4):
        fs.append(f(i))
    return fs
import functools

def log(text):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kw):
            print('%s %s():' % (text, func.__name__))
            return func(*args, **kw)
        return wrapper
    return decorator

@log('execute')
def now():
    print('2015-3-25')

__author__ = 'Michael Liao'

import sys

def test():
    args = sys.argv
    if len(args) == 1:
        print('Hello world!')
    elif len(args) == 2:
        print('Hello,%s!' % args[1])
    else:
        print('Too many arguments!')

if __name__ == '__main__':
    test()

class Student(object):
    
    def __init__(self,name,score):
        self.__name = name
        self.__score = score
    
    def get_name(self):
        return self.__name

    def __getattr__(self, attr):
        if attr == 'age':
            return lambda:25
        raise AttributeError('\'Student\' object has no attribute \'%s\'' % attr)
    @property
    def score(self):
        return self.__score

    def set_name(self,name):
        self.__name = name

    @score.setter
    def score(self,value):
        if not isinstance(value, int):
            raise ValueError('score must be an integer!')
        if value < 0 or value > 100:
            raise ValueError('score must between 0 ~ 100!')
        self.__score = value

    def print_score(self):
        print('%s:%s' % (self.__name, self.__score))

    def get_grade(self):
        if self.score >= 90:
            return 'A'
        elif self.score >= 60:
            return 'B'
        else:
            return 'C'

class Animal(object):
    def run(self):
        print('Animal is running...')

class Dog(Animal):
    pass

class Cat(Animal):
    pass

class MyObject(object):
    def __init__(self):
        self.x = 9
    def power(self):
        return self.x * self.x

class Fib(object):
    def __init__(self):
        self.a , self.b = 0, 1 #初始化两个计数器a,b
    def __iter__(self):
        return self #实例本身就是迭代对象，故返回自己
    def __next__(self):
        self.a , self.b = self.b, self.a + self.b #计算下一个值
        if self.a > 1000000: #退出循环的条件
            raise StopIteration()
        return self.a
    def __getitem__(self,n):
        if isinstance(n,int): # n是索引
            a, b = 1,1
            for x in range(n):
                a, b=b, a+b
            return a
        if isinstance(n, slice): # n是切片
            start = n.start
            stop = n.stop
            if start is None:
                start = 0
            a, b = 1, 1
            L = []
            for x in range(stop):
                if x >= start:
                    L.append(a)
                a, b = b, a+b
            return L

class Chain(object):
    def __int__(self,path=''):
        self._path = path
    def __getattr__(self,path):
        return Chain('%s%s' % (self._path,path))
    def __str__(self):
        return self._path

    __repr__ = __str__

from enum import Enum, unique
@unique
class Weekday(Enum):
    Sun = 0 # Sun的value被设定为0
    Mon = 1
    Tue = 2
    Wed = 3
    Thu = 4
    Fri = 5
    Sat = 6



