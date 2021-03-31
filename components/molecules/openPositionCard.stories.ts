import { createStartup } from "../../test/dummy/createStartup";
import openPositionCard from "./openPositionCard.vue";

export default {
  component: openPositionCard,
  title: "molecules/openPositionCard",
};

// 👇 We create a “template” of how args map to rendering
const Template = (args: any, { argTypes }: any) => ({
  components: { openPositionCard },
  props: Object.keys(argTypes),
  template: '<openPositionCard v-bind="$props" v-on="$props" />',
});

// 👇 Each story then reuses that template
export const Regular = Template.bind({});

// @ts-ignore
Regular.args = {
  startup: createStartup(),
};
