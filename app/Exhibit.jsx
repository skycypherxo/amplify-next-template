"use client";
import React, { useEffect, useRef, useState } from "react";

const Exhibit = ({ onStallSelectionChange, bookedStalls }) => {
  const svgContainer = useRef(null);
  const zoomContainerRef = useRef(null);
  const [selectedStalls, setSelectedStalls] = useState(new Set());
  const [zoomState, setZoomState] = useState({
    scale: 1,
    translateX: 0,
    translateY: 0,
    isDragging: false,
    startX: 0,
    startY: 0
  });
  const [isMobile, setIsMobile] = useState(false);

  // Detect if the device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Zoom functionality
  const handleZoomIn = () => {
    setZoomState(prev => ({
      ...prev,
      scale: Math.min(prev.scale + 0.5, 3) // Limit max zoom to 3x
    }));
  };

  const handleZoomOut = () => {
    setZoomState(prev => {
      const newScale = Math.max(prev.scale - 0.5, 1);

      // If zooming back to 1x, reset translation
      if (newScale === 1) {
        return {
          scale: 1,
          translateX: 0,
          translateY: 0,
          isDragging: false,
          startX: 0,
          startY: 0
        };
      }

      return {
        ...prev,
        scale: newScale
      };
    });
  };

  const handleResetZoom = () => {
    setZoomState({
      scale: 1,
      translateX: 0,
      translateY: 0,
      isDragging: false,
      startX: 0,
      startY: 0
    });
  };

  useEffect(() => {
    const loadSVG = async () => {
      try {
        const response = await fetch("/layout1.svg");
        const svgText = await response.text();
        if (svgContainer.current) {
          svgContainer.current.innerHTML = svgText;

          const svgElement = svgContainer.current.querySelector("svg");
          const zoomContainer = zoomContainerRef.current;

          if (svgElement && zoomContainer) {
            // Responsive sizing function
            const updateSvgSize = () => {
              const screenWidth = window.innerWidth;
              const screenHeight = window.innerHeight;

              // Dynamically adjust SVG size based on screen dimensions
              if (screenWidth <= 600) {
                // Mobile devices
                svgElement.setAttribute("width", "100%");
                svgElement.setAttribute("height", "auto");
                svgElement.style.maxWidth = "100%";
                svgElement.style.maxHeight = "80vh";
              } else if (screenWidth <= 1024) {
                // Tablets
                svgElement.setAttribute("width", "90%");
                svgElement.setAttribute("height", "auto");
                svgElement.style.maxWidth = "1000px";
                svgElement.style.maxHeight = "90vh";
              } else {
                // Desktop
                svgElement.setAttribute("width", "1200");
                svgElement.setAttribute("height", "1000");
                svgElement.style.maxWidth = "none";
                svgElement.style.maxHeight = "none";
              }

              // Ensure viewBox for responsiveness
              if (!svgElement.hasAttribute("viewBox")) {
                const width = svgElement.getAttribute("width") || 2117;
                const height = svgElement.getAttribute("height") || 2092;
                svgElement.setAttribute("viewBox", `0 0 ${width} ${height}`);
              }
            };

            // Disable pointer events for text elements
            const textElements = svgElement.querySelectorAll("text");
            textElements.forEach((element) => {
              element.style.pointerEvents = "none";
            });

            // Color booked stalls red
            bookedStalls.forEach((stallId) => {
              const stall = svgElement.getElementById(stallId);
              if (stall) {
                stall.style.fill = "red"; // Set booked stalls to red
              }
            });

            // Add event listeners to each stall dynamically
            for (let i = 1; i <= 164; i++) {
              const stall = svgElement.getElementById(`stall${i}`);
              if (stall) {
                stall.addEventListener("click", (event) => {
                  // Prevent dragging when clicking on stalls
                  event.stopPropagation();
                  const stallId = `stall${i}`;

                  // Toggle selection
                  setSelectedStalls(prevSelected => {
                    const newSelected = new Set(prevSelected);
                    if (newSelected.has(stallId)) {
                      newSelected.delete(stallId);
                      stall.style.fill = bookedStalls.has(stallId) ? "red" : ""; // Reset to original color or red if booked
                    } else {
                      newSelected.add(stallId);
                      stall.style.fill = "cyan"; // Selected color
                    }

                    // Send updated selected stalls to the parent component
                    if (onStallSelectionChange) {
                      onStallSelectionChange(newSelected);
                    }

                    return newSelected;
                  });

                  console.log(`Stall ${i} clicked`, event);
                });
              }
            }

            // Initial sizing and resize listener
            updateSvgSize();
            window.addEventListener("resize", updateSvgSize);

            // Cleanup
            return () => {
              window.removeEventListener("resize", updateSvgSize);
            };
          }
        }
      } catch (error) {
        console.error("Error loading SVG:", error);
      }
    };

    loadSVG();
  }, [bookedStalls]);

  // Improved drag handling
  const handleMouseDown = (event) => {
    // Only allow dragging when zoomed in
    if (zoomState.scale > 1) {
      // Prevent text selection during drag
      event.preventDefault();

      setZoomState(prev => ({
        ...prev,
        isDragging: true,
        startX: event.clientX,
        startY: event.clientY
      }));
    }
  };

  const handleMouseMove = (event) => {
    // Only move when zoomed in and dragging
    if (!zoomState.isDragging || zoomState.scale === 1) return;

    const deltaX = event.clientX - zoomState.startX;
    const deltaY = event.clientY - zoomState.startY;

    // Calculate new translation with limits
    setZoomState(prev => {
      // Maximum translation limits (adjust these values as needed)
      const maxTranslateX = window.innerWidth * (prev.scale - 1);
      const maxTranslateY = window.innerHeight * (prev.scale - 1);

      const newTranslateX = Math.min(
        Math.max(prev.translateX + deltaX, -maxTranslateX),
        maxTranslateX
      );

      const newTranslateY = Math.min(
        Math.max(prev.translateY + deltaY, -maxTranslateY),
        maxTranslateY
      );

      return {
        ...prev,
        translateX: newTranslateX,
        translateY: newTranslateY,
        startX: event.clientX,
        startY: event.clientY
      };
    });
  };

  const handleMouseUp = () => {
    if (zoomState.isDragging) {
      setZoomState(prev => ({
        ...prev,
        isDragging: false
      }));
    }
  };

  return (
    <div 
      className="relative w-full h-full overflow-hidden"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Zoom Controls */}
      {!isMobile && (
        <div className="absolute top-4 left-4 z-10 flex space-x-2">
          <button 
            onClick={handleZoomOut} 
            className="bg-gray-400 p-2 rounded-full hover:bg-gray-500 transition flex items-center justify-center"
            title="Zoom Out"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </button>
          <button 
            onClick={handleZoomIn} 
            className="bg-gray-400 p-2 rounded-full hover:bg-gray-500 transition flex items-center justify-center"
            title="Zoom In"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </button>
          <button 
            onClick={handleResetZoom} 
            className="bg-gray-400 p-2 rounded-full hover:bg-gray-500 transition flex items-center justify-center"
            title="Reset Zoom"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </button>
        </div>
      )}

      {/* Zoom level indicator */}
      {!isMobile && (
        <div 
          className="absolute top-4 right-4 z-10 bg-black/50 text-white px-3 py-1 rounded"
        >
          Zoom: {Math.round(zoomState.scale * 100)}%
        </div>
      )}

      {/* Zoomable Container */}
      <div
        ref={zoomContainerRef}
        className={`w-full overflow-hidden relative ${zoomState.scale > 1 && zoomState.isDragging ? 'cursor-grabbing' : zoomState.scale > 1 ? 'cursor-grab' : 'cursor-default'}`}
      >
        <div
          style={{
            transform: `translate(${zoomState.translateX}px, ${zoomState.translateY}px) scale(${zoomState.scale})`,
            transformOrigin: "0 0",
            transition: "transform 0.1s ease-out"
          }}
        >
          <div
            ref={svgContainer}
            className="w-full h-full flex justify-center items-center overflow-visible relative"
          />
        </div>
      </div>
    </div>
  );
};

export default Exhibit;
