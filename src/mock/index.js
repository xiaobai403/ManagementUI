import Mock from "better-mock";
import {login} from "@/mock/api/loginApi";
import {getMenu} from "@/mock/api/menuApi";

Mock.mock('/api/login', 'POST', login)
Mock.mock('/api/menu', 'GET', getMenu)

