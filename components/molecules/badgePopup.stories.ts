import badgePopup from "./badgePopup.vue";

export default {
  component: badgePopup,
  title: "molecules/badgePopup",
};

// 👇 We create a “template” of how args map to rendering
const Template = (args: any, { argTypes }: any) => ({
  components: { badgePopup },
  props: Object.keys(argTypes),
  template: '<badgePopup v-bind="$props" v-on="$props" />',
});

// 👇 Each story then reuses that template
export const Regular = Template.bind({});
