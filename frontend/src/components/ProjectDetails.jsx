import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// import custom context hook
import { useProjectsContext } from '../hooks/useProjectsContext';

import {formatDistanceToNow} from 'date-fns';

// importing icons
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

const baseURL = import.meta.env.VITE_API_BASE_URL

const ProjectDetails = ({project}) => {

  const {dispatch} = useProjectsContext();

  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const [editTitle, setEditTitle] = useState(project.title);
  const [editAuthor, setEditAuthor] = useState(project.author);
  const [editSDescription, setEditSDescription] = useState(project.sDescription);
  const [editBDescription, setEditBDescription] = useState(project.bDescription);
  const [editLink, setEditLink] = useState(project.link);

  
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  
  const user = JSON.parse(localStorage.getItem('user'));
  const user_id = user.email

  // Add Comment Function
  const handleAddComment = async () => {
    try {
      const response = await axios.post(`${baseURL}/api/comments/projects/${project._id}/comments`,
        {
          text: commentText,
          user_id: user_id
        }
      );

      if (response.status === 201) {
        const newComment = response.data;
        const updatedComments = [...project.comments, newComment];
        const updatedProject = {...project, comments: updatedComments};

        dispatch({type: 'UPDATE_PROJECT', payload: updatedProject});

        setCommentText('');
      }

    } catch (error) {
      console.error('Error Adding Comment: ', error);
      
    }
  }

  // Delete Function
  const handleDelete = async () => {
    const response = await axios.delete(`${baseURL}/api/projects/${project._id}`);
  
    const json = await response.data
  
    if (response.status === 200 ) {
      console.log(json);
      dispatch({type: 'DELETE_PROJECT', payload: json});
    }
  };

  // Edit Function
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Submit/Save Edit Function
  const handleSubmitEdit = async () => {
    const updatedProject = {
      title: editTitle,
      author: editAuthor,
      sDescription: editSDescription,
      bDescription: editBDescription,
      link: editLink
    };

    try {
      const response = await axios.patch(
        `${baseURL}/api/projects/${project._id}`,
        updatedProject
      );
      const updatedData = response.data
      if (response.status === 200) {
        console.log(response);
        console.log(updatedData);
        dispatch({type: 'UPDATE_PROJECT', payload: updatedData});
        setIsEditing(false);        
      }
    } catch (error) {
      console.error('Error Updating Project', error);
    }
  };

  // Cancel Edit Function
  const handleCancelEdit = () => {
    setEditTitle(project.title);
    setEditAuthor(project.author);
    setEditSDescription(project.sDescription);
    setEditBDescription(project.bDescription);
    setEditLink(project.link);
    setIsEditing(false);
  };

  // handleNavigate Function
  const handleNavigate = () => {
    let path = `/${project._id}`
    navigate(path);
  }

  const getEmailCharactersBeforeAtSymbol = (email) => {
    const delimiter = '@';
    const parts = email.split(delimiter);
    return parts.length > 1 ? parts[0]: '';
  }

  return (
    <div className='project-details'>
      {isEditing ? (
        <div className='edit-modal'> 
          <label> Edit Project Title: </label>
          <input type='text' value={editTitle} onChange={(e) => setEditTitle(e.target.value)}/>

          <label> Edit Project Author: </label>
          <input type='text' value={editAuthor} onChange={(e) => setEditAuthor(e.target.value)}/>

          <label> Edit Small Description: </label>
          <input type='text' value={editSDescription} onChange={(e) => setEditSDescription(e.target.value)}/>

          <label> Edit Big Description: </label>
          <input type='text' value={editBDescription} onChange={(e) => setEditBDescription(e.target.value)}/>

          <label> Edit Portfolio Link: </label>
          <input type='text' value={editLink} onChange={(e) => setEditLink(e.target.value)}/>

          <button id='cancel-btn' onClick={handleCancelEdit}> Cancel Changes </button>
          <button id='submit-btn' onClick={handleSubmitEdit}> Save Changes </button>
        </div>
      ) : (
        <>
        <div className='project-content'> 
          {project.image && (
            <img className='project-image' src={`${baseURL}/public/uploads/${project.image}`} alt="Project"/>
          )}
            <div className='details'>
            <h4 id='project-title'> {project.title} </h4>
            <p>{project.sDescription} </p>
            <p> <strong> Created By: </strong> {project.author} </p>
            <p id='time-created'> {formatDistanceToNow(new Date(project.createdAt), {includeSeconds: true}, {addSuffix: true})} ago </p>
            <div className='btn-icons'>
              <button className='read-more-btn' onClick={handleNavigate}> Read More </button>
              {project.user_id === user_id && (
                  
                      <div className='icon-cont'>
                      <FaTrashAlt className='icons' onClick={handleDelete} />
                      <FaEdit className='icons' onClick={handleEdit} />
                      </div>
                  
                  )}
            </div>
          </div>

          <button className='show-comments-btn'
        onClick={() => {
          setShowComments(!showComments)
          console.log(project.comments[0]);
        }}
      >
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </button>

      {showComments && (
        <>
          <div className='comments'>
            {project.comments.map((comment) => (
              <div key={project._id} className='comment'>
                <h5> {getEmailCharactersBeforeAtSymbol(comment.user_id)} </h5>
                <p> {comment.text} </p>
                <span className='comment-time'> 
                  <strong> Posted: </strong> {formatDistanceToNow(new Date(comment.createdAt), {includeSeconds: true})}{' '}ago 
                </span>
              </div>
            ))}
          </div>

          <div className='add-comment'>
            <label> Add New Comment </label>
            <input
              type='text' placeholder='Add A Comment...'
              value={commentText} onChange={(e) => setCommentText(e.target.value)}
            />
            <button className='post-btn' onClick={handleAddComment}> Post </button>
          </div>
        </>
      )}
          
          
        </div>
        </>
      )}
      

    </div>
  )
}

export default ProjectDetails
