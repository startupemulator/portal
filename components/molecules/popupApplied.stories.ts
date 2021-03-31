import popupApplied from "./popupApplied.vue";

export default {
  component: popupApplied,
  title: "molecules/popupApplied",
};

// 👇 We create a “template” of how args map to rendering
const Template = (args: any, { argTypes }: any) => ({
  components: { popupApplied },
  props: Object.keys(argTypes),
  template: '<popupApplied v-bind="$props" v-on="$props" />',
});

// 👇 Each story then reuses that template
export const Regular = Template.bind({});
