
 
    // client = new Paho.MQTT.Client("192.168.20.101", Number(8000), "/mqtt","paho-22639103794600");//建立客户端实例
    // client.connect({onSuccess:onConnect});//连接服务器并注册连接成功处理事件
    
    // function onConnect() {
    //     console.log("onConnected");
    //     topic = 'test'; //订阅的主题
    //     client.subscribe(topic);//订阅主题
    //     console.log("subscribed");
    //     //发送消息
    // }

    // client.onConnectionLost = onConnectionLost;//注册连接断开处理事件
    // client.onMessageArrived = onMessageArrived;//注册消息接收处理事件

    // function onConnectionLost(responseObject) {
    //     if (responseObject.errorCode !== 0) {
    //         console.log("onConnectionLost:"+responseObject.errorMessage);
    //         console.log("连接已断开");
    //         }
    // }

    // function onMessageArrived(message) {

    //     console.log(message)
    //     console.log("收到消息:"+message.payloadString);
    //     console.log("主题："+message.destinationName);

    //     var temp1 = jQuery.parseJSON(message.payloadString);

    //     console.log("解析出来的：name："+temp1.name);
    //     console.log("解析出来的：age："+temp1.age);
    //         // 直接使用格式化的JSon数据
    //     temperature = temp1.temperature;  // 直接使用格式化的JSon数据
    //     humidity = temp1.humidity;


    // }


    var myChart = echarts.init(document.getElementById('main'));
    option1 = {
        title: {
            text: 'Stacked Line'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['Email']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
            saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210]
            }
        ]
    };


    myChart.setOption(option1);

    client = new Paho.MQTT.Client("192.168.20.101", Number(8000), "/mqtt","paho-22639103794600");//建立客户端实例
    client.connect({onSuccess:onConnect});//连接服务器并注册连接成功处理事件
    
    function onConnect() {
        console.log("onConnected");
        topic = 'test'; //订阅的主题
        client.subscribe(topic);//订阅主题
        console.log("subscribed");
        //发送消息
    }

    client.onConnectionLost = onConnectionLost;//注册连接断开处理事件
    client.onMessageArrived = onMessageArrived;//注册消息接收处理事件

    function onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:"+responseObject.errorMessage);
            console.log("连接已断开");
            }
    }

    function onMessageArrived(message) {

        var temp1 = jQuery.parseJSON(message.payloadString);
        console.log(temp1)
        option1.series[0].data=temp1;
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option1);


    }




  