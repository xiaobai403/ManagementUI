import * as echarts from 'echarts';

/**
 * 借阅图书分类饼状图
 * @param container
 * @param data
 */
export function showPieChart(container, data) {
    const options = {
        title: {
            text: '图书借阅分类',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'horizontal',
            bottom: 'bottom'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    options.series[0].data = data

    // 应用柱状图
    const E = echarts.init(container)
    window.onresize = function () {
        E.resize();
    }
    E.setOption(options)
}
