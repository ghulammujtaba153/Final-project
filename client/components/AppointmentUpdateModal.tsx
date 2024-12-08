import React from 'react'

const AppointmentUpdateModal = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-black-default">
        <h2 className="text-lg font-bold">Book Appointment</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mt-4">
            Appointment Date:
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              className="border rounded-md p-2 w-full text-black-default"
              required
            />
          </label>

          <label className="block mt-4">
            Select Time Slot:
            <select
              value={selectedTimeSlot}
              onChange={(e) => setSelectedTimeSlot(e.target.value)}
              className="border rounded-md p-2 w-full text-black-default"
              required
            >
              <option value="">-- Select Time Slot --</option>
              {timeSlots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Book
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-md ml-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  )
}

export default AppointmentUpdateModal