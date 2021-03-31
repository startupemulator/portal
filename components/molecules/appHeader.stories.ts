import appHeader from "./appHeader.vue";

export default {
  component: appHeader,
  title: "molecules/appHeader",
};

// 👇 We create a “template” of how args map to rendering
const Template = (args: any, { argTypes }: any) => ({
  components: { appHeader },
  props: Object.keys(argTypes),
  template: '<appHeader v-bind="$props" v-on="$props" />',
});

// 👇 Each story then reuses that template
export const Regular = Template.bind({});

// @ts-ignore
Regular.args = {
  active: true,
};
