import addInput from "./addInput.vue";

export default {
  component: addInput,
  title: "atoms/addInput",
};

// 👇 We create a “template” of how args map to rendering
const Template = (args: any, { argTypes }: any) => ({
  components: { addInput },
  props: Object.keys(argTypes),
  template: '<addInput v-bind="$props" v-on="$props" />',
});

// 👇 Each story then reuses that template
export const Regular = Template.bind({});
// @ts-ignore
Regular.args = {
  placeholder: "test text",
};
