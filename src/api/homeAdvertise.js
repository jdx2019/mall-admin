import request from '@/utils/request'
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
    url:'/carousel/create?name='+data.name+'&pic='+data.pic+'&url='+data.url+'&note='+data.note+'&status=true',
    method:'post'
  })
}

// 知道
export function createKnowNews(data) {
  return request({
    url:'/information/create?title='+data.title+'&subTitle='+data.subTitle+'&pic='+data.pic+'&content='+data.content+'&status=true',
    method:'post'
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
