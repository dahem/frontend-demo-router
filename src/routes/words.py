W = [
  '1' , '333', '999999999', '7777777', '4444' , '1', '22', '55555'
]
M = 10

def penalty(i, j):
  d = sum([len(W[x]) for x in range(i, j + 1)]) + (j - i)
  if d > M: print "penalty negative"
  return (M - d) ** 3
print(penalty(4, 7))

def memo_justify_text(words, n, memo):
  memo = [[math.inf for i in range(n)] for j in range(n)]
  print(memo)

def text_justify(words, n, memo):


