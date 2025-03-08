import React, { useState, useEffect } from 'react';
import MeetingCard from './MeetingCard';

const LiveSessionsPage = () => {
  const [meetings, setMeetings] = useState();

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await fetch('/api/meetings');
        const data = await response.json();
        setMeetings(data);
      } catch (error) {
        console.error('Failed to fetch meetings:', error);
      }
    };

    fetchMeetings();
  },);

  return (
    <div>
      <h2>Live Sessions</h2>
      {meetings.map(meeting => (
        <MeetingCard key={meeting.id} meeting={meeting} />
      ))}
    </div>
  );
};

export default LiveSessionsPage;