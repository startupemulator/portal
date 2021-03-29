import durationExperiencePicker from "./durationExperiencePicker.vue";

export default {
  component: durationExperiencePicker,
  title: "molecules/durationExperiencePicker",
};

// 👇 We create a “template” of how args map to rendering
const Template = (args: any, { argTypes }: any) => ({
  components: { durationExperiencePicker },
  props: Object.keys(argTypes),
  template: '<durationExperiencePicker v-bind="$props" v-on="$props" />',
});

// 👇 Each story then reuses that template
export const Regular = Template.bind({});

// @ts-ignore
Regular.args = {
  title: "test test",
};
