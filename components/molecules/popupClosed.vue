<template>
  <div class="close-popup popup">
    <div class="close-popup__content">
      <h2>Startup Emulator is closed</h2>
      <div class="popup__content-linkedin">
        <img width="24" src="~/assets/img/github.svg" alt="github" />
        <a href="https://github.com/startupemulator" target="_blank"
          >Get in touch in GitHub</a
        >
      </div>
      <div class="popup__content-honor">
        <!--<img-->
        <!--  src="~/assets/img/Award.svg"-->
        <!--  alt="honor"-->
        <!--  width="24px"-->
        <!--  height="24px"-->
        <!--/>-->
        <div class="popup__content_honor-description">
          <span>
            Dear Startup Emulator Community,

            <p>
              As we close the chapter on our journey with Startup Emulator, I
              want to extend my deepest gratitude to everyone who has been part
              of this incredible project.
            </p>

            <p>
              <b>To the Developers:</b> Thank you for your hard work,
              creativity, and dedication in building this application. Your
              efforts have brought our vision to life and created a platform
              that has impacted many.
            </p>

            <p>
              <b>To the Project Creators:</b> Your innovative ideas and projects
              have been the heart and soul of Startup Emulator. Thank you for
              sharing your passion and making this a vibrant space for learning
              and growth.
            </p>

            <p>
              <b>To the Mentors:</b> Your guidance, support, and wisdom have
              been invaluable. Thank you for generously sharing your knowledge
              and helping others navigate their journeys.
            </p>

            <p>
              <b>To the Mentees:</b> Your enthusiasm and eagerness to learn have
              been inspiring. Thank you for being part of this community and for
              your commitment to personal and professional growth.
            </p>

            <p>
              As we say goodbye, let's remember the connections we've made, the
              lessons we've learned, and the experiences we've shared. Thank you
              for being part of Startup Emulator.
            </p>

            <p>Wishing you all the best in your future endeavors.</p>

            <p>Warm regards,</p>
            <p>
              <a href="mailto:andrey@startupemulator.com">Andrey Kucherenko</a>
            </p>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" scoped>
import { Component, Vue } from "nuxt-property-decorator";

@Component({})
export default class extends Vue {}
</script>
<style lang="scss">
.close-popup {
  .close-popup__content {
    width: 343px;
    margin: 0 auto;
    padding: 16px 16px 32px;
    background: #232b39;
    border-radius: 12px;
    box-sizing: border-box;
    position: relative;
  }

  .popup__content-link__close {
    position: absolute;
    background-color: transparent;
    right: 10px;
    top: 16px;
  }

  h2 {
    font-style: normal;
    font-weight: bold;
    font-size: 26px;
    line-height: 32px;
    text-align: center;
    margin-top: 24px;
    margin-bottom: 0;
  }

  .popup__content-linkedin {
    display: flex;
    justify-content: center;

    a {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 32px;
      color: #8c97ac;
      margin-top: 4px;
      margin-left: 8px;
    }
  }

  .popup__content-honor {
    display: flex;
    width: 295px;
    margin: 24px auto;
    color: #dbe4f3;
    padding-left: 25px;

    img {
      margin: 24px 20px 0 24px;
    }

    .popup__content_honor-description {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      color: #dbe4f3;
      margin: 24px 24px 24px 0;
    }

    a {
      word-break: break-all;
      color: #dbe4f3 !important;
      text-decoration: underline;
    }
  }
}
@media (min-width: 768px) {
  .close-popup {
    .close-popup__content {
      width: 564px;
      top: 55px;
    }

    .popup__content-honor {
      width: 468px;

      img {
        margin: 24px 20px 0 24px;
      }

      .popup__content_honor-description {
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
}
</style>
