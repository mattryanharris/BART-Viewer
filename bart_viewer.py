import requests
import json

station = raw_input("What station: ")
response = requests.get("http://api.bart.gov/api/etd.aspx?cmd=etd&key=MW9S-E7SL-26DU-VV8V&orig=%s&json=y" % station)
data = response.json()
for x in xrange(0,2):
	name = data['root']['station'][0]['etd'][x]['destination']
	time = data['root']['station'][0]['etd'][x]['estimate'][0]['minutes']
	if name == 'Leaving':
		print('The ' + name + ' train is leaving now')
	else:
		print('The {} train is arriving in {} minutes.').format(name, time)

