<template>
  <!--app.vue-->
  <div id="app">
    <HeaderSection />
    <DataTable/>
  </div>
</template>

<script>
import HeaderSection from './components/header.vue'
import DataTable from './components/dataTable.vue'

export default {
  name: 'App',
  components: {
    HeaderSection,
    DataTable
  }
}
</script>

<style lang="scss">
@import './styles/main';
</style>
