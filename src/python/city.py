import geopandas as gpd
from shapely.geometry import LineString,Polygon, mapping,Point
import shapely
from haversine import haversine
import numpy as np
import pyproj 
from fiona.crs import from_epsg
city= gpd.read_file("C:/Users/chaepacass/Desktop/찐geojson/도심지역 꼭짓점.geojson")
N=range(len(city))
for i in N:
    D=list(city['geometry'][i].coords)
K=[]
for i in N:
    D=city['geometry'][i].coords
    K.append(D)
M=[]
count=0
service_poss=[]
lng=float(input("경도를 입력하세요"))
lat=float(input("위도를 입력하세요"))
start=(lat, lng)
for i in N:
    finish=(K[i-1][0][1],K[i-1][0][0])  
    S=haversine(start, finish,unit='m')
#     print(S)
    M.append(S)
    if S <=300:
        count+=1
if count==0:
    print("반경 내 있는 도심권은 없고, {}개입니다".format(count))
else:
    print("반경 내 있는 도심권은 {}로, {}개입니다".format(count))
min_num = M[0]
for num in M :
    if min_num > num:
        min_num = num
print('가장 가까운 도심권 지역의 거리는 ',min_num, 'm 입니다')
