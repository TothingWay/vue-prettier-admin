<script>
import { h } from 'vue'
import { useRouter, useRoute } from 'vue-router'
export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const { params, query } = route
    const { path } = params
    router.replace({ path: '/' + path, query })

    return () => h('div') // avoid warning message
  }
}
</script>
