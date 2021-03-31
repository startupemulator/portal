import { createChallenge } from "../../test/dummy/createChallenge";
import challengeCard from "./challengeCard.vue";

export default {
  component: challengeCard,
  title: "molecules/challengeCard",
};

// 👇 We create a “template” of how args map to rendering
const Template = (args: any, { argTypes }: any) => ({
  components: { challengeCard },
  props: Object.keys(argTypes),
  template: '<challengeCard v-bind="$props" v-on="$props" />',
});

// 👇 Each story then reuses that template
export const Regular = Template.bind({});

// @ts-ignore
Regular.args = {
  i: 3,
  card: createChallenge(),
};
