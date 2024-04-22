import React from 'react'

const Team = (props) => {
  return (
    <div>
      <div className="bg-white rounded-lg shadow p-6">
              <img className="w-32 h-32 rounded-full mx-auto object-contain" src={props.image} alt="Team Member Name" />
              <div className="text-center mt-4">
                <p className="text-xl font-semibold">{props.name}</p>
                <p className="text-sm text-gray-600">{props.role}</p>
                <p className="mt-2 text-gray-700">Driven by a passion for cycling, Alex founded CycleVale to bring the cycling community together.</p>
              </div>
        </div>
    </div>
  )
}

export default Team
