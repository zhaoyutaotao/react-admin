import React, { useEffect } from 'react'
import { Scene, PolygonLayer, LineLayer, PointLayer, Popup, Marker } from '@antv/l7'
import { Map } from '@antv/l7-maps'
import MapPoint from 'src/assets/images/map/point.png'
import './index.scss'

const markerData = [
  {
    longitude: 122.51059189734963,
    latitude: 39.86780976481697,
    name: '医院'
  },
  {
    longitude: 122.21059189734963,
    latitude: 42.16780976481697,
    name: '医院1'
  }
]
const EchartsMap: React.FC = () => {
  useEffect(() => {
    fetch('https://geo.datav.aliyun.com/areas_v3/bound/210000_full.json')
      .then((response) => response.json())
      .then((geoJSON) => {
        initMap(geoJSON)
      })
  }, [])
  const initMap = (geoJSON: any) => {
    const scene = new Scene({
      id: 'map',
      logoVisible: false, // logo 是否可见
      map: new Map({
        center: [106.689, 30.159],
        zoom: 6,
        maxZoom: 8,
        minZoom: 4,
        pitch: 50, // 地图倾斜度
        style: 'blank'
      })
    })

    //添加区域地图
    const areaMap = new PolygonLayer({
      autoFit: true // layer 初始化完成之后，地图是否自动缩放到图层范围
    })
      .source(geoJSON) //使用的数据为下载到本地的json数据
      .shape('extrude') //用于绘制几何体
      .size(300000) // 用于设置 Polygon 的高度
      .color('#fff')
      .active({
        color: 'rgba(0, 0, 0, .3)'
      })
      .style({
        mapTexture:
          'https://img1.baidu.com/it/u=1458656822,2078909008&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=750', //如果想使用纹理贴图，shap必须为extrude
        // raisingHeight: 200000, //抬升高度
        heightfixed: true, //抬升高度是否随 zoom 变化
        topsurface: true, // 顶部是否显示
        sidesurface: true, // 侧面是否显示
        sourceColor: '#4189f2', //侧面底部颜色
        targetColor: '#fff', // 侧面顶部颜色
        opacity: 0.8
      })

    //添加各市的边界线
    const mapLine = new LineLayer({ zIndex: 2 })
      .source(geoJSON)
      .shape('line')
      .texture('02')
      .color('#fff')
      .size(1)
      .style({
        raisingHeight: 300000 // 抬升高度
      })

    scene.addLayer(mapLine)
    scene.addLayer(areaMap)
    // 绘制省市名称
    const textLayer = new PointLayer({ zIndex: 2 })
      .source(geoJSON)
      .shape('name', 'text') // 绘制文字，第一个参数为数值中的字段，第二个参数固定为 text
      .size(14)
      .color('#0ff')
      .style({
        raisingHeight: 300000
      })
    scene.addLayer(textLayer)

    // 添加 Marker 和 Popup
    markerData.forEach((item) => {
      const popupEl = document.createElement('div')
      popupEl.innerHTML = '弹框内容'
      const popup = new Popup({
        offsets: [0, 20],
        className: 'custom-popup',
        html: popupEl
      })
      const markerEl = document.createElement('img')
      markerEl.src = MapPoint
      const marker = new Marker({
        element: markerEl
      })
        .setLnglat({ lng: item.longitude, lat: item.latitude })
        .setPopup(popup)
      scene.addMarker(marker)
      // markerEl.addEventListener('click',(event)=> {
      //   console.log(event);
      //   popup.setLngLat({
      //     lng: item.longitude,
      //     lat: item.latitude ,s
      //   });
      // });
    })

    // 绘制地理围栏
    // const wall = new LineLayer().source(geoJSON).shape('wall').size(50).style({
    //   heightfixed: true,
    //   opacity: 0.6,
    //   sourceColor: '#0DCCFF',
    //   targetColor: 'rbga(255,255,255, 0)'
    // })
    // scene.addLayer(wall)
  }

  return <div id="map" className="bg-black h-[500px]"></div>
}

export default EchartsMap
