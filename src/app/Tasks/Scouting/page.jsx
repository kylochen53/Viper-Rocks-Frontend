"use client";
import React, { useEffect, useState } from "react";
import OptionSelector from "../../(components)/Scouting/OptionSelector";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import Link from "next/link";

const DisplayImage = dynamic(
    () => import("../../(components)/Scouting/DisplayImage"),
    {
      ssr: false,
    }
);

const ScoutingPage = () => {
  // State hook for storing the array of images fetched from the API
  const [images, setImages] = useState([]);

  // Retrieve the currentIndex from localStorage or default to 0 if not found
  const [currentIndex, setCurrentIndex] = useState(() => {
    if (typeof window !== "undefined") {
      const savedIndex = localStorage.getItem("lastViewedImage");
      return savedIndex ? parseInt(savedIndex, 10) : 0;
    } else {
      return 0;
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lastViewedImage", currentIndex.toString());
    }
  }, [currentIndex]);

  useEffect(() => {
    const fetchImages = async () => {
      const cachedImages = localStorage.getItem("cachedImages");
      const imagesData = cachedImages ? JSON.parse(cachedImages) : null;
      //const cacheIsValid =
      //imagesData && new Date().getTime() - imagesData.timestamp < 86400000; // 24hours*60*60*1000

      const cacheIsValid = false;
      if (cacheIsValid) {
        setImages(imagesData.data);
      } else {
        try {
          const response = await fetch("/api/images");
          if (!response.ok) throw new Error("Failed to fetch images");
          const data = await response.json();

          console.log("Cached images found?", JSON.stringify(data, null, 2));
          setImages(data);
          localStorage.setItem(
              "cachedImages",
              JSON.stringify({ data, timestamp: new Date().getTime() })
          );
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    fetchImages();
  }, []);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Only runs in the browser
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 600);
    };

    checkMobile(); // run on mount
    window.addEventListener("resize", checkMobile); // update on resize

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSubmit = async (selectedOption) => {
    if (images.length > 0 && currentIndex < images.length) {
      const currentImageId = images[currentIndex].id;
      try {
        const response = await fetch("/api/scouting/rockcount", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageId: currentImageId,
            selectedOption: selectedOption,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to submit the option");
        }

        const data = await response.json();
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    }
  };
  return (
      <div>
        <div style={{ paddingLeft: "20px", paddingTop:"30px"}}>
          <Link href="/Explore">Back</Link>
        </div>

        <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "20px",
              flexDirection: isMobile.innerWidth < 600 ? "column" : "row",
            }}
        >

          <div style={{ flex: 1 }}>
            {images.length > 0 && (
                <DisplayImage image={images[currentIndex]} />
            )}
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ marginLeft: "10px" }}>
              How many rocks are in this image?
            </h4>
            <br></br>
            <p style={{ marginLeft: "10px" }}>Select one of the following:</p>
            <OptionSelector onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
  );
};

export default ScoutingPage;