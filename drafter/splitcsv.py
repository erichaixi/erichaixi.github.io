f = open('Rankings.csv')
output = open('Split-Rankings.csv', 'w')

for line in f:
    new_line = line[:-4] + "#\r\n"

    if "ESPN" in new_line[0]:
        continue
    output.write(new_line)

f.close()
output.close()