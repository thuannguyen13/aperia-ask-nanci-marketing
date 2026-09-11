(function() {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState,
  useEffect
} = React;
const COLORS = {
  border: "rgba(0,0,0,0.08)",
  text: "#333333",
  textMuted: "#333333",
  textLight: "#999",
  funding: "#0F6E56",
  router: "#185FA5",
  quality: "#BA7517",
  qualityBg: "#FAEEDA"
};

// Card grids drop to one column below this.
const MOBILE_BP = 720;
// Three labels fit the single-row pill bar at any width the deck is read at,
// so the section sheet is only needed where the card grids collapse anyway.
const NAV_BP = MOBILE_BP;
function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => typeof window !== "undefined" && window.matchMedia ? window.matchMedia(query).matches : false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia(query);
    const onChange = e => setMatches(e.matches);
    setMatches(mq.matches);
    if (mq.addEventListener) {
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    }
    mq.addListener(onChange);
    return () => mq.removeListener(onChange);
  }, [query]);
  return matches;
}
function useIsMobile() {
  return useMediaQuery(`(max-width: ${MOBILE_BP}px)`);
}
function SectionNav({
  tabs,
  tab,
  setTab
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 24,
      borderRadius: 12,
      background: "#f5f5f3",
      border: `1px solid ${COLORS.border}`,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setOpen(o => !o),
    "aria-expanded": open,
    "aria-controls": "deck-section-list",
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      width: "100%",
      minHeight: 56,
      padding: "10px 14px",
      border: "none",
      background: "transparent",
      cursor: "pointer",
      fontFamily: "inherit",
      textAlign: "left"
    }
  }, open ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: 17,
      fontWeight: 600,
      color: COLORS.text
    }
  }, "Jump to section") : /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: COLORS.textLight,
      marginBottom: 2
    }
  }, "Section ", tab + 1, " / ", tabs.length), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: 17,
      fontWeight: 600,
      color: COLORS.text,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, tabs[tab].label)), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true",
    style: {
      flexShrink: 0,
      color: COLORS.textMuted,
      transition: "transform 0.24s ease"
    }
  }, open ? /*#__PURE__*/React.createElement("path", {
    d: "M6 6l12 12M18 6L6 18",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round"
  }) : /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("div", {
    id: "deck-section-list",
    style: {
      maxHeight: open ? tabs.length * 48 + 20 : 0,
      opacity: open ? 1 : 0,
      overflow: "hidden",
      pointerEvents: open ? "auto" : "none",
      transition: "max-height 0.28s ease, opacity 0.2s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: `1px solid ${COLORS.border}`,
      padding: "6px 0 8px"
    }
  }, tabs.map((t, i) => {
    const active = i === tab;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      onClick: () => {
        setTab(i);
        setOpen(false);
      },
      "aria-current": active ? "true" : undefined,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        width: "100%",
        minHeight: 44,
        padding: "10px 14px",
        border: "none",
        background: active ? "#fff" : "transparent",
        textAlign: "left",
        fontFamily: "inherit",
        fontSize: 16,
        lineHeight: 1.4,
        fontWeight: active ? 600 : 400,
        color: COLORS.text,
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flexShrink: 0,
        width: 20,
        fontSize: 13,
        fontWeight: 600,
        color: active ? COLORS.router : COLORS.textLight
      }
    }, i + 1), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, t.label), active && /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        flexShrink: 0,
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: COLORS.router
      }
    }));
  }))));
}
function SectionLabel({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: COLORS.textLight,
      marginBottom: 8
    }
  }, children);
}
function NodeBox({
  color,
  bg,
  borderColor,
  children,
  style,
  glow,
  featured,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: bg || "#fff",
      border: `1px solid ${borderColor || color || COLORS.border}`,
      borderRadius: 12,
      padding: "12px 16px",
      position: "relative",
      transition: "box-shadow 0.2s, transform 0.15s",
      boxShadow: glow ? `0 0 0 3px ${color}18, 0 2px 8px ${color}10` : featured ? `0 0 0 2px ${color}30` : "0 1px 3px rgba(0,0,0,0.04)",
      ...style
    }
  }, rest), children);
}
function Diagram1() {
  const isMobile = useIsMobile();
  const pillars = [{
    title: "Hierarchy applied to every answer",
    desc: "Portfolios, channels and regions are enforced on every request. Two people can ask the identical question and each receives only the rows they are entitled to see.",
    color: COLORS.router
  }, {
    title: "Deterministic where it counts",
    desc: "A pinned answer freezes its query, so recurring business questions replay identical, reconcilable logic.",
    color: COLORS.router
  }, {
    title: "Sensitive data never meets the AI",
    desc: "Cardholder account numbers are tokenized before data reaches analytics. The AI works only on protected, de-identified data.",
    color: COLORS.router
  }, {
    title: "Production stays untouched",
    desc: "Queries run against a governed analytics platform. Live payment processing systems are never queried.",
    color: COLORS.router
  }, {
    title: "Governed AI, not experimental AI",
    desc: "The language model is one component in a controlled pipeline: it reaches data only through the tool gateway, every request is authorized at execution time, and trusted answers graduate into a pinned, auditable library.",
    color: COLORS.quality,
    accent: true
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      lineHeight: 1.5,
      fontWeight: 600,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: COLORS.router,
      marginBottom: 10
    }
  }, "Conceptual Architecture"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 28,
      fontWeight: 600,
      color: COLORS.text,
      margin: 0,
      letterSpacing: "-0.02em"
    }
  }, "Answers you can trust, from data you control"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.5,
      color: COLORS.textMuted,
      margin: "10px 0 0",
      maxWidth: 1200,
      marginLeft: "auto",
      marginRight: "auto"
    }
  }, "Merchants and partners ask questions of their payments data in plain English. The AI interprets the question; the platform decides what it may be answered with. The AI never touches data directly.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Conceptual architecture"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      border: `1px solid ${COLORS.border}`,
      borderRadius: 10,
      padding: "24px 20px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 1080 700",
    width: "100%",
    role: "img",
    "aria-label": "Ask Nanci conceptual architecture: user question flows through the conversational AI, tool gateway, authorization gate, and data access layer to a governed analytics platform. Cardholder data and production processing sit outside the AI boundary."
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("marker", {
    id: "arr",
    viewBox: "0 0 10 10",
    refX: "8",
    refY: "5",
    markerWidth: "7",
    markerHeight: "7",
    orient: "auto-start-reverse"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 1L9 5L1 9",
    fill: "none",
    stroke: "#1C7293",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  })), /*#__PURE__*/React.createElement("marker", {
    id: "arrO",
    viewBox: "0 0 10 10",
    refX: "8",
    refY: "5",
    markerWidth: "7",
    markerHeight: "7",
    orient: "auto-start-reverse"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 1L9 5L1 9",
    fill: "none",
    stroke: "#F39237",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }))), /*#__PURE__*/React.createElement("rect", {
    x: "350",
    y: "18",
    width: "380",
    height: "62",
    rx: "9",
    fill: "#21295C"
  }), /*#__PURE__*/React.createElement("text", {
    x: "540",
    y: "44",
    textAnchor: "middle",
    fill: "#FFFFFF",
    fontSize: "17",
    fontWeight: "700"
  }, "Merchant & Partner Users"), /*#__PURE__*/React.createElement("text", {
    x: "540",
    y: "64",
    textAnchor: "middle",
    fill: "#CADCFC",
    fontSize: "12.5"
  }, "“How did my chargebacks trend last quarter?”"), /*#__PURE__*/React.createElement("line", {
    x1: "540",
    y1: "80",
    x2: "540",
    y2: "112",
    stroke: "#1C7293",
    strokeWidth: "1.8",
    markerEnd: "url(#arr)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "360",
    y: "114",
    width: "360",
    height: "86",
    rx: "9",
    fill: "#FFFFFF",
    stroke: "#065A82",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("text", {
    x: "540",
    y: "140",
    textAnchor: "middle",
    fill: "#21295C",
    fontSize: "17",
    fontWeight: "700"
  }, "Conversational AI (LLM)"), /*#__PURE__*/React.createElement("text", {
    x: "540",
    y: "160",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "12.5"
  }, "Understands the question and the intent,"), /*#__PURE__*/React.createElement("text", {
    x: "540",
    y: "176",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "12.5"
  }, "never the raw data store"), /*#__PURE__*/React.createElement("line", {
    x1: "540",
    y1: "200",
    x2: "540",
    y2: "232",
    stroke: "#1C7293",
    strokeWidth: "1.8",
    markerEnd: "url(#arr)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "360",
    y: "234",
    width: "360",
    height: "86",
    rx: "9",
    fill: "#FFFFFF",
    stroke: "#065A82",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("text", {
    x: "540",
    y: "260",
    textAnchor: "middle",
    fill: "#21295C",
    fontSize: "17",
    fontWeight: "700"
  }, "AI Tool Gateway (MCP)"), /*#__PURE__*/React.createElement("text", {
    x: "540",
    y: "280",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "12.5"
  }, "The only path to data. Every query,"), /*#__PURE__*/React.createElement("text", {
    x: "540",
    y: "296",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "12.5"
  }, "exploratory or pinned, goes through here"), /*#__PURE__*/React.createElement("rect", {
    x: "790",
    y: "229",
    width: "240",
    height: "96",
    rx: "9",
    fill: "#F3F7FD",
    stroke: "#F39237",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("text", {
    x: "910",
    y: "256",
    textAnchor: "middle",
    fill: "#21295C",
    fontSize: "15",
    fontWeight: "700"
  }, "Pinned Query Library"), /*#__PURE__*/React.createElement("text", {
    x: "910",
    y: "276",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "12"
  }, "Answers the user approves are"), /*#__PURE__*/React.createElement("text", {
    x: "910",
    y: "292",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "12"
  }, "pinned: frozen queries that"), /*#__PURE__*/React.createElement("text", {
    x: "910",
    y: "308",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "12"
  }, "replay identically every time"), /*#__PURE__*/React.createElement("line", {
    x1: "722",
    y1: "253",
    x2: "788",
    y2: "253",
    stroke: "#F39237",
    strokeWidth: "1.8",
    markerEnd: "url(#arrO)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "755",
    y: "243",
    textAnchor: "middle",
    fill: "#F39237",
    fontSize: "10.5",
    fontWeight: "700"
  }, "pin"), /*#__PURE__*/React.createElement("line", {
    x1: "788",
    y1: "298",
    x2: "722",
    y2: "298",
    stroke: "#F39237",
    strokeWidth: "1.8",
    markerEnd: "url(#arrO)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "755",
    y: "314",
    textAnchor: "middle",
    fill: "#F39237",
    fontSize: "10.5",
    fontWeight: "700"
  }, "replay"), /*#__PURE__*/React.createElement("line", {
    x1: "540",
    y1: "320",
    x2: "540",
    y2: "352",
    stroke: "#1C7293",
    strokeWidth: "1.8",
    markerEnd: "url(#arr)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "300",
    y: "354",
    width: "480",
    height: "92",
    rx: "9",
    fill: "#1C7293"
  }), /*#__PURE__*/React.createElement("text", {
    x: "540",
    y: "380",
    textAnchor: "middle",
    fill: "#FFFFFF",
    fontSize: "17",
    fontWeight: "700"
  }, "Fine-Grained Authorization"), /*#__PURE__*/React.createElement("text", {
    x: "540",
    y: "400",
    textAnchor: "middle",
    fill: "#CADCFC",
    fontSize: "12.5"
  }, "Every request checked against the client\u2019s"), /*#__PURE__*/React.createElement("text", {
    x: "540",
    y: "416",
    textAnchor: "middle",
    fill: "#CADCFC",
    fontSize: "12.5"
  }, "organizational hierarchy, row by row"), /*#__PURE__*/React.createElement("rect", {
    x: "50",
    y: "352",
    width: "220",
    height: "96",
    rx: "9",
    fill: "#F3F7FD",
    stroke: "#1C7293",
    strokeWidth: "1.4"
  }), /*#__PURE__*/React.createElement("text", {
    x: "160",
    y: "380",
    textAnchor: "middle",
    fill: "#21295C",
    fontSize: "14.5",
    fontWeight: "700"
  }, "Client Hierarchy"), /*#__PURE__*/React.createElement("text", {
    x: "160",
    y: "400",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "12"
  }, "Portfolios \xB7 channels \xB7 regions"), /*#__PURE__*/React.createElement("text", {
    x: "160",
    y: "416",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "12"
  }, "define exactly which rows"), /*#__PURE__*/React.createElement("text", {
    x: "160",
    y: "432",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "12"
  }, "each user may see"), /*#__PURE__*/React.createElement("line", {
    x1: "272",
    y1: "400",
    x2: "298",
    y2: "400",
    stroke: "#1C7293",
    strokeWidth: "1.8",
    markerEnd: "url(#arr)"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "540",
    y1: "446",
    x2: "540",
    y2: "478",
    stroke: "#1C7293",
    strokeWidth: "1.8",
    markerEnd: "url(#arr)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "360",
    y: "480",
    width: "360",
    height: "86",
    rx: "9",
    fill: "#FFFFFF",
    stroke: "#065A82",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("text", {
    x: "540",
    y: "506",
    textAnchor: "middle",
    fill: "#21295C",
    fontSize: "17",
    fontWeight: "700"
  }, "Governed Data Access Layer"), /*#__PURE__*/React.createElement("text", {
    x: "540",
    y: "526",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "12.5"
  }, "Executes only the approved, scoped"), /*#__PURE__*/React.createElement("text", {
    x: "540",
    y: "542",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "12.5"
  }, "query. Read-only by construction"), /*#__PURE__*/React.createElement("line", {
    x1: "540",
    y1: "566",
    x2: "540",
    y2: "598",
    stroke: "#1C7293",
    strokeWidth: "1.8",
    markerEnd: "url(#arr)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "330",
    y: "600",
    width: "420",
    height: "82",
    rx: "9",
    fill: "#065A82"
  }), /*#__PURE__*/React.createElement("text", {
    x: "540",
    y: "626",
    textAnchor: "middle",
    fill: "#FFFFFF",
    fontSize: "17",
    fontWeight: "700"
  }, "Governed Analytics Data Platform"), /*#__PURE__*/React.createElement("text", {
    x: "540",
    y: "646",
    textAnchor: "middle",
    fill: "#CADCFC",
    fontSize: "12.5"
  }, "Isolated from live payment processing."), /*#__PURE__*/React.createElement("text", {
    x: "540",
    y: "662",
    textAnchor: "middle",
    fill: "#CADCFC",
    fontSize: "12.5"
  }, "Analytics never touches production"), /*#__PURE__*/React.createElement("rect", {
    x: "790",
    y: "480",
    width: "240",
    height: "202",
    rx: "9",
    fill: "none",
    stroke: "#B24A3B",
    strokeWidth: "1.6",
    strokeDasharray: "6 5"
  }), /*#__PURE__*/React.createElement("text", {
    x: "910",
    y: "518",
    textAnchor: "middle",
    fill: "#B24A3B",
    fontSize: "14.5",
    fontWeight: "700"
  }, "Outside the AI boundary"), /*#__PURE__*/React.createElement("text", {
    x: "910",
    y: "551",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "12"
  }, "Cardholder account numbers"), /*#__PURE__*/React.createElement("text", {
    x: "910",
    y: "573",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "12"
  }, "are tokenized before analytics."), /*#__PURE__*/React.createElement("text", {
    x: "910",
    y: "596",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "12"
  }, "The AI can never see them."), /*#__PURE__*/React.createElement("text", {
    x: "910",
    y: "629",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "12"
  }, "Live payment processing systems"), /*#__PURE__*/React.createElement("text", {
    x: "910",
    y: "652",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "12"
  }, "are never queried by the AI."))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.5,
      color: COLORS.textMuted,
      marginTop: 16,
      maxWidth: 1200
    }
  }, "Every hop narrows what is possible: the AI composes a query through the tool gateway, the authorization gate applies the client hierarchy to every request, and the data access layer runs a read-only, scoped query against a platform that is separate from payment processing.")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 24px",
      borderRadius: 14,
      background: "#f8f8f6",
      border: `1px solid ${COLORS.border}`,
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Design concept \xB7 Query Pinning"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 600,
      color: COLORS.text,
      marginBottom: 10
    }
  }, "Explore freely, then pin what matters"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.5,
      color: COLORS.textMuted,
      marginBottom: 0
    }
  }, "Users ask anything they like; when an answer earns their trust they pin it, which freezes the exact query behind it. From then on that question replays the same math and the same certified logic every time, and the only thing that varies is the authorization scope of whoever is asking.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "What this architecture means for our clients"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
      gap: 12
    }
  }, pillars.map(p => /*#__PURE__*/React.createElement(NodeBox, {
    key: p.title,
    color: p.color,
    bg: p.accent ? COLORS.qualityBg : "#fff",
    style: {
      padding: "14px 16px",
      ...(p.accent ? {
        gridColumn: "1 / -1"
      } : null)
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      lineHeight: 1.5,
      fontWeight: 600,
      color: p.color,
      marginBottom: 4
    }
  }, p.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      lineHeight: 1.5,
      color: COLORS.textMuted
    }
  }, p.desc))))));
}
function Diagram2() {
  const isMobile = useIsMobile();
  const expectations = [{
    title: "Access is checked every time",
    desc: "Entra ID confirms who is asking; the fine-grained authorization service applies the client’s hierarchy before the query runs, at execution time rather than once at login."
  }, {
    title: "Sensitive payment data stays protected",
    desc: "Cardholder account numbers are tokenized before data reaches analytics, and live payment-processing systems are never queried."
  }, {
    title: "The AI has one approved route to data",
    desc: "The model can call only approved tools, and the governed data access layer runs authorized, read-only queries. There is no second path around it."
  }, {
    title: "Activity is monitored",
    desc: "Security monitoring supports alerting, investigation and response across the application, API, AI and analytics layers."
  }];
  const tools = [{
    name: "Entra ID and PIM",
    job: "User identity, least privilege, and protected administrative access."
  }, {
    name: "Edge protection and API gateway",
    job: "Traffic protection, rate limits, quotas, timeouts, and usage controls."
  }, {
    name: "Fine-grained authorization service",
    job: "Fine-grained access rules based on the user and the client hierarchy."
  }, {
    name: "AI content safety service",
    job: "Checks prompts and responses for unsafe content."
  }, {
    name: "Data loss prevention and secrets vault",
    job: "Protection for sensitive data, secrets, and protected settings."
  }, {
    name: "Threat protection, monitoring, and SIEM",
    job: "Security signals, alerts, investigation, and incident response."
  }];
  const standards = [{
    name: "PCI DSS",
    desc: "How cardholder data is protected, separated, monitored, and kept outside the AI experience."
  }, {
    name: "OWASP",
    desc: "Common AI application risks: prompt attacks, sensitive-data exposure, unsafe output, excessive access."
  }, {
    name: "MITRE ATLAS",
    desc: "How attackers target AI systems, tools, models and data, and how we prepare defenses."
  }, {
    name: "NIST AI RMF",
    desc: "How we identify, measure, manage and monitor AI risk across the service lifecycle."
  }, {
    name: "ISO/IEC 42001 and 23894",
    desc: "Clear ownership, documented controls, supplier oversight, and regular review."
  }];
  const references = ["PCI DSS Compliant", "OWASP aligned", "MITRE ATLAS guided", "NIST AI RMF informed", "ISO/IEC framed"];
  const pText = {
    fontSize: 16,
    lineHeight: 1.5,
    color: COLORS.textMuted,
    marginBottom: 10
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      lineHeight: 1.5,
      fontWeight: 600,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: COLORS.router,
      marginBottom: 10
    }
  }, "Secure Architecture"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 28,
      fontWeight: 600,
      color: COLORS.text,
      margin: 0,
      letterSpacing: "-0.02em"
    }
  }, "The AI interprets. The platform protects."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.5,
      color: COLORS.textMuted,
      margin: "10px 0 0",
      maxWidth: 1200,
      marginLeft: "auto",
      marginRight: "auto"
    }
  }, "Merchants and partners explore payments data without the AI holding direct access to it. Every hop narrows what the system is allowed to do, and no single tool, including the model itself, is expected to provide all of the security."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      justifyContent: "center",
      marginTop: 20
    }
  }, references.map(r => /*#__PURE__*/React.createElement("span", {
    key: r,
    style: {
      padding: "6px 12px",
      borderRadius: 999,
      border: `1px solid ${COLORS.border}`,
      background: "#fff",
      color: COLORS.text,
      fontSize: 13,
      fontWeight: 600,
      whiteSpace: "nowrap"
    }
  }, r)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Controls, placed against the stage they protect"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      border: `1px solid ${COLORS.border}`,
      borderRadius: 10,
      padding: "24px 20px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 1080 720",
    width: "100%",
    style: {
      minWidth: 880
    },
    role: "img",
    "aria-label": "Ask Nanci secure architecture. The central flow runs from merchant and partner users through the conversational AI, the AI tool gateway, fine-grained authorization, the governed data access layer, and the governed analytics platform. Security controls sit beside the stage they protect: identity and API protection, content protection, secrets protection, the pinned query library, the client hierarchy, sensitive data protection, and monitoring and response. Cardholder data and live payment processing sit outside the AI boundary."
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("marker", {
    id: "secArr",
    viewBox: "0 0 10 10",
    refX: "8",
    refY: "5",
    markerWidth: "7",
    markerHeight: "7",
    orient: "auto-start-reverse"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 1L9 5L1 9",
    fill: "none",
    stroke: "#1C7293",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }))), /*#__PURE__*/React.createElement("rect", {
    x: "350",
    y: "18",
    width: "380",
    height: "62",
    rx: "9",
    fill: "#21295C"
  }), /*#__PURE__*/React.createElement("text", {
    x: "540",
    y: "44",
    textAnchor: "middle",
    fill: "#FFFFFF",
    fontSize: "17",
    fontWeight: "700"
  }, "Merchant & Partner Users"), /*#__PURE__*/React.createElement("text", {
    x: "540",
    y: "64",
    textAnchor: "middle",
    fill: "#CADCFC",
    fontSize: "12.5"
  }, "“How did my chargebacks trend last quarter?”"), /*#__PURE__*/React.createElement("line", {
    x1: "540",
    y1: "80",
    x2: "540",
    y2: "112",
    stroke: "#1C7293",
    strokeWidth: "1.8",
    markerEnd: "url(#secArr)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "360",
    y: "114",
    width: "360",
    height: "86",
    rx: "9",
    fill: "#FFFFFF",
    stroke: "#065A82",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("text", {
    x: "540",
    y: "140",
    textAnchor: "middle",
    fill: "#21295C",
    fontSize: "17",
    fontWeight: "700"
  }, "Conversational AI (LLM)"), /*#__PURE__*/React.createElement("text", {
    x: "540",
    y: "160",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "12.5"
  }, "Understands the question and the intent,"), /*#__PURE__*/React.createElement("text", {
    x: "540",
    y: "176",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "12.5"
  }, "never the raw data store"), /*#__PURE__*/React.createElement("line", {
    x1: "540",
    y1: "200",
    x2: "540",
    y2: "232",
    stroke: "#1C7293",
    strokeWidth: "1.8",
    markerEnd: "url(#secArr)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "360",
    y: "234",
    width: "360",
    height: "86",
    rx: "9",
    fill: "#FFFFFF",
    stroke: "#065A82",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("text", {
    x: "540",
    y: "260",
    textAnchor: "middle",
    fill: "#21295C",
    fontSize: "17",
    fontWeight: "700"
  }, "AI Tool Gateway (MCP)"), /*#__PURE__*/React.createElement("text", {
    x: "540",
    y: "280",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "12.5"
  }, "The only path to data. Every query,"), /*#__PURE__*/React.createElement("text", {
    x: "540",
    y: "296",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "12.5"
  }, "exploratory or pinned, goes through here"), /*#__PURE__*/React.createElement("line", {
    x1: "540",
    y1: "320",
    x2: "540",
    y2: "352",
    stroke: "#1C7293",
    strokeWidth: "1.8",
    markerEnd: "url(#secArr)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "300",
    y: "354",
    width: "480",
    height: "92",
    rx: "9",
    fill: "#1C7293"
  }), /*#__PURE__*/React.createElement("text", {
    x: "540",
    y: "380",
    textAnchor: "middle",
    fill: "#FFFFFF",
    fontSize: "17",
    fontWeight: "700"
  }, "Fine-Grained Authorization"), /*#__PURE__*/React.createElement("text", {
    x: "540",
    y: "400",
    textAnchor: "middle",
    fill: "#CADCFC",
    fontSize: "12.5"
  }, "Every request is checked against the"), /*#__PURE__*/React.createElement("text", {
    x: "540",
    y: "416",
    textAnchor: "middle",
    fill: "#CADCFC",
    fontSize: "12.5"
  }, "client hierarchy, row by row"), /*#__PURE__*/React.createElement("line", {
    x1: "540",
    y1: "446",
    x2: "540",
    y2: "478",
    stroke: "#1C7293",
    strokeWidth: "1.8",
    markerEnd: "url(#secArr)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "360",
    y: "480",
    width: "360",
    height: "86",
    rx: "9",
    fill: "#FFFFFF",
    stroke: "#065A82",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("text", {
    x: "540",
    y: "506",
    textAnchor: "middle",
    fill: "#21295C",
    fontSize: "17",
    fontWeight: "700"
  }, "Governed Data Access Layer"), /*#__PURE__*/React.createElement("text", {
    x: "540",
    y: "526",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "12.5"
  }, "Executes only the approved, scoped"), /*#__PURE__*/React.createElement("text", {
    x: "540",
    y: "542",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "12.5"
  }, "query. Read-only by construction"), /*#__PURE__*/React.createElement("line", {
    x1: "540",
    y1: "566",
    x2: "540",
    y2: "598",
    stroke: "#1C7293",
    strokeWidth: "1.8",
    markerEnd: "url(#secArr)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "330",
    y: "600",
    width: "420",
    height: "82",
    rx: "9",
    fill: "#065A82"
  }), /*#__PURE__*/React.createElement("text", {
    x: "540",
    y: "626",
    textAnchor: "middle",
    fill: "#FFFFFF",
    fontSize: "17",
    fontWeight: "700"
  }, "Governed Analytics Data Platform"), /*#__PURE__*/React.createElement("text", {
    x: "540",
    y: "646",
    textAnchor: "middle",
    fill: "#CADCFC",
    fontSize: "12.5"
  }, "Isolated from live payment processing."), /*#__PURE__*/React.createElement("text", {
    x: "540",
    y: "662",
    textAnchor: "middle",
    fill: "#CADCFC",
    fontSize: "12.5"
  }, "Analytics never touches production"), /*#__PURE__*/React.createElement("line", {
    x1: "272",
    y1: "157",
    x2: "358",
    y2: "157",
    stroke: "#A8C6D8",
    strokeWidth: "1.4"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "40",
    y: "40",
    width: "232",
    height: "150",
    rx: "9",
    fill: "#F3F7FD",
    stroke: "#1C7293",
    strokeWidth: "1.4"
  }), /*#__PURE__*/React.createElement("text", {
    x: "156",
    y: "72",
    textAnchor: "middle",
    fill: "#21295C",
    fontSize: "14.5",
    fontWeight: "700"
  }, "Identity & API Protection"), /*#__PURE__*/React.createElement("text", {
    x: "156",
    y: "98",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "11.5"
  }, "Entra ID and PIM enforce identity"), /*#__PURE__*/React.createElement("text", {
    x: "156",
    y: "118",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "11.5"
  }, "and least privilege. Edge protection"), /*#__PURE__*/React.createElement("text", {
    x: "156",
    y: "138",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "11.5"
  }, "and an API gateway control traffic"), /*#__PURE__*/React.createElement("text", {
    x: "156",
    y: "158",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "11.5"
  }, "and usage."), /*#__PURE__*/React.createElement("line", {
    x1: "722",
    y1: "157",
    x2: "808",
    y2: "157",
    stroke: "#A8C6D8",
    strokeWidth: "1.4"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "808",
    y: "114",
    width: "232",
    height: "86",
    rx: "9",
    fill: "#F3F7FD",
    stroke: "#1C7293",
    strokeWidth: "1.4"
  }), /*#__PURE__*/React.createElement("text", {
    x: "924",
    y: "140",
    textAnchor: "middle",
    fill: "#21295C",
    fontSize: "14.5",
    fontWeight: "700"
  }, "Content Protection"), /*#__PURE__*/React.createElement("text", {
    x: "924",
    y: "162",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "11.5"
  }, "A content safety service inspects"), /*#__PURE__*/React.createElement("text", {
    x: "924",
    y: "180",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "11.5"
  }, "prompts and responses."), /*#__PURE__*/React.createElement("line", {
    x1: "272",
    y1: "277",
    x2: "358",
    y2: "277",
    stroke: "#A8C6D8",
    strokeWidth: "1.4"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "40",
    y: "234",
    width: "232",
    height: "86",
    rx: "9",
    fill: "#F3F7FD",
    stroke: "#1C7293",
    strokeWidth: "1.4"
  }), /*#__PURE__*/React.createElement("text", {
    x: "156",
    y: "260",
    textAnchor: "middle",
    fill: "#21295C",
    fontSize: "14.5",
    fontWeight: "700"
  }, "Secrets Protection"), /*#__PURE__*/React.createElement("text", {
    x: "156",
    y: "282",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "11.5"
  }, "A managed vault keeps keys and"), /*#__PURE__*/React.createElement("text", {
    x: "156",
    y: "300",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "11.5"
  }, "credentials out of prompts and code."), /*#__PURE__*/React.createElement("line", {
    x1: "722",
    y1: "277",
    x2: "808",
    y2: "277",
    stroke: "#F39237",
    strokeWidth: "1.4"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "808",
    y: "234",
    width: "232",
    height: "86",
    rx: "9",
    fill: "#FFF9F2",
    stroke: "#F39237",
    strokeWidth: "1.4"
  }), /*#__PURE__*/React.createElement("text", {
    x: "924",
    y: "260",
    textAnchor: "middle",
    fill: "#21295C",
    fontSize: "14.5",
    fontWeight: "700"
  }, "Pinned Query Library"), /*#__PURE__*/React.createElement("text", {
    x: "924",
    y: "282",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "11.5"
  }, "Approved answers replay the"), /*#__PURE__*/React.createElement("text", {
    x: "924",
    y: "300",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "11.5"
  }, "same query logic every time."), /*#__PURE__*/React.createElement("line", {
    x1: "272",
    y1: "400",
    x2: "298",
    y2: "400",
    stroke: "#A8C6D8",
    strokeWidth: "1.4"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "40",
    y: "354",
    width: "232",
    height: "92",
    rx: "9",
    fill: "#F3F7FD",
    stroke: "#1C7293",
    strokeWidth: "1.4"
  }), /*#__PURE__*/React.createElement("text", {
    x: "156",
    y: "382",
    textAnchor: "middle",
    fill: "#21295C",
    fontSize: "14.5",
    fontWeight: "700"
  }, "Client Hierarchy"), /*#__PURE__*/React.createElement("text", {
    x: "156",
    y: "404",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "11.5"
  }, "Portfolios \xB7 channels \xB7 regions"), /*#__PURE__*/React.createElement("text", {
    x: "156",
    y: "424",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "11.5"
  }, "define which rows each user may see."), /*#__PURE__*/React.createElement("line", {
    x1: "782",
    y1: "400",
    x2: "808",
    y2: "400",
    stroke: "#A8C6D8",
    strokeWidth: "1.4"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "808",
    y: "354",
    width: "232",
    height: "92",
    rx: "9",
    fill: "#F3F7FD",
    stroke: "#1C7293",
    strokeWidth: "1.4"
  }), /*#__PURE__*/React.createElement("text", {
    x: "924",
    y: "382",
    textAnchor: "middle",
    fill: "#21295C",
    fontSize: "14.5",
    fontWeight: "700"
  }, "Sensitive Data Protection"), /*#__PURE__*/React.createElement("text", {
    x: "924",
    y: "404",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "11.5"
  }, "Data loss prevention protects data"), /*#__PURE__*/React.createElement("text", {
    x: "924",
    y: "424",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "11.5"
  }, "across prompts, answers, and logs."), /*#__PURE__*/React.createElement("line", {
    x1: "722",
    y1: "523",
    x2: "808",
    y2: "523",
    stroke: "#A8C6D8",
    strokeWidth: "1.4"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "808",
    y: "480",
    width: "232",
    height: "202",
    rx: "9",
    fill: "#F3F7FD",
    stroke: "#1C7293",
    strokeWidth: "1.4"
  }), /*#__PURE__*/React.createElement("text", {
    x: "924",
    y: "518",
    textAnchor: "middle",
    fill: "#21295C",
    fontSize: "14.5",
    fontWeight: "700"
  }, "Monitoring & Response"), /*#__PURE__*/React.createElement("text", {
    x: "924",
    y: "551",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "11.5"
  }, "Threat protection, monitoring,"), /*#__PURE__*/React.createElement("text", {
    x: "924",
    y: "573",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "11.5"
  }, "and SIEM tooling watch activity,"), /*#__PURE__*/React.createElement("text", {
    x: "924",
    y: "595",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "11.5"
  }, "generate alerts, and support"), /*#__PURE__*/React.createElement("text", {
    x: "924",
    y: "617",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "11.5"
  }, "investigation and response."), /*#__PURE__*/React.createElement("rect", {
    x: "40",
    y: "480",
    width: "232",
    height: "202",
    rx: "9",
    fill: "none",
    stroke: "#B24A3B",
    strokeWidth: "1.6",
    strokeDasharray: "6 5"
  }), /*#__PURE__*/React.createElement("text", {
    x: "156",
    y: "518",
    textAnchor: "middle",
    fill: "#B24A3B",
    fontSize: "14.5",
    fontWeight: "700"
  }, "Outside the AI boundary"), /*#__PURE__*/React.createElement("text", {
    x: "156",
    y: "551",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "11.5"
  }, "Cardholder account numbers are"), /*#__PURE__*/React.createElement("text", {
    x: "156",
    y: "573",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "11.5"
  }, "tokenized before analytics."), /*#__PURE__*/React.createElement("text", {
    x: "156",
    y: "595",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "11.5"
  }, "Live payment processing is"), /*#__PURE__*/React.createElement("text", {
    x: "156",
    y: "617",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "11.5"
  }, "never queried by the AI."))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 24px",
      borderRadius: 14,
      background: "#f8f8f6",
      border: `1px solid ${COLORS.border}`,
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      ...pText,
      marginBottom: 0
    }
  }, "In plain English: the model can help form the question, but it cannot decide who may see the answer. Access is checked below the AI, every time data is requested."))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Security built into the path to every answer"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
      gap: 12
    }
  }, expectations.map(e => /*#__PURE__*/React.createElement(NodeBox, {
    key: e.title,
    color: COLORS.router,
    style: {
      padding: "14px 16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      lineHeight: 1.5,
      fontWeight: 600,
      color: COLORS.router,
      marginBottom: 4
    }
  }, e.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      lineHeight: 1.5,
      color: COLORS.textMuted
    }
  }, e.desc))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Security toolsets"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
      gap: 12
    }
  }, tools.map(t => /*#__PURE__*/React.createElement(NodeBox, {
    key: t.name,
    color: COLORS.router,
    style: {
      padding: "14px 16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      lineHeight: 1.5,
      fontWeight: 600,
      color: COLORS.router,
      marginBottom: 4
    }
  }, t.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      lineHeight: 1.5,
      color: COLORS.textMuted
    }
  }, t.job))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Guided by payment and AI security practices"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
      gap: 12
    }
  }, standards.map(s => /*#__PURE__*/React.createElement(NodeBox, {
    key: s.name,
    color: COLORS.border,
    style: {
      padding: "14px 16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      lineHeight: 1.4,
      fontWeight: 600,
      color: COLORS.funding,
      marginBottom: 4
    }
  }, s.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      lineHeight: 1.5,
      color: COLORS.textMuted
    }
  }, s.desc))))));
}
function App() {
  const [tab, setTab] = useState(0);
  const isMobile = useIsMobile();
  const isNarrow = useMediaQuery(`(max-width: ${NAV_BP}px)`);
  const tabs = [{
    label: "Architecture summary",
    component: Diagram1
  }, {
    label: "Security",
    component: Diagram2
  }];
  const ActiveDiagram = tabs[tab].component;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: COLORS.text,
      maxWidth: 1200,
      margin: "0 auto",
      padding: isMobile ? "16px 12px 32px" : "24px 16px 40px",
      minHeight: "100vh",
      background: "#fff"
    }
  }, isNarrow ? /*#__PURE__*/React.createElement(SectionNav, {
    tabs: tabs,
    tab: tab,
    setTab: setTab
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      justifyContent: "center",
      marginBottom: 32,
      background: "#f5f5f3",
      borderRadius: 10,
      padding: 3,
      maxWidth: 1200,
      margin: "0 auto 32px",
      overflowX: "auto"
    }
  }, tabs.map((t, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => setTab(i),
    style: {
      flex: 1,
      whiteSpace: "nowrap",
      padding: "8px 12px",
      borderRadius: 8,
      border: "none",
      background: tab === i ? "#fff" : "transparent",
      color: tab === i ? COLORS.text : COLORS.textMuted,
      fontWeight: tab === i ? 600 : 400,
      fontSize: 16,
      lineHeight: 1.5,
      cursor: "pointer",
      transition: "all 0.2s",
      boxShadow: tab === i ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
      fontFamily: "inherit"
    }
  }, t.label))), /*#__PURE__*/React.createElement(ActiveDiagram, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));

})();
