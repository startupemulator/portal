import uInput from "./uInput.vue";

export default {
  component: uInput,
  title: "atoms/uInput",
};

// 👇 We create a “template” of how args map to rendering
const Template = (args: any, { argTypes }: any) => ({
  components: { uInput },
  props: Object.keys(argTypes),
  template: '<uDateInput v-bind="$props" v-on="$props" />',
});

// 👇 Each story then reuses that template
export const Primary = Template.bind({});
// @ts-ignore
Primary.args = {
  type: "text",
  placeholder: "Primary",
  accountClass: "Primary",
  img: "Primary",
  btnShowPassword: true,
  value: "true",
};
