import feedbackCard from "./feedbackCard.vue";

export default {
  component: feedbackCard,
  title: "molecules/feedbackCard",
};

// 👇 We create a “template” of how args map to rendering
const Template = (args: any, { argTypes }: any) => ({
  components: { feedbackCard },
  props: Object.keys(argTypes),
  template: '<feedbackCard v-bind="$props" v-on="$props" />',
});

// 👇 Each story then reuses that template
export const Regular = Template.bind({});
