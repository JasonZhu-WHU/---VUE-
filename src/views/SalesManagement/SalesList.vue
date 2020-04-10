<template>
  <div>
    <div>
      <a-row :gutter="16">
        <a-col :span="4">
          <a-statistic title="本月订单数" :value="orderNum" style="margin-right: 50px; float: left;" />
        </a-col>
        <a-col :span="8">
          <a-statistic title="较上月" :value="orderNumRatio" :precision="2" suffix="%" :valueStyle="{ color: '#3f8600' }" style="margin-right: 50px;">
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
    </div>
    <div style="padding-top: 40px;float: left;">
      <a-row>
        <a-col :span="10">
          <p style="float: left;">查询某段时间的订单</p>
          <a-range-picker @change="timeUpdated" format="YYYY-MM-DD"  style="float: left; width: 80%;" />
        </a-col>
        <a-col :span="7">
          <p style="float: left;">查询特定用户的订单</p>
          <a-input-search @search="userIdUpdated" enterButton placeholder="输入用户id" v-model="userId" style="float: left;width: 80%;">
          </a-input-search>
        </a-col>
        <a-col :span="7">
          <p style="float: left;">查询特定书籍的订单</p>
          <a-input-search @search="isbnUpdated" enterButton placeholder="输入书籍isbn码" v-model="isbn" style="float: left;width: 80%;">
          </a-input-search>
        </a-col>
      </a-row>
    </div>
    <div style="padding-top: 120px;"></div>

    <a-table :data-source="dataSource" :columns="columns" :loading="loading">
      <div slot="filterDropdown" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }" style="padding: 8px">
        <a-input v-ant-ref="c => searchInput = c" :placeholder="`Search ${column.dataIndex}`" :value="selectedKeys[0]"
          @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])" @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
          style="width: 188px; margin-bottom: 8px; display: block;" />
        <a-button type="primary" @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)" icon="search"
          size="small" style="width: 90px; margin-right: 8px">Search</a-button>
        <a-button @click="() => handleReset(clearFilters)" size="small" style="width: 90px">Reset</a-button>
      </div>
      <a-icon slot="filterIcon" slot-scope="filtered" type="search" :style="{ color: filtered ? '#108ee9' : undefined }" />
      <template slot="customRender" slot-scope="text, record, index, column">
        <span v-if="searchText && searchedColumn === column.dataIndex">
          <template v-for="(fragment, i) in text.toString().split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))">
            <mark v-if="fragment.toLowerCase() === searchText.toLowerCase()" :key="i" class="highlight">{{fragment}}</mark>
            <template v-else>{{fragment}}</template>
          </template>
        </span>
        <template v-else>{{text}}</template>
      </template>
      <template slot="more" slot-scope="text, record">
        <a-button type="link" @click="moreClicked(record)">More</a-button>
      </template>
    </a-table>
  </div>
</template>

<script>
  export default {
    beforeCreate() {
      this.form = this.$form.createForm(this, {
        name: 'SalesList'
      });
    },
    created() {
      this.getStatistics();
      this.getSales();
    },

    data() {
      return {
        loading: true,
        isbn: "",
        userId: null,
        originalData: [],
        dataSource: [],
        searchText: '',
        searchInput: null,
        searchedColumn: '',
        startDate: null,
        endDate: null,
        columns: [{
            title: '订单id',
            dataIndex: 'orderId',
            key: 'orderId',
            scopedSlots: {
              filterDropdown: 'filterDropdown',
              filterIcon: 'filterIcon',
              customRender: 'customRender',
            },
            onFilter: (value, record) => record.oid.toString().toLowerCase().includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: visible => {
              if (visible) {
                setTimeout(() => {
                  this.searchInput.focus();
                }, 0);
              }
            },
          },
          {
            title: '顾客id',
            dataIndex: 'userId',
            key: 'userId',
            scopedSlots: {
              filterDropdown: 'filterDropdown',
              filterIcon: 'filterIcon',
              customRender: 'customRender',
            },
            onFilter: (value, record) => record.userId.toString().toLowerCase().includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: visible => {
              if (visible) {
                setTimeout(() => {
                  this.searchInput.focus();
                });
              }
            },
          },
          {
            title: '收件人姓名',
            dataIndex: 'name',
            key: 'name',
            scopedSlots: {
              filterDropdown: 'filterDropdown',
              filterIcon: 'filterIcon',
              customRender: 'customRender',
            },
            onFilter: (value, record) => record.name.toString().toLowerCase().includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: visible => {
              if (visible) {
                setTimeout(() => {
                  this.searchInput.focus();
                });
              }
            },
          },
          {
            title: '实付金额',
            dataIndex: 'paidPrice',
            key: 'paidPrice',
            scopedSlots: {
              filterDropdown: 'filterDropdown',
              filterIcon: 'filterIcon',
              customRender: 'customRender',
            },
            onFilter: (value, record) => record.paidPrice.toString().toLowerCase().includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: visible => {
              if (visible) {
                setTimeout(() => {
                  this.searchInput.focus();
                });
              }
            },
          },
          {
            title: '下单时间',
            dataIndex: 'time',
            key: 'time',
            scopedSlots: {
              filterDropdown: 'filterDropdown',
              filterIcon: 'filterIcon',
              customRender: 'customRender',
            },
            onFilter: (value, record) => record.time.toString().toLowerCase().includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: visible => {
              if (visible) {
                setTimeout(() => {
                  this.searchInput.focus();
                });
              }
            },
          },
          {
            title: '物流状态',
            dataIndex: 'status',
            key: 'status',
            scopedSlots: {
              filterDropdown: 'filterDropdown',
              filterIcon: 'filterIcon',
              customRender: 'customRender',
            },
            onFilter: (value, record) => record.status.toString().toLowerCase().includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: visible => {
              if (visible) {
                setTimeout(() => {
                  this.searchInput.focus();
                });
              }
            },
          },
          {
            title: '更多信息',
            dataIndex: 'more',
            key: 'more',
            scopedSlots: {
              customRender: 'more'
            },
          },
        ],
        orderNum: 0,
        orderNumRatio: 0,
        orderVal: 0,
        orderValRatio: 0,
        num_arrow_type: "arrow-up",
        val_arrow_type: "arrow-up",
        color: 'cf1322'
      };
    },
    methods: {
      getSales() {
        this.loading = true;
        var _this = this;
        if(this.userId){
          this.axios.get('/api/sale/user/'+_this.userId, {
            params: {
              startTime: _this.startDate,
              endTime: _this.endDate,
              page: 0,
              size: 30
            }
          }).then(function(response) {
            var array = response.data.data;
            console.log(array);
            _this.originalData = array;
            _this.dataSource = []
            for (var i = 0; i < array.length; i++) {
              _this.dataSource[i] = {
                key: i + 1,
                orderId: array[i].orderId,
                userId: array[i].userId,
                name: array[i].name,
                paidPrice: array[i].paidPrice,
                time: array[i].time.slice(0, 10),
                status: array[i].status,
              }
            }
            _this.loading = false;
            console.log(_this.dataSource)
          }).catch(function(error) {
            console.log(error)
            _this.$message.error('订单获取出现错误', 5);
          })
        }
        else if(this.isbn){
          this.axios.get('/api/sale/book/'+_this.isbn, {
            params: {
              startTime: _this.startDate,
              endTime: _this.endDate,
              page: 0,
              size: 30
            }
          }).then(function(response) {
            var array = response.data.data;
            console.log(array);
            _this.originalData = array;
            _this.dataSource = []
            for (var i = 0; i < array.length; i++) {
              _this.dataSource[i] = {
                key: i + 1,
                orderId: array[i].orderId,
                userId: array[i].userId,
                name: array[i].name,
                paidPrice: array[i].paidPrice,
                time: array[i].time.slice(0, 10),
                status: array[i].status,
              }
            }
            _this.loading = false;
            console.log(_this.dataSource)
          }).catch(function(error) {
            console.log(error)
            _this.$message.error('订单获取出现错误', 5);
          })
        }
        else{
          this.axios.get('/api/sale', {
            params: {
              startTime: _this.startDate,
              endTime: _this.endDate,
              page: 0,
              size: 30
            }
          }).then(function(response) {
            var array = response.data.data;
            console.log(array);
            _this.originalData = array;
            _this.dataSource = []
            for (var i = 0; i < array.length; i++) {
              _this.dataSource[i] = {
                key: i + 1,
                orderId: array[i].orderId,
                userId: array[i].userId,
                name: array[i].name,
                paidPrice: array[i].paidPrice,
                time: array[i].time.slice(0, 10),
                status: array[i].status,
              }
            }
            _this.loading = false;
            console.log(_this.dataSource)
          }).catch(function(error) {
            console.log(error)
            _this.$message.error('订单获取出现错误', 5);
          })
        }
      },
      
      getStatistics(){
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
          if(response.data.numRatio == 0){
            _this.orderNumRatio= 100
          }
          else if(response.data.amountRatio < 0){
            _this.num_arrow_type = "arrow-down"
          }
          _this.orderVal = response.data.amount;
          _this.orderValRatio = response.data.amountRatio;
          if(response.data.amountRatio == 0){
            _this.orderValRatio= 100
          }
          else if(response.data.amountRatio < 0){
            _this.val_arrow_type = "arrow-down"
          }
        }).catch(function(error) {
          console.log(error)
          _this.$message.error('Statistics比例获取出现错误', 5);
        })
      },

      timeUpdated(date, dateString) {
        console.log(date, dateString);
        this.startDate = Date.parse(dateString[0] + " 00:00:00")
        this.endDate = Date.parse(dateString[1] + " 23:59:59")
        this.getSales()
      },
      
      userIdUpdated(value, event) {
        console.log(value, event);
        this.userId = value;
        this.getSales()
      },
      
      isbnUpdated(value, event) {
        console.log(value, event);
        this.isbn = value;
        this.getSales()
      },

      handleSearch(selectedKeys, confirm, dataIndex) {
        confirm();
        this.searchText = selectedKeys[0];
        this.searchedColumn = dataIndex;
      },

      handleReset(clearFilters) {
        clearFilters();
        this.searchText = '';
      },

      moreClicked(more) {
        var _this = this;
        var index = more.key - 1;
        console.log(this.originalData[index])
        this.$router.push({
          name: 'OrderDetail',
          params: {
            info: _this.originalData[index]
          }
        });
      },
    },
  };
</script>
<style scoped>
  .highlight {
    background-color: rgb(255, 192, 105);
    padding: 0px;
  }
</style>
