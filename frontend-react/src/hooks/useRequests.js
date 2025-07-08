// src/hooks/useRequests.js
import { createContext, useContext, useEffect, useState } from "react";

const RequestsContext = createContext();

export const RequestsProvider = ({ children }) => {
  const [requests, setRequests] = useState(() => {
    try {
      const saved = localStorage.getItem("citizen-requests");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to parse requests", e);
      return [];
    }
  });

  const addRequest = (newRequest) => {
    setRequests((prev) => {
      const updatedRequests = [...prev, {
        ...newRequest,
        status: "En attente",
        trackingNumber: `DEM-${Date.now()}`
      }];
      return updatedRequests;
    });
  };

  const updateRequest = (id, updates) => {
    setRequests((prev) => 
      prev.map(req => 
        req.id === id ? { ...req, ...updates } : req
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("citizen-requests", JSON.stringify(requests));
  }, [requests]);

  return (
    <RequestsContext.Provider value={{ requests, addRequest, updateRequest }}>
      {children}
    </RequestsContext.Provider>
  );
};

export const useRequests = () => useContext(RequestsContext);