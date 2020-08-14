from collections import defaultdict
import MeCab
import sys
import json

data = sys.stdin.readline()
mecab = MeCab.Tagger('-Ochasen')
mecab = mecab.parse(data).strip().split('\n')
sdict = defaultdict(int)
for index in range(len(mecab) - 1):
    string = mecab[index].split('\t')
    sdict[string[3]] += 1
print(json.dumps(sdict, ensure_ascii=False))
