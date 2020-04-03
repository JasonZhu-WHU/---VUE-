<template>
  <div>
    <div>
      <a-statistic title="本月订单数" :value="112893" style="margin-right: 50px; float: left;" />
      <a-statistic title="本月交易额(CNY)" :precision="2" :value="112893" style="margin-right: 50px; float: left;" />
    </div>
    <div style="padding-top: 40px;float: left;">
      <a-row type="flex" justify="center" align="middle">
        <a-col :span="7">
          <p style="float: left;">查询某段时间的订单</p>
          <a-range-picker @change="timeChanged" style="float: left; width: 80%;" />
        </a-col>
        <a-col :span="7">
          <p style="float: left;">查询特定用户的订单</p>
          <a-input placeholder="输入用户id" v-model="userId" style="float: left;width: 80%;">
            <a-icon slot="prefix" type="user" />
            <a-tooltip slot="suffix" title="请输入用户id">
              <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
            </a-tooltip>
          </a-input>
        </a-col>
        <a-col :span="7">
          <p style="float: left;">查询特定书籍的订单</p>
          <a-input placeholder="输入书籍isbn码" v-model="isbn" style="float: left;width: 80%;">
            <a-icon slot="prefix" type="book" />
            <a-tooltip slot="suffix" title="输入书籍isbn码">
              <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
            </a-tooltip>
          </a-input>
        </a-col>
        <a-col :span="3">
          <a-button type="default" size="large" style="float: right;">查询订单</a-button>
        </a-col>
      </a-row>
    </div>
    <div style="padding-top: 185px;"></div>

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
      this.getSales();
    },
    mounted() {
      this.getSales();
    },
    
    data() {
      return {
        loading: true,
        isbn: "",
        userId: null,
        dataSource: [],
        searchText: '',
        searchInput: null,
        searchedColumn: '',
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
      };
    },
    methods: {
      getSales(){
        var _this = this;
        this.axios.get('/api/sale', {
          params:{
            startTime: null,
            endTime: null,
            page: 0,
            size: 30
          }
        }).then(function(response) {
          var array = response.data.data;
          console.log(array);
          for(var i=0;i<array.length;i++){
            _this.dataSource[i] = {
              key: i+1,
              orderId: array[i].orderId,
              userId: array[i].userId,
              name: array[i].name,
              paidPrice: array[i].paidPrice,
              time: array[i].time.slice(0,10),
              status: array[i].status,
            }
          }
          _this.loading = false;
          console.log(_this.dataSource)
        }).catch(function(error) {
          console.log(error)
          this.$message.error('订单获取出现错误', 5);
        })
      },
      
      timeChanged(date, dateString) {
        console.log(date, dateString);
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
        console.log(more)
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
