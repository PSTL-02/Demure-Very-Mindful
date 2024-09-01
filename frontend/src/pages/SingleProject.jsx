import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {useProjectsContext} from '../hooks/useProjectsContext'
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import {format} from 'date-fns'
import axios from "axios";

const SingleProject = () => {

    const baseURL = import.meta.env.VITE_BASE_URL

    const navigate = useNavigate();

    // come back to this
    // const response = await axios.get(`${baseURL}/api/projects/:id`)

    // master return
  return (
    <div className="single-page">

        <div className='backbtn-title'>
            <button onClick={() => navigate(-1)} className='back-button'> Back </button>
            <h2> Project Title </h2>
        </div>

        <div className='single-project-content'>

            <div className='project-image-link'>
                <img src='' alt="photo of project here" />
                <a> Link To Portfolio URL </a>
            </div>

            <div className='project-details'>
                <h3> Web Design </h3>

                <h4> Project Authors: </h4>
                <p> author </p>

                {/* in depth description of project */}
                <p> desc </p>

                <h4> Date Uploaded/Created:</h4> <p> hehe </p>

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