import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};
// 获取角色分页
export function getRoles(params) {
    return request({
        url: "/yqfk-ucenter/sys/role/page-list",
        method: "get",
        params,
    });
};