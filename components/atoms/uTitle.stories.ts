import uTitle from "./uTitle.vue";

export default {
  component: uTitle,
  title: "atoms/uTitle",
};

// 👇 We create a “template” of how args map to rendering
const Template = (args: any, { argTypes }: any) => ({
  components: { uTitle },
  props: Object.keys(argTypes),
  template: '<uTitle v-bind="$props" v-on="$props" />',
});

// 👇 Each story then reuses that template
export const Regular = Template.bind({});

// @ts-ignore
Regular.args = {
  text: "ololo",
};
