import React from 'react'
import { ConeStriped } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'

const SingleWorkout = () => {
    const navigate = useNavigate();

  return (
    <>
    <div className='backbtn-title'>
        <button onClick={() => navigate(-1)} className='back-button'> Back </button>
        <h2> Project Title </h2>
    </div>
        <div className='single-project-content'>
            <div className='project-image-link'>
                <img src="" alt="photo of project here" />
                <a> Link To Portfolio URL </a>
            </div>

            <div className='project-details'>
                <h3> Project Type </h3>

                <h4> Project Creators: </h4>
                <p> Mia, Neel, and Caitlin </p>

                {/* in depth description of project */}
                <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Sint ratione magni totam deserunt qui iste praesentium. </p>

                <p> Date Uploaded/Created: 20/12/23 </p>

                <h4> Socials: </h4>
                <div className='social-icons'>
                    <ConeStriped/>
                    <ConeStriped/>
                    <ConeStriped/>
                </div>
            </div>

        </div>
    </>
  )
}

export default SingleWorkout