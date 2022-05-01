import * as echarts from 'echarts';

/**
 * 活跃用户柱状图
 * @param container
 * @param data
 */
export function showHistogram(container, data) {
    const options = {
        color: ["#FF4081", "#03A9F4"],
        title: {
            text: '用户活跃表',
            left: 'center'
        },
        legend: {
            orient: 'horizontal',
            bottom: 'bottom'
        },
        tooltip: {},
        dataset: {
            source: [
                ["product", "新增用户", "活跃用户"],
            ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        series: [{ type: 'bar' }, { type: 'bar' }]
    };

    options.dataset.source.push(...data)

    // 应用柱状图
    const E = echarts.init(container)
    window.onresize = function () {
        E.resize();
    }
    E.setOption(options)
}

