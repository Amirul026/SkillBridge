import React from 'react';

const MeetingCard = ({ meeting }) => {
  const handleJoinMeeting = async () => {
    try {
      const response = await fetch(`/api/meetings/${meeting.id}`);
      const data = await response.json();
      const meetingLink = 'https://meet.jit.si/' + data.meeting_id;
      window.location.href = meetingLink;
    } catch (error) {
      console.error('Failed to join meeting:', error);
    }
  };

  return (
    <div>
      {/* ... display meeting details (e.g., title, start time) ... */}
      <button onClick={handleJoinMeeting}>Join Meeting</button>
    </div>
  );
};

export default MeetingCard;