import { useState, useEffect } from "react";
import ProfileContent from "./ProfileContent";

export default function DashboardContent() {
  const [currentView, setCurrentView] = useState("profile");

  useEffect(() => {
    // Listen for sidebar events from Astro component
    const handleViewChange = (event: CustomEvent) => {
      setCurrentView(event.detail.view);
    };

    window.addEventListener('dashboard-view-change', handleViewChange as EventListener);

    return () => {
      window.removeEventListener('dashboard-view-change', handleViewChange as EventListener);
    };
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case "profile":
        return <ProfileContent />;
      case "settings":
        return <div className="p-6"><h1 className="text-2xl font-bold">Settings</h1><p>Settings content will be here.</p></div>;
      case "members":
        return <div className="p-6"><h1 className="text-2xl font-bold">Members</h1><p>Members content will be here.</p></div>;
      case "bookmark":
        return <div className="p-6"><h1 className="text-2xl font-bold">Bookmarks</h1><p>Bookmarks content will be here.</p></div>;
      case "collections":
        return <div className="p-6"><h1 className="text-2xl font-bold">Collections</h1><p>Collections content will be here.</p></div>;
      case "plans":
        return <div className="p-6"><h1 className="text-2xl font-bold">Plans</h1><p>Plans content will be here.</p></div>;
      case "payment-methods":
        return <div className="p-6"><h1 className="text-2xl font-bold">Payment Methods</h1><p>Payment methods content will be here.</p></div>;
      case "licences":
        return <div className="p-6"><h1 className="text-2xl font-bold">Licences</h1><p>Licences content will be here.</p></div>;
      case "downloads":
        return <div className="p-6"><h1 className="text-2xl font-bold">Downloads</h1><p>Downloads content will be here.</p></div>;
      default:
        return <ProfileContent />;
    }
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Main content */}
      <main className="flex-1 overflow-auto">{renderContent()}</main>
    </div>
  );
}
