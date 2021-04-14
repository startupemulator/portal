import uButton from "./uButton.vue";

export default {
  component: uButton,
  title: "atoms/Button",
};

// 👇 We create a “template” of how args map to rendering
const Template = (args: any, { argTypes }: any) => ({
  components: { uButton },
  props: Object.keys(argTypes),
  template: '<uButton v-bind="$props" v-on="$props" />',
});

// 👇 Each story then reuses that template
export const Primary = Template.bind({});
// @ts-ignore
Primary.args = {
  buttonClass: ["u-button-blue"],
  buttonName: "Primary",
  isLink: "button",
  href: "'/'",
};
