import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import {formatDistanceToNow} from 'date-fns';

// icon imports
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

const SingleProject = () => {

    const baseURL = import.meta.env.VITE_API_BASE_URL

    const navigate = useNavigate();
    // set state for a single workout:
    const [project, setProject] = useState(null)
    // set loading state:
    const [loading, setLoading] = useState(true)
    // get id from the URl via useParams
    const {id} = useParams()

     // useEffect
     useEffect(() => {
        axios.get(`${baseURL}/api/projects/${id}`)
              .then((res) => {
                  console.log(res.data)
                  setProject(res.data)
                  setLoading(false)
              })
              .catch((error) => {
                  console.log(error)
              })
      },[id])

      if (!project) {
        return <div>Project not found</div>;
      }


    // master return
  return (
    <div className="single-page">

        <div className='backbtn-title'>
            <button onClick={() => navigate(-1)} className='back-button'> Back </button>
            <h2> {project.title} </h2>
        </div>

        <div className='single-project-content'>

            <div className='project-image-link'>
                <img src={`${baseURL}/public/uploads/${project.image}`} alt="photo of project here" />
                {project.link && <a href={project.link} target="_blank"> {project.link} </a>}     
            </div>

            <div className='project-details'>
                <h3> Web Design </h3>

                <h4> Project Author(s): </h4>
                <p> {project.author} </p>

                {/* in depth description of project */}
                <p> {project.bDescription} </p>

                <h4> Uploaded/Created:</h4> 
                <h4> Socials: </h4>
                <div className='social-icons'>
                    <FaInstagram/>
                    <FaFacebook/>
                    <FaLinkedin/>
                </div>
            </div>

        </div>
        {/* end of single page */}
    </div>
  )
}

export default SingleProject