import clsx from "clsx";
import Button from "../button/button";
import styles from "./tabs.module.css";

import { useState } from "react";

type TabItem = {
  id: string;
  label: string;
  component: React.ReactNode;
};

type TabsProps = {
  tabs: TabItem[];
  className?: string;
};

export const Tabs = ({ tabs, className,  }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);

  return (
    <div className={clsx(className, styles.wrapper)}>
      <div className={clsx(styles.tabsHeader, styles.scrollArea) }>
        {tabs.map((tab) => (
          <Button size="small" variant="tab" key={tab.id} onClick={() => setActiveTab(tab.id)}>
            {tab.label}
          </Button>
        ))}
      </div>

      <div className={styles.tabsContent}>
        {tabs.map(
          (tab) => activeTab === tab.id && <div key={tab.id}>{tab.component}</div>
        )}
      </div>
    </div>
  );
};
