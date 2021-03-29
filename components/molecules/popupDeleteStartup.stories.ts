import popupDeleteStartup from "./popupDeleteStartup.vue";

export default {
  component: popupDeleteStartup,
  title: "molecules/popupDeleteStartup",
};

// 👇 We create a “template” of how args map to rendering
const Template = (args: any, { argTypes }: any) => ({
  components: { popupDeleteStartup },
  props: Object.keys(argTypes),
  template: '<popupDeleteStartup v-bind="$props" v-on="$props" />',
});

// 👇 Each story then reuses that template
export const Regular = Template.bind({});
