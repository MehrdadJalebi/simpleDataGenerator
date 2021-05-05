<template>
 <!--pagination component -->
  <div
    class="pagination"
    >
    <button
      class="button rounded-right"
      :disabled="numberOfPages == 1 || page == 1"
      @click="firstPage"
      >
      صفحه اول
    </button>
    <button
      class="button"
      :disabled="page == 1"
      @click="formerPage"
      >
      صفحه قبل
    </button>
    <button
      v-for="i in pageListBefore"
      :key="i"
      :class="{'active' : page == i }"
      class="button"
      @click="goToPages(i)"
      >
      {{ i }}
    </button>
    <button
      class="button active"
      >
      {{ page }}
    </button>
    <button
      v-for="i in pageListAfter"
      :key="i"
      :class="{'active' : page == i }"
      class="button"
      @click="goToPages(i)"
      >
      {{ i }}
    </button>
    <button
      class="button"
      :disabled="page == numberOfPages"
      @click="nextPage"
      >
      صفحه بعد
    </button>
    <button
      class="button rounded-left"
      :disabled="page == numberOfPages"
      @click="lastPage"
      >
      صفحه آخر
    </button>
  </div>
</template>

<script>
export default {
  props: {
    pageCount: {
      default: 0,
      type: Number,
      required: false
    },
    totalItems: {
      default: 0,
      type: Number,
      required: false
    },
    page: {
      default: 0,
      type: Number,
      required: false
    }
  },
  methods: {
    update (i) {
      this.$emit('change', {
        page: i
      })
    },
    goToPages (i) {
      this.update(i)
    },
    nextPage () {
      if (this.page + 1 <= this.numberOfPages) { this.update(this.page + 1) }
    },
    firstPage () {
      this.update(1)
    },
    lastPage () {
      this.update(this.numberOfPages)
    },
    formerPage () {
      if (this.page - 1 >= 1) { this.update(this.page - 1) }
    }
  },
  computed: {
    pageListBefore () {
      const output = []
      for (let i = this.page - 1; i > this.page - 3 && i >= 1; i--) {
        output.unshift(i)
      }
      return output
    },
    pageListAfter () {
      const output = []
      for (let i = this.page + 1; i < this.page + 3 && i <= this.numberOfPages; i++) {
        output.push(i)
      }
      return output
    },
    numberOfPages () {
      return Math.ceil(this.totalItems / this.pageCount)
    }
  }
}
</script>
