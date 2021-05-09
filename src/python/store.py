import geopandas as gpd
from shapely.geometry import LineString,Polygon, mapping,Point
import shapely
from haversine import haversine
import numpy as np
store= gpd.read_file("C:/Users/chaepacass/Desktop/찐geojson/상업구역 꼭짓점.geojson")
N=range(len(store))
M=[]
count=0
lng=float(input("경도를 입력하세요"))
lat=float(input("위도를 입력하세요"))
start=(lat, lng)
K=[]
def storecount(lat,lng):
    for i in N:
        D=store['geometry'][i].coords
        K.append(D)
    for i in N:
        finish=(K[i-1][0][1],K[i-1][0][0])  
        S=haversine(start, finish,unit='m')
        M.append(S)
        if S <=300:
            global count
            count+=1
    return print("반경 내 있는 상업지역은 {}개입니다".format(count))
# if count==0:
#     print("반경 내 있는 상업지역은 없고, {}개입니다".format(count))
# else:
#     print("반경 내 있는 상업지역은 {}개입니다".format(count))
def storemin(lat,lng):
    min_num = M[0]
    for num in M :
        if min_num > num:
            min_num = num
    return print('가장 가까운 상업 지역의 거리는 {}m입니다'.format(min_num))
storecount(lat,lng)
storemin(lat,lng)
