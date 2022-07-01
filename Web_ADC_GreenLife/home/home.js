"use strict"
var i2 = 0;
var p3 = 0;

function ChangeAQI(p3) {
    var slide = document.getElementsByClassName("myicon");
    var p = p3 + new Date().getHours() - 1;
    const PM25H = [];
    if (p < 0) { p = 23; }

    console.log("gio:" + p);

    var aqi = firebase.database().ref('pm25');
    aqi.once('value', snap => {
        var o = snap.val();
        var cmin = 500;
        var cmax = 0;
        if (p < 12) {
            var i = 0
            for (; p >= 0; p--) {
                var z = Object.values(o)[p];
                console.log(z);
                if (cmax < z) {
                    cmax = z;
                }
                if (cmin > z) {
                    cmin = z;
                }
                PM25H[i] = z;


                i++
            }
            console.log("i=", i);
            p = 23;
            for (; i < 12; i++) {

                var r = Object.values(o)[p];
                if (cmax < r) {
                    cmax = r;
                }
                if (cmin > r) {
                    cmin = r;
                }
                PM25H[i] = r;
                console.log(r);
                p--;
            }

        } else {
            for (var i = 0; i < 12; i++) {
                var x = Object.values(o)[p];
                if (cmax < x) {
                    cmax = x;
                }
                if (cmin > x) {
                    cmin = x;
                }
                PM25H[i] = x;
                p--;
            }
        }
        console.log("mang:  ", PM25H);
        console.log(cmax);
        console.log(cmin);
        p = new Date().getHours() - 1;
        console.log("p", p);
        var w = cmin / cmax;
        var sum = 0;
        var sum1 = 0,
            sum2 = 0;
        var AQI25 = 0;

        function TINHAQI() {
            console.log("sum", sum);
            if (0 <= sum && sum < 25) {
                AQI25 = ((50) / 25) * (sum) + 0;
            } else if (25 <= sum && sum < 50) {
                AQI25 = ((100 - 50) / 25) * (sum - 25) + 50;
            } else if (50 <= sum && sum < 80) {
                AQI25 = ((50) / 30) * (sum - 50) + 100;
            } else if (80 <= sum && sum < 150) {
                AQI25 = ((50) / (150 - 80)) * (sum - 80) + 150;
            } else if (150 <= sum && sum < 250) {
                AQI25 = (1 * (sum - 150)) + 200;
            } else { AQI25 = 268; }
            console.log("giatr AQI  ", parseInt(AQI25))

        }
        if (w <= 0.5) {
            for (var i = 0; i < 12; i++) {
                var y = PM25H[i];
                sum += Math.pow(0.5, i + 1) * y;


            }
            TINHAQI();
            console.log("sumTH1", sum);
        } else if (w > 0.5) {
            for (var i = 0; i < 12; i++) {
                var t = PM25H[i];
                sum1 += Math.pow(w, i) * t;
                sum2 += Math.pow(w, i);
            }
            sum = sum1 / sum2;
            TINHAQI();
            console.log("sumTH2", sum);
        }
        var AQIPM25 = parseInt(AQI25);
        if (AQIPM25 <= 50) {
            for (var i = 0; i < slide.length; i++) {
                slide[i].style.display = "none";
            }
            slide[0].style.display = "block";
            document.getElementById("thongbao").style.backgroundColor = "green";
            document.getElementById("waring").style.backgroundColor = "rgba(43, 255, 0, 0.534)";
        } else if (50 < AQIPM25 && AQIPM25 <= 100) {
            document.getElementById("thongbao").style.backgroundColor = "rgb(255, 230, 0)";
            document.getElementById("waring").style.backgroundColor = "rgba(255, 255, 0, 0.534)";
            for (var i = 0; i < slide.length; i++) {
                slide[i].style.display = "none";
            }
            slide[1].style.display = "block";
        } else if (100 < AQIPM25 && AQIPM25 <= 150) {
            document.getElementById("thongbao").style.backgroundColor = "orange";
            document.getElementById("waring").style.backgroundColor = "rgba(255, 153, 0, 0.534)";
            for (var i = 0; i < slide.length; i++) {
                slide[i].style.display = "none";
            }
            slide[2].style.display = "block";

        } else if (150 < AQIPM25 && AQIPM25 <= 200) {
            document.getElementById("thongbao").style.backgroundColor = "red";
            document.getElementById("waring").style.backgroundColor = "rgba(255, 0, 0, 0.534)";
            for (var i = 0; i < slide.length; i++) {
                slide[i].style.display = "none";
            }
            slide[3].style.display = "block";
        } else {
            document.getElementById("thongbao").style.backgroundColor = "purple";
            document.getElementById("waring").style.backgroundColor = "rgba(255, 0, 212, 0.534)";
            for (var i = 0; i < slide.length; i++) {
                slide[i].style.display = "none";
            }
            slide[4].style.display = "block";
        }
        document.getElementById("aqi").innerHTML = AQIPM25;
        var l = document.getElementById("lamp");
        if (AQIPM25 <= 50) {
            l.innerHTML = "Không khí tốt,thích hợp cho hoạt động ngoài trời";
        } else if (50 < AQIPM25 && AQIPM25 <= 100) {
            l.innerHTML = "Lưu ý giảm nhẹ cường độ cho học sinh có dấu hiệu nhạy cảm "
        } else if (100 < AQIPM25 && AQIPM25 <= 150) {
            l.innerHTML = "Cân nhắc giảm nhẹ cường độ tập luyện cho học sinh";
        } else if (150 < AQIPM25 && AQIPM25 <= 200) {
            l.innerHTML = "Không tốt cho sức khỏe , cần cân nhắc tập luyện trong nhà .";
        } else {
            l.innerHTML = "Nguy hiểm ! Không nên ra ngoài trời tập luyện "
        }
    });
    i2++;
    console.log("i2 ne:" + i2);
}

ChangeAQI(0);
var row25 = firebase.database().ref('pm25');
row25.on('value', s => {
    var p = new Date().getHours() - 1;
    if (p < 0) { p = 23 }
    var o = s.val();
    var r = Object.values(o)[p];
    var t = document.getElementsByClassName("pm25");
    t[0].style.width = r / 5 + "%";
    t[0].innerHTML = r + "µg/m³";
    if (r <= 20) {
        t[0].style.backgroundColor = "green";
    } else if (20 < r && r <= 50) {
        t[0].style.backgroundColor = "yellow";
    } else if (50 < r && r <= 80) {
        t[0].style.backgroundColor = "orange";
    } else if (80 < r && r <= 110) {
        t[0].style.backgroundColor = "red";

    } else {
        t[0].style.backgroundColor = "purple";
    }
});
var row1 = firebase.database().ref('pms7003').child('pm1');
row1.on('value', s => {
    var t = document.getElementsByClassName("pm1");
    t[0].style.width = s.val() / 5 + "%";
    t[0].innerHTML = s.val() + "µg/m³";
    if (s.val() <= 20) {
        t[0].style.backgroundColor = "green";
    } else if (20 < s.val() && s.val() <= 50) {
        t[0].style.backgroundColor = "yellow";
    } else if (50 < s.val() && s.val() <= 80) {
        t[0].style.backgroundColor = "orange";
    } else if (80 < s.val() && s.val() <= 110) {
        t[0].style.backgroundColor = "red";
    } else {
        t[0].style.backgroundColor = "purple";
    }
});
var row10 = firebase.database().ref('pms7003').child('pm10');
row10.on('value', s => {
    var t = document.getElementsByClassName("pm10");
    t[0].style.width = s.val() / 5 + "%";
    t[0].innerHTML = s.val() + "µg/m³";
    if (s.val() <= 20) {
        t[0].style.backgroundColor = "green";
    } else if (20 < s.val() && s.val() <= 50) {
        t[0].style.backgroundColor = "yellow";
    } else if (50 < s.val() && s.val() <= 80) {
        t[0].style.backgroundColor = "orange";
    } else if (80 < s.val() && s.val() <= 110) {
        t[0].style.backgroundColor = "red";
    } else {
        t[0].style.backgroundColor = "purple";
    }
});
var hu = firebase.database().ref('aht10').child('humidity');
hu.on('value', snap => {
    document.getElementById("hu").innerHTML = snap.val() + "%";

});
var te = firebase.database().ref('aht10').child('temperature');
te.on('value', snap => {
    document.getElementById("te").innerHTML = snap.val() + "°C";

});
var row10 = firebase.database().ref('uv')
row10.on('value', s => {
    document.getElementById("u").innerHTML = s.val();
    var t = document.getElementsByClassName("fa");
    if (s.val() <= 3) {
        document.getElementById("uv").style.color = "green";
        t[3].style.color = "green";
    } else if (3 < s.val() && s.val() <= 6) {
        document.getElementById("uv").style.color = "rgb(219, 205, 5)";
        t[3].style.color = "yellow";
    } else if (6 < s.val() && s.val() <= 8) {
        document.getElementById("uv").style.color = "orange";
        t[3].style.color = "orange";
    } else if (8 < s.val() && s.val() <= 11) {
        document.getElementById("uv").style.color = "red";
        t[3].style.color = "red";
    } else {
        document.getElementById("uv").style.color = "purple";
        t[3].style.color = "purple";
    }
});

//////////////////////////////// test charts

var ctx = document.getElementById('myChart');
const lab25 = [];
const data25 = [];
const Bcolor = [];

var val25 = firebase.database().ref('pm25');
val25.once('value', snap => {
    var h = new Date().getHours();
    var g = snap.val();
    console.log(typeof g);
    var day = String(new Date().getDate()) + "/" + String(new Date().getMonth() + 1);
    console.log(day)
    var i = 0;
    for (h; h < 24; h++) {
        lab25[i] = Object.keys(g)[h] + "h";
        data25[i] = Object.values(g)[h];

        if (Object.values(g)[h] < 20) {
            Bcolor[i] = "rgba(43, 255, 0, 0.7)";
        } else if (20 <= Object.values(g)[h] && Object.values(g)[h] < 50) {
            Bcolor[i] = "rgba(255, 255, 0, 0.7)";
        } else if (50 <= Object.values(g)[h] && Object.values(g)[h] < 80) {
            Bcolor[i] = "rgba(255, 153, 0, 0.7)";
        } else {
            Bcolor[i] = "rgba(255, 0, 0, 0.7)";
        }

        i++
    }
    console.log(i)
    h = 0;
    lab25[i] = day;
    data25[i] = Object.values(g)[h];
    if (Object.values(g)[h] < 20) {
        Bcolor[i] = "rgba(43, 255, 0, 0.7)";
    } else if (20 <= Object.values(g)[h] && Object.values(g)[h] < 50) {
        Bcolor[i] = "rgba(255, 255, 0, 0.7)";
    } else if (50 <= Object.values(g)[h] && Object.values(g)[h] < 80) {
        Bcolor[i] = "rgba(255, 153, 0, 0.7)";
    } else {
        Bcolor[i] = "rgba(255, 0, 0, 0.7)";
    }
    i++;
    h++;
    for (; i < 24; i++) {
        lab25[i] = Object.keys(g)[h] + "h";
        data25[i] = Object.values(g)[h]
        if (Object.values(g)[h] < 20) {
            Bcolor[i] = "rgba(43, 255, 0, 0.7)";
        } else if (20 <= Object.values(g)[h] && Object.values(g)[h] < 50) {
            Bcolor[i] = "rgba(255, 255, 0, 0.7)";
        } else if (50 <= Object.values(g)[h] && Object.values(g)[h] < 80) {
            Bcolor[i] = "rgba(255, 153, 0, 0.7)";
        } else {
            Bcolor[i] = "rgba(255, 0, 0, 0.7)";
        }
        h++;
    }
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: lab25,
            datasets: [{
                label: 'value of pm2.5 concentration',
                data: data25,
                backgroundColor: Bcolor,
                borderColor: [
                    'rgba(255, 99, 132, 1)',

                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            animation: false,
            maintainAspectRatio: true,

            scales: {
                // plugins: {
                //     legend: {
                //         labels: {
                //             font: {
                //                 size: 20
                //             }
                //         }
                //     }
                // },

                xAxes: [{
                    ticks: {
                        fontSize: 6,
                    }
                }],
                // yAxis: {
                //     scaleFontSize: 8
                // },
                yAxis: {
                    ticks: {
                        // fontSize: 10,
                        // Include a dollar sign in the ticks
                        callback: function(value, index, values) {
                            return value + 'µg/m³';
                        }
                    }
                }
            }
        }

    });
    console.log(i);
    // var k = new Date().getMinutes();
    // console.log(k)
    // var tu = new Date().getMinutes();
    // var xu = new Date().getSeconds();
    // var b = 3600000 - tu * 60 * 1000 - xu * 1000;
    //console.log(b);
    setInterval(function() {
        var ku = new Date().getMinutes();
        var lu = new Date().getSeconds();
        var a = 3600000 - ku * 60 * 1000 - lu * 1000;

        if (a < 30001) {
            var i3 = 1;
            ChangeAQI(i3);
            i3++;
            var val252 = firebase.database().ref('pm25');
            val252.once('value', sna => {
                var f = new Date().getHours();
                var n = sna.val();
                chart.data.labels.push(Object.keys(n)[f] + "h");
                chart.data.datasets.forEach((dataset) => {
                    if (Object.values(n)[f] < 20) {
                        dataset.backgroundColor.push("rgba(43, 255, 0, 0.7)");
                    } else if (20 <= Object.values(n)[f] && Object.values(n)[f] < 50) {
                        dataset.backgroundColor.push("rgba(255, 255, 0, 0.7)");
                    } else if (50 <= Object.values(n)[f] && Object.values(n)[f] < 80) {
                        dataset.backgroundColor.push("rgba(255, 153, 0, 0.7)");
                    } else {
                        dataset.backgroundColor.push("rgba(255, 0, 0, 0.7)");
                    }
                    dataset.data.push(Object.values(n)[f]);

                });
                chart.update();

                chart.data.labels.shift();
                chart.data.datasets.forEach((dataset) => {
                    dataset.data.shift();
                });

                chart.update();

            });

        } else {};
        // if (b < 30001) {
        //     clearInterval(e);
        // }
        console.log(a);
    }, 30000);


});