<template>
  <header class="main-header">
    <div class="main-header-content">
      <U-logo></U-logo>

      <nav
        class="main-header__nav"
        :class="!!$strapi.user ? 'logged-in__nav' : ''"
      >
        <ul class="nav-list">
          <li
            class="nav-item"
            :class="{ 'nav-item__active': active === 'startups-list' }"
          >
            <nuxt-link to="startups-list">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#8C97AC"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.105792 0.553005C-0.141197 1.04698 0.059027 1.64766 0.553006 1.89465L2.55301 2.89465C3.04698 3.14164 3.64766 2.94141 3.89465 2.44743C4.14164 1.95345 3.94141 1.35278 3.44743 1.10579L1.44743 0.105792C0.953454 -0.141197 0.352781 0.059027 0.105792 0.553005ZM23.8946 0.553005C24.1416 1.04698 23.9414 1.64766 23.4474 1.89465L21.4474 2.89465C20.9535 3.14164 20.3528 2.94141 20.1058 2.44743C19.8588 1.95345 20.059 1.35278 20.553 1.10579L22.553 0.105792C23.047 -0.141197 23.6477 0.059027 23.8946 0.553005ZM12.0002 2.00022C8.68651 2.00022 6.00022 4.68651 6.00022 8.00022C6.00022 10.3377 7.00295 11.5908 8.23255 13.1274L8.28109 13.188C9.2809 14.4378 10.3784 15.8434 10.8105 18.0002H13.1899C13.6221 15.8434 14.7195 14.4378 15.7194 13.188L15.7679 13.1274C16.9975 11.5908 18.0002 10.3377 18.0002 8.00022C18.0002 4.68651 15.3139 2.00022 12.0002 2.00022ZM15.0002 20.0002V21.0002C15.0002 22.6571 13.6571 24.0002 12.0002 24.0002C10.3434 24.0002 9.00022 22.6571 9.00022 21.0002V20.0002C9.00022 17.3582 7.93978 15.963 6.71935 14.4374L6.61368 14.3055C5.38954 12.7779 4.00022 11.0441 4.00022 8.00022C4.00022 3.58194 7.58194 0.000219048 12.0002 0.000219048C16.4185 0.000219048 20.0002 3.58194 20.0002 8.00022C20.0002 11.0441 18.6109 12.7779 17.3868 14.3055L17.2811 14.4374C16.0607 15.963 15.0002 17.3582 15.0002 20.0002ZM11.0002 20.0002V21.0002C11.0002 21.5525 11.4479 22.0002 12.0002 22.0002C12.5525 22.0002 13.0002 21.5525 13.0002 21.0002V20.0002H11.0002ZM21.4474 13.1058C20.9535 12.8588 20.3528 13.059 20.1058 13.553C19.8588 14.047 20.059 14.6477 20.553 14.8946L22.553 15.8946C23.047 16.1416 23.6477 15.9414 23.8946 15.4474C24.1416 14.9535 23.9414 14.3528 23.4474 14.1058L21.4474 13.1058ZM2.55301 13.1058C3.04698 12.8588 3.64766 13.059 3.89465 13.553C4.14164 14.047 3.94141 14.6477 3.44743 14.8946L1.44743 15.8946C0.953454 16.1416 0.352781 15.9414 0.105792 15.4474C-0.141197 14.9535 0.059027 14.3528 0.553006 14.1058L2.55301 13.1058Z"
                /></svg
              >Startups</nuxt-link
            >
          </li>
          <li
            class="nav-item"
            :class="{ 'nav-item__active': active === 'challenges' }"
          >
            <nuxt-link to="challenges">
              <svg
                width="19"
                height="24"
                viewBox="0 0 19 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 24V15M1 15V1H16.9129C17.3401 1 17.5705 1.50106 17.2925 1.8254L12.2789 7.6746C12.1184 7.86185 12.1184 8.13815 12.2789 8.3254L17.2925 14.1746C17.5705 14.4989 17.3401 15 16.9129 15H1Z"
                  stroke="#8C97AC"
                  stroke-width="2"
                /></svg
              >Challenges</nuxt-link
            >
          </li>
          <!-- logined -->
          <div v-if="!!$strapi.user">
            <li
              class="nav-item"
              :class="{ 'nav-item__active': active === 'my-projects' }"
            >
              <nuxt-link to="myProjects">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 20V4C1 3.44772 1.44772 3 2 3H8L10 8H22C22.5523 8 23 8.44772 23 9V20C23 20.5523 22.5523 21 22 21H2C1.44772 21 1 20.5523 1 20Z"
                    stroke="#8C97AC"
                    stroke-width="2"
                  />
                  <path
                    d="M9 4H20C20.5523 4 21 4.44772 21 5V8"
                    stroke="#8C97AC"
                    stroke-width="2"
                  />
                </svg>

                My Projects</nuxt-link
              >
            </li>
            <li
              class="nav-item"
              :class="{ 'nav-item__active': active === 'profile' }"
            >
              <nuxt-link to="profile">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="11"
                    stroke="#8C97AC"
                    stroke-width="2"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.25195 19C4.43031 15.9719 7.98481 14 11.9999 14C16.0149 14 19.5694 15.9719 21.7478 19C21.3436 19.5618 20.892 20.0873 20.399 20.5706C18.6173 17.82 15.5211 16 11.9999 16C8.47862 16 5.38246 17.82 3.60074 20.5706C3.10767 20.0873 2.65612 19.5618 2.25195 19Z"
                    fill="#8C97AC"
                  />
                  <circle
                    cx="12"
                    cy="10"
                    r="4"
                    stroke="#8C97AC"
                    stroke-width="2"
                  />
                </svg>

                Profile</nuxt-link
              >
            </li>
            <li class="nav-item">
              <nuxt-link to="#">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 10C18 6.68629 15.3137 4 12 4C8.68629 4 6 6.68629 6 10"
                    stroke="#8C97AC"
                    stroke-width="2"
                  />
                  <path
                    d="M9 3.67363C9.62171 3.37829 10.2939 3.1719 11 3.07089V3C11 2.44772 11.4477 2 12 2C12.5523 2 13 2.44772 13 3V3.07089C13.7061 3.1719 14.3783 3.37829 15 3.67363V3C15 1.34315 13.6569 0 12 0C10.3431 0 9 1.34315 9 3V3.67363Z"
                    fill="#8C97AC"
                  />
                  <path
                    d="M6 10V12C6 16 5 19 2 19H12"
                    stroke="#8C97AC"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M18 10V12C18 16 19 19 22 19H12"
                    stroke="#8C97AC"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <circle cx="2" cy="19" r="1" fill="#8C97AC" />
                  <circle cx="22" cy="19" r="1" fill="#8C97AC" />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8 19V20C8 22.2091 9.79086 24 12 24C14.2091 24 16 22.2091 16 20V19H14V20C14 21.1046 13.1046 22 12 22C10.8954 22 10 21.1046 10 20V19H8Z"
                    fill="#8C97AC"
                  />
                </svg>

                Notifications</nuxt-link
              >
            </li>
          </div>
        </ul>
      </nav>

      <div v-if="!$strapi.user" class="main-header-buttons">
        <nuxt-link to="login">
          <U-button
            button-name="Log in"
            :button-class="['u-button-blue', 'create-account__log-in']"
          ></U-button>
        </nuxt-link>

        <nuxt-link to="createAccount">
          <U-button
            :button-name="'Sign Up'"
            :button-class="'u-button-gray'"
          ></U-button>
        </nuxt-link>
      </div>
    </div>
  </header>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import UButton from "../atoms/uButton.vue";
import ULogo from "../atoms/uLogo.vue";

@Component({
  components: { UButton, ULogo },
})
export default class AppHeader extends Vue {
  @Prop() active: string;
}
</script>
<style lang="scss">
.main-header-buttons {
  display: flex;
  justify-content: space-between;
  width: 220px;
  align-items: center;
  a:first-child {
    width: 99px;
  }
  a:last-child {
    width: 113px;
  }
}
@media (min-width: 768px) {
  .main-header-buttons {
    width: 274px;
    a:first-child {
      width: 118px;
    }
    a:last-child {
      width: 132px;
    }
  }
}
</style>
