<template>
  <h1 class="push-top">Welcome to the forum</h1>
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
  async beforeCreate() {
    const categories = await this.$store.dispatch('fetchAllCategories')
    const forumIds = categories.map(category => category.forums).flat()
    this.$store.dispatch('fetchForums', { ids: forumIds })
  },
  components: {
    CategoryList
  }
}
</script>
