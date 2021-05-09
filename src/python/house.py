import geopandas as gpd
# from shapely.geometry import LineString,Polygon, mapping,Point
# import shapely
from haversine import haversine
import numpy as np
# import pyproj 
road= gpd.read_file("C:/Users/chaepacass/Desktop/찐geojson/주거구역.geojson")
N=range(len(road))
lng=float(input("경도를 입력하세요"))
lat=float(input("위도를 입력하세요"))
start=(lat, lng)
K=[]
M=[]
count=0
Temp = 0
def housecount(lat,lng):
    for i in N:
        D=road['geometry'][i].coords
        K.append(D)
    for i in N:
        finish=(K[i-1][0][1],K[i-1][0][0])  
        S=haversine(start, finish,unit='m')
    #     print(S)
        M.append(S) 
        if S <=300:
            global count
            count+=1
    return  print("반경 내 있는 주거지역은 {}개입니다".format(count))
    # if count==0:
    #     print("반경 내 있는 주거지역은 없고, {}개입니다".format(count))
    # else:
        # print("반경 내 있는 주거지역은 {}개입니다".format(count))
def housemin(lat,lng):
    min_num = M[0]
    for num in M :
        if min_num > num:
            min_num = num
    return print('가장 가까운 주거지역과 거리는 ',min_num,'m 입니다')
housecount(lat,lng)
housemin(lat,lng)