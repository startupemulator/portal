import startupInfo from "./startupInfo.vue";

export default {
  component: startupInfo,
  title: "molecules/startupInfo",
};

// 👇 We create a “template” of how args map to rendering
const Template = (args: any, { argTypes }: any) => ({
  components: { startupInfo },
  props: Object.keys(argTypes),
  template: '<startupInfo v-bind="$props" v-on="$props" />',
});

// 👇 Each story then reuses that template
export const Regular = Template.bind({});
