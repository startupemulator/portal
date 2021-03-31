import sources from "./sources.vue";

export default {
  component: sources,
  title: "molecules/sources",
};

// 👇 We create a “template” of how args map to rendering
const Template = (args: any, { argTypes }: any) => ({
  components: { sources },
  props: Object.keys(argTypes),
  template: '<sources v-bind="$props" v-on="$props" />',
});

// 👇 Each story then reuses that template
export const Regular = Template.bind({});
