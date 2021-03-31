import uSelect from "./uSelect.vue";

export default {
  component: uSelect,
  title: "atoms/uSelect",
};

// 👇 We create a “template” of how args map to rendering
const Template = (args: any, { argTypes }: any) => ({
  components: { uSelect },
  props: Object.keys(argTypes),
  template: '<uSelect v-bind="$props" v-on="$props" />',
});

// 👇 Each story then reuses that template
export const Regular = Template.bind({});
