import { createChallenge } from "../../test/dummy/createChallenge";
import draftCard from "./draftCard.vue";

export default {
  component: draftCard,
  title: "molecules/draftCard",
};

// 👇 We create a “template” of how args map to rendering
const Template = (args: any, { argTypes }: any) => ({
  components: { draftCard },
  props: Object.keys(argTypes),
  template: '<draftCard v-bind="$props" v-on="$props" />',
});

// 👇 Each story then reuses that template
export const Regular = Template.bind({});

// @ts-ignore
Regular.args = {
  i: 3,
  card: createChallenge(),
};
