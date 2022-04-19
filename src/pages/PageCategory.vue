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
import { findById } from '@/helpers'
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
      return findById(this.$store.state.categories, this.categoryId)
    },
    forums() {
      return this.$store.state.forums.filter(forum => forum.categoryId === this.categoryId)
    }
  }
}
</script>
