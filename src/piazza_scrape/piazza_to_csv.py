import csv, json,re

def cleanhtml(raw):
    cleanr = re.compile('<.*?>')
    cleantext = re.sub(cleanr, '', raw)
    return cleantext

def cleanpin(raw):
    cleantext = re.sub('#pin','',raw)
    return cleantext

raw = json.load(open('ISYE6105_Spring_2019.json','r', encoding = 'utf8'))
post_list = raw[0]['posts']
out = []
for i in post_list:
    folders = i['folders'] #list
    question_block = i['history'][0] #dict
    subject = question_block['subject']
    raw_content = question_block['content']
    unique_views = i['unique_views']
    if i['type'] == 'question':
        content = cleanpin(cleanhtml(raw_content.replace('\u00a0',' ').replace('\n',' '))).strip()
        #answer = question_block['children'][0]['history']['content']
        out.append([subject, content, str(folders), unique_views])

with open('piazza.csv', 'w') as fout:
    writer = csv.writer(fout)
    writer.writerow(['post title', 'post content', 'folders', 'number of unique views'])
    writer.writerows(out)

