import geopandas as gpd
from shapely.geometry import LineString,Polygon, mapping,Point
import shapely
from haversine import haversine
import numpy as np
import pyproj 
M=[]
count=0
road_poss=[]
road_po=[]
lng=float(input("경도를 입력하세요"))
lat=float(input("위도를 입력하세요"))
start=(lat, lng)
road= gpd.read_file("C:/Users/chaepacass/Desktop/찐geojson/교차로 중심점.geojson")
N=range(len(road))
for i in N:
    D=list(road['geometry'][i].coords)
    K=[]
for i in N:
    D=road['geometry'][i].coords
    K.append(D)
for i in N:
    finish=(K[i-1][0][1],K[i-1][0][0])  
    S=haversine(start, finish,unit='m')
#     print(S)
    M.append(S)
    if S <=300:
        road_s=road['RN'][i]
        road_poss.append(road_s)
        count+=1
if count==0:
    print("반경 내 있는 도로는 없고, {}개입니다".format(count))
else:
    print("반경 내 있는 도로는 {}로, {}개입니다".format(road_poss,count))
min=M[0]
for i in M:
    if i< min:
        min=i
for i in N:
    if M[i] <= min:
        min=M[i]
        road_d=road['RN'][i]
        road_po.append(road_d)
print("가장 가까운 도로의 거리는 {}로, {}m 입니다".format(road_po,min))