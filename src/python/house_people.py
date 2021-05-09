import geopandas as gpd
import numpy as np
from haversine import haversine
count=0
peo=0
hous=0
K=[]
lng=float(input("경도를 입력하세요"))
lat=float(input("위도를 입력하세요"))
start=(lat, lng)
people = gpd.read_file("C:/Users/chaepacass/Desktop/찐geojson/주거인구.geojson")
N=range(len(people))
# for i in N:
#     D=list(people['geometry'][i].coords)
def house_people_count(lat,lng):
    for i in N:
        D=people['geometry'][i].coords
        K.append(D)
    for i in N:
        finish=(K[i-1][0][1],K[i-1][0][0])    
        D=haversine(start, finish,unit='km')
        if D <=2:
            global peo 
            global hous
            peo+= people['POP'][i-1]
            hous+= people['HOUS'][i-1]
    return print("반경 2km내 총 주거 인구는 {} 명이고 총 가구 수는 {}세대입니다".format(int(peo),int(hous)))
# print("반경 2km내 총 가구 수는 {} 세대입니다".format(int(hous)))
house_people_count(lat,lng)