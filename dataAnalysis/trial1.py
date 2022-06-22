#!/usr/bin/env python
# coding: utf-8

# In[5]:


import geopandas as gpd
import matplotlib.pyplot as plt
import pandas as pd


# In[7]:


from shapely import geometry


# In[ ]:





# In[ ]:





# In[86]:


points = gpd.read_file(r"SampleShapeFile/shape/points.shp")


# In[90]:


points['geometry']


# In[13]:


points=points.to_crs('epsg:32644')


# In[85]:


hospitals= gpd.GeoDataFrame(points.loc[[1]],crs={'init':'epsg:32644'})
print(hospitals)
print(len(hospitals))
j=0
for i in range(len(points)): 
    if points.loc[i]['type'] == "hospital":
        hospitals=hospitals.append(points.loc[i])


# In[84]:


hospitals


# In[19]:


figure,ax1 = plt.subplots(figsize=(15,15))

hospitals.plot(ax=ax1,color='red')


# In[21]:


hospitals.crs


# In[23]:


buffer_zone1=hospitals.buffer(5000)
figure,ax=plt.subplots(figsize=(15,15))
hospitals.plot(ax=ax,color='red')


# In[ ]:





# In[25]:


figure,(ax1,ax2)=plt.subplots(2,figsize=(15,15))
hospitals.plot(ax=ax1,color='red')
hospitals.plot(ax=ax2,color='blue')
buffer_zone1.plot(ax=ax2,color='green')


# In[27]:


buffer_zone1.plot()


# In[29]:


buffer_zone1.area


# In[31]:


total_area=sum(buffer_zone1.area)


# In[33]:


total_area


# In[35]:


buffer_zone1=gpd.GeoDataFrame(geometry=gpd.GeoSeries(buffer_zone1))


# In[44]:


type(buffer_zone1)


# In[45]:


from shapely.ops import unary_union


# In[46]:


buffer_zone1


# In[47]:


merged=buffer_zone1.loc[1]


# In[48]:


type(merged)


# In[49]:


buffer_zone1


# In[50]:


hospitals


# In[51]:


buffer_zone1


# In[52]:


buffer_zone1.plot()


# In[53]:


merged=gpd.overlay(buffer_zone1.loc[[3]],buffer_zone1.loc[[69]],how='union')


# In[54]:


figure,ax=plt.subplots()

buffer_zone1.plot(ax=ax,color='red')
merged.plot(ax=ax,color="blue")


# In[55]:


buffer_zone1


# In[ ]:





# In[56]:


trial=(buffer_zone1)
buffer_zone1=gpd.GeoDataFrame(geometry=gpd.GeoSeries(buffer_zone1))


# In[57]:


union=gpd.overlay(buffer_zone1.loc[[1]],buffer_zone1.loc[[5]],how='union')


# In[58]:


union


# In[59]:


union['common']=1


# In[60]:


dissolved=union.dissolve(by = 'common')


# In[61]:


dissolved


# In[62]:


buffer_zone1


# In[63]:


buffer_zone1.drop_duplicates(inplace=True)


# In[64]:


buffer_zone1


# In[65]:


merged = buffer_zone1.loc[[1]]


# In[66]:


print(buffer_zone1)


# In[67]:


index = pd.Index(range(0,108))
buffer_zone1=buffer_zone1.set_index(index)
buffer_zone1


# In[68]:


merged=buffer_zone1.loc[[0]]


# In[69]:


for i in range(len(buffer_zone1)):
    merged=gpd.overlay(merged,buffer_zone1.loc[[i]],how='union')
    merged['column']=1
    merged=merged.dissolve()
    merged.crs='epsg:32644'


# In[70]:


merged


# In[71]:


merged.area


# In[72]:


merged.plot()


# In[73]:


olygon=geometry.Polygon([[85.27, 27.75], [85.99, 27.75], [85.99, 27.337], [85.27, 27.337]])


# In[74]:


d = { 'geometry': [olygon]}


# In[75]:


rectangle=gpd.GeoDataFrame(d,crs={'init':'epsg:4326'})


# In[76]:


rectangle.plot(color='red')


# In[77]:


rectangle=rectangle.to_crs('epsg:32644')


# In[78]:


figure,ax=plt.subplots(figsize=(20,20))
rectangle.plot(ax=ax,color="red")
merged.plot(ax=ax,color='blue')


# In[79]:


buffer_in_rectangle=gpd.clip(merged,rectangle)
buffer_in_rectangle.plot()


# In[80]:


non_buffer=gpd.overlay(rectangle,merged,how='difference')


# In[ ]:





# In[81]:


type(non_buffer)


# In[91]:


non_buffer.plot()


# In[92]:


hospitals


# In[93]:


non_buffer.area


# In[94]:


rectangle.area


# In[95]:


buffer_zone1.area


# In[105]:


percentage=(merged.area)/(rectangle.area)*100


# In[106]:


print(percentage)


# In[ ]:




