export function MeetingEndCallButton({ isHost, endCall, children }) {
  return (
    <button
      onClick={endCall}
      className={`px-4 py-2 rounded-lg text-white font-medium 
                  ${
                    isHost
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }
                  focus:outline-none focus:ring-2 focus:ring-offset-2 
                  ${isHost ? 'focus:ring-red-500' : 'focus:ring-blue-500'}
                  transition duration-300`}
    >
      {children}
    </button>
  )
}
