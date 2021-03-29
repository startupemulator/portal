import uTabsLong from "./uTabsLong.vue";

export default {
  component: uTabsLong,
  title: "atoms/uTabsLong",
};

// 👇 We create a “template” of how args map to rendering
const Template = (args: any, { argTypes }: any) => ({
  components: { uTabsLong },
  props: Object.keys(argTypes),
  template: '<uTabsLong v-bind="$props" v-on="$props" />',
});

// 👇 Each story then reuses that template
export const Primary = Template.bind({});
// @ts-ignore
Primary.args = {
  owned: true,
};
