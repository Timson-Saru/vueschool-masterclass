import { library } from '@fortawesome/fontawesome-svg-core'
import { faPencilAlt, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPencilAlt, faXmark)

export default (app) => {
  app.component('fa', FontAwesomeIcon)
}
