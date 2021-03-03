import Vue from "vue";

Vue.filter("formatDate", (value: string) => {
  const date = new Date(value);
  return date.toLocaleString(["en-US"], {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
});

Vue.filter("formatDateWithTime", (value: string) => {
  const date = new Date(value);
  return date.toLocaleString(["en-US"], {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
});

Vue.filter("truncate", (content: string, length: number, clamp: string) => {
  clamp = clamp || "...";
  return content.length > length ? content.slice(0, length) + clamp : content;
});

Vue.filter("capitalize", (value: string) => {
  return value.toString().charAt(0).toUpperCase() + value.slice(1);
});
