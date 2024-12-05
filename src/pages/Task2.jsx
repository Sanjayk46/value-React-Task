import React, { useState } from "react";
import './Home.css';
const NestedListComponent = () => {
  const [expandedNodes, setExpandedNodes] = useState([]);

  // Sample data structure for nested elements
  const data = [
    {
      name: "Applications",
      children: [
        { name: "App1" },
        { name: "App2" },
        {
          name: "App3",
          children: [{ name: "App3-1" }, { name: "App3-2" }],
        },
      ],
    },
    {
      name: "Users",
      children: [
        {
          name: "Guest",
          children: [
            { name: "Documents" },
            { name: "Downloads" },
            {
              name: "Media",
              children: [{ name: "Movies" }, { name: "Pictures" }],
            },
          ],
        },
        { name: "Admin" },
      ],
    },
    { name: "System" },
    { name: "Library" },
  ];

  const toggleExpand = (name) => {
    if (expandedNodes.includes(name)) {
      setExpandedNodes(expandedNodes.filter((node) => node !== name));
    } else {
      setExpandedNodes([...expandedNodes, name]);
    }
  };

  const renderList = (items, level = 1) => {
    if (level > 3) return null; // Limit to 3 levels
    return (
      <ul>
        {items.map((item) => (
          <li key={item.name}>
            <div
              style={{ cursor: item.children ? "pointer" : "default" }}
              onClick={() => item.children && toggleExpand(item.name)}
            >
              {item.name} {item.children && (expandedNodes.includes(item.name) ? "[-]" : "[+]")}
            </div>
            {item.children && expandedNodes.includes(item.name) && renderList(item.children, level + 1)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h3>Nested List Component</h3>
      {renderList(data)}
    </div>
  );
};

export default NestedListComponent;
