import request from "@/api/request";
import qs from "qs";

export const reqLogin = (username, password) => request.post("/login", qs.stringify({ username, password }))
export const reqMenu = () => request.get(`menu/`)

