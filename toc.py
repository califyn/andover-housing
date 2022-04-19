"""
    adds table of contents to html files.
    allows regeneration.

    do not use ids with headers while using this.
    keep all headers on one line.
    insert <!--toc here--> where you want the ToC to go.

    usage:
        python toc.py [file_name]
"""

import random 
import argparse
from titlecase import titlecase

parser = argparse.ArgumentParser()
parser.add_argument('file')
args = parser.parse_args()

with open(args.file, "r") as f:
    html = f.read().split("\n")

# get main content only
main_start = ["div id=\"main\"" in line for line in html].index(True)
before_main = html[:main_start]
html = html[main_start:]
div_counter = 0 
for i, line in enumerate(html):
    if "<div" in line:
        div_counter += 1
    elif "</div" in line:
        div_counter -= 1
    
    if div_counter == 0:
        after_main = html[i + 1:]
        html = html[:i + 1]
        break

# delete old toc if it exists
toc_start = None
if "div id=\"toc\"" in "\n".join(html):
    toc_start = ["div id=\"toc\"" in line for line in html].index(True)
    toc_ind = html[toc_start]
    toc_ind = toc_ind[:toc_ind.find("<")]

    div_counter = 0 
    for i in range(toc_start, len(html)):
        if "<div" in html[i]:
            div_counter += 1
        elif "</div" in html[i]:
            div_counter -= 1
        
        if div_counter == 0:
            toc_end = i
            break
    
    html = html[:toc_start] + html[toc_end + 1:]

class Header:
    def __init__(self, line_num, line):
        if not hasattr(self.__class__, 'instances'):
            self.__class__.instances = []
        self.__class__.instances.append(self)
        self.line_num = line_num
        self.line = line

        if line_num != -1:
            self.level = int(line[line.find("h") + 1]) # h1, h2, h3 etc
            self.content = line[line.find(">") + 1:line.rindex("<")]
            while "<" in self.content:
                self.content = self.content[:self.content.find("<")] + self.content[self.content.find(">") + 1:]
            if "id=\"" in self.line:
                self.id = line[line.find("id=\"") + len("id=\""):]
                self.id = self.id[:self.id.find("\"")]
            else:
                self.id = ""
        else:
            self.level = 0 
            self.id = ""

        self.children = []

    def with_id(self):
        if self.id.startswith("toc-"):
            return self.line
        elif self.id != "":
            raise Exception("header shouldn't have non toc id")

        new_id = ""
        idx = 0
        while not self.__class__.is_fresh(new_id):
            new_id = "toc-"
            content = list(self.content)
            content = [c for c in content if c.isalpha()]
            content = "".join(content)
            if len(content) > 5:
                content = content[::len(content) // 5]
            content = content.lower()
            new_id += content
            if idx > 0:
                new_id += "-" + str(idx)
            idx += 1

        self.id = new_id
        before_id = self.line[:self.line.find(">")]
        after_id = self.line[self.line.find(">"):]
        line = before_id + " id=\"" + self.id + "\"" + after_id
        return line

    def add_child(self, child):
        self.children.append(child)

    @classmethod
    def is_fresh(cls, maybe_id):
        ids = [h.id for h in cls.instances]
        return maybe_id not in ids

src = Header(-1, "")
parents = [src, src, src]

for i, line in enumerate(html):
    if "<h" in line: 
        elem = Header(i, line)
        parents[elem.level - 1].add_child(elem)
        if elem.level < 3:
            parents[elem.level:] = [elem] * (len(parents) - elem.level)
        html[i] = elem.with_id() # add id to line

if toc_start == None:
    toc_start = ["toc here" in line for line in html].index(True)
    toc_ind = html[toc_start]
    toc_ind = toc_ind[:toc_ind.find("<")]
    html.pop(toc_start)

toc_str = toc_ind + "<div id=\"toc\">\n"
wrote_hbar = False

def draw_h(header):
    global toc_str, wrote_hbar

    if header.level >= 1:
        toc_str += toc_ind + ("\t" * header.level) + "<p class=\"toc-elem toc-header-" + str(header.level) + "\"><a href=\"#" + header.id + "\">" + titlecase(header.content) + "</a></p>\n"
        if not wrote_hbar:
            toc_str += toc_ind + "\t<hr />\n"
            wrote_hbar = True
    for child in header.children:
        draw_h(child)

draw_h(src)
toc_str += toc_ind + "\t<img src=\"assets/menu.svg\" id=\"toc-menu\">\n"
toc_str += toc_ind + "\t<img src=\"assets/x.svg\" id=\"toc-x\">\n"
toc_str += toc_ind + "</div>" 

html = html[:toc_start] + toc_str.split("\n") + html[toc_start:]
html = before_main + html + after_main

with open(args.file, "w") as f:
    f.write("\n".join(html))
