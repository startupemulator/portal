import popupCreatedStartUp from "./popupCreatedStartUp.vue";

export default {
  component: popupCreatedStartUp,
  title: "molecules/popupCreatedStartUp",
};

// 👇 We create a “template” of how args map to rendering
const Template = (args: any, { argTypes }: any) => ({
  components: { popupCreatedStartUp },
  props: Object.keys(argTypes),
  template: '<popupCreatedStartUp v-bind="$props" v-on="$props" />',
});

// 👇 Each story then reuses that template
export const Regular = Template.bind({});
