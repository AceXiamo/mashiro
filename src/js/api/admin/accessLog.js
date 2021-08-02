import request from '@/js/utils/request';

// 分页查询
export function list(data) {
  return request({
    url: '/api/tbAccessLog/list',
    method: 'get',
    params: data
  });
}

// 查询总条数
export function count() {
  return request({
    url: '/api/tbAccessLog/queryCount',
    method: 'get'
  });
}
