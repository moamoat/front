import geopandas as gpd
# from shapely.geometry import LineString,Polygon, mapping,Point
# import shapely
from haversine import haversine
import numpy as np
import pyproj 
city= gpd.read_file("C:/Users/chaepacass/Desktop/찐geojson/도심지역 꼭짓점.geojson")
M=[]
K=[]
count=0
service_poss=[]
N=range(len(city))
lng=float(input("경도를 입력하세요"))
lat=float(input("위도를 입력하세요"))
start=(lat, lng)
def citycount(lat, lng):
    for i in N:
        D=city['geometry'][i].coords
        K.append(D)
        finish=(K[i-1][0][1],K[i-1][0][0])  
        S=haversine(start, finish,unit='m')
        M.append(S)
        if S <=300:
            global count
            count+=1
    return print("반경 내 있는 도심권은 {}개입니다".format(count))
    # if count==0:
    #     print("반경 내 있는 도심권은 없고, {}개입니다".format(count))
    # else:
        # print("반경 내 있는 도심권은 {}로, {}개입니다".format(count))
def citymin(lat,lng):
    min_num = M[0]
    for num in M :
        if min_num > num:
            min_num = num
    return print('가장 가까운 도심권 지역의 거리는 ',min_num, 'm 입니다')
    
    # for num in M :
    #     if min_num > num:
    #         min_num = num
    # print('가장 가까운 도심권 지역의 거리는 ',min_num, 'm 입니다')
# a= citycount(lat,lng)
# print(a)
# b= citymin(lat,lng)
# print(b)
citycount(lat,lng)
citymin(lat,lng)
