import requests
import json

#station = raw_input("What station: ")
stations = {"12th St. Oakland City Center": "12th",
      "16th St Mission (SF)":"16th",
      "19th St. Oakland":"19th",
      "24th St. Mission (SF)":"24th",
      "Ashby (Berkeley)":"ashb",
      "Balboa Park (SF)":"balb",
      "Bay Fair (SF)":"bayf",
      "Castro Valley":"cast",
      "Civic Center":"civc",
      "Coliseum":"colm",
      "Concord":"conc",
      "Daly City":"daly",
      "Downtown Berkeley":"dbrk",
      "Dublin/Pleasonton":"dubl",
      "El Cerrito del Norte":"deln",
      "El Cerrito Plaza":"plza",
      "Embarcedero":"embr",
      "Fremont":"frmt",
      "Fruitvake":"ftvl",
      "Glen Park (SF)":"glen",
      "Hayward":"hayw",
      "Lafeyette":"lafy",
      "Lake Merritt (Oakland)":"lake",
      "MacArthur (Oakland)":"mcar",
      "Milbrae":"mlbr",
      "Mongtomgery St (SF)":"colm",
      "North Berkeley":"nbrk",
      "North Concord":"ncon",
      "Orinda":"orin",
      "Pittsburg/Baypoint":"pitt",
      "Pleasant Hill":"phil",
      "Powell St. (SF)":"powl",
      "Richmond":"rich",
      "Rockridge (Oakland)":"rock",
      "San Bruno":"sbrn",
      "San Francisco International":"sfia",
      "San Leandro":"sanl",
      "South Hayward":"shay",
      "South San Francisco":"ssan",
      "Union City":"ucty",
      "Warm Springs/South Fremont":"warm",
      "Walnut Creek":"wcrk",
      "West Oakland":"woak"}

train_list_ab=list(stations.values())
train_list_names=list(stations.keys())

for x in xrange(0,len(train_list_ab)):
	response = requests.get("http://api.bart.gov/api/etd.aspx?cmd=etd&key=MW9S-E7SL-26DU-VV8V&orig=%s&json=y" % train_list_ab[x])
	data = response.json()
	for y in xrange(0,2):
		try:
			name = data['root']['station'][0]['etd'][y]['destination']
		except KeyError:
			# etd is an error that indicates no train data available 
			print('Data is currently unavailable for %s train' % train_list_names[x])
			#print("Error: {}").format(data['root']['message'])
			break
		except IndexError:
			name = data['root']['station'][0]['etd'][0]['destination']
			break
		time = data['root']['station'][0]['etd'][y]['estimate'][0]['minutes'][0]
		if time == 'Leaving':
			print('The ' + name + ' train is leaving now')
		else:
			print('{}\'s {} train is arriving in {} minutes.').format(train_list_names[x], name, time)

