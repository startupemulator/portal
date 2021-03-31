import uInputAdd from "./addInput.vue";

export default {
  component: uInputAdd,
  title: "atoms/uInputAdd",
};

// 👇 We create a “template” of how args map to rendering
const Template = (args: any, { argTypes }: any) => ({
  components: { uInputAdd },
  props: Object.keys(argTypes),
  template: '<uInputAdd v-bind="$props" v-on="$props" />',
});

// 👇 Each story then reuses that template
export const Regular = Template.bind({});
// @ts-ignore
Regular.args = {
  placeholder: "test text",
};
