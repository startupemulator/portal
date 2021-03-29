import uTags from "./uTags.vue";

export default {
  component: uTags,
  title: "atoms/uTags",
};

// 👇 We create a “template” of how args map to rendering
const Template = (args: any, { argTypes }: any) => ({
  components: { uTags },
  props: Object.keys(argTypes),
  template: '<uTags v-bind="$props" v-on="$props" />',
});

// 👇 Each story then reuses that template
export const Checkbox = Template.bind({});
// @ts-ignore
Checkbox.args = {
  title: "string",
  name: "string",
  id: "string",
  checkedClass: "string",
  type: "checkbox",
};
export const Radio = Template.bind({});
// @ts-ignore
Radio.args = {
  title: "string",
  name: "string",
  id: "string",
  checkedClass: "string",
  type: "radio",
};
