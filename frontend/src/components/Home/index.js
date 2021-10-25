import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid } from 'semantic-ui-react';
import PostCard from '../PostCard';
import gql from 'graphql-tag';
import './style.scss';
const Home = () => {
  const {
    loading,
    /*  getPosts */
    data: { getPosts } = {}
    /* data : {  getPosts:  posts }  */ 
  } = useQuery(FETCH_POSTS_QUERY);
   if ( getPosts) {
    console.log(getPosts);
  }
 
  
  return (
    <Grid columns={3} >
      <Grid.Row className="home__title">
        <h1>Postes récents</h1>
      </Grid.Row>
     <Grid.Row>
        {loading ? (
          <h1>Loading posts... </h1>
        ) : (
            getPosts &&
            getPosts.map((getPost) => (
              <Grid.Column
                key={getPost.id}
                 style={{marginBottom:20}}  
              >
  
              <PostCard getPost={getPost}/>
            </Grid.Column>
          ))
    )}
    </Grid.Row>   
  </Grid>
  )
}
 const FETCH_POSTS_QUERY = gql`
{
  getPosts{
    id body createdAt username likeCount
    likes{
      username
    }
    commentCount
    comments{
    id username createdAt body
    }

  }
}
` 
export default Home;
