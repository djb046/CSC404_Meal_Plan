import React from 'react'
import ReactDom from 'react-dom'
import { Container, Card, Icon, Image, Grid, Segment, Button } from 'semantic-ui-react'


const Profile = () => (
    <Grid columns='equal' >
        <Grid.Row verticalAlign='middle'>
        {/* Avatar Image must be 150x150px! */}       
            <Image centered circular src="images/ghost.jpg"/>                
        </Grid.Row>
        <Grid.Row columns='equal' verticalAlign= 'center'>
            <Button centered color='orange' className='dashButton1' href='/survey' >Edit Profile</Button>
        </Grid.Row>
        <Grid.Row columns='equal' verticalAlign= 'center'>
            <Button centered color='orange' className='dashButton2' href= '/viewMealPlan'>View Meal Plan</Button>
        </Grid.Row>
        <Grid.Row columns='equal' verticalAlign= 'center'>
            <Button centered color='orange' className='dashButton2' >Edit Meal Plan</Button>
        </Grid.Row>
        <Grid.Row columns='equal' verticalAlign= 'center'>
            <Button centered color='orange' className='dashButton2' href='/createMealPlan' >Generate Meal Plan</Button>
        </Grid.Row>
        
    </Grid>


)

export default Profile