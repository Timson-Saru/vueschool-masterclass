<template>
  <h1 class="push-top">Welcome to the forum</h1>
  <CategoryList :categories="categories"/>
</template>

<script>
import CategoryList from '@/components/CategoryList.vue'
import { mapActions } from 'vuex'
import sourceData from '@/data.json'

console.log(sourceData)
export default {
  computed: {
    categories() {
      return this.$store.state.categories
    }
  },
  methods: {
    ...mapActions(['fetchAllCategories', 'fetchForums'])
  },
  async created() {
    const categories = await this.fetchAllCategories()
    const forumIds = categories.map(category => category.forums).flat()
    this.fetchForums({ ids: forumIds })
  },
  components: {
    CategoryList
  }
}
</script>
