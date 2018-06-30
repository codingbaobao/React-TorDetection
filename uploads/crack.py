import sys
import json
import time
dataSource = [{
  'key': '1',
  'name': 'Mike',
  'age': 32,
  'address': '10 Downing Street'
}, {
  'key': '2',
  'name': 'John',
  'age': 42,
  'address': '10 Downing Street'
}];
dataSource2 = [{
  'key': '3',
  'name': 'Max',
  'age': 32,
  'address': '10 Downing Street'
}, {
  'key': '4',
  'name': 'Juju',
  'age': 42,
  'address': '10 Downing Street'
}];
path = sys.argv[2]+'/'
name = sys.argv[1]
with open('{}.json'.format(path+name),'w') as f:
    if name == '1.txt':
        json.dump(dataSource,f)
    else:
        json.dump(dataSource2,f)
