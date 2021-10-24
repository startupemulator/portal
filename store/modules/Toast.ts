import {
  Module,
  VuexAction,
  VuexModule,
  VuexMutation,
} from "nuxt-property-decorator";
import { getModule } from "vuex-module-decorators";
import { Store } from "vuex";
import { store } from "../index";

let lastId = 0;

interface Message {
  id: number;
  data: string;
  type: "error" | "info" | "warn";
  duration: number;
  timer?: number;
  success: boolean;
}

export interface ToastState {
  messages: Message[];
}

@Module({ dynamic: true, store, name: "Toast", namespaced: true })
class Toast extends VuexModule implements ToastState {
  store: Store<ToastState>;

  messages: Array<Message> = [];

  @VuexMutation
  addMessage(newMessage: Message) {
    this.messages.push(newMessage);
  }

  @VuexMutation
  removeMessage(id: number) {
    if (id) {
      this.messages = this.messages.filter((i) => i.id !== id);
    } else {
      this.messages = [];
    }
  }

  @VuexMutation
  timer(id: number) {
    const message = this.messages.find((i) => i.id === id);
    if (message && message.timer && message.timer > 0) {
      message.timer = message.timer - 1;
    }
  }

  @VuexAction({ commit: "timer" })
  decrementTimer(id: number) {
    return id;
  }

  @VuexAction({ commit: "removeMessage" })
  hide(id?: number) {
    return id;
  }

  @VuexAction({ commit: "addMessage" })
  show(toast: Partial<Message>): Message {
    ++lastId;
    if (toast.duration) {
      const counter = setInterval(() => {
        this.store.dispatch("Toast/decrementTimer", lastId);
      }, 1000);
      setTimeout(() => {
        clearInterval(counter);
        this.store.dispatch("Toast/hide", lastId);
      }, toast.duration);
    }
    return {
      id: lastId,
      data: toast.data || "",
      duration: toast.duration || 0,
      type: toast.type || "error",
      timer: Math.ceil((toast.duration as number) / 1000),
      success: toast.success || false,
    };
  }
}

export default getModule(Toast);
