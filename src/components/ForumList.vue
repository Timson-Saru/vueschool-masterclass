<template>
  <div v-for="forum in forums" class="forum-listing" :key="forum.id">

    <div class="forum-details">
      <router-link class="forum-name" :to="{ name: 'PageForum', params: { forumId: forum.id } }" >{{forum.name}}</router-link>
      <p class="forum-description ">{{forum.description}}</p>
    </div>

    <div class="threads-count">
      <p class="count text-lead">{{forum.threads?.length || 0}}</p> {{forum.threads?.length === 1 ? 'thread' : 'threads'}}
    </div>

    <div class="last-thread">
      <img class="avatar" src="http://cleaneatsfastfeets.com/wp-content/uploads/2013/05/Mr-Burns.gif" alt="">
      <div class="last-thread-details">
        <a href="#">How I grill my fish</a>
        <p class="text-xsmall">By <a href="profile.html">Charles Montgomery Burns</a>, 2 days ago</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    forums: {
      required: true,
      type: Array
    }
  }
}
</script>
