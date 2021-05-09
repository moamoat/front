from ortools.linear_solver import pywraplp
import pandas as pd 
solver = pywraplp.Solver('자원회수시설', pywraplp.Solver.CBC_MIXED_INTEGER_PROGRAMMING)
from openrouteservice import client, places
import csv
garbage_data = pd.read_csv("C:/Users/chaepacass/Desktop/csv 파일/csv 파일/2021 예측 구별 쓰레기 배출량.csv",encoding='cp949')
기존_균등량= pd.read_csv("C:/Users/chaepacass/Desktop/csv 파일/csv 파일/2021 시설별 반입량,용량.csv",encoding='cp949')
비용=pd.read_csv("C:/Users/chaepacass/Desktop/csv 파일/csv 파일/총비용.csv",encoding='UTF-8')
기존비용=pd.read_csv("C:/Users/chaepacass/Desktop/csv 파일/csv 파일/기존총비용.csv", encoding='UTF-8')
import json
api_key = '5b3ce3597851110001cf6248eb138c5e71164da2a2366a03ac48adb9'

clnt = client.Client(key=api_key)

data = pd.read_csv("C:/Users/chaepacass/Desktop/csv 파일/csv 파일/openroute service distance - 복사본.csv")
data2 = pd.read_csv("C:/Users/chaepacass/Desktop/csv 파일/csv 파일/openroute service distance2.csv")
data.reset_index(drop=True,inplace=True)
cannon = input("경도를 넣으세요")
minch = input("위도를 넣으세요")
sibal = open("C:/Users/chaepacass/Desktop/csv 파일/csv 파일/openroute service distance - 복사본.csv",'a', newline='')
data = csv.writer(sibal)
data.writerow(['new place','Seoul',cannon,minch])
sibal.close()
data=pd.read_csv("C:/Users/chaepacass/Desktop/csv 파일/csv 파일/openroute service distance - 복사본.csv")

import numpy as np
start_x = data.x_start_coord
start_y = data.y_start_coord
finish_x= data2.x_finish_coord
finish_y=data2.y_finish_coord
start_list1= [(b,a) for a,b in zip(start_x,start_y)]
finish_list1 = [(d,c) for c,d in zip(finish_x,finish_y)]
def make_start_list():
    q = start_list1
    w = np.reshape(q,(5,2))
    start_list1=w
    return w
    a = finish_list1
    b = np.reshape(a,(24,2))
    finish_list1=b
    return b
    finish_list1=finish_list1.tolist()
    start_list1=start_list1.tolist()
    start_finish_list=start_list1+finish_list1
k = start_finish_list
p = np.reshape(k,(29,2))
start_finish_list=p

start_finish_list=start_finish_list.tolist()

from openrouteservice import distance_matrix
import requests

body = {"locations":start_finish_list,"destinations":[5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],"metrics":["distance"],"units":"km"}

headers = {
    'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
    'Authorization': '5b3ce3597851110001cf6248eb138c5e71164da2a2366a03ac48adb9',
    'Content-Type': 'application/json; charset=utf-8'
}
call = requests.post('https://api.openrouteservice.org/v2/matrix/driving-hgv', json=body, headers=headers)


distance_matrix = clnt.distance_matrix(**body)
# print(distance_matrix) 
D_ij=distance_matrix.pop('distances')
I = [1,2,3,4,5]
J = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
N = [1,2,3,4]
G = garbage_data["생활폐기물 배출량(톤/일)"]
T = [900,800,750,400,1000]
M = 30
O=기존_균등량["반입량/용량"]
L=[D_ij[0][21]+D_ij[0][19]+D_ij[0][17]+D_ij[0][4]+D_ij[0][16]+D_ij[0][18]+D_ij[0][3]+D_ij[0][20]
,D_ij[1][6]+D_ij[1][7]+D_ij[1][8]+D_ij[1][9]+D_ij[1][10]+D_ij[1][5]
,D_ij[2][0]+D_ij[2][1]+D_ij[2][2]+D_ij[2][11]+D_ij[2][12]
,D_ij[3][13]+D_ij[3][14]+D_ij[3][15]]
C= 비용["총비용"]
P= 기존_균등량["반입량"]
U= 기존_균등량["평균"]
R= 기존비용["기존총비용"]
a_ij = { 
    i: {
        j: solver.BoolVar(f'a_{i}_{j}')
         for j in J
       }
    for i in I 
}
G_j = {
        j:val 
          for(j,val) in zip (J,G) 
   }
            
T_i = {
       i:val
         for (i,val) in zip (I,T) 
          }
O_n = {
       n:val
         for (n,val) in zip (N,O) 
          }
L_n = {
       n:val
         for (n,val) in zip (N,L) 
          }

C_i = {
       i:val
         for (i,val) in zip (I,C) 
          }
P_n = {
       n:val
         for (n,val) in zip (N,P) 
          }
R_n = { 
       n:val
         for (n,val) in zip (N,R) 
          }

K_n = {
       n:val
         for (n,val) in zip (N,R*P) 
          }

U_n = {
       n:val
         for (n,val) in zip (N,U) 
          }
V_n = {
       n:val
         for (n,val) in zip (N,O-U) 
          }


S_i = {
         i: solver.NumVar(0,solver.infinity(),f'S_{i}')
         for i in I
       }


F_i = {
         i: solver.NumVar(0,solver.infinity(),f'F_{i}')
         for i in I
       }

E_i = {
         i: solver.NumVar(0,solver.infinity(),f'E_{i}')
         for i in I
       }

H_i = {
         i: solver.NumVar(0,solver.infinity(),f'H_{i}')
         for i in I
       }

Z_i = {
         i: solver.NumVar(0,solver.infinity(),f'Z_{i}')
         for i in I
       }




for i in I: 
    solver.Add(sum(G_j[j]*a_ij[i][j] for j in J)/T_i[i]==F_i[i])
    
for i in I: 
    solver.Add(sum(sum(G_j[j]*a_ij[i][j] for j in J)/T_i[i] for i in I)/5==E_i[i])
    

for i in I: 
    solver.Add(F_i[i]-E_i[i]+H_i[i]-Z_i[i]==0)

        
for i in I :
    solver.Add(sum(G_j[j]*a_ij[i][j] for j in J)==S_i[i])

    
for i in I :
    for j in J :
          if D_ij[i-1][j-1]>= M:
                solver.Add(a_ij[i][j]==0 )

for j in J :
    solver.Add(sum(a_ij[i][j] for i in I)==1)    
    
solver.Add(a_ij[1][20]==1)
solver.Add(a_ij[2][11]==1)
solver.Add(a_ij[3][13]==1)
solver.Add(a_ij[4][14]==1)


for i in I : 
    solver.Add(F_i[i]>=0.7)
    solver.Add(1>=F_i[i])

            
for n in N: 
        if  V_n[n]<=0:
            V_n[n] = -1*V_n[n] 
        else:
             V_n[n]=V_n[n] 


sum_V = sum([V_n[n] for n in N])
sum_L = sum([L_n[n] for n in N])
sum_K = sum([K_n[n] for n in N])

objective = solver.Objective()
for i in I : 
     for j in J :
            objective.SetCoefficient(a_ij[i][j], D_ij[i-1][j-1]/sum_L)

for i in I : 
        objective.SetCoefficient(S_i[i] , -C_i[i]/sum_K)



for i in I : 
        objective.SetCoefficient(H_i[i] ,1/sum_V)
        objective.SetCoefficient(Z_i[i] ,1/sum_V)

    
objective.SetMinimization()
status = solver.Solve()

if status == pywraplp.Solver.OPTIMAL:
    print(f'An optimal solution was found!!')
    for i in I : 
        for j in J : 
            print(f'a_{i}_{j} =', a_ij[i][j].solution_value())
            
if status == pywraplp.Solver.OPTIMAL:
    print(f'An optimal solution was found!!')
    for i in I :
            print(f'S_{i} =', S_i[i].solution_value())

if status == pywraplp.Solver.OPTIMAL:
      for i in I : 
            print(f'F_{i} =', F_i[i].solution_value())    



elif status == pywraplp.Solver.FEASIBLE:
    print(f'A feasible solution was found!!')
elif status == pywraplp.Solver.INFEASIBLE:
    print(f'Infeasible!!')
elif status == pywraplp.Solver.UNBOUNDED:
    print(f'Unbounded!!')
else:
    print(f'Something went wrong... ResultStatus={status}')
print('Solution:')
print('Objective value =', objective.Value())
for i in I:
    for j in J:
        if i==1:
            if a_ij[i][j].solution_value()==1:
                print("강남자원회수시설에 할당되는 자치구는 {}입니다".format(garbage_data["지역"][j-1]))  
        elif i==2:
            if a_ij[i][j].solution_value()==1:
                print("노원자원회수시설에 할당되는 자치구는 {}입니다".format(garbage_data["지역"][j-1]))
        elif i==3:
            if a_ij[i][j].solution_value()==1:
                print("마포자원회수시설에 할당되는 자치구는 {}입니다".format(garbage_data["지역"][j-1]))
        elif i==4:
            if a_ij[i][j].solution_value()==1:
                print("양천자원회수시설에 할당되는 자치구는 {}입니다".format(garbage_data["지역"][j-1]))
        elif i==5:
            if a_ij[i][j].solution_value()==1:
                print("새로운자원회수시설에 할당되는 자치구는 {}입니다".format(garbage_data["지역"][j-1])) 


with open("C:/Users/chaepacass/Desktop/csv 파일/csv 파일/openroute service distance - 복사본.csv", "r",newline="",encoding='UTF8') as f:
    data= list(csv.reader(f))
with open("C:/Users/chaepacass/Desktop/csv 파일/csv 파일/openroute service distance - 복사본.csv", "w",newline="",encoding='UTF8') as f:
    writer = csv.writer(f)
    for row in data:
        if row[0] !='new place':
            writer.writerow(row)