<template>
  <div>
    <app-header></app-header>
    <h2>Pages List</h2>
    <h1 v-if="$strapi.user">Current user: {{ $strapi.user.username }}</h1>
    <hr />
    <ul>
      <li><nuxt-link to="/landing">Landing</nuxt-link></li>
      <li><nuxt-link to="/logIn">Log In</nuxt-link></li>
      <li><nuxt-link to="/applyToTeam">Apply to Team</nuxt-link></li>
      <li><nuxt-link to="/createAccount">Create Account</nuxt-link></li>
      <li><nuxt-link to="/createProject">Create Project</nuxt-link></li>
      <li><nuxt-link to="/logined">Logined</nuxt-link></li>
      <li><nuxt-link to="/unlogined">Unlogined</nuxt-link></li>
      <hr />
      <li><nuxt-link to="/becomeAnExpert">BecomeAnExpert</nuxt-link></li>
      <li><nuxt-link to="/participate">Participate</nuxt-link></li>
      <hr />
      <li><nuxt-link to="/startups">Startups</nuxt-link></li>
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
