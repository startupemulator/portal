import systemAlert from "./systemAlert.vue";

export default {
  component: systemAlert,
  title: "molecules/systemAlert",
};

// 👇 We create a “template” of how args map to rendering
const Template = (args: any, { argTypes }: any) => ({
  components: { systemAlert },
  props: Object.keys(argTypes),
  template: '<systemAlert v-bind="$props" v-on="$props" />',
});

// 👇 Each story then reuses that template
export const Regular = Template.bind({});

// @ts-ignore
Regular.args = {
  msg: "Ololo.",
  timer: 10,
};
