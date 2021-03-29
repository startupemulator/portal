import teamMemberCard from "./teamMemberCard.vue";

export default {
  component: teamMemberCard,
  title: "molecules/teamMemberCard",
};

// 👇 We create a “template” of how args map to rendering
const Template = (args: any, { argTypes }: any) => ({
  components: { teamMemberCard },
  props: Object.keys(argTypes),
  template: '<teamMemberCard v-bind="$props" v-on="$props" />',
});

// 👇 Each story then reuses that template
export const Regular = Template.bind({});
