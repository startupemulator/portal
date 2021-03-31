import uBack from "./uBack.vue";

export default {
  component: uBack,
  title: "atoms/uBack",
};

// 👇 We create a “template” of how args map to rendering
const Template = (args: any, { argTypes }: any) => ({
  components: { uBack },
  props: Object.keys(argTypes),
  template: '<uBack v-bind="$props" v-on="$props" />',
});

// 👇 Each story then reuses that template
export const Back = Template.bind({});
// @ts-ignore
Back.args = {
  link: "/",
  isButton: true,
  title: "Back",
};
export const BackLink = Template.bind({});
// @ts-ignore
BackLink.args = {
  link: "/",
  isButton: false,
  title: "Back Link",
};
