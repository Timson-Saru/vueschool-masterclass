<template>
  <div v-if="asyncDataStatus_ready" class="col-full">

    <div class="category-item">

      <h1>{{ category.name }}</h1>

      <div class="forum-list">
        <h2 class="list-title">{{ category.name }}</h2>
        <ForumList :forums="getForumsForCategory(category)"/>
      </div>

    </div>

  </div>
</template>

<script>
import ForumList from '@/components/ForumList.vue'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import { mapActions } from 'vuex'
import { findById } from '@/helpers'
export default {
  props: {
    categoryId: {
      required: true,
      type: String
    }
  },
  methods: {
    ...mapActions(['fetchCategory', 'fetchForums']),
    getForumsForCategory(category) {
      return this.$store.state.forums.filter(forum => forum.categoryId === category.id)
    }
  },
  components: {
    ForumList
  },
  mixins: [asyncDataStatus],
  computed: {
    category() {
      return findById(this.$store.state.categories, this.categoryId) || {}
    }
  },
  async created() {
    const category = await this.fetchCategory({ id: this.categoryId })
    await this.fetchForums({ ids: category.forums })
    this.asyncDataStatus_fetched()
  }
}
</script>
