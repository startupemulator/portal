<template>
  <div id="content">
    <h2>Pages List</h2>
    <h1 v-if="$strapi.user">Current user: {{ $strapi.user.username }}</h1>
    <hr />
    <ul>
      <li><a href="/landing">Landing</a></li>
      <li><a href="/logIn">Log In</a></li>
      <li><a href="/applyToTeam">Apply to Team</a></li>
      <li><a href="/createAccount">Create Account</a></li>
      <li><a href="/createProject">Create Project</a></li>
      <li><a href="/logined">Logined</a></li>
      <li><a href="/unlogined">Unlogined</a></li>
      <hr />
      <li><a href="/BecomeAnExpert">BecomeAnExpert</a></li>
    </ul>
    <UButton
      v-if="$strapi.user"
      button-class="u-button-gray"
      button-name="Log Out"
      @clickOnButton="$strapi.logout()"
    ></UButton>
  </div>
</template>

<script>
export default {};
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
