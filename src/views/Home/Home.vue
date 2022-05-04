<template>
    <el-row :gutter="20">
        <el-col :span="10">
            <el-card shadow="always" class="user-info" :body-style="userInfoBodyStyle">
                <div class="global-info">
                    <el-avatar :size="80" :src="userInfo.avatar"/>
                    <div class="user-name">
                        <span>昵称: {{ userInfo.nickname }}</span>
                        <span>用户权限: {{ userInfo.role }}</span>
                    </div>
                </div>
                <hr>
                <div class="login-info">
                    <span>最后登陆时间: {{ userInfo.ip[0].date }}</span>
                    <span>最后登陆ip: {{ userInfo.ip[0].address }}</span>
                </div>
            </el-card>

            <el-card shadow="always" class="ip-info">
                <h2>登陆信息</h2>
                <el-table :data="userInfo.ip"
                          border
                          stripe
                          height="250"
                          style="width: 100%">
                    <el-table-column prop="address" label="ip地址"/>
                    <el-table-column prop="date" label="时间"/>
                </el-table>
            </el-card>

        </el-col>
        <el-col :span="14">
            <div class="overview-container">
                <el-card shadow="always"
                         class="overview-item"
                         v-for="item in overviewInfo"
                         :key="item.icon"
                         :body-style="overviewItemStyle">
                    <div class="iconfont icon"
                         :style="`background-color: ${item.color}`"
                         :class="item.icon"></div>
                    <div class="overview-details">
                        <span class="details-number"> {{ item.number }}</span>
                        <span class="details-title">{{ item.title }}</span>
                    </div>
                </el-card>

            </div>

            <el-card shadow="always"
                     class="book-line-chart-container">
                <div ref="bookLineChartRef" class="book-line-chart"/>
            </el-card>

            <div class="bottom-chart">
                <el-card shadow="always" class="user-activity-chart-container">
                    <div ref="userActivityHistogramRef" class="user-activity-chart"/>
                </el-card>

                <el-card shadow="always" class="book-category-chart-container">
                    <div ref="bookCategoryPieChartRef" class="book-category-chart"/>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>

<script setup>
// refs
import {onMounted, reactive, ref} from "vue";
import {
    reqBookCategoryInfo,
    reqOverviewBorrowInfo,
    reqOverviewInfo,
    reqOverviewUserActivityInfo,
    reqUserInfo
} from "@/api";
import {showLineChart} from "@/hook/echarts/bookLineChart";
import {showHistogram} from "@/hook/echarts/userActivityHistogram";
import {showPieChart} from "@/hook/echarts/bookCategoryPieChart";
import {responseError} from "@/hook/message/handleMessage";


const bookLineChartRef = ref(null)
const userActivityHistogramRef = ref(null)
const bookCategoryPieChartRef = ref(null)

const userInfo = reactive({
    nickname: "",
    avatar: "",
    role: "",
    ip: [
        {
            address: "",
            date: ""
        }
    ]
})

const overviewInfo = ref([])

// CSS
// 用户信息css
const userInfoBodyStyle = {
    flex: '1',
    display: 'flex',
    flexDirection: 'column'
}

// overview item css
const overviewItemStyle = {
    display: 'flex',
    padding: "0",
    gap: "1em"
}


// 钩子函数
onMounted(() => {
    // 获取管理员数据
    reqUserInfo().then(response => {
        if (response.code === 200) {
            response.data.ip.forEach(i => {
                const dateTime = new Date(i.date)
                i.date = `${dateTime.getFullYear()}/${dateTime.getMonth() + 1}/${dateTime.getDate()}`
            })
            Object.assign(userInfo, response.data)
        } else {
            responseError(response)
        }
    }, error => Promise.reject(error))

    reqOverviewInfo().then(response => {
        if (response.code === 200) {
            overviewInfo.value = response.data
        } else {
            responseError(response)
        }
    }, error => Promise.reject(error))

    reqOverviewBorrowInfo().then(response => {
        if (response.code === 200) {
            showLineChart(bookLineChartRef.value, response.data)
        } else {
            responseError(response)
        }
    }, error => Promise.reject(error))

    reqOverviewUserActivityInfo().then(response => {
        if (response.code === 200) {
            showHistogram(userActivityHistogramRef.value, response.data)
        } else {
            responseError(response)
        }
    }, error => Promise.reject(error))

    reqBookCategoryInfo().then(response => {
        if (response.code === 200) {
            showPieChart(bookCategoryPieChartRef.value, response.data)
        } else {
            responseError(response)
        }
    }, error => Promise.reject(error))


})


</script>

<style scoped lang="less">

.user-info {
    display: flex;

    .global-info {
        display: flex;
        flex-direction: row;
        gap: 2em;

        .user-name {
            display: flex;
            flex-direction: column;
            font-size: 1rem;
            color: grey;
            gap: 0.8em;
            justify-content: center;
        }
    }

    hr {
        margin: 1em 0;
        width: 100%;
        background-color: grey;
    }

    .login-info {
        display: flex;
        flex-direction: column;
        gap: 0.8em;
        font-size: 1rem;
        color: grey;
        margin-left: 0.5em;
    }


}

.ip-info {
    margin-top: 2em;

    h2 {
        color: #909298;
        font-size: 20px;
        margin: 0.6em 0 1em;
        text-align: center;
    }
}

.overview-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 20px;

    .overview-item {

        .icon {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.8rem;
            height: 60px;
            width: 60px;
        }

        .overview-details {
            display: flex;
            flex-direction: column;
            gap: 0.4em;
            justify-content: flex-end;
            padding-bottom: 0.4em;

            .details-number {
                font-size: 24px;
                text-align: center;
            }

            .details-title {
                font-size: 14px;
            }

        }
    }


}

.book-line-chart-container {
    margin-top: 20px;

    .book-line-chart {
        height: 300px;
    }
}

.bottom-chart {
    margin-top: 20px;
    display: flex;
    gap: 20px;
}

.user-activity-chart-container {
    flex: 1;

    .user-activity-chart {
        height: 300px;
    }
}

.book-category-chart-container {
    flex: 1;

    .book-category-chart {
        height: 300px;
    }
}


</style>
