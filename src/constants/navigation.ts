export const data = [
  {
    title: "Products",
    path: "#",
    type: "mega",
    megaType: "products",
    children: [
      {
        category: {
          invert: true,
          status: "primary",
          text: "For Designers",
          disabled: false,
        },
        hover: {
          bg: "--background-color-color-primary-invert-default",
        },
        title: "Design System",
        path: "/design-system",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        background: "linear-gradient(135deg, #e8e5ff 0%, #c7c3ff 100%)",
        features: [
          {
            title: "Foundations",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          },
          {
            title: "Components",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          },
          {
            title: "Blocks & Templates",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          },
        ],
        image: "designSystem",
        integrations: ["figma"],
      },
      {
        category: {
          invert: true,
          status: "info",
          text: "For Developers",
          disabled: false,
        },
        hover: {
          bg: "--background-color-color-info-invert-default",
        },
        title: "UI Library",
        path: "/ui-library",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit aenean commodo.",
        background: "linear-gradient(135deg, #bfdbfe 0%, #fecaca 100%)",
        features: [
          {
            title: "Open-source",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          },
          {
            title: "Multi-framework support",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          },
          {
            title: "Integrations",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          },
        ],
        image: "uiLibrary",
        integrations: ["react", "angular-icon", "vue", "javascript"],
      },
      {
        category: {
          invert: false,
          status: "default",
          text: "For POs",
          disabled: true,
        },
        hover: {
          bg: "--background-color-color-disabled-default",
        },
        title: "Analytics",
        path: "#",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit ipsum dolor.",
        background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
        features: [
          {
            title: "Monitoring Dashboard",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          },
          {
            title: "Performance Overview",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          },
          {
            title: "AI Suggestion",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          },
        ],
        image: "analytics",
        integrations: false,
        status: "Coming Soon",
      },
      {
        category: {
          invert: false,
          status: "default",
          text: "For Data Scientes",
          disabled: true,
        },
        hover: {
          bg: "--background-color-color-disabled-default",
        },
        title: "Plus AI",
        path: "#",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit ipsum dolor.",
        background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
        features: [
          {
            title: "Monitoring Dashboard",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          },
          {
            title: "Performance Overview",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          },
          {
            title: "AI Suggestion",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          },
        ],
        image: "analytics",
        integrations: false,
        status: "Coming Soon",
      },
      {
        category: {
          invert: true,
          status: "warning",
          text: "For Agencies & Companies",
          disabled: false,
        },
        hover: {
          bg: "--background-color-color-warning-invert-default",
        },
        title: "Enterprise",
        path: "#",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit ipsum dolor.",
        background: "linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%)",
        features: [
          {
            title: "Custom Token System",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          },
          {
            title: "Custom Components & Needs",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          },
          {
            title: "Integration w/all frameworks",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          },
        ],
        image: "plusAi",
        integrations: ["google-icon", "apple", "microsoft-icon"],
      },
    ],
  },
  {
    title: "UI Elements",
    path: "https://new-docs.plusui.com/components/overview/",
    external: true,
  },
  {
    title: "Playground",
    path: "#",
    external: true,
  },
  {
    title: "Docs",
    path: "https://new-docs.plusui.com",
    external: true,
  },
  {
    title: "Pricing",
    path: "#",
    external: true,
  },
  {
    title: "Discover",
    path: "/discover",
    type: "mega",
    megaType: "discover",
    children: [
      {
        title: "About",
        path: "/about",
        type: "links",
        items: [
          { title: "Why Plus UI?", path: "#", external: true },
          { title: "FAQ", path: "#", external: true },
          { title: "Roadmap", path: "#", external: true },
          { title: "Webinars & Events", path: "#", external: true },
        ],
      },
      {
        title: "Resources",
        type: "links",
        path: "/resources",
        items: [
          {
            title: "Plus UI Academy",
            path: "#",
            badge: "New",
            icon: "fa-graduation-cap",
            external: true,
          },
          { title: "Blog", path: "#", icon: "fa-paperclip", external: true },
          { title: "Podcasts", path: "#", icon: "fa-podcast", external: true },
          { title: "Help Center", path: "#", icon: "fa-life-ring", external: true },
          {
            title: "Features Request",
            path: "#",
            icon: "fa-hand-point-up",
            external: true,
          },
          {
            title: "Changelog",
            path: "#",
            icon: "fa-clock-rotate-left",
            external: true,
          },
        ],
      },
      {
        title: "Tools",
        type: "links",
        path: "/tools",
        items: [
          {
            title: "Accessibility Checker",
            path: "#",
            icon: "fa-universal-access",
            external: true,
          },
          {
            title: "Credit Card Generator",
            path: "#",
            icon: "fa-credit-card",
            external: true,
          },
          {
            title: "QR Code Generator",
            path: "#",
            badge: "New",
            icon: "fa-qrcode",
            external: true,
          },
        ],
      },
      {
        title: "Compare",
        type: "compare",
        path: "/compare",
        items: [
          { title: "vs Ant Design", path: "#", external: true },
          { title: "vs MUI", path: "#", external: true },
          { title: "vs Untitled UI", path: "#", external: true },
        ],
        seeAllPath: "#",
        seeAllText: "See all",
      },
      {
        title: "Featured guide",
        type: "featured",
        featuredTitle: "How to build a team hub on Plus UI",
        path: "#",
        cta: "Get insight",
        image: "/api/placeholder/200/100",
      },
    ],
  },
];
