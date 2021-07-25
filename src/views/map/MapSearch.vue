<template>
  <div class="map-search">
    <div class="album" id="album"></div>
  </div>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader";
let AMap = null;

export default {
  created() {
    this.initAMap();
  },
  data() {
    return {
      activeIndex: "1",
    };
  },
  mounted() {},
  methods: {
    // 周边搜索
    searchNear(mapNew) {
      mapNew.clearMap();
      let placeSearch = new AMap.PlaceSearch({
        // city: '', // 兴趣点城市
        citylimit: true, // 是否强制在设置的城市内搜索，默认false
        type: "公司", // 兴趣点类别，用‘|’分隔，默认：'餐饮服务|商务住宅|生活服务'
        pageSize: 20, // 每页条数，默认10，范围1-50
        pageIndex: 1, // 页码
        extensions: "all", // 默认base，返回基本地址信息；all：返回详细信息
        // map: AMap, // 地图实例，可选
        // panel: 'panel', // 结果列表的id容器，可选
        autoFitView: true, // 是否自动调整地图视野到marker点都处于可见范围
      });

      let keywords = "", // 关键字
        position = [104.070081, 30.581108], // 中心点经纬度
        radius = 2000; // 搜索半径 0-50000
      placeSearch.searchNearBy(
        keywords,
        position,
        radius,
        function (status, result) {
          console.log(mapNew, "地图实列");
          // var icon = new AMap.Icon({
          //   size: new AMap.Size(10, 10), // 图标尺寸
          //   image: iconquyu, // Icon的图像
          //   imageOffset: new AMap.Pixel(0, -60), // 图像相对展示区域的偏移量，适于雪碧图等
          //   imageSize: new AMap.Size(40, 50), // 根据所设置的大小拉伸或压缩图片
          // });
          // console.log(icon,"图片");
          new AMap.Marker({
              position: [
                104.070081,
                30.581108,
              ], //不同标记点的经纬度s
              // icon: "http://store.is.autonavi.com/showpic/2f754f895d410592bdf46eeddc379bee",//中心点icon
              title: 'aaa',
              clickable:true,
              // content:result.poiList.pois[i].name,
              // text:result.poiList.pois[i].name,
              // offset:[0,50],
              map: mapNew,
            });
          for (let i = 0; i < result.poiList.pois.length; i++) {
            new AMap.Marker({
              position: [
                result.poiList.pois[i].location.lng,
                result.poiList.pois[i].location.lat,
              ], //不同标记点的经纬度
              // icon: "http://store.is.autonavi.com/showpic/2f754f895d410592bdf46eeddc379bee",
              title: result.poiList.pois[i].name,
              clickable:true,
              // content:result.poiList.pois[i].name,
              // text:result.poiList.pois[i].name,
              // offset:[0,50],
              map: mapNew,
            });
          }
          console.log(status, result, "结果"); //这个结果可以看出周边的很多信息列表，根据结果做很多事，如果要翻页，请移步官网 在此如有需要  附链接https://lbs.amap.com/api/webservice/guide/api/newpoisearch
        }
      );
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    initAMap() {
      let that = this;
      AMapLoader.load({
        key: "0a3647329c1fceff9e14bcd1a27f4f0d",
        version: "2.0",
        plugins: ["AMap.PlaceSearch", "AMap.Geolocation"],
      })
        .then((map) => {
          AMap = map;
          // 其他功能同h5
          var mapNew = new AMap.Map("album", {
            center: [104.070081, 30.581108], // 地图中心点坐标
            zoom: 15, // 地图缩放级别
          });
          that.searchNear(mapNew);
        })
        .catch((e) => {
          console.log("高德地图加载错误", e);
        });
    },
  },
};
</script>

<style>
.album {
  width: 320px;
  height: 532px;
  border-radius: 4px;
  position: relative;
}
</style>