import React, { useState } from "react";
import styled from "styled-components";
import TablaMov from "./TablaMov";
import TablaFpl from "./TablaFpl";

const tableMov = () => {
  const [activeTab, setActiveTab] = useState<string>("tab-1");

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <Container>
      <TabContainer className="border-b border-gray-200">
        <TabNav aria-label="Tabs" role="tablist">
          <TabButton
            onClick={() => handleTabClick("tab-1")}
            active={activeTab === "tab-1"}
            id="tab-1"
            aria-controls="tab-1-panel"
            role="tab"
          >
            FOR 004 (MOVIMIENTO)
          </TabButton>
          <TabButton
            onClick={() => handleTabClick("tab-2")}
            active={activeTab === "tab-2"}
            id="tab-2"
            aria-controls="tab-2-panel"
            role="tab"
          >
            FPL AMHS (PLANES DE VUELO)
          </TabButton>
        </TabNav>
      </TabContainer>

      <div>
        <TabPanel activeTab={activeTab} tabId="tab-1" id="tab-1-panel">
          <TableContainer>
            <TablaMov/>
            
          </TableContainer>
        </TabPanel>
        <TabPanel activeTab={activeTab} tabId="tab-2" id="tab-2-panel">
          <TableContainer>
            <TablaFpl/>
            
          </TableContainer>
        </TabPanel>
      </div>
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem;
`;

const TabContainer = styled.div`
  border-bottom: 1px solid #e2e8f0;
`;

const TabNav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 1rem;
  font-size: 0.875rem;
  border: none;
  border-bottom: 2px solid
    ${({ active }) => (active ? "#3182ce" : "transparent")};
  color: ${({ active }) => (active ? "#3182ce" : "#6b7280")};
  font-weight: ${({ active }) => (active ? "600" : "normal")};
  cursor: pointer;
  background: none;

  &:hover {
    color: #3182ce;
  }

  &:focus {
    outline: none;
    color: #3182ce;
  }
`;

const TabPanel = styled.div<{ activeTab: string; tabId: string }>`
  display: ${({ activeTab, tabId }) =>
    activeTab === tabId ? "block" : "none"};
`;

const TableContainer = styled.div`
  overflow-x: auto;
  margin-top: 1rem;
`;


export default tableMov;
