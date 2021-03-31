import appFooter from "./appFooter.vue";

export default {
  component: appFooter,
  title: "molecules/appFooter",
};

// 👇 We create a “template” of how args map to rendering
const Template = (args: any, { argTypes }: any) => ({
  components: { appFooter },
  props: Object.keys(argTypes),
  template: '<appFooter v-bind="$props" v-on="$props" />',
});

// 👇 Each story then reuses that template
export const Regular = Template.bind({});
