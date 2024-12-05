import React, { useState } from "react";

const NestedListWithPathBar = () => {
  const [expandedNodes, setExpandedNodes] = useState([]); // Tracks expanded nodes
  const [path, setPath] = useState([]); // Tracks the breadcrumb path

  // Sample data structure
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

  // Toggle expand/collapse of nodes
  const toggleExpand = (item, level, parentPath) => {
    const nodePath = parentPath ? `${parentPath}/${item.name}` : item.name;
    console.log(nodePath)
    if (expandedNodes.includes(nodePath)) {
      // Collapse the node and remove all child paths
      setExpandedNodes(expandedNodes.filter((node) => !node.startsWith(nodePath)));
      setPath(path.slice(0, level)); // Update the breadcrumb path
    } else {
      // Expand the node and add it to the expanded list
      setExpandedNodes([...expandedNodes, nodePath]);
      setPath([...path.slice(0, level), item.name]); // Update the breadcrumb path
    }
  };

  // Render the nested list recursively
  const renderList = (items, level = 0, parentPath = "") => {
    return (
      <ul>
        {items.map((item) => {
          const nodePath = parentPath ? `${parentPath}/${item.name}` : item.name; // Generate full path
          return (
            <li key={nodePath}>
              <div
                style={{ cursor: item.children ? "pointer" : "default" }}
                onClick={() => item.children && toggleExpand(item, level + 1, parentPath)}
              >
                {item.name} {item.children && (expandedNodes.includes(nodePath) ? "[-]" : "[+]")}
              </div>
              {/* Render children if the node is expanded */}
              {item.children && expandedNodes.includes(nodePath) && renderList(item.children, level + 1, nodePath)}
            </li>
          );
        })}
      </ul>
    );
  };

  // Handle breadcrumb click to navigate up the path
  const handleBreadcrumbClick = (index) => {
    const newExpandedNodes = [];
    let currentPath = "";

    // Build expanded nodes based on the breadcrumb path
    for (let i = 0; i <= index; i++) {
      currentPath = currentPath ? `${currentPath}/${path[i]}` : path[i];
      newExpandedNodes.push(currentPath);
    }

    setExpandedNodes(newExpandedNodes); // Update expanded nodes
    setPath(path.slice(0, index + 1)); // Update the breadcrumb path
  };

  return (
    <div>
      <h3>Nested List with Path Bar</h3>
      {/* Path Bar */}
      <div style={{ marginBottom: "10px", fontSize: "14px" }}>
        <span>Path: </span>
        {path.length === 0 ? (
          <span>Root</span>
        ) : (
          path.map((segment, index) => (
            <span
              key={index}
              style={{ cursor: "pointer", textDecoration: "underline", color: "blue", marginRight: "5px" }}
              onClick={() => handleBreadcrumbClick(index)}
            >
              {segment}
              {index < path.length - 1 && " > "}
            </span>
          ))
        )}
      </div>
      {/* Nested List */}
      {renderList(data)}
    </div>
  );
};

export default NestedListWithPathBar;
