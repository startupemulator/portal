<template>
  <div class="input-add">
    <ul class="input-add__content">
      <li v-for="(item, i) in addData" :key="item.id" class="input-add__item">
        <span> {{ item.name }} </span>
        <button class="input-add__remove" @click="removeItem(i)">
          <img src="~/assets/img/close.svg" alt="close" />
        </button>
      </li>
      <input
        v-model="inputedtext"
        class="input-add__input"
        type="text"
        :placeholder="placeholder"
        @keydown="addInputedtext($event)"
      />
      <span class="input-add__item-title">days</span>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      addData: [],
      inputedtext: "",
    };
  },
  methods: {
    addInputedtext(e) {
      const srt = this.inputedtext.trim();
      if ((srt.length > 1) & (e.keyCode === 13)) {
        this.addData.push({ id: this.addData.length, name: srt });
        this.inputedtext = "";
      }
    },
    removeItem(id) {
      this.addData.forEach((el, i) => {
        if (+i === +id) {
          this.addData.splice(i, 1);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.input-add {
  position: relative;
  width: 100%;
  min-height: 32px;
  background: #2e384a;
  border-radius: 12px;

  .input-add__content {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 8px 16px;
    margin: 0;
  }

  .input-add__item {
    border: 1px solid #59667e;
    box-sizing: border-box;
    border-radius: 32px;
    padding: 4px 5px 4px 16px;
    font-weight: 300;
    font-size: 14px;
    line-height: 32px;
    color: #fff;
    display: flex;
    margin-right: 8px;
    margin-bottom: 8px;
    justify-content: space-between;

    button {
      border: none;
      background-color: transparent;

      img {
        width: 12px;
        height: 12px;
      }
    }
  }

  .input-add__item-title {
    margin-left: auto;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    text-align: right;
    color: #dbe4f3;
  }

  .input-add__input {
    background-color: transparent;
    border: none;
    width: 80%;
    color: #b5c1d8;
    font-weight: 300;
    font-size: 16px;
    line-height: 32px;

    &::placeholder {
      color: #b5c1d8;
      font-weight: 300;
      font-size: 16px;
      line-height: 32px;
    }
  }
}
@media (min-width: 768px) {
  .input-add {
    .input-add__content {
      padding: 12px 24px;
    }

    .input-add__item-title {
      margin-left: auto;
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
      text-align: right;
      color: #dbe4f3;
    }

    .input-add__input {
      font-size: 18px;
      line-height: 32px;
      width: 60%;

      &::placeholder {
        font-size: 18px;
        line-height: 32px;
      }
    }
  }
}
</style>
