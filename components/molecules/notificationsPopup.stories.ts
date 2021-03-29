import notificationsPopup from "./notificationsPopup.vue";

export default {
  component: notificationsPopup,
  title: "molecules/notificationsPopup",
};

// 👇 We create a “template” of how args map to rendering
const Template = (args: any, { argTypes }: any) => ({
  components: { notificationsPopup },
  props: Object.keys(argTypes),
  template: '<notificationsPopup v-bind="$props" v-on="$props" />',
});

// 👇 Each story then reuses that template
export const Regular = Template.bind({});
