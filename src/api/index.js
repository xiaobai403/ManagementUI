import request from "@/api/request";
import qs from "qs";

export const reqLogin = (username, password) => request.post("/login", qs.stringify({ username, password }))
export const reqMenu = () => request.get(`menu/`)

// Home
export const reqUserInfo = () => request.get(`/user/`)
export const reqOverviewBorrowInfo = () => request.get("/books/overview/borrow")
export const reqOverviewUserActivityInfo= () => request.get("/user/overview/activity")
export const reqBookCategoryInfo = () => request.get("/books/overview/category")
export const reqOverviewInfo = () => request.get("/overview")

//Accounts
export const reqDeleteUser = (id) => request.delete(`/user/id/${id}`)
export const reqGetUserByUsername = (username) => request.get(`/user/username/${username}`)
export const reqGetUserByNickname = (nickname) => request.get(`/user/nickname/${nickname}`)
export const reqResetPassword = (username, password) => request.put("/user/password", qs.stringify({ username, password }))
export const reqAddUser = (userInfo) => request.post("/user", userInfo)
export const reqChangeAccountStatus = (id, status) => request.put(`/user/status/${id}`, qs.stringify({ status }))
export const reqChangeNickname = (id, nickname) => request.put(`/user/nickname/${id}`, qs.stringify({ nickname }))
export const reqChangeEmail = (id, email) => request.put(`/user/email/${id}`, qs.stringify({ email }))
export const reqChangeSex = (id, sex) => request.put(`/user/sex/${id}`, qs.stringify({ sex }))
export const reqChangeAge = (id, age) => request.put(`/user/age/${id}`, qs.stringify({ age }))

// Records部分
export const reqSearchRecordsByBorrowId = (borrowId) => request.get(`/records/borrowId/${borrowId}`)
export const reqSearchRecordsByUsername = (username) => request.get(`/records/username/${username}`)
export const reqSearchRecordsByBookName = (bookName) => request.get(`/records/bookName/${bookName}`)

export const reqDeleteRecords = (borrowId) => request.delete(`/records/${borrowId}`)

export const reqChangeReturnStatus = (borrowId, status) => request.put(`/records/returnStatus`, qs.stringify({ borrowId, status }))
export const reqChangeBreachOfContractStatus = (borrowId, status) => request.put(`/records/BreachOfContractStatus`, qs.stringify({ borrowId, status }))
export const reqChangeRenewNumbers = (borrowId, numbers) => request.put(`/records/renewNumbers`, qs.stringify({ borrowId, numbers }))





