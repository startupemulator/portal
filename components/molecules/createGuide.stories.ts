import createGuide from "./createGuide.vue";

export default {
  component: createGuide,
  title: "molecules/createGuide",
};

// 👇 We create a “template” of how args map to rendering
const Template = (args: any, { argTypes }: any) => ({
  components: { createGuide },
  props: Object.keys(argTypes),
  template: '<createGuide v-bind="$props" v-on="$props" />',
});

// 👇 Each story then reuses that template
export const Regular = Template.bind({});
