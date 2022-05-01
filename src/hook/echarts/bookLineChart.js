import * as echarts from 'echarts';

/**
 * 图书借阅信息折线图
 * @param container 载荷容器
 * @param data 折线图数据
 */
export function showLineChart(container, data) {
    // 折线图设置
    const options = {
        title: {
            text: '借阅概览'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:  [
                "查询数量",
                "借出数量",
                "归还数量"
            ],
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
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                "name": "查询数量",
                "type": "line",
            },
            {
                "name": "借出数量",
                "type": "line",
            },
            {
                "name": "归还数量",
                "type": "line",
            }
        ]
    };

    options.xAxis.data = data[0]
    options.series[0].data = data[1]
    options.series[1].data = data[2]
    options.series[2].data = data[3]


    // 应用折线图
    const E = echarts.init(container)
    window.onresize = function () {
        E.resize();
    }
    E.setOption(options)
}
