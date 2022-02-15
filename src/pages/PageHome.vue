<template>
  <h1>Welcome to the forum</h1>
  <CategoryList :categories="categories"/>
</template>

<script>
import CategoryList from '@/components/CategoryList.vue'
import sourceData from '@/data.json'
console.log(sourceData)
export default {
  computed: {
    categories() {
      return this.$store.state.categories
    }
  },
  components: {
    CategoryList
  }
}
</script>

<style>

</style>
