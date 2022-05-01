<template>
  <span :title="publishedAt">
    {{ humanRidableDate }}
  </span>
</template>

<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedDate from 'dayjs/plugin/localizedFormat'
dayjs.extend(relativeTime)
dayjs.extend(localizedDate)
export default {
  props: {
    timeStamp: {
      required: true,
      type: [Number, Object]
    }
  },
  computed: {
    normolizedTimestamp() {
      return this.timeStamp?.seconds || this.timeStamp
    },
    humanRidableDate() {
      return dayjs.unix(this.normolizedTimestamp).fromNow()
    },
    publishedAt() {
      return dayjs.unix(this.normolizedTimestamp).format('llll')
    }
  }
}
</script>
