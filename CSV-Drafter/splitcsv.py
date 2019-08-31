f = open('Rankings.csv')
output = open('Split-Rankings.csv', 'w')

for line in f:
    new_line = line[:-2] + "#\r\n"

    output.write(new_line)

f.close()
output.close()