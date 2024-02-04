import React from 'react'

const GuestCredential = ({guestCredentials}) => {
  return (
    <button
      className="bg-red-900 p-2 cursor-pointer rounded-md"
      onClick={(e) => guestCredentials(e)}
    >
      Get Guest User Credentials
    </button>
  );
}

export default GuestCredential