import re

print('Test: 010-12345')
m = re.match(r'^(\d{3})-(\d{3,8})$', '010-12345')
print(m.group(1), m.group(2))

t = '19:05:30'
print('Test:', t)
m = re.match(r'^(0[0-9]|1[0-9]|2[0-3]|[0-9])\:(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|[0-9])\:(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|[0-9])$', t)
print(m.groups())

#贪婪匹配
m = re.match(r'^(\d+)(0*)$', '102300').groups()
print(m)

#非贪婪匹配
m = re.match(r'^(\d+?)(0*)$', '102300').groups()
print(m)

def is_valid_email(addr):
    if re.match(r'^([0-9a-zA-Z\_\.]+)\@([0-9a-zA-Z]+)\.(\w{2,3})$', addr):
        return True
    else:
        return False