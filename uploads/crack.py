import sys
import json
# print('get param:{}'.format(sys.argv[1]))
with open('aaa.txt','w') as f:
    f.write('bbbbbbb')
# print (json.dumps({
  # "name": "example-create-react-app-express",
  # "version": "1.0.0",
  # "description": "Example on using create-react-app with a Node Express Backend",
  # "author": {
    # "name": "Esau Silva",
    # "email": "esausilva85@gmail.com",
    # "url": "https://esausilva.com"
  # }}))
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
print (json.dumps(dataSource))
