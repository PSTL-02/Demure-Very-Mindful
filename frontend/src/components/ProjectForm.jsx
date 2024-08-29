import {useState} from 'react'
import axios from 'axios';
import { useProjectsContext } from '../hooks/useProjectsContext';
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const baseURL = import.meta.env.VITE_API_BASE_URL

const ProjectForm = () => {
    const {dispatch} = useProjectsContext();
   
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [sDescription, setSDescription] = useState('');
    const [bDescription, setBDescription] = useState('');
    const [link, setLink] = useState('');
    const [error, setError] = useState(null);
   
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        const user_id = user.email

        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('sDescription', sDescription);
        formData.append('bDescription', bDescription);
        formData.append('link', link);
        formData.append('user_id', user_id);
        formData.append('image', image);


        // HTTP Request:
        try {
            // const response = await axios.post(`${baseURL}/api/projects/`, project, {
            //     headers : {
            //         'Content-Type': 'application/json'
            //     }
            // });
            const response = await axios.post(`${baseURL}/api/projects/`, formData, {
                headers : {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setTitle('');
            setAuthor('');
            setSDescription('');
            setBDescription('');
            setLink('');
            setError(null);
            console.log('new project added', response.data);
            dispatch({type: 'CREATE_PROJECTS', payload: response.data})
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <form className='create' onSubmit={handleSubmit}>
        <h3>Add A New Project</h3>

        <div className='form-inputs'>
            <label>Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
        </div>
        
        <div className='form-inputs'>
            <label>Type:</label>
            <p>Web Design</p>
        </div>
        
        <div className='form-inputs'>
            <label>Author:</label>
            <input
                type="text"
                onChange={(e) => setAuthor(e.target.value)}
                value={author}
            />
        </div>
        
        <div className='form-inputs'>
            <label>Small Description:</label>
            <input
                type="text"
                onChange={(e) => setSDescription(e.target.value)}
                value={sDescription}
            />
        </div>
        
        <div className='form-inputs'>
            <label>Big Description:</label>
            <input
                type="text"
                onChange={(e) => setBDescription(e.target.value)}
                value={bDescription}
            />
        </div>
        
        <div className='form-inputs'>
            <label> Upload Image: </label>
            <input type="file" accept='image/*' onChange={(e) => setImage(e.target.files[0])}/>
        </div>
        
        <div className='form-inputs'>
            <label>Socials:</label>
            <div id='form-social-icons'>
            <FaInstagram />
            <FaFacebook />
            <FaLinkedin />
            </div>
        </div>
        
        <div className='form-inputs'>
            <label>Link to Portfolio:</label>
            <input
                type="text"
                onChange={(e) => setLink(e.target.value)}
                value={link}
            />
        </div>
        

        <button>Add Project</button>
        {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default ProjectForm
