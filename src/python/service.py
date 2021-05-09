import geopandas as gpd
import numpy as np
from haversine import haversine
service = gpd.read_file("C:/Users/chaepacass/Desktop/찐geojson/생활서비스시설.geojson")
N=range(len(service))
K=[]
count=0
service_poss=[]
lng=float(input("경도를 입력하세요"))
lat=float(input("위도를 입력하세요"))
start=(lat, lng)
def servicecount(lat,lng):
    for i in N:
        D=service['geometry'][i].coords
        K.append(D)
    for i in N:
        finish=(K[i-1][0][1],K[i-1][0][0])    
        D=haversine(start, finish,unit='m')
        if D <=300:
            global count
            service_s=service['LABEL'][i]
            service_poss.append(service_s)
            count+=1
    return print("반경 내 있는 생활서비스는 {}로, {}개입니다".format(service_poss,count))
# if count==0:
#     print("반경 내 있는 생활서비스는 없고, {}개입니다".format(count))
# else:
#     print("반경 내 있는 생활서비스는 {}로, {}개입니다".format(service_poss,count))
servicecount(lat,lng)