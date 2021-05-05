<template>
 <!--filter component -->
  <div>
    <div class="filters">
      <input 
         type="text" 
         id="name"
         placeholder="نام تغییردهنده"
         v-model="name" >
         <date-picker
           locale="en"
           type="date"
           element="date"
           format="YYYY-MM-DD"
           display-format="YYYY/MMMM/DD"
           v-model="date"
          ></date-picker>
         <input 
           type="text" 
           id="date"
           v-model="date" 
           placeholder="تاریخ"
           >
         <input 
         type="text" 
         id="title"
         placeholder="نام آگهی"
         v-model="title" >
         <input 
         type="text" 
         id="field" 
         placeholder="فیلد"
         v-model="field" >
      <button id="filterbtn" @click="onFilter(true)">فیلتر</button>
    </div>
  </div>
</template>

<script>
import { BinarySearchTree } from '@/utilities/BST'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
export default {
  name: 'filters',
  components: {
    'date-picker': VuePersianDatetimePicker
  },
  props: {
    items: {
      type: Array
    }
  },
  data() {
    return {
      filterItems: this.items,
      bstItems: null,
      name: this.$route.query.name ? this.$route.query.name : null,
      date: this.$route.query.date ? this.$route.query.date : null,
      title: this.$route.query.title ? this.$route.query.title : null,
      field: this.$route.query.field ? this.$route.query.field : null
    }
  },
  watch: {
    items() {
      this.bstItems = new BinarySearchTree()
      this.items.forEach((item)=> {
        const itemDate = item.date
        this.bstItems.insert(itemDate, item)
      })
      this.onFilter(this.name || this.date || this.title || this.field)
    }
  },
  methods: {
    onFilter(filtered) {
      let namesArray = []
      let datesArray = []
      let titlesArray = []
      let fieldsArray = []
      let resultArrays = []
      //filter dates with BST Algorithm
      let dateFilteredArray = this.bstItems.find(this.date)
      datesArray= this.date ? (dateFilteredArray && dateFilteredArray.children.length > 0 ?
        dateFilteredArray.children : [] ) : this.items
      console.log(dateFilteredArray)
      console.log(datesArray)
      this.items.map(item => {
        if (this.name && item.name.indexOf(this.name) !== -1) {
          namesArray.push(item)
        }
        if (this.title && item.title.indexOf(this.title) !== -1) {
          titlesArray.push(item)
        }
        if (this.field && item.field.indexOf(this.field) !== -1) {
          fieldsArray.push(item)
        }
      })
      if ((!this.name && namesArray.length > 0) || (this.name && filtered)) resultArrays.push(namesArray) 
      if ((!this.date && datesArray.length > 0 ) || (this.date && filtered)) resultArrays.push(datesArray) 
      if ((!this.title && titlesArray.length > 0 ) || (this.title && filtered)) resultArrays.push(titlesArray) 
      if ((!this.field && fieldsArray.length > 0 ) || (this.field && filtered)) resultArrays.push(fieldsArray)
      console.log(resultArrays)
      if (resultArrays.length > 0) {
        this.filterItems = resultArrays.shift().filter(v => {
          return resultArrays.every(a => {
            return a.indexOf(v) !== -1
          })
        })
      } else {
        this.filterItems = this.filtered ? [] : this.items
      }
      console.log(this.filtered)
      console.log(this.filterItems)
      this.$emit('filter', { 
        items: this.filterItems,
        filterFields: {
          name: this.name,
          date: this.date,
          title: this.title,
          field: this.field
        }
      })
    }
  }
}
</script>

