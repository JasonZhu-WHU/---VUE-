<template>
  <div>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="销售数据分析" subTitle="based on Echarts">
      <template slot="extra">
        <a-select placeholder="选取查询数据" style="width: 150px" @change="chartChange">
          <a-select-option value="pie">销售来源分析</a-select-option>
          <a-select-option value="line">销售趋势分析</a-select-option>
        </a-select>
        <a-range-picker @change="timeUpdated" format="YYYY-MM-DD" />
      </template>
      <a-row :gutter="16">
        <a-col :span="4">
          <a-statistic title="本月订单数" :value="orderNum" style="margin-right: 50px; float: left;" />
        </a-col>
        <a-col :span="8">
          <a-statistic title="较上月" :value="orderNumRatio" :precision="2" suffix="%" :valueStyle="{ color: '#3f8600' }"
            style="margin-right: 50px;">
            <template v-slot:prefix>
              <a-icon :type="num_arrow_type" />
            </template>
          </a-statistic>
        </a-col>
        <a-col :span="5">
          <a-statistic title="本月交易额(CNY)" :precision="2" :value="orderVal" style="margin-right: 50px; float: left;" />
        </a-col>
        <a-col :span="4">
          <a-statistic title="较上月" :value="orderValRatio" :precision="2" suffix="%" valueClass="demo-class" :valueStyle="{ color: '#3f8600' }">
            <template v-slot:prefix>
              <a-icon :type="val_arrow_type" />
            </template>
          </a-statistic>
        </a-col>
      </a-row>
    </a-page-header>
    <br />

    <div style="padding-top: 40px;"></div>

    <div id="myChart" style="width:80%;height: 400px;margin:0 auto"></div>

    <!--    <a-row type="flex">
      <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="10">
        
      </a-col>
      <a-col :xs="10" :sm="8" :md="6" :lg="4" :xl="2"> </a-col>
      <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="10">
        <a-list itemLayout="horizontal" :dataSource="data">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-list-item-meta description="Ant Design, a design language for background applications, is refined by Ant UED Team">
              <a slot="title" href="https://www.antdv.com/">{{item.title}}</a>
              <a-avatar slot="avatar" style="backgroundColor:#87d068" icon="solution" />
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-col>
    </a-row> -->

  </div>
</template>

<script>
  // 引入基本模板
  let echarts = require('echarts/lib/echarts')
  // 引入柱状图组件
  require('echarts/lib/chart/pie')
  require('echarts/lib/chart/line')
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/legend')
  require('echarts/lib/component/title')
  const data = [{
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];
  export default {
    data() {
      return {
        startDate: null,
        endDate: null,
        orderNum: 0,
        orderNumRatio: 0,
        orderVal: 0,
        orderValRatio: 0,
        num_arrow_type: "arrow-up",
        val_arrow_type: "arrow-up",
        color: 'cf1322',
        data,
      }
    },
    created() {
      this.getStatistics();
      // this.getChartData();
    },

    mounted() {
      this.drawPieChart();
    },
    methods: {
      drawPieChart() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'))

        var _this = this;
        this.axios.get('/api/analysis/category', {
          params: {
            startTime: _this.startDate,
            endTime: _this.endDate,
          }
        }).then(function(response) {
          var array = response.data;
          console.log(array);
          var types = [];
          var chartData = [];
          for (var i = 0; i < array.length; i++) {
            types[i] = array[i].category;
            chartData[i] = {
              value: array[i].money,
              name: array[i].category,
            }
          }
          // 绘制图表
          myChart.setOption({
            backgroundColor: '#fff',
            title: {
              text: '营收来源分析',
              subtext: '营业收入来源细分',
              left: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: types,
            },
            series: [{
              name: '销售额占比',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: chartData,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }]
          });
          console.log(myChart)
        }).catch(function(error) {
          console.log(error)
          _this.$message.error('图表数据获取出现错误', 5);
        })
      },

      drawLineChart() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'))

        //获取销量统计范围的时间戳
        var _this = this;
        if (_this.startDate == null) {
          _this.startDate = Date.parse(new Date(new Date() - 1000 * 60 * 60 * 24 * 30));
          _this.endDate = Date.parse(new Date());
        }
        let startTime = Date.parse(new Date(_this.startDate + 1000 * 60 * 60 * 24 * 30));
        let endTime = Date.parse(new Date(_this.endDate + 1000 * 60 * 60 * 24 * 30 + 1));
        console.log(startTime)
        console.log(endTime)
        var dateArray = []
        //销量横坐标时间
        for (var newDate = startTime; newDate < endTime; newDate += 1000 * 60 * 60 * 24) {
          let newDateEle = new Date(newDate);
          dateArray.push(newDateEle.getMonth() + "/" + newDateEle.getDate())
        }
        console.log(new Date(_this.endDate).getDay())
        //书籍分类
        var chartData = [];
        var categories = [];
        this.axios.get('/api/category').then(function(response) {
          for (let i = 0; i < response.data.length; i++) {
            categories.push(response.data[i].category)
          }
          _this.axios.get('/api/analysis/day', {
            params: {
              startTime: _this.startDate,
              endTime: _this.endDate,
            }
          }).then(function(response) {
            console.log(categories)
            let saleData = response.data
            let map = new Map();
            //销量数据，先填0
            for (let i = 0; i < categories.length; i++) {
              let saleArray = []
              for (let j = 0; j < dateArray.length; j++) {
                saleArray.push(0)
              }
              //Map存储分类和在chartData对应顺序，即分类名为key，而顺序为value
              map.set(categories[i], i)
              chartData.push({
                name: categories[i],
                type: 'line',
                smooth: true,
                seriesLayoutBy: 'row',
                data: saleArray
              })
            }
            //根据销量数据更改，没改的依然是0
            for (let i = 0; i < saleData.length; i++) {
              var index = map.get(saleData[i].category)
              //天数差
              var diff = Math.floor((Date.parse(saleData[i].time) - _this.startDate) / 86400000)
              chartData[index].data[diff] = Number(saleData[i].money.toFixed(2));
            }
            console.log(dateArray)
            console.log(chartData)
            myChart.setOption({
              title: {
                text: '销售趋势分析',
                subtext: '营业收入变化趋势',
                left: 'right',
                top: 0
              },
              tooltip: {
                trigger: 'axis',
                formatter: function(params) {
                  var result = params[0].name + "<br>";
                  params.forEach(function(item) {
                    if (item.value) {
                      result += item.marker + " " + item.seriesName + " : " + item.value + "</br>";
                    } else {
                      result += item.marker + " " + item.seriesName + " :  0 </br>";
                    }
                  });
                  return result;
                }
              },
              legend: {
                orient: 'horizontal',
                // x: 'right', //可设定图例在左、右、居中
                // y: 'center', //可设定图例在上、下、居中
                // padding: [0, 50, 0, 0], //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
                data: categories
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              toolbox: {
                feature: {
                  saveAsImage: {}
                }
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: dateArray
              },
              yAxis: {
                type: 'value'
              },
              series: chartData
            })
          }).catch(function(error) {
            console.log(error)
            _this.$message.error('图表数据获取出现错误', 5);
          })
        }).catch(function(error) {
          console.log(error)
          this.$message.error('书籍分类获取出现错误', 5);
        })
      },

      getStatistics() {
        var _this = this;
        var time = new Date();
        var timestamp = time.getTime(time)
        this.axios.get('/api/analysis/mom', {
          params: {
            time: timestamp
          }
        }).then(function(response) {
          console.log(response.data);
          _this.orderNum = response.data.number;
          _this.orderNumRatio = response.data.numRatio;
          if (response.data.numRatio == 0) {
            _this.orderNumRatio = 100
          } else if (response.data.amountRatio < 0) {
            _this.num_arrow_type = "arrow-down"
          }
          _this.orderVal = response.data.amount;
          _this.orderValRatio = response.data.amountRatio;
          if (response.data.amountRatio == 0) {
            _this.orderValRatio = 100
          } else if (response.data.amountRatio < 0) {
            _this.val_arrow_type = "arrow-down"
          }
        }).catch(function(error) {
          console.log(error)
          _this.$message.error('Statistics比例获取出现错误', 5);
        })
      },

      chartChange(e) {
        console.log(e)
        if (e == "pie") {
          console.log("pie")
        } else {
          this.drawLineChart();
        }
      },

      timeUpdated(value, dateString) {
        console.log(value)
        console.log(dateString)
        console.log(this.startDate)
        this.startDate = Date.parse(dateString[0] + " 00:00:00")
        this.endDate = Date.parse(dateString[1] + " 23:59:59")
        this.drawPieChart()
      }
    }
  }
</script>

<style>
</style>
