def memoized_longest_increasingsubseq(v,n):
  memo = [-1] * (n)
  longest_increase_subseq(v,n-1,memo)
  index, lis = 0, 0
  for i in range(1,n):
    if memo[i] > memo[i-1]:
      index = i
  print('Longest Increase Subsequece with is:', memo[index], 'with index:', index)

def longest_increase_subseq(v,k,memo):
  if memo[k] != -1:
    return memo[k]
  if k == 0:
    memo[k] = 1
    return 1
  for i in range(k+1):
    memo[i] = 1 
    for j in range(i):
      if v[i] > v[j]:
        memo[i] = max(memo[i], 1+longest_increase_subseq(v,j,memo))
       
    print(memo)
        

# # v = [1, 2, -1, 0, 1, 2, 3]
v = [1, 2, 4, 5, 3]
# memoized_longest_increasingsubseq(v, len(v))

# Function to get index of ceiling of x in arr[low..high]*/ 
def ceilSearch(arr, low, high, x): 
  
    # If x is smaller than or equal to the first element, 
    # then return the first element */ 
    if x <= arr[low]: 
        return low  
  
    # If x is greater than the last element, then return -1 */ 
    if x > arr[high]: 
        return -1  
   
    # get the index of middle element of arr[low..high]*/ 
    mid = (low + high)/2;  # low + (high - low)/2 */ 
   
    # If x is same as middle element, then return mid */ 
    if arr[mid] == x: 
        return mid 
  
    # If x is greater than arr[mid], then either arr[mid + 1] 
    # is ceiling of x or ceiling lies in arr[mid+1...high] */  
    elif arr[mid] < x: 
        if mid + 1 <= high and x <= arr[mid+1]: 
            return mid + 1
        else: 
            return ceilSearch(arr, mid+1, high, x) 
   
    # If x is smaller than arr[mid], then either arr[mid]  
    # is ceiling of x or ceiling lies in arr[mid-1...high] */    
    else: 
        if mid - 1 >= low and x > arr[mid-1]: 
            return mid 
        else: 
            return ceilSearch(arr, low, mid - 1, x) 

def lis_nlogn(sequence, n):
  I = [10000] * (n + 1)
  I[0] = -10000
  L = [0] * n

  lenI = 1
  for i in range(n):
    if sequence[i] > I[lenI - 1]:
      I[lenI] = sequence[i]
      L[i] = lenI
      lenI += 1
    elif sequence[i] < I[1]:
      I[1] = sequence[i]
      L[i] = 1
    else:
      pos = ceilSearch(I, 0, lenI - 1, sequence[i])
      I[pos] = sequence[i]
      L[i] = pos
  print lenI, L, I


v = [8,1,9,8,3,4,6,1,5,2]
lis_nlogn(v, len(v))
# print(ceilSearch([0,1,4, 10], 0, 3, -1))

# lis_nlogn(v, len(v))