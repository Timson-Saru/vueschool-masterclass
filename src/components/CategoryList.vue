<template>
  <div class="col-full" v-for="category in categories" :key="category.id">
    <div class="category-item">

        <div class="forum-list">

          <h2 class="list-title">
            <router-link v-if="category.forums.length > 0" :to="{ name: 'PageCategory', params: {categoryId: category.id }}">
              {{ category.name }}
            </router-link>
            <span v-else>{{ category.name }}</span>
          </h2>

          <ForumList :forums="categoryForums(category.id)"/>

        </div>

    </div>
  </div>
</template>

<script>
import ForumList from '@/components/ForumList.vue'
export default {
  props: {
    categories: {
      required: true,
      type: Array
    }
  },
  components: {
    ForumList
  },
  methods: {
    categoryForums(id) {
      return this.$store.state.forums.filter(forum => forum.categoryId === id)
    }
  }
}
</script>
