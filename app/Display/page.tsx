"use client";

import React, { useState, useEffect } from "react";

const DisplayComposer = () => {
  const [composerName, setComposerName] = useState("");
  useEffect(() => {
    // Directly parsing the window.location.search to access URL parameters
    const searchParams = new URLSearchParams(window.location.search);
    const name = searchParams.get("name");
    setComposerName(name);
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div>
      {composerName
        ? `Displaying details for ${composerName}`
        : "No composer selected"}
    </div>
  );
};

export default DisplayComposer;
