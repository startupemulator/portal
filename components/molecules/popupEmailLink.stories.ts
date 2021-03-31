import popupEmailLink from "./popupEmailLink.vue";

export default {
  component: popupEmailLink,
  title: "molecules/popupEmailLink",
};

// 👇 We create a “template” of how args map to rendering
const Template = (args: any, { argTypes }: any) => ({
  components: { popupEmailLink },
  props: Object.keys(argTypes),
  template: '<popupEmailLink v-bind="$props" v-on="$props" />',
});

// 👇 Each story then reuses that template
export const Regular = Template.bind({});
