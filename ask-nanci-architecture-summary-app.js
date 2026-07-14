(function() {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
const COLORS = {
  bg: "#FAFAF8",
  card: "#FFFFFF",
  border: "rgba(0,0,0,0.08)",
  borderHover: "rgba(0,0,0,0.15)",
  text: "#1a1a1a",
  textMuted: "#6b6b6b",
  textLight: "#999",
  funding: "#0F6E56",
  fundingBg: "#E1F5EE",
  fundingLight: "#9FE1CB",
  reconciliation: "#185FA5",
  reconciliationBg: "#E6F1FB",
  reconciliationLight: "#85B7EB",
  chargeback: "#993C1D",
  chargebackBg: "#FAECE7",
  chargebackLight: "#F0997B",
  sales: "#534AB7",
  salesBg: "#EEEDFE",
  salesLight: "#AFA9EC",
  inventory: "#639922",
  inventoryBg: "#EAF3DE",
  inventoryLight: "#C0DD97",
  profit: "#854F0B",
  profitBg: "#FAEEDA",
  profitLight: "#FAC775",
  cashflow: "#0F6E56",
  cashflowBg: "#E1F5EE",
  cashflowLight: "#5DCAA5",
  reporting: "#5F5E5A",
  reportingBg: "#F1EFE8",
  reportingLight: "#B4B2A9",
  payments: "#993556",
  paymentsBg: "#FBEAF0",
  paymentsLight: "#ED93B1",
  safety: "#444441",
  safetyBg: "#F1EFE8",
  memory: "#444441",
  memoryBg: "#F1EFE8",
  router: "#185FA5",
  routerBg: "#E6F1FB",
  quality: "#BA7517",
  qualityBg: "#FAEEDA",
  qualityBorder: "#EF9F27",
  prepare: "#444441",
  prepareBg: "#F1EFE8",
  deliver: "#0F6E56",
  deliverBg: "#E1F5EE",
  dataRetrieval: "#534AB7",
  dataRetrievalBg: "#EEEDFE",
  organize: "#534AB7",
  organizeBg: "#EEEDFE",
  database: "#185FA5",
  databaseBg: "#E6F1FB",
  clover: "#0F6E56",
  cloverBg: "#E1F5EE",
  plaid: "#534AB7",
  plaidBg: "#EEEDFE",
  quickbooks: "#854F0B",
  quickbooksBg: "#FAEEDA"
};
const specialists = [{
  id: "funding",
  name: "Funding specialist",
  icon: "\u{1F4B0}",
  color: COLORS.funding,
  bg: COLORS.fundingBg,
  light: COLORS.fundingLight,
  desc: "Where\u2019s my money, when will I get paid",
  tools: ["Funding summary", "Deposit queries", "Batch queries", "Bank account check"],
  sources: ["database", "clover", "plaid"],
  questions: ["Where\u2019s my money?", "Is anything off with my deposits?", "Why was Tuesday\u2019s deposit smaller than expected?"]
}, {
  id: "reconciliation",
  name: "Reconciliation specialist",
  icon: "\u2696\uFE0F",
  color: COLORS.reconciliation,
  bg: COLORS.reconciliationBg,
  light: COLORS.reconciliationLight,
  desc: "Why don\u2019t my numbers match",
  tools: ["Bank-vs-sales reconciliation", "Deposit-to-batch matching", "Accounting comparison"],
  sources: ["database", "clover", "plaid", "quickbooks"],
  questions: ["Why doesn\u2019t my bank match my sales report?", "My accountant says I\u2019m missing a deposit \u2014 can you find it?", "Why is my accounting software showing different revenue than Clover?"]
}, {
  id: "chargeback",
  name: "Chargeback specialist",
  icon: "\u{1F6E1}\uFE0F",
  color: COLORS.chargeback,
  bg: COLORS.chargebackBg,
  light: COLORS.chargebackLight,
  desc: "What\u2019s this dispute, should I fight it",
  tools: ["Chargeback explanation", "Chargeback listing", "Risk assessment", "Representment drafting"],
  sources: ["database", "clover"],
  questions: ["Did I get a chargeback this month?", "Should I fight this dispute?", "What\u2019s my chargeback rate \u2014 am I at risk?"]
}, {
  id: "sales",
  name: "Sales specialist",
  icon: "\u{1F4CA}",
  color: COLORS.sales,
  bg: COLORS.salesBg,
  light: COLORS.salesLight,
  desc: "What\u2019s selling, busiest times, trends",
  tools: ["Sales summary", "Item performance", "Period comparison", "Chart generation"],
  sources: ["database", "clover"],
  questions: ["What\u2019s my best selling item this week?", "My sales this weekend were lower than usual. Is something wrong?", "How are my online orders trending vs in-store?"]
}, {
  id: "payments",
  name: "Payments specialist",
  icon: "\u{1F4B3}",
  color: COLORS.payments,
  bg: COLORS.paymentsBg,
  light: COLORS.paymentsLight,
  desc: "Payment status, declines, terminal health",
  tools: ["Payment lookup", "Decline analysis", "Terminal status", "Processing history"],
  sources: ["database", "clover"],
  questions: ["Why did that payment fail?", "Show me declined transactions this week", "Are all my terminals online?"]
}, {
  id: "inventory",
  name: "Inventory specialist",
  icon: "\u{1F4E6}",
  color: COLORS.inventory,
  bg: COLORS.inventoryBg,
  light: COLORS.inventoryLight,
  desc: "What do I need to order, vendor tracking",
  tools: ["Stock levels", "Reorder forecast", "Vendor price history"],
  sources: ["clover", "quickbooks"],
  questions: ["What do I need to order?", "What vendors increased prices?", "Based on my sales trends, when will I run out of X?"]
}, {
  id: "profit",
  name: "Profit specialist",
  icon: "\u{1F48E}",
  color: COLORS.profit,
  bg: COLORS.profitBg,
  light: COLORS.profitLight,
  desc: "Am I making money, real cost per transaction",
  tools: ["P&L summary", "Fee analysis", "Expense breakdown", "Margin by item"],
  sources: ["database", "clover", "quickbooks"],
  questions: ["Show profit trends by location", "How much do refunds cost me monthly?", "Am I actually profitable after processing fees?"]
}, {
  id: "cashflow",
  name: "Cash flow specialist",
  icon: "\u{1F30A}",
  color: COLORS.cashflow,
  bg: COLORS.cashflowBg,
  light: COLORS.cashflowLight,
  desc: "Can I afford this, what does my week look like",
  tools: ["Cash position", "Cashflow forecast", "Upcoming obligations"],
  sources: ["database", "plaid", "quickbooks"],
  questions: ["What bills are due before Friday?", "What are my margins?", "When\u2019s the best time to pay this vendor bill?"]
}, {
  id: "reporting",
  name: "Reporting specialist",
  icon: "\u{1F4CB}",
  color: COLORS.reporting,
  bg: COLORS.reportingBg,
  light: COLORS.reportingLight,
  desc: "Weekly summaries, anomaly detection",
  tools: ["Sales summary", "Funding summary", "Chargeback summary", "Chart & report generation"],
  sources: ["database", "clover", "plaid", "quickbooks"],
  questions: ["Write a weekly owner\u2019s update", "Give me a month-end summary for my accountant", "What should I focus on this week?"]
}];
const dataSources = [{
  id: "database",
  name: "Your database",
  icon: "\u{1F5C4}\uFE0F",
  color: COLORS.database,
  bg: COLORS.databaseBg,
  desc: "Transactions, batches, deposits, chargebacks, fees, reserves"
}, {
  id: "clover",
  name: "Clover",
  icon: "\u2618\uFE0F",
  color: COLORS.clover,
  bg: COLORS.cloverBg,
  desc: "Sales, orders, inventory, employees, tips, refunds, devices",
  via: "7+ specialists",
  featured: true
}, {
  id: "plaid",
  name: "Financial institutions",
  icon: "\u{1F3E6}",
  color: COLORS.plaid,
  bg: COLORS.plaidBg,
  desc: "Bank account status, balances, posted transactions",
  via: "3+ specialists"
}, {
  id: "quickbooks",
  name: "Accounting",
  icon: "\u{1F4D2}",
  color: COLORS.quickbooks,
  bg: COLORS.quickbooksBg,
  desc: "QuickBooks, Sage, Gusto, FreshBooks, and more",
  via: "5+ specialists"
}];
const sourceColorMap = {
  database: {
    color: COLORS.database,
    bg: COLORS.databaseBg
  },
  clover: {
    color: COLORS.clover,
    bg: COLORS.cloverBg
  },
  plaid: {
    color: COLORS.plaid,
    bg: COLORS.plaidBg
  },
  quickbooks: {
    color: COLORS.quickbooks,
    bg: COLORS.quickbooksBg
  }
};
const sourceNameMap = {
  database: "Database",
  clover: "Clover",
  plaid: "Financial institutions",
  quickbooks: "Accounting"
};
function SourcePill({
  sourceId
}) {
  const s = sourceColorMap[sourceId];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      padding: "2px 8px",
      borderRadius: 20,
      background: s.bg,
      color: s.color,
      fontSize: 11,
      fontWeight: 550,
      letterSpacing: "0.01em",
      border: `1px solid ${s.color}22`
    }
  }, sourceNameMap[sourceId]);
}
function SectionLabel({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
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
function Arrow({
  direction = "down",
  label,
  color = COLORS.textLight,
  style
}) {
  const isDown = direction === "down";
  const isRight = direction === "right";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: isDown ? "column" : "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 2,
      padding: isDown ? "4px 0" : "0 4px",
      color,
      fontSize: 11,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: COLORS.textMuted,
      whiteSpace: "nowrap"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      lineHeight: 1
    }
  }, isDown ? "\u2193" : isRight ? "\u2192" : "\u2193"));
}
function LoopsSection() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: `2px dashed ${COLORS.border}`,
      borderRadius: 18,
      padding: "16px 16px 12px",
      margin: "12px 0",
      position: "relative",
      background: "rgba(0,0,0,0.01)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -11,
      left: "50%",
      transform: "translateX(-50%)",
      background: "#fff",
      padding: "2px 14px",
      borderRadius: 20,
      border: `1.5px solid ${COLORS.border}`,
      fontSize: 10,
      fontWeight: 600,
      color: COLORS.textMuted,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      whiteSpace: "nowrap"
    }
  }, "Reasoning cycle"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "auto 1fr auto",
      gap: 0,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 10px 0 2px",
      minWidth: 30
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "100%",
    style: {
      minHeight: 120
    }
  }, /*#__PURE__*/React.createElement("line", {
    x1: "10",
    y1: "95%",
    x2: "10",
    y2: "12",
    stroke: COLORS.dataRetrieval,
    strokeWidth: "1.5",
    strokeDasharray: "4 3",
    opacity: "0.4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 16L10 6L14 16",
    fill: "none",
    stroke: COLORS.dataRetrieval,
    strokeWidth: "1.5",
    strokeLinecap: "round",
    opacity: "0.5"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 8,
      fontWeight: 600,
      color: COLORS.dataRetrieval,
      opacity: 0.6,
      writingMode: "vertical-lr",
      transform: "rotate(180deg)",
      letterSpacing: "0.08em",
      marginTop: 4
    }
  }, "DATA")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: `1.5px solid ${COLORS.dataRetrieval}25`,
      borderRadius: 14,
      padding: 16,
      background: `${COLORS.dataRetrievalBg}40`,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -10,
      left: 16,
      background: COLORS.dataRetrievalBg,
      border: `1px solid ${COLORS.dataRetrieval}30`,
      borderRadius: 6,
      padding: "2px 10px",
      fontSize: 10,
      fontWeight: 600,
      color: COLORS.dataRetrieval,
      letterSpacing: "0.05em"
    }
  }, "DATA LOOP"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 0,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: COLORS.textMuted,
      marginBottom: 4
    }
  }, "Specialist needs data ", "\u2193"), /*#__PURE__*/React.createElement(NodeBox, {
    color: COLORS.dataRetrieval,
    bg: COLORS.dataRetrievalBg,
    style: {
      width: "100%",
      textAlign: "center",
      padding: "8px 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: COLORS.dataRetrieval
    }
  }, "Data retrieval"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: COLORS.textMuted,
      marginTop: 2
    }
  }, "Parallel queries, entity resolution")), /*#__PURE__*/React.createElement(Arrow, null), /*#__PURE__*/React.createElement(NodeBox, {
    color: COLORS.organize,
    bg: `${COLORS.organizeBg}80`,
    style: {
      width: "100%",
      textAlign: "center",
      padding: "8px 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: COLORS.organize
    }
  }, "Organize results"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: COLORS.textMuted,
      marginTop: 2
    }
  }, "Cache, summarize, attach charts")))), /*#__PURE__*/React.createElement("div", {
    style: {
      border: `1.5px solid ${COLORS.qualityBorder}50`,
      borderRadius: 14,
      padding: 16,
      background: `${COLORS.qualityBg}40`,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -10,
      left: 16,
      background: COLORS.qualityBg,
      border: `1px solid ${COLORS.qualityBorder}40`,
      borderRadius: 6,
      padding: "2px 10px",
      fontSize: 10,
      fontWeight: 600,
      color: COLORS.quality,
      letterSpacing: "0.05em"
    }
  }, "QUALITY LOOP"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 0,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: COLORS.textMuted,
      marginBottom: 4
    }
  }, "Specialist has draft answer ", "\u2193"), /*#__PURE__*/React.createElement(NodeBox, {
    color: COLORS.quality,
    bg: COLORS.qualityBg,
    borderColor: COLORS.qualityBorder,
    glow: true,
    style: {
      width: "100%",
      textAlign: "center",
      padding: "8px 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: COLORS.quality
    }
  }, "Quality review"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: COLORS.textMuted,
      marginTop: 2
    }
  }, "AI reviews its own work")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 6,
      width: "100%",
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "6px 4px",
      borderRadius: 8,
      background: "#EAF3DE",
      fontSize: 10,
      fontWeight: 600,
      color: "#3B6D11"
    }
  }, "Approved ", "\u2192"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "6px 4px",
      borderRadius: 8,
      background: "#FAEEDA",
      fontSize: 10,
      fontWeight: 600,
      color: "#854F0B"
    }
  }, "Refine ", "\u21A9"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "6px 4px",
      borderRadius: 8,
      background: "#FAECE7",
      fontSize: 10,
      fontWeight: 600,
      color: "#993C1D"
    }
  }, "Escalate ", "\u2192")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: COLORS.textMuted,
      marginTop: 6
    }
  }, "Max 2 refinement rounds")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 2px 0 10px",
      minWidth: 30
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "100%",
    style: {
      minHeight: 120
    }
  }, /*#__PURE__*/React.createElement("line", {
    x1: "10",
    y1: "95%",
    x2: "10",
    y2: "12",
    stroke: COLORS.qualityBorder,
    strokeWidth: "1.5",
    strokeDasharray: "4 3",
    opacity: "0.4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 16L10 6L14 16",
    fill: "none",
    stroke: COLORS.qualityBorder,
    strokeWidth: "1.5",
    strokeLinecap: "round",
    opacity: "0.5"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 8,
      fontWeight: 600,
      color: COLORS.quality,
      opacity: 0.6,
      writingMode: "vertical-lr",
      transform: "rotate(180deg)",
      letterSpacing: "0.08em",
      marginTop: 4
    }
  }, "REFINE"))));
}
function Diagram1() {
  const [hoverSpecialist, setHoverSpecialist] = useState(null);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 900,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 22,
      fontWeight: 600,
      color: COLORS.text,
      margin: 0,
      letterSpacing: "-0.02em"
    }
  }, "AI agent workflow"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: COLORS.textMuted,
      margin: "6px 0 0",
      maxWidth: 520,
      marginLeft: "auto",
      marginRight: "auto"
    }
  }, "Every question flows through authentication, safety, intent classification, specialist analysis, quality review, and real-time delivery.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 0
    }
  }, /*#__PURE__*/React.createElement(NodeBox, {
    color: "#185FA5",
    bg: "#E6F1FB",
    style: {
      minWidth: 340,
      textAlign: "center",
      padding: "14px 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14
    }
  }, "\u{1F512}"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "#185FA5"
    }
  }, "Identity & authorization")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: COLORS.textMuted,
      marginBottom: 8
    }
  }, "Authenticated and authorized before anything reaches the AI"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 5,
      justifyContent: "center"
    }
  }, ["Entra ID", "OpenFGA", "OAuth 2.0 / JWT", "Tenant isolation", "Audit logging"].map(tag => /*#__PURE__*/React.createElement("span", {
    key: tag,
    style: {
      fontSize: 9,
      fontWeight: 600,
      padding: "2px 8px",
      borderRadius: 4,
      background: "#fff",
      color: "#185FA5",
      border: "1px solid #185FA520"
    }
  }, tag)))), /*#__PURE__*/React.createElement(Arrow, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      margin: "8px 0 16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 2,
      background: COLORS.router,
      opacity: 0.25,
      borderRadius: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: COLORS.router,
      whiteSpace: "nowrap",
      background: COLORS.routerBg,
      padding: "5px 16px",
      borderRadius: 20,
      border: `1.5px solid ${COLORS.router}30`
    }
  }, "Agent workflow"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 2,
      background: COLORS.router,
      opacity: 0.25,
      borderRadius: 1
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(NodeBox, {
    color: COLORS.safety,
    bg: COLORS.safetyBg,
    style: {
      minWidth: 220,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: COLORS.safety
    }
  }, "Guardrails"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: COLORS.textMuted,
      marginTop: 2
    }
  }, "Prompt injection, topic boundaries, content filtering"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "stretch",
      gap: 0,
      position: "relative",
      width: 340
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Arrow, {
    label: "passed"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: -120,
      top: 0,
      display: "flex",
      alignItems: "center",
      gap: 6,
      color: "#A32D2D",
      fontSize: 11
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 8
    }
  }, "\u2192"), /*#__PURE__*/React.createElement("span", {
    style: {
      background: "#FCEBEB",
      border: "1px solid #F0959540",
      borderRadius: 8,
      padding: "4px 10px",
      fontSize: 11,
      fontWeight: 500,
      color: "#A32D2D"
    }
  }, "Blocked \u2014 polite error"))), /*#__PURE__*/React.createElement(NodeBox, {
    color: COLORS.memory,
    bg: COLORS.memoryBg,
    style: {
      minWidth: 240,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: COLORS.memory
    }
  }, "Conversation memory"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: COLORS.textMuted,
      marginTop: 2
    }
  }, "Sliding window, context management"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: COLORS.textLight,
      marginTop: 2,
      fontStyle: "italic"
    }
  }, "Optimized for query efficiency and cost")), /*#__PURE__*/React.createElement(Arrow, null), /*#__PURE__*/React.createElement(NodeBox, {
    color: COLORS.router,
    bg: COLORS.routerBg,
    style: {
      minWidth: 280,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: COLORS.router
    }
  }, "Question understanding"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: COLORS.textMuted,
      marginTop: 2
    }
  }, "AI classifies intent and complexity"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: COLORS.textLight,
      marginTop: 3,
      fontStyle: "italic"
    }
  }, "May invoke multiple specialists for complex questions")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "80%",
      maxWidth: 760,
      height: 36,
      margin: "0 0 -4px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "50%",
      top: 0,
      width: 1,
      height: 12,
      background: COLORS.router,
      opacity: 0.5
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "15%",
      right: "15%",
      top: 12,
      height: 1,
      background: COLORS.router,
      opacity: 0.4
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "15%",
      top: 12,
      width: 1,
      height: 14,
      background: COLORS.router,
      opacity: 0.4
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "calc(15% - 3px)",
      top: 24,
      fontSize: 10,
      color: COLORS.router,
      opacity: 0.5,
      lineHeight: 1
    }
  }, "\u25BC"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "50%",
      top: 12,
      width: 1,
      height: 14,
      background: COLORS.router,
      opacity: 0.4
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "calc(50% - 3px)",
      top: 24,
      fontSize: 10,
      color: COLORS.router,
      opacity: 0.5,
      lineHeight: 1
    }
  }, "\u25BC"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: "15%",
      top: 12,
      width: 1,
      height: 14,
      background: COLORS.router,
      opacity: 0.4
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: "calc(15% - 3px)",
      top: 24,
      fontSize: 10,
      color: COLORS.router,
      opacity: 0.5,
      lineHeight: 1
    }
  }, "\u25BC"))), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "0 0 0",
      padding: "20px 16px",
      background: "linear-gradient(180deg, rgba(83,74,183,0.03) 0%, transparent 100%)",
      borderRadius: 16,
      border: `1px dashed ${COLORS.border}`,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "N specialized AI agents"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 10
    }
  }, specialists.map(s => /*#__PURE__*/React.createElement(NodeBox, {
    key: s.id,
    color: s.color,
    bg: s.bg,
    featured: hoverSpecialist === s.id,
    onMouseEnter: () => setHoverSpecialist(s.id),
    onMouseLeave: () => setHoverSpecialist(null),
    style: {
      cursor: "default",
      padding: "10px 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14
    }
  }, s.icon), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: s.color
    }
  }, s.name)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: COLORS.textMuted,
      lineHeight: 1.35,
      marginBottom: 6
    }
  }, s.desc), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 3
    }
  }, s.sources.map(src => /*#__PURE__*/React.createElement("span", {
    key: src,
    style: {
      fontSize: 9,
      fontWeight: 550,
      padding: "1px 5px",
      borderRadius: 4,
      background: sourceColorMap[src].bg,
      color: sourceColorMap[src].color,
      border: `0.5px solid ${sourceColorMap[src].color}20`
    }
  }, sourceNameMap[src]))))))), /*#__PURE__*/React.createElement(LoopsSection, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 0
    }
  }, /*#__PURE__*/React.createElement(Arrow, {
    label: "approved"
  }), /*#__PURE__*/React.createElement(NodeBox, {
    color: COLORS.prepare,
    bg: COLORS.prepareBg,
    style: {
      minWidth: 300,
      textAlign: "center",
      padding: "14px 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: COLORS.prepare
    }
  }, "Assemble your answer"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: COLORS.textMuted,
      marginTop: 2
    }
  }, "Packages the full picture for delivery"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      justifyContent: "center",
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      fontSize: 10,
      fontWeight: 600,
      padding: "3px 10px",
      borderRadius: 6,
      background: "#EEEDFE",
      color: "#534AB7",
      border: "1px solid #534AB720"
    }
  }, "\u{1F4CA}", " Auto-generated charts"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      fontSize: 10,
      fontWeight: 500,
      padding: "3px 10px",
      borderRadius: 6,
      background: "#f5f5f3",
      color: COLORS.textMuted
    }
  }, "Context references"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      fontSize: 10,
      fontWeight: 500,
      padding: "3px 10px",
      borderRadius: 6,
      background: "#f5f5f3",
      color: COLORS.textMuted
    }
  }, "Key metrics"))), /*#__PURE__*/React.createElement(Arrow, null), /*#__PURE__*/React.createElement(NodeBox, {
    color: COLORS.deliver,
    bg: COLORS.deliverBg,
    style: {
      minWidth: 260,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: COLORS.deliver
    }
  }, "Deliver to business"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: COLORS.textMuted,
      marginTop: 2
    }
  }, "Results arrive in real time"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      paddingTop: 20,
      borderTop: `1px dashed ${COLORS.border}`
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Connected data sources"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 10
    }
  }, dataSources.map(ds => /*#__PURE__*/React.createElement(NodeBox, {
    key: ds.id,
    color: ds.color,
    bg: ds.bg,
    featured: ds.featured,
    style: {
      padding: "10px 12px",
      borderWidth: ds.featured ? 2 : 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14
    }
  }, ds.icon), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: ds.color
    }
  }, ds.name)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: COLORS.textMuted,
      lineHeight: 1.35,
      marginBottom: 4
    }
  }, ds.desc), ds.via && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      fontWeight: 600,
      padding: "2px 6px",
      borderRadius: 4,
      background: ds.featured ? `${ds.color}15` : "#f5f5f3",
      color: ds.featured ? ds.color : COLORS.textMuted
    }
  }, ds.via))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      padding: "14px 20px",
      borderRadius: 12,
      background: "#f8f8f6",
      border: `1px solid ${COLORS.border}`,
      display: "flex",
      alignItems: "flex-start",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      marginTop: 1,
      flexShrink: 0
    }
  }, "\u{1F50D}"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: COLORS.text,
      marginBottom: 2
    }
  }, "End-to-end observability"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: COLORS.textMuted,
      lineHeight: 1.5
    }
  }, "Every step is traced \u2014 latency, token usage, tool calls, and quality scores. Full observability from day one means we continuously refine routing accuracy, response quality, and cost efficiency as the system runs."))));
}
function Diagram2() {
  const [activeSpecialist, setActiveSpecialist] = useState(null);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 900,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 22,
      fontWeight: 600,
      color: COLORS.text,
      margin: 0,
      letterSpacing: "-0.02em"
    }
  }, "Specialized AI agents"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: COLORS.textMuted,
      margin: "6px 0 0",
      maxWidth: 480,
      marginLeft: "auto",
      marginRight: "auto"
    }
  }, "Ask anything about your business in plain English. AI specialists pull the answer from your connected systems \u2014 and check their own work before delivering it.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      background: COLORS.qualityBg,
      border: `1px solid ${COLORS.qualityBorder}40`,
      borderRadius: 20,
      padding: "6px 16px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: COLORS.quality
    }
  }, "Every answer is reviewed before delivery"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 14
    }
  }, specialists.map(s => {
    const isActive = activeSpecialist === s.id;
    return /*#__PURE__*/React.createElement("div", {
      key: s.id,
      onClick: () => setActiveSpecialist(isActive ? null : s.id),
      style: {
        background: "#fff",
        border: `1.5px solid ${isActive ? s.color : COLORS.border}`,
        borderRadius: 14,
        padding: "18px 20px",
        cursor: "pointer",
        transition: "all 0.2s",
        boxShadow: isActive ? `0 0 0 3px ${s.color}12, 0 4px 16px ${s.color}08` : "0 1px 3px rgba(0,0,0,0.03)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 32,
        height: 32,
        borderRadius: 8,
        background: s.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 16,
        border: `1px solid ${s.color}20`
      }
    }, s.icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: s.color
      }
    }, s.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: COLORS.textMuted
      }
    }, s.desc))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 4
      }
    }, s.sources.map(src => /*#__PURE__*/React.createElement("div", {
      key: src,
      style: {
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: sourceColorMap[src].color,
        opacity: 0.6
      },
      title: sourceNameMap[src]
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 5
      }
    }, s.questions.map((q, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: 6,
        padding: "6px 10px",
        borderRadius: 8,
        background: i === 0 ? s.bg : "#f8f8f6",
        fontSize: 12,
        color: i === 0 ? s.color : COLORS.textMuted,
        fontWeight: i === 0 ? 500 : 400,
        lineHeight: 1.35,
        border: `0.5px solid ${i === 0 ? s.color + '20' : 'transparent'}`
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        opacity: 0.5,
        flexShrink: 0
      }
    }, "\u201C"), /*#__PURE__*/React.createElement("span", null, q), /*#__PURE__*/React.createElement("span", {
      style: {
        opacity: 0.5,
        flexShrink: 0
      }
    }, "\u201D")))), isActive && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12,
        paddingTop: 12,
        borderTop: `1px solid ${COLORS.border}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 20
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        fontWeight: 600,
        color: COLORS.textLight,
        marginBottom: 4,
        letterSpacing: "0.08em",
        textTransform: "uppercase"
      }
    }, "Tools"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: 4
      }
    }, s.tools.map(t => /*#__PURE__*/React.createElement("span", {
      key: t,
      style: {
        fontSize: 10,
        padding: "2px 7px",
        borderRadius: 4,
        background: "#f5f5f3",
        color: COLORS.textMuted
      }
    }, t)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        fontWeight: 600,
        color: COLORS.textLight,
        marginBottom: 4,
        letterSpacing: "0.08em",
        textTransform: "uppercase"
      }
    }, "Sources"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: 4
      }
    }, s.sources.map(src => /*#__PURE__*/React.createElement(SourcePill, {
      key: src,
      sourceId: src
    })))))));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      display: "flex",
      justifyContent: "center",
      gap: 16,
      flexWrap: "wrap"
    }
  }, dataSources.map(ds => /*#__PURE__*/React.createElement("div", {
    key: ds.id,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: 12,
      color: COLORS.textMuted
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: ds.color,
      opacity: 0.6,
      border: ds.featured ? `2px solid ${ds.color}` : "none",
      boxSizing: "border-box"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: ds.featured ? 600 : 400,
      color: ds.featured ? ds.color : undefined
    }
  }, ds.name)))));
}
function Diagram3() {
  const [activeStep, setActiveStep] = useState(null);
  const steps = [{
    id: "question",
    label: "Business asks",
    detail: "\u201CWhy doesn\u2019t my bank match my sales report?\u201D",
    color: COLORS.text,
    bg: "#fff",
    type: "user"
  }, {
    id: "safety",
    label: "Safety check",
    detail: "Confirms business identity \u2014 passed",
    color: COLORS.safety,
    bg: COLORS.safetyBg,
    type: "system"
  }, {
    id: "memory",
    label: "Conversation memory",
    detail: "First question \u2014 no prior context needed",
    color: COLORS.memory,
    bg: COLORS.memoryBg,
    type: "system"
  }, {
    id: "router",
    label: "Question understanding",
    detail: "Classifies as \u201Creconciliation\u201D \u2192 routes to Reconciliation specialist",
    color: COLORS.router,
    bg: COLORS.routerBg,
    type: "system"
  }, {
    id: "specialist1",
    label: "Reconciliation specialist",
    detail: "Starts comparing your bank records against your sales data",
    color: COLORS.reconciliation,
    bg: COLORS.reconciliationBg,
    type: "specialist"
  }, {
    id: "fanout",
    label: "Data retrieval",
    detail: "Parallel queries across all four sources",
    color: COLORS.dataRetrieval,
    bg: COLORS.dataRetrievalBg,
    type: "fanout"
  }, {
    id: "organize",
    label: "Organize results",
    detail: "Caches raw data, builds condensed summary, attaches comparison chart",
    color: COLORS.organize,
    bg: COLORS.organizeBg,
    type: "system"
  }, {
    id: "specialist2",
    label: "Reconciliation specialist",
    detail: "Drafts response explaining the gap between bank and sales",
    color: COLORS.reconciliation,
    bg: COLORS.reconciliationBg,
    type: "specialist"
  }, {
    id: "quality1",
    label: "Quality review",
    detail: "\u201CYou identified the timing difference but didn\u2019t explain what the business should do about it. Refine.\u201D",
    color: COLORS.quality,
    bg: COLORS.qualityBg,
    type: "quality",
    verdict: "refine"
  }, {
    id: "specialist3",
    label: "Reconciliation specialist",
    detail: "Adds actionable advice: \u201CTwo deposits from Friday are still in transit and will post Monday. Your bank balance will match within $12 of Clover sales.\u201D",
    color: COLORS.reconciliation,
    bg: COLORS.reconciliationBg,
    type: "specialist"
  }, {
    id: "quality2",
    label: "Quality review",
    detail: "Numbers consistent, question answered, actionable \u2014 approved",
    color: COLORS.quality,
    bg: COLORS.qualityBg,
    type: "quality",
    verdict: "approved"
  }, {
    id: "prepare",
    label: "Assemble your answer",
    detail: "Packages the explanation with an auto-generated comparison chart and key metrics",
    color: COLORS.prepare,
    bg: COLORS.prepareBg,
    type: "system"
  }, {
    id: "deliver",
    label: "Deliver to business",
    detail: "Results arrive in real time",
    color: COLORS.deliver,
    bg: COLORS.deliverBg,
    type: "delivery"
  }];
  const fanoutSources = [{
    id: "database",
    name: "Your database",
    detail: "Deposits & batches for the period",
    icon: "\u{1F5C4}\uFE0F"
  }, {
    id: "clover",
    name: "Clover",
    detail: "Sales totals & refunds",
    icon: "\u2618\uFE0F"
  }, {
    id: "plaid",
    name: "Financial institutions",
    detail: "Bank transactions & posted deposits",
    icon: "\u{1F3E6}"
  }, {
    id: "quickbooks",
    name: "Accounting",
    detail: "Recorded revenue entries",
    icon: "\u{1F4D2}"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 680,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 22,
      fontWeight: 600,
      color: COLORS.text,
      margin: 0,
      letterSpacing: "-0.02em"
    }
  }, "Follow the question"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: COLORS.textMuted,
      margin: "6px 0 0"
    }
  }, "What happens when a business types a question \u2014 traced step by step.")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 23,
      top: 20,
      bottom: 20,
      width: 1,
      background: COLORS.border,
      zIndex: 0
    }
  }), steps.map((step, i) => /*#__PURE__*/React.createElement("div", {
    key: step.id + i,
    style: {
      position: "relative",
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16,
      alignItems: "flex-start",
      marginBottom: step.type === "fanout" ? 0 : step.type === "delivery" ? 0 : 6,
      cursor: "pointer"
    },
    onClick: () => setActiveStep(activeStep === step.id + i ? null : step.id + i)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 12,
      height: 12,
      borderRadius: "50%",
      background: step.type === "quality" ? COLORS.qualityBorder : step.type === "user" ? COLORS.text : step.type === "specialist" ? step.color : step.bg,
      border: `2px solid ${step.type === "quality" ? COLORS.qualityBorder : step.color}`,
      marginTop: 6,
      flexShrink: 0,
      boxShadow: step.type === "quality" ? `0 0 0 3px ${COLORS.qualityBorder}20` : "none",
      marginLeft: 16
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: step.color
    }
  }, step.label), step.verdict === "refine" && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 600,
      padding: "1px 6px",
      borderRadius: 4,
      background: "#FAEEDA",
      color: "#854F0B"
    }
  }, "REFINE"), step.verdict === "approved" && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 600,
      padding: "1px 6px",
      borderRadius: 4,
      background: "#EAF3DE",
      color: "#3B6D11"
    }
  }, "APPROVED")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: COLORS.textMuted,
      lineHeight: 1.45,
      fontStyle: step.type === "user" ? "italic" : "normal",
      maxWidth: 500
    }
  }, step.detail))), step.type === "fanout" && /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 48,
      marginTop: 8,
      marginBottom: 12,
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 8
    }
  }, fanoutSources.map(fs => /*#__PURE__*/React.createElement("div", {
    key: fs.id,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "8px 12px",
      borderRadius: 10,
      background: sourceColorMap[fs.id].bg,
      border: `1px solid ${sourceColorMap[fs.id].color}20`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16
    }
  }, fs.icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: sourceColorMap[fs.id].color
    }
  }, fs.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: COLORS.textMuted
    }
  }, fs.detail)))), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "1 / -1",
      textAlign: "center",
      fontSize: 10,
      color: COLORS.dataRetrieval,
      fontWeight: 500,
      padding: "2px 0"
    }
  }, "All four sources queried in parallel")), step.verdict === "refine" && /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 36,
      marginTop: 2,
      marginBottom: 2,
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: COLORS.qualityBorder
    }
  }, "\u21A9"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: COLORS.quality,
      fontWeight: 500
    }
  }, "Sent back to specialist with specific feedback")), step.type === "delivery" && /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 48,
      marginTop: 12,
      background: "#fff",
      border: `1.5px solid ${COLORS.border}`,
      borderRadius: 14,
      overflow: "hidden",
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 14px",
      background: "#f8f8f6",
      borderBottom: `1px solid ${COLORS.border}`,
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "#F09595"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "#FAC775"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "#97C459"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: COLORS.textMuted,
      marginLeft: 8
    }
  }, "What the business sees")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: "8px 12px",
      borderRadius: 8,
      background: "#f5f5f3",
      fontSize: 12,
      color: COLORS.textMuted,
      fontStyle: "italic"
    }
  }, "Checking your sales, deposits, and bank records...")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 8,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: "10px 14px",
      borderRadius: 10,
      border: `1px solid ${COLORS.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: COLORS.textMuted,
      marginBottom: 6
    }
  }, "Reconciliation summary"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: COLORS.textLight
    }
  }, "Clover sales"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      color: COLORS.clover
    }
  }, "$4,827")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: COLORS.textLight
    }
  }, "Bank deposits"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      color: COLORS.plaid
    }
  }, "$3,512")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: COLORS.textLight
    }
  }, "Difference"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      color: "#D85A30"
    }
  }, "$1,315"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 8,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: "10px 14px",
      borderRadius: 10,
      border: `1px solid ${COLORS.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: COLORS.textMuted,
      marginBottom: 8
    }
  }, "Gap breakdown"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: COLORS.textMuted,
      width: 100,
      textAlign: "right"
    }
  }, "In-transit deposits"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: "#f0f0ee",
      borderRadius: 3,
      height: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "92%",
      background: COLORS.reconciliationLight,
      borderRadius: 3,
      height: 14,
      display: "flex",
      alignItems: "center",
      paddingLeft: 6,
      fontSize: 10,
      fontWeight: 600,
      color: COLORS.reconciliation
    }
  }, "$1,303"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: COLORS.textMuted,
      width: 100,
      textAlign: "right"
    }
  }, "Processing fees"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: "#f0f0ee",
      borderRadius: 3,
      height: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "8%",
      minWidth: 40,
      background: COLORS.chargebackLight,
      borderRadius: 3,
      height: 14,
      display: "flex",
      alignItems: "center",
      paddingLeft: 6,
      fontSize: 10,
      fontWeight: 600,
      color: COLORS.chargeback
    }
  }, "$12")))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      fontSize: 12,
      lineHeight: 1.55,
      color: COLORS.text
    }
  }, "Two deposits from Friday ($847 and $456) are still in transit and will post Monday. Once they do, your bank balance will match within $12 of your Clover sales. That remaining $12 is your processing fee for the period."))))))));
}
function Diagram4() {
  const pillars = [{
    title: "Hierarchy applied to every answer",
    desc: "Your organizational structure — portfolios, sales channels, regions — is enforced on every single request. A portfolio manager sees their book; a regional lead sees their region. Two people can ask the identical question and each receives an answer built only from the rows they are entitled to see.",
    color: COLORS.router
  }, {
    title: "Deterministic where it counts",
    desc: "Any answer a user trusts can be pinned — freezing the exact query so it replays identically every time. Recurring business questions run certified, repeatable logic; the numbers are consistent, reconcilable against reports, and defensible in front of your own leadership.",
    color: COLORS.router
  }, {
    title: "Security domains don’t leak",
    desc: "Authorization isn’t a login-time check — it is enforced at the moment each query executes, inside the platform, below the AI. There is no conversation, prompt, or phrasing that can pull data across an entitlement boundary, because the boundary is applied to the data itself.",
    color: COLORS.router
  }, {
    title: "Sensitive data never meets the AI",
    desc: "Cardholder account numbers are tokenized before data ever reaches the analytics platform. The AI operates entirely on protected, de-identified data — supporting our PCI DSS obligations by design rather than by policy.",
    color: COLORS.router
  }, {
    title: "Production stays untouched",
    desc: "Ask Nanci reads from a dedicated, governed analytics platform. Live payment processing systems are never queried, so conversational analytics can scale without ever competing with the systems that move your money.",
    color: COLORS.router
  }, {
    title: "Governed AI, not experimental AI",
    desc: "The language model is one component in a controlled pipeline. It can only reach data through the tool gateway, every request is authorized at execution time, and trusted answers graduate into a pinned, auditable library. That is the difference between an AI feature and an AI platform you can put in front of clients.",
    color: COLORS.quality,
    accent: true
  }];
  const pText = {
    fontSize: 12.5,
    color: COLORS.textMuted,
    lineHeight: 1.6,
    marginBottom: 10
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 780,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: COLORS.router,
      marginBottom: 10
    }
  }, "Aperia Solutions \xB7 Conceptual Architecture Brief"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 24,
      fontWeight: 600,
      color: COLORS.text,
      margin: 0,
      letterSpacing: "-0.02em"
    }
  }, "Ask Nanci: answers you can trust, from data you control"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: COLORS.textMuted,
      margin: "10px 0 0",
      maxWidth: 640,
      marginLeft: "auto",
      marginRight: "auto"
    }
  }, "Ask Nanci lets merchants and partners ask questions of their payments data in plain English \u2014 and get answers that are governed, repeatable, and scoped to exactly what they are entitled to see. This brief describes how the platform achieves that, at a conceptual level.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "The idea in one paragraph"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: COLORS.textMuted,
      lineHeight: 1.65,
      maxWidth: 700
    }
  }, "Most conversational AI products put a language model directly in front of a database and hope for the best. Ask Nanci is built the opposite way. The AI never touches data directly \u2014 it works through a controlled chain of services. It interprets the question and composes a query through a governed tool layer, and every single request passes through an authorization gate that applies the client\u2019s organizational hierarchy before any data is read. When a user finds an answer they trust, they pin it, and that question becomes deterministic forever after. The AI is the interpreter; the platform is the enforcer.")), /*#__PURE__*/React.createElement("div", {
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
  }, "Understands the question and the intent \u2014"), /*#__PURE__*/React.createElement("text", {
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
  }, "The only path to data \u2014 every query,"), /*#__PURE__*/React.createElement("text", {
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
  }, "pinned \u2014 frozen queries that"), /*#__PURE__*/React.createElement("text", {
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
  }, "organizational hierarchy \u2014 row by row"), /*#__PURE__*/React.createElement("rect", {
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
  }, "Governed Data Access Layer (DAB)"), /*#__PURE__*/React.createElement("text", {
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
  }, "query \u2014 read-only by construction"), /*#__PURE__*/React.createElement("line", {
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
  }, "Isolated from live payment processing \u2014"), /*#__PURE__*/React.createElement("text", {
    x: "540",
    y: "662",
    textAnchor: "middle",
    fill: "#CADCFC",
    fontSize: "12.5"
  }, "analytics never touches production"), /*#__PURE__*/React.createElement("rect", {
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
  }, "are tokenized before analytics \u2014"), /*#__PURE__*/React.createElement("text", {
    x: "910",
    y: "596",
    textAnchor: "middle",
    fill: "#3D4A5C",
    fontSize: "12"
  }, "the AI can never see them."), /*#__PURE__*/React.createElement("text", {
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
      fontSize: 12,
      color: COLORS.textMuted,
      lineHeight: 1.6,
      marginTop: 16,
      maxWidth: 700
    }
  }, "Every hop is a narrowing of what is possible. The AI translates the question into a query through the tool gateway; the authorization gate applies the client hierarchy to every request \u2014 exploratory or pinned; the data access layer executes a read-only, scoped query against an analytics platform that is physically separate from payment processing. Answers the user approves can be pinned, and pinned questions replay the exact same query every time.")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 24px",
      borderRadius: 14,
      background: "#f8f8f6",
      border: `1px solid ${COLORS.border}`,
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Design concept \xB7 Query Pinning"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      color: COLORS.text,
      marginBottom: 10
    }
  }, "Explore freely, then pin what matters"), /*#__PURE__*/React.createElement("p", {
    style: pText
  }, "Query pinning is the platform\u2019s answer to the central tension in conversational analytics: users want the freedom to ask anything, but the business needs numbers that are consistent, repeatable, and defensible. Ask Nanci delivers both by separating exploration from certification. When a user asks a new question, the AI composes the query itself through the platform\u2019s tool layer \u2014 full conversational flexibility, with every request still passing through the authorization gate and the governed data access layer."), /*#__PURE__*/React.createElement("p", {
    style: pText
  }, "When the user gets an answer they trust, they pin it. Pinning freezes the exact query behind that answer \u2014 the logic, the joins, the definitions \u2014 into the pinned query library. From that moment on, asking that question replays the identical query every time: same math, same result shape, same certified logic. The only thing that varies is the authorization scope of whoever is asking. Yesterday\u2019s exploratory answer becomes tomorrow\u2019s guaranteed metric."), /*#__PURE__*/React.createElement("p", {
    style: {
      ...pText,
      marginBottom: 0
    }
  }, "This gives the platform a property conversational AI usually lacks: determinism where it counts. The questions that run a business \u2014 the ones asked every Monday, quoted in board decks, reconciled against reports \u2014 become pinned, auditable, and immune to the natural variability of AI-generated queries. Every pinned query has a known cost, a known result shape, and a complete execution record. Accuracy stops being a hope and becomes a property of the library \u2014 a library your users build themselves, one trusted answer at a time.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "What this architecture means for our clients"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 12
    }
  }, pillars.map(p => /*#__PURE__*/React.createElement(NodeBox, {
    key: p.title,
    color: p.color,
    bg: p.accent ? COLORS.qualityBg : "#fff",
    style: {
      padding: "14px 16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: p.color,
      marginBottom: 4
    }
  }, p.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: COLORS.textMuted,
      lineHeight: 1.5
    }
  }, p.desc))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      paddingTop: 16,
      borderTop: `1px dashed ${COLORS.border}`,
      textAlign: "center",
      fontSize: 11,
      color: COLORS.textLight
    }
  }, "Aperia Solutions \xB7 Ask Nanci conceptual architecture \xB7 Prepared for executive and partner audiences \xB7 Component names are conceptual; detailed technical architecture available under NDA."));
}
function Diagram5() {
  const stages = [{
    n: 1,
    model: "Serverless · GPT-4.1 mini",
    title: "Rent it",
    desc: "Use a managed cloud endpoint. Nothing to install, live in days, pay only per use. Perfect for proving the pilot — but the meter grows with usage."
  }, {
    n: 2,
    model: "Managed compute · Qwen3 8B",
    title: "Reserve a dedicated engine",
    desc: "Run our open model on a dedicated cloud GPU that Azure operates for us. Production-grade, still no cluster to manage — the bridge to owning it."
  }, {
    n: 3,
    model: "Self-hosted · Qwen3 8B",
    title: "Own and run it",
    desc: "Host the model on our own Kubernetes (AKS) cluster. Fixed, predictable cost, tightest data control, and the model fully in our hands at scale."
  }];
  const delivers = [{
    title: "Speed & low risk to start",
    desc: "A working ISO pilot in days on a managed model, zero infrastructure."
  }, {
    title: "Ownership & independence",
    desc: "The production model is ours to run, tune and control; no vendor lock-in."
  }, {
    title: "Predictable economics",
    desc: "Self-hosting replaces a per-token meter with fixed, reserved cost as volume grows."
  }, {
    title: "Data control & compliance",
    desc: "Everything runs inside Aperia’s boundary, fit for a PCI / payments platform."
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 780,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: COLORS.router,
      marginBottom: 10
    }
  }, "Executive Summary \xB7 AI Token Optimization Program"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 24,
      fontWeight: 600,
      color: COLORS.text,
      margin: 0,
      letterSpacing: "-0.02em"
    }
  }, "An open model we own, reached by a fast, low-risk path"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: COLORS.textMuted,
      margin: "10px 0 0",
      maxWidth: 660,
      marginLeft: "auto",
      marginRight: "auto"
    }
  }, "Model selection & hosting strategy for the merchant / ISO conversational-analytics agents.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "The approach"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: COLORS.textMuted,
      lineHeight: 1.65,
      maxWidth: 700
    }
  }, "We launch quickly on a rented, managed model to prove the experience, then move the production workload onto an ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: COLORS.text
    }
  }, "open model we host and control ourselves"), ". Start on a managed cloud model to validate the merchant and ISO experience in days, with no infrastructure to build. Once proven, migrate to an open model that runs entirely inside Aperia\u2019s own environment. The customer-facing product stays the same throughout \u2014 only the engine behind it changes, and each change is a redeploy rather than a rebuild.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Why Qwen3 8B is the recommended open model"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: COLORS.textMuted,
      lineHeight: 1.65,
      maxWidth: 700
    }
  }, "Across a weighted evaluation of small (\u226415B) open models \u2014 scored on tool-calling, reasoning, efficiency and enterprise fit \u2014 ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: COLORS.text
    }
  }, "Qwen3 8B"), " ranks first on capability. It has strong tool/function calling for our MCP + DAB orchestration, runs efficiently on a single GPU, and ships under a clean, commercial-friendly ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: COLORS.text
    }
  }, "Apache 2.0"), " license. Because we self-host it, the weights run inside our own boundary \u2014 no customer data leaves and there is no callback to the vendor. Adoption remains subject to a provenance governance sign-off.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "How we host it: three simple stages"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "stretch"
    }
  }, stages.map((s, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: s.n
  }, /*#__PURE__*/React.createElement(NodeBox, {
    color: COLORS.router,
    style: {
      flex: 1,
      background: "#fbfcfe"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 24,
      height: 24,
      borderRadius: "50%",
      background: COLORS.router,
      color: "#fff",
      fontWeight: 700,
      fontSize: 12,
      marginBottom: 8
    }
  }, s.n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: COLORS.router,
      textTransform: "uppercase",
      letterSpacing: "0.04em",
      marginBottom: 3
    }
  }, s.model), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: COLORS.text,
      marginBottom: 4
    }
  }, s.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: COLORS.textMuted,
      lineHeight: 1.5
    }
  }, s.desc)), i < stages.length - 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      alignSelf: "center",
      color: COLORS.router,
      fontSize: 18,
      fontWeight: 700
    }
  }, "\u2192")))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: COLORS.textMuted,
      marginTop: 10
    }
  }, "Think of it as ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: COLORS.text
    }
  }, "rent \u2192 lease \u2192 own"), ": rent to start fast and cheap, lease to harden it in production, own it to lock in predictable cost and control.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 32,
      background: COLORS.profitBg,
      border: `1px solid ${COLORS.profitLight}`,
      borderRadius: 10,
      padding: "18px 20px"
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "What \u201Copen model\u201D means \u2014 and how it lets us own the IP"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12.5,
      color: COLORS.textMuted,
      lineHeight: 1.6,
      marginBottom: 8
    }
  }, "A ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: COLORS.text
    }
  }, "closed model"), " (like a typical hosted AI API) is a black box we can only rent: the provider holds the actual model, we send data in and get answers back, and we pay per call for as long as we use it. We never possess the thing doing the work."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12.5,
      color: COLORS.textMuted,
      lineHeight: 1.6,
      margin: 0
    }
  }, "An ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: COLORS.text
    }
  }, "open model"), " ships its full weights under a license (Apache 2.0) that lets us download, run, modify and deploy it freely. Once we self-host those weights, the working model becomes an asset Aperia owns and controls \u2014 it runs on our infrastructure, inside our security boundary, on our schedule. We can version it, fine-tune it on our own data to build proprietary domain expertise, and keep running it with no per-token bill and no dependence on a vendor\u2019s pricing, availability or terms. That is how an open model turns the LLM itself into intellectual property we own rather than a service we rent.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "What this delivers"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10
    }
  }, delivers.map((d, i) => /*#__PURE__*/React.createElement(NodeBox, {
    key: i,
    color: COLORS.quality,
    featured: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: COLORS.quality,
      marginBottom: 4
    }
  }, d.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: COLORS.textMuted,
      lineHeight: 1.5
    }
  }, d.desc))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      paddingTop: 16,
      borderTop: `1px dashed ${COLORS.border}`,
      textAlign: "center",
      fontSize: 11,
      color: COLORS.textLight
    }
  }, "Aperia Solutions \xB7 AI Customer Interface \u2014 Executive Briefing \xB7 Illustrative model / hosting figures \u2014 verify before commitment."));
}
function App() {
  const [tab, setTab] = useState(0);
  const tabs = [{
    label: "Architecture summary",
    component: Diagram4
  }, {
    label: "Model summary",
    component: Diagram5
  }, {
    label: "AI agent workflow",
    component: Diagram1
  }, {
    label: "Specialized AI agents",
    component: Diagram2
  }, {
    label: "Follow the question",
    component: Diagram3
  }];
  const ActiveDiagram = tabs[tab].component;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: COLORS.text,
      padding: "24px 20px 40px",
      minHeight: "100vh",
      background: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      justifyContent: "center",
      marginBottom: 32,
      background: "#f5f5f3",
      borderRadius: 10,
      padding: 3,
      maxWidth: 860,
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
      fontSize: 13,
      cursor: "pointer",
      transition: "all 0.2s",
      boxShadow: tab === i ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
      fontFamily: "inherit"
    }
  }, t.label))), /*#__PURE__*/React.createElement(ActiveDiagram, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));

})();
