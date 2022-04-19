"""
    fixes html files by replacing common symbols with their html codes

    usage:
        python fixer.py [file_name]
"""

import argparse

parser = argparse.ArgumentParser()
parser.add_argument('file')
args = parser.parse_args()

swap_pairs = [["—", "&mdash;"], ["’", "&apos;"], ["“", "\""], ["”", "\""], ["…", "..."], ["‘", "&apos;"], ["’", "&apos;"]]

with open(args.file, "r") as f:
    contents = f.read() 

for pair in swap_pairs:
    contents = contents.replace(pair[0], pair[1])

with open(args.file, "w") as f:
    f.write(contents)
