import Mock from "better-mock";
import {login} from "@/mock/api/loginApi";

Mock.mock('/api/login', 'POST', login)
Mock.mock('/api/menu', 'GET', login)

