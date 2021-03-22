<template>
  <div>
    <app-header></app-header>
    <h2>Pages List</h2>
    <h1 v-if="$strapi.user">
      Current user:
      {{ $strapi.user.name ? $strapi.user.name : $strapi.user.username }}
    </h1>
    <hr />
    <ul>
      <li><nuxt-link to="/landing">Landing</nuxt-link></li>
      <li><nuxt-link to="/logIn">Log In</nuxt-link></li>
      <li><nuxt-link to="/applyToTeam">Apply to Team</nuxt-link></li>
      <li><nuxt-link to="/createAccount">Create Account</nuxt-link></li>
      <li><nuxt-link to="/createStartup">Create Startup</nuxt-link></li>
      <hr />
      <li><nuxt-link to="/becomeAnExpert">BecomeAnExpert</nuxt-link></li>
      <li><nuxt-link to="/participate">Participate</nuxt-link></li>
      <hr />

      <li><nuxt-link to="/startups">Startups</nuxt-link></li>
      <li><nuxt-link to="/challenges">Challenges</nuxt-link></li>
      <li><nuxt-link to="/myProjects">My Projects</nuxt-link></li>

      <li>
        <nuxt-link to="/startups">Startups</nuxt-link>
        (TODO: startups with cards
        <nuxt-link to="/startups-list">List</nuxt-link>)
      </li>
      <li><nuxt-link to="/profile">Profile</nuxt-link></li>
      <li><nuxt-link to="/myProfile">myProfile</nuxt-link></li>
      <nuxt-link to="/startup">Startup</nuxt-link>
    </ul>
    <UButton
      v-if="$strapi.user"
      button-class="u-button-gray"
      button-name="Log Out"
      @clickOnButton="$strapi.logout()"
    ></UButton>
    <!-- test@test.com T3stT3st -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import UButton from "~/components/atoms/uButton.vue";

@Component({
  components: {
    UButton,
  },
})
export default class extends Vue {
  head() {
    return {
      title: "Home page",
    };
  }
}
</script>

<style lang="scss">
h1 {
  color: white;
}
li {
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
