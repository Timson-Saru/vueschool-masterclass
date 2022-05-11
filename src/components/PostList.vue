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

          <div class="col-full">
            <PostEditor
              v-if="editing === post.id"
              :post="post"
              @save="handleUpdate"
            />
            <p v-else>
              {{ post.text }}
            </p>
          </div>

          <a
            v-show="editing === post.id"
            @click.prevent="toggleEditMode(post.id)"
            style="margin-left: auto; padding-left: 10px;"
            class="link-unstyled"
            title="Make a change"
          >
            <fa icon="xmark" />
          </a>
          <a
            v-show="post.userId === $store.state.authId && editing !== post.id"
            @click.prevent="toggleEditMode(post.id)"
            style="margin-left: auto; padding-left: 10px;"
            class="link-unstyled"
            title="Make a change"
          >
            <fa icon="pencil-alt" />
          </a>

        </div>

        <div class="post-date text-faded">
          <div v-if="post.edited?.at" class="edition-info">edited</div>
          <AppDate :timeStamp="post.publishedAt"/>
        </div>

      </div>

    </div>
</template>

<script>
import PostEditor from '@/components/PostEditor.vue'
import { mapActions } from 'vuex'
export default {
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
    ...mapActions(['updatePost']),
    handleUpdate(event) {
      this.updatePost(event.post)
      this.editing = null
    },
    userById(userId) {
      return this.$store.getters.user(userId)
    },
    toggleEditMode(id) {
      this.editing = this.editing === id ? null : id
    }
  },
  components: {
    PostEditor
  }
}
</script>
