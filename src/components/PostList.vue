<template>
  <div class="post-list">

      <div class="post" v-for="post in posts" :key="post.id">

        <div v-if="userById(post.userId)" class="user-info">

          <a href="#" class="user-name">
            {{userById(post.userId).name}}
          </a>

          <a>
            <img
              class="avatar-large"
              :src="userById(post.userId).avatar"
              alt=""
            />
          </a>

          <p class="desktop-only text-small">{{ userById(post.userId).postsCount }} posts</p>
          <p class="desktop-only text-small">{{ userById(post.userId).threadsCount }} threads</p>

        </div>

        <div class="post-content">

          <div>
            <div v-if="editing === post.id"> Editing </div>
            <p v-else>
              {{ post.text }}
            </p>
          </div>

          <a
            v-if="editing === post.id"
            @click.prevent="toggleEditMode(post.id)"
            style="margin-left: auto; padding-left: 10px;"
            class="link-unstyled"
            title="Make a change"
          >
            <fa icon="xmark" />
          </a>
          <a
            v-else
            @click.prevent="toggleEditMode(post.id)"
            style="margin-left: auto; padding-left: 10px;"
            class="link-unstyled"
            title="Make a change"
          >
            <fa icon="pencil-alt" />
          </a>

        </div>

        <div class="post-date text-faded">
          <AppDate :timeStamp="post.publishedAt"/>
        </div>

      </div>

    </div>
</template>

<script>
export default {
  computed: {
    users() {
      return this.$store.state.users
    }
  },
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      editing: null
    }
  },
  methods: {
    userById(userId) {
      return this.$store.getters.user(userId)
    },
    toggleEditMode(id) {
      this.editing = this.editing === id ? null : id
    }
  }
}
</script>
