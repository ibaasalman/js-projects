
const api = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

fetch(api).then(res=>res.json()).then(res=>{
 
    const myarr = res.map((i)=>{
        return [i.name,i.market_cap]
    })
    myarr.unshift(['cryptoname', 'market cap'])
    
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    // Draw the chart and set the chart values
    function drawChart() {
    var data = google.visualization.arrayToDataTable(myarr);

    // Optional; add a title and set the width and height of the chart
    var options = {'title':'cryptocurrency market cap chart', 'width':650, 'height':500};

    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
    }

});


