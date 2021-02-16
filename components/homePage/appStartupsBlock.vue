<template>
  <div class="startup-block">
    <div class="startup-block-content">
      <div class="startup-block-content__head">
        <h2>Startups</h2>
        <button type="button" class="tartup-block-buttton">
          <span>See All Startups</span>
           <img src="@/assets/img/arrow.svg" alt="" />
        </button>
      </div>
      <div class="startup-block-content__desctop-buttons">
        <h3>
          Find a startup that is going to work with technologies you need to get
          experience with. Then join a team and improve your skills with a
          feedback from our experts.
        </h3>
        <div class="desctop-buttons__slider">
          <button type="button" class="slider-buttton" @click="clickLeft">
            <img src="@/assets/img/arrow.svg" alt="arrow" />
          </button>
          <button type="button" class="slider-buttton" @click="clickRight">
            <img src="@/assets/img/arrow.svg" alt="arrow" />
          </button>
        </div>
      </div>
    </div>
    <div class="startup-block__startup-cards">
      <div class="startup-block__startup-card">
        <div class="startup-card">
          <div class="startup-card__started">
            <div class="startup-card__started-title">Not started</div>
          </div>
          <div class="startup-card-content">
            <h2 class="startup-card__started-name">Startup #1</h2>
            <h3 class="startup-card__started-text">
              There is a description of this projects...
            </h3>
            <div class="startup-card__started-technologys">
              <ul class="startup-card__started-technologys-items">
                <li class="startup-card__started-technology">Javascript</li>
                <li class="startup-card__started-technology">Java</li>
                <li class="startup-card__started-technology">HTML5</li>
                <li class="startup-card__started-technology">Javascript</li>
              </ul>
            </div>
            <div class="startup-card__started-start-time">
              <div class="started-start-time__start">
                <h3>Start</h3>
                <p>27 Sep 2020</p>
              </div>
              <div class="started-start-time__duration">
                <h3>Duration</h3>
                <p>3 months</p>
              </div>
            </div>
            <div class="startup-block__buttons">
              <button type="button" class="tartup-block__button-details">
                Details
              </button>
              <button type="button" class="tartup-block__button-apply">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="startup-block__startup-card">
        <div class="startup-card">
          <div class="startup-card__started">
            <div class="startup-card__started-title">Not started</div>
          </div>
          <div class="startup-card-content">
            <h2 class="startup-card__started-name">
              Possible name in two lines and a long na...
            </h2>
            <h3 class="startup-card__started-text">
              There is a description of this projects, where a product owner
              should describe his ide...
            </h3>
            <div class="startup-card__started-technologys">
              <ul class="startup-card__started-technologys-items">
                <li class="startup-card__started-technology">Javascript</li>
                <li class="startup-card__started-technology">Java</li>
                <li class="startup-card__started-technology">HTML5</li>
              </ul>
            </div>
            <div class="startup-card__started-start-time">
              <div class="started-start-time__start">
                <h3>Start</h3>
                <p>27 Sep 2020</p>
              </div>
              <div class="started-start-time__duration">
                <h3>Duration</h3>
                <p>3 months</p>
              </div>
            </div>
            <div class="startup-block__buttons">
              <button type="button" class="tartup-block__button-details">
                Details
              </button>
              <button type="button" class="tartup-block__button-apply">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="startup-block__startup-card">
        <div class="startup-card">
          <div class="startup-card__started">
            <div class="startup-card__started-title">Not started</div>
          </div>
          <div class="startup-card-content">
            <h2 class="startup-card__started-name">
              Possible name in two lines and a long na...
            </h2>
            <h3 class="startup-card__started-text">
              There is a description of this projects, where a product owner
              should describe his ide...
            </h3>
            <div class="startup-card__started-technologys">
              <ul class="startup-card__started-technologys-items">
                <li class="startup-card__started-technology">Javascript</li>
                <li class="startup-card__started-technology">Java</li>
                <li class="startup-card__started-technology">HTML5</li>

                <li class="startup-card__started-technology">Javascript</li>
                <li class="startup-card__started-technology">CSS3</li>
                <li class="startup-card__started-technology">+3</li>
              </ul>
            </div>
            <div class="startup-card__started-start-time">
              <div class="started-start-time__start">
                <h3>Start</h3>
                <p>27 Sep 2020</p>
              </div>
              <div class="started-start-time__duration">
                <h3>Duration</h3>
                <p>3 months</p>
              </div>
            </div>
            <div class="startup-block__buttons">
              <button type="button" class="tartup-block__button-details">
                Details
              </button>
              <button type="button" class="tartup-block__button-apply">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="startup-block__startup-card">
        <div class="startup-card">
          <div class="startup-card__started">
            <div class="startup-card__started-title">Not started</div>
          </div>
          <div class="startup-card-content">
            <h2 class="startup-card__started-name">
              Possible name in two lines and a long na...
            </h2>
            <h3 class="startup-card__started-text">
              There is a description ...
            </h3>
            <div class="startup-card__started-technologys">
              <ul class="startup-card__started-technologys-items">
                <li class="startup-card__started-technology">Javascript</li>
                <li class="startup-card__started-technology">Java</li>
                <li class="startup-card__started-technology">HTML5</li>

                <li class="startup-card__started-technology">Javascript</li>
                <li class="startup-card__started-technology">CSS3</li>
                <li class="startup-card__started-technology">+3</li>
              </ul>
            </div>
            <div class="startup-card__started-start-time">
              <div class="started-start-time__start">
                <h3>Start</h3>
                <p>27 Sep 2020</p>
              </div>
              <div class="started-start-time__duration">
                <h3>Duration</h3>
                <p>3 months</p>
              </div>
            </div>
            <div class="startup-block__buttons">
              <button type="button" class="tartup-block__button-details">
                Details
              </button>
              <button type="button" class="tartup-block__button-apply">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    clickRight() {
      console.log('clickRight')
    },
    clickLeft() {
      console.log('clickLeft')
    }
  }
};
</script>