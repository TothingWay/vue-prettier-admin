<template>
  <div class="errPage-container">
    <ErrorA />
    <ErrorB />
    <h3>Please click the bug icon in the upper right corner</h3>
    <aside>
      Now the management system are basically the form of the spa, it enhances
      the user experience, but it also increases the possibility of page
      problems, a small negligence may lead to the entire page deadlock.
      Fortunately Vue provides a way to catch handling exceptions, where you can
      handle errors or report exceptions.
      <a target="_blank" class="link-type" href="#">
        Document introduction
      </a>
    </aside>
  </div>
</template>

<script>
import ErrorA from './components/ErrorTestA.vue'
import ErrorB from './components/ErrorTestB.vue'

export default {
  name: 'ErrorLog',
  components: { ErrorA, ErrorB }
}
</script>
