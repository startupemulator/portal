import uLogo from "./uLogo.vue";

export default {
  component: uLogo,
  title: "atoms/uLogo",
};

// 👇 We create a “template” of how args map to rendering
const Template = (args: any, { argTypes }: any) => ({
  components: { uLogo },
  props: Object.keys(argTypes),
  template: '<uLogo v-bind="$props" v-on="$props" />',
});

// 👇 Each story then reuses that template
export const Regular = Template.bind({});
