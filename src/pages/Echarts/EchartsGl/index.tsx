import React, { useEffect, useState } from 'react'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import 'echarts-gl'
import { MapChart, ScatterChart } from 'echarts/charts'
import { TooltipComponent, GeoComponent, GridComponent } from 'echarts/components'
import { VisualMapComponent } from 'echarts/components'
import { TitleComponent } from 'echarts/components'
import * as echarts from 'echarts/core'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import MapPoint from './point.png'

echarts.use([
  TooltipComponent,
  GeoComponent,
  GridComponent,
  ScatterChart,
  CanvasRenderer,
  TitleComponent,
  VisualMapComponent,
  UniversalTransition,
  MapChart
])

const EchartsMap: React.FC = () => {
  const [option, setOption] = useState<any>({})

  useEffect(() => {
    fetch('https://geo.datav.aliyun.com/areas_v3/bound/210000_full.json')
      .then((response) => response.json())
      .then((geoJSON) => {
        // 注册自定义地图名字和数据
        echarts.registerMap('mapGeoJSON', geoJSON)
        setEchartsOption()
      })
  }, [])

  const setEchartsOption = () => {
    const option = {
      title: {
        text: '地图系列echarts-gl',
        left: 'center',
        bottom: 10,
        textStyle: {
          color: '#fff'
        }
      },
      tooltip:{
        show:true,
        formatter:function(data:any){
          return `<h1>${data.name}</h1>`
        }
      },
      // 图例
      visualMap: {
        min: 1,
        max: 50,
        calculable: true,
        show: true,
        color: ['#f44336', '#00eaff'],
        textStyle: {
          color: '#fff'
        }
      },
      // 三维的地理坐标系组件
      geo3D: {
        // 注册地图的名字
        map: 'mapGeoJSON',
        show: false,
        // 三维地图每个区域的高度
        // boxHeight:10,
        regionHeight: 10,
        // // 配置为颜色背景
        // environment: '#000',
        // // 配置为全景贴图
        // // environment: 'https://img-qn.51miz.com/preview/photo/00/01/67/08/P-1670865-99614904.png',
        // // 配置为垂直渐变的背景
        // // environment: new echarts.graphic.LinearGradient(
        // //   0,
        // //   0,
        // //   0,
        // //   1,
        // //   [
        // //     {
        // //       offset: 0,
        // //       color: '#00aaff' // 天空颜色
        // //     },
        // //     {
        // //       offset: 0.7,
        // //       color: '#998866' // 地面颜色
        // //     },
        // //     {
        // //       offset: 1,
        // //       color: '#998866' // 地面颜色
        // //     }
        // //   ],
        // //   false
        // // ),
        // // groundPlane:{
        // //   show: true,
        // //   // color: '#aaa'
        // // },
        // // 三维图形的着色效果。 'color' 只显示颜色，不受光照等其它因素的影响。'lambert'表现光照带来的明暗。'realistic' 真实感渲染
        // shading: 'realistic',
        // // 真实感材质相关的配置项，在 shading 为'realistic'时有效。
        // realisticMaterial: {
        //   // 纹理贴图
        //   detailTexture:
        //     'https://img1.baidu.com/it/u=1458656822,2078909008&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=750',
        //   // 材质细节纹理的平铺。默认为1，也就是拉伸填满。大于 1 的时候，数字表示纹理平铺重复的次数
        //   textureTiling: 1,
        //   // 属性用于表示材质的粗糙度，0为完全光滑，1完全粗糙
        //   roughness: 0.8,
        //   // 属性用于表示材质是金属还是非金属，0为非金属，1为金属。通常设成0和1就能满足大部分场景了。
        //   metalness: 0,
        //   // 材质细节的法线贴图,在较少的顶点下依然表现出物体表面丰富的明暗细节。
        //   // normalTexture:ImgLightPlankFlooringAlbedo,
        // },
        // // lambert 材质相关的配置项, 在 shading 为'lambert'时有效。
        // lambertMaterial:{
        //   detailTexture: 'https://img1.baidu.com/it/u=1458656822,2078909008&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=750',
        // },
        // // color 材质相关的配置项，在 shading 为'color'时有效。
        // colorMaterial:{
        //   detailTexture: 'https://img1.baidu.com/it/u=1458656822,2078909008&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=750',
        // },
        // selectedMode: false, //是否允许选中多个区域
        itemStyle: {
          // 背景颜色
          color: '#4189f2',
          // 不透明度
          // opacity: 0,
          // 边框宽度
          borderWidth: 1,
           // 边框颜色
          borderColor: '#fff'
        },
        // label: {
        //   show: true,
        //   // 目前 textStyle 不生效
        //   textStyle: {
        //     color: '#fff', //地图初始化区域字体颜色
        //     fontSize: 30,
        //   }
        // },
        // // 鼠标 hover 高亮时图形和标签的样式
        // emphasis: {
        //   label: {
        //     show: true,
        //     // 目前 textStyle 不生效
        //     textStyle: {
        //       color: '#fff',
        //       fontSize: 12
        //     }
        //   }
        // },
        // // 光照相关的设置。在 shading 为 'color' 的时候无效。
        // light: {
        //   // 场景主光源的设置
        //   main: {
        //     color: '#fff', //光照颜色
        //     intensity: 1.2, //光照强度
        //     shadow: true, //是否显示阴影
        //     alpha: 40, // 主光源绕 x 轴，即上下旋转的角度。配合 beta 控制光源的方向。[ default: 40 ]
        //     beta: 40 // 主光源绕 y 轴，即左右旋转的角度。[ default: 40 ]
        //   },
        //   // 全局的环境光设置。
        //   ambient: {
        //     color: '#fff', //光照颜色
        //     intensity: 0.6 // 环境光的强度。[ default: 0.2 ]
        //   },
        // },
        //用于鼠标控制地图旋转等功能
        // viewControl: {
        //   // 用于鼠标的旋转，缩放等视角控制。
        //   projection: 'perspective', // 投影方式，默认为透视投影'perspective'，也支持设置为正交投影'orthographic'。
        //   autoRotate: false, // 是否开启视角绕物体的自动旋转查看。[ default: false ]
        //   autoRotateDirection: 'cw', // 物体自传的方向。默认是 'cw' 也就是从上往下看是顺时针方向，也可以取 'ccw'，既从上往下看为逆时针方向。
        //   autoRotateSpeed: 10, // 物体自传的速度。单位为角度 / 秒，默认为10 ，也就是36秒转一圈。
        //   autoRotateAfterStill: 3, // 在鼠标静止操作后恢复自动旋转的时间间隔。在开启 autoRotate 后有效。[ default: 3 ]
        //   damping: 0, // 鼠标进行旋转，缩放等操作时的迟滞因子，在大于等于 1 的时候鼠标在停止操作后，视角仍会因为一定的惯性继续运动（旋转和缩放）。[ default: 0.8 ]
        //   rotateSensitivity: 10, // 旋转操作的灵敏度，值越大越灵敏。支持使用数组分别设置横向和纵向的旋转灵敏度。默认为1, 设置为0后无法旋转。   rotateSensitivity: [1, 0]——只能横向旋转； rotateSensitivity: [0, 1]——只能纵向旋转。
        //   zoomSensitivity: 10, // 缩放操作的灵敏度，值越大越灵敏。默认为1,设置为0后无法缩放。
        //   panSensitivity: 10, // 平移操作的灵敏度，值越大越灵敏。默认为1,设置为0后无法平移。支持使用数组分别设置横向和纵向的平移灵敏度
        //   panMouseButton: 'left', // 平移操作使用的鼠标按键，支持：'left' 鼠标左键（默认）;'middle' 鼠标中键 ;'right' 鼠标右键(注意：如果设置为鼠标右键则会阻止默认的右键菜单。)
        //   rotateMouseButton: 'left', // 旋转操作使用的鼠标按键，支持：'left' 鼠标左键;'middle' 鼠标中键（默认）;'right' 鼠标右键(注意：如果设置为鼠标右键则会阻止默认的右键菜单。)

        //   distance: 200, // [ default: 100 ] 默认视角距离主体的距离，对于 grid3D 和 geo3D 等其它组件来说是距离中心原点的距离,对于 globe 来说是距离地球表面的距离。在 projection 为'perspective'的时候有效。
        //   minDistance: 40, // [ default: 40 ] 视角通过鼠标控制能拉近到主体的最小距离。在 projection 为'perspective'的时候有效。
        //   maxDistance: 400, // [ default: 400 ] 视角通过鼠标控制能拉远到主体的最大距离。在 projection 为'perspective'的时候有效。

        //   alpha: 40, // 视角绕 x 轴，即上下旋转的角度。配合 beta 可以控制视角的方向。[ default: 40 ]
        //   beta: 15, // 视角绕 y 轴，即左右旋转的角度。[ default: 0 ]
        //   minAlpha: -720, // 上下旋转的最小 alpha 值。即视角能旋转到达最上面的角度。[ default: 5 ]
        //   maxAlpha: 720, // 上下旋转的最大 alpha 值。即视角能旋转到达最下面的角度。[ default: 90 ]
        //   minBeta: -720, // 左右旋转的最小 beta 值。即视角能旋转到达最左的角度。[ default: -80 ]
        //   maxBeta: 720, // 左右旋转的最大 beta 值。即视角能旋转到达最右的角度。[ default: 80 ]

        //   center: [0, 0, 0], // 视角中心点，旋转也会围绕这个中心点旋转，默认为[0,0,0]。左右 上下 前后

        //   animation: true, // 是否开启动画。[ default: true ]
        //   animationDurationUpdate: 1000, // 过渡动画的时长。[ default: 1000 ]
        //   animationEasingUpdate: 'cubicInOut' // 过渡动画的缓动效果。[ default: cubicInOut ]
        // }
      },
      series: [
        {
          type: 'scatter3D',
          name: 'scatter3D',
          coordinateSystem: 'geo3D',
          // itemStyle: {
          //     color: "transparent",
          // },
          // silent:true,
          // symbol: 'arrow',
          // symbolSize: [80,0],
          // symbol: 'image://https://img-qn.51miz.com/preview/photo/00/01/67/08/P-1670865-99614904.png',
          // 'path://' 将图标设置为任意的 矢量路径
          // symbol: 'path://M643.2 902H380.8V643.2H122V380.8h258.8V122h262.4v258.8H902v262.4H643.2V902z m-218.7-43.7h175V599.5h258.8v-175H599.5V165.7h-175v258.8H165.7v175h258.8v258.8z',
          // [宽，高]
          zlevel: 10,
          label: {
            show: true,
            position: 'top',
            distance: -60,
            textStyle: {
              color: 'transparent',
              padding: [40,30],
              backgroundColor: {
                image: MapPoint
              }
            }
          },
          data: [
            {
              type: 1,
              status: 0,
              name: "卫生监督所",
              value: [122.51059189734963, 39.86780976481697, 50],
              // symbol:'path://M643.2 902H380.8V643.2H122V380.8h258.8V122h262.4v258.8H902v262.4H643.2V902z m-218.7-43.7h175V599.5h258.8v-175H599.5V165.7h-175v258.8H165.7v175h258.8v258.8z'
            },
            {
              type: 1,
              status: 0,
              name: "瑞金医院",
              value: [122.1059189734963, 39.86780976481697, 10],
              // symbol: 'arrow'
            },
            {
              type: 1,
              status: 0,
              name: "瑞金医院1",
              value: [123.2858733712863, 41.91862869420845, 10],
              // symbol:'path://M643.2 902H380.8V643.2H122V380.8h258.8V122h262.4v258.8H902v262.4H643.2V902z m-218.7-43.7h175V599.5h258.8v-175H599.5V165.7h-175v258.8H165.7v175h258.8v258.8z'
            },
          ],
        },
        {
          type: 'map3D',
          map: 'mapGeoJSON',
          // 三维地图每个区域的高度
          regionHeight: 10,
          // 配置为颜色背景
          environment: '#000',
          // 配置为全景贴图
          // environment: 'https://img-qn.51miz.com/preview/photo/00/01/67/08/P-1670865-99614904.png',
          // 配置为垂直渐变的背景
          // environment: new echarts.graphic.LinearGradient(
          //   0,
          //   0,
          //   0,
          //   1,
          //   [
          //     {
          //       offset: 0,
          //       color: '#00aaff' // 天空颜色
          //     },
          //     {
          //       offset: 0.7,
          //       color: '#998866' // 地面颜色
          //     },
          //     {
          //       offset: 1,
          //       color: '#998866' // 地面颜色
          //     }
          //   ],
          //   false
          // ),
          // groundPlane:{
          //   show: true,
          //   // color: '#aaa'
          // },
          // 三维图形的着色效果。 'color' 只显示颜色，不受光照等其它因素的影响。'lambert'表现光照带来的明暗。'realistic' 真实感渲染
          shading: 'realistic',
          // 真实感材质相关的配置项，在 shading 为'realistic'时有效。
          realisticMaterial: {
            // 纹理贴图
            detailTexture:
              'https://img1.baidu.com/it/u=1458656822,2078909008&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=750',
            // 材质细节纹理的平铺。默认为1，也就是拉伸填满。大于 1 的时候，数字表示纹理平铺重复的次数
            textureTiling: 1,
            // 属性用于表示材质的粗糙度，0为完全光滑，1完全粗糙
            roughness: 0.8,
            // 属性用于表示材质是金属还是非金属，0为非金属，1为金属。通常设成0和1就能满足大部分场景了。
            metalness: 0
            // 材质细节的法线贴图,在较少的顶点下依然表现出物体表面丰富的明暗细节。
            // normalTexture:ImgLightPlankFlooringAlbedo,
          },
          // lambert 材质相关的配置项, 在 shading 为'lambert'时有效。
          // lambertMaterial:{
          //   detailTexture: 'https://img1.baidu.com/it/u=1458656822,2078909008&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=750',
          // },
          // // color 材质相关的配置项，在 shading 为'color'时有效。
          // colorMaterial:{
          //   detailTexture: 'https://img1.baidu.com/it/u=1458656822,2078909008&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=750',
          // },
          itemStyle: {
            // 背景颜色
            color: '#4189f2',
            // 不透明度
            opacity: 1,
            // 边框宽度
            borderWidth: 1,
            // 边框颜色
            borderColor: '#fff'
          },
          label: {
            show: true,
            textStyle: {
              color: '#fff', //地图初始化区域字体颜色
              fontSize: 12
            }
          },
          // 鼠标 hover 高亮时图形和标签的样式
          emphasis: {
            label: {
              show: true,
              textStyle: {
                color: '#D7D756',
                fontSize: 12
              }
            }
          },
          // 光照相关的设置。在 shading 为 'color' 的时候无效。
          light: {
            // 场景主光源的设置
            main: {
              color: '#fff', //光照颜色
              intensity: 1.2, //光照强度
              shadow: true, //是否显示阴影
              alpha: 40, // 主光源绕 x 轴，即上下旋转的角度。配合 beta 控制光源的方向。[ default: 40 ]
              beta: 40 // 主光源绕 y 轴，即左右旋转的角度。[ default: 40 ]
            },
            // 全局的环境光设置。
            ambient: {
              color: '#fff', //光照颜色
              intensity: 0.6 // 环境光的强度。[ default: 0.2 ]
            }
          }
          //用于鼠标控制地图旋转等功能
          // viewControl: {
          //   // 用于鼠标的旋转，缩放等视角控制。
          //   projection: 'perspective', // 投影方式，默认为透视投影'perspective'，也支持设置为正交投影'orthographic'。
          //   autoRotate: false, // 是否开启视角绕物体的自动旋转查看。[ default: false ]
          //   autoRotateDirection: 'cw', // 物体自传的方向。默认是 'cw' 也就是从上往下看是顺时针方向，也可以取 'ccw'，既从上往下看为逆时针方向。
          //   autoRotateSpeed: 10, // 物体自传的速度。单位为角度 / 秒，默认为10 ，也就是36秒转一圈。
          //   autoRotateAfterStill: 3, // 在鼠标静止操作后恢复自动旋转的时间间隔。在开启 autoRotate 后有效。[ default: 3 ]
          //   damping: 0, // 鼠标进行旋转，缩放等操作时的迟滞因子，在大于等于 1 的时候鼠标在停止操作后，视角仍会因为一定的惯性继续运动（旋转和缩放）。[ default: 0.8 ]
          //   rotateSensitivity: 10, // 旋转操作的灵敏度，值越大越灵敏。支持使用数组分别设置横向和纵向的旋转灵敏度。默认为1, 设置为0后无法旋转。   rotateSensitivity: [1, 0]——只能横向旋转； rotateSensitivity: [0, 1]——只能纵向旋转。
          //   zoomSensitivity: 10, // 缩放操作的灵敏度，值越大越灵敏。默认为1,设置为0后无法缩放。
          //   panSensitivity: 10, // 平移操作的灵敏度，值越大越灵敏。默认为1,设置为0后无法平移。支持使用数组分别设置横向和纵向的平移灵敏度
          //   panMouseButton: 'left', // 平移操作使用的鼠标按键，支持：'left' 鼠标左键（默认）;'middle' 鼠标中键 ;'right' 鼠标右键(注意：如果设置为鼠标右键则会阻止默认的右键菜单。)
          //   rotateMouseButton: 'left', // 旋转操作使用的鼠标按键，支持：'left' 鼠标左键;'middle' 鼠标中键（默认）;'right' 鼠标右键(注意：如果设置为鼠标右键则会阻止默认的右键菜单。)

          //   distance: 200, // [ default: 100 ] 默认视角距离主体的距离，对于 grid3D 和 geo3D 等其它组件来说是距离中心原点的距离,对于 globe 来说是距离地球表面的距离。在 projection 为'perspective'的时候有效。
          //   minDistance: 40, // [ default: 40 ] 视角通过鼠标控制能拉近到主体的最小距离。在 projection 为'perspective'的时候有效。
          //   maxDistance: 400, // [ default: 400 ] 视角通过鼠标控制能拉远到主体的最大距离。在 projection 为'perspective'的时候有效。

          //   alpha: 40, // 视角绕 x 轴，即上下旋转的角度。配合 beta 可以控制视角的方向。[ default: 40 ]
          //   beta: 15, // 视角绕 y 轴，即左右旋转的角度。[ default: 0 ]
          //   minAlpha: -720, // 上下旋转的最小 alpha 值。即视角能旋转到达最上面的角度。[ default: 5 ]
          //   maxAlpha: 720, // 上下旋转的最大 alpha 值。即视角能旋转到达最下面的角度。[ default: 90 ]
          //   minBeta: -720, // 左右旋转的最小 beta 值。即视角能旋转到达最左的角度。[ default: -80 ]
          //   maxBeta: 720, // 左右旋转的最大 beta 值。即视角能旋转到达最右的角度。[ default: 80 ]

          //   center: [0, 0, 0], // 视角中心点，旋转也会围绕这个中心点旋转，默认为[0,0,0]。左右 上下 前后

          //   animation: true, // 是否开启动画。[ default: true ]
          //   animationDurationUpdate: 1000, // 过渡动画的时长。[ default: 1000 ]
          //   animationEasingUpdate: 'cubicInOut' // 过渡动画的缓动效果。[ default: cubicInOut ]
          // }
        }
      ]
    }
    setOption(option)
  }
  const handleClick = (params: any) => {
    console.log('Clicked on', params)
  }

  return (
    <div>
      <ReactEChartsCore
        echarts={echarts}
        option={option}
        notMerge={true}
        lazyUpdate={true}
        style={{ height: 500 }}
        onEvents={{
          click: handleClick
        }}
      />
    </div>
  )
}

export default EchartsMap
