<template>
  <div>
    <toast />
    <div style="display: flex; justify-content: space-between">
      <div style="width: 49%">
        <h2>Pages List</h2>
        <h1 v-if="$strapi.user">
          Current user:
          {{ $strapi.user.name ? $strapi.user.name : $strapi.user.username }}
        </h1>
        <hr />

        <ul>
          <li><nuxt-link to="/landing">Landing</nuxt-link></li>
          <li style="text-decoration: line-through">
            <nuxt-link to="/logIn">Log In</nuxt-link>
          </li>
          <li style="text-decoration: line-through">
            <nuxt-link to="/applyToTeam">Apply to Team </nuxt-link> => available
            in
            <nuxt-link to="/startups">
              <span style="color: #fff; border-bottom: 1px solid #fff"
                >Startups</span
              >
            </nuxt-link>
            button Apply
          </li>
          <li style="text-decoration: line-through">
            <nuxt-link to="/createAccount">Create Account</nuxt-link>
          </li>
          <li style="text-decoration: line-through">
            <nuxt-link to="/createStartup">Create Startup</nuxt-link>
          </li>
          <hr />
          <li style="text-decoration: line-through">
            <nuxt-link to="/becomeAnExpert">BecomeAnExpert</nuxt-link>
          </li>
          <li style="text-decoration: line-through">
            <nuxt-link to="/participate">Participate</nuxt-link> => available in
            <nuxt-link to="/challenges">
              <span style="color: #fff; border-bottom: 1px solid #fff"
                >Challenge</span
              >
            </nuxt-link>
            button Accept
          </li>
          <hr />

          <li style="text-decoration: line-through">
            <nuxt-link to="/startups">Startups</nuxt-link>
          </li>
          <li style="text-decoration: line-through">
            <nuxt-link to="/challenges">Challenges</nuxt-link>
          </li>
          <li style="text-decoration: line-through">
            <nuxt-link to="/myProjects">My Projects</nuxt-link>
          </li>
          <li><nuxt-link to="/profile">Profile</nuxt-link></li>
          <li style="text-decoration: line-through">
            <nuxt-link to="/myProfile">myProfile</nuxt-link>
          </li>
          <li><nuxt-link to="/startup">Startup</nuxt-link></li>
          <li><nuxt-link to="/challenge">Challenge</nuxt-link></li>
          <li>
            <nuxt-link to="/myProjectsCreateChallenges"
              >myProjectsCreateChallenges</nuxt-link
            >
          </li>
        </ul>
      </div>
      <div style="width: 49%">
        <h2 style="display: inline-block">Finished</h2>
        <span style="color: #fff">/ or add some task to do state finished</span>

        <hr style="margin-top: 0" />
        <ul>
          <li><nuxt-link to="/logIn">Log In</nuxt-link></li>
          <li><nuxt-link to="/createAccount">Create Account</nuxt-link></li>
          <li><nuxt-link to="/createStartup">Create Startup</nuxt-link></li>

          <li>
            <nuxt-link to="/applyToTeam">Apply to Team </nuxt-link> => available
            in
            <nuxt-link to="/startups">
              <span style="color: #fff; border-bottom: 1px solid #fff"
                >Startups</span
              >
            </nuxt-link>
            button Apply
          </li>
          <li>
            <nuxt-link to="/participate">Participate</nuxt-link> => available in
            <nuxt-link to="/challenges">
              <span style="color: #fff; border-bottom: 1px solid #fff"
                >Challenge</span
              >
            </nuxt-link>
            button Accept
          </li>
          <li>
            <nuxt-link to="/becomeAnExpert">BecomeAnExpert</nuxt-link>
          </li>
          <li><nuxt-link to="/challenges">Challenges</nuxt-link></li>
          <li><nuxt-link to="/myProjects">My Projects</nuxt-link></li>
          <li><nuxt-link to="/startups">Startups</nuxt-link></li>
          <li><nuxt-link to="/myProfile">myProfile</nuxt-link></li>
        </ul>
      </div>
    </div>
    <UButton
      v-if="$strapi.user"
      button-class="u-button-gray"
      button-name="Log Out"
      @clickOnButton="$strapi.logout()"
    ></UButton>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import UButton from "~/components/atoms/uButton.vue";
import toast from "~/components/molecules/toast.vue";

@Component({
  components: {
    UButton,
    toast,
  },
})
export default class extends Vue {
  head() {
    return {
      title: "Home page",
    };
  }

  // async mounted() {
  //   const startups = await this.$startups();
  //   console.log(startups);
  // }
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
