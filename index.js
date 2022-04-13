var splash_id = 1;
var internal_count = 0;
function toggleSplash() {
    console.log('toggle');
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
00000000000000001011011111111100001010111
00100000000000110000111111111110001010111
00110000000000100010111111111110001000111
00000000000000000001011111111110001000111
00000000000000000011011111101110001010111
00110000000000000001011111111110001010111
00110000000000000010111111111110001010111
00110000000000000001111111111110001010111
00010000000000000011011111111110001010111
00110000000000110001111111111110001010111
00000000000000100011011011111110001010111
00000000000000000011011111111110001010111
00010000000000000011111111011110001010111
00110000000000000000111111111100001010111
00000000000000000001111111111110001010111
00110000000000000011111111111110001010111
00000000000000010000111111111110001010111
00110000000000010000111111111110001010111
00100000000000001001111111111110001010111
00000000000000000001111111111110001010011
00110000000000000000111111111110000000011
00010000000000000011111111111110001010111
00010000000000010010111111111110001010111
00110000000000000001111111111110001010111
00110000000000000011011111111110001010111
00010000000000100011111111111110001010111
00010000000000000000111111111110001010111
00010000000000000011111111111110001010111
00110000000000100010111111111110001000111
00010000000000101010111111111100001010111
00110000000000001011111111111110001010111
00110000000000000011111111111110001010111
00000000000000001010111111111110001010111
00010000000000001000111111111110001010111
00000000000000000010111111111110001010111
00000000000000001001111111111110001010111
00010000000000010011011111111110001010111
00010000000000100011111111111110001010111
00110000000000000011111111111110001010111
00000000000000000011111111111100001010111
00000000000000000010111111111110001010111`; // dorm x year 1 if available, 0 if not (THANKS I HATE THIS)
dorm_avail = dorm_avail.split("\n").slice(1);
console.log(dorm_avail);
for (var i = 0; i < dorm_avail.length; i++) {
    ret = [];
    for (var j = 0; j < dorm_avail[i].length; j++) {
        if (dorm_avail[i].charAt(j) == '0') {
            ret.push(false);
        } else {
            ret.push(true);
        }
    }
    dorm_avail[i] = ret;
}

function drawTTY() {
    const svg = d3.select('#tty-svg');
    svg.selectAll("*").remove();
    var focused_dorm = 'Alumni';
    var focused_years = [1989, 1994, 1999, 2007, 2012];
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
                })
                .on('mouseout', function () {
                    d3.select(this).attr('text-decoration', 'none');
                })
                .on('click', function () {
                    setDorm(d3.select(this));
                })
            );
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
    var image_h = 165;
    var image_x = 150 + image_w / 2;

    for (var i = 1973; i < 2014; i++) {
        var thisyear = {};
        var is_available = dorm_avail[dorm_raws.indexOf(focused_dorm)][i - 1973];
        thisyear.innercirc = svg.append("circle")
            .attr("r", "2")
            .attr("cx", circle_x)
            .attr("cy", previousY);
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
            .attr("fill", "#000");
        if (! is_available) {
            thisyear.innercirc.attr("fill", "#ddd");
            thisyear.text.attr("fill", "#ddd");
        }
        if (focused_years.includes(i)) {
            thisyear.outercirc.style("stroke", "black");
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

    function updateImages() {
        previousY = tab_top + image_h/2;
        svg.selectAll(".tty-images").remove();
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
            console.log(focused_years[i]);
            console.log(focused_dorm);
            svg.append("svg:image")
                .attr("class", "tty-images tty-images-" + i)
                .attr("x", image_x)
                .attr("y", previousY)
                .attr("width", image_w)
                .attr("height", image_h)
                .attr("transform", "translate(" + (-image_w/2) + ", " + (-image_h/2) + ")")
                .attr("xlink:href", "https://raw.githubusercontent.com/califynic/andover-housing/main/assets/yearbooks/" + focused_years[i] + "/" + focused_dorm + "/0.png");        
            previousY += image_h + 10;
        }
    }

    function setHistoryPanel() {
        title.text(focused_dorm);
        var available_years = [];
        for (var i = 1973; i < 2014; i++) {
            if (dorm_avail[dorm_raws.indexOf(focused_dorm)][i - 1973]) {
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
                console.log(options);
                focused_years[i] = options[getIndex(options, focused_years[i])];
            }
        } 
        for (var i = 1973; i < 2014; i++) {
            var is_available = dorm_avail[dorm_raws.indexOf(focused_dorm)][i - 1973];
            if (is_available) {
                years[i + ''].innercirc.attr("fill", "black");
                years[i + ''].text.attr("fill", "black");
            } else {
                years[i + ''].innercirc.attr("fill", "#ddd");
                years[i + ''].text.attr("fill", "#ddd");
            }
            years[i + ''].outercirc.style("stroke", "white");
            if (focused_years.includes(i)) {
                years[i + ''].outercirc.style("stroke", "black");
            }
        }
        console.log('history')
        updateImages();
    }
}

window.onload = drawTTY;
