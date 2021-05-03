import geopandas as gpd
import numpy as np
import pandas as pd 
from haversine import haversine

heat = pd.read_csv("C:/Users/chaepacass/Desktop/난방공사.csv",encoding='UTF-8')
N=range(5)
count=0
heat_poss=None
lat=float(input("위도를 입력하세요"))
lng=float(input("경도를 입력하세요"))
start=(lat, lng)
for i in N:
    finish=(heat['x'][i],heat['y'][i])    
    D=haversine(start, finish,unit='m')
    if D <=500:
        print(D)
        heat_poss= heat['name'][i]
        count+=1
if count==0:
    print("반경 내 있는 가까운 폐열 소요처는 없고, {}개입니다".format(count))
else:
    print("반경 내 있는 가까운 폐열 소요처는 {}로, {}개입니다".format(heat_poss,count))