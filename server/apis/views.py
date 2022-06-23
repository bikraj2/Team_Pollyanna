from posixpath import normpath
from urllib import response
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
import json
import requests
import overpy

def getdata(east,west,north,south):
    # # for oshems
    # URL = 'https://api.ohsome.org/v1/elements/count'
    # data = {"bboxes": "8.625,49.3711,8.7334,49.4397", "format": "json", "time": "2014-01-01", "filter": "amnety = 'hospital'"}
    # response = requests.post(URL, data=data)
    # return response.json()
    # # for overpy
    api = overpy.Overpass()
    api.query('''[timeout:9000][maxsize:1073741824];
            node(51.15,7.0,51.35,7.3);
            out;''')
    

@api_view(['POST'])
def test(request):
    responses = request.data  
    coordinates= responses['features'][0]['geometry']['coordinates'][0]
    east = coordinates[0][1]
    west = coordinates[0][1]
    north = coordinates[0][0]
    south = coordinates[0][0]
    for i in range(len(coordinates)):
        if(east<coordinates[i][1]):
            east = coordinates[i][1]
        if(west>coordinates[i][1]):
            west = coordinates[i][1]
        if(north<coordinates[i][1]):
            north = coordinates[i][0]
        if(south>coordinates[i][1]):
            south = coordinates[i][0]
    print(getdata(east,north, west,south))

    #for hospital
    # if()
    # print(getdata(east=east,north=north, west=west,south=south ))
    # response = json.load(request)
    # if(response.type == "hospital"):
    # mapData = getData()
    # print(result)
        # initializing empty list , we'll use it to form a dataframe .
        # list_of_node_tags = []
        # for node in result.nodes:                     # from each node , get the all tags information
        #     node.tags['latitude'] = node.lat
        #     node.tags['longitude'] = node.lon
        #     node.tags['id'] = node.id
        #     list_of_node_tags.append(node.tags)
        # data_frame = pd.DataFrame(list_of_node_tags)
    return Response("Nirjal", status=220)
