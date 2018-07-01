import sys
import json
import time
dataSource = [{
  'key': '',
  'name': 'Mike',
  'age': 32,
  'address': '10 Downing Street'
}];
outputdir = sys.argv[2]
filename = sys.argv[1]
dataSource[0]['key']=filename
with open('{}.json'.format(outputdir+filename),'w') as f:
    json.dump(dataSource,f)