from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
# Create your views here.
import json
import overpy


@api_view(['POST'])
def test(request):
    #request = {type: hospital, boundary:{}}
    response = json.load(request)
    if(response.type == "hospital"):
        prefix = """[out:json][timeout:50];(node["amenity"="hospital"](around:"""  # this is string of syntex in 'Overpass QL' language
        suffix = """););out body;>;out skel qt;"""  # this is string of syntex in 'Overpass QL' language
        built_query = prefix + request.boundary + suffix
        api = overpy.Overpass()                       # creating a overpass API instance

        result = api.query(built_query)
        # initializing empty list , we'll use it to form a dataframe .
        list_of_node_tags = []
        for node in result.nodes:                     # from each node , get the all tags information
            node.tags['latitude'] = node.lat
            node.tags['longitude'] = node.lon
            node.tags['id'] = node.id
            list_of_node_tags.append(node.tags)
        data_frame = pd.DataFrame(list_of_node_tags)
    return Response("Nirjal", status=220)
