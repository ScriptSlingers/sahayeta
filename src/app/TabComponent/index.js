import React, { useState } from "react";
import TabAbout from "./TabAbout";
import TabPrice from "./TabPrice";
import TabFacilities from "./TabFacilities";
import TabServices from "./TabServices";
import TabTreatment from "./TabTreatment";

export default function TabSelector() {
    const [selectedTab, setSelectedTab] = useState("aboutus");

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };
    const tabButton = {
        display: "flex",
        color: "blue",
        border: "none",
        background: "none",
        backgroundColor: "white",
        cursor: "pointer",
        borderRadius: "10px",
    };
    const selectedTabButton = {
        display: "flex",
        color: "black",
        border: "none",
        cursor: "pointer",
        boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
    };

    const content = {
        color: "#0F52BA",
        fontWeight: "300",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        fontFamily: "Poppins, sans-serif",
    };
    const tabs = {
        display: "grid",
        gridTemplateColumns: "repeat(4,170px)",
        whiteSpace: "nowrap",
        fontSize: "16px",
        gap: "20px",
    };
    const about = {
        fontSize: "14px",
        fontWeight: "300",
    };
    const title = {
        fontSize: "18px",
        fontWeight: "500",
    };
    const text = {
        fontSize: "14px",
        fontWeight: "300",
    };
    const emergency = {
        color: "red",
        fontSize: "14px",
        fontWeight: "300",
    };
    return (
        <div>
            <div style={tabs}>
                <button
                    style={
                        selectedTab === "aboutus"
                            ? { ...tabButton, ...selectedTabButton }
                            : tabButton
                    }
                    onClick={() => handleTabClick("aboutus")}
                >
                    About Us{" "}
                </button>
                <button
                    style={
                        selectedTab === "facilities"
                            ? { ...tabButton, ...selectedTabButton }
                            : tabButton
                    }
                    onClick={() => handleTabClick("facilities")}
                >
                    Facilities
                </button>
                <button
                    style={
                        selectedTab === "services"
                            ? { ...tabButton, ...selectedTabButton }
                            : tabButton
                    }
                    onClick={() => handleTabClick("services")}
                >
                    Services
                </button>
                <button
                    style={
                        selectedTab === "treatment"
                            ? { ...tabButton, ...selectedTabButton }
                            : tabButton
                    }
                    onClick={() => handleTabClick("treatment")}
                >
                    Treatments Available:
                </button>
                <button
                    style={
                        selectedTab === "pricing"
                            ? { ...tabButton, ...selectedTabButton }
                            : tabButton
                    }
                    onClick={() => handleTabClick("pricing")}
                >
                    Pricing:
                </button>
                <button
                    style={
                        selectedTab === "doctor"
                            ? { ...tabButton, ...selectedTabButton }
                            : tabButton
                    }
                    onClick={() => handleTabClick("doctor")}
                >
                    Doctors(1)
                </button>
                <button
                    style={
                        selectedTab === "photos"
                            ? { ...tabButton, ...selectedTabButton }
                            : tabButton
                    }
                    onClick={() => handleTabClick("photos")}
                >
                    Photos:
                </button>
                <button
                    style={
                        selectedTab === "review"
                            ? { ...tabButton, ...selectedTabButton }
                            : tabButton
                    }
                    onClick={() => handleTabClick("review")}
                >
                    ReviewStories:
                </button>
            </div>

            <hr></hr>
            <div>
                {selectedTab === "aboutus" && (
                    <TabAbout />
                )}
                {selectedTab === "facilities" && (
                    <TabFacilities />
                )}
                {selectedTab === "services" && (
                    <TabServices />
                )}
                {selectedTab === "treatment" && (
                    <TabTreatment />
                )}
                {selectedTab === "pricing" && (
                    <TabPrice />
                )}
                {selectedTab === "doctor" && (
                    <TabAbout />
                )}
                {selectedTab === "photos" && (
                    <TabAbout />
                )}
                {selectedTab === "review" && (
                    <TabAbout />
                )}
            </div>
        </div>
    )
}