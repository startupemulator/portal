import inviteColleagues from "./inviteColleagues.vue";

export default {
  component: inviteColleagues,
  title: "molecules/inviteColleagues",
};

// 👇 We create a “template” of how args map to rendering
const Template = (args: any, { argTypes }: any) => ({
  components: { inviteColleagues },
  props: Object.keys(argTypes),
  template: '<inviteColleagues v-bind="$props" v-on="$props" />',
});

// 👇 Each story then reuses that template
export const Regular = Template.bind({});
