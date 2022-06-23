from urllib import response
from django.shortcuts import render
from js2py import require
from rest_framework.response import Response
from rest_framework.decorators import api_view
# Create your views here.
import json
import overpy
import geopandas as gpd
import matplotlib.pyplot as plt
import pandas as pd
from shapely import geometry as gm
from sklearn.preprocessing import MinMaxScaler
import matplotlib as plot
from sklearn.cluster import KMeans
import warnings
import numpy as np
import random as rnd
from sklearn.cluster import DBSCAN

warnings.filterwarnings("ignore")

def creatingFile():
    points = gpd.read_file(r"C:\Users\sunny\Desktop\TeamPollyanna\dataAnalysis\SampleShapeFile\shape\points.shp")
    points=points.to_crs('epsg:32644')
    buildings = gpd.read_file(r"C:\Users\sunny\Desktop\TeamPollyanna\dataAnalysis\SampleShapeFile\shape\buildings.shp")
    buildings=buildings.to_crs('epsg:32644')
    buildings=buildings.iloc[int(len(buildings)/5):int(len(buildings)/4)]
    #Getting alll the hospitals from the points
    hospitals= gpd.GeoDataFrame(points.loc[[1]],crs={'init':'epsg:32644'})
    j=0
    for i in range(len(points)): 
        if points.loc[i]['type'] == "hospital":
            hospitals=hospitals.append(points.loc[i])

    #creating buffer Zone
    buffer_zone1=hospitals.buffer(5000)

    #creating geoPandasDataFrame
    buffer_zone1=gpd.GeoDataFrame(geometry=gpd.GeoSeries(buffer_zone1))
    buffer_zone1.drop_duplicates(inplace=True)
    index = pd.Index(range(0,len(buffer_zone1)))
    buffer_zone1=buffer_zone1.set_index(index)
    buffer_zone1

    #merging all the buffer_zone1 together
    merged=buffer_zone1.loc[[0]]
    for i in range(len(buffer_zone1)):
        merged=gpd.overlay(merged,buffer_zone1.loc[[i]],how='union')
        merged['column']=1
        merged=merged.dissolve('column')
        merged.crs='epsg:32644'

    #creating a rectangle
    olygon=gm.Polygon([[85.271,27.413],[85.868,27.408],[85.877,27.75],[85.272,27.753]])
    d = { 'geometry': [olygon]}
    rectangle=gpd.GeoDataFrame(d,crs={'init':'epsg:4326'})
    rectangle=rectangle.to_crs('epsg:32644')

    #taking buffer in the recatngle
    buffer_in_rectangle=gpd.clip(merged,rectangle)
    non_buffer=gpd.overlay(rectangle,merged,how='difference')#non buffer zone

    #taking all the buildings in the rectangle
    buildings_in_rectangle=gpd.clip(buildings,rectangle)
    buildings_in_buffer=gpd.clip(buildings,buffer_in_rectangle)
    #buildings outside the buffer
    buildings_outsidse_buffer=gpd.clip(buildings_in_rectangle,non_buffer)
    #taking the centroid(point) of all the buildings(plolygons)
    buildings_outsidse_buffer['geometry']=buildings_outsidse_buffer['geometry'].centroid
    buildings_in_lat=buildings_outsidse_buffer.to_crs("epsg:4326")
    #making a pandas dataframe of the co-ordinates for the clusttering
    col1=[]
    col2=[]
    index=pd.Index(range(len(buildings_in_lat)))
    buildings_in_lat=buildings_in_lat.set_index(index)

    for i in range(len(buildings_in_lat)):
        x=float(buildings_in_lat['geometry'].loc[[i]].x)
        y=float(buildings_in_lat['geometry'].loc[[i]].y)
        col1.append(x)
        col2.append(y)
    d={'x':col1,'y':col2}
    data=pd.DataFrame(data=d)

    #using K-means clustering
    km=KMeans(n_clusters=150)
    km.fit(data[['x','y']])
    x=km.cluster_centers_
    x=pd.DataFrame(x,columns=['x','y'])
    x_cord=x['x']
    y_cord=x['y']
    geometry=[]
    xPoint = gm.Point()
    for i in range(len(x_cord)):
        xPoint=gm.Point(x_cord[i],y_cord[i])
        geometry.append(xPoint)

    #Taking all the points from the centroid
    points={'geometry':geometry}
    Locations=gpd.GeoDataFrame(points,crs={'init':'epsg:4326'})
    Locations=Locations.to_crs("epsg:32644")
    print(Locations.loc[0])
    #using the Locations point into pandas
    xInLoc= Locations.geometry.x
    yInLoc= Locations.geometry.y
    d={'x':xInLoc,'y':yInLoc}
    data=pd.DataFrame(data=d)
    dbscan = DBSCAN(eps=3000,min_samples=4).fit(data)
    labels=dbscan.labels_
    Locations['label']=labels
    data['label']=labels
    temp=data.copy()
    temp=temp.groupby('label').mean()
    temp=temp.loc[1:]
    temp=temp.set_index(pd.Index(range(0,len(temp))))
    x_cord=temp['x']
    y_cord=temp['y']
    geometry=[]
    for i in range(len(x_cord)):
        xPoint=gm.Point(x_cord[i],y_cord[i])
        geometry.append(xPoint)
    new=gpd.GeoDataFrame({'geometry':geometry})## this is the locations for the hopitals
    print(new)

@api_view(['POST'])
def test(request):
    print("GOt the request")
    responses = request.data
    coordinates= responses['features'][0]['geometry']['coordinates'][0]
    print(coordinates)
    #request = {type: hospital, boundary:{}}
    # response = json.load(request)
    creatingFile()
    print("We are here")
    # if(response.type == "hospital"):
    #     prefix = """[out:json][timeout:50];(node["amenity"="hospital"](around:"""  # this is string of syntex in 'Overpass QL' language
    #     suffix = """););out body;>;out skel qt;"""  # this is string of syntex in 'Overpass QL' language
    #     built_query = prefix + request.boundary + suffix
    #     api = overpy.Overpass()                       # creating a overpass API instance

    #     result = api.query(built_query)
    #     # initializing empty list , we'll use it to form a dataframe .
    #     list_of_node_tags = []
    #     for node in result.nodes:                     # from each node , get the all tags information
    #         node.tags['latitude'] = node.lat
    #         node.tags['longitude'] = node.lon
    #         node.tags['id'] = node.id
    #         list_of_node_tags.append(node.tags)
    #     data_frame = pd.DataFrame(list_of_node_tags)
    return Response("Nirjal", status=220)
