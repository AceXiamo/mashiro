import request from '@/js/utils/request';

// 分页查询
export function list(data) {
  return request({
    url: '/api/tbBlog/select',
    method: 'get',
    params: data
  });
}

// 根据id查询
export function selectOne(id) {
  return request({
    url: '/api/tbBlog/selectOne',
    method: 'get',
    params: { id: id }
  });
}

// 新增
export function insert(blog) {
  return request({
    url: '/api/tbBlog/insert',
    method: 'post',
    data: blog
  });
}

// 修改
export function update(blog) {
  return request({
    url: '/api/tbBlog/update',
    method: 'post',
    data: blog
  });
}

// 根据id查询
export function del(id) {
  return request({
    url: '/api/tbBlog/delete',
    method: 'get',
    params: { id: id }
  });
}
