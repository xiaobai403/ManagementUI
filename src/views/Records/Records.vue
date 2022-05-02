<template>
    <div class="records-header">
        <div class="search">
            <el-input
                v-model="search.searchInfo"
                placeholder="请输入查询条件"
                class="input-with-select"
                size="large"
                style="width: 500px"
            >
                <template #prepend>
                    <el-select v-model="search.condition"
                               style="width: 110px">
                        <el-option label="借阅id" value="borrowId"/>
                        <el-option label="用户名" value="username"/>
                        <el-option label="书名" value="bookName"/>
                    </el-select>
                </template>
                <template #append>
                    <el-button size="large" @click="searchRecords">
                        <span class="iconfont icon-search"/>
                    </el-button>
                </template>

            </el-input>

        </div>

    </div>
    <div class="records-table">
        <el-table :data="records"
                  stripe
                  border
                  v-loading="searchLoading"
                  style="width: 100%">
            <el-table-column type="expand">
                <template #default="props">
                    <div class="details-container">
                        <div class="details-info">
                            <div>
                                <span>用户: </span>
                                <span>{{ props.row.username }}</span>
                            </div>
                            <div>
                                <span>唯一标识: </span>
                                <span>{{ props.row.borrowId }}</span>
                            </div>
                            <div>
                                <span>书名: </span>
                                <span>{{ props.row.bookName }}</span>
                            </div>
                            <div>
                                <span>是否归还: </span>
                                <span>{{ props.row.isReturn }}</span>
                            </div>
                            <div>
                                <span>续借次数: </span>
                                <span>{{ props.row.renewNumbers }}</span>
                            </div>
                            <div>
                                <span>是否违约: </span>
                                <span>{{ props.row.isBreachOfContract }}</span>
                            </div>
                            <div>
                                <span>借阅日期: </span>
                                <span>{{ props.row.borrowDate }}</span>
                            </div>
                            <div>
                                <span>归还日期: </span>
                                <span>{{ props.row.returnDate }}</span>
                            </div>
                        </div>
                    </div>

                </template>
            </el-table-column>
            <el-table-column label="书名" prop="bookName"/>
            <el-table-column label="用户" prop="username"/>
            <el-table-column label="是否归还" prop="isReturn"/>
            <el-table-column label="是否违约" prop="isBreachOfContract"/>
            <el-table-column fixed="right" label="操作" prop="status">
                <template #default="scope">
                    <el-button type="text" size="small" @click="handleEdit(scope.row)">
                        编辑
                    </el-button>
                    <el-button
                        type="danger"
                        plain
                        size="small"
                        :loading="scope.row.deleteLoading"
                        @click="deleteRecords(scope.row.borrowId, scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script setup>
import {onBeforeUnmount, onMounted, reactive, ref, toRaw} from "vue";
import {
    handleErrorReactive,
    handleErrorRef,
    handleRequestOneAttributeFun,
    handleRequestRefFun
} from "@/hook/message/handleResponseMessage";
import {
    reqDeleteRecords,
    reqSearchRecordsByBookName,
    reqSearchRecordsByBorrowId,
    reqSearchRecordsByUsername
} from "@/api";
import PubSub from "pubsub-js";
import {REFRESH_RECORDS_INFO} from "@/pattern/eventTypes";
import {useRouter} from "vue-router";
import {useRecord} from "@/store/useRecord";

const records = ref([])

// 记录查询部分
const search = reactive({
    condition: "borrowId",
    searchInfo: ""
})


const handleSearchResponse = (records, response) => {
    const data = response.data.map(i => {
        i['deleteLoading'] = false
        return i
    })

    records.value = data
}

const searchLoading = ref(false)

const searchRecords = () => {
    searchLoading.value = true
    switch (search.condition) {
        case 'borrowId':
            reqSearchRecordsByBorrowId(search.searchInfo)
                .then(response => handleRequestRefFun(response, searchLoading, handleSearchResponse, [records, response]),
                    error => handleErrorRef(error, searchLoading))
            break
        case 'username':
            reqSearchRecordsByUsername(search.searchInfo)
                .then(response => handleRequestRefFun(response, searchLoading, handleSearchResponse, [records, response]),
                    error => handleErrorRef(error, searchLoading))
            break
        case 'bookName':
            reqSearchRecordsByBookName(search.searchInfo)
                .then(response => handleRequestRefFun(response, searchLoading, handleSearchResponse, [records, response]),
                    error => handleErrorRef(error, searchLoading))
            break
    }
}


// 删除Records部分
const removeRecord = (records, borrowId) => {
    records.value = toRaw(records.value).filter(i => i.borrowId !== borrowId)
}

const deleteRecords = (borrowId, currentRecord) => {
    currentRecord.deleteLoading = true
    reqDeleteRecords(borrowId).then(response => {
        handleRequestOneAttributeFun(response, currentRecord, "deleteLoading", removeRecord, [records, borrowId])
    }, error => handleErrorReactive(error, currentRecord, "deleteLoading"))
}


// 编辑部分
const store = useRecord()
const router = useRouter()

const handleEdit = (row) => {
    Object.assign(store.record, row)
    router.push({
        name: 'recordDetails',
        params: {
            borrowId: row.borrowId
        }
    })
}


// 生命周期钩子函数
let refreshInfoToken = ""
onMounted(() => {
    refreshInfoToken = PubSub.subscribe(REFRESH_RECORDS_INFO, searchRecords)
})

onBeforeUnmount(() => {
    PubSub.unsubscribe(refreshInfoToken)
})


</script>

<style scoped lang="less">
.records-header {
    display: flex;

    .search {
        margin-left: auto;
    }
}

.records-table {
    margin-top: 30px;

    .details-container {
        padding: 20px 0;
        margin-left: 60px;

        .details-info {
            display: grid;
            grid-template-columns: 260px 260px;
            grid-template-rows: repeat(20px 4);
            row-gap: 10px;
            margin-top: 20px;
            margin-left: 10px;

            div {
                display: flex;
                gap: 20px;

                span {
                    color: rgb(0, 0, 0);
                    font-family: Noto Sans SC;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 21px;
                    letter-spacing: 0;
                    text-align: left;
                }
            }
        }
    }
}


</style>
