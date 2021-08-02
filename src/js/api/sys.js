import request from '@/js/utils/request';

// 查询主播列表
export function login(data) {
  return request({
    url: '/api/sys/login',
    method: 'get',
    params: data
  });
}
