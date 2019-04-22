import request from '@/utils/request'
import qs from 'qs'
export function fetchList(params) {
  return request({
    url:'/home/advertise/list',
    method:'get',
    params:params
  })
}
export function updateStatus(id,params) {
  return request({
    url:'/home/advertise/update/status/'+id,
    method:'post',
    params:params
  })
}
export function deleteHomeAdvertise(data) {
  return request({
    url:'/home/advertise/delete',
    method:'post',
    data:data
  })
}
export function createHomeAdvertise(data) {
  return request({
    url:'/home/advertise/create',
    method:'post',
    data:data
  })
}
export function getHomeAdvertise(id) {
  return request({
    url:'/home/advertise/'+id,
    method:'get',
  })
}

export function updateHomeAdvertise(id,data) {
  return request({
    url:'/home/advertise/update/'+id,
    method:'post',
    data:data
  })
}

// 知道
export function createKnowSlider(data) {
  return request({
    url:'/carousel/create',
    method:'post',
    data:data
  })
}

// 知道
export function createKnowNews(data) {
  return request({
     url:'/information/create',
    method:'post',
    data:data
  })
}


// 获取知道轮播数据
export function getSlideList(params) {
  return request({
    url:'/home/advertise/list',
    method:'get',
    params:params
  })
}

export function deleteSlide(data) {
  return request({
    url:'/carousel/delete',
    method:'post',
    data:data
  })
}

export function deleteNews(data) {
  return request({
    url:'/information/delete',
    method:'post',
    data:data
  })
}
