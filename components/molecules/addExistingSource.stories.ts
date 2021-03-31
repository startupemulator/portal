import addExistingSource from "./addExistingSource.vue";

export default {
  component: addExistingSource,
  title: "molecules/addExistingSource",
};

// 👇 We create a “template” of how args map to rendering
const Template = (args: any, { argTypes }: any) => ({
  components: { addExistingSource },
  props: Object.keys(argTypes),
  template: '<addExistingSource v-bind="$props" v-on="$props" />',
});

// 👇 Each story then reuses that template
export const Regular = Template.bind({});
