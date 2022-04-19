function wrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            x = text.attr("x"),
            y = text.attr("y"),
            dy = 0, //parseFloat(text.attr("dy")),
            tspan = text.text(null)
                        .append("tspan")
                        .attr("x", x)
                        .attr("y", y)
                        .attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan")
                            .attr("x", x)
                            .attr("y", y)
                            .attr("dy", ++lineNumber * lineHeight + dy + "em")
                            .text(word);
            }
        }
    });
}

var splash_id = 1;
var internal_count = 0;
function toggleSplash() {
    internal_count++;
    if (internal_count % 6 == 0) {
        splash_id = 2;
    } else {
        splash_id = 1;
    }
    var splash = document.getElementById('splash');
    splash.src = 'assets/splash-' + splash_id + '-min.svg';
}
setInterval(toggleSplash, 500);

function tocFix () {
    if (window.innerWidth < 1250) {
      var element = document.getElementById("toc");
      if (element.classList[0] != "toc-overlay") {
        element.style.visibility = "hidden";
        document.getElementById('toc-menu').style.visibility = 'visible';
      }
      element.classList = new Array("toc-overlay");
    } else {
        document.getElementById('toc').style.visibility = "visible";
        var element = document.getElementById("footer");
        var rect = element.getBoundingClientRect();
        var sideHeight = document.getElementById("toc").getBoundingClientRect().height;
        var height = window.innerHeight;
        if (0 < height - rect.y) {
          element = document.getElementById("toc");
          element.classList = new Array("toc-fixed");
        } else {
          element = document.getElementById("toc");
          element.classList = new Array("toc-dynamic");
        }
        document.getElementById('toc-x').style.visibility = 'hidden';
        document.getElementById('toc-menu').style.visibility = 'hidden';
    }
}

setInterval(tocFix, 50);

function getIndex(arr, num) {
  return arr.concat(num).sort(function(a, b) {
    return a - b;
  }).indexOf(num);
}

var abb = ['Alumni', 'America', 'Andover', 'BBailey', 'Carriage', 'Clement', 'DBrick', 'Draper', 'Flagg', 'French', 'Morton', 'Samaritan', 'Stearns', 'Stowe', 'ATWhitney'];
var flg = ['Bartlet', 'Burtt', 'Day', 'Foxcroft', 'Hearsey', 'Newman', 'PaulRevere', 'Smith'];
var pkn = ['Fuess', 'NathanHale', 'AStevens', 'Stimson', 'EStuart'];
var wqn = ['Andover', 'Bancroft', 'Bishop', 'Eaton', 'Isham', 'Pease', 'Pemberton', 'Rockwell'];
var wqs = ['Adams', 'Johnson', 'Taylor', 'Thompson', 'Tucker'];
var dorms = {
    'ABB': abb,
    'FLG': flg,
    'PKN': pkn,
    'WQN': wqn,
    'WQS': wqs
};
var dorm_avail = `
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,0,1,2,1,1,1,1,1,1,1,0,0,0,0,1,0,1,0,1,1,1
0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,1,0,1,1,1
0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,0,0,1,1,1
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,3,0,0,0,1,0,0,0,1,1,1
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1,0,1,1,1,0,0,0,1,0,1,0,1,1,1
0,0,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,5,0,0,0,1,0,1,0,1,1,1
0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,1,0,1,1,1
0,0,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,1,0,1,1,1
0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1,1,1,1,5,0,0,0,1,0,1,0,1,1,1
0,0,2,2,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,1,0,1,1,1
0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,0,1,1,0,1,1,1,1,1,1,8,0,0,0,1,0,1,0,1,1,1
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1,1,1,1,8,0,0,0,1,0,1,0,1,1,1
0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,0,2,2,2,12,0,0,0,1,0,1,0,1,1,1
0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,1,0,1,1,1
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,1,0,1,1,1
0,0,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,1,0,1,0,1,1,1
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,1,1,1,1,2,1,1,1,5,0,0,0,1,0,1,0,1,1,1
0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,0,0,0,1,0,1,0,1,1,1
0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,2,1,2,2,1,2,2,1,2,2,2,4,0,0,0,1,0,1,0,1,1,1
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,1,1,2,1,1,1,1,1,6,0,0,0,1,0,1,0,0,1,1
0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,9,0,0,0,0,0,0,0,0,1,1
0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,1,2,2,2,2,0,0,0,1,0,1,0,1,1,1
0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,1,1,1,1,1,1,1,1,1,8,0,0,0,1,0,1,0,1,1,1
0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,1,1,2,1,3,0,0,0,1,0,1,0,1,1,1
0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,2,2,2,2,2,2,2,2,2,21,0,0,0,1,0,1,0,2,2,1
0,0,0,1,0,0,0,0,0,0,0,0,0,0,2,0,0,0,2,2,2,2,2,2,2,2,2,3,2,2,2,0,0,0,1,0,1,0,1,1,1
0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,0,0,0,1,0,1,0,1,1,1
0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,1,2,2,2,2,2,2,3,0,0,0,1,0,1,0,1,1,1
0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,0,0,1,1,1
0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,2,0,0,0,0,1,0,1,0,1,1,1
0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,2,0,2,2,1,2,2,2,2,2,2,2,2,2,13,0,0,0,1,0,1,0,1,1,1
0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,1,0,2,0,1,1,1
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,3,0,0,0,1,0,1,0,1,1,1
0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,14,0,0,0,1,0,1,0,1,1,1
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,2,0,0,0,1,0,1,0,1,1,1
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,2,0,2,0,2,2,2
0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,1,0,0,2,2,0,2,2,2,2,2,2,2,2,2,10,0,0,0,1,0,1,0,1,1,1
0,0,0,2,0,0,0,0,0,0,0,0,0,0,1,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,19,0,0,0,1,0,1,0,1,1,1
0,0,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,1,1,1,1,1,2,2,2,2,0,0,0,1,0,1,0,1,1,1
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,1,0,1,1,1
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,2,0,0,0,1,0,1,0,1,1,1
`; // dorm x year 1 if available, 0 if not (THANKS I HATE THIS)
dorm_avail = dorm_avail.split("\n").slice(1);
for (var i = 0; i < dorm_avail.length; i++) {
    ret = dorm_avail[i].split(",");
    for (var j = 0; j < ret.length; j++) {
        ret[j] = parseInt(ret[j]); 
    }
    dorm_avail[i] = ret;
}

function drawTTY() {
    const svg = d3.select('#tty-svg');
    svg.selectAll("*").remove();
    var focused_dorm = 'Alumni';
    var focused_years = [1989, 1994, 1999, 2002, 2012];
    var width = svg.node().getBoundingClientRect().width;
    var height = svg.node().getBoundingClientRect().height;
    var clusters = Object.keys(dorms);

    const cluster_cols = ['#e27d60', '#85d0cb', '#e8a87c', '#c38d9e', '#41b3a3'];
    var cluster_ind_width = 20;
    var dorm_height = 20;
    var dorm_left = width - cluster_ind_width;
    var tab_top = 80;
    var dorm_gray = "#888";
    
    var previousY = tab_top;
    var dorm_texts = [];
    var dorm_raws = []

    function setDorm(elem) {
        for (var i = 0; i < dorm_texts.length; i++) {
            dorm_texts[i].attr("font-weight", "400");
            dorm_texts[i].attr("fill", dorm_gray);
            dorm_texts[i].on('mouseover', function () {
                    if (focused_dorm != d3.select(this).text()) {
                        d3.select(this).attr('text-decoration', 'underline');
                    }
                    document.body.style.cursor = "pointer";
                })
                .on('mouseout', function () {
                    d3.select(this).attr('text-decoration', 'none');
                    document.body.style.cursor = "default";
                });
        }
        elem.attr("font-weight", "700");
        elem.attr('text-decoration', 'none');
        elem.attr("fill", "#000");
        focused_dorm = elem.text();
        setHistoryPanel();
    }

    for (var i = 0; i < clusters.length; i++) {
        svg.append('rect')
            .attr('x', dorm_left)
            .attr('y', previousY)
            .attr('width', cluster_ind_width)
            .attr('height', dorm_height * dorms[clusters[i]].length)
            .attr('fill', cluster_cols[i]);
            //.attrs({x: width * 0.9, y: 50 + previousY, width: cluster_ind_width, height: dorm_height * dorms[clusters[i]].length, fill: cluster_cols[i]});
        var cluster_lab = svg.append('text')
            .text(clusters[i])
            .attr('text-anchor', 'middle')
            .attr('font-family', 'bebasneue')
            .attr('x', dorm_left + 0.5 * cluster_ind_width)
            .attr('y', previousY + 0.5 * dorm_height * dorms[clusters[i]].length);
        const centre = cluster_lab.node().getBBox();
        cluster_lab.attr("transform", "rotate(90, " + (centre.x + centre.width / 2) + ", " + (centre.y + centre.height / 2) + ")");

        for (var j = 0; j < dorms[clusters[i]].length; j++) {
            dorm_raws.push(dorms[clusters[i]][j]);
            dorm_texts.push(svg.append('text')
                .text(dorms[clusters[i]][j])
                .attr('text-anchor', 'end')
                .attr('x', dorm_left - 10)
                .attr('y', previousY + 16)
                .attr('fill', dorm_gray)
                .on('mouseover', function () {
                    if (focused_dorm != d3.select(this).text()) {
                        d3.select(this).attr('text-decoration', 'underline');
                    }
                    document.body.style.cursor = "pointer";
                })
                .on('mouseout', function () {
                    d3.select(this).attr('text-decoration', 'none');
                    document.body.style.cursor = "default";
                })
                .on('click', function () {
                    setDorm(d3.select(this));
                })
            );
            if (dorms[clusters[i]][j] == focused_dorm) {
                dorm_texts[dorm_texts.length - 1]
                    .attr("fill", "black")
                    .attr("font-weight", '700')
                    .on('mouseover', function () { })
                    .on('mouseout', function () { });
            }
            previousY += dorm_height;
        }

        previousY += 10;
    }

    var title = svg.append('text')
        .text(focused_dorm)
        .attr('x', 0)
        .attr('y', 50)
        .style("font-size", "32pt");

    var years = {};
    previousY = tab_top;
    var circle_x = 50;
    var vspacing = 21.45;
    var image_w = 350;
    var image_h = 155;
    var image_x = 150 + image_w / 2;

    for (var i = 1973; i < 2014; i++) {
        var thisyear = {};
        var is_available = dorm_avail[dorm_raws.indexOf(focused_dorm)][i - 1973] > 0;
        thisyear.innercirc = svg.append("circle")
            .attr("r", "2")
            .attr("cx", circle_x)
            .attr("cy", previousY)
            .attr("fill", "#888");
        thisyear.outercirc = svg.append("circle")
            .attr("fill", "transparent")
            .style("stroke", "white")
            .attr("r", "4")
            .attr("cx", circle_x)
            .attr("cy", previousY);
        thisyear.y = previousY;
        thisyear.text = svg.append("text")
            .attr("text-anchor", "end")
            .text(i + '')
            .attr('x', circle_x - 10)
            .attr('y', previousY + 4)
            .attr("fill", "#888");
        if (! is_available) {
            thisyear.innercirc.attr("fill", "#ddd");
            thisyear.text.attr("fill", "#ddd");
        } else {
            //thisyear.innercirc.attr("fill", "#888");
            thisyear.text.on('mouseover', function() {
                addYear(d3.select(this));
            });
        }

        if (focused_years.includes(i)) {
            thisyear.text.attr('font-weight', '700');
            thisyear.text.attr('fill', 'black');
        } else {
            thisyear.text.attr('font-weight', '400');
        }

        previousY += vspacing;
        years[i + ''] = thisyear;
    }

    var cached_pairs = [];
    var shuffle_pos = [];
    for (var i = 0; i < focused_years.length; i++) {
        cached_pairs.push([focused_dorm, focused_years[i]]);
        shuffle_pos.push(0);
    }

    var defs = svg.append("defs");
    var back1 = defs.append('filter')
        .attr('id', 'back1')
    back1.append('feColorMatrix')
        .attr('type', 'matrix')
        .attr('values', '0 0 0 0 0.4 0 0 0 0 0.4 0 0 0 0 0.4 0 0 0 0.8 0')
        .attr("result", "gray");
    back1.append("feGaussianBlur")
        .attr('in', 'SourceGraphic')
        .attr("stdDeviation","0.1")
        .attr("result","blur");
    var merge = back1.append('feMerge');
    merge.append('feMergeNode')
        .attr('in', 'blur');
    merge.append('feMergeNode')
        .attr('in', 'gray');
    var back1 = defs.append('filter')
        .attr('id', 'back2')
    back1.append('feColorMatrix')
        .attr('type', 'matrix')
        .attr('values', '0 0 0 0 0.8 0 0 0 0 0.8 0 0 0 0 0.8 0 0 0 0.9 0')
        .attr("result", "gray");
    back1.append("feGaussianBlur")
        .attr('in', 'SourceGraphic')
        .attr("stdDeviation","0.1")
        .attr("result","blur");
    var merge = back1.append('feMerge');
    merge.append('feMergeNode')
        .attr('in', 'blur');
    merge.append('feMergeNode')
        .attr('in', 'gray');

    function shuffleImg(elem) {
        var idx = parseInt(elem.attr('class').split(' ')[1].split("-")[2]);
        shuffle_pos[idx]++;
        if (shuffle_pos[idx] == dorm_avail[dorm_raws.indexOf(focused_dorm)][focused_years[idx] - 1973]) {
            shuffle_pos[idx] = 0;
        }
        svg.selectAll(".tty-images-" + idx)
            .attr("xlink:href", "https://raw.githubusercontent.com/califynic/andover-housing/main/assets/yearbooks/" + focused_years[idx] + "/" + focused_dorm + "/" + shuffle_pos[idx] + ".png")
    }

    var imageYs = [];
    function updateImages() {
        previousY = tab_top + image_h/2;
        svg.selectAll(".tty-images").remove();
        imageYs = [];
        var new_pairs = [];
        for (var i = 0; i < focused_years.length; i++) {
            new_pairs.push([focused_dorm, focused_years[i]]);
        }
        for (var i = 0; i < focused_years.length; i++) {
            if (cached_pairs[0] != new_pairs[0] || cached_pairs[1] != new_pairs[1]) {
                shuffle_pos[i] = 0; 
            }
        }
        cached_pairs = new_pairs;

        for (var i = 0; i < focused_years.length; i++) {
            imageYs.push(previousY);
            var num_pics = dorm_avail[dorm_raws.indexOf(focused_dorm)][focused_years[i] - 1973];
            if (num_pics > 2) {
                svg.append("svg:image")
                    .attr("class", "tty-images back-images tty-images-" + i)
                    .attr("x", image_x + 8)
                    .attr("y", previousY + 15)
                    .attr("width", image_w)
                    .attr("height", image_h)
                    .attr("transform", "translate(" + (-image_w/2) + ", " + (-image_h/2) + ") rotate(-0.4)")
                    .attr("xlink:href", "https://raw.githubusercontent.com/califynic/andover-housing/main/assets/yearbooks/" + focused_years[i] + "/" + focused_dorm + "/" + shuffle_pos[i] + ".png")
                    .attr("filter", "url(#back2)");
            }
            if (num_pics > 1) {
                svg.append("svg:image")
                    .attr("class", "tty-images back-images tty-images-" + i)
                    .attr("x", image_x + 4)
                    .attr("y", previousY + 7.5)
                    .attr("width", image_w)
                    .attr("height", image_h)
                    .attr("transform", "translate(" + (-image_w/2) + ", " + (-image_h/2) + ") rotate(-0.2)")
                    .attr("xlink:href", "https://raw.githubusercontent.com/califynic/andover-housing/main/assets/yearbooks/" + focused_years[i] + "/" + focused_dorm + "/" + shuffle_pos[i] + ".png")
                    .attr("filter", "url(#back1)");
            }
            svg.append("svg:image")
                .attr("class", "tty-images tty-images-" + i)
                .attr("x", image_x)
                .attr("y", previousY)
                .attr("width", image_w)
                .attr("height", image_h)
                .attr("transform", "translate(" + (-image_w/2) + ", " + (-image_h/2) + ")")
                .attr("xlink:href", "https://raw.githubusercontent.com/califynic/andover-housing/main/assets/yearbooks/" + focused_years[i] + "/" + focused_dorm + "/" + shuffle_pos[i] + ".png");        
            svg.selectAll(".tty-images-" + i)
                .on('click', function () {
                    shuffleImg(d3.select(this));
                }).on('mouseover', function () {
                    document.body.style.cursor = 'pointer';
                }).on('mouseout', function () {
                    document.body.style.cursor = 'default';
            });
            previousY += image_h + 20;
        }
    }

    function setHistoryPanel() {
        title.text(focused_dorm);
        var available_years = [];
        for (var i = 1973; i < 2014; i++) {
            if (dorm_avail[dorm_raws.indexOf(focused_dorm)][i - 1973] > 0) {
                available_years.push(i);
            }
        }
        for (var i = 0; i < focused_years.length; i++) {
            if (! available_years.includes(focused_years[i])) {
                var options = [];
                for (var j = 0; j < available_years.length; j++) {
                    if (! focused_years.includes(available_years[j])) {
                        options.push(available_years[j]);
                    }
                }
                focused_years[i] = options[getIndex(options, focused_years[i])];
            }
        } 
        for (var i = 1973; i < 2014; i++) {
            var is_available = dorm_avail[dorm_raws.indexOf(focused_dorm)][i - 1973] > 0;
            if (is_available) {
                years[i + ''].innercirc.attr("fill", "#888");
                years[i + ''].text.attr("fill", "#888");
                years[i + ''].text.on('mouseover', function() {
                    addYear(d3.select(this));
                });
            } else {
                years[i + ''].innercirc.attr("fill", "#ddd");
                years[i + ''].text.attr("fill", "#ddd");
                years[i + ''].text.on('mouseover', function () {});
            }
            years[i + ''].outercirc.style("stroke", "white");
            if (focused_years.includes(i)) {
                years[i + ''].innercirc.attr("fill", "black");
                years[i + ''].outercirc.style("stroke", "black");
                years[i + ''].text.attr('font-weight', '700');
                years[i + ''].text.attr('fill', 'black');
            } else {
                years[i + ''].text.attr('font-weight', '400');
            }
        }
        if (typeof connectors !== 'undefined') {
            for (var i = 0; i < focused_years.length; i++) {
                var path = d3.path();
                var x1 = circle_x + 25;
                var y1 = years[focused_years[i] + ''].y
                var x2 = image_x - image_w / 2;
                var y2 = imageYs[i];
                path.moveTo(x1, y1);
                path.bezierCurveTo(x2, y1, x1, y2, x2, y2);
                path.lineTo(image_x, y2);
                connectors[i].attr("d", path);
            }
        }
        updateImages();
    }

    function addYear(elem) {
        var yr = parseInt(elem.text());
        var dists = [];
        for (var i = 0; i < focused_years.length; i++) {
            dists.push((focused_years[i] - yr) ** 2);
        }
        focused_years[dists.indexOf(Math.min(...dists))] = yr;
        focused_years.sort();
        setHistoryPanel();
    }
    setHistoryPanel();
    var connectors = [];
    for (var i = 0; i < focused_years.length; i++) {
        var path = d3.path();
        var x1 = circle_x + 25;
        var y1 = years[focused_years[i] + ''].y
        var x2 = image_x - image_w / 2;
        var y2 = imageYs[i];
        path.moveTo(x1, y1);
        path.bezierCurveTo(x2, y1, x1, y2, x2, y2);
        path.lineTo(image_x, y2);
        connectors.push(svg.append("path")
            .style("stroke", "black")
            .attr("stroke-width", "1.5px")
            .style("fill", "none")
            .attr("d", path)
            .lower());
    }
}

function drawCHS() {
    const svg = d3.select('#chs-svg');
    svg.selectAll("*").remove();
    var grade_x = 80;
    var y_space = 80;
    var opt_y = 55;
    var opt_x = 180;
    var x_space = 150;
    var previousY = opt_y + 25;
    var colYs = [];
    var rowXs = [];
    var year_nicks = ["Freshmen", "Lowers", "Uppers", "Seniors"];
    var opts = ["9/10 Dorms", "11/12 Dorms", "Stacks"];
    for (var i = 9; i < 13; i++) {
        colYs.push(previousY);
        svg.append("text")
            .attr('text-anchor', 'end')
            .text(i + '')
            .attr('font-size', '24pt')
            .attr("x", grade_x)
            .attr("y", previousY);
        svg.append("text")
            .attr('text-anchor', 'end')
            .text(year_nicks[i - 9])
            .attr('fill', '#888')
            .attr('x', grade_x)
            .attr('y', previousY + 20);
        previousY += y_space;
    }
    var previousX = opt_x;
    for (var i = 0; i < 3; i++) {
        rowXs.push(previousX);
        svg.append("text")
            .text(opts[i])
            .attr('text-anchor', 'middle')
            .attr('x', previousX)
            .attr('y', 20); 
        previousX += x_space;
    }
    /*for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 4; j++) {
            svg.append("rect")
                .attr("x", rowXs[i] - 70)
                .attr("y", colYs[j] - 40)
                .attr("width", x_space - 10)
                .attr("height", y_space - 10);
        }
    }*/
    // 9th graders
    svg.append("rect")
        .attr("x", rowXs[0] - 70)
        .attr("y", colYs[0] - 40)
        .attr("width", x_space - 10)
        .attr("height", y_space - 10)
        .attr('fill', '#e27d60');
    svg.append("text")
        .attr("x", rowXs[0] - 75 + x_space / 2)
        .attr("y", colYs[0] - 40 + y_space / 2)
        .attr('text-anchor', 'middle')
        .text("Placed randomly");

    // 10th graders
    svg.append("rect")
        .attr("x", rowXs[0] - 70)
        .attr("y", colYs[1] - 40)
        .attr("width", x_space - 10)
        .attr("height", y_space - 10)
        .attr('fill', '#e27d60');
    svg.append("text")
        .attr("x", rowXs[0] - 75 + x_space / 2)
        .attr("y", colYs[1] - 40 + y_space / 2)
        .attr('text-anchor', 'middle')
        .text("Same dorm");

    // 11th graders
    svg.append("rect")
        .attr("x", rowXs[0] - 70)
        .attr("y", colYs[2] - 40)
        .attr("width", x_space - 10)
        .attr("height", y_space - 10)
        .attr('fill', '#e8a87c');
    svg.append("text")
        .attr("x", rowXs[0] - 75 + x_space / 2)
        .attr("y", colYs[2] - 40 + y_space / 2)
        .attr('text-anchor', 'middle')
        .text("Prefect");
    svg.append("rect")
        .attr("x", rowXs[1] - 70)
        .attr("y", colYs[2] - 40)
        .attr("width", x_space - 10)
        .attr("height", y_space - 10)
        .attr('fill', '#85d0cb');
    svg.append("text")
        .attr("x", rowXs[1] - 75 + x_space / 2)
        .attr("y", colYs[2] - 40 + y_space / 2)
        .attr('text-anchor', 'middle')
        .text("With friends");
    svg.append("rect")
        .attr("x", rowXs[2] - 70)
        .attr("y", colYs[2] - 40)
        .attr("width", x_space - 10)
        .attr("height", y_space - 10)
        .attr('fill', '#c38d9e');
    svg.append("text")
        .attr("x", rowXs[2] - 75 + x_space / 2)
        .attr("y", colYs[2] - 40 + y_space / 2)
        .attr('text-anchor', 'middle')
        .text("Apply");

    // 12th graders
    svg.append("rect")
        .attr("x", rowXs[0] - 70)
        .attr("y", colYs[3] - 40)
        .attr("width", x_space - 10)
        .attr("height", y_space - 10)
        .attr('fill', '#e8a87c');
    svg.append("text")
        .attr("x", rowXs[0] - 75 + x_space / 2)
        .attr("y", colYs[3] - 40 + y_space / 2)
        .attr('text-anchor', 'middle')
        .text("Prefect");
    svg.append("rect")
        .attr("x", rowXs[1] - 70)
        .attr("y", colYs[3] - 40)
        .attr("width", x_space / 3 - 10)
        .attr("height", y_space - 10)
        .attr('fill', '#85d0cb');
    var tt = svg.append("text")
        .attr("x", rowXs[1] - 75 + x_space / 6)
        .attr("y", colYs[3] - 40 + y_space / 2)
        .attr('text-anchor', 'middle')
        .text("Same");
    var centre = tt.node().getBBox();
    tt.attr("transform", 'rotate(-90, ' + (centre.x + centre.width / 2) + ', ' + (centre.y + centre.height / 2) + ")");
    svg.append("rect")
        .attr("x", rowXs[1] - 70 + x_space / 3)
        .attr("y", colYs[3] - 40)
        .attr("width", x_space / 3 - 10)
        .attr("height", y_space - 10)
        .attr('fill', '#85d0cb');
    var tt = svg.append("text")
        .attr("x", rowXs[1] - 75 + x_space / 2)
        .attr("y", colYs[3] - 40 + y_space / 2)
        .attr('text-anchor', 'middle')
        .text("Proctor");
    var centre = tt.node().getBBox();
    tt.attr("transform", 'rotate(-90, ' + (centre.x + centre.width / 2) + ', ' + (centre.y + centre.height / 2) + ")");
    svg.append("rect")
        .attr("x", rowXs[1] - 70 + 2 * x_space / 3)
        .attr("y", colYs[3] - 40)
        .attr("width", x_space / 3 - 10)
        .attr("height", y_space - 10)
        .attr('fill', '#41b3a3');
    var tt = svg.append("text")
        .attr("x", rowXs[1] - 75 + 5 * x_space / 6)
        .attr("y", colYs[3] - 40 + y_space / 2)
        .attr('text-anchor', 'middle')
        .text("Change");
    var centre = tt.node().getBBox();
    tt.attr("transform", 'rotate(-90, ' + (centre.x + centre.width / 2) + ', ' + (centre.y + centre.height / 2) + ")");
    svg.append("rect")
        .attr("x", rowXs[2] - 70)
        .attr("y", colYs[3] - 40)
        .attr("width", x_space - 10)
        .attr("height", y_space - 10)
        .attr('fill', '#c38d9e');
    svg.append("text")
        .attr("x", rowXs[2] - 75 + x_space / 2)
        .attr("y", colYs[3] - 40 + y_space / 2)
        .attr('text-anchor', 'middle')
        .text("Apply");
}

function toggleBar(elem, to) {
    if (to == 'on') {
        d3.selectAll('.' + elem.attr('class') + '-toggle').attr('visibility', 'visible');
    } else {
        d3.selectAll('.' + elem.attr('class') + '-toggle').attr('visibility', 'hidden');
    }
}

function drawStaggeredBar(svg, barY, barH, bar_left, bar_right, opt_names, props, show, unique) {
    var cum_sum = 0;
    var cols = ["#41b3a3", "#c38d9e", "#e27d60", "#e8a87c", "#85d0cb"];
    var cols_trans = [];
    var cols_trans2 = [];
    for (var i = 0; i < cols.length; i++) {
        cols_trans.push(d3.rgb(cols[i]));
        cols_trans[i].opacity = 0.6;
        cols_trans2.push(d3.interpolateRgb(cols[i], "#ffffff")(0.95));
        cols_trans2[i].opacity = 0.8;
        cols[i] = d3.rgb(cols[i]).darker();
    }

    var text_elem = svg.append('g');
    var bar_elem = svg.append('g');
    for (var i = 0; i < props.length; i++) {
        var classname = opt_names[i].search(/[^A-Za-z]/);
        if (classname == -1) {
            classname = opt_names[i].length;
        }
        var classname = opt_names[i].substring(0, classname);

        if (show[i]) {
            text_elem.append("text")
                .attr("x", bar_left + (bar_right - bar_left) * (cum_sum + props[i] / 2))
                .attr("y", barY + barH / 2 + 5)
                .attr("fill", cols[i])
                .attr('font-family', 'bebasneue')
                .attr("text-anchor", 'middle')
                .text(opt_names[i]);
        }

        bar_elem.append("rect")
            .attr('class', unique + "-" + classname)
            .attr("x", bar_left + (bar_right - bar_left) * cum_sum)
            .attr("y", barY)
            .attr("width", (bar_right - bar_left) * props[i])
            .attr("height", barH)
            .attr("fill", cols_trans[i % cols.length]) .attr('stroke', cols[i % cols.length])
            .attr('stroke-width', '0px')
            .on('mouseover', function () {
                d3.select(this).attr('stroke-width', '1.5px').raise();
                toggleBar(d3.select(this), 'on');
            }).on('mouseout', function () {
                d3.select(this).attr('stroke-width', '0px').lower();
                toggleBar(d3.select(this), 'off'); 
            });

        var label = svg.append("text")
            .attr('class', unique + "-" + classname + '-toggle')
            .text(opt_names[i] + ": " + Math.round(props[i] * 100) + '%')
            .attr("x", bar_left + (bar_right - bar_left) * (cum_sum + props[i] / 2))
            .attr("y", barY + barH + 30)
            .attr("text-anchor", "middle")
            .attr('visibility', 'hidden');
        var bbox = label.node().getBBox();
        var bx = bar_left + (bar_right - bar_left) * (cum_sum + props[i] / 2);
        var by = barY + barH;
        var p = d3.path();
        p.moveTo(bx, by);
        p.lineTo(bx - 5, bbox.y);
        p.lineTo(bbox.x - 5, bbox.y);
        //p.lineTo(bbox.x - 5, bbox.y + bbox.height);
        //p.lineTo(bbox.x + bbox.width + 5, bbox.y + bbox.height);
        p.moveTo(bbox.x + bbox.width + 5, bbox.y);
        p.lineTo(bx + 5, bbox.y);
        p.lineTo(bx, by);
        var p_full = d3.path();
        p_full.moveTo(bx, by);
        p_full.lineTo(bx - 5, bbox.y);
        p_full.lineTo(bbox.x - 5, bbox.y);
        p_full.lineTo(bbox.x - 5, bbox.y + bbox.height);
        p_full.lineTo(bbox.x + bbox.width + 5, bbox.y + bbox.height);
        p_full.lineTo(bbox.x + bbox.width + 5, bbox.y);
        p_full.lineTo(bx + 5, bbox.y);
        p_full.lineTo(bx, by);
        svg.append("path")
            .attr('class', unique + "-" + classname + '-toggle')
            .style('fill', cols_trans2[i])
            .attr('d', p_full)
            .attr('visibility', 'hidden');
        svg.append("path")
            .attr('class', unique + "-" + classname + '-toggle')
            .style("stroke", "black")
            .attr("stroke-width", "1.5px")
            .style('fill', 'white')
            .attr('d', p)
            .attr('visibility', 'hidden');
        label.raise();
        
        cum_sum += props[i];
    }
}

function drawPOC() {
    const svg = d3.select('#poc-svg');
    svg.selectAll("*").remove();
    var width = svg.node().getBoundingClientRect().width;
    var height = svg.node().getBoundingClientRect().height;

    svg.append("text")
        .text("?")
        .attr('font-weight', '700')
        .attr('font-size', '150pt')
        .attr('font-family', 'bebasneue')
        .attr('text-anchor', 'end')
        .attr('fill', '#ddd')
        .attr('x', width * 0.95)
        .attr('y', height - 20);
    svg.append("text")
        .text("from the survey")
        .attr('font-weight', '700')
        .attr('font-size', '13pt')
        .attr('fill', '#333')
        .attr('text-anchor', 'end')
        .attr('x', width)
        .attr('y', height - 20)
        .call(wrap, width - 50);
    svg.append("text")
        .text("Do you think the dorm you live in influences how you are perceived on campus?")
        .attr('font-size', '18pt')
        .attr('x', 50)
        .attr('y', 50)
        .call(wrap, width - 100);

    var barY = 100;
    var barH = 50;
    var bar_left = 50;
    var bar_right = width - 50;

    var opt_names = ["Yes", "Somewhat", "No"];
    var show = [true, false, true];
    var props = [0.53, 0.13, 0.34];
    drawStaggeredBar(svg, barY, barH, bar_left, bar_right, opt_names, props, show, 'poc');
}

function drawIFG() {
    const svg = d3.select('#ifg-svg');
    svg.selectAll("*").remove();
    var width = svg.node().getBoundingClientRect().width;
    var height = svg.node().getBoundingClientRect().height;

    svg.append("text")
        .text("?")
        .attr('font-weight', '700')
        .attr('font-size', '150pt')
        .attr('font-family', 'bebasneue')
        .attr('text-anchor', 'end')
        .attr('fill', '#ddd')
        .attr('x', width * 0.95)
        .attr('y', height - 20);
    svg.append("text")
        .text("from the survey")
        .attr('font-weight', '700')
        .attr('font-size', '13pt')
        .attr('fill', '#333')
        .attr('text-anchor', 'end')
        .attr('x', width)
        .attr('y', height - 20)
        .call(wrap, width - 50);
    svg.append("text")
        .text("Do you think the dorm you live in influences friends/social circles?")
        .attr('font-size', '18pt')
        .attr('x', 50)
        .attr('y', 50)
        .call(wrap, width - 100);

    var barY = 100;
    var barH = 50;
    var bar_left = 50;
    var bar_right = width - 50;

    var opt_names = ["Yes", "Somewhat", "No"];
    var show = [true, false, true];
    var props = [0.84, 0.06, 0.10];
    drawStaggeredBar(svg, barY, barH, bar_left, bar_right, opt_names, props, show, 'ifg');
}

function drawFDA() {
    const svg = d3.select('#fda-svg');
    svg.selectAll("*").remove();
    var width = svg.node().getBoundingClientRect().width;
    var height = svg.node().getBoundingClientRect().height;

    svg.append("text")
        .text("?")
        .attr('font-weight', '700')
        .attr('font-size', '150pt')
        .attr('font-family', 'bebasneue')
        .attr('text-anchor', 'end')
        .attr('fill', '#ddd')
        .attr('x', width * 0.95)
        .attr('y', height - 20);
    svg.append("text")
        .text("from the survey")
        .attr('font-weight', '700')
        .attr('font-size', '13pt')
        .attr('fill', '#333')
        .attr('text-anchor', 'end')
        .attr('x', width)
        .attr('y', height - 20)
        .call(wrap, width - 50);
    svg.append("text")
        .text("What factor do you think most influenced your dorm assignment?")
        .attr('font-size', '18pt')
        .attr('x', 50)
        .attr('y', 50)
        .call(wrap, width - 100);

    var barY = 100;
    var barH = 50;
    var bar_left = 50;
    var bar_right = width - 50;

    var opt_names = ["Friends", "Proctor or Prefect", "9-10 dorm", "Cluster", "None"];
    var show = [true, true, true, true, false];
    var props = [0.37, 0.30, 0.18, 0.13, 0.02];
    drawStaggeredBar(svg, barY, barH, bar_left, bar_right, opt_names, props, show, 'fda');
}

function drawATN() {
    const svg = d3.select('#atn-svg');
    svg.selectAll("*").remove();
    var width = svg.node().getBoundingClientRect().width;
    var height = svg.node().getBoundingClientRect().height;

    svg.append("text")
        .text("?")
        .attr('font-weight', '700')
        .attr('font-size', '150pt')
        .attr('font-family', 'bebasneue')
        .attr('text-anchor', 'end')
        .attr('fill', '#ddd')
        .attr('x', width * 0.95)
        .attr('y', height - 20);
    svg.append("text")
        .text("from the survey")
        .attr('font-weight', '700')
        .attr('font-size', '13pt')
        .attr('fill', '#333')
        .attr('text-anchor', 'end')
        .attr('x', width)
        .attr('y', height - 20)
        .call(wrap, width - 50);
    svg.append("text")
        .text("Do you feel your dorm assignment is accurate to your wants/needs in the housing process?")
        .attr('font-size', '18pt')
        .attr('x', 50)
        .attr('y', 50)
        .call(wrap, width - 100);

    var barY = 100;
    var barH = 50;
    var bar_left = 50;
    var bar_right = width - 50;

    var opt_names = ["Yes", "Somewhat", "No"];
    var show = [true, false, true];
    var props = [0.73, 0.09, 0.18];
    drawStaggeredBar(svg, barY, barH, bar_left, bar_right, opt_names, props, show, 'atn');
}

function drawSVGs() {
    drawCHS();
    drawTTY();
    drawPOC();
    drawIFG();
    drawFDA();
    drawATN();
}

window.onload = function () {
    tocFix();
    drawSVGs();
    window.addEventListener('resize', drawSVGs);

    var x = document.getElementById('toc-x');
    var menu = document.getElementById('toc-menu');

    x.addEventListener('mouseover', function () {
        x.src = "assets/x-blue.svg";
        document.body.style.cursor = "pointer";
    }, false);
    x.addEventListener('mouseout', function () {
        x.src = "assets/x.svg";
        document.body.style.cursor = "default";
    }, false);

    menu.addEventListener('mouseover', function () {
        menu.src = "assets/menu-blue.svg";
        document.body.style.cursor = "pointer";
    }, false);
    menu.addEventListener('mouseout', function () {
        menu.src = "assets/menu.svg";
        document.body.style.cursor = "default";
    }, false);

    x.addEventListener('click', function () {
        document.getElementById('toc').style.visibility = 'hidden';
        x.style.visibility = 'hidden';
        menu.style.visibility = 'visible';
    });
    menu.addEventListener('click', function () {
        document.getElementById('toc').style.visibility = 'visible';
        x.style.visibility = 'visible';
        menu.style.visibility = 'hidden';
    });
}
