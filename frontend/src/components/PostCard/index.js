import React from 'react';
import { Card,  Image  } from 'semantic-ui-react'
import moment from 'moment'

const PostCard = ({ getPost }) => {
const { body, createdAt, id, username, likeCount, commentCount, likes} = getPost
  return (
    <Card.Group>
    <Card>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header>{username}</Card.Header>
          <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <p>button here</p>
      </Card.Content>
      </Card>
</Card.Group>
  )
}

export default PostCard

