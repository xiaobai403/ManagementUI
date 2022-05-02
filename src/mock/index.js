import Mock from "better-mock";
import {login} from "@/mock/api/home/loginApi";
import {getMenu} from "@/mock/api/home/menuApi";
import getUserInfo from "@/mock/api/home/getUserInfoApi"
import overviewBorrowApi from "@/mock/api/home/overviewBorrowApi"
import overviewBookCategoryApi from "@/mock/api/home/overviewBookCategoryApi"
import overviewUserActivityApi from "@/mock/api/home/overviewUserActivityApi"
import overviewInfoApi from "@/mock/api/home/overviewInfoApi"
import userInfoApi from "@/mock/api/account/userInfoApi";
import ok from "@/mock/api/okApi";
import getRecordsApi from "@/mock/api/records/getRecordsApi";
import getBooksApi from "@/mock/api/books/getBooksApi";
import deleteBookApi from "@/mock/api/books/deleteBookApi";

Mock.mock('/mock/login', 'POST', login)
Mock.mock('/mock/menu', 'GET', getMenu)

// Home
Mock.mock('/mock/user', 'GET', getUserInfo)
Mock.mock('/mock/books/overview/borrow', overviewBorrowApi)
Mock.mock('/mock/books/overview/category', overviewBookCategoryApi)
Mock.mock('/mock/user/overview/activity', overviewUserActivityApi)
Mock.mock('/mock/overview', 'GET', overviewInfoApi)
Mock.mock('/mock/user/username/**', 'GET', userInfoApi)
Mock.mock('/mock/user/email/**', 'PUT', ok)
Mock.mock('/mock/user/nickname/**', 'PUT', ok)
Mock.mock('/mock/user/sex/**', 'PUT', ok)
Mock.mock('/mock/user/age/**', 'PUT', ok)

// Records
Mock.mock('/mock/records/borrowId/**', 'GET', getRecordsApi)
Mock.mock('/mock/records/**', 'DELETE', ok)

// Books
Mock.mock('/mock/books/isbn/**', 'GET', getBooksApi)
Mock.mock('/mock/books/**', 'DELETE', deleteBookApi)


