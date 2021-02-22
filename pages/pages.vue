<template>
  <div id="content">
    <h1>Pages List</h1>
    <ul>
      <li><a href="/">Landing</a></li>
    </ul>
    <a href="https://cms.startupemulator.com/auth/oauth/github?redirect=http://localhost:3000/pages" class="button">Log
      in with github</a>
  </div>
</template>


<script>

export default {
}
</script>

<style lang="scss">
h1 {
  color: white;
}

#content {
  width: 400px;
  margin: 40px auto;

  a {
    color: #3cc28d;
  }

  a.button {
    color: #3cc28d;
    border: 1px solid #3cc28d;
    border-radius: 5px;
    padding: 10px;
  }
}
</style>
