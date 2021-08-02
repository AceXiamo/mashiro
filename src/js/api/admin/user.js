import request from '@/js/utils/request';

// 分页查询
export function list(data) {
  return request({
    url: '/api/tbUser/list',
    method: 'get',
    params: data
  });
}

// 根据id查询
export function selectOne(id) {
  return request({
    url: '/api/tbUser/selectOne',
    method: 'get',
    params: { id: id }
  });
}

// 新增
export function insert(data) {
  return request({
    url: '/api/tbUser/insert',
    method: 'post',
    data: data
  });
}

// 修改
export function update(data) {
  return request({
    url: '/api/tbUser/update',
    method: 'post',
    data: data
  });
}

// 根据id查询
export function del(id) {
  return request({
    url: '/api/tbUser/del',
    method: 'get',
    params: { id: id }
  });
}
