import uTabs from "./uTabs.vue";

export default {
  component: uTabs,
  title: "atoms/uTabs",
};

// 👇 We create a “template” of how args map to rendering
const Template = (args: any, { argTypes }: any) => ({
  components: { uTabs },
  props: Object.keys(argTypes),
  template: '<uTabs v-bind="$props" v-on="$props" />',
});

// 👇 Each story then reuses that template
export const Primary = Template.bind({});
// @ts-ignore
Primary.args = {
  longTabs: true,
};
