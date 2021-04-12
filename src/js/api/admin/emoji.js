import request from '@/js/utils/request';

// 分页查询
export function list(data) {
  return request({
    url: '/api/tbEmoji/list',
    method: 'get',
    params: data
  });
}

// 新增
export function insert(data) {
  return request({
    url: '/api/tbEmoji/insert',
    method: 'post',
    data: data
  });
}

// 根据id查询
export function del(id) {
  return request({
    url: '/api/tbEmoji/del',
    method: 'get',
    params: { id: id }
  });
}
