import popupGuide from "./popupGuide.vue";

export default {
  component: popupGuide,
  title: "molecules/popupGuide",
};

// 👇 We create a “template” of how args map to rendering
const Template = (args: any, { argTypes }: any) => ({
  components: { popupGuide },
  props: Object.keys(argTypes),
  template: '<popupGuide v-bind="$props" v-on="$props" />',
});

// 👇 Each story then reuses that template
export const Regular = Template.bind({});
