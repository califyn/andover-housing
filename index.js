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


function drawTTY() {
    const svg = d3.select('#tty-svg');
    svg.selectAll("*").remove();
    var focused_dorm = '';

    var width = svg.node().getBoundingClientRect().width;
    var height = svg.node().getBoundingClientRect().height;
    var clusters = Object.keys(dorms);

    const cluster_cols = ['#e27d60', '#85d0cb', '#e8a87c', '#c38d9e', '#41b3a3'];
    var cluster_ind_width = 20;
    var dorm_height = 20;
    var dorm_left = width - cluster_ind_width;
    var cluster_tab_top = 50;
    var dorm_gray = "#888";
    
    var previousY = cluster_tab_top;
    var dorm_texts = [];

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

    /*var years = {};
    for (var i = 1973; i < 2014; i++) {

    }*/

    function setHistoryPanel() {
        title.text(focused_dorm);
    }
}

window.onload = drawTTY;
