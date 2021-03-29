import createSpecialities from "./createSpecialities.vue";

export default {
  component: createSpecialities,
  title: "molecules/createSpecialities",
};

// 👇 We create a “template” of how args map to rendering
const Template = (args: any, { argTypes }: any) => ({
  components: { createSpecialities },
  props: Object.keys(argTypes),
  template: '<createSpecialities v-bind="$props" v-on="$props" />',
});

// 👇 Each story then reuses that template
export const Regular = Template.bind({});

// @ts-ignore
Regular.args = {
  name: "test",
  title: "test test",
};
