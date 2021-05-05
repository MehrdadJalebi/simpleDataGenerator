<template>
 <!-- data table component -->
  <div>
    <Filters @filter="filter" :items="items" />
    <table id="dataTable">
      <th>
        <span>انتخاب</span>
      </th>
      <th>
        <i @click="sort('name')" class="sort"></i>
        <span>نام تغییردهنده</span>
      </th>
      <th>
        <i @click="sort('date')" class="sort"></i>
        <span>تاریخ</span>
      </th>
      <th>
        <i @click="sort('title')" class="sort"></i>
        <span>نام آگهی</span>
      </th>
      <th>
        <i @click="sort('field')" class="sort"></i>
        <span>فیلد</span>
      </th>
      <th>
        <i @click="sort('old_value')" class="sort"></i>
        <span>مقدار قدیمی</span>
      </th>
      <th>
        <i @click="sort('new_value')" class="sort"></i>
        <span>مقدار جدید</span>
      </th>
      <tr v-for="(item, index) in showItems" :key="index">
        <td>
          <input type='checkbox' id="item.id" :checked="isStared(item.id)" @click="setStared(item.id)" />
        </td>
        <td>{{ item.name }}</td>
        <td>{{ item.date }}</td>
        <td>{{ item.title }}</td>
        <td>{{ item.field }}</td>
        <td>{{ item.old_value }}</td>
        <td>{{ item.new_value }}</td>
      </tr>
    </table>
    <Loading v-if="isLoading" />
    <Pagination 
       :page="page" 
       :pageCount="pageSize" 
       :totalItems="totalItemsCount"
       @change="filter"
    />
  </div>
</template>

<script>
import Filters from '@/components/filters'
import Loading from '@/components/loading'
import Pagination from '@/components/pagination'
import getJsonData from '@/mixins/global'
export default {
  name: 'dataTable',
  mixins: [getJsonData],
  components: {
    Filters,
    Loading,
    Pagination
  },
  data() {
    return {
      items: [],
      showItems: [],
      filterItems: [],
      filterFields: {
        name: this.$route.query.name ? this.$route.query.name : null,
        date: this.$route.query.date ? this.$route.query.date : null,
        title: this.$route.query.title ? this.$route.query.title : null,
        field: this.$route.query.field ? this.$route.query.page : null
      },
      sortItems: {
        sortItem: this.$route.query.sortItem ? this.$route.query.sortItem : null,
        sortFlow: this.$route.query.sortFlow ? this.$route.query.sortFlow : null
      },
      isLoading: false,
      pages: null,
      pageSize: 15,
      page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
      totalItemsCount: null
    }
  },
  mounted(){
    //getting parsed json datas
    this.isLoading = true
    this.getJsonData('data.json', datas => {
      this.isLoading = false
      this.items = datas
    })
  },
  methods: {
    //getting filtered data
    filter(val) {
      if (val.items) this.filterItems = val.items
      if (val.page) this.page = val.page
      if (val.filterFields) this.filterFields = { ...val.filterFields }
      let payload = {
        items: this.filterItems,
        page: this.page
      }
      this.loadData(payload)
    },
    //getting current page Datas
    currentPageDatas(data, size, page) {
      let start = page === 1 ? 0 : size * (page - 1)
      let end = page * size
      return data.slice(start, end)
    },
    //sorting All Datas
    sort(sortItem){
      this.isLoading = true
      this.sortItems.sortItem = sortItem
      if (this.sortItems.sortFlow === 'ascend' || !this.sortItems.sortFlow ) {
        this.sortItems.sortFlow = 'descend'
        this.filterItems.sort(this.dynamicSort(`-${sortItem}`))
      } else {
        this.sortItems.sortFlow = 'ascend'
        this.filterItems.sort(this.dynamicSort(`${sortItem}`))
      }
      let payload = {
        items: this.filterItems,
        page: this.page
      }
      this.loadData(payload)
      setTimeout(() => { this.isLoading = false }, 1000 ) 
    },
    dynamicSort(property) {
      var sortOrder = 1
      if(property[0] === "-") {
        sortOrder = -1
        property = property.substr(1)
      }
      return function (first, second) {
        var f = first[property].toString()
        var s = second[property].toString()
        var result = (f < s) ? -1 : (f > s) ? 1 : 0
        return result * sortOrder
      }
    },
    loadData(payload){
      let items = payload.items ? payload.items : this.items
      this.totalItemsCount = items.length
      this.showItems = this.currentPageDatas(items, this.pageSize, this.page)
      this.$router.push({ query: Object.assign({}, this.$route.query, { ...this.filterFields }) }).catch(()=>{})
    },
    setStared(id){
      let array = JSON.parse(localStorage.getItem('stared')) || []
      let index = array.indexOf(id)
      if (index === -1) {
        array.push(id)
        localStorage.setItem('stared', JSON.stringify(array)) 
      } else {
        array.splice(index, 1)
        localStorage.setItem('stared', JSON.stringify(array)) 
      }
    },
    isStared(id) {
      return localStorage.getItem('stared') && JSON.parse(localStorage.getItem('stared')).includes(id)
    }
  }
}
</script>

