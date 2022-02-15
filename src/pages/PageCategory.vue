<template>
  <div class="col-full">
    <div class="category-item">
      <h1>{{ category.name }}</h1>
      <div class="forum-list">
        <h2 class="list-title">{{ category.name }}</h2>
        <ForumList :forums="forums"/>
      </div>

    </div>
  </div>
</template>

<script>
import ForumList from '@/components/ForumList.vue'
export default {
  props: {
    categoryId: {
      required: true,
      type: String
    }
  },
  components: {
    ForumList
  },
  computed: {
    category() {
      return this.$store.state.categories.find(category => category.id === this.categoryId)
    },
    forums() {
      return this.$store.state.forums.filter(forum => forum.categoryId === this.categoryId)
    }
  }
}
</script>
