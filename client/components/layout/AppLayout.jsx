import React from 'react';
import EventsPage from 'components/events/EventsPage';

export default function AppLayout() {
  return (
    <div className="applayout">
      <div className="appheader">
        <div className="container">
          <h1 className="logo">Sysdig</h1>
        </div>
      </div>

      <div className="appcontent">
        <EventsPage />
      </div>
    </div>
  );
}
