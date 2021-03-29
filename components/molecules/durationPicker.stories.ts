import durationPicker from "./durationPicker.vue";

export default {
  component: durationPicker,
  title: "molecules/durationPicker",
};

// 👇 We create a “template” of how args map to rendering
const Template = (args: any, { argTypes }: any) => ({
  components: { durationPicker },
  props: Object.keys(argTypes),
  template: '<durationPicker v-bind="$props" v-on="$props" />',
});

// 👇 Each story then reuses that template
export const Regular = Template.bind({});

// @ts-ignore
Regular.args = {
  title: "test test",
};
