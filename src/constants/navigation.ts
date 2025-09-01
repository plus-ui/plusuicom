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
        path: "/analytics",
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
        path: "/plus-ai",
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
        path: "/enterprise",
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
    path: "/ui-elements",
  },
  {
    title: "Playground",
    path: "/playground",
  },
  {
    title: "Docs",
    path: "https://new-docs.plusui.com",
    external: true,
  },
  {
    title: "Pricing",
    path: "/pricing",
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
          { title: "Why Plus UI?", path: "/about" },
          { title: "FAQ", path: "/faq" },
          { title: "Roadmap", path: "/roadmap" },
          { title: "Webinars & Events", path: "/events" },
        ],
      },
      {
        title: "Resources",
        type: "links",
        path: "/resources",
        items: [
          {
            title: "Plus UI Academy",
            path: "/academy",
            badge: "New",
            icon: "fa-graduation-cap",
          },
          { title: "Blog", path: "/blog", icon: "fa-paperclip" },
          { title: "Podcasts", path: "/podcasts", icon: "fa-podcast" },
          { title: "Help Center", path: "/help", icon: "fa-life-ring" },
          {
            title: "Features Request",
            path: "/features",
            icon: "fa-hand-point-up",
          },
          {
            title: "Changelog",
            path: "/changelog",
            icon: "fa-clock-rotate-left",
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
            path: "/tools/accessibility",
            icon: "fa-universal-access",
          },
          {
            title: "Credit Card Generator",
            path: "/tools/credit-card",
            icon: "fa-credit-card",
          },
          {
            title: "QR Code Generator",
            path: "/tools/qr-code",
            badge: "New",
            icon: "fa-qrcode",
          },
        ],
      },
      {
        title: "Compare",
        type: "compare",
        path: "/compare",
        items: [
          { title: "vs Ant Design", path: "/compare/ant-design" },
          { title: "vs MUI", path: "/compare/mui" },
          { title: "vs Untitled UI", path: "/compare/untitled-ui" },
        ],
        seeAllPath: "/compare",
        seeAllText: "See all",
      },
      {
        title: "Featured guide",
        type: "featured",
        featuredTitle: "How to build a team hub on Plus UI",
        path: "/featured",
        cta: "Get insight",
        image: "/api/placeholder/200/100",
      },
    ],
  },
];
