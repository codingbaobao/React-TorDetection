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
outputdir = sys.argv[2]
inputpath = sys.argv[1]
filename = inputpath.split('/')[-1]
with open('{}.json'.format(outputdir+'/'+filename),'w') as f:
    
    json.dump(dataSource,f)
