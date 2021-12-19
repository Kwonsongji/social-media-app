import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Card,  Image,Icon, Label  } from 'semantic-ui-react'
import moment from 'moment'

const PostCard = ({ getPost }) => {
  const { body, createdAt, id, username, likeCount, commentCount, likes } = getPost;
  const likePost = () => {
    console.log('Like Post !!');
  };
  const commentOnPost = () => {
    console.log( 'Comment on post !!');
};
  return (
    <Card.Group >
    <Card fluid >
      <Card.Content   >
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header  >{username}</Card.Header>
          <Card.Meta  as={NavLink} to={`/posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description >
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra color= 'black' inverted>
        <Button as='div'  labelPosition='right' onClick={likePost}>
      <Button color='teal'>
        <Icon name='heart' />
      
      </Button>
      <Label  basic color='teal' pointing='left'>
        {likeCount}
      </Label>
          </Button>
           <Button as='div'  labelPosition='right' onClick={commentOnPost}>
      <Button color='blue'>
        <Icon name='comments' />
      
      </Button>
      <Label  basic color='blue' pointing='left'>
        {commentCount}
      </Label>
    </Button>
      </Card.Content>
      </Card>
</Card.Group>
  )
}

export default PostCard

