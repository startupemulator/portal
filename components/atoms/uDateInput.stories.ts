import uDateInput from "./uDateInput.vue";

export default {
  component: uDateInput,
  title: "atoms/uDateInput",
};

// 👇 We create a “template” of how args map to rendering
const Template = (args: any, { argTypes }: any) => ({
  components: { uDateInput },
  props: Object.keys(argTypes),
  template: '<uDateInput v-bind="$props" v-on="$props" />',
});

// 👇 Each story then reuses that template
export const Primary = Template.bind({});
