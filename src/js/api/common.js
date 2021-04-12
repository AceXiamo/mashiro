import request from '@/js/utils/request';

// 查询主播列表
export function upload(data) {
  return request({
    url: '/api/common/uploadimg',
    method: 'post',
    data: data
  });
}

// 首页数据
export function index() {
  return request({
    url: '/api/common/index',
    method: 'get'
  });
}

// 首页数据
export function qqinfo(qq) {
  return request({
    url: '/api/common/qqInfo',
    method: 'get',
    params: { qq: qq }
  });
}
