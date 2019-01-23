$(function () {
  var socket = io();
  socket.on('NGSI', function(msg){
    console.log('NGSI: '+msg);
  });
  socket.on('health', function(msg){
    console.log('health: '+msg);
  });
  socket.on('queryContext', function(msg){
    console.log('queryContext: '+msg);
  });
  socket.on('notify', function(msg){
    console.log('notify: '+JSON.stringify(msg));
  });


  var cont=1;

  var sleep_s = [26820,32100,36930,43440,54990];
  var sleep_f = [28950,33990,40860,49500,55350];



  socket.on('payload', function(msg){
    console.log('payload: '+JSON.stringify(msg));
    //console.log('value: '+msg);
    console.log('value: '+msg[0].HR.value);
    if (config.data.datasets.length > 0 && msg[0].HR.value>0) {
        config.data.labels.push(++cont);

        config.data.datasets.forEach(function(dataset) {
          dataset.data.push(msg[0].HR.value);
        });

        window.myLine.update();
      }
  });


  socket.on('Msg', function(msg){
    console.log('Msg: '+JSON.stringify(msg));
  });

  var config = {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Heart Rate',
        backgroundColor: window.chartColors.red,
        borderColor: window.chartColors.red,
        radius:0,
        borderWidth: 1,
        data: [],
        fill: false,
      }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Heart Rate Graph'
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Seconds'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'HR value'
          }
        }]
      }
    }
  };



  window.onload = function() {
    var ctx = document.getElementById('canvas').getContext('2d');
    window.myLine = new Chart(ctx, config);
  };


});
