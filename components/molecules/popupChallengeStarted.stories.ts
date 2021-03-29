import popupChallengeStarted from "./popupChallengeStarted.vue";

export default {
  component: popupChallengeStarted,
  title: "molecules/popupChallengeStarted",
};

// 👇 We create a “template” of how args map to rendering
const Template = (args: any, { argTypes }: any) => ({
  components: { popupChallengeStarted },
  props: Object.keys(argTypes),
  template: '<popupChallengeStarted v-bind="$props" v-on="$props" />',
});

// 👇 Each story then reuses that template
export const Regular = Template.bind({});
