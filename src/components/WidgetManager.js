import React from "react";

const WidgetManager = ({ widgets, onWidgetToggle }) => {
  return (
    <div style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <h3>Manage Widgets</h3>
      <div style={{ display: "flex", gap: "1rem" }}>
        {Object.keys(widgets).map((widgetKey) => (
          <button key={widgetKey} onClick={() => onWidgetToggle(widgetKey)}>
            {widgets[widgetKey] ? `Hide ${widgetKey}` : `Show ${widgetKey}`}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WidgetManager;
