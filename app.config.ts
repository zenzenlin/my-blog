export default defineAppConfig({
  shadcnDocs: {
    site: {
      name: "Mike's blog",
      description:
        "前端開發，專注於 Vue.js，期望透過簡易的話語紀錄及描述知識。",
    },
    theme: {
      customizable: true,
      color: "zinc",
      radius: 0.5,
    },
    header: {
      title: "Mike's Blog",
      showTitle: true,
      darkModeToggle: true,
      logo: {
        light: "/logo.svg",
        dark: "/logo-dark.svg",
      },
      nav: [],
      links: [
        {
          icon: "octicon:mark-github",
          to: "https://github.com/zenzenlin",
          target: "_blank",
        },
      ],
    },
    aside: {
      useLevel: true,
      collapse: false,
      collapseLevel: 1,
      folderStyle: "default",
    },
    main: {
      breadCrumb: true,
      showTitle: true,
    },
    footer: {
      credits: "Copyright © 2025",
      links: [
        {
          icon: "lucide:github",
          to: "https://github.com/ZTL-UwU/shadcn-docs-nuxt",
          target: "_blank",
        },
      ],
    },
    toc: {
      enable: true,
      title: "",
      links: [
        {
          title: "Star on GitHub",
          icon: "lucide:star",
          to: "https://github.com/zenzenlin/my-blog",
          target: "_blank",
        },
        {
          title: "Create Issues",
          icon: "lucide:circle-dot",
          to: "https://github.com/zenzenlin/my-blog/issues",
          target: "_blank",
        },
      ],
    },
    search: {
      enable: true,
      inAside: false,
    },
    gitTalk: {
      enable: true,
    },
  },
});
