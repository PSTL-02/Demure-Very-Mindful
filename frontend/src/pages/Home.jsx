import { useEffect, useState } from "react";
import axios from 'axios'
import {useProjectsContext} from '../hooks/useProjectsContext'

import ProjectDetails from '../components/ProjectDetails'
import ProjectForm from '../components/ProjectForm'

const baseURL = import.meta.env.VITE_API_BASE_URL

const Home = () => {
    const {projects, dispatch} = useProjectsContext();
    const [myProjects, setMyProjects] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await axios.get(`${baseURL}/api/projects/`);
            if (response.status === 200) {
                dispatch({type: 'SET_PROJECTS', payload: response.data})
            }
        }
        fetchProjects();
    }, []);

    const handleMyProjects = () => {
        setMyProjects(true);
    }

    const handleAllProjects = () => {
        setMyProjects(null);
    }

    return (
        <div className="home">
            <div className="projects">
                <button onClick={handleMyProjects} className="filter-button"> My Projects </button>
                <button onClick={handleAllProjects} className="filter-button"> All Projects </button>
                {myProjects ? (projects && projects.map((project) => {
                    const user = JSON.parse(localStorage.getItem('user'))
                    const user_id = user.email
                    if (project.user_id === user_id) {
                        return (
                            <ProjectDetails key={project._id} project={project}/>
                        )
                    }
                })) : (projects && projects.map((project) => {
                    return (
                        <ProjectDetails key={project._id} project={project}/>
                    )
                })
            )}
            </div>
            <ProjectForm/>
        </div>
    )
}

export default Home